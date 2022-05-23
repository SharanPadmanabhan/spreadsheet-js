import * as loader from './loader.js';

function loadWindow() {
    loader.render();
    loader.attachListeners();
}

window.onload = () => loadWindow();
