import { Tracker } from './Tracker';
import { Actor } from './actor';
import { Util } from './util';
import { Render } from './Render';

export interface State {
    tracker: Tracker;
    selected?: Actor;
    output: string[];
}

const states: State[] = [
    { tracker: Tracker.init(), output: [] }
];
const undoStack: State[] = [];

const merge = (partial: Partial<State>) => {
    states.push(Util.merge(get(), partial));
    console.log('New State: ', get());
};

const update = (fn: (state: State) => Partial<State> | undefined) => {
    const newState = fn(get());
    if (newState) {
        merge(newState);
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