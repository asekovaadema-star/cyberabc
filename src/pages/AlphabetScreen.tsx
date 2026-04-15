import { useNavigate } from 'react-router-dom';
import { getStats, saveStats } from '@/lib/storage';
import { Volume2 } from 'lucide-react';
import { toggleAudio, stopAudio } from '@/lib/audioPlayer';
import { useEffect, useState } from 'react';

const ITEMS = [
  { letter: 'А', image: '/images/letter_a.png', audio: '/audio/letter_a.mp3' },
  { letter: 'Б', image: '/images/letter_b.png', audio: '/audio/letter_б.mp3' },
  { letter: 'В', image: '/images/letter_v.png', audio: '/audio/letter_в.mp3' },
  { letter: 'Г', image: '/images/letter_g.png', audio: '/audio/letter_г.mp3' },
  { letter: 'Д', image: '/images/letter_d.png', audio: '/audio/letter_д.mp3' },
  { letter: 'Е', image: '/images/letter_e.png', audio: '/audio/letter_е.mp3' },
  { letter: 'Ж', image: '/images/letter_j.png', audio: '/audio/letter_ж.mp3' },
  { letter: 'З', image: '/images/letter_z.png', audio: '/audio/letter_з.mp3' },
  { letter: 'И', image: '/images/letter_i.png', audio: '/audio/letter_и.mp3' },
  { letter: 'К', image: '/images/letter_k.png', audio: '/audio/letter_к.mp3' },
  { letter: 'Л', image: '/images/letter_l.png', audio: '/audio/letter_л.mp3' },
  { letter: 'М', image: '/images/letter_m.png', audio: '/audio/letter_м.mp3' },
  { letter: 'Н', image: '/images/letter_n.png', audio: '/audio/letter_н.mp3' },
  { letter: 'О', image: '/images/letter_o.png', audio: '/audio/letter_о.mp3' },
  { letter: 'П', image: '/images/letter_p.png', audio: '/audio/letter_п.mp3' },
  { letter: 'Р', image: '/images/letter_r.png', audio: '/audio/letter_р.mp3' },
  { letter: 'С', image: '/images/letter_s.png', audio: '/audio/letter_с.mp3' },
  { letter: 'Т', image: '/images/letter_t.png', audio: '/audio/letter_т.mp3' },
  { letter: 'У', image: '/images/letter_y.png', audio: '/audio/letter_у.mp3' },
  { letter: 'Ф', image: '/images/letter_f.png', audio: '/audio/letter_ф.mp3' },
  { letter: 'Х', image: '/images/letter_x.png', audio: '/audio/letter_х.mp3' },
  { letter: 'Ц', image: '/images/letter_c.png', audio: '/audio/letter_ц.mp3' },
  { letter: 'Ч', image: '/images/letter_ch.png', audio: '/audio/letter_ч.mp3' },
  { letter: 'Ш', image: '/images/letter_sh.png', audio: '/audio/letter_ш.mp3' },
  { letter: 'Щ', image: '/images/letter_shh.png', audio: '/audio/letter_щ.mp3' },
  { letter: 'Э', image: '/images/letter_ee.png', audio: '/audio/letter_э.mp3' },
  { letter: 'Ю', image: '/images/letter_u.png', audio: '/audio/letter_ю.mp3' },
  { letter: 'Я', image: '/images/letter_ya.png', audio: '/audio/letter_я.mp3' },
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
