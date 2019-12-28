'use strict';

(() => {
    window.tetris.Box = class {

        constructor() {
            this.x = 0;
            this.y = 0;
        }

        setX(x) {
            this.x = x;
            return this;
        }

        setY(y) {
            this.y = y;
            return this;
        }

        getX() {
            return this.x;
        }

        getY() {
            return this.y;
        }

        setLightColor(lightColor) {
            this.lightColor = lightColor;
            return this;
        }

        setDarkColor(darkColor) {
            this.darkColor = darkColor;
            return this;
        }

        getLightColor() {
            return this.lightColor;
        }

        getDarkColor() {
            return this.darkColor;
        }

        clone() {
            return (new window.tetris.Box())
                .setX(this.x)
                .setY(this.y)
                .setLightColor(this.lightColor)
                .setDarkColor(this.darkColor);
        }
    }
})();