import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';
import { useEffect } from 'react';

const PlotScreen = () => {
  const navigate = useNavigate();

  useEffect(() => () => stopAudio(), []);

  return (
    <ScreenLayout backgroundImage="/images/plot_of_the_game.png">
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
        <button
          onClick={() => toggleAudio('/audio/plot_of_the_game.mp3')}
          className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <Volume2 size={28} />
        </button>
        <button
          onClick={() => { stopAudio(); navigate('/register-option'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-transform active:scale-95"
        >
          ➜
        </button>
      </div>
    </ScreenLayout>
  );
};

export default PlotScreen;
