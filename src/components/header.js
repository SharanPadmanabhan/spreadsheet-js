import { createElement } from '../utils/createElement.js';

const headerElements = {
    fontFaceMenu: createElement('select', { class: 'button button-font-face-menu', title: 'Font Face', name: 'font-face' }),
    fontSizeMenu: createElement('select', { class: 'button button-font-size-menu', title: 'Font Size', name: 'font-size' }),
    boldButton: createElement('button', { class: 'button button-format-bold', title: 'Bold', name: 'format-bold' }),
    italicButton: createElement('button', { class: 'button button-format-italic', title: 'Italic', name: 'format-italic' }),
    underlineButton: createElement('button', { class: 'button button-format-underline', title: 'Underline', name: 'format-underline' }),
    strikeThroughButton: createElement('button', { class: 'button button-format-strike-through', title: 'Underline', name: 'format-underline' }),
    alignLeftButton: createElement('button', { class: 'button button-align-left', title: 'Left', name: 'align-left' }),
    alignCenterButton: createElement('button', { class: 'button button-align-center', title: 'Center', name: 'align-center' }),
    alignRightButton: createElement('button', { class: 'button button-align-right', title: 'Right', name: 'align-right' }),
    alignJustifyButton: createElement('button', { class: 'button button-align-justify', title: 'Justify', name: 'align-justify' }),
    fgColorButton: createElement('input', { type: 'color', class: 'button button-color-foreground', title: 'Text Color', name: 'color-foreground' }),
    bgColorButton: createElement('input', { type: 'color', class: 'button button-color-background', title: 'Text Highlight', name: 'color-background', }),
    saveButton: createElement('button', { class: 'button button-file-save', title: 'Save File', name: 'file-save' }),
};

/**
 * Loads The Font Face Menu.
 */
const loadFontFaceMenu = () => {
    const fontFaceMenu = document.querySelector('.button-font-face-menu');
    const fonts = ['Arial', 'Calibri', 'Caveat', 'Comfortaa', 'Courier Prime',
        'EB Garamond', 'Lora', 'Montserrat', 'Nunito', 'Open Sans', 'Playfair Display',
        'Poppins', 'Raleway', 'Roboto', 'Spectral', 'Tahoma', 'Times New Roman'];

    fonts.forEach((font) => {
        let fontOption = createElement('option', {
            class: 'button-font-face-option',
            style: `--font-face: ${font}`,
            value: font,
        });

        fontOption.innerText = font;
        fontFaceMenu.appendChild(fontOption);
    });
};

/**
 * Loads The Font Size Menu.
 */
const loadFontSizeMenu = () => {
    let count = 8;
    const fontSizeMenu = document.querySelector('.button-font-size-menu');
    const sizes = Array.apply(null, Array(7)).map(() => (count += 2));
    sizes.forEach((size) => {
        let sizeOption = createElement('option', {
            class: 'button-font-face-option',
            style: `--font-face: ${size}`,
            value: size,
        });

        sizeOption.innerText = size;
        fontSizeMenu.appendChild(sizeOption);
    });
};

/**
 * Renders the header element.
 */
export const render = () => {
    let headerElement = document.querySelector('.sheet-header');
    headerElement.setAttribute('style', `--count: ${Object.keys(headerElements).length}`);
    for (const element of Object.values(headerElements)) {
        headerElement.appendChild(element);
    }

    loadFontFaceMenu();
    loadFontSizeMenu();
};

/**
 * Returns the header elements.
 * @returns {Object} The header elements.
 */
export const getElements = () => {
    return headerElements;
};
