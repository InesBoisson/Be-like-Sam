export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
    this.nombreCollisions = 0; // Initialisation du compteur de collision
  }
  preload() {
    // Chargement des images pour les tuiles de jeu
    this.load.image("Background", "src/assets/Background.png"); // Chargement de l'image de fond
    this.load.image("Tile_02", "src/assets/Tile_02.png"); // Chargement de la tuile 02
    this.load.image("Tile_52", "src/assets/Tile_52.png"); // Chargement de la tuile 52
    this.load.image("WorldSheetNew", "src/assets/WorldSheetNew.png"); // Chargement de la feuille de monde
    this.load.image("bouteille", "src/assets/alcohol_bottle.png"); // Chargement de l'image de la bouteille

    // Chargement de la carte Tiled
    this.load.tilemapTiledJSON("carte2", "src/assets/JeuN2.json"); // Chargement du fichier JSON de la carte

    // Chargement des spritesheets pour les personnages
    this.load.spritesheet("player", "src/assets/perso1.png", { // Chargement du spritesheet du joueur
      frameWidth: 75, // Largeur d'un frame dans le spritesheet
      frameHeight: 110 // Hauteur d'un frame dans le spritesheet
    });
    this.load.spritesheet("Bob", "src/assets/perso3.png", { // Chargement du spritesheet de Bob
      frameWidth: 64, // Largeur d'un frame dans le spritesheet
      frameHeight: 100 // Hauteur d'un frame dans le spritesheet
    });
}


  create() {

    this.deathMessage = null;
    this.flouActif = false;
    this.inverserTouches = false;
    this.nombreCollisions = 0; // Réinitialisation correcte après un restart
    
    
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
    this.Bob.setDepth(10); // Bob sera toujours au-dessus du flou
    
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
    let nombreBouteilles = 7; // Nombre de bouteilles à générer
    for (let i = 0; i < nombreBouteilles; i++) {
      let x = Phaser.Math.Between(100, 3000); // Position X aléatoire
      let y = Phaser.Math.Between(100, 500); // Position Y aléatoire
    
      let bouteille = this.groupe_bouteilles.create(x, y, "bouteille");
      bouteille.setImmovable(true); // La bouteille reste fixe
      bouteille.body.setEnable(true); // Active le body de la bouteille
      bouteille.setBounce(0.5); // Ajoute du rebond pour éviter qu'elle soit bloquée
    
      console.log(`Bouteille placée à x: ${x}, y: ${y}`); // Vérifier si elles apparaissent bien
    }
    // Ajout des collisions entre les bouteilles et les plateformes
    this.physics.add.collider(this.groupe_bouteilles, Plateformes);
    
    // Détection de collision entre le joueur et une bouteille
    this.physics.add.overlap(this.player, this.groupe_bouteilles, this.chocAvecBouteille, null, this);
    
    // Effet de flou désactivé au début
    this.postProcess = this.cameras.main.postFX;
  }


  chocAvecBouteille(player, bouteille) {
    // Affiche un message dans la console lorsque la collision est détectée
    console.log("Collision détectée !");
    this.nombreCollisions++; // Incrémente le compteur de collisions
    console.log("Nombre de collisions:", this.nombreCollisions); // Log pour le débogage, affiche le nombre de collisions

    // Vérifie le nombre de collisions pour appliquer des effets différents
    if (this.nombreCollisions === 1) {
        this.flouActif = true; // Active l'état de flou
        this.postProcess.addBlur(4); // Ajoute un effet de flou à la caméra
        bouteille.destroy(); // Supprime la bouteille après la collision
        this.afficherMessage("Vous commencez à voir flou..."); // Affiche un message à l'écran

    } else if (this.nombreCollisions === 2) {
        this.inverserTouches = true; // Active l'inversion des touches
        console.log("Touches inversées !", this.inverserTouches); // Vérification dans la console
        bouteille.destroy(); // Supprime la bouteille après la collision
        this.afficherMessage("Oh non ! Tout est inversé !"); // Affiche un message à l'écran

    } else if (this.nombreCollisions >= 3) {
        this.physics.pause(); // Arrête la physique du jeu
        player.setTint(0xff0000); // Change la couleur du joueur pour indiquer la mort
        bouteille.destroy(); // Supprime la bouteille après la collision
        player.anims.play("anim_face"); // Joue l'animation de face pour le joueur
        this.afficherMessage("Vous avez trop bu ! Game Over !"); // Affiche un message de game over
        this.postProcess.addBlur(10); // Ajoute un effet de flou plus intense

        // Redémarre la scène après un délai de 3 secondes
        this.time.delayedCall(3000, () => {
            this.scene.restart(); // Réinitialise complètement la scène
        });
    }

    // Ajout d'un délai avant que le joueur puisse retoucher une autre bouteille
    this.time.delayedCall(1000, () => {
        this.peutToucherBouteille = true; // Réactive la possibilité de toucher une bouteille
    });
}

  // Fonction pour réinitialiser le joueur au début
