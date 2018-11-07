export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; };

const merge = <T>(full: T, partial: DeepPartial<T>): T => {
    if (typeof partial === 'undefined') {
        return full;
    }
    if (Array.isArray(full) 
        || typeof full !== 'object' 
        || typeof partial !== 'object'
        || full === null 
        || partial === null
    ) {
        return partial as any;
    }
    const copy = {} as any;
    Object.keys(full).forEach(key => {
        copy[key] = merge((full as any)[key], (partial as any)[key]);
    })
    Object.keys(partial).forEach(key => {
        copy[key] = merge((full as any)[key], (partial as any)[key]);
    });
    return copy;
};

const rand = (min: number, max: number): number =>
    Math.floor(Math.random() * ( max - min)) + min;

type Comparator<T> = (a: T, b: T) => number;

const eq = <T>(a: T, b: T, comparator?: Comparator<T>): boolean => {
    if (comparator) {
        return comparator(a, b) === 0;
    }
    return JSON.stringify(a) === JSON.stringify(b);
}

const lt = <T>(a: T, b: T, comparator: Comparator<T>): boolean =>
    comparator(a, b) > 0;

const gt = <T>(a: T, b: T, comparator: Comparator<T>): boolean =>
    comparator(a, b) < 0;

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
}