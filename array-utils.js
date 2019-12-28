'use strict';

(() => {
    window.tetris.ArrayUtils = {
        getRandomItem: array => {
            return array[Math.floor(Math.random() * array.length)];
        },
        removeItem: (array, index) => {
            const length = array.length;
            if (index < 0 || index >= length) {
                return;
            }

            const temporaryArray = [];
            for (let i = 0; i < length; i++) {
                if (i !== index) {
                    temporaryArray.push(array[i]);
                }
            }

            for (let i = index; i < length; i++) {
                array[i] = temporaryArray[i];
            }   

            array.pop();
        }
    }
})();