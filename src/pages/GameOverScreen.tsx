import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';

const GameOverScreen = () => {
  const navigate = useNavigate();

  return (
    <ScreenLayout backgroundImage="/images/game_over.png">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
        <button
          onClick={() => navigate('/menu')}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2.5 px-6 rounded-full font-bold text-base shadow-lg"
        >
          Меню
        </button>
        <button
          onClick={() => navigate('/game-menu')}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2.5 px-6 rounded-full font-bold text-base shadow-lg"
        >
          Играть ещё
        </button>
        <button
          onClick={() => navigate('/awards')}
          className="bg-orange-400/90 hover:bg-orange-500 text-white py-2.5 px-6 rounded-full font-bold text-base shadow-lg"
        >
          Награды
        </button>
      </div>
    </ScreenLayout>
  );
};

export default GameOverScreen;
