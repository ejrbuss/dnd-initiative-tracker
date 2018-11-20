import { Actor } from './actor';
import { Util } from './util';
const init = () => ({
    actors: [],
    current: 0,
});
const compare = (a, b) => {
    if (a.initiative > b.initiative) {
        return -1;
    }
    if (a.initiative < b.initiative) {
        return 1;
    }
    return 0;
};
const insert = (tracker, actor, options) => {
    if (options && options.before) {
        actor = Actor.before(actor, options.before);
    }
    if (options && options.after) {
        actor = Actor.after(actor, options.after);
    }
    if (options && options.first) {
        actor = Actor.before(actor, tracker.actors[0]);
    }
    if (options && options.immediately) {
        actor = Actor.before(actor, tracker.actors[tracker.current]);
    }
    const actors = [...tracker.actors, actor].sort(compare);
    const newIdx = actors.indexOf(actor);
    if (options && options.immediately || newIdx > tracker.current) {
        return Util.merge(tracker, { actors });
    }
    return next(Util.merge(tracker, { actors }));
};
const current = (tracker) => tracker.actors[tracker.current];
const next = (tracker) => {
    return Util.merge(tracker, { current: (tracker.current + 1) % (tracker.actors.length || 1) });
};
const previous = (tracker) => {
    return Util.merge(tracker, { current: (tracker.current + tracker.actors.length - 1) % (tracker.actors.length || 1) });
};
const reset = (tracker) => {
    return Util.merge(tracker, { current: 0 });
};
const seq = function* (tracker) {
    let idx = tracker.current;
    let start = undefined;
    for (;;) {
        const actor = tracker.actors[idx];
        if (actor === start) {
            return;
        }
        if (!start) {
            start = actor;
        }
        if (idx === tracker.actors.length) {
            idx = 0;
        }
        else {
            yield actor;
            idx++;
        }
    }
};
const update = (tracker, actor) => {
    const currentActor = current(tracker);
    return jump(Util.merge(tracker, { actors: tracker.actors.map(oldActor => {
            if (oldActor.uid === actor.uid) {
                return actor;
            }
            else {
                return oldActor;
            }
        }).sort(compare) }), currentActor);
};
const remove = (tracker, actor) => {
    if (tracker.actors.findIndex(oldActor => oldActor.uid === actor.uid) < tracker.current) {
        tracker = previous(tracker);
    }
    tracker = Util.merge(tracker, { actors: tracker.actors.filter(oldActor => {
            return oldActor.uid !== actor.uid;
        }) });
    if (tracker.current >= tracker.actors.length) {
        tracker.current = 0;
    }
    return tracker;
};
const jump = (tracker, actor) => {
    while (current(tracker).uid !== actor.uid) {
        tracker = next(tracker);
    }
    return tracker;
};
const uniqueName = (tracker, name) => !tracker.actors.some(actor => actor.name === name);
const getUniqueName = (tracker, name) => {
    if (uniqueName(tracker, name)) {
        return name;
    }
    else {
        name = /.*\d+/.test(name)
            ? name.replace(/(.*?)(\d+)/g, (_, pre, num) => pre + (parseInt(num) + 1).toString())
            : name + ' 2';
        return getUniqueName(tracker, name);
    }
};
export const Tracker = {
    init,
    compare,
    insert,
    current,
    next,
    previous,
    reset,
    seq,
    update,
    remove,
    jump,
    uniqueName,
    getUniqueName,
};
