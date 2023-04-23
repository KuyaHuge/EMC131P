export default class FailedScene extends Phaser.Scene {
    constructor() {
        super("FailedScene")
    }
    create() {
        this.add.image(400,300, "gameover");
    }
}