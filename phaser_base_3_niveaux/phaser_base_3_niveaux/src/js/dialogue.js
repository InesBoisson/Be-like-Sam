// src/js/Dialogue.js

class Dialogue extends Phaser.Scene {
    constructor() {
        super({ key: 'Dialogue' });
    }

    preload() {
        // chargement de la carte
        // Charger les images des tilesets
        this.load.image("3e4aa70777418d958610a424634bc2e5", "src/assets/3e4aa70777418d958610a424634bc2e5.png"); // Assurez-vous que l'extension est correcte
        this.load.image("interiors_demoNew", "src/assets/interiors_demoNew.png");
        this.load.image("alcohol_bottle1", "src/assets/alcohol_bottle1.png"); // Assurez-vous que ce fichier existe

        // Charger la carte
        this.load.tilemapTiledJSON("CoffeeShop", "src/assets/CoffeeShop.json");
        this.load.spritesheet("personnage1", "src/assets/perso1.png", {
            frameWidth: 75,
            frameHeight: 110
        });
        this.load.spritesheet("personnage2", "src/assets/perso2.png", {
            frameWidth: 75,
            frameHeight: 110
        });
        this.load.image('bulle', 'src/assets/bulle.png');
        this.load.image('bulle2', 'src/assets/bulle2.png');
        this.load.image("bouton_n2", "src/assets/porten2.png"); // Bouton de passage au n2
    }

    create() {
        const carteDuNiveau = this.add.tilemap("CoffeeShop");

        
        // Chargement des tilesets (VÉRIFIE bien les noms avec Tiled)
        const tilesetFond = carteDuNiveau.addTilesetImage("3e4aa70777418d958610a424634bc2e5", "3e4aa70777418d958610a424634bc2e5");
        const tilesetObjets = carteDuNiveau.addTilesetImage("interiors_demoNew", "interiors_demoNew");
        const tilesPinte = carteDuNiveau.addTilesetImage("alcohol_bottle1", "alcohol_bottle1");

        // Chargement des calques (VÉRIFIE les noms des calques dans Tiled)
        const Bar = carteDuNiveau.createLayer("Bar", [tilesetFond, tilesetObjets]);
        const Pinte = carteDuNiveau.createLayer("Pinte", tilesPinte);


        Bar.setCollisionByProperty({ estSolide: true });


        // Ajouter les personnages
        // Créer le personnage
        this.personnage1 = this.physics.add.sprite(100, 350, 'personnage1');
        this.personnage1.setBounce(0.2);
        this.personnage1.setCollideWorldBounds(true); // Empêche le joueur de sortir de l'écran

        this.personnage2 = this.physics.add.sprite(650, 350, 'personnage2');
        this.personnage2.setBounce(0.2);
        this.personnage2.setCollideWorldBounds(true); // Empêche le joueur de sortir de l'écran

        this.physics.add.collider(this.personnage1, Bar);
        this.physics.add.collider(this.personnage2, Bar);


        // Ajouter et agrandir les bulles de dialogue
        this.bulle1 = this.add.image(200, 200, 'bulle').setOrigin(0.5, 0).setScale(3.6);
        this.bulle2 = this.add.image(600, 200, 'bulle2').setOrigin(0.5, 0).setScale(3.6);

        // Gérer les touches du clavier
        this.cursors = this.input.keyboard.createCursorKeys();



        // Ajouter le texte de dialogue
        this.dialogueText1 = this.add.text(100, 250, '', {
            font: '24px Arial',
            fill: '#000000'
        });
        this.dialogueText2 = this.add.text(500, 250, '', {
            font: '24px Arial',
            fill: '#000000'
        });

        // Bouton pour commencer le jeu

        const bouton_n2 = this.add.image(400, 400, "bouton_n2").setInteractive().setScale(0.4); // Rendre le bouton interactif
        bouton_n2.on('pointerup', () => {
            this.scene.start("niveau2"); // Démarrer la scène niveau2
        });




        // Phrases de dialogue
        this.dialogueLines = [
            { character: 1, text: 'Allez, je rentre, \nj\'ai juste bu deux \nverres, c\'est rien !' },
            { character: 2, text: 'Tu sais qu\'à partir \nde 0,5 g/L d\'alcool \ndans le sang, c\'est \ninterdit de conduire ?' },
            { character: 1, text: 'Oui, mais deux \nverres, ça va…' },
            { character: 2, text: 'Ça dépend ! \nUn verre standard, \nc\'est environ 0,2 g/L' },
            { character: 1, text: 'Ok, la prochaine \nfois je prendrais \nun Sam !' },
            { character: 2, text: 'Clique sur \nla porte pour \naller chercher Bob!' },
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
         // Ajouter un effet de survol pour le bouton niv 2
         bouton_n2.on('pointerover', () => {
            bouton_n2.setScale(0.6); // Agrandir légèrement l'image
        });

        bouton_n2.on('pointerout', () => {
            bouton_n2.setScale(0.4); // Rétablir la taille normale
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