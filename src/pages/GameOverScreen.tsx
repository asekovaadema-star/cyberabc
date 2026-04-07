import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';
import { useEffect } from 'react';

const GameOverScreen = () => {
  const navigate = useNavigate();

  return (
    <ScreenLayout backgroundImage="/images/game_over.png">
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-6">
        <button
          onClick={() => navigate('/menu')}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Меню
        </button>
        <button
          onClick={() => navigate('/game-menu')}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Играть ещё
        </button>
        <button
          onClick={() => navigate('/awards')}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg"
        >
          Награды
        </button>
      </div>
    </ScreenLayout>
  );
};

export default GameOverScreen;
