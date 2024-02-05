import React, { useEffect } from 'react';
import App from './App';

const FullscreenPage: React.FC = () => {
  const handleFullscreen = () => {

  };

  const deshabilitarMouseDown = (event: MouseEvent) => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('mousedown', deshabilitarMouseDown);
    handleFullscreen();
  }, []);

  return (
    <div>
      <App deshabilitarMouseDown={deshabilitarMouseDown}/>
    </div>
  );
};

export default FullscreenPage;
