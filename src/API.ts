import { State } from './State';
import { Tracker } from './Tracker';
import { Actor } from './actor';
import { Util } from './util';

const overkillMinimum = 20;

const withSelected = (fn: (actor: Actor) => any) => () => {
    const selected = State.get().selected;
    if (selected) {
        fn(selected);
    }
};

const print = (str: string) =>
    State.update(() => [{}, str]);

const duplicate = (actor: Actor) => {
    State.update(state => {
        const newActor = Actor.init(actor.template);
        console.log(actor.template);
        newActor.name = Tracker.getUniqueName(state.tracker, newActor.name);
        const tracker = Tracker.insert(state.tracker, newActor, { after: actor });
        return [
            { tracker },
            `${actor.name} was duplciated as ${newActor.name}.`,
            { success: true },
        ];
    });
};

const remove = (actor: Actor, message: string = `${actor.name} has been removed.`) => {
    State.update(state => {
        const tracker = Tracker.remove(state.tracker, actor);
        return [
            { tracker, selected: Tracker.current(tracker) || null },
            message,
            { success: true }
        ]; 
    });
};

const jump = (actor: Actor) => {
    State.update(state => {
        const tracker = Tracker.jump(state.tracker, actor);
        if (tracker !== state.tracker) {
            return [
                { tracker },
                `It is now ${Tracker.current(tracker).name}'s turn.`,
                { success: true },
            ];
        }
    });
};

const next = () => {
    State.update(state => {
        if (state.tracker.actors.length > 0) {
            const tracker = Tracker.next(state.tracker);
            return [
                { tracker, selected: Tracker.current(tracker) },
                `It is now ${Tracker.current(tracker).name}'s turn.`,
                { success: true },
            ];
        }
    });
};

const previous = () => {
    State.update(state => {
        if (state.tracker.actors.length > 0) {
            const tracker = Tracker.previous(state.tracker);
            return [
                { tracker, selected: Tracker.current(tracker) },
                `It is now ${Tracker.current(tracker).name}'s turn.`,
                { success: true },
            ];
        }
    });
};

const reset = () => {
    State.update(state => {
        const tracker = Tracker.reset(state.tracker);
        return [
            { tracker, selected: Tracker.current(tracker) },
            `Turn reset.<br />It is now ${Tracker.current(State.get().tracker).name}'s turn.`,
            { success: true },
        ];
    });
};

const reboot = () => {
    State.update(() => [{ tracker: Tracker.init(), selected: null, output: [] }]);
};

const changeHitPoints = (num: number) => {
    State.update(state => {
        if (state.selected && state.selected.npc) {
            const hitPoints = state.selected.npc.hitPoints + num;
            const actor = Util.merge(state.selected, { npc: { hitPoints } });
            const tracker = Tracker.update(state.tracker, actor);
            return [
                { tracker, selected: actor },
                `${actor.name} took ${-num} damage.`, 
                { success: true },
            ];
        } else {
            return [ {}, 'Hit points cannot be changed.', { error: true } ];
        }
    });
    State.update(state => {
        if (state.selected && state.selected.npc) {
            if (state.selected 
                && state.selected.npc 
                && state.selected.npc.autokill
                && state.selected.npc.hitPoints <= 0) {
                API.remove(state.selected, `${state.selected.name} has died.`);
                if (-state.selected.npc.hitPoints > overkillMinimum) {
                    return [ {}, `${state.selected.name} took ${-state.selected.npc.hitPoints} overkill damage.`, { error: true } ]
                }
            }
        }
    });
};

const clear = () => {
    State.update(() => {
        return [ { output: [], }, 'Output cleared.', { success: true } ];
    });
};

const help = () => {
    API.print($('#help').html());
};

export const API = {
    duplicate,
    remove,
    jump,
    next,
    previous,
    reset,
    reboot,
    changeHitPoints,
    print,
    clear,
    help,
    duplicateSelected: withSelected(duplicate),
    removeSelected: withSelected(remove),
    jumpSelected: withSelected(jump),
    undo: State.undo,
    redo: State.redo,
}