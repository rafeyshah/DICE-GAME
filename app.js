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
    document.querySelector('.dice').style.display = 'none';
}




//main
var scores, roundScores, activePlayer,gamePlaying;
init();

//Change CSS or block remove first
document.querySelector('.dice').style.display = 'none';



//Button Roll
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
    //Roll The Dice
    var dice = Math.floor(Math.random()*6)+1;

    //Display The Result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display='block';
    diceDom.src = 'dice-'+ dice + '.png';

    //Update the RoundScore if it's not 1
    if(dice !== 1){
        roundScores+=dice;
        document.getElementById('current-' + activePlayer).textContent = roundScores;
    }
    else{
       NextPlayer();
    }}
});



    //Hold Buttom
    document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gamePlaying){
        //Update the roundScore To GlobalScore
        scores[activePlayer]+=roundScores;
        
        //Update UI
        document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];

        //Check If player Won the game
        if(scores[activePlayer]>=20){
            document.querySelector('#name-' +activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';  
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