// chargement des librairies
import menu from "/src/js/menu.js"; // Importer la classe Menu pour la scène du menu principal
import Regles from "/src/js/Regles.js"; // Importer la classe Regles pour la scène des règles
import selection from "/src/js/selection.js"; // Importer la classe Selection pour la scène de sélection
import niveau1 from "/src/js/niveau1.js"; // Importer la classe Niveau1 pour la première scène de jeu
import niveau2 from "/src/js/niveau2.js"; // Importer la classe Niveau2 pour la deuxième scène de jeu
import niveau3 from "/src/js/niveau3.js"; // Importer la classe Niveau3 pour la troisième scène de jeu
import Dialogue from "/src/js/Dialogue.js"; // Importer la classe Dialogue pour la scène de dialogue

// Variable globale pour stocker le score
window.globalScore = 0;

// Configuration générale du jeu
const config = {
  type: Phaser.AUTO, // Type de rendu (AUTO choisit WebGL ou Canvas selon la compatibilité)
  width: 800, // Largeur de la scène en pixels
  height: 600, // Hauteur de la scène en pixels
  scale: {
    mode: Phaser.Scale.FIT, // Mode d'échelle pour adapter la scène à la taille de l'écran
    autoCenter: Phaser.Scale.CENTER_BOTH // Centre la scène horizontalement et verticalement
  },
  physics: {
    // Définition des paramètres physiques
    default: "arcade", // Utilisation du moteur physique arcade
    arcade: {
      // Paramètres spécifiques au mode arcade
      gravity: {
        y: 800 // Gravité verticale : accélération des corps en pixels par seconde
      },
      debug: false // Si true, affiche les hitboxes et les vecteurs d'accélération pour le débogage
    }
  },
  scene: [menu, Regles, selection, niveau1, niveau2, niveau3, Dialogue] // Liste des scènes à charger
};

// Création et lancement du jeu
const game = new Phaser.Game(config); // Crée une nouvelle instance de Phaser.Game avec la configuration
game.scene.start("menu"); // Démarre la scène du menu