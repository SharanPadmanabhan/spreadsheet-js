import * as header from '../components/header.js';
import * as sheet from '../components/sheet.js';
import * as footer from '../components/footer.js';

import { bindEvent } from '../utils/bindEvent.js';
import { applyStyles } from '../utils/richText.js';
import { getSelectionRange } from '../utils/getSelectionRange.js';

export const render = () => {
    header.render();
    sheet.render();
    footer.render();
};

export const attachListeners = () => {
    let { fontFaceMenu, fontSizeMenu, boldButton, italicButton, underlineButton, strikeThroughButton, alignLeftButton, alignCenterButton, alignRightButton, alignJustifyButton, fgColorButton, bgColorButton, saveButton, } = header.getElements();

    bindEvent(fontFaceMenu, 'change', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);
        let fontName = [...fontFaceMenu.options].filter((option) => option.selected).map((option) => option.value)[0];

        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'font-family': fontName } },
        });
        currentCell.element.focus();
    });

    bindEvent(fontSizeMenu, 'change', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);

        let fontSize = [...fontSizeMenu.options].filter((option) => option.selected).map((option) => option.value)[0];
        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'font-size': `${fontSize}px` } },
        });
        currentCell.element.focus();
    });

    bindEvent(boldButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);

        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'font-weight': 'bold' } },
        });
        currentCell.element.focus();
    });

    bindEvent(italicButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);

        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'font-style': 'italic' } },
        });
        currentCell.element.focus();
    });

    bindEvent(underlineButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);

        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'text-decoration': 'underline' } },
        });
        currentCell.element.focus();
    });

    bindEvent(strikeThroughButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);

        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'text-decoration': 'line-through' } },
        });
        currentCell.element.focus();
    });

    bindEvent(alignLeftButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        applyStyles(currentCell, { command: 'align', details: { 'text-align': 'left' } });
        currentCell.element.focus();
    });

    bindEvent(alignCenterButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        applyStyles(currentCell, { command: 'align', details: { 'text-align': 'center' } });
        currentCell.element.focus();
    });

    bindEvent(alignRightButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        applyStyles(currentCell, { command: 'align', details: { 'text-align': 'right' } });
        currentCell.element.focus();
    });

    bindEvent(alignJustifyButton, 'click', () => {
        let currentCell = sheet.getClickedCell();
        applyStyles(currentCell, { command: 'align', details: { 'text-align': 'justify' } });
        currentCell.element.focus();
    });

    bindEvent(fgColorButton, 'change', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);
        let value = fgColorButton.value;

        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'color': value } },
        });
        currentCell.element.focus();
    });

    bindEvent(bgColorButton, 'change', () => {
        let currentCell = sheet.getClickedCell();
        let [start, end] = getSelectionRange(currentCell.element);
        let value = bgColorButton.value;

        applyStyles(currentCell, {
            command: 'style',
            details: { startIndex: start, endIndex: end, accent: { 'background-color': value } },
        });
        currentCell.element.focus();
    });

    bindEvent(saveButton, 'click', () => {
        sheet.saveSpreadSheet();
    });
};
