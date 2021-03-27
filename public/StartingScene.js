import {fetchingGET} from "./fetching.js";

class StartingScene extends Phaser.Scene {
  constructor() {
    super('StartingScene');
  }

  init(data){
    this.id  = data.id;
    this.name = data.name;
  }
  preload() {
    this.load.image("button", "assets/image/button.png");
    this.load.image("topScores_button", "assets/image/topScores_button.png");
  }
  create() {

    this.text = this.add.text(
      160,
      160,
      "Demo Foody Snake", {
        fontSize: 32,
        fontStyle: "bold"
      }
    )

    console.log(this.id);
    console.log(this.name);

    this.newGameButton = this.add.image(320, 240, "button");
    this.newGameButton.setInteractive();
    this.newGameButton.on('pointerdown', () => {
      console.log('pointerdown');
      this.scene.start("GameScene", {id:this.id, name: this.name});
    });

    this.showRatingButton = this.add.image(320, 300, "topScores_button");
    this.showRatingButton.setInteractive();
    this.showRatingButton.on("pointerdown", () => {
      console.log("RaTING IS CLICKED!");

      const url = "http://localhost:3000/api/rating/sorted";
      fetchingGET(url);



  });
}
  update() {}

}




export default StartingScene;
