export default class MainMenu extends Phaser.Scene{

    constructor(){
        super("MainMenu");
    }

    preload(){
        this.load.image('background', 'assets/bgm.png');
        this.load.image('start', 'assets/Start.png');
        this.load.image('credits', 'assets/credits.png')
        this.load.image('exit', 'assets/Exit.png')
    }
    create() {
        this.add.image(0,0, "background").setOrigin(0,0);

        let playButton = this.add.image(100,100, 'start');
        playButton.setInteractive({useHandCursor: true});
        playButton.on('pointerdown', () => this.playGame());
        playButton.setScale(0.2);

        let creditButton = this.add.image(100,175, 'credits');
        creditButton.setInteractive({useHandCursor: true});
        creditButton.on('pointerdown', () => this.credits());
        creditButton.setScale(0.5);

        let exitButton = this.add.image(100,330, 'exit');
        exitButton.setInteractive({useHandCursor: true});
        exitButton.on('pointerdown', () => this.exitgame());
        exitButton.setScale(0.4);

    }
    
    playGame(){
        console.log("Moving to Game Scene")
        this.scene.start("GameScene");
    }
    credits(){
        console.log("Moving to Credits Scene")
        this.scene.start("CreditScene")
    }
    exitgame(){
        console.log("Thank you for playing!!!")

    }
} 