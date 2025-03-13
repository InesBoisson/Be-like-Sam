// src/js/niveau1.js
export default class Niveau1 extends Phaser.Scene {
  constructor() {
    super({ key: 'niveau1' });
    this.maxJauge = 4; // Définir le score maximum
    this.Jauge = 0; // Initialisation correcte du score
    this.Score1 = 0;

  }

  preload() {
    // Charger les images nécessaires
    this.load.image('waterGlass', 'src/assets/water_glass.png'); // Image de verre d'eau
    this.load.image('alcoholBottle', 'src/assets/alcohol_bottle.png'); // Image de bouteille d'alcool
    this.load.image('wineGlass', 'src/assets/wine_glass.png'); // Image de verre de vin
    this.load.image('waterBottle', 'src/assets/water_bottle.png'); // Image de bouteille d'eau

    // chargement de la carte
    // Charger les images des tilesets
    this.load.image("3e4aa70777418d958610a424634bc2e5", "src/assets/3e4aa70777418d958610a424634bc2e5.png"); // Assurez-vous que l'extension est correcte
    this.load.image("interiors_demoNew", "src/assets/interiors_demoNew.png");
    this.load.image("alcohol_bottle1", "src/assets/alcohol_bottle1.png"); // Assurez-vous que ce fichier existe

    // Charger la carte
    this.load.tilemapTiledJSON("CoffeeShop", "src/assets/CoffeeShop.json");

    this.load.spritesheet("player", "src/assets/perso1.png", {
      frameWidth: 75,
      frameHeight: 110
    });
    this.load.spritesheet("jauge", "src/assets/jauge.png", {
      frameWidth: 486,
      frameHeight: 121
    });
  }



  create() {

    const carteDuNiveau = this.add.tilemap("CoffeeShop");


    // Chargement des tilesets (VÉRIFIE bien les noms avec Tiled)
    const tilesetFond = carteDuNiveau.addTilesetImage("3e4aa70777418d958610a424634bc2e5", "3e4aa70777418d958610a424634bc2e5");
    const tilesetObjets = carteDuNiveau.addTilesetImage("interiors_demoNew", "interiors_demoNew");
    const tilesPinte = carteDuNiveau.addTilesetImage("alcohol_bottle1", "alcohol_bottle1");

    // Chargement des calques (VÉRIFIE les noms des calques dans Tiled)
    const Bar = carteDuNiveau.createLayer("Bar", [tilesetFond, tilesetObjets]);
    const Pinte = carteDuNiveau.createLayer("Pinte", tilesPinte);


    Bar.setCollisionByProperty({ estSolide: true });



    // Créer le personnage
    this.player = this.physics.add.sprite(300, 350, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true); // Empêche le joueur de sortir de l'écran
    this.physics.add.collider(this.player, Bar);


    // Afficher la barre de vie en utilisant la méthode this.add.sprite()
    this.framePV = 0
    this.barreVie = this.add.sprite(400, 40, "jauge").setFrame(this.framePV);

    // Créer les groupes pour les objets
    this.waterGlasses = this.physics.add.group();
    this.alcoholBottles = this.physics.add.group();
    this.wineGlasses = this.physics.add.group(); // Groupe pour les verres de vin
    this.waterBottles = this.physics.add.group(); // Groupe pour les bouteilles d'eau

    // Gérer les touches du clavier
    this.cursors = this.input.keyboard.createCursorKeys();

    // Créer un timer pour faire tomber les objets
    this.time.addEvent({
      delay: 1000, // 1 seconde
      callback: this.spawnObject,
      callbackScope: this,
      loop: true
    });

    // Gérer les collisions
    this.physics.add.overlap(this.player, this.waterGlasses, this.collectWaterGlass, null, this);
    this.physics.add.overlap(this.player, this.alcoholBottles, this.collectAlcoholBottle, null, this);
    this.physics.add.overlap(this.player, this.wineGlasses, this.collectWineGlass, null, this);
    this.physics.add.overlap(this.player, this.waterBottles, this.collectWaterBottle, null, this);

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

    
    this.scoreText = this.add.text(32, 32, `Score: ${this.Score1}`, {
      font: '32px Arial',
      fill: '#fff'
    });
  }

