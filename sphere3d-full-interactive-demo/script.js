const sphere = document.getElementById('sphere');
const positionDisplay = document.getElementById('position');
const offsetDisplay = document.getElementById('offset');

const lightX = document.getElementById('lightX');
const lightY = document.getElementById('lightY');
const colorStart = document.getElementById('colorStart');
const colorEnd = document.getElementById('colorEnd');
const shadowOpacity = document.getElementById('shadowOpacity');
const speedSlider = document.getElementById('speed');

const lightXVal = document.getElementById('lightXVal');
const lightYVal = document.getElementById('lightYVal');
const shadowOpacityVal = document.getElementById('shadowOpacityVal');
const speedVal = document.getElementById('speedVal');

let posX = 100, posY = 100;
let dx = 2, dy = 2;
let dragging = false, offsetX = 0, offsetY = 0;

function updateSphereStyle() {
  const x = lightX.value;
  const y = lightY.value;
  const start = colorStart.value;
  const end = colorEnd.value;
  const opacity = shadowOpacity.value;

  sphere.style.background = `radial-gradient(circle at ${x}% ${y}%, ${start}, ${end})`;
  sphere.style.boxShadow = `inset -15px -15px 30px rgba(0,0,0,${opacity})`;

  lightXVal.textContent = x;
  lightYVal.textContent = y;
  shadowOpacityVal.textContent = opacity;
  speedVal.textContent = speedSlider.value;
}

[speedSlider, lightX, lightY, colorStart, colorEnd, shadowOpacity].forEach(input =>
  input.addEventListener('input', updateSphereStyle)
);

sphere.addEventListener('mousedown', e => {
  dragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  sphere.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', e => {
  if (dragging) {
    posX = e.pageX - offsetX;
    posY = e.pageY - offsetY;
    sphere.style.left = posX + 'px';
    sphere.style.top = posY + 'px';
    positionDisplay.textContent = `${posX}, ${posY}`;
    offsetDisplay.textContent = `${offsetX}, ${offsetY}`;
  }
});

document.addEventListener('mouseup', () => {
  dragging = false;
  sphere.style.cursor = 'grab';
});

function animate() {
  if (!dragging) {
    let speed = parseFloat(speedSlider.value);
    posX += dx * speed * 0.1;
    posY += dy * speed * 0.1;

    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    if (posX <= 0 || posX >= maxX) dx = -dx;
    if (posY <= 0 || posY >= maxY) dy = -dy;

    sphere.style.left = posX + 'px';
    sphere.style.top = posY + 'px';
    positionDisplay.textContent = `${Math.round(posX)}, ${Math.round(posY)}`;
  }
  requestAnimationFrame(animate);
}

updateSphereStyle();
animate();
