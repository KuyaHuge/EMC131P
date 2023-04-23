import gameScene from "./game.js";
import WonGame from "./won.js";
import LevelTwoScene from "./gametwo.js";
import WonGameAgain from "./wonagain.js";
import gameScenethree from "./gamethree.js";
import FailedScene from "./exit.js";

let GameScene = new gameScene();
let WinGame = new WonGame();
let Leveltwo = new LevelTwoScene();
let wonagain = new WonGameAgain();
let Levelthree = new gameScenethree();
let Failed = new FailedScene();

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

game.scene.add("GameScene", GameScene);
game.scene.add("WinScene", WinGame);
game.scene.add("Level2", Leveltwo);
game.scene.add("WinScene2", wonagain);
game.scene.add("GameScene3", Levelthree);
game.scene.add("FailedScene", Failed);


game.scene.start("GameScene");