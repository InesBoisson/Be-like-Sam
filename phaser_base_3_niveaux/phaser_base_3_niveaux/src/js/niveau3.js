
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
}

  create() {
// Chargement de la carte
const carteDuNiveau = this.add.tilemap("carte");

// Chargement des jeux de tuiles
const tileset1 = carteDuNiveau.addTilesetImage("tavern-decoNEW", "tavern-decoNEW");
const tileset2 = carteDuNiveau.addTilesetImage("tavern-furnitureNEW", "tavern-furnitureNEW");
const tileset3 = carteDuNiveau.addTilesetImage("TopDownHouse_FloorsAndWallsNEW", "TopDownHouse_FloorsAndWallsNEW");

// Tableau des tilesets pour les couches de la carte

// chargement du calque BG
const BG = carteDuNiveau.createLayer(
  "BG",
  tileset1,tileset2,tileset3
);

// chargement du calque FG1
const FG1 = carteDuNiveau.createLayer(
  "FG1",
  tileset1,tileset2,tileset3
);

// chargement du calque FG2
const FG2 = carteDuNiveau.createLayer(
  "FG2",
  tileset1,tileset2,tileset3
); 
// définition des tuiles de plateformes qui sont solides
// utilisation de la propriété estSolide
calque_background.setCollisionByProperty({ estSolide: true }); 
// ajout d'une collision entre le joueur et le calque plateformes
this.physics.add.collider(player, calque_background);

// redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 3200, 640);
//  ajout du champs de la caméra de taille identique à celle du monde
this.cameras.main.setBounds(0, 0, 3200, 640);
// ancrage de la caméra sur le joueur
this.cameras.main.startFollow(player);  

    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 3", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3");

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
