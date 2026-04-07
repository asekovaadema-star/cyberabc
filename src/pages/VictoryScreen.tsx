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
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-6">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Меню
        </button>
        <button
          onClick={() => { stopAudio(); navigate('/game-menu'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Играть ещё
        </button>
        <button
          onClick={() => { stopAudio(); navigate('/awards'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Награды
        </button>
      </div>
    </ScreenLayout>
  );
};

export default VictoryScreen;
