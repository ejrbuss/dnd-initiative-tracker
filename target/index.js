import { Tracker } from './Tracker';
import { Util } from './util';
import { Actor } from './actor';
import { Lang } from './Lang';
import { State } from './State';
import { Render } from './Render';
import { API } from './API';
import { Template } from './Template';
import { Keycodes } from './Keycodes';
// Provide console access to APIs
const global = window;
global.Tracker = Tracker;
global.Actor = Actor;
global.Util = Util;
global.Lang = Lang;
global.State = State;
global.Render = Render;
global.Template = Template;
global.API = API;
// Jquery initializations
$(document).ready(() => {
    let commandsUp = [];
    let commandsDown = [];
    // Process commands
    $('#command').keydown(e => {
        if (e.which === Keycodes.enter) {
            const input = $('#command').val();
            const output = Lang.evaluate(input, API);
            commandsUp.push(input);
            commandsUp = commandsUp.filter(command => command);
            commandsDown = commandsDown.filter(command => command);
            $('#command').val('');
            if (output) {
                API.print(`${input} <i class="fas fa-arrow-right"></i> ${output}`);
            }
        }
        if (e.which === Keycodes.up) {
            console.log(commandsUp, commandsDown);
            const text = commandsUp.pop();
            if (text !== undefined) {
                commandsDown.push($('#command').val());
                $('#command').val(text);
            }
        }
        if (e.which === Keycodes.down) {
            console.log(commandsUp, commandsDown);
            const text = commandsDown.pop();
            if (text !== undefined) {
                commandsUp.push($('#command').val());
                $('#command').val(text);
            }
        }
    });
    // Hide/show parts
    $('#add-hit-points-group').hide();
    $('#add-error').hide();
    $('#add-success').hide();
    $('#edit-error').hide();
    $('#import-error').hide();
    $('#help').hide();
    $('#add-npc').change(() => {
        if ($('#add-npc').is(':checked')) {
            $('#add-hit-points-group').show();
        }
        else {
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
            $('#add').modal('hide');
        }
        catch (err) {
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
            $('#edit').modal('hide');
        }
        catch (err) {
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
                const actor = Util.merge(state.selected, { note: $('#notes').val() });
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
            Template.jsonImport($('#import-json').val());
            $('#import').modal('hide');
        }
        catch (err) {
            $('#import-error').html(err);
            $('#import-error').show();
        }
    });
    // Load from local storage
    Template.load();
    State.load();
    // Initial Render
    Render.update(State.get());
});
