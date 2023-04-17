export default class ExitScene extends Phaser.Scene{
    constructor(){
        super("ExitScene")
    }
    preload() {
        this.load.image('gameover','assets/GameOver.jpg');
        this.load.image('retry','assets/Retry.png');
        this.load.image('back','assets/Back.png');
    }
    create(){
        this.add.image(375,300,'gameover');
        let backButton = this.add.image(100,550, 'back');
        backButton.setInteractive({useHandCursor: true});
        backButton.on('pointerdown', () => this.goback());
        backButton.setScale(0.5);

        let retryButton = this.add.image(650,550, 'retry');
        retryButton.setInteractive({useHandCursor: true});
        retryButton.on('pointerdown', () => this.retryy());
        retryButton.setScale(0.5);
    }
    goback(){
        console.log("Going back to Main Menu");
        this.scene.start("MainMenu");
    }
    retryy(){
        console.log("Restarting Game");
        this.scene.start("GameScene");
        return;
    
    }
}