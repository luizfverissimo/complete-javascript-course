/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0; //player 01 = 0, player 2 = 1

//document.querySelector(`#current-${activePlayer}`).textContent = dice;
//document.querySelector(`#current-${activePlayer}`).innerHTML = `<em>${dice}</em>`

//modifica o estilo .display para none = some com a imagem do dado no inicio
document.querySelector(".dice").style.display = "none";
//Modifica os valores para zero - placar geral e plarcar da rodada
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

//event handler:
//função anônima, não pode ser utilizada em nenhum outro lugar, função sem nome
document.querySelector(".btn-roll").addEventListener("click", function () {
  //Gera um número randômico entre 1 a 6
  var dice = Math.floor(Math.random() * 6) + 1;

  //Mostra o resultado:
  //adiciona esse texto em uma variável para não ficar escrevendo
  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "block"; //block faz aparecer a imagem
  diceDom.src = `dice-${dice}.png`;

  //Atualiza o round score somente IF o valor não for 1
  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    //Next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //operador ternário
    roundScore = 0; //reseta para Zero o current
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
  }
});
