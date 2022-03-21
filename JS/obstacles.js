const scoreBox = document.getElementById('scoreBox');
let hiscoreval;
const obstaclesArray = [];

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height / 3) + 20;
        this.bottom = (Math.random() * canvas.height / 3) + 20;
        this.x = canvas.width;
        this.width = 50;
        this.color = 'hsla(' + hue + ',75%, 25%, 1)';
        this.counted = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    update() {
        this.x -= gameSpeed;
        if (!this.counted && this.x < bird.x) {
            score++;
            if (score > hiscoreval) {
                hiscoreval = score;
                localStorage.setItem("highscore", JSON.stringify(hiscoreval));
                highScoreBox.innerHTML = "HighScore: " + hiscoreval;
            }
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles() {
    if (frame % 100 === 0) {
        obstaclesArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0]);
    }
}