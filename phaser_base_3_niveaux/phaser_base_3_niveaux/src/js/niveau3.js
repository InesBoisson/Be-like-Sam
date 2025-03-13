var groupe_bieres;
export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
    this.score = 0; // Initialisation du score à 0
  }

  preload() {
// chargement tuiles de jeu
this.load.image("tavern-decoNEW", "src/assets/tavern-decoNEW.png");
this.load.image("tavern-furnitureNEW", "src/assets/tavern-furnitureNEW.png");
this.load.image("TopDownHouse_FloorsAndWallsNEW", "src/assets/TopDownHouse_FloorsAndWallsNEW.png");
// chargement de la carte
this.load.tilemapTiledJSON("carte", "src/assets/jeu_N3.json");
this.add.image(800, 600, "carte").setDepth(0); 
//chargement image biere
this.load.image("img_bieres", "src/assets/alcohol_bottle.png");
this.load.spritesheet("img_perso", "src/assets/dude.png", {
  frameWidth: 32,
  frameHeight: 48
}); 
}

// Fonction pour afficher le message de fin de jeu
afficherMessageFinDeJeu() {
  // Crée un texte avec un message de félicitations
  const messageFin = this.add.text(400, 230, `Bravo, vous avez fini le jeu !\n N'oubliez pas, Sam c'est celui qui conduit \n et celui qui ne boit pas !\nVotre score final est: ${this.score}`, {
    font: "20px Arial",
    fill: "#000000"
  }).setOrigin(0.5, 0.5);
// Attendre 3 secondes, puis revenir au menu
this.time.delayedCall(5000, () => {
  this.scene.start('menu'); // Remplace 'MenuScene' par le nom réel de ta scène de menu
});
} o

// Fonction pour afficher la question 3
afficherQuestion3() {
  // Masquer la question 2 et ses éléments (si ce n'est pas déjà fait)
  this.text_q2.setVisible(false);
  this.elementsQuestion2.forEach(element => element.setVisible(false));

  // Afficher la question 3 et ses éléments
  this.text_q3.setVisible(true);
  this.elementsQuestion3.forEach(element => element.setVisible(true));
}

// Fonction appelée lorsqu'on répond à la question 3
repondreQuestion3(biere) {
  console.log("Réponse sélectionnée question 3:", biere.reponse);
let message = "";
  if (biere.reponse === "1800 personnes") {
    this.score += 20;
    message = "✅ Bonne réponse ! Bien joué !";
  } else {
    this.score -= 10;
    message = "❌ Mauvaise réponse... Essaie encore !";
  }
// Mettre à jour l'affichage du score
this.scoreText.setText('Score: ' + this.score);
const messageText = this.add.text(400, 350, message, {
  font: "18px Arial",
  fill: "#ff0000"
}).setOrigin(0.5, 0.5);
this.input.enabled = false;
this.time.delayedCall(1000, () => {
  messageText.destroy();
  this.afficherMessageFinDeJeu();
  this.input.enabled = true;
});
  // Masquer ou détruire les éléments de la question 3
  this.elementsQuestion3.forEach(element => element.setVisible(false)); // Masque les réponses de la question 3
  this.text_q3.setVisible(false); // Masque le texte de la question 3

  // Afficher le message de fin de jeu
  this.afficherMessageFinDeJeu();
}


// Fonction pour passer à la question suivante
afficherQuestion2() {
  // Masquer ou détruire les éléments de la question 1
  this.elementsQuestion1.forEach(element => element.setVisible(false)); // Rend invisible les éléments de la question 1

  // Affiche la question 2
  this.text_q2.setVisible(true);
  
  // Affiche les réponses de la question 2
  this.elementsQuestion2.forEach(element => element.setVisible(true));
}

