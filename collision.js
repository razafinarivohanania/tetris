'use strict';

(() => {
    window.tetris.Collision = class {

        constructor(fullBoxes) {
            this.fullBoxes = fullBoxes;
            this.resetArea();
        }

        resetArea(boxCountHorizontal, boxCountVertical) {
            if (!boxCountHorizontal) {
                boxCountHorizontal = window.tetris.options.platform.box.count.horizontal;
            }

            if (!boxCountVertical) {
                boxCountVertical = window.tetris.options.platform.box.count.vertical;
            }

            this.platform = {
                width: boxCountHorizontal,
                height: boxCountVertical
            }
        }

        isInCollision(boxes, movement) {
            for (const box of boxes) {
                switch (movement) {
                    case 'left':
                        if (this._isCoordinateFound(box.getX() - 1, box.getY())) {
                            return true;
                        }
                        continue;
                    case 'right':
                        if (this._isCoordinateFound(box.getX() + 1, box.getY())) {
                            return true;
                        }
                        continue;
                    case 'down':
                        if (this._isCoordinateFound(box.getX(), box.getY() + 1)) {
                            return true;
                        };
                        continue;
                    default:
                        if (this._isCoordinateFound(box.getX(), box.getY())) {
                            return true;
                        };
                        continue;
                }
            }

            return false;
        }

        _isCoordinateFound(x, y) {
            if (x < 0 || x >= this.platform.width || y >= this.platform.height) {
                return true;
            }

            for (const box of this.fullBoxes) {
                if (box.getX() === x && box.getY() === y) {
                    return true;
                }
            }

            return false;
        }
    }
})();