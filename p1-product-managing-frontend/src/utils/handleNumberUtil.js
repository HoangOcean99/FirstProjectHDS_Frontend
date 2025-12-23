export const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '';
    return Number(value).toLocaleString('en-US');
};

export const parseNumber = (value) => {
    if (value === null || value === undefined || value === '') return '';
    return Number(value.replace(/,/g, ''));
};
