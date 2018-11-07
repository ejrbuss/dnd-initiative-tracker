const merge = (full, partial) => {
    if (typeof partial === 'undefined') {
        return full;
    }
    if (Array.isArray(full)
        || typeof full !== 'object'
        || typeof partial !== 'object'
        || full === null
        || partial === null) {
        return partial;
    }
    const copy = {};
    const copyKeys = (key) => copy[key] = merge(full[key], partial[key]);
    Object.keys(full).forEach(copyKeys);
    Object.keys(partial).forEach(copyKeys);
    return copy;
};
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const Util = {
    merge,
    eq,
    rand,
};
