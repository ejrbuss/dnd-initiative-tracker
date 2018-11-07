export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; };

const merge = <T>(full: T, partial: DeepPartial<T>): T => {
    if (typeof partial === 'undefined') {
        return full;
    }
    if (Array.isArray(full) 
        || typeof full    !== 'object' 
        || typeof partial !== 'object'
        || full           === null 
        || partial        === null
    ) {
        return partial as any;
    }
    const copy = {} as any;
    const copyKeys = (key: string) => 
        copy[key] = merge((full as any)[key], (partial as any)[key]);
    Object.keys(full).forEach(copyKeys);
    Object.keys(partial).forEach(copyKeys);
    return copy;
};

const rand = (min: number, max: number): number =>
    Math.floor(Math.random() * ( max - min)) + min;

const eq = <T>(a: T, b: T): boolean =>
    JSON.stringify(a) === JSON.stringify(b);

export const Util = {
    merge,
    eq,
    rand,
}