// src/js/Dialogue.js
console.log("✅ La scène Dialogue est bien chargée !");

class Dialogue extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Dialogue' });
    }

    preload() {
        this.load.image('personnage1', 'src/assets/door1.png');
        this.load.image('personnage2', 'src/assets/door2.png');
        this.load.image('bulle', 'src/assets/bulle.png');
        this.load.image("background4", "src/assets/sky.png"); 
    }

    create() {
        this.personnage1 = this.add.sprite(200, 450, 'personnage1');
        this.personnage2 = this.add.sprite(400, 450, 'personnage2');
        this.add.image(400, 300, 'background4');

        this.bulle = this.add.image(400, 200, 'bulle');
        this.dialogueText = this.add.text(350, 180, 'Bonjour ! Comment ça va ?', {
            font: '24px Arial',
            fill: '#ffffff'
        });

        this.input.on('pointerdown', () => {
            this.dialogueText.setText('Ça va bien, merci ! Et toi ?');
        });
    }
    
}
export default Dialogue;