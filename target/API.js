import { State } from './State';
import { Tracker } from './Tracker';
import { Util } from './util';
const withSelected = (fn) => () => {
    const selected = State.get().selected;
    if (selected) {
        fn(selected);
    }
};
const remove = (actor) => {
    State.update(state => {
        let tracker = state.tracker;
        if (Tracker.current(tracker).uid === actor.uid) {
            tracker = Tracker.next(tracker);
        }
        tracker = Tracker.remove(tracker, actor);
        return { tracker, selected: Tracker.current(tracker) };
    });
};
const jump = (actor) => {
    State.update(state => {
        const tracker = Tracker.jump(state.tracker, actor);
        return { tracker };
    });
};
const next = () => {
    State.update(state => {
        const tracker = Tracker.next(state.tracker);
        return { tracker, selected: Tracker.current(tracker) };
    });
};
const previous = () => {
    State.update(state => {
        const tracker = Tracker.previous(state.tracker);
        return { tracker, selected: Tracker.current(tracker) };
    });
};
const changeHitPoints = (num) => {
    State.update(state => {
        if (state.selected && state.selected.npc) {
            const hitPoints = state.selected.npc.hitPoints + num;
            const actor = Util.merge(state.selected, { npc: { hitPoints } });
            const tracker = Tracker.update(state.tracker, actor);
            if (state.selected.npc.autokill && hitPoints <= 0) {
                API.removeSelected();
            }
            else {
                return { tracker, selected: actor };
            }
        }
    });
};
export const API = {
    remove,
    jump,
    next,
    previous,
    changeHitPoints,
    removeSelected: withSelected(remove),
    jumpSelected: withSelected(jump),
    undo: State.undo,
    redo: State.redo,
};
