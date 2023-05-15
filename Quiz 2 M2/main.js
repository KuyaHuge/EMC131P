const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
let player;
let forest;
let projectiles;
let obstacles;
let score = 0;
let scoreText;
let timeSurvived = 0;
let timeText;
let music;
let shootSound;
let collideSound;
let lastObstacleSpawnTime = 0;
let obstacleSpawnRate = 1000; // Adjust this to control the frequency of obstacle spawns

function preload() {
    this.load.image("bgg", "Assets/starfield.jpg");

    this.load.image('player', 'Assets/ship.png');
    this.load.image('projectile', 'Assets/bullet1.png');
    this.load.image('obstacle', 'Assets/enemy.PNG');
    this.load.audio('music', 'Assets/audio/bgm.mp3');
    this.load.audio('shoot', 'assets/audio/fire.wav');
    this.load.audio('collide', 'assets/audio/collide.mp3');
}

function create() {

    forest = this.add.tileSprite(0, 0, 3000, 3000, 'bgg');

    // Add background music
    music = this.sound.add('music', { loop: true });
    music.play();

    // Add sound effects
    shootSound = this.sound.add('shoot');
    collideSound = this.sound.add('collide');

    // Create the player
    player = this.physics.add.sprite(400, 500, 'player').setScale(0.5);
    player.setCollideWorldBounds(true);

    // Create projectiles group
    projectiles = this.physics.add.group();

    // Create obstacles group
    obstacles = this.physics.add.group();

    // Create score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Create time survived text
    timeText = this.add.text(600, 16, 'Time: 0', { fontSize: '32px', fill: '#fff' });

    // Set up keyboard input
    this.input.keyboard.on('keydown-SPACE', shootProjectile, this);
}

function update(time, delta) {

    forest.tilePositionY -= 2;
    // Update time survived
    timeSurvived += delta;
    timeText.setText('Time: ' + Math.floor(timeSurvived / 1000));

    // Check if it's time to spawn a new obstacle
    if (time - lastObstacleSpawnTime > obstacleSpawnRate) {
        spawnObstacle();
        lastObstacleSpawnTime = time;
    }

    // Move the player horizontally
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    // Collisions
    this.physics.overlap(projectiles, obstacles, projectileObstacleCollision, null, this);
    this.physics.overlap(player, obstacles, playerObstacleCollision, null, this);
}

function shootProjectile() {
    const projectile = projectiles.create(player.x, player.y, 'projectile');
    projectile.setVelocityY(-2000);
    shootSound.play();
}
function spawnObstacle() {
    const x = Phaser.Math.Between(100, 700);
    const obstacle = obstacles.create(x, -50, 'obstacle');
    obstacle.setVelocityY(Phaser.Math.Between(100, 300));
}

function projectileObstacleCollision(projectile, obstacle) {
    projectile.destroy();
    obstacle.destroy();
    collideSound.play();
    score += 10;
    scoreText.setText('Score: ' + score);
}

function playerObstacleCollision(player, obstacle) {
    player.disableBody(true, true);
    music.stop();
    this.scene.restart();
    score = 0;
    timeSurvived = 0;
}