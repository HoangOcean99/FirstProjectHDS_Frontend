export const formatIntDate = (intDate) => {
    if (!intDate) return null;
    const str = intDate.toString();
    return `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(6, 8)}`
};
export const formatDateToInt = (date) => {
    if (!date) return null;
    const dateString = date.toString().split('-').join('');
    return parseInt(dateString, 10)
}
