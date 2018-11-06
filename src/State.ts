import { Tracker } from './Tracker';
import { Actor } from './actor';
import { Util } from './util';
import { Render } from './Render';

export interface State {
    tracker: Tracker;
    selected: Actor | null;
    output: string[];
}

interface LogOptions {
    success?: boolean;
    error?: boolean;
}

const states: State[] = [
    { tracker: Tracker.init(), selected: null, output: [] }
];
const undoStack: State[] = [];

const merge = (partial: Partial<State>) => {
    const nextState = Util.merge(get(), partial);
    if (!Util.eq(get(), nextState)) {
        states.push(nextState);
        console.log('New State: ', get());
    }
};

const update = (fn: (state: State) => (undefined
    | [Partial<State>]
    | [Partial<State>, string] 
    | [Partial<State>, string, LogOptions]
)) => {
    const result = fn(get());
    if (result) {
        let [state, log, options] = result as [Partial<State>, string, LogOptions];
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

const get = (): State =>
    states[states.length - 1];

const undo = (): void => {
    if (states.length > 1) {
        const state = states.pop();
        if (state) {
            undoStack.push(state);
        }
    }
    Render.update(get());
};

const redo = (): void => {
    const state = undoStack.pop();
    if (state) {
        states.push(state);
    }
    Render.update(get());
};

export const State = { update, merge, get, undo, redo }