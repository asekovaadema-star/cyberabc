import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, saveStats } from '@/lib/storage';
import PauseMenu from '@/components/PauseMenu';

interface FallingLetter {
  id: number;
  letter: string;
  color: 'black' | 'pink' | 'white';
  x: number;
  y: number;
  speed: number;
}

const LETTERS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');

let nextId = 0;

const ForestGame = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<FallingLetter[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const missedDanger = useRef(false);

  const spawnLetter = useCallback(() => {
    const colors: FallingLetter['color'][] = ['black', 'pink', 'white'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const fl: FallingLetter = {
      id: nextId++,
      letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
      color,
      x: Math.random() * 70 + 10,
      y: -10,
      speed: 0.3 + Math.random() * 0.4,
    };
    setItems(prev => [...prev, fl]);
  }, []);

  // Spawn letters
  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(spawnLetter, 1800);
    return () => clearInterval(interval);
  }, [gameOver, paused, spawnLetter]);

  // Move letters down
  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(() => {
      setItems(prev => {
        const updated = prev.map(l => ({ ...l, y: l.y + l.speed }));
        // Check if any black/pink letter fell off screen without being tapped
        updated.forEach(l => {
          if (l.y >= 100 && (l.color === 'black' || l.color === 'pink')) {
            missedDanger.current = true;
          }
        });
        return updated.filter(l => l.y < 110);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [gameOver, paused]);

  // Timer
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

  // Game end
  useEffect(() => {
    if (!gameOver) return;
    const stats = getStats();
    stats.forestGamesPlayed++;
    stats.totalGamesPlayed++;
    saveStats(stats);
    setTimeout(() => {
      // Win only if scored enough and didn't miss danger letters
      navigate(score >= 3 && !missedDanger.current ? '/victory' : '/game-over');
    }, 800);
  }, [gameOver, score, navigate]);

  const handleTap = (fl: FallingLetter) => {
    if (fl.color === 'white') {
      // Tapping white = instant game over
      setGameOver(true);
      return;
    }
    // Black or pink — correct, delete it
    setScore(s => s + 1);
    setItems(prev => prev.filter(l => l.id !== fl.id));
  };

  const handleRestart = () => {
    setItems([]);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
    setPaused(false);
    missedDanger.current = false;
  };

  const getLetterStyle = (color: FallingLetter['color']) => {
    switch (color) {
      case 'black': return 'bg-gray-900 text-white';
      case 'pink': return 'bg-pink-500 text-white';
      case 'white': return 'bg-white text-gray-800 border border-gray-300';
    }
  };

  return (
    <ScreenLayout backgroundImage="/images/letter_game.png">
      <PauseMenu onResume={() => setPaused(p => !p)} onRestart={handleRestart} />
      <div className="absolute top-4 left-16 right-4 flex justify-between">
        <span className="bg-white/80 rounded-full px-3 py-1.5 font-bold text-sm text-green-600">✅ {score}</span>
        <span className="bg-white/80 rounded-full px-3 py-1.5 font-bold text-sm text-orange-600">⏱ {timeLeft}с</span>
      </div>
      {items.map(fl => (
        <button
          key={fl.id}
          onClick={() => handleTap(fl)}
          className={`absolute w-12 h-12 rounded-xl shadow-lg flex items-center justify-center font-bold text-lg transition-transform active:scale-90 ${getLetterStyle(fl.color)}`}
          style={{ left: `${fl.x}%`, top: `${fl.y}%` }}
        >
          {fl.letter}
        </button>
      ))}
    </ScreenLayout>
  );
};

export default ForestGame;
