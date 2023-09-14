const global = {
  curretPage: window.location.pathname,
};

// chnage background
function randomColor() {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  document.querySelector('body').style.backgroundColor = `#${color}`;
}

// clock
const canva = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');
// const downloadableImage = document.querySelector('#clock_main');

function clock() {
  const ctx = canva.getContext('2d');
  const now = new Date();
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();
  ctx.save();
  ctx.clearRect(0, 0, 400, 400);
  ctx.translate(200, 200);
  ctx.rotate(-Math.PI / 2);

  // default values
  ctx.fillStyle = faceColor.value;
  ctx.strokeStyle = borderColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // draw clock face
  ctx.save();
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(0, 0, 150, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // draw hour line
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.strokeStyle = lineColor.value;
    ctx.stroke();
    ctx.rotate(Math.PI / 6);
  }
  ctx.restore();

  // draw seconds line
  ctx.save();
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.moveTo(110, 0);
    ctx.lineTo(120, 0);
    ctx.strokeStyle = lineColor.value;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.strokeStyle = largeHandColor.value;

  ctx.stroke();
  ctx.restore();

  // draw inute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(70, 0);
  ctx.lineWidth = 3;
  ctx.strokeStyle = largeHandColor.value;

  ctx.stroke();
  ctx.restore();

  // draw sec hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(60, 0);
  ctx.lineWidth = 2;
  ctx.strokeStyle = secondHandColor.value;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fillStyle = secondHandColor.value;
  ctx.fill();
  ctx.restore();

  ctx.restore();

  requestAnimationFrame(clock);
}

function digitalClock() {
  const now = new Date();
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  if (hr < 10) {
    document.getElementById('hr').textContent = `0${hr}`;
  } else {
    document.getElementById('hr').textContent = hr;
  }

  if (min < 10) {
    document.getElementById('min').textContent = `0${min}`;
  } else {
    document.getElementById('min').textContent = min;
  }

  if (sec < 9) {
    document.getElementById('secs').textContent = `0${sec}`;
  } else {
    document.getElementById('secs').textContent = sec;
  }

  document.getElementById('day').textContent = daysOfWeek[now.getDay()];

  requestAnimationFrame(digitalClock);
}

function downloadImg() {
  const dataURL = canva.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'clock.png';
  link.click();
}

// Advice generator
let changeBtn = document.querySelector('.icon');
let blur = document.querySelector('.blur');
const adviceQuote = document.querySelector('.advice');

async function fetchAdvice() {
  const message = document.querySelector('.error-message');
  try {
    const result = await fetch('https://api.adviceslip.com/advice');
    const data = await result.json();
    adviceQuote.innerHTML = data.slip.advice;
    document.querySelector('span').innerText = `${data.slip.id}`;

    if (!result.ok) {
      throw new Error('Something went wrong, try again!');
    }

    if (message) {
      message.remove();
    }
  } catch (error) {
    if (message) {
      message.remove();
    }
    const errorMsg = document.createElement('p');
    errorMsg.textContent = error;
    errorMsg.className = 'error-message';
    errorMsg.style.color = 'hsl(193, 38%, 86%)';
    document.querySelector('.wrapper').appendChild(errorMsg);
  }
}

function init() {
  switch (global.curretPage) {
    case '/Mini-Projects/index.html':
      // setInterval(randomColor, 10000);
      break;
    case '/Mini-Projects/Pages/clock.html':
      requestAnimationFrame(clock);
      document
        .querySelector('#save-btn')
        .addEventListener('click', downloadImg);
      requestAnimationFrame(digitalClock);
      break;
    case '/Mini-Projects/Pages/advise.html':
      changeBtn.addEventListener('click', fetchAdvice);
      break;
    case '/Mini-Projects/Pages/map.html':
      console.log('map');
      break;
    case '/Mini-Projects/Pages/todo-list.html':
      console.log('todo');
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
