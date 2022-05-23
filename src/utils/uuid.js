/**
 * Generates a new UUID.
 * @returns {string} A UUID.
 */
export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const id = character == 'x' ? random : (random & 0x3) | 0x8;
        return id.toString(16);
    });
};
