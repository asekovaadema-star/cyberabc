import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { Volume2 } from 'lucide-react';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { useEffect } from 'react';

const LetterInstruction = () => {
  const navigate = useNavigate();
  useEffect(() => () => stopAudio(), []);

  return (
    <ScreenLayout backgroundImage="/images/letter_instruction.png">
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Меню
        </button>
        <button
          onClick={() => toggleAudio('/audio/pause.mp3')}
          className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg"
        >
          <Volume2 size={28} />
        </button>
        <button
          onClick={() => { stopAudio(); navigate('/forest-game'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg"
        >
          ➜
        </button>
      </div>
    </ScreenLayout>
  );
};

export default LetterInstruction;
