import { Tracker } from './Tracker';
import { Util } from './util';
import { Render } from './Render';
const states = [
    { tracker: Tracker.init(), output: [] }
];
const undoStack = [];
const merge = (partial) => {
    states.push(Util.merge(get(), partial));
    console.log('New State: ', get());
};
const update = (fn) => {
    const newState = fn(get());
    if (newState) {
        merge(newState);
    }
    Render.update(get());
};
const get = () => states[states.length - 1];
const undo = () => {
    if (states.length > 1) {
        const state = states.pop();
        if (state) {
            undoStack.push(state);
        }
    }
    Render.update(get());
};
const redo = () => {
    const state = undoStack.pop();
    if (state) {
        states.push(state);
    }
    Render.update(get());
};
export const State = { update, merge, get, undo, redo };
