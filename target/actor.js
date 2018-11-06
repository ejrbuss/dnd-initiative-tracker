import { Util } from './util';
let uidCounter = 0;
const init = () => ({
    uid: uidCounter++,
    name: '',
    initiative: 0,
    description: '',
    note: '',
    npc: null,
});
const epsilon = 0.001;
const after = (a, b) => Util.merge(a, { initiative: b.initiative - epsilon });
const before = (a, b) => Util.merge(a, { initiative: b.initiative + epsilon });
export const Actor = { init, after, before };
