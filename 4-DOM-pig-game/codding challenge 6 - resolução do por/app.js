var scores, roundScore, activePlayer, gamePlaying, lastDice;


init();
function init() {
  gamePlaying = true
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; //player 01 = 0, player 2 = 1
  //modifica o estilo .display para none = some com a imagem do dado no inicio
  document.querySelector(".dice").style.display = "none";
  //Modifica os valores para zero - placar geral e plarcar da rodada
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "PLAYER 1";
  document.querySelector("#name-1").textContent = "PLAYER 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//event handler:
//função anônima, não pode ser utilizada em nenhum outro lugar, função sem nome
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //Gera um número randômico entre 1 a 6
    var dice = Math.floor(Math.random() * 6) + 1;

    //Mostra o resultado:
    //adiciona esse texto em uma variável para não ficar escrevendo
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block"; //block faz aparecer a imagem
    diceDom.src = `dice-${dice}.png`;

    //comparativo
    if (dice === 6 && lastDice === 6){
      //player loses score
      score[activePlayer] = 0
      document.querySelector('#score-' + activePlayer).textContent = 0
      nextPlayer()
    } else if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
    lastDice = dice
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    
    var input = document.querySelector('.final-score').value
    var winningScore

    // Undifine, 0, null or '' ar coerced to false
    //qualque coisa é coerced to true
    if(input){ // verifica se o input está fazio ou não
      winningScore = input
    } else{
      winningScore = 100
    }

    //check fi player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //operador ternário
  roundScore = 0; //reseta para Zero o current
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);
