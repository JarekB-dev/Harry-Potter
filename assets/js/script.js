let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
const cards = document.querySelectorAll('.memory-card');

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



document.getElementById('button-enter').addEventListener('click', () => {
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
}

cards.forEach(card => card.addEventListener('click', flipCard));


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
  })
}