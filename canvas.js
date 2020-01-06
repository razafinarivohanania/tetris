'use strict';

(() => {
    window.tetris.Canvas = class {

        constructor() {
            this.canvas = document.getElementById('tetris');
        }

        getElement() {
            return this.canvas;
        }

        resize(boxCountHorizontal, boxCountVertical) {
            if (!boxCountHorizontal) {
                boxCountHorizontal = window.tetris.options.platform.box.count.horizontal;
            }

            if (!boxCountVertical) {
                boxCountVertical = window.tetris.options.platform.box.count.vertical;
            }

            this.width = boxCountHorizontal * window.tetris.options.box.size;
            this.height = boxCountVertical * window.tetris.options.box.size;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        getWidth() {
            return this.width;
        }

        getHeight() {
            return this.height
        }
    }
})();