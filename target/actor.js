import { Util } from './util';
import { Lang } from './Lang';
let uidCounter = 0;
const init = (template) => {
    const actor = {
        template,
        uid: uidCounter++,
        name: template.name,
        initiative: parseFloat(Lang.evaluate(template.initiative.toString())),
        description: template.description,
        note: '',
        npc: template.npc ? {
            autokill: template.npc.autokill,
            hitPoints: parseFloat(Lang.evaluate(template.npc.hitPoints.toString())),
        } : null,
    };
    if (Number.isNaN(actor.initiative)) {
        throw 'Invalid initiative value!';
    }
    if (actor.npc && Number.isNaN(actor.npc.hitPoints)) {
        throw 'Invalid hit points value!';
    }
    return actor;
};
const epsilon = 0.001;
const after = (a, b) => Util.merge(a, { initiative: b.initiative - epsilon });
const before = (a, b) => Util.merge(a, { initiative: b.initiative + epsilon });
export const Actor = { uidCounter, init, after, before };
