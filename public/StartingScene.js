
class StartingScene extends Phaser.Scene {
    constructor ()
    {
        super('StartingScene');
    }
    preload(){
      this.load.image("button", "assets/image/button.png");
      this.load.image("continue_button", "assets/image/continue_button.png");
    }
    create(){

      this.text = this.add.text(
          160,
          160,
          "Demo Foody Snake",
          {
              fontSize: 32,
              fontStyle: "bold"
          }
      )

      this.newGameButton = this.add.image(320, 240, "button");
      this.newGameButton.setInteractive();
      this.newGameButton.on('pointerdown', () => {
        console.log('pointerdown');
        this.scene.start("GameScene");
       });

    }
    update(){}
}

export default StartingScene;
