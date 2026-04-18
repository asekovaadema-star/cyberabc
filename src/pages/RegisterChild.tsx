import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { saveProfile, SecurityAnswers } from '@/lib/storage';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';

const RegisterChild = () => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<SecurityAnswers>({
    childrenCount: '',
    favoriteColor: '',
    birthCountry: '',
    carBrand: '',
    motherName: '',
  });
  const [error, setError] = useState('');

  useEffect(() => () => stopAudio(), []);

  const updateAnswer = (key: keyof SecurityAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = () => {
    if (!childName || !childAge || !parentName || !parentPhone || !parentPassword) {
      setError('Заполните все основные поля');
      return;
    }
    const allAnswered = Object.values(answers).every(v => v.trim().length > 0);
    if (!allAnswered) {
      setError('Ответьте на все 5 дополнительных вопросов');
      setShowQuestions(true);
      return;
    }
    saveProfile({
      role: 'child',
      childName,
      childAge,
      parentName,
      parentPhone,
      parentPassword,
      securityAnswers: answers,
    });
    stopAudio();
    navigate('/menu');
  };

  return (
    <ScreenLayout backgroundImage="/images/registration_child_parent.png">
      <div className="absolute inset-0 flex flex-col items-center justify-start px-6 py-6 overflow-y-auto">
        <div className="w-full max-w-xs space-y-3 bg-white/85 backdrop-blur rounded-2xl p-5 shadow-xl">
          <input
            type="text"
            placeholder="Твоё имя"
            value={childName}
            onChange={e => setChildName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-300 text-base focus:outline-none focus:border-orange-500"
          />
          <input
            type="number"
            placeholder="Сколько тебе лет?"
            value={childAge}
            onChange={e => setChildAge(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-300 text-base focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            placeholder="Имя родителя"
            value={parentName}
            onChange={e => setParentName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-300 text-base focus:outline-none focus:border-orange-500"
          />
          <input
            type="tel"
            placeholder="Телефон родителя"
            value={parentPhone}
            onChange={e => setParentPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-300 text-base focus:outline-none focus:border-orange-500"
          />
          <input
            type="password"
            placeholder="Пароль родителя"
            value={parentPassword}
            onChange={e => setParentPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-300 text-base focus:outline-none focus:border-orange-500"
          />

          <button
            type="button"
            onClick={() => setShowQuestions(s => !s)}
            className="w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold py-2 rounded-xl text-sm shadow"
          >
            {showQuestions ? '▲ Скрыть' : '▼ Дополнительные вопросы для родителя'}
          </button>

          {showQuestions && (
            <div className="space-y-2 pt-1">
              <input
                type="text"
                placeholder="Сколько у вас детей?"
                value={answers.childrenCount}
                onChange={e => updateAnswer('childrenCount', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Любимый цвет?"
                value={answers.favoriteColor}
                onChange={e => updateAnswer('favoriteColor', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Место рождения (страна)?"
                value={answers.birthCountry}
                onChange={e => updateAnswer('birthCountry', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Любимая марка машины?"
                value={answers.carBrand}
                onChange={e => updateAnswer('carBrand', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Как зовут вашу маму?"
                value={answers.motherName}
                onChange={e => updateAnswer('motherName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          {error && <p className="text-red-600 text-center text-xs font-semibold">{error}</p>}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 mb-6">
          <button
            onClick={() => toggleAudio('/audio/registration_child.mp3')}
            className="bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <Volume2 size={24} />
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2.5 px-7 rounded-full text-lg shadow-lg transition-transform active:scale-95"
          >
            ➜
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default RegisterChild;
