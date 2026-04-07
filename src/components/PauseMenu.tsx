import { useNavigate } from 'react-router-dom';
import { Pause, Play, RotateCcw, Home } from 'lucide-react';
import { useState } from 'react';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
}

const PauseMenu = ({ onResume, onRestart }: PauseMenuProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); onResume(); /* triggers pause via parent */ }}
        className="absolute top-4 left-4 z-20 bg-white/80 p-2 rounded-full shadow-lg"
      >
        <Pause size={20} className="text-gray-700" />
      </button>
    );
  }

  return (
    <div className="absolute inset-0 z-30 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 space-y-3 w-56 shadow-xl">
        <h3 className="text-center font-bold text-lg text-gray-800">Пауза</h3>
        <button
          onClick={() => { setOpen(false); onResume(); }}
          className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-2.5 rounded-full shadow"
        >
          <Play size={18} /> Продолжить
        </button>
        <button
          onClick={() => { setOpen(false); onRestart(); }}
          className="w-full flex items-center justify-center gap-2 bg-orange-400 text-white font-bold py-2.5 rounded-full shadow"
        >
          <RotateCcw size={18} /> Заново
        </button>
        <button
          onClick={() => navigate('/menu')}
          className="w-full flex items-center justify-center gap-2 bg-gray-400 text-white font-bold py-2.5 rounded-full shadow"
        >
          <Home size={18} /> Меню
        </button>
      </div>
    </div>
  );
};

export default PauseMenu;
