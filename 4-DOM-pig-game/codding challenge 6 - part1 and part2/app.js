/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, scoreMax, sixCount, dice;

init();
function init() {
  sixCount = 0;
  gamePlaying = true;
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
    dice = Math.floor(Math.random() * 6) + 1;
    sixVerify(); //chama a contagem cada vez que apertamos o botão
    //Mostra o resultado:
    //adiciona esse texto em uma variável para não ficar escrevendo
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block"; //block faz aparecer a imagem
    diceDom.src = `dice-${dice}.png`;
    //Define o score máximo
    scoreMax = document.getElementById("inp-number").value;

    //Atualiza o round score somente IF o valor não for 1
    if (dice !== 1 && sixCount !== 2) {
      //add score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else if (sixCount === 2) {
      //se a contagem for 2, quer dizer que dois 6 sairam em seguinda, logo zera o score total
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = 0;
      nextPlayer();
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check fi player won the game
    if (scores[activePlayer] >= scoreMax) {
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
  sixCount = 0;
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

//Verifica se os 6 sairam seguidos, se sairam sixCount ficará 2
function sixVerify() {
  if (dice === 6) {
    sixCount++;
  } else {
    sixCount = 0;
  }
}
