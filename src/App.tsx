import React from 'react';
import { FramePlayer } from './components/FramePlayer';

function App() {
  const imgs = [
    'https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027.jpg',
    'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg',
    'data:image/jpeg;base64,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',
    'http://4.bp.blogspot.com/-3YwFT7wiDnE/VT5NLGC20qI/AAAAAAABC8Y/tQcMBoQkbEk/s1600/adffb142a07755f9fc4e1400e3491ae32.jpg',
    'https://static6.depositphotos.com/1030334/671/i/600/depositphotos_6710151-stock-photo-eyes.jpg',
    'https://portalfotografianapratica.com/wp-content/uploads/2019/09/miniatura-01-730x410.jpg'
  ]
  return (
    <div>
      <FramePlayer frames={imgs} fps={0.5} />
    </div>
  );
}

export default App;
