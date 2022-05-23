import { Cell } from '../types/cell.js';


const calculateRanges = (container, array) => {
    let flatArray = array.flat(),
        ranges = [];

    flatArray.push(0, container.innerText.length);
    flatArray = Array.from(new Set(flatArray)).sort((a, b) => a - b);

    for (let index = 1; index < flatArray.length; index++) {
        ranges.push(flatArray.slice(index - 1, index + 1));
    }

    return ranges;
};

const findStyle = ([start, end], array) => {
    return array.findIndex((containerStyle) => {
        return containerStyle.startIndex === start && containerStyle.endIndex === end;
    });
};

const compareStyles = (style1, style2) => {
    for (let property in style1) {
        if (style1.hasOwnProperty(property)) {
            if (style1[property] !== style2[property]) {
                return false;
            }
        }
    }
    for (let property in style2) {
        if (style2.hasOwnProperty(property)) {
            if (style1[property] !== style2[property]) {
                return false;
            }
        }
    }
    return true;
};

const cleanStyles = (styles) => {
    if (styles.length <= 1) {
        return styles;
    }

    let cleanedStyles = [];

    for (let i = 0; i < styles.length;) {
        let current = styles[i];
        let style = { startIndex: current.startIndex, endIndex: current.endIndex, accent: current.accent };

        for (var j = i + 1; j < styles.length; j++) {
            let pointer = styles[j];
            if (!compareStyles(current.accent, pointer.accent)) {
                i = j;
                break;
            }
            style.endIndex = pointer.endIndex;
        }
        cleanedStyles.push(style);
        if (j === styles.length) {
            break;
        }
    }
    return cleanedStyles;
};


/**
 * Calculates Styles for the container.
 * @param {Cell} container The container to which the style has to be applied.
 * @param {Object} action The style that has to be applied.
 * @returns {Array}
 */
const calculateStyles = (container, style) => {
    let found = container.containsRichTextStyle(style);
    if (!found) {
        container.addRichTextStyle(style);
    }

    let ranges = [];
    let cellStyles = [];
    let richTextStyles = container.getRichTextStyles();
    richTextStyles.forEach(({ startIndex, endIndex }) => ranges.push([startIndex, endIndex]));
    ranges.push([style.startIndex, style.endIndex]);

    let updatedRanges = calculateRanges(container.element, ranges);

    updatedRanges.forEach(([start, end]) => {
        let cellStyle = { startIndex: start, endIndex: end, accent: {} };
        cellStyles.push(cellStyle);

        richTextStyles.forEach((richTextStyle) => {
            if (start >= richTextStyle.startIndex && end <= richTextStyle.endIndex) {
                let index = findStyle([start, end], cellStyles);
                Object.assign(cellStyles[index].accent, richTextStyle.accent);
            }
        });
    });

    if (found) {
        let key = Object.keys(style.accent)[0];
        cellStyles.forEach(cellStyle => {
            if (style.startIndex === cellStyle.startIndex && style.endIndex === cellStyle.endIndex) {
                delete cellStyle.accent[key];
                console.log(cellStyle);
            }
        });
    }

    return cleanStyles(cellStyles);
};

/**
 * Applies the rich text style to the given container.
 * @param {Cell} container The container to which the style has to be applied.
 * @param {Object} action The style that has to be applied.
 */
const applyRichTextStyles = (container, action) => {
    let styles = calculateStyles(container, action), span;
    container.element.innerHTML = '';
    console.log(styles);

    styles.forEach((style) => {
        span = document.createElement('span');
        span.innerText = container.data.substring(style.startIndex, style.endIndex);

        for (let [accent, value] of Object.entries(style.accent)) {
            span.style[accent] = value;
        }
        container.element.appendChild(span);
    });

    container.setRichTextStyles(styles);
};

/**
 * Applies the alignment to the given container.
 * @param {Cell} container The container to which the style has to be applied.
 * @param {Object} action The style that has to be applied.
 */
const applyAlignmentStyles = (container, action) => {
    for (let [_, value] of Object.entries(action)) {
        container.setAlignment(value);
    }
};

/**
 * Applies the style to the given container.
 * @param {Cell} container The container to which the style has to be applied.
 * @param {Object} action The style that has to be applied.
 */
export const applyStyles = (container, action) => {
    if (action.command === 'style') {
        applyRichTextStyles(container, action.details);
    } else if (action.command === 'align') {
        applyAlignmentStyles(container, action.details);
    }
};
