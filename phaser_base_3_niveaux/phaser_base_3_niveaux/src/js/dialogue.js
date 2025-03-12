// src/js/Dialogue.js

class Dialogue extends Phaser.Scene {
    constructor() {
        super({ key: 'Dialogue' });
    }

    preload() {
        this.load.image('personnage1', 'src/assets/door1.png');
        this.load.image('personnage2', 'src/assets/door2.png');
        this.load.image('bulle', 'src/assets/bulle.png');
        this.load.image('bulle2', 'src/assets/bulle2.png');
        this.load.image("background4", "src/assets/sky.png");
        console.log("🔍 Chargement des assets...");
    }

    create() {
        // Ajouter le fond
        this.add.image(400, 300, 'background4');

        // Ajouter les personnages
        this.personnage1 = this.add.sprite(200, 450, 'personnage1');
        this.personnage2 = this.add.sprite(600, 450, 'personnage2');

        // Ajouter et agrandir les bulles de dialogue
        this.bulle1 = this.add.image(200, 200, 'bulle').setOrigin(0.5, 0).setScale(3.6);
        this.bulle2 = this.add.image(600, 200, 'bulle2').setOrigin(0.5, 0).setScale(3.6);

        // Ajouter le texte de dialogue
        this.dialogueText1 = this.add.text(100, 250, '', {
            font: '24px Arial',
            fill: '#000000'
        });
        this.dialogueText2 = this.add.text(500, 250, '', {
            font: '24px Arial',
            fill: '#000000'
        });

        

        // Phrases de dialogue
        this.dialogueLines = [
            { character: 1, text: 'Allez, je rentre, \nj\'ai juste bu deux \nverres, c\'est rien !' },
            { character: 2, text: 'Tu sais qu\'à partir \nde 0,5 g/L d\'alcool \ndans le sang, c\'est \ninterdit de conduire ?' },
            { character: 1, text: 'Oui, mais deux \nverres, ça va…' },
            { character: 2, text: 'Ça dépend ! \nUn verre standard, \nc\'est environ 0,2 g/L' },
            { character: 1, text: 'Ok, la prochaine \nfois je prendrais \nun Sam !' },
            { character: 2, text: 'Passe par \nla porte pour \naller chercher Bob!' },
        ];

        this.currentLineIndex = 0; // Index de la ligne de dialogue actuelle

        // Afficher la première ligne de dialogue
        this.displayDialogue();

        // Gestion de l'interaction pour changer le texte avec la touche Espace
        this.input.keyboard.on('keydown-SPACE', () => {
            this.currentLineIndex++;
            if (this.currentLineIndex < this.dialogueLines.length) {
                this.displayDialogue();
            } else {
                this.dialogueText1.setText(''); // Effacer le texte à la fin
                this.dialogueText2.setText('');
            }
        });
    }

    displayDialogue() {
        const line = this.dialogueLines[this.currentLineIndex];
        if (line.character === 1) {
            this.dialogueText1.setText(line.text);
            this.dialogueText2.setText(''); // Effacer le texte du personnage 2
        } else {
            this.dialogueText2.setText(line.text);
            this.dialogueText1.setText(''); // Effacer le texte du personnage 1
        }
    }
}

export default Dialogue;