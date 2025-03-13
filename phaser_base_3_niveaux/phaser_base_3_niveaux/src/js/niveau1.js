// src/js/niveau1.js
export default class Niveau1 extends Phaser.Scene {
  constructor() {
    super({ key: 'niveau1' }); // Initialisation de la scène avec un identifiant
    this.maxJauge = 4; // Définir le score maximum pour la jauge
    this.Jauge = 0; // Initialisation de la jauge
    this.Score1 = 0; // Initialisation du score
    this.musique_de_fond = null; // Variable pour la musique de fond
  }
  init() {
    this.Jauge = 0; 
    this.Score1 = 0;
  }

  preload() {
    // Charger les images nécessaires pour le jeu
    this.load.image('waterGlass', 'src/assets/water_glass.png'); // Image de verre d'eau
    this.load.image('alcoholBottle', 'src/assets/alcohol_bottle.png'); // Image de bouteille d'alcool
    this.load.image('wineGlass', 'src/assets/wine_glass.png'); // Image de verre de vin
    this.load.image('waterBottle', 'src/assets/water_bottle.png'); // Image de bouteille d'eau
    this.load.audio('backgroundMusic', 'src/assets/Crazy_Frog.mp3'); // Charger la musique de fond

    // Charger les images des tilesets pour la carte
    this.load.image("3e4aa70777418d958610a424634bc2e5", "src/assets/3e4aa70777418d958610a424634bc2e5.png");
    this.load.image("interiors_demoNew", "src/assets/interiors_demoNew.png");
    this.load.image("alcohol_bottle1", "src/assets/alcohol_bottle1.png"); // Assurez-vous que ce fichier existe

    // Charger la carte
    this.load.tilemapTiledJSON("CoffeeShop", "src/assets/CoffeeShop.json");

    // Charger les spritesheets pour les personnages
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
    // Création de la carte à partir du tilemap
    const carteDuNiveau = this.add.tilemap("CoffeeShop");

    // Chargement des tilesets
    const tilesetFond = carteDuNiveau.addTilesetImage("3e4aa70777418d958610a424634bc2e5", "3e4aa70777418d958610a424634bc2e5");
    const tilesetObjets = carteDuNiveau.addTilesetImage("interiors_demoNew", "interiors_demoNew");
    const tilesPinte = carteDuNiveau.addTilesetImage("alcohol_bottle1", "alcohol_bottle1");

    // Chargement des calques
    const Bar = carteDuNiveau.createLayer("Bar", [tilesetFond, tilesetObjets]);
    const Pinte = carteDuNiveau.createLayer("Pinte", tilesPinte);

    // Définition des collisions pour le bar
    Bar.setCollisionByProperty({ estSolide: true });

    // Ajouter et jouer la musique de fond
    this.musique_de_fond = this.sound.add('backgroundMusic');
    this.musique_de_fond.play();  

    // Créer le personnage
    this.player = this.physics.add.sprite(300, 350, 'player');
    this.player.setBounce(0.2); // Ajoute un léger rebond au joueur
    this.player.setCollideWorldBounds(true); // Empêche le joueur de sortir de l'écran
    this.physics.add.collider(this.player, Bar); // Gérer les collisions entre le joueur et le bar

    // Afficher la barre de vie
    this.framePV = 0; // Initialisation de la frame de la barre de vie
    this.barreVie = this.add.sprite(400, 40, "jauge").setFrame(this.framePV); // Création de la barre de vie

    // Créer les groupes pour les objets
    this.waterGlasses = this.physics.add.group(); // Groupe pour les verres d'eau
    this.alcoholBottles = this.physics.add.group(); // Groupe pour les bouteilles d'alcool
    this.wineGlasses = this.physics.add.group(); // Groupe pour les verres de vin
    this.waterBottles = this.physics.add.group(); // Groupe pour les bouteilles d'eau

    // Gérer les touches du clavier
    this.cursors = this.input.keyboard.createCursorKeys();

    // Créer un timer pour faire tomber les objets
    this.time.addEvent({
      delay: 1000, // 1 seconde
      callback: this.spawnObject, // Fonction à appeler
      callbackScope: this, // Contexte de la fonction
      loop: true // Boucle infinie
    });

    // Gérer les collisions avec les objets
    this.physics.add.overlap(this.player, this.waterGlasses, this.collectWaterGlass, null, this);
    this.physics.add.overlap(this.player, this.alcoholBottles, this.collectAlcoholBottle, null, this);
    this.physics.add.overlap(this.player, this.wineGlasses, this.collectWineGlass, null, this);
    this.physics.add.overlap(this.player, this.waterBottles, this.collectWaterBottle, null, this);

    // Créer les animations pour le personnage
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

    // Afficher le score à l'écran
    this.scoreText = this.add.text(32, 32, `Score: ${this.Score1}`, {
      font: '32px Arial',
      fill: '#fff'
    });
  }

