export const formatIntDate = (intDate) => {
    if (!intDate) return null;
    const str = intDate.toString();
    return `${str.substring(0, 4)}/${str.substring(4, 6)}/${str.substring(6, 8)}`
};
