import { State } from './State';
import { Tracker } from './Tracker';

const update = (state: State) => {
    updateInitiativeTable(state);
    updateDetails(state);
    updateOutput(state);

    // Needs to be reapplied whenever the table rows update
    $('.actor-row').click(function(e) {
        State.update(state => {
            const id = parseInt(this.id);
            return { selected: state.tracker.actors.find(actor => actor.uid === id) };
        });
    });
};

const updateInitiativeTable = (state: State) => {
    $('#initiative-table').html('');
    for (const actor of Tracker.seq(state.tracker)) {
        $('#initiative-table').append(`
            <tr id="${actor.uid}" class="actor-row ${
                Tracker.current(state.tracker).uid === actor.uid 
                    ? 'table-primary' : 
                state.selected && state.selected.uid === actor.uid 
                    ? 'table-active'
                    : ''
                }">
                <td>${actor.name}</td>
                <td>${actor.npc ? actor.npc.hitPoints : ''}</td>
            </tr>
        `);
    }
};

const updateDetails = (state: State) => {
    if (state.selected) {
        const actor = state.selected;
        $('#details').show();
        $('#name').text(actor.name);
        $('#initiative').text(actor.initiative.toFixed(0));
        $('#hit-points').text(actor.npc ? actor.npc.hitPoints : 'N/A');
        $('#description').text(actor.description);
        $('#notes').val(actor.note);
    } else {
        $('#details').hide();
        $('#name').text('');
    }
};

const updateOutput = (state: State) => {
    $('#output').html(state.output.join('<br />'));
};

export const Render = { update };