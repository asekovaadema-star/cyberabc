import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, saveStats } from '@/lib/storage';
import { Mail } from 'lucide-react';
import PauseMenu from '@/components/PauseMenu';

interface Envelope {
  id: number;
  text: string;
  safe: boolean;
  x: number;
  y: number;
  speed: number;
}

const SAFE_MESSAGES = [
  '📧 Привет от бабушки!',
  '📧 Школьное расписание',
  '📧 Поздравляю с днём рождения!',
  '📧 Домашнее задание',
  '📧 Фото с каникул от друга',
  '📧 Приглашение на день рождения',
];

const DANGER_MESSAGES = [
  '⚠️ Ты выиграл iPhone! Нажми!',
  '⚠️ Отправь пароль другу',
  '⚠️ Скачай бесплатную игру.exe',
  '⚠️ Незнакомец: пришли фото',
  '⚠️ Введи данные карты мамы',
  '⚠️ Нажми на ссылку и получи приз',
];

let nextId = 0;

const ForestGame = () => {
  const navigate = useNavigate();
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const spawnEnvelope = useCallback(() => {
    const isSafe = Math.random() > 0.5;
    const messages = isSafe ? SAFE_MESSAGES : DANGER_MESSAGES;
    const env: Envelope = {
      id: nextId++,
      text: messages[Math.floor(Math.random() * messages.length)],
      safe: isSafe,
      x: Math.random() * 60 + 10,
      y: -12,
      speed: 0.4 + Math.random() * 0.6,
    };
    setEnvelopes(prev => [...prev, env]);
  }, []);

  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(spawnEnvelope, 2500);
    return () => clearInterval(interval);
  }, [gameOver, paused, spawnEnvelope]);

  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(() => {
      setEnvelopes(prev => {
        const updated = prev.map(e => ({ ...e, y: e.y + e.speed }));
        return updated.filter(e => e.y < 110);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [gameOver, paused]);

  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, paused]);

  useEffect(() => {
    if (gameOver) {
      const stats = getStats();
      stats.forestGamesPlayed++;
      stats.totalGamesPlayed++;
      saveStats(stats);
      setTimeout(() => {
        navigate(score >= 3 ? '/victory' : '/game-over');
      }, 1000);
    }
  }, [gameOver, score, navigate]);

  const handleTap = (env: Envelope, action: 'safe' | 'danger') => {
    const correct = (action === 'safe' && env.safe) || (action === 'danger' && !env.safe);
    if (correct) setScore(s => s + 1);
    else setErrors(e => e + 1);
    setEnvelopes(prev => prev.filter(e => e.id !== env.id));
  };

  const handleRestart = () => {
    setEnvelopes([]);
    setScore(0);
    setErrors(0);
    setTimeLeft(30);
    setGameOver(false);
    setPaused(false);
  };

  return (
    <ScreenLayout backgroundImage="/images/letter_game.png">
      <PauseMenu
        onResume={() => setPaused(p => !p)}
        onRestart={handleRestart}
      />
      <div className="absolute top-4 left-16 right-4 flex justify-between">
        <span className="bg-white/80 rounded-full px-3 py-1.5 font-bold text-sm text-green-600">✅ {score}</span>
        <span className="bg-white/80 rounded-full px-3 py-1.5 font-bold text-sm text-orange-600">⏱ {timeLeft}с</span>
        <span className="bg-white/80 rounded-full px-3 py-1.5 font-bold text-sm text-red-600">❌ {errors}</span>
      </div>
      {envelopes.map(env => (
        <div
          key={env.id}
          className="absolute"
          style={{ left: `${env.x}%`, top: `${env.y}%`, transition: 'top 80ms linear' }}
        >
          <div className={`w-14 h-10 rounded-lg shadow-lg flex items-center justify-center ${env.safe ? 'bg-white' : 'bg-gray-800'}`}>
            <Mail size={24} className={env.safe ? 'text-blue-500' : 'text-red-400'} />
          </div>
          <div className="flex gap-1 mt-1 justify-center">
            <button
              onClick={() => handleTap(env, 'safe')}
              className="bg-green-500 text-white text-xs px-2 py-1 rounded-full"
            >
              ✅
            </button>
            <button
              onClick={() => handleTap(env, 'danger')}
              className="bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </ScreenLayout>
  );
};

export default ForestGame;
