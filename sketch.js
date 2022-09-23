var track, player, coin, obstacleStand, obstacleSleep, playerImg, ground, coinGrp, obstacleGroup;
var score = 0;
var gameState = "start"
var PLAY = 1;
var END = 0;

function preload() {
    track = loadImage("./assets/track.png");
    playerImg = loadAnimation("./assets/running1.png", "./assets/running2.png", "./assets/running3.png", "./assets/running4.png", "./assets/running5.png", "./assets/running6.png")
    coin = loadImage("./assets/goldCoin.png")
    obstacleStand = loadImage("./assets/obstacleVertical.png")
    obstacleSleep = loadImage("./assets/obstacleSideways.png")
    playerStatic = loadImage("./assets/running1.png")
    obstacleStand = loadImage("./assets/obstacleVertical.png")
    obstacleSleep = loadImage("./assets/obstacleSideways.png")
}

function setup() {
    createCanvas(windowWidth - 10, windowHeight)
    player = createSprite(130, 600)
    player.addAnimation("player", playerImg)
    player.addAnimation("player", playerStatic)
    ground = createSprite(720, 690, 1500, 23)
    coinGrp = new Group();
    obstacleGroup = new Group();
}

function draw() {
    background(track)
    text(mouseX + "," + mouseY, mouseX, mouseY)
    textSize(23)
    text("SCORE: " + score, 100, 50)
    player.scale = 0.25;
    if (gameState === "start") {
        player.velocityX = 0;
        player.addAnimation("player", playerStatic)
        if (keyDown(32)) {
            gameState = "play"
            player.addAnimation("player", playerImg)
        }
        textSize(40)
        fill("#ff0000")
        stroke("Gray")
        strokeWeight(2)
        textFont("Rockwell")
        text("Jetpack Joyride Redone", windowWidth/2 - 215, windowHeight/2 - 30)
        textSize(30)
        text("Press SPACE to begin", windowWidth/2 - 145, windowHeight/2 + 10)
    }
    else if (gameState === "play") {
        spawnCoins();
        spawnSleepObstacles();
        spawnStandObstacles();
        if (keyIsDown(87)) {
            player.velocityY = player.velocityY - 3
        }
        for (var i = 0; i<coinGrp.length; i = i+1) {
            if (coinGrp.get(i). isTouching(player)) {
                coinGrp.get(i).destroy();
                score = score + 1;
            }
        }
        if (obstacleGroup.isTouching(player)) {
            gameState = "end"
        }
    }
    else if (gameState === "end") {
        player.addAnimation("player", playerStatic)
        coinGrp.destroyEach();
        obstacleGroup.destroyEach();
        textSize(40)
        fill("#ff0000")
        stroke("Gray")
        strokeWeight(2)
        textFont("Rockwell")
        text("GAME OVER", windowWidth/2 - 150, windowHeight/2)
        text("Refresh to restart", windowWidth/2 - 185, windowHeight/2 + 50)
    }
    player.velocityY = player.velocityY + 0.9; // gravity
    player.collide(ground)
    drawSprites();
}

function keyPressed() {}

function spawnCoins() {
    if (frameCount%60===0) {
        var coins = createSprite(1400, Math.round(random(100,620)), 25, 100)
        coins.addImage(coin)
        coins.scale = 0.135
        coins.velocityX = -5
        console.log(coins.velocityX)
        coinGrp.add(coins)
    }
}
function spawnSleepObstacles() {
    if (frameCount%175===0) {
        var sleepObstacle = createSprite(Math.round(random(450, 1300)), Math.round(random(20, 660)), 50, 200)
        sleepObstacle.addImage(obstacleSleep)
        sleepObstacle.scale = 0.25
        sleepObstacle.velocityX = -5
        obstacleGroup.add(sleepObstacle)
    }
}
function spawnStandObstacles() {
    if (frameCount%225===0) {
        var standObstacle = createSprite(Math.round(random(450, 1300)), Math.round(random(20, 660)), 50, 200)
        standObstacle.addImage(obstacleStand)
        standObstacle.scale = 0.25
        standObstacle.velocityX = -5
        obstacleGroup.add(standObstacle)
    }
}
