import {fetchingPOST} from "./fetching.js";

class FinalScene extends Phaser.Scene {
  constructor() {
    super('FinalScene');
  }

  init(data){
    this.result = data.result;
    this.score = data.score;
    this.name = data.name;
    this.id = data.id;
    console.log("This is ID"+this.id);
  }
  preload() {
    this.load.image("restart_button", "assets/image/restart_button.png");
    this.load.image("nextLevel_button", "assets/image/next_level.png");
    this.objects = {};
  }
  create(){
    this.objects.camera = this.cameras.add(0, 0, 640, 480);
    this.objects.camera.setBackgroundColor('#2b2e4a');

    if(this.result === "dead"){
      let _data = {
        login: this.name,
        _id: this.id,
        score: this.score
      };

      fetchingPOST(_data);
      this.losingText = this.add.text(
          240,
          140,
          "Score "+this.score+"\nRestart?" ,
          {
              fontSize: 32,
              fontStyle: "bold"
          }
      )



      this.restartButton = this.add.image(320, 240, "restart_button");
      this.restartButton.setInteractive();
      this.restartButton.on('pointerdown', () => {
        console.log('pointerdown');
        this.scene.start("GameScene", {score:0,c:60});
       });
      }

    // }else{
    //   this.text = this.add.text(
    //       160,
    //       160,
    //       "You won. Continue?",
    //       {
    //           fontSize: 32,
    //           fontStyle: "bold"
    //       }
    //   )
    //   this.nextLevelButton = this.add.image(320, 240, "nextLevel_button");
    //   this.nextLevelButton.setInteractive();
    //   this.nextLevelButton.on('pointerdown', () => {
    //     console.log('pointerdown');
    //     this.scene.restart("GameScene");
    //    });
    // }
  }
}

export default FinalScene;
