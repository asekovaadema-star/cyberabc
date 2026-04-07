import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats } from '@/lib/storage';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';
import { useEffect } from 'react';

const AwardsScreen = () => {
  const navigate = useNavigate();
  const stats = getStats();
  useEffect(() => () => stopAudio(), []);

  const awards = [
    {
      name: 'Мистер Безопасность',
      desc: 'Прошёл игру с сообщениями без ошибок 10 раз',
      unlocked: stats.jungleCleanWins >= 10,
      emoji: '🛡️',
    },
    {
      name: 'Цифровой Рыцарь',
      desc: 'Прошёл 3 игры',
      unlocked: stats.totalGamesPlayed >= 3,
      emoji: '⚔️',
    },
    {
      name: 'Хранитель Азбуки',
      desc: 'Прошёл алфавит',
      unlocked: stats.alphabetCompleted,
      emoji: '📚',
    },
  ];

  return (
    <ScreenLayout backgroundImage="/images/awards.png">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 w-full max-w-xs shadow-xl space-y-4">
          <h2 className="text-center font-bold text-xl text-gray-800">Награды</h2>
          {awards.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${a.unlocked ? 'bg-yellow-100' : 'bg-gray-100 opacity-60'}`}>
              <span className="text-3xl">{a.emoji}</span>
              <div>
                <p className="font-bold text-sm">{a.name}</p>
                <p className="text-xs text-gray-600">{a.desc}</p>
                {a.unlocked && <span className="text-xs text-green-600 font-bold">✅ Получено!</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Меню
        </button>
        <button
          onClick={() => toggleAudio('/audio/awards.mp3')}
          className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg"
        >
          <Volume2 size={28} />
        </button>
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg"
        >
          ➜
        </button>
      </div>
    </ScreenLayout>
  );
};

export default AwardsScreen;
