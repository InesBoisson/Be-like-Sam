// src/js/Dialogue.js

class Dialogue extends Phaser.Scene {
    constructor() {
        super({ key: 'Dialogue' });
    }

    preload() {
        this.load.image('personnage1', 'src/assets/door1.png');
        this.load.image('personnage2', 'src/assets/door2.png');
        this.load.image('bulle', 'src/assets/bulle.png');
        this.load.image("background4", "src/assets/sky.png");
        console.log("🔍 Chargement des assets...");
        this.load.on("complete", () => {
            console.log("✅ Tous les assets sont chargés !");
        });
    }

    create() {
        // Ajouter le fond
        this.add.image(400, 300, 'background4');

        // Ajouter les personnages
        this.personnage1 = this.add.sprite(200, 450, 'personnage1');
        this.personnage2 = this.add.sprite(600, 450, 'personnage2');

        // Ajouter et agrandir les bulles de dialogue
        this.bulle1 = this.add.image(200, 200, 'bulle').setOrigin(0.5, 0).setScale(3.5);
        this.bulle2 = this.add.image(600, 200, 'bulle').setOrigin(0.5, 0).setScale(3.5);

        // Ajouter le texte de dialogue
        this.dialogueText1 = this.add.text(100, 250, '', {
            font: '24px Arial',
            fill: '#000000'
        });
        this.dialogueText2 = this.add.text(450, 250, '', {
            font: '24px Arial',
            fill: '#000000'
        });

        

        // Phrases de dialogue
        this.dialogueLines = [
            { character: 1, text: 'Bonjour ! Comment ça va ?' },
            { character: 2, text: 'Ça va bien, merci ! Et toi ?' },
            { character: 1, text: 'Je suis content de l’entendre.' },
            { character: 2, text: 'Merci ! Quoi de neuf ?' },
            { character: 1, text: 'Pas grand-chose, juste en train de profiter de la journée.' },
            { character: 2, text: 'C’est super !' }
        ];

        this.currentLineIndex = 0; // Index de la ligne de dialogue actuelle

        // Afficher la première ligne de dialogue
        this.displayDialogue();

        // Gestion de l'interaction pour changer le texte
        this.input.on('pointerdown', () => {
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