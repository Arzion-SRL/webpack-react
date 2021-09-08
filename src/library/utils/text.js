export const transformToSnake = key => key.replace(/([A-Z])/g, '-$1').replace(/\./g, '-').toLowerCase();
export const transformCamelToSpaces = key => key.replace(/([A-Z])/g, ' $1');
export const transformCamelToSpacesOnlyFirstCapital = key => {
    const camelToSpaces = transformCamelToSpaces(key);
    return camelToSpaces.charAt(0).toUpperCase() + camelToSpaces.slice(1).toLowerCase();
};

export default transformToSnake;
