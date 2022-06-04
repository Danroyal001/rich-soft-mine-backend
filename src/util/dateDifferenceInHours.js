Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Get's the difference between two dates in hours
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns number
 */
const dateDifferenceInHours = (date1, date2) => {
    return parseInt((Math.abs(date1 - date2) / 36e5).toString());
};

exports.default = dateDifferenceInHours;
