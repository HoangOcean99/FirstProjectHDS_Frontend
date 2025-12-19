export const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '';
    return Number(value).toLocaleString('en-US');
};
