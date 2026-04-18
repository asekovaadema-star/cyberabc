import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, saveStats } from '@/lib/storage';
import { stopAudio } from '@/lib/audioPlayer';
import PauseMenu from '@/components/PauseMenu';

const SAFE = [
  "Привет! Как дела?",
  "Давай сделаем домашку вместе",
  "Я отправил тебе фото с прогулки",
  "Во сколько завтра встречаемся?",
  "Смотри, какое классное видео",
  "Ты сделал задание по математике?",
  "Можешь помочь с английским?",
  "Я сегодня занят, напишу позже",
  "Скинь, пожалуйста, расписание",
  "Спасибо за помощь!",
  "Давай поиграем вечером",
  "Ты уже дома?",
  "Я купил билеты",
  "Не забудь про тест завтра",
  "Я добавил тебя в группу",
];

const DANGEROUS = [
  "Срочно отправь мне свой пароль",
  "Скинь номер карты, это важно",
  "Отправь это сообщение 10 людям, иначе случится плохое",
  "Перешли это всем своим друзьям прямо сейчас",
  "Отправь код, который тебе пришёл",
  "Я выиграл конкурс за тебя, отправь свои данные",
  "Нажми на эту ссылку и введи пароль",
  "Это секрет, никому не говори и отправь мне фото",
  "Отправь мне своё фото паспорта",
  "Перешли это сообщение, чтобы получить приз",
  "Если не отправишь это, твой аккаунт удалят",
  "Скинь свой адрес, я отправлю подарок",
  "Отправь это в 5 чатов, чтобы не потерять доступ",
  "Срочно отправь фото своей карты с двух сторон",
  "Я из поддержки, отправь логин и пароль",
  "Перешли это сообщение, чтобы разблокировать аккаунт",
  "Отправь мне все свои пароли, я помогу",
  "Нажми сюда и скачай файл (неизвестный файл)",
  "Скинь свой номер телефона и код из SMS",
  "Отправь это сообщение всем, чтобы получить деньги",
];

const shuffle = () => {
  const all = [
    ...SAFE.map(t => ({ text: t, safe: true })),
    ...DANGEROUS.map(t => ({ text: t, safe: false })),
  ];
  return all.sort(() => Math.random() - 0.5).slice(0, 6);
};

const JungleGame = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(shuffle);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(6).fill(false));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const handleAnswer = (idx: number, userSaysSafe: boolean) => {
    if (answered[idx]) return;
    const msg = messages[idx];
    const correct = msg.safe === userSaysSafe;
    const newAnswered = [...answered];
    newAnswered[idx] = true;
    setAnswered(newAnswered);

    const newScore = correct ? score + 1 : score;
    const newMistakes = correct ? mistakes : mistakes + 1;
    if (correct) setScore(newScore);
    else setMistakes(newMistakes);

    setFeedback(correct ? '✅ Правильно!' : '❌ Неправильно!');
    setTimeout(() => setFeedback(null), 800);

    if (newAnswered.every(Boolean)) {
      setTimeout(() => {
        const stats = getStats();
        stats.jungleGamesPlayed++;
        stats.totalGamesPlayed++;
        if (newMistakes === 0) stats.jungleCleanWins++;
        saveStats(stats);
        navigate(newScore >= 4 ? '/victory' : '/game-over');
      }, 1000);
    }
  };

  const handleRestart = () => {
    setMessages(shuffle());
    setScore(0);
    setMistakes(0);
    setAnswered(new Array(6).fill(false));
    setFeedback(null);
    setPaused(false);
  };

  return (
    <ScreenLayout backgroundImage="/images/social_jungls.png">
      <PauseMenu
        onResume={() => setPaused(p => !p)}
        onRestart={handleRestart}
      />
      <div className="absolute top-4 left-16 right-4 flex justify-between">
        <span className="bg-white/80 rounded-full px-3 py-1.5 font-bold text-sm text-green-600">✅ {score}</span>
        <span className="bg-white/80 rounded-full px-3 py-1.5 font-bold text-sm text-red-600">❌ {mistakes}</span>
      </div>

      {feedback && (
        <div className="absolute top-14 left-0 right-0 flex justify-center z-10">
          <span className="bg-white/90 rounded-full px-6 py-2 font-bold text-lg shadow-lg">{feedback}</span>
        </div>
      )}

      <div className="absolute inset-x-4 top-20 bottom-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg ${answered[idx] ? 'opacity-50' : ''}`}>
            <p className="text-xs font-semibold mb-2">{msg.text}</p>
            {!answered[idx] && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAnswer(idx, true)}
                  className="flex-1 bg-green-500 text-white py-1.5 rounded-full text-xs font-bold"
                >
                  Безопасно
                </button>
                <button
                  onClick={() => handleAnswer(idx, false)}
                  className="flex-1 bg-red-500 text-white py-1.5 rounded-full text-xs font-bold"
                >
                  Опасно
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScreenLayout>
  );
};

export default JungleGame;
