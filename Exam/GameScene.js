var player;
var stars;
var platforms;
var cursors;
var score = 0;
var starscollected = 0;
var gameOver = false;
var scoreText;
var starscollect;
var bombs;

export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")
    }

preload ()
{
    this.load.image('background', 'assets/bgm.png');
    this.load.image('over', 'assets/GameOver.jpg');
    this.load.image('floor', 'assets/platform2.png');
    this.load.image('star2', 'assets/star2.png');
    this.load.image('bomb2', 'assets/bomb2.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
 create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'floor').setScale(0.5).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'floor').setScale(0.2).refreshBody();
    platforms.create(50, 250, 'floor').setScale(0.2).refreshBody();
    platforms.create(750, 220, 'floor').setScale(0.2).refreshBody();

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setScale(1);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star2',
        repeat: 12,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    starscollect = this.add.text(400, 16, 'Stars collected: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.collider(player, bombs,this.hitBomb, null, this);
}

update ()
{
    if (gameOver)
    {
        this.scene.start("ExitScene");
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

collectStar(player, star)
{
    var colors = [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0xee82ee]
    var colorIndex = 0;
    star.disableBody(true,true);
    
    //  Add and update the score
    score += 10;
    starscollected += 1;

    if (starscollected == 5){
        player.setScale(1.1);
    }
    if (starscollected == 10){
        player.setScale(1.2);
    }
    if (starscollected == 15){
        player.setScale(1.3);
    }
    if (starscollected == 20){
        player.setScale(1.4);
    }
    if (starscollected == 25){
        player.setScale(1.5);
    }
    if (starscollected == 30){
        player.setScale(1.6);
    }
    if (starscollected == 35){
        player.setScale(1.7);
    }
    if (starscollected == 40){
        player.setScale(1.8);
    }
    if (starscollected == 45){
        player.setScale(1.9);
    }
    if (starscollected == 50){
        player.setScale(2.0);
    }
    starscollect.setText('Stars Collected: ' + starscollected)
    scoreText.setText('Score: ' + score);

    player.setTint(colors[colorIndex]);
    colorIndex++;
    if (colorIndex >= colors.length) { colorIndex = 0;}

    

    if (stars.countActive(true) === 1)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb2');
        bomb.setBounce(1);
        bomb.setScale(0.08);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false
        
    } 

    
}

 hitBomb (player , bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
}