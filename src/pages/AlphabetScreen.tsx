import { useNavigate, useParams } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { ALPHABET, getLetterImage, getStats, saveStats } from '@/lib/storage';
import { Volume2, Menu } from 'lucide-react';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { useEffect } from 'react';

const AlphabetScreen = () => {
  const navigate = useNavigate();
  const { index } = useParams<{ index: string }>();
  const idx = parseInt(index || '0', 10);
  const letter = ALPHABET[idx];

  useEffect(() => () => stopAudio(), []);

  const handleNext = () => {
    stopAudio();
    const stats = getStats();
    if (idx > stats.alphabetProgress) {
      stats.alphabetProgress = idx;
    }
    if (idx === ALPHABET.length - 1) {
      stats.alphabetCompleted = true;
    }
    saveStats(stats);

    if (idx < ALPHABET.length - 1) {
      navigate(`/alphabet/${idx + 1}`);
    } else {
      navigate('/menu');
    }
  };

  if (!letter) {
    navigate('/menu');
    return null;
  }

  return (
    <ScreenLayout backgroundImage={getLetterImage(letter)}>
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-6">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg transition-transform active:scale-95"
        >
          Меню
        </button>
        <button
          onClick={() => toggleAudio(`/audio/letter_${letter === 'а' ? 'a' : letter}.mp3`)}
          className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <Volume2 size={28} />
        </button>
        <button
          onClick={handleNext}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-transform active:scale-95"
        >
          ➜
        </button>
      </div>
    </ScreenLayout>
  );
};

export default AlphabetScreen;
