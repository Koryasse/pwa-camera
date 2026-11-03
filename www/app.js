const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const download = document.getElementById('download');
let filtre = 'none';

// Afficher le flux de la caméra
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => video.srcObject = stream)
  .catch(err => alert('Caméra inaccessible : ' + err.message));

// Choisir un filtre
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    filtre = btn.dataset.filter;
    video.style.filter = filtre;
  });
});

// Prendre la photo avec le filtre
document.getElementById('btnPhoto').addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.filter = filtre;
  ctx.drawImage(video, 0, 0);

  const image = canvas.toDataURL('image/png');
  photo.src = image;
  photo.style.display = 'block';
  download.href = image;
  download.style.display = 'inline';
});

// Service worker (PWA)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
