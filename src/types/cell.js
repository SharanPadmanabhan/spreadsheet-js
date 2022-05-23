import { bindEvent } from '../utils/bindEvent.js';
import { createElement } from '../utils/createElement.js';
import { setClickedCell } from '../components/sheet.js';
import { uuid } from '../utils/uuid.js';

/**
 * A cell in a spreadsheet.
 * @param {string} data The data in the cell.
 * @param {number} row The row number of the cell.
 * @param {number} column The column number of the cell.
 */
export const Cell = class {
    #styles;

    /**
     * A cell in a spreadsheet.
     * @param {string} data The data in the cell.
     * @param {number} row The row number of the cell.
     * @param {number} column The column number of the cell.
     */
    constructor (data = '', row = 0, column = 0) {
        this.id = uuid();
        this.data = data;
        this.clicked = false;
        this.rowNumber = row;
        this.columnNumber = column;
        this.element = this.#asHTML();
        this.lastEditedTimeStamp = new Date().getTime();
        this.#styles = { 'text-align': 'left', 'rich-text': [] };
    }

    /**
     * Adds the style to the cell.
     * @param {Object} styles The style to be applied to the cell.
     * @returns If the style is added.
     */
    addRichTextStyle(style) {
        this.#styles['rich-text'].push(style);
        return true;
    }

    /**
     * Returns the rich-text styles applied to the cell.
     * @returns {Array} The rich-text styles applied to the cell.
     */
    getRichTextStyles() {
        return this.#styles['rich-text'];
    }

    /**
     * Set the alignment of the cell.
     * @param {string} alignment The alignment of the cell.
     * @returns If the alignment is applied.
     */
    setAlignment(alignment) {
        this.#styles['text-align'] = alignment;
        return true;
    }

    /**
     * Returns the alignment of the cell.
     * @returns {string} The alignment of the cell.
     */
    getAlignment() {
        return this.#styles['text-align'];
    }

    /**
     * Returns the cell element as html.
     * @returns {HTMLElement} The cell element.
     */
    #asHTML() {
        let cell = createElement('span', { class: 'sheet-cell', contentEditable: true, spellcheck: false });
        cell.innerText = this.data;

        if (this.rowNumber === 0 && this.columnNumber === 0) {
            cell.setAttribute('autofocus', true);
            setClickedCell(this);
        }

        bindEvent(cell, 'click', () => setClickedCell(this));

        bindEvent(cell, 'input', () => {
            this.lastEditedTimeStamp = new Date().getTime();
            this.data = cell.innerText;

            if (this.data === '\n') {
                this.setStyles([]);
                cell.innerHTML = '';
            }
        });

        return cell;
    }
};
