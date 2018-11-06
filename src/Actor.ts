import { Util } from './util';

let uidCounter = 0;

export interface Actor {
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

const init = (): Actor => ({
    uid: uidCounter++,
    name: '',
    initiative: 0,
    description: '',
    note: '',
    npc: null,
});

const epsilon = 0.001;

const after = (a: Actor, b: Actor): Actor =>
    Util.merge(a, { initiative: b.initiative - epsilon });

const before = (a: Actor, b: Actor): Actor =>
    Util.merge(a, { initiative: b.initiative + epsilon });

export const Actor = { init, after, before };