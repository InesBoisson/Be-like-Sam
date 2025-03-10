// src/js/Regles.js
export default class Regles extends Phaser.Scene {
    constructor() {
        super({ key: 'Regles' });
    }

    preload() {
        // Charger les images ou autres ressources nécessaires pour la scène des règles
        this.load.image('background', 'assets/sky.png'); // Assurez-vous que l'image de fond est chargée
    }

    create() {
        this.add.image(400, 300, 'background'); // Fond centré pour une scène de 400x300

        // Ajouter le titre des règles
        this.add.text(400, 50, 'Règles du Jeu', { fontSize: '35px', fill: '#ffffff' }).setOrigin(0.5);

        // Ajouter les règles, en les centrant et en les espaçant
        this.add.text(50, 100, '1. Niveau 1 : évitez les bouteilles d\'alcool\npour rester sobre!', { fontSize: '27px', fill: '#ffffff' });
        this.add.text(50, 200, '2. Niveau 2 : Trouve Bob qui a abusé de la\nboisson et s\'est perdu dans MTP.', { fontSize: '27px', fill: '#ffffff' });
        this.add.text(50, 300, '3. Niveau 3 : Choisis le verre\ncorrespondant à la bonne réponse.', { fontSize: '27px', fill: '#ffffff' });

    
        // Bouton pour revenir au menu
        const backButton = this.add.text(300, 450, 'Retour au Menu', { fontSize: '30px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('menu'); // Retourner à la scène de menu
            });
    }
}