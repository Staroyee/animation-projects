import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const MatrixContainer = styled.div`
  background: black;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MatrixCanvas = styled.canvas`
  ${props => css`
    font-size: ${props.fontSize}px;
  `}
`;

const MatrixApp = () => {
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [rainDrops, setRainDrops] = useState([]);

  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const alphabet = katakana + latin + nums;

  const fontSize = 12; // Adjust the font size as desired
  const columns = Math.floor(window.innerWidth / fontSize);
  const rows = Math.floor(window.innerHeight / fontSize);

  useEffect(() => {
    const canvasElement = document.getElementById('Matrix');
    if (canvasElement) {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
      setCanvas(canvasElement);
      setContext(canvasElement.getContext('2d'));

      const initialRainDrops = [];
      for (let x = 0; x < columns; x++) {
        initialRainDrops[x] = Math.floor(Math.random() * rows);
      }
      setRainDrops(initialRainDrops);
    }
  }, [columns, rows]);

  useEffect(() => {
    const draw = () => {
      if (context && canvas) {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#0F0';
        context.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
          const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

          if (rainDrops[i] * fontSize > canvas.height) {
            rainDrops[i] = 0;
          } else {
            rainDrops[i]++;
          }
        }
      }
    };

    const intervalId = setInterval(draw, 30);
    return () => clearInterval(intervalId);
  }, [rainDrops, context, canvas, alphabet, fontSize]);

  return (
    <MatrixContainer>
      <MatrixCanvas
        id="Matrix"
        fontSize={fontSize} // Pass the font size as a prop
      />
    </MatrixContainer>
  );
};

export default MatrixApp;
