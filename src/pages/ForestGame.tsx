import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, saveStats } from '@/lib/storage';

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
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);

  const spawnEnvelope = useCallback(() => {
    const isSafe = Math.random() > 0.5;
    const messages = isSafe ? SAFE_MESSAGES : DANGER_MESSAGES;
    const env: Envelope = {
      id: nextId++,
      text: messages[Math.floor(Math.random() * messages.length)],
      safe: isSafe,
      x: Math.random() * 70 + 5,
      y: -10,
      speed: 1.5 + Math.random() * 2,
    };
    setEnvelopes(prev => [...prev, env]);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(spawnEnvelope, 1200);
    return () => clearInterval(interval);
  }, [gameOver, spawnEnvelope]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setEnvelopes(prev => {
        const updated = prev.map(e => ({ ...e, y: e.y + e.speed }));
        return updated.filter(e => e.y < 110);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
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
  }, [gameOver]);

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
    if (correct) {
      setScore(s => s + 1);
    } else {
      setErrors(e => e + 1);
    }
    setEnvelopes(prev => prev.filter(e => e.id !== env.id));
  };

  return (
    <ScreenLayout backgroundImage="/images/letter_game.png">
      <div className="absolute top-4 left-0 right-0 flex justify-between px-6">
        <span className="bg-white/80 rounded-full px-4 py-2 font-bold text-green-600">✅ {score}</span>
        <span className="bg-white/80 rounded-full px-4 py-2 font-bold text-orange-600">⏱ {timeLeft}с</span>
        <span className="bg-white/80 rounded-full px-4 py-2 font-bold text-red-600">❌ {errors}</span>
      </div>
      {envelopes.map(env => (
        <div
          key={env.id}
          className="absolute transition-none"
          style={{ left: `${env.x}%`, top: `${env.y}%` }}
        >
          <div className="bg-white/90 rounded-lg px-3 py-2 shadow-lg text-sm font-semibold whitespace-nowrap max-w-[200px] truncate">
            {env.text}
          </div>
          <div className="flex gap-2 mt-1 justify-center">
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
