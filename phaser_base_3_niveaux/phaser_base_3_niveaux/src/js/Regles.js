// src/js/Regles.js
export default class Regles extends Phaser.Scene {
    constructor() {
        super({ key: 'Regles' }); // Initialisation de la scène avec un identifiant
    }

    preload() {
        // Charger les images ou autres ressources nécessaires pour la scène des règles
        this.load.image("exitButton", "src/assets/Exit.png"); // Bouton pour quitter les règles
        this.load.image("background1", "src/assets/fond_regle.png"); // Image de fond pour la scène des règles
    }

    create() {
        // Ajouter l'image de fond centrée pour une scène de 400x300
        this.add.image(400, 300, 'background1'); 

        // Ajouter le titre des règles
        this.add.text(400, 50, 'Règles du Jeu', { fontSize: '35px', fill: '#fa0a16' }).setOrigin(0.5);

        // Ajouter les règles du jeu, en les centrant et en les espaçant
        this.add.text(50, 150, '1. Niveau 1 : atteignez un score de 150 et\névitez les bouteilles d\'alcool pour\nrester sobre!', { fontSize: '29px', fill: '#8B0000' });
        this.add.text(50, 250, '2. Niveau 2 : Trouve Bob qui s\'est perdu\naprès une soirée trop arrosée \nAttention! évite les pintes sur ton chemin\nsinon les touches s\'inversent \net tout devient flou.', { fontSize: '29px', fill: '#8B0000' });
        this.add.text(50, 400, '3. Niveau 3 : Clique sur la pinte\ncorrespondant à la bonne réponse.', { fontSize: '29px', fill: '#8B0000' });

        // Bouton pour revenir au menu
        const exitButton = this.add.image(400, 500, "exitButton").setInteractive(); // Rendre le bouton interactif
        exitButton.on('pointerup', () => {
            this.scene.start("menu"); // Retour au menu lorsque le bouton est cliqué
        });

        // Ajouter un effet de survol pour le bouton exit
        exitButton.on('pointerover', () => {
            exitButton.setScale(1.1); // Agrandir légèrement l'image lors du survol
        });
  
        exitButton.on('pointerout', () => {
            exitButton.setScale(1); // Rétablir la taille normale lorsque le curseur sort du bouton
        });
    }
}