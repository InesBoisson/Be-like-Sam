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
    this.load.image("Tile_02", "src/assets/Tile_02.png");
    this.load.image("Tile_52", "src/assets/Tile_52.png");
    this.load.image("WorldSheetNew", "src/assets/WorldSheetNew.png");
    this.load.image("acohol_bottle", "src/assets/alcohol_bottle.png")


    // chargement de la carte
    this.load.tilemapTiledJSON("carte2", "src/assets/JeuN2.json");
    this.load.spritesheet("player", "src/assets/perso1.png", {
      frameWidth: 75,
      frameHeight: 110
    });
    this.load.spritesheet("Bob", "src/assets/perso3.png", {
      frameWidth: 64,
      frameHeight: 100
    });
  }


  create() {

    this.deathMessage = null; 


    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("carte2");


    // chargement du jeu de tuiles
    const tileset1 = carteDuNiveau.addTilesetImage("Background", "Background");
    const tileset2 = carteDuNiveau.addTilesetImage("Tile_02", "Tile_02");
    const tileset3 = carteDuNiveau.addTilesetImage("Tile_52", "Tile_52");
    const tileset4 = carteDuNiveau.addTilesetImage("WorldSheetNew", "WorldSheetNew");


    // chargement du calque BackrgoundArbres
    const BackrgoundArbres = carteDuNiveau.createLayer(
      "BackrgoundArbres", [tileset1, tileset2]
    );

    // chargement du calque pinte
    const Plateformes = carteDuNiveau.createLayer(
      "Plateformes", [tileset2, tileset3, tileset4]
    );

    // Créer le personnage
    this.player = this.physics.add.sprite(50, 350, 'player');
    this.player.setBounce(0.1);
    this.player.setScale(0.5)
    this.Bob = this.physics.add.sprite(3150, 350, 'Bob');
    this.Bob.setBounce(0.1);
    this.Bob.setScale(0.5)
    this.player.setCollideWorldBounds(true); // Empêche le joueur de sortir de l'écran
    this.physics.add.collider(this.player, Plateformes);
    this.physics.add.collider(this.Bob, Plateformes);

    Plateformes.setCollisionByProperty({ estSolide: true });

    // Gérer les touches du clavier
    this.cursors = this.input.keyboard.createCursorKeys();


    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 3200, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);  


    // Créer les animations
    this.anims.create({
      key: "anim_tourne_gauche",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_face",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_saut",
      frames: [{ key: "player", frame: 1 }],
      frameRate: 20
    });

    // Activation de la collision entre le joueur et l'ami
    this.physics.add.overlap(this.player, this.Bob, this.afficherMessageAmi, null, this);

    // Création du groupe de bouteilles
    this.groupe_bouteilles = this.physics.add.group();

    // Génération aléatoire des bouteilles
    let nombreBouteilles = 5; // Nombre de bouteilles à générer
    for (let i = 0; i < nombreBouteilles; i++) {
        let x = Phaser.Math.Between(100, 1200); // Position X aléatoire
        let y = Phaser.Math.Between(100, 500); // Position Y aléatoire

        let alcohol_bottle = this.groupe_bouteilles.create(x, y, "alcohol_bottle");
        alcohol_bottle.setImmovable(true); // La bouteille reste fixe
        alcohol_bottle.body.allowGravity = false; // Pas d'effet de gravité
    }
  // Ajout des collisions entre les bouteilles et les plateformes
  this.physics.add.collider(this.groupe_bouteilles, Plateformes);

  // Détection de collision entre le joueur et une bouteille
  this.physics.add.overlap(this.player, this.groupe_bouteilles, this.chocAvecBouteille, null, this);
}  
// Fonction déclenchée lorsque le joueur touche une bouteille
chocAvecBouteille(player, alcohol_bottle) {
  this.physics.pause();
  player.setTint(0xff0000); // Change la couleur du joueur en rouge
  player.anims.play("anim_face"); // Animation d'arrêt
  this.gameOver = true;
   
  // Affichage du message de mort
  this.messageMort = this.add.text(player.x, player.y - 50, "Vous êtes mort!", {
    fontSize: '32px',
    fill: '#fff',
    fontFamily: "Arial",
}).setOrigin(0.5);

// Retour au début après 2 secondes
   this.time.delayedCall(2000, () => {
    this.reinitialiserJoueur();
});
}

// Fonction pour réinitialiser le joueur au début
reinitialiserJoueur() {
  this.gameOver = false;
  this.physics.resume();
  this.player.setPosition(50, 350); // Change cette position selon ton spawn
  this.player.setVelocity(0, 0);
  this.player.clearTint(); // Enlève la couleur rouge

  // Supprimer le message de mort s'il existe
  if (this.messageMort) {
      this.messageMort.destroy();
      this.messageMort = null;
  }
}
  

afficherMessageAmi(player, perso3) {
  // Vérifie si le message existe déjà pour éviter les doublons
  if (!this.message) {
    
      this.message = this.add.text(2900, 400, "Bravo Sam! Tu as retrouvé ton ami!", {
          fontSize: '32px',
          fill: '#fff',
          fontFamily: "Arial",
      }).setOrigin(0.5);
    
      // Supprime le message après 5 secondes et retourne au menu
        this.time.delayedCall(5000, () => {
            if (this.message) {
                this.message.destroy();
                this.message = null;
            }
            // Retour au menu après que le message a disparu
            this.scene.start("menu"); // Assurez-vous que "menu" est bien le nom de votre scène de menu
        });
    } 
  }


  update() {

    // Initialisation des touches
    this.clavier = this.input.keyboard.createCursorKeys();

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

  // Saut - UNIQUEMENT si la touche vient d'être pressée une seule fois
  if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.body.blocked.down) {
    this.player.setVelocityY(-500); // Hauteur du saut
    this.player.anims.play("anim_saut");
}

if (this.player.y >= this.cameras.main.height && !this.deathMessage) {
  // Afficher le message de mort s'il n'existe pas déjà
  this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', {
    font: '32px Georgia',
    fill: '#fff',
  }).setOrigin(0.5).setScrollFactor(0);
 
  // Désactiver le corps physique du joueur 1
  this.player.setVelocity(0, 0);
  this.player.body.enable = false;

  // Redémarrer la scène après 500 ms
  this.time.delayedCall(2000, () => {
    this.scene.restart();
  });

}
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers menu");
        this.scene.switch("menu");
      }
    }
  }
}
