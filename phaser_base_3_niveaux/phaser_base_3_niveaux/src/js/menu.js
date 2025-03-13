// src/js/menu.js
import Regles from './Regles.js'; // Assurez-vous d'importer la classe Regles

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" }); // Initialise la scène avec la clé "menu"
  }

  preload() {
    // Charger les images nécessaires pour le menu
    this.load.image("background", "src/assets/fond_menu.png"); // Chargement de l'image de fond d'écran
    this.load.image("startButton", "src/assets/play.png"); // Chargement de l'image du bouton de démarrage
    this.load.image("star", "src/assets/regles.png"); // Chargement de l'image de l'étoile pour le bouton des règles
  }

  create() {
    // Ajouter un fond d'écran à la scène
    this.add.image(400, 300, "background"); // Positionne le fond au centre de la scène (400, 300)

    // Bouton pour commencer le jeu
    const startButton = this.add.image(400, 400, "startButton").setInteractive(); // Crée le bouton de démarrage et le rend interactif
    startButton.on('pointerup', () => {
      this.scene.start("niveau1"); // Démarre la scène "niveau1" lorsque le bouton est cliqué
    });

    // Ajouter l'image de l'étoile comme bouton pour voir les règles
    const rulesButton = this.add.image(400, 500, "star").setInteractive(); // Crée le bouton des règles et le rend interactif
    rulesButton.on('pointerup', () => {
      this.scene.start('Regles'); // Navigue vers la scène des règles lorsque le bouton est cliqué
    });

    // Ajouter un effet de survol pour le bouton des règles
    rulesButton.on('pointerover', () => {
      rulesButton.setScale(1.1); // Agrandit légèrement l'image lorsque la souris passe dessus
    });

    rulesButton.on('pointerout', () => {
      rulesButton.setScale(1); // Rétablit la taille normale lorsque la souris quitte le bouton
    });

    // Ajouter un effet de survol pour le bouton de démarrage
    startButton.on('pointerover', () => {
      startButton.setScale(1.1); // Agrandit légèrement l'image lorsque la souris passe dessus
    });

    startButton.on('pointerout', () => {
      startButton.setScale(1); // Rétablit la taille normale lorsque la souris quitte le bouton
    });
  }
}