  update() {
    // Déplacer le personnage en fonction des touches pressées
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-400); // Déplacement vers la gauche
      this.player.anims.play("anim_tourne_gauche", true); // Jouer l'animation de rotation à gauche
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(400); // Déplacement vers la droite
      this.player.anims.play("anim_tourne_droite", true); // Jouer l'animation de rotation à droite
    } else {
      this.player.setVelocityX(0); // Arrêter le mouvement horizontal
      this.player.anims.play('anim_face'); // Jouer l'animation de face
    }

    // Vérifier si la jauge a atteint sa valeur maximale
    if (this.Jauge >= this.maxJauge) {
      this.stopGame(); // Arrête le jeu si la jauge atteint le maximum
      this.musique_de_fond.stop(); // Arrêter la musique de fond
    }

    // Vérifier si le score a atteint 150 pour terminer le niveau
    if (this.Score1 >= 150) {
      this.finNiveau(); // Terminer le niveau si le score atteint 150
      this.musique_de_fond.stop(); // Arrêter la musique de fond
    }
  }

  stopGame() {
    // Pause le jeu et affiche un message de perte
    this.scene.pause(); // Mettre la scène en pause
    this.add.text(250, 250, 'Vous avez perdu!\n désaoulez et réessayez :)', { font: '32px Arial', fill: '#ffffff' });
  }

  spawnObject() {
    // Générer un objet aléatoire à une position aléatoire sur l'axe X
    const x = Phaser.Math.Between(0, 800); // Position aléatoire sur X
    const objectType = Phaser.Math.Between(0, 3); // 0 à 3 pour choisir un objet

    // Créer un objet en fonction du type aléatoire
    if (objectType === 0) {
      const waterGlass = this.waterGlasses.create(x, 0, 'waterGlass');
      waterGlass.setVelocityY(10); // Vitesse de chute
    } else if (objectType === 1) {
      const alcoholBottle = this.alcoholBottles.create(x, 0, 'alcoholBottle');
      alcoholBottle.setVelocityY(10);
      alcoholBottle.setScale(2); // Agrandir la bouteille d'alcool
    } else if (objectType === 2) {
      const wineGlass = this.wineGlasses.create(x, 0, 'wineGlass');
      wineGlass.setVelocityY(10);
      wineGlass.setScale(0.07); // Réduire la taille du verre de vin
    } else {
      const waterBottle = this.waterBottles.create(x, 0, 'waterBottle');
      waterBottle.setVelocityY(10);
      waterBottle.setScale(1.2); // Agrandir la bouteille d'eau
    }
  }

  // Collecte des objets par le joueur
  collectWaterGlass(player, waterGlass) {
    waterGlass.destroy(); // Détruire le verre d'eau
    this.Score1 += 20; // Ajouter 20 points au score
    this.scoreText.setText(`Score: ${this.Score1}`); // Mettre à jour l'affichage du score
    if (this.Jauge > 0) {
      this.Jauge -= 0.5; // Diminuer la jauge d’un point
      this.framePV -= 1; // Mettre à jour l'affichage de la barre de vie
      this.barreVie.setFrame(this.framePV); // Rafraîchir le sprite de la barre de vie
    }
  }

  collectAlcoholBottle(player, alcoholBottle) {
    alcoholBottle.destroy(); // Détruire la bouteille d'alcool
    if (this.Jauge < this.maxJauge) {
      this.Jauge++; // Augmenter la jauge
      this.framePV += 2; // Augmenter la frame de la barre de vie
      this.barreVie.setFrame(this.framePV); // Mettre à jour l'affichage de la barre de vie
    }
  }

  collectWineGlass(player, wineGlass) {
    wineGlass.destroy(); // Détruire le verre de vin
    if (this.Jauge < this.maxJauge) {
      this.Jauge++; // Augmenter la jauge
      this.framePV += 2; // Augmenter la frame de la barre de vie
      this.barreVie.setFrame(this.framePV); // Mettre à jour l'affichage de la barre de vie
    }
  }

  collectWaterBottle(player, waterBottle) {
    waterBottle.destroy(); // Détruire la bouteille d'eau
    this.Score1 += 20; // Ajouter 20 points au score
    this.scoreText.setText(`Score: ${this.Score1}`); // Mettre à jour l'affichage du score
    if (this.Jauge > 0) {
      this.Jauge -= 0.5; // Diminuer la jauge d’un point
      this.framePV -= 1; // Mettre à jour l'affichage de la barre de vie
      this.barreVie.setFrame(this.framePV); // Rafraîchir le sprite de la barre de vie
    }
  }

  finNiveau() {
    this.physics.pause(); // Arrêter la physique pour éviter des bugs
    this.scene.start('Dialogue'); // Lancer la scène de Dialogue
  }
} 