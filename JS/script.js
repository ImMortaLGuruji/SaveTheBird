const canvas = document.getElementById('canvas1');
const highScoreBox = document.getElementById('highScoreBox');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

let highscore = localStorage.getItem("highscore");

if (highscore === null) {
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(highscore);
    highScoreBox.innerHTML = "HighScore: " + hiscoreval;
}

const background = new Image();
background.src = '../png/BG.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground() {
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handledParticles();
    handleObstacles()
    bird.update();
    bird.draw();
    handelCollisions();
    if (handelCollisions()) return;
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++
    scoreBox.innerHTML = "Score: " + score;
}
animate();

window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') spacePressed = true;
})
window.addEventListener('keyup', function (e) {
    if (e.code === 'Space') spacePressed = false;
})

const gameOverSound = new Audio('../music/gameover.mp3');

function handelCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width && bird.x + bird.width > obstaclesArray[i].x && ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) || (bird.y > canvas.height - obstaclesArray[i].bottom && bird.y + bird.height < canvas.height))) {
            gameOverSound.play();
            ctx.font = "25px Georgia";
            ctx.fillStyle = 'red';
            ctx.fillText("Game Over", 225, 200);

            return true;
        }
    }
}