reinitialiserJoueur() {
  this.gameOver = false; // Réinitialise l'état de jeu à "non terminé"
  this.physics.resume(); // Réactive la physique du jeu après une pause
  this.player.setPosition(50, 350); // Réinitialise la position du joueur à (50, 350)
  this.player.setVelocity(0, 0); // Réinitialise la vitesse du joueur à zéro
  this.player.clearTint(); // Enlève toute teinte appliquée au joueur (comme une couleur de mort)
  this.flouActif = false; // Désactive l'effet de flou
  this.postProcess.removeBlur(); // Retire l'effet de flou de la caméra

  // Supprimer le flou du document
  document.body.style.filter = "none"; // Enlève tout filtre CSS appliqué au corps du document

  // Réinitialiser les touches inversées
  this.inverserTouches = false; // Rétablit les touches à leur état normal (non inversées)
  
  // Supprimer le message de mort s'il existe
  if (this.messageMort) { // Vérifie si un message de mort est présent
      this.messageMort.destroy(); // Détruit le message de mort
      this.messageMort = null; // Réinitialise la variable pour éviter les références ultérieures
  }

  // Réinitialiser le compteur de collisions
  this.nombreCollisions = 0; // Remet le compteur de collisions à zéro
}


afficherMessage(text) {
  // Vérifie si un message est déjà affiché
  if (this.message) {
      this.message.destroy(); // Supprime le message précédent s'il existe
  }
  
  // Crée un nouveau message à afficher à l'écran
  this.message = this.add.text(400, 300, text, { // Ajoute le texte à la position (400, 300)
      font: '32px Arial', // Définit la police et la taille du texte
      fill: '#fff' // Définit la couleur du texte en blanc
  }).setOrigin(0.5); // Centre le texte par rapport à sa position

  // Positionne le message au-dessus du joueur
  this.message.setPosition(this.player.x, this.player.y - 100); // Place le message au-dessus du joueur

  // Supprime le message après un délai de 5 secondes
  this.time.delayedCall(5000, () => { // Appelle la fonction après 5000 ms (5 secondes)
      this.message.destroy(); // Détruit le message affiché
      this.message = null; // Réinitialise la variable pour éviter les références ultérieures
  });
}

