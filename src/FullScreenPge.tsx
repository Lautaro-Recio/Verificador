import React, { useEffect } from 'react';
import App from './App';

const FullscreenPage: React.FC = () => {
  const handleFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  useEffect(() => {
    const deshabilitarMouseDown = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener('mousedown', deshabilitarMouseDown);

    return () => {
      document.removeEventListener('mousedown', deshabilitarMouseDown);
    };

    
    const handleClick = () => {
      handleFullscreen();
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      <App />
    </div>
  );
};

export default FullscreenPage;
