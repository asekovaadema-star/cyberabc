import { useNavigate } from 'react-router-dom';
import { getStats, saveStats } from '@/lib/storage';
import { Volume2 } from 'lucide-react';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { useEffect, useState } from 'react';

const ITEMS = [
  { letter: 'А', image: '/images/letter_aa.png', audio: '/audio/letter_a.mp3' },
  { letter: 'Б', image: '/images/letter_bb.png', audio: '/audio/letter_б.mp3' },
  { letter: 'В', image: '/images/letter_vv.png', audio: '/audio/letter_в.mp3' },
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
                src={item.image}
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
      style={{ backgroundImage: `url(${current.image})` }}
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
