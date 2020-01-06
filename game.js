'use strict';

(() => {
    window.tetris.Game = class {

        constructor() {
            this.gameInProgress = false;
            this.gamePaused = false;
            this.gameStatusList = { NO_GAME: 0, PAUSED: 1, GAME_OVER: 2 };
            this.options = this.getDefaultOptions();
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

        getDefaultOptions() {
            return {
                name: 'Anonymous',
                level: 1,
                areaWidth: 11,
                areaHeight: 25
            };
        }

        setOptions(options) {
            this.options = options;
            return this;
        }

        isGameInProgress() {
            return this.gameInProgress;
        }

        playNewGame() {
            this.gameInProgress = true;
            this.draw.cleanCanvas();
            this._emptyFullBoxes();
            this._initBoxes();
            this._handleEvents();
        }

        pauseGame() {
            this.gamePaused = true;
        }

        resumeGame() {
            this.gamePaused = false;
        }

        _emptyFullBoxes() {
            while (this.fullBoxes.length > 0) {
                this.fullBoxes.pop();
            }
        }

        _addBoxes(boxes) {
            boxes.forEach(box => this.fullBoxes.push(box));
        }

        _gameIsOver() {
            return this.isGameOver = this.boxes.getY() <= 0 && !this._canBoxesMoveDown();
        }

        _updateGameStatus() {

        }

        _writeGameOver() {
            this.draw.drawText('Game over!');
        }

        _animate(event) {
            if (this.gamePaused) {
                return;
            }

            if (this._gameIsOver()) {
                this._writeGameOver();
                return;
            }

            const leftKey = 37;
            const rightKey = 39;
            const downKey = 40;
            const upKey = 38;

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
                case upKey:
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
            //setInterval(() => this._animate({ keyCode: downKey }), 250);
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
            removedLines.sort();

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