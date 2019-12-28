'use stric';

(() => {
    window.tetris.Boxes = class {

        constructor(type, isInverted) {
            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.type = type;
            this.isInverted = isInverted;
            this.boxes = this._buildBoxes();
            this._updateBoxesCoordinate();
        }

        setX(x) {
            this.x = x;
            this._updateBoxesCoordinate();
            return this;
        }

        getX() {
            return this.x;
        }

        setY(y) {
            this.y = y;
            this._updateBoxesCoordinate();
            return this;
        }

        getY() {
            return this.y;
        }

        setRotation(rotation) {
            this.rotation = rotation;
            this._updateBoxesCoordinate();
            return this;
        }

        getRotation() {
            return this.rotation;
        }

        rotate() {
            if (this.rotation === 3) {
                this.rotation = 0;
            } else {
                this.rotation++;
            }

            this._updateBoxesCoordinate();
            return this;
        }

        moveCenterX() {
            const middleWidth = Math.floor(window.tetris.options.platform.box.count.horizontal / 2);
            this.setX(middleWidth);
            this.setX(middleWidth - (this._getCenterBoxesX() - middleWidth));
        }

        moveOverTopY() {
            this.setY(0);
            this.setY(-this._getMaxY() - 1);
        }

        moveDown() {
            this.setY(this.y + 1);
            return this;
        }

        moveLeft() {
            this.setX(this.x - 1);
            return this;
        }

        moveRight() {
            this.setX(this.x + 1);
            return this;
        }

        getBoxes() {
            return this.boxes;
        }

        _getCenterBoxesX() {
            let totalX = 0;
            this.boxes.forEach(box => totalX += box.getX());
            return Math.floor(totalX / this.boxes.length);
        }

        _buildBoxes() {
            const boxes = [];
            const optionType = window.tetris.options.box.type;

            for (let i = 0; i < 4; i++) {
                const box = new window.tetris.Box();
                box.setLightColor(optionType[this.type].color.light)
                    .setDarkColor(optionType[this.type].color.dark);

                boxes.push(box);
            }

            return boxes;
        }

        _getMaxY() {
            let maxY = 0;

            this.boxes.forEach(box => {
                if (box.getY() > maxY) {
                    maxY = box.getY();
                }
            });

            return maxY;
        }

        _updateBoxesCoordinate() {
            switch (this.type) {
                case 'plus':
                    switch (this.rotation) {
                        case 0:
                            this.boxes[0].setX(this.x).setY(this.y + 1);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                            this.boxes[3].setX(this.x + 1).setY(this.y);
                            return;
                        case 1:
                            this.boxes[0].setX(this.x + 1).setY(this.y);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 1).setY(this.y + 2);
                            this.boxes[3].setX(this.x + 2).setY(this.y + 1);
                            return;
                        case 2:
                            this.boxes[0].setX(this.x).setY(this.y + 1);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                            this.boxes[3].setX(this.x + 1).setY(this.y + 2);
                            return;
                        case 3:
                            this.boxes[0].setX(this.x + 1).setY(this.y);
                            this.boxes[1].setX(this.x).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[3].setX(this.x + 1).setY(this.y + 2);
                            return;
                    }
                    return;
                case 'square':
                    this.boxes[0].setX(this.x).setY(this.y);
                    this.boxes[1].setX(this.x + 1).setY(this.y);
                    this.boxes[2].setX(this.x).setY(this.y + 1);
                    this.boxes[3].setX(this.x + 1).setY(this.y + 1);
                    return;
                case 'l':
                    if (this.isInverted) {
                        switch (this.rotation) {
                            case 0:
                                this.boxes[0].setX(this.x + 1).setY(this.y);
                                this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                                this.boxes[2].setX(this.x + 1).setY(this.y + 2);
                                this.boxes[3].setX(this.x).setY(this.y + 2);
                                return;
                            case 1:
                                this.boxes[0].setX(this.x).setY(this.y);
                                this.boxes[1].setX(this.x).setY(this.y + 1);
                                this.boxes[2].setX(this.x + 1).setY(this.y + 1);
                                this.boxes[3].setX(this.x + 2).setY(this.y + 1);
                                return;
                            case 2:
                                this.boxes[0].setX(this.x + 1).setY(this.y);
                                this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                                this.boxes[2].setX(this.x + 1).setY(this.y + 2);
                                this.boxes[3].setX(this.x + 2).setY(this.y);
                                return;
                            case 3:
                                this.boxes[0].setX(this.x).setY(this.y + 1);
                                this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                                this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                                this.boxes[3].setX(this.x + 2).setY(this.y + 2);
                                return;
                        }
                        return;
                    }

                    switch (this.rotation) {
                        case 0:
                            this.boxes[0].setX(this.x + 1).setY(this.y);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 1).setY(this.y + 2);
                            this.boxes[3].setX(this.x + 2).setY(this.y + 2);
                            return;
                        case 1:
                            this.boxes[0].setX(this.x).setY(this.y + 1);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                            this.boxes[3].setX(this.x).setY(this.y + 2);
                            return;
                        case 2:
                            this.boxes[0].setX(this.x + 1).setY(this.y);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 1).setY(this.y + 2);
                            this.boxes[3].setX(this.x).setY(this.y);
                            return;
                        case 3:
                            this.boxes[0].setX(this.x).setY(this.y + 1);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                            this.boxes[3].setX(this.x + 2).setY(this.y);
                            return;
                    }
                    return;
                case 'z':
                    if (this.isInverted) {
                        switch (this.rotation) {
                            case 0:
                            case 2:
                                this.boxes[0].setX(this.x).setY(this.y + 1);
                                this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                                this.boxes[2].setX(this.x + 1).setY(this.y);
                                this.boxes[3].setX(this.x + 2).setY(this.y);
                                return;
                            case 1:
                            case 3:
                                this.boxes[0].setX(this.x + 1).setY(this.y);
                                this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                                this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                                this.boxes[3].setX(this.x + 2).setY(this.y + 2);
                                return;
                        }
                        return;
                    }

                    switch (this.rotation) {
                        case 0:
                        case 2:
                            this.boxes[0].setX(this.x).setY(this.y);
                            this.boxes[1].setX(this.x + 1).setY(this.y);
                            this.boxes[2].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[3].setX(this.x + 2).setY(this.y + 1);
                            return;
                        case 1:
                        case 3:
                            this.boxes[0].setX(this.x + 2).setY(this.y);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                            this.boxes[3].setX(this.x + 1).setY(this.y + 2);
                            return;
                    }
                    return;
                case 'i':
                    switch (this.rotation) {
                        case 0:
                        case 2:
                            this.boxes[0].setX(this.x + 1).setY(this.y);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 1).setY(this.y + 2);
                            this.boxes[3].setX(this.x + 1).setY(this.y + 3);
                            return;
                        case 1:
                        case 3:
                            this.boxes[0].setX(this.x).setY(this.y + 1);
                            this.boxes[1].setX(this.x + 1).setY(this.y + 1);
                            this.boxes[2].setX(this.x + 2).setY(this.y + 1);
                            this.boxes[3].setX(this.x + 3).setY(this.y + 1);
                            return;
                    }
                    return;
            }
        }
    }
})();