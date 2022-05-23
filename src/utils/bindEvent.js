/**
 * Binds an event to an element.
 * @param {Element} element The element to which the event has to be bound.
 * @param {keyof HTMLElementEventMap} event The event hat to be bound.
 * @param {EventListener} callback The event callback.
 * @returns {boolean} If the event has been attached to the element.
 */
export const bindEvent = (element, event, callback) => {
    try {
        element.addEventListener(event, callback);
        return true;
    } catch (exception) {
        return false;
    }
};
