import { Util } from './util';
import { Template } from './Template';
import { Lang } from './Lang';

let uidCounter = 0;

export interface Actor {
    template: Template;
    uid: number;
    name: string;
    initiative: number;
    description: string;
    note: string;
    npc: {
        autokill: boolean;
        hitPoints: number;
    } | null;
}

const init = (template: Template): Actor => {
    const actor: Actor = {
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

const after = (a: Actor, b: Actor): Actor =>
    Util.merge(a, { initiative: b.initiative - epsilon });

const before = (a: Actor, b: Actor): Actor =>
    Util.merge(a, { initiative: b.initiative + epsilon });

export const Actor = { uidCounter, init, after, before };