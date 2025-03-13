// src/js/menu.js
import Regles from './Regles.js'; // Assurez-vous d'importer la classe Regles

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    // Charger les images nécessaires
    this.load.image("background", "src/assets/fond_menu.png"); // Fond d'écran
    this.load.image("startButton", "src/assets/play.png"); // Bouton de démarrage
    this.load.image("star", "src/assets/regles.png"); // Bouton regles
  }

  create() {
    // Ajouter un fond d'écran
    this.add.image(400, 300, "background"); // Positionner le fond au centre


    // Bouton pour commencer le jeu
    const startButton = this.add.image(400, 400, "startButton").setInteractive(); // Rendre le bouton interactif
    startButton.on('pointerup', () => {
      this.scene.start("niveau3"); // Démarrer la scène niveau1
    });

    // Ajouter l'image de l'étoile comme bouton pour voir les règles
    const rulesButton = this.add.image(400, 500, "star").setInteractive(); // Rendre l'image de l'étoile interactive
    rulesButton.on('pointerup', () => {
      this.scene.start('Regles'); // Naviguer vers la scène des règles
    });

    // Ajouter un effet de survol pour le bouton regles
    rulesButton.on('pointerover', () => {
      rulesButton.setScale(1.1); // Agrandir légèrement l'image
    });

    rulesButton.on('pointerout', () => {
      rulesButton.setScale(1); // Rétablir la taille normale
    });

    // Ajouter un effet de survol pour le bouton start
    startButton.on('pointerover', () => {
      startButton.setScale(1.1); // Agrandir légèrement l'image
    });

    startButton.on('pointerout', () => {
      startButton.setScale(1); // Rétablir la taille normale
    });
  }
}