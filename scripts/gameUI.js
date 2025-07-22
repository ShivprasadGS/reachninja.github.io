function drawStartScreen(ctx) {
  ctx.fillStyle = params.backgroundColor;
  ctx.fillRect(0, 0, params.width, params.height + params.infoHeight);
  ctx.fillStyle = 'black';
  ctx.font = '32px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Reach Ninja Game', params.width / 2, 80);
  ctx.fillText('Click to Start', params.width / 2, 160);
}