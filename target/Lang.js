import { Util } from './util';
const env = {};
export const evaluate = (source, api) => {
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
        .replace(/jump|remove|next|previous|reset|clear|undo|redo/g, command => {
        api[command
            .replace('jump', 'jumpSelected')
            .replace('remove', 'removeSelected')]();
        return '';
    })
        // Lets make a little programming language
        .replace(/\\(\w+)\{(.*)\}:(\w+)/g, (_, para, body, arg) => {
        return body.replace(new RegExp(para, 'g'), arg);
    })
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
    }
    else {
        return source;
    }
};
export const Lang = { evaluate };
