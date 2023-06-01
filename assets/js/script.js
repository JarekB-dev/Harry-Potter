// Global Variables

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
const cards = document.querySelectorAll('.memory-card');
let countedPairs = 0; //amount of matched card pairs.
let countDown; // game timer
let pastMainScreen; //will pause theme song after main screen.

// Audio files
const matchSound = new Audio('assets/sounds/match-sound.mp3');
const slidingEffect = new Audio('assets/sounds/door-slide.mp3');
const harrySlide = new Audio('assets/sounds/page-flip.mp3');
const WinSound = new Audio('assets/sounds/win-sound.mp3');
const loseSound = new Audio('assets/sounds/lose-sound.mp3');

let isSoundOn = false; // to check if sound is on or off.

// audio toggle icons
const themeSound = document.getElementById('theme-sound');
const playIcon = document.getElementById("play-sound");
const pauseIcon = document.getElementById("pause-sound");


/**
 * Add event listener on load to Next button and
 * enables user to progress by clicking enter key.
 */
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('player-name').addEventListener('keydown', (event) => {
    if(event.key === "Enter") {
      nameScreenHide();
    }
  })
  document.getElementById('button-next').addEventListener('click', nameScreenHide)
})


// eventListener to main screen button that will split the screen,hide logo and button
document.getElementById('button-enter').addEventListener('click', () => {
  pastMainScreen = true;
  themeSound.pause();
  if(isSoundOn) { slidingEffect.play() };
  document.getElementById('section-left').classList.add('transform-left');
  document.getElementById('section-right').classList.add('transform-right');
  document.getElementById('main-screen').style.display = "none";
  document.getElementById('game-area').classList.add('transform-game-area');
  nameScreenLoad();
});

/**
 * Function that adds flip class to clicked card
 */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
        
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
}


/**
 * Check if both flipped cards match
 */
function checkMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    if(isSoundOn) { matchSound.play() };
		countedPairs += 1; // add 1 to matched card pairs.
    firstCard.classList.add('glow'); //add glow effect to matched cards
		secondCard.classList.add('glow');
		matchedCards();
		if (countedPairs === 6) {   //If amount of matched pairs on the boards is equal to 6
      cards.forEach(card => { 
        card.removeEventListener('click', flipCard);
        card.classList.remove('flip')
      });
      if(isSoundOn) { WinSound.play() };
      clearInterval(countDown); //reset the timer
      showWinMessage();
		}
	return;
	}

  unmatchedCards();
}

/**
 * Function that removes eventListener from matched cards
 *  to prevent them from flipping.
 */
function matchedCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
  resetGameArea();
}

/**
 * Function that turns cards back if they are not the same.
 * Lock the board until cards are flipped back
 */
function unmatchedCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
    resetGameArea();
	}, 1200);
}

/**
 * Reset the game after each flipped pair of cards
 */
function resetGameArea() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

/**
 * Shuffle cards position randomly.
 */
function shuffleCards() {
  for (let card of cards) {
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  }
}

/**
 * Shows modal asking player to input their name.
 */
function nameScreenLoad() {
  setTimeout( function() {
    document.getElementById('name-screen').classList.add('opacity');
    document.getElementById('name-screen').style.visibility = "visible";
    document.getElementById('player-name').focus();
  }, 1500);
}

/**
 * After inputting players name
 * button hides modal and progress to game explanation screen
 */
function nameScreenHide() {
  document.getElementById('name-screen').style.display = "none";
  playerName();
  showHarry();
}

/**
 * Function that takes input from text field and set it
 * as player name on game Explanation Screen
 */
function playerName() {
  let name = document.getElementById('player-name').value
  document.getElementById('chosen-name').innerHTML = name;
}

/**
 * Function that opens up game explanation screen
 * with transform animation
 */
function showHarry() {
  if(isSoundOn) { harrySlide.play() };
  document.getElementById('game-explanation').classList.add('show-harry');
  explanationScreenHide();
}

/**
 * Function that hides game explanation screen
 */
function explanationScreenHide() {
  document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('game-explanation').classList.remove('show-harry');
    document.getElementById('game-explanation').classList.add('hide-harry');
    startGame();
  })
}

/**
 * Function that starts 1 minute timer
 */
function timer() {
  let timeSeconds = document.getElementById('timer');
  let seconds = 25;
  countDown = setInterval(() => {
    seconds--;
    timeSeconds.innerHTML = `${seconds} Seconds`;
    if (seconds === 1) {
    timeSeconds.innerHTML = `${seconds} Second`; //Change Seconds to Second while timer reaches 1.
    }
    if (seconds <= 0) {
      if(isSoundOn) { loseSound.play() };
      loseGame();
      cards.forEach(card => { 
        card.removeEventListener('click', flipCard);
        card.classList.remove('flip')
      });
      clearInterval(countDown); // Stop the timer
    }
  }, 1000)
}

/**
 * Function starts the game, shuffle cards and starts the timer.
 */
function startGame() {
  countedPairs = 0; // reset matched pairs to 0
  document.getElementById('game-result').style.display = 'none';
  lockBoard = false;
	cards.forEach(card =>  { 
    card.classList.remove('flip'); // remove flip class from cards
    card.classList.remove('glow'); // remove glow class from cards
  })
	cards.forEach(card => card.addEventListener('click', flipCard)); // add event listener to all cards.
	shuffleCards();
	timer();
  resetMessages();
}

/**
 * Function being triggered when timer reaches 0
 */
function loseGame() {
  showLoseMessage();
  lockBoard = true;
}

/**
 * function shows message when Player has not matched all cards
 */
function showLoseMessage() {
  document.getElementById('game-result').style.display = 'block';
  document.getElementById('congratulations').style.display = "block";
  document.getElementById('lose-game').style.display = "block"
}

/**
 * Function shows message when Player matched all cards on the board.
 */
function showWinMessage() {
  document.getElementById('game-result').style.display = 'block';
  document.getElementById('congratulations').style.display = "block";
  document.getElementById('congratulation-message').style.display = "block"
}

/**
 * Function resets game result messages to display: none.
 */
function resetMessages() {
  document.getElementById('lose-game').style.display = "none";
  document.getElementById('congratulation-message').style.display = "none";
}

/**
 * Add eventListener to Restart Game button and hides
 * game result message.
 */
document.getElementById('restart-game').addEventListener('click', () => {
  document.getElementById('congratulations').style.display = "none";
  startGame();
})

/**
 * function toggle sounds and pause/play theme sound on Main screen
 */
function toggleSound() {
  isSoundOn = !isSoundOn;
  if(!pastMainScreen) {
    themeSound.currentTime = 0;
    themeSound.play();
  }
  if(!isSoundOn) {
    themeSound.pause();
  }
}

// eventListener to Play icon 
playIcon.addEventListener('click', () => {
  toggleSound();
  playIcon.style.display = "none"
  pauseIcon.style.display = "block"
})

// eventListener to Pause icon
pauseIcon.addEventListener('click', () => {
  toggleSound();
  pauseIcon.style.display = "none";
  playIcon.style.display = "block";
})