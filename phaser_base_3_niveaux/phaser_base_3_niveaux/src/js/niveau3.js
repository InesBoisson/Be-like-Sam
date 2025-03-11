var groupe_bieres;
export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  preload() {
// chargement tuiles de jeu
this.load.image("tavern-decoNEW", "src/assets/tavern-decoNEW.png");
this.load.image("tavern-furnitureNEW", "src/assets/tavern-furnitureNEW.png");
this.load.image("TopDownHouse_FloorsAndWallsNEW", "src/assets/TopDownHouse_FloorsAndWallsNEW.png");
// chargement de la carte
this.load.tilemapTiledJSON("carte", "src/assets/jeu_N3.json");
this.add.image(800, 600, "carte"); 
//chargement image biere
this.load.image("img_bieres", "src/assets/alcohol_bottle.png");
this.load.spritesheet("img_perso", "src/assets/dude.png", {
  frameWidth: 32,
  frameHeight: 48
}); 
}

  create() {
// Chargement de la carte
const carteDuNiveau = this.make.tilemap({ key: "carte" });
// Chargement des jeux de tuiles
const tileset1 = carteDuNiveau.addTilesetImage("tavern-decoNEW", "tavern-decoNEW");
const tileset2 = carteDuNiveau.addTilesetImage("tavern-furnitureNEW", "tavern-furnitureNEW");
const tileset3 = carteDuNiveau.addTilesetImage("TopDownHouse_FloorsAndWallsNEW", "TopDownHouse_FloorsAndWallsNEW");
// chargement du calque BG
const BG = carteDuNiveau.createLayer(
  "BG",
  [tileset1,tileset2,tileset3]
);
// chargement du calque FG1
const FG = carteDuNiveau.createLayer(
  "FG",
  [tileset1,tileset2,tileset3]
);
// chargement du calque FG2
const FG1 = carteDuNiveau.createLayer(
  "FG1",
  [tileset1,tileset2,tileset3]
); 
// définition des tuiles de plateformes qui sont solides
// utilisation de la propriété estSolide
BG.setCollisionByProperty({ estSolide: true });
this.anims.create({
  key: "anim_tourne_gauche",
  frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: "anim_face",
  frames: [{ key: "img_perso", frame: 4 }],
  frameRate: 10
});

this.anims.create({
  key: "anim_tourne_droite",
  frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }),
  frameRate: 10,
  repeat: -1
});

// ajout d'une collision entre le joueur et le calque plateformes
// redimentionnement du monde avec les dimensions calculées via tiled
    this.player = this.physics.add.sprite(800, 200, "img_perso");
    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);    
    this.cameras.main.startFollow(this.player);
    this.player.setDepth(10);
this.cameras.main.startFollow(this.player);
this.physics.add.collider(this.player, BG); 
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    groupe_bieres = this.physics.add.staticGroup();

    // Création de 3 bouteilles de bière à des positions fixes
    groupe_bieres.create(220, 300, "img_bieres");
    groupe_bieres.create(400, 300, "img_bieres");
    groupe_bieres.create(600, 300, "img_bieres");
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
      this.player.setVelocityY(-200);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
