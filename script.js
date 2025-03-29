'use strict';

// Criando uma closure para gerenciar a pontuação
const createScoreManager = () => {
  let score = 20;
  return {
    getScore: () => score,
    decrementScore: () => --score,
    resetScore: () => (score = 20)
  };
};

const scoreManager = createScoreManager();
let secretnumber = Math.trunc(Math.random() * 20) + 1;
let highscore = 0;

// Função lambda para exibir mensagens na interface
const displayMessage = (message) => 
  (document.querySelector('.message')).textContent = message;

// Função de alta ordem para adicionar eventos ao DOM
const addEventListenerToElement = (
  selector, 
  event, 
  handler
) => {
  (document.querySelector(selector)).addEventListener(event, handler);
};

// Evento para verificar a adivinhação
addEventListenerToElement('.check', 'click', () => {
  const guess = Number((document.querySelector('.chute')).value);

  if (!guess) {
    displayMessage('⛔ Entrada incorreta!');
  } else if (guess === secretnumber) {
    displayMessage('🎉 Número correto!');
    (document.querySelector('.num')).textContent = String(secretnumber);
    (document.querySelector('body')).style.backgroundColor = '#60b347';
    (document.querySelector('.num')).style.width = '30rem';

    if (scoreManager.getScore() > highscore) {
      highscore = scoreManager.getScore();
      (document.querySelector('.highscore')).textContent = String(highscore);
    }
  } else {
    if (scoreManager.getScore() > 1) {
      displayMessage(guess > secretnumber ? '📈 Muito alto!' : '📉 Muito baixo!');
      (document.querySelector('.score')).textContent = String(scoreManager.decrementScore());
    } else {
      displayMessage('🫠 Você perdeu o jogo!');
      (document.querySelector('.score')).textContent = '0';
    }
  }
});

// Evento para reiniciar o jogo
addEventListenerToElement('.btn-novamente', 'click', () => {
  scoreManager.resetScore();
  secretnumber = Math.trunc(Math.random() * 20) + 1;
  (document.querySelector('body')).style.backgroundColor = '#222';
  (document.querySelector('.num')).style.width = '15rem';
  (document.querySelector('.num')).textContent = '?';
  (document.querySelector('.score')).textContent = String(scoreManager.getScore());
  (document.querySelector('.chute')).value = '';
  displayMessage('Comece a chutar...');
});

// List comprehension para criar um conjunto de números aleatórios
const randomNumbers = Array.from({ length: 5 }, () => Math.trunc(Math.random() * 20) + 1);
console.log('Generated numbers:', randomNumbers);
