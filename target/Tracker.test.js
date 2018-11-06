import { Tracker } from './Tracker';
import { Util } from './util';
import { Actor } from './actor';
test('Tracker.init', () => {
    const t = Tracker.init();
    expect(Util.eq(t, Tracker.next(t))).toBe(true);
});
test('Tracker.insert', () => {
    const fast = Util.merge(Actor.init(), { initiative: 20 });
    const slow = Util.merge(Actor.init(), { initiative: 1 });
    let t = Tracker.init();
    t = Tracker.insert(t, slow);
    t = Tracker.insert(t, fast);
    expect(t.actors[0].uid).toEqual(fast.uid);
    expect(t.actors[1].uid).toEqual(slow.uid);
    const faster = Actor.init();
    const slower = Actor.init();
    t = Tracker.insert(t, faster, { before: fast });
    t = Tracker.insert(t, slower, { after: slow });
    expect(t.actors[0].uid).toEqual(faster.uid);
    expect(t.actors[1].uid).toEqual(fast.uid);
    expect(t.actors[2].uid).toEqual(slow.uid);
    expect(t.actors[3].uid).toEqual(slower.uid);
});
test('Tracker.current', () => {
    const actor = Actor.init();
    let t = Tracker.init();
    t = Tracker.insert(t, actor);
    expect(Tracker.current(t).uid).toEqual(actor.uid);
});
test('Tracker.next', () => {
    const a = Actor.init();
    const b = Actor.init();
    const c = Actor.init();
    let t = Tracker.init();
    t = Tracker.insert(t, a);
    t = Tracker.insert(t, b, { after: a });
    t = Tracker.insert(t, c, { after: b });
    expect(Tracker.current(t).uid).toEqual(a.uid);
    t = Tracker.next(t);
    expect(Tracker.current(t).uid).toEqual(b.uid);
    t = Tracker.next(t);
    expect(Tracker.current(t).uid).toEqual(c.uid);
    t = Tracker.next(t);
    expect(Tracker.current(t).uid).toEqual(a.uid);
});
