const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let redMarker = new RedMarker();
let obstacles = [];
let gameStarted = false;
let score = 0;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) {
    drawStartScreen(ctx);
    requestAnimationFrame(gameLoop);
    return;
  }

  redMarker.move(mouseX, mouseY);
  redMarker.draw(ctx);

  obstacles.forEach((ob, i) => {
    ob.update();
    ob.draw(ctx);
    if (ob.collidesWith(redMarker)) {
      score += ob.color === 'blue' ? params.blueScore : params.blackScore;
      obstacles.splice(i, 1);
    }
  });
  obstacles = obstacles.filter(ob => !ob.isOutOfBounds());

  if (Math.random() < 0.05) {
    const radius = 10;
    const x = Math.random() * (params.width - 2 * radius) + radius;
    const color = Math.random() < 0.5 ? 'blue' : 'black';
    obstacles.push(new Obstacle(x, 0, 0, 2, radius, color));
  }

  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 60, params.height + 30);
  requestAnimationFrame(gameLoop);
}

let mouseX = params.redMarkerInit[0];
let mouseY = params.redMarkerInit[1];
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

canvas.addEventListener('click', () => {
  if (!gameStarted) {
    gameStarted = true;
    score = 0;
  }
});

gameLoop();
