export default class WonGame extends Phaser.Scene {
    constructor() {
        super("WinScene")
    }
    preload() {
        this.load.image('gamer', 'Assets/Win.jpg');
        this.load.image('back', 'Assets/lvltwo.png');
    }
    create() {
        this.add.image(375, 300, 'gamer').setScale(0.5);
        let backButton = this.add.image(380, 430, 'back');
        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerdown', () => this.goback());
        backButton.setScale(0.5);
    }
    goback() {
        console.log("Starting level 2");
        this.scene.start("Level2");
    }
}
