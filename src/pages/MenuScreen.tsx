import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';
import { useEffect } from 'react';
import { getProfile } from '@/lib/storage';

const MenuScreen = () => {
  const navigate = useNavigate();
  const profile = getProfile();
  useEffect(() => () => stopAudio(), []);

  return (
    <ScreenLayout backgroundImage="/images/menu.png">
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6">
        <div className="w-full max-w-xs space-y-4 mb-6">
          <button
            onClick={() => { stopAudio(); navigate('/alphabet/0'); }}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            Азбука
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/game-menu'); }}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            Игры
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/awards'); }}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            Награды
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/parent-password'); }}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            Родительский уголок
          </button>
        </div>
        <button
          onClick={() => toggleAudio('/audio/menu.mp3')}
          className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <Volume2 size={28} />
        </button>
      </div>
    </ScreenLayout>
  );
};

export default MenuScreen;
