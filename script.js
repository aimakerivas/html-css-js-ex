const ball = document.getElementById('ball');
let posX = 100, posY = 100;
let dx = 3, dy = 2;
let dragging = false, offsetX = 0, offsetY = 0;

ball.addEventListener('mousedown', e => {
  dragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});
document.addEventListener('mousemove', e => {
  if (dragging) {
    posX = e.pageX - offsetX;
    posY = e.pageY - offsetY;
    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';
  }
});
document.addEventListener('mouseup', () => dragging = false);
ball.addEventListener('click', () => {
  ball.style.background = `radial-gradient(circle at 30% 30%, #fff, hsl(${Math.random()*360}, 100%, 50%))`;
  dx *= 1.1; dy *= 1.1;
});
function animate() {
  if (!dragging) {
    posX += dx; posY += dy;
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    if (posX <= 0 || posX >= maxX) dx = -dx;
    if (posY <= 0 || posY >= maxY) dy = -dy;
    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';
  }
  requestAnimationFrame(animate);
}
animate();
