import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2, Home } from 'lucide-react';
import { useEffect } from 'react';

const MenuScreen = () => {
  const navigate = useNavigate();
  useEffect(() => () => stopAudio(), []);

  return (
    <ScreenLayout backgroundImage="/images/menu.png">
      {/* Parent corner - house icon top right */}
      <button
        onClick={() => { stopAudio(); navigate('/parent-password'); }}
        className="absolute top-4 right-4 bg-orange-400/80 hover:bg-orange-500 text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-95 z-10"
      >
        <Home size={22} />
      </button>

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6">
        <div className="w-full max-w-xs space-y-3 mb-4">
          <button
            onClick={() => { stopAudio(); navigate('/alphabet'); }}
            className="w-full bg-orange-400/90 hover:bg-orange-500 text-white font-bold py-3 rounded-full text-lg shadow-lg transition-transform active:scale-95"
          >
            Азбука
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/game-menu'); }}
            className="w-full bg-orange-400/90 hover:bg-orange-500 text-white font-bold py-3 rounded-full text-lg shadow-lg transition-transform active:scale-95"
          >
            Игры
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/awards'); }}
            className="w-full bg-orange-400/90 hover:bg-orange-500 text-white font-bold py-3 rounded-full text-lg shadow-lg transition-transform active:scale-95"
          >
            Награды
          </button>
        </div>
        <button
          onClick={() => toggleAudio('/audio/menu.mp3')}
          className="bg-orange-400/90 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <Volume2 size={24} />
        </button>
      </div>
    </ScreenLayout>
  );
};

export default MenuScreen;
