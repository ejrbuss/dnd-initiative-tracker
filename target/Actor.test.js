import { Actor } from './actor';
import { Util } from './util';
import { Tracker } from './Tracker';
test('Actor.init', () => {
    const actor = Actor.init();
    expect(Actor.init()).not.toEqual(Actor.init());
});
test('Actor.after', () => {
    const before = Actor.init();
    const after = Actor.after(before, Actor.init());
    expect(Util.gt(before, after, Tracker.compare)).toBe(true);
});
test('Actor.before', () => {
    const after = Actor.init();
    const before = Actor.before(after, Actor.init());
    expect(Util.lt(after, before, Tracker.compare)).toBe(true);
});
