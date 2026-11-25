'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let gameOver = false;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displaySecretNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const decreaseScore = function () {
  if (score > 1) {
    score--;
    displayScore(score);
  } else {
    score = 0;
    gameOver = true;
    displayScore(score);
    displayMessage('😔 You lost the game!');
  }
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if(gameOver) return;

  if (!guess) {
    displayMessage('⚠️ No Number!');
  } else if (guess === secretNumber) {
    gameOver = true;

    displayMessage('✅ Correct Number!');
    displaySecretNumber(secretNumber);

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? '↗️ Too High!' : '↙️ Too Low!');
    decreaseScore();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  gameOver = false;

  displayScore(score);
  displaySecretNumber('?');
  displayMessage('Start guessing...');

  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
