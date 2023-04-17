import GameScene from './game.js'
import ExitScene from './exit.js';
import WinScene from './win.js';

let gameScene = new GameScene();
let exitScene = new ExitScene();
let winScene = new WinScene();

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
let game = new Phaser.Game(config);

game.scene.add("GameScene", gameScene);
game.scene.add("ExitScene", exitScene);
game.scene.add("WinScene", winScene);

game.scene.start("GameScene");


