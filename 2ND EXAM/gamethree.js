var back;
var platforms;
var player;
var cursors;
var gameOver = false;
var winGame = false;
var stars;
var bombs;
var score = 0;
var starscollected = 0;
var scoreText;
var starscollect;
var plat;
const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600
const hp_Box_width = 200

export default class gameScenethree extends Phaser.Scene {
    constructor() {
        super("GameScene3")
    }

    preload() {
        this.load.image('back1', 'Assets/bgm3.jpg');
        this.load.image('platforms', 'Assets/platform1.png');
        this.load.spritesheet('redhood', 'Assets/hello.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('coinsa', 'Assets/heart.png');
        this.load.image('bombs', 'Assets/bomb.png');
        this.load.image('platforms3', 'Assets/platform3.png');
        this.load.image('platforms4', 'Assets/platform4.png');


    }
    create() {

        //background
        back = this.add.image(400, 300, 'back1');
        back.setScale(0.5);
        //platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 800, 'platforms').setScale(1).refreshBody();
        platforms.create(200, 400, 'platforms4').setScale(0.1).refreshBody();
        platforms.create(400, 200, 'platforms4').setScale(0.1).refreshBody();
        platforms.create(600, 300, 'platforms4').setScale(0.1).refreshBody();
        platforms.create(450, 380, 'platforms4').setScale(0.1).refreshBody();

        plat = this.add.image(400,620,'platforms3').setScale(1);


        //player
        player = this.physics.add.sprite(100, 450, 'redhood');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(1);

        // player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('redhood', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'redhood', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('redhood', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 5 in total, evenly spaced 180 pixels apart along the x axis
        
        stars = this.physics.add.group({
            key: 'coinsa',
            repeat: 11,
            setXY: { x: 13, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });


        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(18, 500, 'Score: 0', { fontSize: '32px', fill: '000000' });
        starscollect = this.add.text(400, 500, 'Hearts collected: 0', { fontSize: '32px', fill: '000000' });
        // camera
        var minimapCamera = this.cameras.add(DEFAULT_WIDTH - hp_Box_width - 16, DEFAULT_HEIGHT - hp_Box_width / 2 - 16, 200, 100);
        minimapCamera.zoom = 0.5;

        minimapCamera.startFollow(player, scoreText);
        this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

        this.cameras.main.startFollow(player, scoreText);
        this.cameras.main.setZoom(1.5);


        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    }

    update() {
        if (gameOver) {
            this.scene.start("FailedScene");
        }
        if (winGame) {
            this.scene.start("WinScene");
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

    }

    collectStar(player, star) {

        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        starscollected += 1;

        if (starscollected == 50) {
            winGame = true;
        }

        if (starscollected == 40) {
            player.setScale(1.1);
        }
        if (starscollected == 10) {
            player.setScale(1.2);
        }
        if (starscollected == 15) {
            player.setScale(1.3);
        }
        if (starscollected == 20) {
            player.setScale(1.4);
        }
        if (starscollected == 25) {
            player.setScale(1.5);
        }
        if (starscollected == 30) {
            player.setScale(1.6);
        }
        if (starscollected == 35) {
            player.setScale(1.7);
        }
        if (starscollected == 40) {
            player.setScale(1.8);
        }
        if (starscollected == 45) {
            player.setScale(1.9);
        }
        if (starscollected == 50) {
            player.setScale(2.0);
        }
        starscollect.setText('Hearts Collected: ' + starscollected)
        scoreText.setText('Score: ' + score);



        if (stars.countActive(true) === 1) {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bombs');
            bomb.setBounce(1);
            bomb.setScale(0.1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false

        }

    }

    hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}
