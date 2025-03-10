// src/js/menu.js
import Regles from './Regles.js'; // Assurez-vous d'importer la classe Regles

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    // Charger les images nécessaires
    this.load.image("background", "src/assets/sky.png"); // Fond d'écran
    this.load.image("startButton", "src/assets/start.png"); // Bouton de démarrage
    this.load.image("star", "src/assets/door1.png"); // Charger l'image de l'étoile
  }

  create() {
    // Ajouter un fond d'écran
    this.add.image(400, 300, "background"); // Positionner le fond au centre

    // Ajouter un slogan
    this.add.text(400, 100, 'Bienvenue dans le Grand Aventure!', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);

    // Ajouter un objectif
    this.add.text(400, 200, 'Collectez des étoiles et évitez les obstacles!', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5);

    // Bouton pour commencer le jeu
    const startButton = this.add.image(400, 400, "startButton").setInteractive(); // Rendre le bouton interactif
    startButton.on('pointerup', () => {
      this.scene.start("niveau1"); // Démarrer la scène niveau1
    });

    // Ajouter l'image de l'étoile comme bouton pour voir les règles
    const rulesButton = this.add.image(400, 500, "star").setInteractive(); // Rendre l'image de l'étoile interactive
    rulesButton.on('pointerup', () => {
      this.scene.start('Regles'); // Naviguer vers la scène des règles
    });

    // Ajouter un effet de survol pour le bouton
    rulesButton.on('pointerover', () => {
      rulesButton.setScale(1.1); // Agrandir légèrement l'image
    });

    rulesButton.on('pointerout', () => {
      rulesButton.setScale(1); // Rétablir la taille normale
    });
  }
}