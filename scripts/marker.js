class RedMarker {
  constructor() {
    this.x = params.redMarkerInit[0];
    this.y = params.redMarkerInit[1];
    this.radius = params.redMarkerRadius;
  }

  move(targetX, targetY) {
    this.x += (targetX - this.x) * 0.1;
    this.y += (targetY - this.y) * 0.1;
  }

  draw(ctx) {
    ctx.fillStyle = params.red;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}