import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { saveProfile } from '@/lib/storage';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';

const RegisterChild = () => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentPassword, setParentPassword] = useState('');

  useEffect(() => () => stopAudio(), []);

  const handleSubmit = () => {
    if (!childName || !childAge || !parentName || !parentPhone || !parentPassword) return;
    saveProfile({
      role: 'child',
      childName,
      childAge,
      parentName,
      parentPhone,
      parentPassword,
    });
    stopAudio();
    navigate('/menu');
  };

  return (
    <ScreenLayout backgroundImage="/images/registration_child_parent.png">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-xs space-y-3 bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl">
          <input
            type="text"
            placeholder="Твоё имя"
            value={childName}
            onChange={e => setChildName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 text-lg focus:outline-none focus:border-orange-500"
          />
          <input
            type="number"
            placeholder="Сколько тебе лет?"
            value={childAge}
            onChange={e => setChildAge(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 text-lg focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            placeholder="Имя родителя"
            value={parentName}
            onChange={e => setParentName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 text-lg focus:outline-none focus:border-orange-500"
          />
          <input
            type="tel"
            placeholder="Телефон родителя"
            value={parentPhone}
            onChange={e => setParentPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 text-lg focus:outline-none focus:border-orange-500"
          />
          <input
            type="password"
            placeholder="Пароль родителя"
            value={parentPassword}
            onChange={e => setParentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 text-lg focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={() => toggleAudio('/audio/registration_child.mp3')}
            className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <Volume2 size={28} />
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            ➜
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default RegisterChild;
