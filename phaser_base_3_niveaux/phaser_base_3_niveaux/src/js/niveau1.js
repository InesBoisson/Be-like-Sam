// src/js/niveau1.js
export default class Niveau1 extends Phaser.Scene {
  constructor() {
    super({ key: 'niveau1' });
    this.maxScore = 4; // Définir le score maximum
    this.score = 0; // Initialisation correcte du score

  }

  preload() {
    // Charger les images nécessaires
    this.load.image('background2', 'src/assets/sky.png');
    this.load.image('waterGlass', 'src/assets/water_glass.png'); // Image de verre d'eau
    this.load.image('alcoholBottle', 'src/assets/alcohol_bottle.png'); // Image de bouteille d'alcool
    this.load.image('wineGlass', 'src/assets/wine_glass.png'); // Image de verre de vin
    this.load.image('waterBottle', 'src/assets/water_bottle.png'); // Image de bouteille d'eau
    this.load.spritesheet("player", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("jauge", "src/assets/jauge.png", {
      frameWidth: 486,
      frameHeight: 121
    });
  }

  create() {
    // Ajouter le fond
    this.add.image(400, 300, 'background2');

    // Créer le personnage
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true); // Empêche le joueur de sortir de l'écran

    // Afficher la barre de vie en utilisant la méthode this.add.sprite()
    this.framePV=0
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
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_face",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 20
    });

    // Démarrer le timer de 45 secondes
    this.time.addEvent({
      delay: 25000, // 45 secondes en millisecondes
      callback: this.finNiveau,
      callbackScope: this,
      loop: false // Ne pas répéter
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
    // Vérifiez si le score a atteint la valeur maximale
    if (this.score >= this.maxScore) {
      this.stopGame(); // Appeler la fonction pour arrêter le jeu
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
  }

  collectAlcoholBottle(player, alcoholBottle) {
    alcoholBottle.destroy(); // Détruire la bière
    if (this.score < this.maxScore) {
      this.score++;
      this.framePV+=2;
      this.barreVie = this.add.sprite(400, 40, "jauge").setFrame(this.framePV);

    }

  }

  collectWineGlass(player, wineGlass) {
    wineGlass.destroy(); // Détruire le verre de vin

    if (this.score < this.maxScore) {
      this.score++;
      this.framePV+=2;
      this.barreVie = this.add.sprite(400, 40, "jauge").setFrame(this.framePV);

    }
  }



  collectWaterBottle(player, waterBottle) {
    // Ne rien faire lorsque le joueur touche une bouteille d'eau
    waterBottle.destroy(); // Détruire la bouteille d'eau
  }

  finNiveau() {
    console.log("Le temps est écoulé !");
    this.physics.pause(); // Arrêter la physique pour éviter des bugs
    this.scene.start('Dialogue'); // Lancer la scène de Dialogue
  }
}