afficherMessageAmi(player, perso3) {
  // Affiche un message dans la console lorsque le message de victoire est déclenché
  console.log("🏆 Message de victoire déclenché !");

  // Si le joueur était en Game Over (après une bouteille), on réactive le jeu
  if (this.gameOver) {
      console.log("Le joueur était en Game Over, on le réactive !"); // Log pour indiquer que le jeu est réactivé
      this.gameOver = false; // Réinitialise l'état de jeu à "non terminé"
      this.physics.resume(); // Réactive la physique du jeu
      this.player.clearTint(); // Enlève toute teinte appliquée au joueur (comme une couleur de mort)
      this.postProcess.clear(); // Supprime le flou si activé
      this.inverserTouches = false; // Rétablit les touches à leur état normal (non inversées)
  }

  // Vérifie si le message existe déjà pour éviter les doublons
  if (!this.message) { // Si aucun message n'est actuellement affiché
      // Crée un nouveau message à afficher à l'écran
      this.message = this.add.text(2900, 400, "Bravo Sam! Tu as retrouvé Bob!", { // Ajoute le texte à la position (2900, 400)
          fontSize: '32px', // Définit la taille de la police
          fill: '#fff', // Définit la couleur du texte en blanc
          fontFamily: "Arial", // Définit la police à Arial
      }).setOrigin(0.5); // Centre le texte par rapport à sa position

      // Supprime le message après un délai de 3 secondes
      this.time.delayedCall(3000, () => { // Appelle la fonction après 3000 ms (3 secondes)
          // Retour au menu après que le message a disparu
          this.physics.pause(); // Arrête la physique du jeu
          this.scene.start("niveau3"); // Charge la scène "niveau3"
      });
  }
}



update() {
  // Initialisation des touches
  this.clavier = this.input.keyboard.createCursorKeys(); // Crée les touches directionnelles pour le contrôle du joueur
  if (this.gameOver) { // Vérifie si le jeu est terminé
      return; // Si le jeu est terminé, sort de la fonction pour ne pas exécuter le reste
  }
  
  let vitesse = 160; // Définit la vitesse de déplacement par défaut
  if (this.inverserTouches) { // Vérifie si les touches doivent être inversées
      vitesse = -160; // Inversion des touches, la vitesse devient négative
  }
  
  // Gestion des mouvements à gauche
  if (this.clavier.left.isDown) { // Vérifie si la touche gauche est enfoncée
      this.player.setVelocityX(-vitesse); // Applique la vitesse négative pour aller à gauche
      this.player.anims.play("anim_tourne_gauche", true); // Joue l'animation de rotation à gauche
  } 
  // Gestion des mouvements à droite
  else if (this.clavier.right.isDown) { // Vérifie si la touche droite est enfoncée
      this.player.setVelocityX(vitesse); // Applique la vitesse pour aller à droite
      this.player.anims.play("anim_tourne_droite", true); // Joue l'animation de rotation à droite
  } 
  // Si aucune touche de direction n'est enfoncée
  else {
      this.player.setVelocityX(0); // Arrête le mouvement horizontal
      this.player.anims.play("anim_face"); // Joue l'animation de face
  }

  // Gestion du saut - UNIQUEMENT si la touche vient d'être pressée une seule fois
  if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.body.blocked.down) { // Vérifie si la touche "haut" est pressée et si le joueur est au sol
      this.player.setVelocityY(-500); // Applique une force vers le haut pour le saut
      this.player.anims.play("anim_saut"); // Joue l'animation de saut
  }

  // Vérifie si le joueur est tombé en dehors de l'écran
  if (this.player.y >= this.cameras.main.height && !this.deathMessage) { // Si le joueur est en dessous de la hauteur de la caméra et qu'aucun message de mort n'est affiché
      // Afficher le message de mort s'il n'existe pas déjà
      this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', { // Crée un message de mort à la position (400, 300)
          font: '32px Georgia', // Définit la police et la taille du texte
          fill: '#fff', // Définit la couleur du texte en blanc
      }).setOrigin(0.5).setScrollFactor(0); // Centre le texte et le fixe à la caméra

      // Désactiver le corps physique du joueur
      this.player.setVelocity(0, 0); // Arrête le mouvement du joueur
      this.player.body.enable = false; // Désactive le corps physique du joueur pour éviter d'autres interactions

      // Redémarrer la scène après 500 ms
      this.time.delayedCall(2000, () => { // Appelle la fonction après 2000 ms (2 secondes)
          this.scene.restart(); // Réinitialise complètement la scène
      });
      
      // Si un message est affiché, le positionner au-dessus du joueur
      if (this.message) { // Vérifie si un message existe
          this.message.setPosition(this.player.x, this.player.y - 100); // Suit le joueur en restant au-dessus
      }
  }
}
}