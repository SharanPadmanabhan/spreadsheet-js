/**
 * Returns the selection.
 * @returns {Selection | null} The selection.
 */
const getSelection = () => {
    if (document && document.getSelection) {
        return document.getSelection();
    } else if (window && window.getSelection) {
        return window.getSelection();
    } else if (document && document.selection) {
        return document.selection.createRange().text;
    }
    return null;
};

/**
 * Returns the selection range.
 * @param {HTMLElement} container The container containing the selection.
 * @returns {number[]} The selection range
 */
export const getSelectionRange = (container) => {
    let selectedText = getSelection().toString();
    let containerText = container.innerText;

    let startIndex = containerText.indexOf(selectedText);
    let endIndex = startIndex + selectedText.length;

    return [startIndex, endIndex];
};
