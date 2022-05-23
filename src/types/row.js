import { createElement } from '../utils/createElement.js';
import { Cell } from './cell.js';

/**
 * A Row in the sheet.
 * @param {number} row The row number (Defaults to 0).
 */
export const Row = class {
    /**
     * A Row in the sheet.
     * @param {number} row The row number (Defaults to 0).
     */
    constructor(row = 0) {
        this.cells = [];
        this.rowNumber = row;
        this.element = this.#asHTML();
    }

    /**
     * Appends a Cell to the row.
     * @param {Cell} cell The cell to be added to the row.
     */
    appendCell(cell) {
        this.cells.push(cell);
        this.element.appendChild(cell.element);
    }

    /**
     * Creates a row element.
     * @returns {HTMLElement} The row as html element.
     */
    #asHTML() {
        return createElement('span', { class: 'sheet-row' });
    }
};
