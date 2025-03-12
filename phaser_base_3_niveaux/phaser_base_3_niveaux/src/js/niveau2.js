export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
      
    });
  }
  preload() {
    // chargement tuiles de jeu
this.load.image("3e4aa70777418d958610a424634bc2e5", "src/assets/3e4aa70777418d958610a424634bc2e5.png");
this.load.image("alcohol_bottle","src/assets/alcohol_bottle.png");
this.load.image("interiors_demoNew","src/assets/interiors_demoNew.png");


// chargement de la carte
this.load.tilemapTiledJSON("carte", "src/assets/CoffeeShop.json"); 
  }

  create() {
// chargement de la carte
const carteDuNiveau = this.add.tilemap("carte");

// chargement du jeu de tuiles
const tileset1 = carteDuNiveau.addTilesetImage("alcohol_bottle","alcohol_bottle");  
const tileset2 = carteDuNiveau.addTilesetImage("3e4aa70777418d958610a424634bc2e5","3e4aa70777418d958610a424634bc2e5");
// chargement du calque bar
const bar = carteDuNiveau.createLayer(
  "bar",
  tileset2
);

// chargement du calque pinte
const pinte = carteDuNiveau.createLayer(
  "pinte",
  tileset1
);  
    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);
  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
