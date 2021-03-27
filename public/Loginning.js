class Loginning extends Phaser.Scene {
    constructor() {
      super('Loginning');
    }
    preload() {
      this.load.image("button", "assets/image/button.png");
      this.load.image("continue_button", "assets/image/continue_button.png");
      this.load.html("form", "assets/components/input.html");
    }
    create() {
      var element = this.add.dom(320, 240).createFromCache('form');

      element.addListener('click');
      const self = this;
      element.on('click', function (event) {

          if (event.target.name === 'playButton')
          {
              var inputText = this.getChildByName('nameField');

              //  Have they entered anything?
              if (inputText.value !== '')
              {
                  //  Turn off the click events
                  this.removeListener('click');

                  //  Hide the login element
                  this.setVisible(false);


                  let id = Math.random().toString(36).replace("0.", inputText.value+"_" || "");
                  //  Populate the text with whatever they typed in
                  console.log(inputText.value);
                  self.scene.start("StartingScene", {name: inputText.value, id: id});
              }
              else{
                alert("Please enter your name!");
              }
          }

      });
}
  update() {}
}
  export default Loginning;
