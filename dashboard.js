'use strict';

(() => {
    const game = new window.tetris.Game();

    const gameElement = document.getElementById('game');
    const optionsButton = document.getElementById('optionsButton');
    const options = document.getElementById('options');
    const optionsIgnoreButton = document.getElementById('optionsIgnoreButton');
    const optionsSaveButton = document.getElementById('optionsSaveButton');
    const actionGameButton = document.getElementById('actionGameButton');

    function loadOptions() {
        const options = getOptions();
        Object.keys(options)
            .forEach(name => document.querySelector(`#options [name="${name}"]`).value = options[name]);
    }

    function getOptions() {
        const options = game.getDefaultOptions();

        Object.keys(options).forEach(name => {
            let value = localStorage.getItem(`tetris.options.${name}`);
            if (name !== 'name') {
                value = +value;
            }

            if (value) {
                options[name] = value;
            }
        });

        return options;
    }

    function openOptions() {
        loadOptions();
        gameElement.style.display = 'none';
        options.style.display = 'block';
    }

    function closeOptions() {
        options.style.display = 'none';
        gameElement.style.display = 'flex';
    }

    function saveOptions() {
        Object.keys(game.getDefaultOptions()).forEach(name => {
            const value = document.querySelector(`#options [name="${name}"]`).value;
            localStorage.setItem(`tetris.options.${name}`, value);
        });

        closeOptions();
    }

    function manageGame() {
        const action = actionGameButton.textContent;

        switch (action) {
            case 'New game':
                if (game.isGameInProgress() && confirm("Do you abort this party ?") || !game.isGameInProgress()) {
                    game.playNewGame();
                    actionGameButton.textContent = 'Pause game';
                }
                return;
            case 'Pause game':
                game.pauseGame();
                actionGameButton.textContent = 'Resume game'
                return;
            case 'Resume game':
                game.resumeGame();
                actionGameButton.textContent = 'New game';
        }
    }

    optionsButton.onclick = openOptions;
    optionsIgnoreButton.onclick = closeOptions;
    optionsSaveButton.onclick = saveOptions;
    actionGameButton.onclick = manageGame;
})();