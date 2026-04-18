import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getProfile, SecurityAnswers } from '@/lib/storage';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';

const ParentPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryAnswers, setRecoveryAnswers] = useState<SecurityAnswers>({
    childrenCount: '',
    favoriteColor: '',
    birthCountry: '',
    carBrand: '',
    motherName: '',
  });
  const [recoveredPassword, setRecoveredPassword] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState('');
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

  const updateRecovery = (key: keyof SecurityAnswers, value: string) => {
    setRecoveryAnswers(prev => ({ ...prev, [key]: value }));
    setRecoveryError('');
  };

  const handleRecover = () => {
    if (!profile?.securityAnswers) {
      setRecoveryError('Контрольные вопросы не сохранены');
      return;
    }
    const saved = profile.securityAnswers;
    const normalize = (s: string) => s.trim().toLowerCase();
    const allMatch = (Object.keys(saved) as (keyof SecurityAnswers)[]).every(
      k => normalize(recoveryAnswers[k]) === normalize(saved[k])
    );
    if (allMatch) {
      setRecoveredPassword(profile.parentPassword);
      setRecoveryError('');
    } else {
      setRecoveryError('Ответы не совпадают. Попробуйте ещё раз');
    }
  };

  return (
    <ScreenLayout backgroundImage="/images/parent_password.png">
      <div className="absolute inset-0 flex flex-col items-center justify-start px-6 py-6 overflow-y-auto">
        {!recoveryMode ? (
          <div className="bg-white/90 backdrop-blur rounded-2xl p-6 w-full max-w-xs shadow-xl space-y-4 mt-4">
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
            <button
              onClick={() => { setRecoveryMode(true); setError(false); }}
              className="w-full text-orange-700 hover:text-orange-900 underline text-sm font-semibold"
            >
              Забыли пароль?
            </button>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur rounded-2xl p-5 w-full max-w-xs shadow-xl space-y-3 mt-2">
            <h2 className="text-center font-bold text-lg text-gray-800">Контрольные вопросы</h2>
            {recoveredPassword ? (
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-700">Ваш пароль:</p>
                <p className="text-center text-2xl font-bold text-orange-600 bg-orange-100 py-3 rounded-xl break-all">
                  {recoveredPassword}
                </p>
                <button
                  onClick={() => { setRecoveryMode(false); setRecoveredPassword(null); }}
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2.5 rounded-full text-base shadow"
                >
                  Назад ко входу
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Сколько у вас детей?"
                  value={recoveryAnswers.childrenCount}
                  onChange={e => updateRecovery('childrenCount', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Любимый цвет?"
                  value={recoveryAnswers.favoriteColor}
                  onChange={e => updateRecovery('favoriteColor', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Место рождения (страна)?"
                  value={recoveryAnswers.birthCountry}
                  onChange={e => updateRecovery('birthCountry', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Любимая марка машины?"
                  value={recoveryAnswers.carBrand}
                  onChange={e => updateRecovery('carBrand', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Как зовут вашу маму?"
                  value={recoveryAnswers.motherName}
                  onChange={e => updateRecovery('motherName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 text-sm focus:outline-none focus:border-orange-500"
                />
                {recoveryError && <p className="text-red-500 text-center text-xs">{recoveryError}</p>}
                <button
                  onClick={handleRecover}
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2.5 rounded-full text-base shadow"
                >
                  Восстановить
                </button>
                <button
                  onClick={() => setRecoveryMode(false)}
                  className="w-full text-orange-700 underline text-xs"
                >
                  Назад
                </button>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-6 mt-4 mb-4">
          <button
            onClick={() => { stopAudio(); navigate('/menu'); }}
            className="bg-orange-400 hover:bg-orange-500 text-white py-2.5 px-5 rounded-full font-bold text-base shadow-lg"
          >
            Меню
          </button>
          <button
            onClick={() => toggleAudio('/audio/parent_password.mp3')}
            className="bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg"
          >
            <Volume2 size={24} />
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ParentPassword;
