import { createElement } from '../utils/createElement.js';
import { Sheet } from '../types/sheet.js';
import { Row } from '../types/row.js';
import { Cell } from '../types/cell.js';

let rows = +localStorage.getItem('sheet-rows') || 100,
    columns = +localStorage.getItem('sheet-columns') || 100;

let currentCell, sheet;

/**
 * Gets the clicked cell.
 * @returns The clicked cell.
 */
export const getClickedCell = () => {
    return currentCell;
};

/**
 * Sets the clicked cell.
 * @param {Cell} cell The Cell that has been clicked
 */
export const setClickedCell = (cell) => {
    if (currentCell) {
        currentCell.clicked = false;
    }
    currentCell = cell;
    currentCell.clicked = true;
};

/**
 * Returns the column header name of the given number.
 * @param {Number} columnNumber The column number of the spreadsheet.
 * @returns Column header.
 */
function getColumnHeader(columnNumber) {
    let columnName = new Array();
    while (columnNumber > 0) {
        let remainder = columnNumber % 26;
        if (remainder !== 0) {
            columnName.push(String.fromCharCode(remainder - 1 + 65));
            columnNumber = Math.floor(columnNumber / 26);
        } else {
            columnName.push('Z');
            columnNumber = Math.floor(columnNumber / 26) - 1;
        }
    }
    return columnName.reverse().join('');
}

/**
 * Creates the row headers.
 * @param {Number} rows The number of rows.
 */
const createSpreadSheetRowHeaders = (rows) => {
    let spreadSheetRowHeaders = document.querySelector('.sheet-row-headers');
    for (let row = 0; row < rows; row++) {
        let spreadSheetRowHeader = createElement('span', {
            class: 'sheet-row-header',
            spellcheck: false,
        });
        spreadSheetRowHeader.innerText = row + 1;
        spreadSheetRowHeaders.appendChild(spreadSheetRowHeader);
    }
};

/**
 * Creates the column headers.
 * @param {Number} columns The number of columns.
 */
const createSpreadSheetColumnHeaders = (columns) => {
    let spreadSheetColumnHeaders = document.querySelector('.sheet-column-headers');
    for (let column = 0; column < columns; column++) {
        let spreadSheetColumnHeader = createElement('span', {
            class: 'sheet-column-header',
            spellcheck: false,
        });
        spreadSheetColumnHeader.innerText = getColumnHeader(column + 1);
        spreadSheetColumnHeaders.appendChild(spreadSheetColumnHeader);
    }
};

const createSpreadSheetCells = (rows, columns) => {
    let spreadsheet = new Sheet(rows, columns);
    for (let row = 0; row < rows; row++) {
        let sheetRow = new Row(row);
        for (let column = 0; column < columns; column++) {
            let cell = new Cell('', row, column);
            sheetRow.appendCell(cell);
        }
        spreadsheet.appendRow(sheetRow);
    }
    sheet = spreadsheet;
};

/**
 * Creates a new Spreadsheet.
 * @param {number} rows The number of rows.
 * @param {number} columns The number of columns.
 */
export const createSpreadSheet = (rows, columns) => {
    createSpreadSheetRowHeaders(rows);
    createSpreadSheetColumnHeaders(rows);
    createSpreadSheetCells(rows, columns);
};

export const render = () => {
    let sheetElement = document.querySelector('.sheet-contents');

    let sheetSelectorElement = createElement('div', { class: 'sheet-selector' });
    let rowHeadersElement = createElement('div', { class: 'sheet-row-headers' });
    let columnHeadersElement = createElement('div', { class: 'sheet-column-headers' });
    let sheetCellsElement = createElement('div', { class: 'sheet-cells' });
    let sheetAddElement = createElement('div', { class: 'sheet-add-rows-columns' });

    sheetAddElement.innerHTML = `
        <span class="sheet-add-rows">
            Add <input class="sheet-number-of-rows" type="number" value="100" /> more rows
            <button class="button button-add button-add-rows"></button>
        </span>
        <span class="sheet-add-columns">
            Add <input class="sheet-number-of-columns" type="number" value="100" /> more columns.
            <button class="button button-add button-add-columns"></button>
        </span>
    `;

    sheetElement.style = `--rows: ${rows}; --columns: ${columns};`;
    sheetElement.append(sheetSelectorElement, rowHeadersElement, columnHeadersElement, sheetCellsElement, sheetAddElement);
    createSpreadSheet(rows, columns);
};
