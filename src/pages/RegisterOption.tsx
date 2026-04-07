import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { Volume2 } from 'lucide-react';
import { useEffect } from 'react';

const RegisterOption = () => {
  const navigate = useNavigate();
  useEffect(() => () => stopAudio(), []);

  return (
    <ScreenLayout backgroundImage="/images/registration_option.png">
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => { stopAudio(); navigate('/register-child'); }}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-transform active:scale-95"
          >
            Совёнок
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/register-child'); }}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-transform active:scale-95"
          >
            Родитель
          </button>
        </div>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => toggleAudio('/audio/registration_child_parent.mp3')}
            className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <Volume2 size={28} />
          </button>
          <button
            onClick={() => { stopAudio(); navigate('/register-child'); }}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-transform active:scale-95"
          >
            ➜
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default RegisterOption;
