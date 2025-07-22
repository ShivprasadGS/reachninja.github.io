let lowerColor = [25, 80, 80];
let upperColor = [35, 255, 255];
let calibrated = false;

function startCalibration(callback) {
  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();

    video.addEventListener('click', (e) => {
      const rect = video.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const index = ((y | 0) * canvas.width + (x | 0)) * 4;
      const [r, g, b] = [frame.data[index], frame.data[index + 1], frame.data[index + 2]];
      const hsv = rgb2hsv(r, g, b);

      lowerColor = [Math.max(hsv[0] - 10, 0), 80, 80];
      upperColor = [Math.min(hsv[0] + 10, 179), 255, 255];
      calibrated = true;
      stream.getTracks().forEach(track => track.stop());
      if (callback) callback();
    });

    document.body.innerHTML = ''; // Clear body
    document.body.appendChild(video);
  });
}

function rgb2hsv(r, g, b) {
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  let d = max - min;
  s = max == 0 ? 0 : d / max;
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
  }
  h = Math.round(h * 60);
  return [h, Math.round(s * 255), Math.round(v)];
}
