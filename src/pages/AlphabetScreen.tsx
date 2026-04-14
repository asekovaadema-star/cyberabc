import { useNavigate } from 'react-router-dom';
import { getStats, saveStats } from '@/lib/storage';
import { Volume2 } from 'lucide-react';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { useEffect, useState } from 'react';

const ITEMS = [
  { letter: 'А', img: '/images/letter_a.png', audio: '/audio/letter_a.mp3' },
  { letter: 'Б', img: '/images/letter_б.png', audio: '/audio/letter_б.mp3' },
  { letter: 'В', img: '/images/letter_в.png', audio: '/audio/letter_в.mp3' },
  { letter: 'Г', img: '/images/letter_г.png', audio: '/audio/letter_г.mp3' },
  { letter: 'Д', img: '/images/letter_д.png', audio: '/audio/letter_д.mp3' },
  { letter: 'Е', img: '/images/letter_е.png', audio: '/audio/letter_е.mp3' },
  { letter: 'Ж', img: '/images/letter_ж.png', audio: '/audio/letter_ж.mp3' },
  { letter: 'З', img: '/images/letter_з.png', audio: '/audio/letter_з.mp3' },
  { letter: 'И', img: '/images/letter_и.png', audio: '/audio/letter_и.mp3' },
  { letter: 'К', img: '/images/letter_к.png', audio: '/audio/letter_к.mp3' },
  { letter: 'Л', img: '/images/letter_л.png', audio: '/audio/letter_л.mp3' },
  { letter: 'М', img: '/images/letter_м.png', audio: '/audio/letter_м.mp3' },
  { letter: 'Н', img: '/images/letter_н.png', audio: '/audio/letter_н.mp3' },
  { letter: 'О', img: '/images/letter_о.png', audio: '/audio/letter_о.mp3' },
  { letter: 'П', img: '/images/letter_п.png', audio: '/audio/letter_п.mp3' },
  { letter: 'Р', img: '/images/letter_р.png', audio: '/audio/letter_р.mp3' },
  { letter: 'С', img: '/images/letter_с.png', audio: '/audio/letter_с.mp3' },
  { letter: 'Т', img: '/images/letter_т.png', audio: '/audio/letter_т.mp3' },
  { letter: 'У', img: '/images/letter_у.png', audio: '/audio/letter_у.mp3' },
  { letter: 'Ф', img: '/images/letter_ф.png', audio: '/audio/letter_ф.mp3' },
  { letter: 'Х', img: '/images/letter_х.png', audio: '/audio/letter_х.mp3' },
  { letter: 'Ц', img: '/images/letter_ц.png', audio: '/audio/letter_ц.mp3' },
  { letter: 'Ч', img: '/images/letter_ч.png', audio: '/audio/letter_ч.mp3' },
  { letter: 'Ш', img: '/images/letter_ш.png', audio: '/audio/letter_ш.mp3' },
  { letter: 'Щ', img: '/images/letter_щ.png', audio: '/audio/letter_щ.mp3' },
  { letter: 'Э', img: '/images/letter_э.png', audio: '/audio/letter_э.mp3' },
  { letter: 'Ю', img: '/images/letter_ю.png', audio: '/audio/letter_ю.mp3' },
  { letter: 'Я', img: '/images/letter_я.png', audio: '/audio/letter_я.mp3' },
] as const;

type ViewMode = 'grid' | 'detail';

const AlphabetScreen = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ViewMode>('grid');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const openLetter = (index: number) => {
    stopAudio();
    setCurrentIndex(index);
    setMode('detail');
  };

  const goBack = () => {
    stopAudio();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    stopAudio();
    const stats = getStats();
    if (currentIndex > stats.alphabetProgress) {
      stats.alphabetProgress = currentIndex;
    }
    if (currentIndex === ITEMS.length - 1) {
      stats.alphabetCompleted = true;
      saveStats(stats);
      setMode('grid');
      return;
    }
    saveStats(stats);
    setCurrentIndex(currentIndex + 1);
  };

  const backToGrid = () => {
    stopAudio();
    setMode('grid');
  };

  /* ─── GRID VIEW ─── */
  if (mode === 'grid') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-400/90 hover:bg-orange-500 text-white py-1.5 px-4 rounded-full font-bold text-sm shadow transition-transform active:scale-95"
          >
            ← Меню
          </button>
          <h1 className="text-xl font-bold text-orange-700">Азбука</h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7">
          {ITEMS.map((item, i) => (
            <button
              key={item.letter}
              onClick={() => openLetter(i)}
              className="relative aspect-square rounded-xl overflow-hidden shadow-md border-2 border-orange-300 hover:border-orange-500 transition-all active:scale-95"
            >
              <img
                src={item.img}
                alt={`Буква ${item.letter}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-orange-400/80 text-white text-center text-lg font-bold py-0.5">
                {item.letter}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ─── DETAIL VIEW ─── */
  const current = ITEMS[currentIndex];

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${current.img})` }}
    >
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 px-4">
        <button
          onClick={backToGrid}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2 px-4 rounded-full font-bold text-sm shadow-lg transition-transform active:scale-95"
        >
          Все буквы
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
        {currentIndex + 1} / {ITEMS.length}
      </div>
    </div>
  );
};

export default AlphabetScreen;
