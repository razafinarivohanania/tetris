'use strict';

(() => {
    window.tetris.Game = class {

        constructor() {
            this.fullBoxes = [];
            this.collision = new window.tetris.Collision(this.fullBoxes);
            const canvas = new window.tetris.Canvas();
            canvas.resize();

            this.draw = new window.tetris.Draw(canvas);
            this.draw.cleanCanvas();
            //this.draw.drawBackground();

            this.platform = {
                width: window.tetris.options.platform.box.count.horizontal,
                height: window.tetris.options.platform.box.count.vertical
            }
        }

        newGame() {

        }

        play() {
            this._initBoxes();
            this._handleEvents();
        }

        _addBoxes(boxes) {
            boxes.forEach(box => this.fullBoxes.push(box));
        }

        _animate(event) {
            const leftKey = 37;
            const rightKey = 39;
            const downKey = 40;
            const rKey = 82;

            switch (event.keyCode) {
                case leftKey:
                    if (!this.collision.isInCollision(this.boxes.getBoxes(), 'left')) {
                        this.boxes.moveLeft();
                    }
                    break;
                case rightKey:
                    if (!this.collision.isInCollision(this.boxes.getBoxes(), 'right')) {
                        this.boxes.moveRight();
                    }
                    break;
                case downKey:
                    this._moveDownBoxes();
                    break;
                case rKey:
                    this._rotateBoxes();
                    break;
            }

            this.draw.cleanCanvas();
            this.boxes.getBoxes().forEach(box => this.draw.drawBox(box));
            this.fullBoxes.forEach(box => this.draw.drawBox(box));

            if (!this._canBoxesMoveDown()) {
                this.boxes.getBoxes().forEach(box => this.fullBoxes.push(box.clone()));
                this._initBoxes();
                this._removeLinesWin();
            }
        }

        _handleEvents() {
            const body = document.getElementsByTagName('body')[0];
            const downKey = 40;

            body.onkeydown = event => this._animate(event);
            //setInterval(() => this._animate({ keyCode: downKey }), 500);
        }

        _removeLinesWin() {
            const countLines = new Map();

            this.fullBoxes.forEach(box => {
                const y = box.getY();
                if (!countLines.has(y)) {
                    countLines.set(y, 0);
                }

                countLines.set(y, countLines.get(y) + 1);
            });

            const removedLinesSet = new Set();
            countLines.forEach((count, y) => {
                if (count === this.platform.width) {
                    while (true) {
                        let boxFound = false;
                        for (let i = 0; i < this.fullBoxes.length; i++) {
                            if (this.fullBoxes[i].getY() === y) {
                                removedLinesSet.add(y);
                                boxFound = true;
                                window.tetris.ArrayUtils.removeItem(this.fullBoxes, i);
                            }
                        }

                        if (!boxFound) {
                            break;
                        }
                    }
                }
            });


            const removedLines = Array.from(removedLinesSet);
            removedLines.sort((line1, line2) => line2 - line1);

            removedLines.forEach(line => {
                this.fullBoxes.forEach(box => {
                    const y = box.getY();
                    if (y <= line) {
                        box.setY(y + 1);
                    }
                });
            });
        }

        _initBoxes() {
            this.boxes = this._generateRandomBoxes();
            this.boxes.moveCenterX();
            this.boxes.moveOverTopY();
        }

        _canBoxesMoveDown() {
            const currentY = this.boxes.getY();
            if (this._moveDownBoxes()) {
                this.boxes.setY(currentY);
                return true;
            }

            return false;
        }

        _moveDownBoxes() {
            if (!this.collision.isInCollision(this.boxes.getBoxes(), 'down')) {
                this.boxes.moveDown();
                return true;
            }

            return false;
        }

        _rotateBoxes() {
            const currentRotation = this.boxes.getRotation();
            const currentX = this.boxes.getX();
            const listX = [currentX, currentX + 1, currentX - 1, currentX + 2, currentX - 2];

            for (const x of listX) {
                this.boxes.setX(x);

                if (!this.collision.isInCollision(this.boxes.getBoxes())) {
                    this.boxes.rotate();

                    if (!this.collision.isInCollision(this.boxes.getBoxes())) {
                        return;
                    }
                }

                this.boxes.setX(currentX);
                this.boxes.setRotation(currentRotation);
            }
        }

        _generateRandomBoxes() {
            const type = window.tetris.ArrayUtils.getRandomItem(['plus', 'square', 'l', 'z', 'i']);
            const inverted = window.tetris.ArrayUtils.getRandomItem([true, false]);
            const rotation = window.tetris.ArrayUtils.getRandomItem([0, 1, 2, 3]);
            return (new window.tetris.Boxes(type, inverted)).setRotation(rotation);
        }
    }
})();