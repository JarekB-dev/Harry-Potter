
document.getElementById('button-enter').addEventListener('click', () => {
  document.getElementById('image-left').classList.add('transform-left');
  document.getElementById('image-right').classList.add('transform-right');
  document.getElementById('main-screen').style.display = "none";
})