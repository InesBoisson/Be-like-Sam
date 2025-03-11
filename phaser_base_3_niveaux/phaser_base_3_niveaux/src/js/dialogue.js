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
        this.player = this.physics.add.sprite(100, 450, 'personnage1');
        this.player = this.physics.add.sprite(100, 450, 'personnage2');
        this.bulle = this.add.image(400, 200, 'bulle');
        this.dialogueText = this.add.text(350, 180, 'Bonjour ! Comment ça va ?', {
            font: '24px Arial',
            fill: '#000'
        });

        this.input.on('pointerdown', () => {
            this.dialogueText.setText('Ça va bien, merci ! Et toi ?');
        });
    }
}