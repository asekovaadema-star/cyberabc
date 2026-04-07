import { useNavigate } from 'react-router-dom';
import { getProfile } from '@/lib/storage';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const profile = getProfile();

  useEffect(() => {
    if (profile) {
      navigate('/menu');
    } else {
      navigate('/opening');
    }
  }, [profile, navigate]);

  return null;
};

export default Index;
