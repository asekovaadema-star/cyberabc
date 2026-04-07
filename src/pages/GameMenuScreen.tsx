import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';
import { useEffect } from 'react';

const GameMenuScreen = () => {
  const navigate = useNavigate();
  useEffect(() => () => stopAudio(), []);

  return (
    <ScreenLayout backgroundImage="/images/game_menu.png">
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6">
        <div className="w-full max-w-xs space-y-4 mb-6">
          <button
            onClick={() => { stopAudio(); navigate('/password-instruction'); }}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            Супер пароль
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/letter-instruction'); }}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            Кибер лес
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/jungle-game'); }}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            Социальные джунгли
          </button>
        </div>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => { stopAudio(); navigate('/menu'); }}
            className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg transition-transform active:scale-95"
          >
            Меню
          </button>
          <button
            onClick={() => toggleAudio('/audio/game_menu.mp3')}
            className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <Volume2 size={28} />
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default GameMenuScreen;
