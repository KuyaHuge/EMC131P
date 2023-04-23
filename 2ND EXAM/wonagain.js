export default class WonGameAgain extends Phaser.Scene {
    constructor() {
        super("WinScene2")
    }
    preload() {
        this.load.image('over', 'Assets/WinAgain.png');
        this.load.image('backs', 'Assets/lvlthree.png');
    }
    create() {
        this.add.image(375, 200, 'over').setScale(1);
        let backButton = this.add.image(380, 430, 'backs');
        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerdown', () => this.goback());
        backButton.setScale(0.5);
    }
    goback() {
        console.log("Starting level 2");
        this.scene.start("GameScene3");
    }
}
