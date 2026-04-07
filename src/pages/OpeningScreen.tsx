import { useNavigate } from 'react-router-dom';
import ScreenLayout from '@/components/ScreenLayout';

const OpeningScreen = () => {
  const navigate = useNavigate();
  return (
    <ScreenLayout backgroundImage="/images/opening_screen.png">
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        <button
          onClick={() => navigate('/plot')}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg transition-transform active:scale-95"
        >
          Путь
        </button>
      </div>
    </ScreenLayout>
  );
};

export default OpeningScreen;
