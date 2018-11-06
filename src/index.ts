import { Tracker } from './Tracker';
import { Util } from './util';
import { Actor } from './actor';
import { Lang } from './Lang';
import { State } from './State';
import { Render } from './Render';
import { API } from './API';
import { Template } from './Template';

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
        if (e.which === Util.keycodes.enter) {
            const input = $('#command').val() as string
            const output = Lang.evaluate(input, API);
            $('#command').val('');
            if (output) {
                API.print(`${input} <i class="fas fa-arrow-right"></i> ${output}`);
            }
        }
    });

    // Hide/show parts
    $('#add-hit-points-group').hide();
    $('#add-error').hide();
    $('#add-success').hide();
    $('#edit-error').hide();
    $('#import-error').hide();

    $('#add-npc').change(() => {
        if ($('#add-npc').is(':checked')) {
            $('#add-hit-points-group').show();
        } else {
            $('#add-hit-points-group').hide();
        }
    });
    
    // Handle add actors dialog pane
    $('#add-finished').click(() => {
        $('#add-error').hide();
        $('#add-success').hide();
        try {
            State.update(state => {
                const actor = Actor.init(Template.get('add'));
                actor.name = Tracker.getUniqueName(state.tracker, actor.name);
                Template.set(actor, 'edit');
                return [
                    { tracker: Tracker.insert(state.tracker, actor), selected: actor },
                    `${actor.name} added.`,
                    { success: true },
                ];
            });
            ($('#add') as any).modal('hide');
        } catch(err) {
            $('#add-error').html(err);
            $('#add-error').show();
        }
    });

    $('#add-save').click(() => {
        const actor = Template.get('add');
        Template.save(actor);
        $('#add-success').html('Template saved.');
        $('#add-success').show();
    });

    $('#edit-finished').click(() => {
        $('#edit-error').hide();
        try {
            State.update(state => {
                if (state.selected) {
                    const actor = Actor.init(Template.get('edit'));
                    actor.uid = state.selected.uid;
                    const tracker = Tracker.update(state.tracker, actor);
                    return [
                        { tracker, selected: actor },
                        `${actor.name} updated.`,
                        { success: true },
                    ];
                }
            });
            ($('#edit') as any).modal('hide');
        } catch(err) {
            $('#edit-error').html(err);
            $('#edit-error').show();
        }
    });

    // Handle buttons
    $('#reset').click(() => API.reset());
    $('#next').click(() => API.next());
    $('#previous').click(() => API.previous());
    $('#remove').click(() => API.removeSelected());
    $('#jump').click(() => API.jumpSelected());
    $('#duplicate').click(() => API.duplicateSelected());

    // Handle notes update
    $('#notes').change(() => {
        State.update(state => {
            if (state.selected) {
                const actor = Util.merge(state.selected, { note: $('#notes').val() as string })
                const tracker = Tracker.update(state.tracker, actor);
                return [
                    { tracker, selected: actor }, 
                    'Notes update.', 
                    { success: true },
                ];
            }
        });
    });

    // Import templates
    $('#import-finished').click(() => {
        $('#import-error').hide();
        try {
            console.log($('#import-json').val());
            Template.jsonImport($('#import-json').val() as string);
            ($('#import') as any).modal('hide');
        } catch(err) {
            $('#import-error').html(err);
            $('#import-error').show();
        }
    });

    // Initial Render
    Render.update(State.get());
    // Initial Templates
    Template.update();
});