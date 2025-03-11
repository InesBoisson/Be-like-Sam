// src/js/dialogue.js
export default class dialogue extends Phaser.Scene {
    constructor() {
        super({ key: 'dialogue' });
    }

    preload() {
        // Load character images and any other assets
        this.load.image('character1', 'src/assets/dude.png'); // Replace with your character image path
        this.load.image('character2', 'src/assets/dude.png'); // Replace with your character image path
    }

    create() {
        // Create dudes
        const dude1 = this.add.image(100, 300, 'character1');
        const dude2 = this.add.image(400, 300, 'character2');

        // Create speech bubbles
        const bubble1 = this.add.graphics();
        const bubble2 = this.add.graphics();

        // Draw speech bubbles
        this.drawBubble(bubble1, 50, 200);
        this.drawBubble(bubble2, 350, 200);

        // Dialogue lines
        this.dialogueLines = [
            "Character 1: Hello! How are you?",
            "Character 2: I am fine, thank you!",
            "Character 1: What are you doing here?",
            "Character 2: Just passing by!",
            "Character 1: See you later!"
        ];

        this.currentDialogueIndex = 0;

        // Add text to speech bubbles
        this.dialogueText = this.add.text(60, 180, this.dialogueLines[this.currentDialogueIndex], { fontSize: '16px', fill: '#000' });

        // Input to proceed with dialogue
        this.input.keyboard.on('keydown-SPACE', this.nextDialogue, this);
    }

    drawBubble(graphics, x, y) {
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRoundedRect(x, y, 200, 100, 10);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRoundedRect(x, y, 200, 100, 10);
    }

    nextDialogue() {
        this.currentDialogueIndex++;

        if (this.currentDialogueIndex < this.dialogueLines.length) {
            this.dialogueText.setText(this.dialogueLines[this.currentDialogueIndex]);
        } else {
            this.endDialogue();
        }
    }

    endDialogue() {
        // Logic to transition to the next scene or end the dialogue
        this.scene.start('menu'); // Replace 'NextScene' with the actual scene you want to transition to
    }

    update() {
        // Update logic for dialogue flow can be added here
    }
}

// Example of how to add this scene to your game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: dialogue,
};

const game = new Phaser.Game(config);