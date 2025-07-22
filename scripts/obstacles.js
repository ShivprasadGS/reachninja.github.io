class Obstacle {
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isOutOfBounds() {
    return this.y - this.radius > params.height;
  }

  collidesWith(marker) {
    const dx = this.x - marker.x;
    const dy = this.y - marker.y;
    return Math.hypot(dx, dy) < this.radius + marker.radius;
  }
}
