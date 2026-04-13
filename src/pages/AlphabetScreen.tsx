import { useNavigate, useParams } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { getStats, saveStats } from '@/lib/storage';
import { Volume2 } from 'lucide-react';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { useEffect } from 'react';

const ALPHABET_LIST = [
  { letter: 'а', image: '/images/letter_a.png' },
  { letter: 'б', image: '/images/letter_б.png' },
  { letter: 'в', image: '/images/letter_в.png' },
  { letter: 'г', image: '/images/letter_г.png' },
  { letter: 'д', image: '/images/letter_д.png' },
  { letter: 'е', image: '/images/letter_е.png' },
  { letter: 'ж', image: '/images/letter_ж.png' },
  { letter: 'з', image: '/images/letter_з.png' },
  { letter: 'и', image: '/images/letter_и.png' },
  { letter: 'к', image: '/images/letter_к.png' },
  { letter: 'л', image: '/images/letter_л.png' },
  { letter: 'м', image: '/images/letter_м.png' },
  { letter: 'н', image: '/images/letter_н.png' },
  { letter: 'о', image: '/images/letter_о.png' },
  { letter: 'п', image: '/images/letter_п.png' },
  { letter: 'р', image: '/images/letter_р.png' },
  { letter: 'с', image: '/images/letter_с.png' },
  { letter: 'т', image: '/images/letter_т.png' },
  { letter: 'у', image: '/images/letter_у.png' },
  { letter: 'ф', image: '/images/letter_ф.png' },
  { letter: 'х', image: '/images/letter_х.png' },
  { letter: 'ц', image: '/images/letter_ц.png' },
  { letter: 'ч', image: '/images/letter_ч.png' },
  { letter: 'ш', image: '/images/letter_ш.png' },
  { letter: 'щ', image: '/images/letter_щ.png' },
  { letter: 'э', image: '/images/letter_э.png' },
  { letter: 'ю', image: '/images/letter_ю.png' },
  { letter: 'я', image: '/images/letter_я.png' },
];

const AlphabetScreen = () => {
  const navigate = useNavigate();
  const { index } = useParams<{ index: string }>();
  const idx = parseInt(index || '0', 10);
  const item = ALPHABET_LIST[idx];

  useEffect(() => () => stopAudio(), []);

  if (!item || idx < 0 || idx >= ALPHABET_LIST.length) {
    navigate('/menu');
    return null;
  }

  const handleNext = () => {
    stopAudio();
    const stats = getStats();
    if (idx > stats.alphabetProgress) {
      stats.alphabetProgress = idx;
    }
    if (idx === ALPHABET_LIST.length - 1) {
      stats.alphabetCompleted = true;
    }
    saveStats(stats);

    if (idx < ALPHABET_LIST.length - 1) {
      navigate(`/alphabet/${idx + 1}`, { replace: true });
    } else {
      navigate('/menu');
    }
  };

  const handlePrev = () => {
    stopAudio();
    if (idx > 0) {
      navigate(`/alphabet/${idx - 1}`, { replace: true });
    }
  };

  const audioFile = `/audio/letter_${item.letter === 'а' ? 'a' : item.letter}.mp3`;

  return (
    <ScreenLayout backgroundImage={item.image} key={idx}>
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-6">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2.5 px-5 rounded-full font-bold text-base shadow-lg transition-transform active:scale-95"
        >
          Меню
        </button>
        {idx > 0 && (
          <button
            onClick={handlePrev}
            className="bg-orange-400/90 hover:bg-orange-500 text-white font-bold py-2.5 px-5 rounded-full text-lg shadow-lg transition-transform active:scale-95"
          >
            ←
          </button>
        )}
        <button
          onClick={() => toggleAudio(audioFile)}
          className="bg-orange-400/90 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <Volume2 size={24} />
        </button>
        <button
          onClick={handleNext}
          className="bg-orange-400/90 hover:bg-orange-500 text-white font-bold py-2.5 px-7 rounded-full text-lg shadow-lg transition-transform active:scale-95"
        >
          ➜
        </button>
      </div>
    </ScreenLayout>
  );
};

export default AlphabetScreen;
