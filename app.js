/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//SetZero
function init(){
    
    scores=[0,0];
    roundScores=0;
    activePlayer= 0;
    gamePlaying = true;
    //Setting Scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //remove winnerClass
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //Set Win to Player
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    //Set Active Classes
    document.querySelector('.player-0-panel').classList.remove('active');   
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//NextPlayer
function NextPlayer(){
    activePlayer === 0 ? activePlayer = 1: activePlayer=0;
    roundScores = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}




//main
var scores, roundScores, activePlayer,gamePlaying,lastDice1,lastDice2;
init();

//Change CSS or block remove first
document.querySelector('.dice1').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';


//Button Roll
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
    //Roll The Dice
    var dice1 = Math.floor(Math.random()*6)+1;
    var dice2 = Math.floor(Math.random()*6)+1;
    //Display The Result
    var diceDom1 = document.querySelector('.dice1');
    diceDom1.style.display='block';
    diceDom1.src = 'dice-'+ dice1 + '.png';
    var diceDom2 = document.querySelector('.dice2');
    diceDom2.style.display='block';
    diceDom2.src = 'dice-'+ dice2 + '.png';
    //Update the RoundScore if it's not 1
    if((dice1 ==6 && lastDice1==6)|| (dice2 ==6 && lastDice2==6)){
        scores[activePlayer]=0;
        document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
        NextPlayer();
    }

    if((dice1 !== 1)&&(dice2!==1)){
        roundScores+=dice1+dice2;
        document.getElementById('current-' + activePlayer).textContent = roundScores;
    }
    else{
       NextPlayer();
    }}

    lastDice1 = dice1;
    lastDice2 = dice2;
});

   
    //Hold Buttom
    document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gamePlaying){
        //Update the roundScore To GlobalScore
        var winScore = document.getElementById("winnerScore").value;

        scores[activePlayer]+=roundScores;
        
        //Update UI
        document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];

        //Check If player Won the game
        if(winScore == ''){
            winScore=100;
        }
        if(scores[activePlayer]>=winScore){
            
            document.querySelector('#name-' +activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';  
            document.querySelector('.dice2').style.display = 'none'; 
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');   
            gamePlaying = false;
        }

        else{
            //Next Player
            NextPlayer();
        }
    }
    });

    document.querySelector('.btn-new').addEventListener('click',init);