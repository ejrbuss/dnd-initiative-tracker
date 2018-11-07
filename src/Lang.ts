import { Util } from './util';

const env: { [name: string]: string } = {};

export const evaluate = (source: string, api?: any): string => {
    const transform = source
        // Remove whitespace
        .replace(/\s*/g, '')
        // Dice replacement
        .replace(/(\d+)d(\d+)/g, (_, mult, die) => {
            return (new Array(parseInt(mult)).fill(0))
                .map(() => Util.rand(1, parseInt(die) + 1))
                .reduce((a, b) => a + b)
                .toString();
        })
        .replace(/d(\d+)/g, (_, die) => {
            return Util.rand(1, parseInt(die) + 1).toString();
        })
        // Perform math ops in order */+-
        .replace(/(\d+)\*(\d+)/g, (_, a, b) => {
            return (parseInt(a) * parseInt(b)).toString();
        })
        .replace(/(\d+)\/(\d+)/g, (_, a, b) => {
            return (parseInt(a) / parseInt(b)).toString();
        })
        .replace(/(\d+)\+(\d+)/g, (_, a, b) => {
            return (parseInt(a) + parseInt(b)).toString();
        })
        .replace(/(\d+)\-(\d+)/g, (_, a, b) => {
            return (parseInt(a) - parseInt(b)).toString();
        })
        .replace(/max(\d+),(\d+)/g, (_, a, b) => {
            return (Math.max(parseInt(a), parseInt(b))).toString();
        })
        .replace(/min(\d+),(\d+)/g, (_, a, b) => {
            return (Math.min(parseInt(a), parseInt(b))).toString();
        })
        // Unwrap parens last
        .replace(/\((\d+)\)/g, (_, num) => {
            return num;
        })
        .replace(/hp\+(\d+)/g, (_, num) => {
            api.changeHitPoints(parseInt(num));
            return '';
        })
        .replace(/hp-(\d+)/g, (_, num) => {
            api.changeHitPoints(-parseInt(num));
            return '';
        })
        .replace(/jump|remove|next|previous|reset|reboot|clear|undo|redo|help/g, command => {
            api[command
                .replace('jump', 'jumpSelected')
                .replace('remove', 'removeSelected')
            ]();
            return '';
        })
        // Simple variables
        .replace(/(\$\w+)=(.*)/g, (_, name, value) => {
            env[name] = value;
            return value;
        })
        .replace(/\$\w+/g, name => {
            return env[name];
        });
    // Recurse on transform to fully evaluate
    if (transform !== source) {
        return evaluate(transform);
    } else {
        return source;
    }
};

export const Lang = { evaluate };