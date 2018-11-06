import { Tracker } from './Tracker';
import { Util } from './util';
import { Render } from './Render';
const states = [
    { tracker: Tracker.init(), selected: null, output: [] }
];
const undoStack = [];
const merge = (partial) => {
    const nextState = Util.merge(get(), partial);
    if (!Util.eq(get(), nextState)) {
        states.push(nextState);
        console.log('New State: ', get());
    }
};
const update = (fn) => {
    const result = fn(get());
    if (result) {
        let [state, log, options] = result;
        if (log) {
            console.log(log);
            if (options && options.success) {
                log = `<span class="text-primary">${log}</span>`;
            }
            if (options && options.error) {
                log = `<span class="text-danger">${log}</span>`;
            }
            state = Util.merge(state, { output: [log, ...state.output || get().output] });
        }
        if (state) {
            merge(state);
        }
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
