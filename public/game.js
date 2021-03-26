import StartingScene from "./StartingScene.js";
import GameScene from "./GameScene.js";
import FinalScene from "./FinalScene.js";

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#5DACD8",
    scene: [StartingScene,GameScene,FinalScene]
};

var game = new Phaser.Game(config);
