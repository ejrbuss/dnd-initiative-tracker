import { Actor } from "./actor";
import { Lang } from "./Lang";
import { Util } from "./util";
let templates = {
    Player: {
        name: 'Player',
        initiative: 'd20',
        description: '',
        npc: null,
    },
    Goblin: {
        name: 'Goblin',
        initiative: 'd20 + 2',
        description: `
# A title
Some notes and a list
 - of a
 - of b
 - of c
        `,
        npc: {
            autokill: true,
            hitPoints: 'max 7, 2d6',
        }
    }
};
const get = (prefix) => {
    const template = {};
    template.name = $(`#${prefix}-name`).val();
    template.initiative = $(`#${prefix}-initiative`).val();
    template.description = $(`#${prefix}-description`).val();
    if ($(`#${prefix}-npc`).is(':checked')) {
        template.npc = {
            autokill: $(`#${prefix}-autokill`).is(':checked'),
            hitPoints: $(`#${prefix}-hit-points`).val(),
        };
    }
    return template;
};
const set = (template, prefix) => {
    $(`#${prefix}-name`).val(template.name);
    $(`#${prefix}-initiative`).val(template.initiative);
    $(`#${prefix}-description`).val(template.description);
    if (!!template.npc !== $(`#${prefix}-npc`).is(':checked')) {
        $(`#${prefix}-npc`).click();
    }
    if (!!(template.npc && template.npc.autokill) !== $(`#${prefix}-autokill`).is(':checked')) {
        $(`#${prefix}-autokill`).click();
    }
    if (template.npc) {
        $(`#${prefix}-hit-points`).val(template.npc.hitPoints);
    }
};
const update = () => {
    $('#add-template').html(Object.keys(templates).map(name => `<a class="dropdown-item" href="#">${name}</p>`).join(''));
    $('#add-template a').click(function () {
        const name = $(this).text();
        const template = templates[name];
        set(template, 'add');
    });
};
const jsonImport = (json) => {
    templates = JSON.parse(json);
    update();
};
const jsonExport = () => JSON.stringify(templates);
const save = (template) => {
    templates[template.name] = template;
    update();
};
const toActor = (template) => {
    const actor = Util.merge(Actor.init(), {
        name: template.name,
        initiative: parseFloat(Lang.evaluate(template.initiative.toString())),
        description: template.description,
        npc: template.npc ? {
            autokill: template.npc.autokill,
            hitPoints: parseFloat(Lang.evaluate(template.npc.hitPoints.toString())),
        } : null,
    });
    if (Number.isNaN(actor.initiative)) {
        throw 'Invalid initiative value!';
    }
    if (actor.npc && Number.isNaN(actor.npc.hitPoints)) {
        throw 'Invalid hit points value!';
    }
    return actor;
};
export const Template = {
    all: templates,
    get,
    set,
    update,
    jsonImport,
    jsonExport,
    save,
    toActor,
};
