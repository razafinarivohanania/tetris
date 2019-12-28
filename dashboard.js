'use strict';

(() => {
    const game = document.getElementById('game');
    const optionsButton = document.getElementById('optionsButton');
    const options = document.getElementById('options');
    const optionsIgnoreButton = document.getElementById('optionsIgnoreButton');
    const optionsSaveButton = document.getElementById('optionsSaveButton');

    function loadOptions() {
        ['name', 'level', 'areaWidth', 'areaHeight'].forEach(name => {
            const value = localStorage.getItem(`tetris.options.${name}`);
            if (value) {
                document.querySelector(`#options [name="${name}"]`).value = value;
            }
        });
    }

    function openOptions() {
        loadOptions();
        game.style.display = 'none';
        options.style.display = 'block';
    }

    function closeOptions() {
        options.style.display = 'none';
        game.style.display = 'flex';
    }

    function saveOptions() {
        ['name', 'level', 'areaWidth', 'areaHeight'].forEach(name => {
            const value = document.querySelector(`#options [name="${name}"]`).value;
            localStorage.setItem(`tetris.options.${name}`, value);
        });

        closeOptions();
    }

    function readValueAttribute(css) {
        const element = document.querySelector(css);
        return element.value;
    }

    optionsButton.onclick = openOptions;
    optionsIgnoreButton.onclick = closeOptions;
    optionsSaveButton.onclick = saveOptions;
})();