import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, getTimer, saveTimer, getProfile, ALPHABET } from '@/lib/storage';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const stats = getStats();
  const profile = getProfile();
  const [timer, setTimerState] = useState(getTimer());
  const [timerMinutes, setTimerMinutes] = useState(timer.minutes.toString());

  const handleStartTimer = () => {
    const newTimer = {
      enabled: true,
      minutes: parseInt(timerMinutes) || 30,
      startedAt: Date.now(),
    };
    saveTimer(newTimer);
    setTimerState(newTimer);
  };

  const handleStopTimer = () => {
    const newTimer = { enabled: false, minutes: parseInt(timerMinutes) || 30, startedAt: null };
    saveTimer(newTimer);
    setTimerState(newTimer);
  };

  return (
    <ScreenLayout backgroundImage="/images/statistic.png">
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 px-6 overflow-y-auto pb-24">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-5 w-full max-w-sm shadow-xl space-y-4">
          <h2 className="text-center font-bold text-xl text-gray-800">Статистика</h2>
          <p className="text-gray-700">👤 Ребёнок: <b>{profile?.childName || '—'}</b>, {profile?.childAge || '—'} лет</p>
          <p className="text-gray-700">📖 Азбука: <b>{stats.alphabetCompleted ? 'Завершена ✅' : `${stats.alphabetProgress + 1} из ${ALPHABET.length} букв`}</b></p>
          <p className="text-gray-700">🔑 Супер пароль: <b>{stats.passwordGamesPlayed}</b> игр</p>
          <p className="text-gray-700">🌲 Кибер лес: <b>{stats.forestGamesPlayed}</b> игр</p>
          <p className="text-gray-700">🌴 Джунгли: <b>{stats.jungleGamesPlayed}</b> игр (чистых: {stats.jungleCleanWins})</p>
          <p className="text-gray-700">🎮 Всего игр: <b>{stats.totalGamesPlayed}</b></p>

          <hr className="border-gray-300" />
          <h3 className="font-bold text-lg text-gray-800">⏱ Таймер</h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={timerMinutes}
              onChange={e => setTimerMinutes(e.target.value)}
              className="w-20 px-3 py-2 rounded-xl border-2 border-orange-300 text-center"
              min="1"
            />
            <span className="text-gray-700">минут</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleStartTimer}
              className="flex-1 bg-green-500 text-white font-bold py-2 rounded-full shadow-lg"
            >
              Запустить
            </button>
            <button
              onClick={handleStopTimer}
              className="flex-1 bg-red-500 text-white font-bold py-2 rounded-full shadow-lg"
            >
              Остановить
            </button>
          </div>
          {timer.enabled && timer.startedAt && (
            <p className="text-center text-sm text-gray-500">
              Таймер активен с {new Date(timer.startedAt).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={() => navigate('/menu')}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Меню
        </button>
      </div>
    </ScreenLayout>
  );
};

export default ParentDashboard;
