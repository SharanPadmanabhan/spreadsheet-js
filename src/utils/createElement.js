/**
 * Creates an instance of the element for the specified tag.
 * @param {String} tagName The name of an element.
 * @param {Object} attributes Attributes of the element.
 * @returns {HTMLElement} An instance of the element for the specified tag.
 */
export const createElement = (tagName, attributes) => {
    let element = document.createElement(tagName);
    for (let [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
    }
    return element;
};
