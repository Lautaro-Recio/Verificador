import React, { useEffect } from 'react';
import App from './App';

const FullscreenPage: React.FC = () => {
  const handleFullscreen = () => {
    
  };

  useEffect(() => {
    const deshabilitarMouseDown = (event: MouseEvent) => {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      event.preventDefault();
    };

    document.addEventListener('mousedown', deshabilitarMouseDown);

    return () => {
      document.removeEventListener('mousedown', deshabilitarMouseDown);
    };

    handleFullscreen();

  }, []);

  return (
    <div>
      <App />
    </div>
  );
};

export default FullscreenPage;
