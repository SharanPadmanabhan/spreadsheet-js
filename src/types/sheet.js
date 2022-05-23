import { uuid } from '../utils/uuid.js';
import { Row } from './row.js';

/**
 * A Sheet in a spreadsheet.
 * @param {number} rows The number of rows in the sheet.
 * @param {number} columns The number of columns in the sheet.
 */
export const Sheet = class {
    /**
     * A Sheet in a spreadsheet.
     * @param {number} rows The number of rows in the sheet.
     * @param {number} columns The number of columns in the sheet.
     */
    constructor(rows = 50, columns = 50) {
        this.rows = [];
        this.id = uuid();
        this.rowCount = rows;
        this.columnCount = columns;
        this.element = this.#asHTML();
        this.createdTimeStamp = new Date().getTime();
    }

    /**
     * Appends a row to the sheet.
     * @param {Row} row The row to be added to the sheet.
     */
    appendRow(row) {
        this.rows.push(row);
        this.element.appendChild(row.element);
    }

    /**
     * Creates a sheet element.
     * @returns {HTMLElement} The sheet as html element.
     */
    #asHTML() {
        return document.querySelector('.sheet-cells');
    }
};
