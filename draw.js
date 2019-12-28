'use strict';

(() => {
    window.tetris.Draw = class {

        constructor(canvas) {
            this.gameCanvas = canvas;
            this.context = canvas.getElement().getContext('2d');
            this.background = {
                color: {
                    light: '',
                    dark: ''
                }
            }
        }

        cleanCanvas() {
            this.context.fillStyle = "#303030";
            this.context.fillRect(0, 0, this.gameCanvas.getWidth(), this.gameCanvas.getHeight());
        }

        drawBackground() {
            const backgroundImage = new Image();

            backgroundImage.onload = () => {
                this.context.drawImage(backgroundImage, 0, 0);
            };

            backgroundImage.src = 'image/background.png';
        }

        drawBackground1() {
            const boxSize = window.tetris.options.box.size;
            const lightColor = window.tetris.options.platform.background.color.light;
            const darkColor = window.tetris.options.platform.background.color.dark;

            for (let y = 0; y < this.gameCanvas.getHeight(); y++) {
                for (let x = 0; x < this.gameCanvas.getWidth(); x++) {
                    if (x % 2 === 0) {
                        if (y % 2 === 0) {
                            this.context.fillStyle = lightColor;
                        } else {
                            this.context.fillStyle = darkColor;
                        }
                    } else {
                        if (y % 2 === 0) {
                            this.context.fillStyle = darkColor;
                        } else {
                            this.context.fillStyle = lightColor;
                        }
                    }
                    this.context.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
                }
            }
        }

        drawBox(box) {
            const boxSize = window.tetris.options.box.size;

            const x = box.getX();
            const y = box.getY();

            this.context.fillStyle = box.getLightColor();
            this.context.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);

            this.context.fillStyle = box.getDarkColor();
            this.context.beginPath();
            this.context.moveTo(x * boxSize, y * boxSize);
            this.context.lineTo(x * boxSize + boxSize / 2, y * boxSize + boxSize / 2);
            this.context.lineTo(x * boxSize + boxSize, y * boxSize);
            this.context.closePath();
            this.context.fill();

            this.context.beginPath();
            this.context.moveTo(x * boxSize, y * boxSize + boxSize);
            this.context.lineTo(x * boxSize + boxSize / 2, y * boxSize + boxSize / 2);
            this.context.lineTo(x * boxSize + boxSize, y * boxSize + boxSize);
            this.context.fill();

            this.context.beginPath();
            this.context.moveTo(x * boxSize, y * boxSize);
            this.context.lineTo(x * boxSize + boxSize, y * boxSize);
            this.context.lineTo(x * boxSize + boxSize, y * boxSize + boxSize);
            this.context.lineTo(x * boxSize, y * boxSize + boxSize);
            this.context.closePath();
            this.context.stroke();
        }
    }
})();