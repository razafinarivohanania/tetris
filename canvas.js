'use strict';

(() => {
    window.tetris.Canvas = class {

        constructor() {
            this.width = window.tetris.options.platform.box.count.horizontal * window.tetris.options.box.size;
            this.height = window.tetris.options.platform.box.count.vertical * window.tetris.options.box.size;
            this.canvas = document.getElementById('tetris');
        }

        getElement() {
            return this.canvas;
        }

        resize() {
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