let rows = +localStorage.getItem('sheet-rows') || 100,
    columns = +localStorage.getItem('sheet-columns') || 100;

/**
 * Load The SpreadSheet Information;
 */
const loadSpreadSheetInformation = () => {
    let rowCountContainer = document.querySelector('.info-rows');
    let columnCountContainer = document.querySelector('.info-columns');
    let savedTimeContainer = document.querySelector('.info-time');

    rowCountContainer.innerText = rows ?? 50;
    columnCountContainer.innerText = columns ?? 50;
    savedTimeContainer.innerText = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
};


/**
 * Renders the footer element.
 */
export const render = () => {
    let footerElement = document.querySelector('.sheet-footer');
    footerElement.innerHTML = `
        <span class="info-rows-columns"> Rows: <span class="info-rows"></span>, Columns: <span class="info-columns"></span> </span>
        <span class="info-save"> Saved At: <span class="info-time"></span> </span>
    `;
    loadSpreadSheetInformation();
};
