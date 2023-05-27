let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
const cards = document.querySelectorAll('.memory-card');






document.getElementById('button-enter').addEventListener('click', () => {
  document.getElementById('image-left').classList.add('transform-left');
  document.getElementById('image-right').classList.add('transform-right');
  document.getElementById('main-screen').style.display = "none";
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