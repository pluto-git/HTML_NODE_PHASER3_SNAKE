import Loginning from "./Loginning.js";
import StartingScene from "./StartingScene.js";
import GameScene from "./GameScene.js";
import FinalScene from "./FinalScene.js";


var config = {
    type: Phaser.AUTO,
    parent:"game",
    width: 640,
    height: 480,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#5DACD8",
    dom: {
    createContainer: true
    },
    scene: [Loginning, StartingScene , GameScene, FinalScene]
};

var game = new Phaser.Game(config);
