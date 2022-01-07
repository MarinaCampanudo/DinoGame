const dino = document.querySelector('.dino');
const background = document.querySelector('.background');


let isJumping = false;
let isGameOver = false;
let position = 0;
let points = 0;



function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
      points++;
      myScore();
     
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1> <div class = "container"><button class = "btn" onClick = "history.go(0)" >Recomeçar!</button></div>';
      
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
     

  }, 20);

  setTimeout(createCactus, randomTime);
}

function myScore () {
  const playerScore = document.getElementById ("playerPoint");
  playerScore.textContent = `Pontos: ${points}`; 

}

createCactus();
document.addEventListener('keyup', handleKeyUp);

