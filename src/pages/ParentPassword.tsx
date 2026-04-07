import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getProfile } from '@/lib/storage';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';

const ParentPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const profile = getProfile();

  const handleSubmit = () => {
    if (profile && password === profile.parentPassword) {
      stopAudio();
      navigate('/parent-dashboard');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <ScreenLayout backgroundImage="/images/parent_password.png">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 w-full max-w-xs shadow-xl space-y-4">
          <h2 className="text-center font-bold text-xl text-gray-800">Введите пароль родителя</h2>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            placeholder="Пароль"
            className={`w-full px-4 py-3 rounded-xl border-2 ${error ? 'border-red-400' : 'border-orange-300'} text-lg focus:outline-none focus:border-orange-500`}
          />
          {error && <p className="text-red-500 text-center text-sm">Неверный пароль</p>}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-full text-lg shadow-lg"
          >
            Войти
          </button>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={() => { stopAudio(); navigate('/menu'); }}
            className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
          >
            Меню
          </button>
          <button
            onClick={() => toggleAudio('/audio/parent_password.mp3')}
            className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg"
          >
            <Volume2 size={28} />
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ParentPassword;
