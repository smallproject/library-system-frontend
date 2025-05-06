function removeKeys(obj, keysToRemove) {
    return Object.keys(obj).reduce((result, key) => {
        if (!keysToRemove.includes(key)) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

export default removeKeys;