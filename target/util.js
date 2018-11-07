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
    Object.keys(full).forEach(key => {
        copy[key] = merge(full[key], partial[key]);
    });
    Object.keys(partial).forEach(key => {
        copy[key] = merge(full[key], partial[key]);
    });
    return copy;
};
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const eq = (a, b, comparator) => {
    if (comparator) {
        return comparator(a, b) === 0;
    }
    return JSON.stringify(a) === JSON.stringify(b);
};
const lt = (a, b, comparator) => comparator(a, b) > 0;
const gt = (a, b, comparator) => comparator(a, b) < 0;
const keycodes = {
    enter: 13,
    up: 38,
    down: 40,
};
export const Util = {
    merge,
    eq,
    lt,
    gt,
    rand,
    keycodes,
};
