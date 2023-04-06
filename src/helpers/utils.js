const transformArryToString = (delimiter = ',', array) => {
    if (typeof delimiter !== 'string') throw new Error('invalid delimeter');
    if (Array.isArray(array) && array.length) return array.join(delimiter); 
}

const getLicenseValidity = () => {
    if (new Date().getUTCFullYear() >= 2026) {
        return "invalid";
    }

    return "valid";
}

module.exports = {
    transformArryToString,
    getLicenseValidity
}