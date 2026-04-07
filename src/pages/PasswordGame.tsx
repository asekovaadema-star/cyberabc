import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, saveStats } from '@/lib/storage';
import PauseMenu from '@/components/PauseMenu';

const WEAK_PASSWORDS = ['123456', 'password', 'qwerty', 'abc123', 'letmein', '111111'];

const generatePassword = (): string => {
  return WEAK_PASSWORDS[Math.floor(Math.random() * WEAK_PASSWORDS.length)];
};

const TIPS = [
  'Добавь заглавную букву',
  'Добавь цифру',
  'Добавь спецсимвол (!@#$)',
  'Сделай длиннее (8+ символов)',
  'Замени букву на цифру',
];

const checkStrength = (pw: string): number => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-ZА-Я]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Zа-яА-Я0-9]/.test(pw)) score++;
  return score;
};

const PasswordGame = () => {
  const navigate = useNavigate();
  const [originalPw, setOriginalPw] = useState(generatePassword);
  const [userPw, setUserPw] = useState(originalPw);
  const [submitted, setSubmitted] = useState(false);
  const [paused, setPaused] = useState(false);

  const strength = checkStrength(userPw);
  const isStrong = strength >= 3;

  const handleSubmit = () => {
    setSubmitted(true);
    const stats = getStats();
    stats.passwordGamesPlayed++;
    stats.totalGamesPlayed++;
    saveStats(stats);
    setTimeout(() => {
      navigate(isStrong ? '/victory' : '/game-over');
    }, 1500);
  };

  const handleRestart = () => {
    const pw = generatePassword();
    setOriginalPw(pw);
    setUserPw(pw);
    setSubmitted(false);
    setPaused(false);
  };

  return (
    <ScreenLayout backgroundImage="/images/password_game.png">
      <PauseMenu
        onResume={() => setPaused(p => !p)}
        onRestart={handleRestart}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 w-full max-w-xs shadow-xl space-y-4">
          <p className="text-center text-gray-700 font-semibold">Слабый пароль:</p>
          <p className="text-center text-2xl font-mono font-bold text-red-500">{originalPw}</p>
          <p className="text-center text-gray-700 font-semibold mt-2">Сделай его сильным:</p>
          <input
            type="text"
            value={userPw}
            onChange={e => setUserPw(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 text-lg font-mono focus:outline-none focus:border-orange-500"
            disabled={submitted}
          />
          <div className="flex gap-1">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${strength >= i ? (i <= 2 ? 'bg-yellow-400' : 'bg-green-500') : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-xs text-center text-gray-500">
            {!submitted && TIPS[Math.min(strength, TIPS.length - 1)]}
            {submitted && (isStrong ? '✅ Отличный пароль!' : '❌ Пароль ещё слабый')}
          </p>
          {!submitted && (
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-full text-lg shadow-lg"
            >
              Проверить
            </button>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default PasswordGame;