// Fonction appelée lorsqu'on répond à la question 2
repondreQuestion2(biere) {
  console.log("Réponse sélectionnée question 2:", biere.reponse);
let message = "";
  if (biere.reponse === "0,2g/L") {
    this.score += 20;
    message = "✅ Bonne réponse ! Bien joué !";
  } else {
    this.score -= 10;
    message = "❌ Mauvaise réponse... Essaie encore !";
  }
// Mettre à jour l'affichage du score
this.scoreText.setText('Score: ' + this.score);
const messageText = this.add.text(400, 350, message, {
  font: "18px Arial",
  fill: "#ff0000"
}).setOrigin(0.5, 0.5);
this.input.enabled = false;
this.time.delayedCall(1000, () => {
  messageText.destroy();
  this.afficherQuestion3();
  this.input.enabled = true;
});
  // Masquer ou détruire les éléments de la question 2
  this.elementsQuestion2.forEach(element => element.setVisible(false)); // Masque les réponses de la question 2
  this.text_q2.setVisible(false); // Masque le texte de la question 2

  // Afficher la question 3
  this.afficherQuestion3();
}


// Fonction appelée lorsqu'on répond à la question 1
repondreQuestion1(biere) {
  console.log("Réponse sélectionnée question 1:", biere.reponse);
let message = "";
  if (biere.reponse === "0.5g/L") {
    this.score += 20; // Bonne réponse
    message = "✅ Bonne réponse ! Bien joué !";
  } else {
    this.score -= 10; // Mauvaise réponse
    message = "❌ Mauvaise réponse... Essaie encore !";
  }

// Mettre à jour l'affichage du score
this.scoreText.setText('Score: ' + this.score);
 // Afficher le message temporaire
 const messageText = this.add.text(400, 350, message, {
  font: "18px Arial",
  fill: "#ff0000"
}).setOrigin(0.5, 0.5);

  // Désactiver les interactions pour éviter de cliquer plusieurs fois
  this.input.enabled = false;
  // Supprimer le message après 1.5 secondes et passer à la prochaine question
  this.time.delayedCall(1000, () => {
    messageText.destroy(); // Efface le message
    this.afficherQuestion2(); // Affiche la prochaine question
    this.input.enabled = true; // Réactive les interactions
  });
  // Masquer ou détruire les éléments de la question 1
  this.elementsQuestion1.forEach(element => element.setVisible(false)); // Rend invisible les éléments de la question 1

  // Masquer le texte de la question 1 aussi
  this.text_q1.setVisible(false);

  // Affiche la question 2
  if (!this.question1Repondue) {
    this.question1Repondue = true;

    // Affiche la question 2 et ses éléments
    this.text_q2.setVisible(true);
    this.elementsQuestion2.forEach((element) => element.setVisible(true));
  }
}


