// src/js/Regles.js
export default class Regles extends Phaser.Scene {
    constructor() {
        super({ key: 'Regles' });
    }

    preload() {
        // Charger les images ou autres ressources nécessaires pour la scène des règles
        this.load.image("exitButton", "src/assets/Exit.png"); // Bouton de démarrage
        this.load.image("background1", "src/assets/fond_regle.png"); // Assurez-vous que l'image de fond est chargée
    }

    create() {
        this.add.image(400, 300, 'background1'); // Fond centré pour une scène de 400x300

        // Ajouter le titre des règles
        this.add.text(400, 50, 'Règles du Jeu', { fontSize: '35px', fill: '#fa0a16' }).setOrigin(0.5);

        // Ajouter les règles, en les centrant et en les espaçant
        this.add.text(50, 150, '1. Niveau 1 : évitez les bouteilles d\'alcool\npour rester sobre!', { fontSize: '27px', fill: '#fa0a16' });
        this.add.text(50, 250, '2. Niveau 2 : Trouve Bob qui a abusé de la\nboisson et s\'est perdu dans MTP.', { fontSize: '27px', fill: '#fa0a16' });
        this.add.text(50, 350, '3. Niveau 3 : Choisis le verre\ncorrespondant à la bonne réponse.', { fontSize: '27px', fill: '#fa0a16' });

    
     // Bouton pour revenir au menu
     const exitButton = this.add.image(400, 500, "exitButton").setInteractive();
     exitButton.on('pointerup', () => {
        this.scene.start("menu"); // Retour au menu 
        });
    }
}