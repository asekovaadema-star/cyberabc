import React from 'react';

interface ScreenLayoutProps {
  backgroundImage: string;
  children?: React.ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ backgroundImage, children }) => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};

export default ScreenLayout;
