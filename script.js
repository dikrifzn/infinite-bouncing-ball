let canvas = document.getElementById("myCanvas");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let night = document.getElementById("night");
let day = document.getElementById("day");

//bola1 putih
let ballRadius = 10;
let x = (canvas.width / 3) * (Math.floor(Math.random() * 2) + 1);
console.log(x);
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

//bola2 hitam
let ballRadius2 = 10;
let x2 = canvas.width / (Math.floor(Math.random() * 5) + 1) - 5;
console.log(x2);
let y2 = canvas.height - 30;
let dx2 = 2;
let dy2 = -2;

//bata hitam
let brickRowCount = 20;
let brickColumnCount = 20;
let brickWidth = 25;
let brickHeight = 25;
let brickpadding = 0;
let brickOffsetTop = 0;
let brickOffsetLeft = 0;
let brickScore = brickRowCount * brickColumnCount - 200;
console.log(brickScore);

//bata2
let brickRowCount2 = 20;
let brickColumnCount2 = 20; // jumlah kolom disesuaikan dengan bola pertama
let brickWidth2 = 25;
let brickHeight2 = 25;
let brickpadding2 = 0;
let brickOffsetTop2 = 0;
let brickOffsetLeft2 = 0;
let brickScore2 = brickRowCount2 * brickColumnCount2 - 200;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    let brickX = c * (brickWidth + brickpadding) + brickOffsetLeft;
    let brickY = r * (brickHeight + brickpadding) + brickOffsetTop;
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
    if (c >= 10) {
      bricks[c][r].status = 0;
    }
  }
}

let bricks2 = [];
for (let c = 0; c < brickColumnCount2; c++) {
  bricks2[c] = [];
  for (let r = 0; r < brickRowCount2; r++) {
    let brickX2 = c * (brickWidth2 + brickpadding2);
    let brickY2 = r * (brickHeight2 + brickpadding2);
    bricks2[c][r] = { x: brickX2, y: brickY2, status: 1 };
    if (c < 10) {
      bricks2[c][r].status = 0;
    }
  }
}

const collisionDetector = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        let ballCenterX = x + ballRadius;
        let ballCenterY = y + ballRadius;

        if (
          ballCenterX > b.x &&
          ballCenterX < b.x + brickWidth &&
          ballCenterY > b.y &&
          ballCenterY < b.y + brickHeight
        ) {
          // Hit a brick
          let brickCenterX = b.x + brickWidth / 2;
          let brickCenterY = b.y + brickHeight / 2;

          // Calculate the angle of collision
          let angle = Math.atan2(
            ballCenterY - brickCenterY,
            ballCenterX - brickCenterX
          );

          // Calculate the new direction based on the angle of collision
          let magnitude = Math.sqrt(dx * dx + dy * dy);
          let direction = Math.atan2(dy, dx);
          let newDirection = 2 * angle - direction;

          dx = magnitude * Math.cos(newDirection);
          dy = magnitude * Math.sin(newDirection);

          b.status = 0;
          brickScore--;
          bricks2[c][r].status = 1;
          brickScore2++;
          day.innerHTML = Math.round((brickScore / 400) * 100);
          night.innerHTML = Math.round((brickScore2 / 400) * 100);
        }
      }
    }
  }
};

const collisionDetector2 = () => {
  for (let c = 0; c < brickColumnCount2; c++) {
    for (let r = 0; r < brickRowCount2; r++) {
      let b2 = bricks2[c][r];
      if (b2.status == 1) {
        let ballCenterX2 = x2 + ballRadius2;
        let ballCenterY2 = y2 + ballRadius2;

        if (
          ballCenterX2 > b2.x &&
          ballCenterX2 < b2.x + brickWidth2 &&
          ballCenterY2 > b2.y &&
          ballCenterY2 < b2.y + brickHeight2
        ) {
          // Hit a brick
          let brickCenterX2 = b2.x + brickWidth2 / 2;
          let brickCenterY2 = b2.y + brickHeight2 / 2;

          // Calculate the angle of collision
          let angle2 = Math.atan2(
            ballCenterY2 - brickCenterY2,
            ballCenterX2 - brickCenterX2
          );

          // Calculate the new direction based on the angle of collision
          let magnitude2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          let direction2 = Math.atan2(dy2, dx2);
          let newDirection2 = 2 * angle2 - direction2;

          dx2 = magnitude2 * Math.cos(newDirection2);
          dy2 = magnitude2 * Math.sin(newDirection2);

          b2.status = 0;
          bricks[c][r].status = 1;
          brickScore++;
          brickScore2--;
          day.innerHTML = Math.round((brickScore / 400) * 100);
          night.innerHTML = Math.round((brickScore2 / 400) * 100);
        }
      }
    }
  }
};

//gambar bata
const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        ctx.beginPath();
        ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        ctx.fillStyle = "#002a4d";
        ctx.fill();
        ctx.closePath();
        console.log();
      }
    }
  }
};

//gambar bata2
const drawBricks2 = () => {
  for (let c = 0; c < brickColumnCount2; c++) {
    for (let r = 0; r < brickRowCount2; r++) {
      if (bricks2[c][r].status == 1) {
        ctx.beginPath();
        ctx.rect(bricks2[c][r].x, bricks2[c][r].y, brickWidth2, brickHeight2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

//gambar bola
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#002a4d";
  ctx.fill();
  ctx.closePath();
};

const drawBall2 = () => {
  ctx.beginPath();
  ctx.arc(x2, y2, ballRadius2, 0, Math.PI * 2);
  ctx.fillStyle = "white"; // warna bola kedua
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks2(); //gambar bata
  drawBricks(); //gambar bata
  drawBall(); //gambar bola pertama
  drawBall2(); //gambar bola kedua
  collisionDetector(); //bata hilang
  collisionDetector2(); //bata hilang untuk bola kedua

  // Memantulkan bola pertama
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  // Memantulkan bola kedua
  if (x2 + dx2 > canvas.width - ballRadius2 || x2 + dx2 < ballRadius2) {
    dx2 = -dx2;
  }
  if (y2 + dy2 > canvas.height - ballRadius2 || y2 + dy2 < ballRadius2) {
    dy2 = -dy2;
  }

  // Looping bola pertama
  y += dy;
  x += dx;

  // Looping bola kedua
  x2 += dx2;
  y2 += dy2;
};

setInterval(draw, 10);
