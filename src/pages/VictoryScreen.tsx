import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';
import { useEffect } from 'react';

const VictoryScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toggleAudio('/audio/victory.mp3');
    return () => stopAudio();
  }, []);

  return (
    <ScreenLayout backgroundImage="/images/victory.png">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2.5 px-6 rounded-full font-bold text-base shadow-lg"
        >
          Меню
        </button>
        <button
          onClick={() => { stopAudio(); navigate('/game-menu'); }}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2.5 px-6 rounded-full font-bold text-base shadow-lg"
        >
          Играть ещё
        </button>
        <button
          onClick={() => { stopAudio(); navigate('/awards'); }}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2.5 px-6 rounded-full font-bold text-base shadow-lg"
        >
          Награды
        </button>
      </div>
    </ScreenLayout>
  );
};

export default VictoryScreen;
