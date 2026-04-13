import { useNavigate } from 'react-router-dom';
import { getStats, saveStats } from '@/lib/storage';
import { Volume2 } from 'lucide-react';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { useEffect, useState } from 'react';

const ITEMS = [
  { letter: 'А', image: '/images/letter_a.png', audio: '/audio/letter_a.mp3' },
  { letter: 'Б', image: '/images/letter_б.png', audio: '/audio/letter_б.mp3' },
  { letter: 'В', image: '/images/letter_в.png', audio: '/audio/letter_в.mp3' },
  { letter: 'Г', image: '/images/letter_г.png', audio: '/audio/letter_г.mp3' },
  { letter: 'Д', image: '/images/letter_д.png', audio: '/audio/letter_д.mp3' },
  { letter: 'Е', image: '/images/letter_е.png', audio: '/audio/letter_е.mp3' },
  { letter: 'Ж', image: '/images/letter_ж.png', audio: '/audio/letter_ж.mp3' },
  { letter: 'З', image: '/images/letter_з.png', audio: '/audio/letter_з.mp3' },
  { letter: 'И', image: '/images/letter_и.png', audio: '/audio/letter_и.mp3' },
  { letter: 'К', image: '/images/letter_к.png', audio: '/audio/letter_к.mp3' },
  { letter: 'Л', image: '/images/letter_л.png', audio: '/audio/letter_л.mp3' },
  { letter: 'М', image: '/images/letter_м.png', audio: '/audio/letter_м.mp3' },
  { letter: 'Н', image: '/images/letter_н.png', audio: '/audio/letter_н.mp3' },
  { letter: 'О', image: '/images/letter_о.png', audio: '/audio/letter_о.mp3' },
  { letter: 'П', image: '/images/letter_п.png', audio: '/audio/letter_п.mp3' },
  { letter: 'Р', image: '/images/letter_р.png', audio: '/audio/letter_р.mp3' },
  { letter: 'С', image: '/images/letter_с.png', audio: '/audio/letter_с.mp3' },
  { letter: 'Т', image: '/images/letter_т.png', audio: '/audio/letter_т.mp3' },
  { letter: 'У', image: '/images/letter_у.png', audio: '/audio/letter_у.mp3' },
  { letter: 'Ф', image: '/images/letter_ф.png', audio: '/audio/letter_ф.mp3' },
  { letter: 'Х', image: '/images/letter_х.png', audio: '/audio/letter_х.mp3' },
  { letter: 'Ц', image: '/images/letter_ц.png', audio: '/audio/letter_ц.mp3' },
  { letter: 'Ч', image: '/images/letter_ч.png', audio: '/audio/letter_ч.mp3' },
  { letter: 'Ш', image: '/images/letter_ш.png', audio: '/audio/letter_ш.mp3' },
  { letter: 'Щ', image: '/images/letter_щ.png', audio: '/audio/letter_щ.mp3' },
  { letter: 'Э', image: '/images/letter_э.png', audio: '/audio/letter_э.mp3' },
  { letter: 'Ю', image: '/images/letter_ю.png', audio: '/audio/letter_ю.mp3' },
  { letter: 'Я', image: '/images/letter_я.png', audio: '/audio/letter_я.mp3' },
] as const;

const TOTAL = ITEMS.length; // 28

const AlphabetScreen = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const current = ITEMS[currentIndex];

  const goBack = () => {
    if (currentIndex > 0) {
      stopAudio();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goNext = () => {
    stopAudio();
    const stats = getStats();
    if (currentIndex > stats.alphabetProgress) {
      stats.alphabetProgress = currentIndex;
    }
    if (currentIndex === TOTAL - 1) {
      stats.alphabetCompleted = true;
      saveStats(stats);
      navigate('/menu');
      return;
    }
    saveStats(stats);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${current.image})` }}
    >
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 px-4">
        <button
          onClick={() => { stopAudio(); navigate('/menu'); }}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2 px-4 rounded-full font-bold text-sm shadow-lg transition-transform active:scale-95"
        >
          Меню
        </button>

        {currentIndex > 0 && (
          <button
            onClick={goBack}
            className="bg-orange-400/90 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full text-base shadow-lg transition-transform active:scale-95"
          >
            ←
          </button>
        )}

        <button
          onClick={() => toggleAudio(current.audio)}
          className="bg-orange-400/90 hover:bg-orange-500 text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <Volume2 size={20} />
        </button>

        <button
          onClick={goNext}
          className="bg-orange-400/90 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full text-base shadow-lg transition-transform active:scale-95"
        >
          ➜
        </button>
      </div>

      <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1} / {TOTAL}
      </div>
    </div>
  );
};

export default AlphabetScreen;