create() {
  // Chargement de la carte
  const carteDuNiveau = this.make.tilemap({ key: "carte" });

  // Chargement des jeux de tuiles
  const tileset1 = carteDuNiveau.addTilesetImage("tavern-decoNEW", "tavern-decoNEW");
  const tileset2 = carteDuNiveau.addTilesetImage("tavern-furnitureNEW", "tavern-furnitureNEW");
  const tileset3 = carteDuNiveau.addTilesetImage("TopDownHouse_FloorsAndWallsNEW", "TopDownHouse_FloorsAndWallsNEW");

  // chargement des calques
  const BG = carteDuNiveau.createLayer("BG", [tileset1, tileset2, tileset3]);
  const FG = carteDuNiveau.createLayer("FG", [tileset1, tileset2, tileset3]);
  const FG1 = carteDuNiveau.createLayer("FG1", [tileset1, tileset2, tileset3]);

  // Définition des collisions
  BG.setCollisionByProperty({ estSolide: true });
  
  // Affichage du score
  this.scoreText = this.add.text(32, 32, 'Score: 0', {
    font: '32px Arial',
    fill: '#fff'
  });

  // Animations du personnage
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

  // Ajout du joueur
  this.player = this.physics.add.sprite(800, 200, "img_perso");
  this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
  this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
  this.cameras.main.startFollow(this.player);
  this.player.setDepth(10);
  this.physics.add.collider(this.player, BG);
  this.player.refreshBody();
  this.player.setBounce(0.2);
  this.player.setCollideWorldBounds(true);
  this.clavier = this.input.keyboard.createCursorKeys();

  // Groupe des bières
  groupe_bieres = this.physics.add.staticGroup();
  this.elementsQuestion1 = [];
  this.elementsQuestion2 = [];
  this.elementsQuestion3 = [];

  this.text_q1 = this.add.text(400, 200, "1 : À partir de combien de grammes on ne peut plus conduire ?", {
    font: "16px Arial",
    fill: "#000000"
  }).setOrigin(0.5, 0.5);
  this.elementsQuestion1.push(this.text_q1);
  const reponses1 = [
    { x: 220, y: 300, texte: "0.8g/L" },
    { x: 400, y: 300, texte: "0.5g/L" },
    { x: 600, y: 300, texte: "10g/L" }
  ];
  reponses1.forEach((reponse) => {
    let biere = groupe_bieres.create(reponse.x, reponse.y, "img_bieres");
    biere.reponse = reponse.texte;
    let texte = this.add.text(reponse.x, reponse.y + 30, reponse.texte, { font: "16px Arial", fill: "#000000" }).setOrigin(0.5, 0.5);
    this.elementsQuestion1.push(biere, texte);
    biere.setInteractive();
    biere.on("pointerdown", () => this.repondreQuestion1(biere), this); // Appeler la fonction avec l'argument
  });
  
  // Question 2 : Configuration des réponses
this.text_q2 = this.add.text(400, 200, "2 : Combien de grammes d'alcool contient un verre standard ?", {
  font: "16px Arial",
  fill: "#000000"
}).setOrigin(0.5, 0.5);

this.text_q2.setVisible(false);
const reponses2 = [
  { x: 220, y: 300, texte: "0,2g/L" },
  { x: 400, y: 300, texte: "0,4g/L" },
  { x: 600, y: 300, texte: "0,8g/L" }
];
reponses2.forEach((reponse) => {
  let biere = groupe_bieres.create(reponse.x, reponse.y, "img_bieres");
  biere.reponse = reponse.texte;
  let texte = this.add.text(reponse.x, reponse.y + 30, reponse.texte, { font: "16px Arial", fill: "#000000" }).setOrigin(0.5, 0.5);
  this.elementsQuestion2.push(biere, texte);
  // Rendre la bière interactive
  biere.setInteractive();
  biere.on("pointerdown", () => this.repondreQuestion2(biere), this); // Associe la fonction à l'événement
  biere.setVisible(false);
  texte.setVisible(false);
});

  this.text_q3 = this.add.text(400, 200, "3 : Combien de personnes sont décédées en 2024 sur \n les routes en raison d'accidents impliquant l'alcool ?", {
    font: "16px Arial",
    fill: "#000000"
  }).setOrigin(0.5, 0.5);
  this.text_q3.setVisible(false);
  const reponses3 = [
    { x: 220, y: 300, texte: "1000 personnes" },
    { x: 400, y: 300, texte: "1500 personnes" },
    { x: 600, y: 300, texte: "1800 personnes" }
  ];
  reponses3.forEach((reponse) => {
    let biere = groupe_bieres.create(reponse.x, reponse.y, "img_bieres");
    biere.reponse = reponse.texte;
    let texte = this.add.text(reponse.x, reponse.y + 30, reponse.texte, { font: "16px Arial", fill: "#000000" }).setOrigin(0.5, 0.5);
    this.elementsQuestion3.push(biere, texte);
    biere.setVisible(false);
    texte.setVisible(false);
    
    biere.setInteractive();
    biere.on("pointerdown", () => this.repondreQuestion3(biere), this); // Appelle la fonction de réponse pour la question 3
  });  

  groupe_bieres.children.iterate((biere) => {
    biere.setInteractive();

    biere.on('pointerover', () => {
        biere.setScale(1.5); // Agrandit quand on passe la souris dessus
    });

    biere.on('pointerout', () => {
        biere.setScale(1); // Revient à la taille normale
    });
});
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
    // Saut uniquement si le personnage est au sol
    if (this.clavier.up.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.setVelocityY(-400); // Augmenté pour un meilleur saut
  }
    
      }
    }
