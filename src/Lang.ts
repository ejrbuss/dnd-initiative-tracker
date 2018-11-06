import { Util } from './util';
import { API } from './API';

export const evaluate = (source: string): string => {
    const transform = source
        // Remove whitespace
        .replace(/\s*/g, '')
        // Dice replacement
        .replace(/(\d+)d(\d+)/g, (_, mult, die) => {
            return (parseInt(mult) * Util.rand(1, parseInt(die) + 1)).toString();
        })
        .replace(/d(\d+)/g, (_, die) => {
            return Util.rand(1, parseInt(die) + 1).toString();
        })
        // Perform math ops in order */+-
        .replace(/(\d+)\*(\d+)/g, (_, a, b) => {
            return (parseInt(a) * parseInt(b)).toString()
        })
        .replace(/(\d+)\/(\d+)/g, (_, a, b) => {
            return (parseInt(a) / parseInt(b)).toString()
        })
        .replace(/(\d+)\+(\d+)/g, (_, a, b) => {
            return (parseInt(a) + parseInt(b)).toString()
        })
        .replace(/(\d+)\-(\d+)/g, (_, a, b) => {
            return (parseInt(a) - parseInt(b)).toString()
        })
        // Unwrap parens last
        .replace(/\((\d+)\)/g, (_, num) => {
            return num;
        })
        .replace(/hp\+(\d+)/g, (_, num) => {
            API.changeHitPoints(parseInt(num));
            return '';
        })
        .replace(/hp-(\d+)/g, (_, num) => {
            API.changeHitPoints(-parseInt(num));
            return '';
        })
        .replace(/remove/g, () => {
            API.removeSelected();
            return '';
        })
        .replace(/next/g, () => {
            API.next();
            return '';
        })
        .replace(/previous/g, () => {
            API.previous();
            return '';
        })
        .replace(/undo/g, () => {
            API.undo();
            return '';
        })
        .replace(/redo/g, () => {
            API.redo();
            return '';
        })
        ;
    // Recurse on transform to fully evaluate
    if (transform !== source) {
        return evaluate(transform);
    } else {
        return source;
    }
};

export const Lang = { evaluate };