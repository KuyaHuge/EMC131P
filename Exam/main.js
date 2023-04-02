import MainMenu from './MainMenu.js'
import GameScene from './GameScene.js'
import CreditScene from './CreditScene.js'
import ExitScene from './ExitScene.js';

//
let mainMenu = new MainMenu();
let gameScene = new GameScene();
let creditScene = new CreditScene();
let exitScene = new ExitScene();

//
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};
//
let game = new Phaser.Game(config);



//
game.scene.add("MainMenu", mainMenu);
game.scene.add("GameScene", gameScene);
game.scene.add("CreditScene",creditScene);
game.scene.add("ExitScene", exitScene);

//
game.scene.start("MainMenu");


