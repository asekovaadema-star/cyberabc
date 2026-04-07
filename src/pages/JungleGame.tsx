import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, saveStats } from '@/lib/storage';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';

const SAFE = [
  "Привет! Как дела? Давай поиграем после школы!",
  "Мама сказала забрать тебя в 15:00",
  "Вот ссылка на школьный сайт (school.edu)",
  "Спасибо за помощь!",
  "Учитель прислал домашнее задание",
  "Завтра контрольная по математике, готовься!",
];

const DANGEROUS = [
  "Пришли мне свой пароль, я проверю его на безопасность!",
  "Скачай эту программу: free-game.exe",
  "Скинь фото своего дома, я хочу посмотреть",
  "Если не пришлёшь деньги — расскажу всем твой секрет",
  "Нажми на эту ссылку, получишь 1000 рублей!",
  "Дай номер карты мамы, я куплю тебе подарок",
  "Ты выиграл приз! Введи данные за 10 минут",
  "Вот ссылка на школьный сайт (free-prizes.com)",
];

const JungleGame = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [messages] = useState(() => {
    const all = [
      ...SAFE.map(t => ({ text: t, safe: true })),
      ...DANGEROUS.map(t => ({ text: t, safe: false })),
    ];
    const shuffled = all.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  });
  const [answered, setAnswered] = useState<boolean[]>(new Array(6).fill(false));
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (idx: number, userSaysSafe: boolean) => {
    if (answered[idx]) return;
    const msg = messages[idx];
    const correct = msg.safe === userSaysSafe;
    const newAnswered = [...answered];
    newAnswered[idx] = true;
    setAnswered(newAnswered);

    if (correct) {
      setScore(s => s + 1);
      setFeedback('✅ Правильно!');
    } else {
      setMistakes(m => m + 1);
      setFeedback('❌ Неправильно!');
    }

    setTimeout(() => setFeedback(null), 800);

    if (newAnswered.every(Boolean)) {
      setTimeout(() => {
        const stats = getStats();
        stats.jungleGamesPlayed++;
        stats.totalGamesPlayed++;
        if (mistakes === 0 && correct) {
          stats.jungleCleanWins++;
        }
        saveStats(stats);
        navigate(score + (correct ? 1 : 0) >= 4 ? '/victory' : '/game-over');
      }, 1000);
    }
  };

  return (
    <ScreenLayout backgroundImage="/images/social_jungls.png">
      <div className="absolute top-4 left-0 right-0 flex justify-between px-6">
        <span className="bg-white/80 rounded-full px-4 py-2 font-bold text-green-600">✅ {score}</span>
        <span className="bg-white/80 rounded-full px-4 py-2 font-bold text-red-600">❌ {mistakes}</span>
      </div>

      {feedback && (
        <div className="absolute top-16 left-0 right-0 flex justify-center">
          <span className="bg-white/90 rounded-full px-6 py-2 font-bold text-xl shadow-lg">{feedback}</span>
        </div>
      )}

      <div className="absolute inset-x-4 top-24 bottom-20 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg ${answered[idx] ? 'opacity-50' : ''}`}>
            <p className="text-sm font-semibold mb-2">{msg.text}</p>
            {!answered[idx] && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAnswer(idx, true)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-full text-sm font-bold"
                >
                  Безопасно
                </button>
                <button
                  onClick={() => handleAnswer(idx, false)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-full text-sm font-bold"
                >
                  Опасно
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Меню
        </button>
      </div>
    </ScreenLayout>
  );
};

export default JungleGame;
