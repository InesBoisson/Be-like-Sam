export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
      
    });
  }
  preload() {
    // chargement tuiles de jeu
this.load.image("Background", "src/assets/Background.png");
this.load.image("Tuile1","src/assets/Tile_02.png");
this.load.image("Tuile2","src/assets/Tile_52.png");
this.load.image("Details","src/assets/WorldSheetNew.png");


// chargement de la carte
this.load.tilemapTiledJSON("carte2", "src/assets/JeuN2.json"); 
this.load.spritesheet("player", "src/assets/perso1.png", {
  frameWidth: 75,
  frameHeight: 110
});
  }
  

  create() {
// chargement de la carte
const carteDuNiveau = this.add.tilemap("carte2");

// chargement du jeu de tuiles
const tileset1 = carteDuNiveau.addTilesetImage("Background","Background");  
const tileset2 = carteDuNiveau.addTilesetImage("Tuile1","Tuile1");
const tileset3 = carteDuNiveau.addTilesetImage("Tuile2","Tuile2");
const tileset4 = carteDuNiveau.addTilesetImage("Details","Details");


// chargement du calque bar
const BackgroundArbres = carteDuNiveau.createLayer(
  "Background",[tileset1, tileset2]
);

// chargement du calque pinte
const Plateformes = carteDuNiveau.createLayer(
  "Plateformes", [tileset2, tileset3, Tileset4]
);  

Plateformes.setCollisionByProperty({ estSolide: true }); 

// redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 3200, 640);
//  ajout du champs de la caméra de taille identique à celle du monde
this.cameras.main.setBounds(0, 0, 3200, 640);
// ancrage de la caméra sur le joueur
this.cameras.main.startFollow(player);  


    this.player = this.physics.add.sprite(100, 450, "player");
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