  update() {
    // Déplacer le personnage
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-400);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(400);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('anim_face');
    }
    if (this.Jauge >= this.maxJauge) { 
      this.stopGame(); // Arrête le jeu seulement si la jauge atteint le max
    }
    if (this.Score1 >= 150) {
      this.finNiveau(); // Terminer le niveau si le score atteint 150
    }


  }

  stopGame() {
    // Pause le jeu
    this.scene.pause();
    // Afficher un message ou effectuer d'autres actions
    this.add.text(250, 250, 'Vous avez perdu!\n désaoulez et réessayez :)', { font: '32px Arial', fill: '#ffffff' });
  }

  spawnObject() {
    const x = Phaser.Math.Between(0, 800); // Position aléatoire sur X
    const objectType = Phaser.Math.Between(0, 3); // 0 à 3 pour choisir un objet

    if (objectType === 0) {
      const waterGlass = this.waterGlasses.create(x, 0, 'waterGlass');
      waterGlass.setVelocityY(10); // Vitesse de chute
    } else if (objectType === 1) {
      const alcoholBottle = this.alcoholBottles.create(x, 0, 'alcoholBottle');
      alcoholBottle.setVelocityY(10);
      alcoholBottle.setScale(2)
    } else if (objectType === 2) {
      const wineGlass = this.wineGlasses.create(x, 0, 'wineGlass');
      wineGlass.setVelocityY(10);
      wineGlass.setScale(0.07);
    } else {
      const waterBottle = this.waterBottles.create(x, 0, 'waterBottle');
      waterBottle.setVelocityY(10);
      waterBottle.setScale(1.2)
    }
  }


  collectWaterGlass(player, waterGlass) {
    // Ne rien faire lorsque le joueur touche un verre d'eau
    waterGlass.destroy(); // Détruire le verre
    this.Score1 += 20; // Ajoute 20 points au score global
    this.scoreText.setText(`Score: ${this.Score1}`);
    if (this.Jauge > 0) {
      this.Jauge -= 0.5; // Diminuer la jauge d’un point
      this.framePV -= 1; // Mettre à jour l'affichage
      this.barreVie.setFrame(this.framePV); // Rafraîchir le sprite
    }

    
  }

  collectAlcoholBottle(player, alcoholBottle) {
    alcoholBottle.destroy(); // Détruire la bière
    if (this.Jauge < this.maxJauge) {
      this.Jauge++;
      this.framePV += 2;
      this.barreVie = this.add.sprite(400, 40, "jauge").setFrame(this.framePV);

    }

  }

  collectWineGlass(player, wineGlass) {
    wineGlass.destroy(); // Détruire le verre de vin

    if (this.Jauge < this.maxJauge) {
      this.Jauge++;
      this.framePV += 2;
      this.barreVie = this.add.sprite(400, 40, "jauge").setFrame(this.framePV);
    }
  }



  collectWaterBottle(player, waterBottle) {
    // Ne rien faire lorsque le joueur touche une bouteille d'eau
    waterBottle.destroy(); // Détruire la bouteille d'eau
    this.Score1 += 20; // Ajoute 20 points au score global
    this.scoreText.setText(`Score: ${this.Score1}`);
    if (this.Jauge > 0) {
      this.Jauge -= 0.5; // Diminuer la jauge d’un point
      this.framePV -= 1; // Mettre à jour l'affichage
      this.barreVie.setFrame(this.framePV); // Rafraîchir le sprite
    }


  }

  
finNiveau() {
  console.log("Le temps est écoulé !");
  this.physics.pause(); // Arrêter la physique pour éviter des bugs
  this.scene.start('Dialogue'); // Lancer la scène de Dialogue
}


}



