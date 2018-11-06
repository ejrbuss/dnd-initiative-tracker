import { Tracker } from './Tracker';
import { Util } from './util';
import { Actor } from './actor';
import { Lang } from './Lang';
import { State } from './State';
import { Render } from './Render';
import { API } from './API';

// Provide console access to APIs
const global = window as any;

global.Tracker = Tracker;
global.Actor = Actor;
global.Util = Util;
global.Lang = Lang;
global.State = State;
global.Render = Render;
global.API = API;

// Jquery initializations
$(document).ready(() => {

    // Process commands
    $('#command').keypress(e => {
        if(e.which == 13) {
            State.update(state => {
                const output = Lang.evaluate($('#command').val() as string);
                $('#command').val('');
                if (output) {
                    return { output: [output, ...state.output] };
                }
            });
        }
    });

    // Hide/show npc health
    $('#add-hit-points-group').hide();

    $('#add-npc').change(() => {
        if ($('#add-npc').is(':checked')) {
            $('#add-hit-points-group').show();
        } else {
            $('#add-hit-points-group').hide();
        }
    });
    
    // Handle add actors dialog pane
    $('#add-finished').click(() => {
        const actor = Actor.init();
        actor.name = $('#add-name').val() as string;
        actor.initiative = parseInt($('#add-initiative').val() as string) || 0;
        actor.description = $('#add-description').val() as string;
        actor.npc = $('#add-npc').is(':checked') ? { 
            autokill: $('#add-autokill').is(':checked'),
            hitPoints: parseInt($('#add-hit-points').val() as string),
        } : null;
        State.update(state => {
            return { tracker: Tracker.insert(state.tracker, actor) };
        });
    });

    // Handle buttons
    $('#next').click(() => API.next());
    $('#previous').click(() => API.previous());
    $('#remove').click(() => API.removeSelected());
    $('#jump').click(() => API.jumpSelected());

    // Handle notes update
    $('#notes').change(() => {
        State.update(state => {
            if (state.selected) {
                const actor = Util.merge(state.selected, { note: $('#notes').val() as string })
                const tracker = Tracker.update(state.tracker, actor);
                return { tracker, selected: actor };
            }
        });
    });

    // Initial Render
    Render.update(State.get());
});