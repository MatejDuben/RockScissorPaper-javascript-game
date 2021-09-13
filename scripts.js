// hlavna funkcia na zavolanie
function rpsGame (yourChoice){
  console.log('Your choice: ', yourChoice.id);
  
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randomRpsInt());

  console.log('Computer choice: ',botChoice); 
  result = decideWinner(humanChoice, botChoice);   //result --> [0,1] human | computer 

  console.log(result);
  massage = finalMassage(result);
  console.log(massage);
  rpsFrontEnd(yourChoice.id, botChoice, massage);

}

// vyber random cisla pre robota
function randomRpsInt() {
  return Math.floor(Math.random() *3);
}

function numberToChoice(number){
  return ['rock', 'paper', 'scissors'][number]
}

// rozhodnutie vitaza 

function decideWinner(yourChoice, computerChoice){
  var rpsDatabase = {
    'rock':{'scissors': 1, 'rock': 0.5, 'paper': 0},    //1==win; 0.5==remiza; 0==lose
    'paper':{'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors':{'paper': 1, 'scissors': 0.5, 'rock': 0}
  }

  var yourScore = rpsDatabase[yourChoice][computerChoice]   //porovna yourChoice a computerChoice a napise kolko si vyhral
  var computerScore = rpsDatabase[computerChoice][yourChoice]

  return [yourScore, computerScore]; //[0,1]
}

 // final massage
//napise ci som vyhral alebo prehral, remiza
                              //[0,1]
function finalMassage( [yourScore, computerScore] ){
  if(yourScore === 1){
    return {'massage': "You won", 'color': "green"}
  }
  else if(yourScore === 0.5){
    return {'massage': "You tried", 'color': "yellow"}
  }
  else if(yourScore === 0){
    return {'massage': "You lost", 'color': "red"}
  }
  
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMassage){
  var imageDatabase = {
    'rock': document.getElementById('rock').src,   //src znamena source/zdroj a teda z id rock vybere zdroj a ten je cesta k obrazku a zobrazi len obrazok
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src,
  }

  //remove all images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement('div');
  var massageDiv = document.createElement('div');
  var reset = document.createElement('h2') ;

  // pre humanChoice
  humanDiv.className = 'new-div';
  humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=250 width=250 style='box-shadow: 0 10px 50px rgb(0,255,0);'> ";   //human choice
  document.getElementById('rps-pictures-div').appendChild(humanDiv);

  // pre text kto vyhral
  massageDiv.className = 'new-div';
  massageDiv.innerHTML= "<h1 style='color: "+ finalMassage['color'] + "; font-size: 60px; padding: 30px '>" + finalMassage['massage'] + "</h1>";
  document.getElementById('rps-pictures-div').appendChild(massageDiv);

  //pre botchoice
  botDiv.className = 'new-div';
  botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=250 width=250 style='box-shadow: 0 10px 50px red'>";   //bot choice
  document.getElementById('rps-pictures-div').appendChild(botDiv);

  //reset allGame
  reset.className = "for-reset";
  reset.innerHTML = `
    <h2 style='font-family: Helvetica; font-size: 40px;'>Press for reset: ctrl+R</h2>
    <p>OR</p>
    <button style='font-family: Helvetica; font-size: 40px;' id="resetBtn" >Push this button</button>
  
    `;  
  document.getElementById('reset-text').appendChild(reset);
  document.getElementById("resetBtn").addEventListener('click',()=>{location.reload()})

}