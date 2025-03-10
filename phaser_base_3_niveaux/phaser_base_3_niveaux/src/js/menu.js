// src/js/menu.js
export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    // Charger les images nécessaires
    this.load.image("background", "assets/sky.png"); // Fond d'écran
    this.load.image("startButton", "assets/start.png"); // Bouton de démarrage
  }

  create() {
    // Ajouter un fond d'écran
    this.add.image(400, 300, "background"); // Positionner le fond au centre

    // Ajouter un slogan
    this.add.text(400, 100, 'Bienvenue dans le Grand Aventure!', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);

    // Ajouter un objectif
    this.add.text(400, 200, 'Collectez des étoiles et évitez les obstacles!', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5);

    // Ajouter les règles du jeu
    this.add.text(400, 300, 'Règles:\n- Utilisez les flèches pour déplacer\n- Appuyez sur "Espace" pour sauter\n- Collectez toutes les étoiles!', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

    // Champ d'entrée pour le prénom
    this.add.text(400, 400, 'Entrez votre prénom:', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
    this.nameInput = this.add.dom(400, 430).createElement('input'); // Créer un champ d'entrée
    this.nameInput.setAttribute('placeholder', 'Votre prénom'); // Placeholder

    // Bouton pour commencer le jeu
    const startButton = this.add.image(400, 500, "startButton").setInteractive(); // Rendre le bouton interactif
    startButton.on('pointerup', () => {
      const playerName = this.nameInput.value; // Récupérer le prénom
      console.log('Le joueur a entré: ' + playerName); // Afficher le prénom dans la console
      this.scene.start("niveau1"); // Démarrer la scène niveau1
    });
  }
}