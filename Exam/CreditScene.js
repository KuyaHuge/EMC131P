export default class CreditScene extends Phaser.Scene {
    constructor(){
        super("CreditScene")
    }
    preload(){
        this.load.image('profile','assets/Profile.jpg')
        this.load.image('background', 'assets/bgm.png');
        this.load.image('back','assets/Back.png')


    }
    create(){
        this.add.image(0,0, "background").setOrigin(0,0);
        var prof = this.add.image(400,200, 'profile');
        prof.setScale(0.3);
        this.add.text(320,400, "Eugene F. Flores II")
        this.add.text(380,430, "BS EMC")
        this.add.text(360,460, "2018101316")

        let backButton = this.add.image(100,550, 'back');
        backButton.setInteractive({useHandCursor: true});
        backButton.on('pointerdown', () => this.goback());
        backButton.setScale(0.5);
    }

    goback(){
        console.log("Going back to Main Menu");
        this.scene.start("MainMenu");
    }


}