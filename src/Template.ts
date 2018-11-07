export interface Template {
    name: string;
    initiative: string | number;
    description: string;
    npc: {
        autokill: boolean;
        hitPoints: string | number;
    } | null;
}

let templates: { [name: string]: Template } = {"Player":{"name":"Player","initiative":"","description":"","npc":null},"Goblin":{"name":"Goblin","initiative":"d20 + 2","description":"| STR | DEX | CON | INT | WIS | CHA |\n|:---:|:---:|:---:|:---:|:---:|:---:|\n| 8 (-1) | 14 (+2) | 10 (+0) | 10 (+0) | 8 (-1) | 8 (-1) |\n\n**Armor Class** 15 (Leather Armor, Shield)  \n**Speed** 30 ft.  \n**Skills** Stealth +6  \n**Senses** Darkvision 60 ft., passive Perception 9  \n**Languages** Common, Goblin  \n\n**Nimble Escape.** The goblin can take the Disengage or Hide action as a bonus action on each of its turns.  \n**Scimitar.** Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: (1d6 + 2) slashing damage.  \n**Shortbow.** Ranged Weapon Attack: +4 to hit, reach 80/320 ft., one target. Hit: (1d6 + 2) piercing damage.","npc":{"autokill":true,"hitPoints":"max 7, 2d6"}}};

const load = () => {
    const result = localStorage.getItem('templates');
    if (result) {
        jsonImport(result);
    } else {
        update();
    }
};

const get = (prefix: string): Template => {
    const template: Template = {} as any;
    template.name = $(`#${prefix}-name`).val() as string;
    template.initiative = $(`#${prefix}-initiative`).val() as string;
    template.description = $(`#${prefix}-description`).val() as string;
    template.npc = null;
    if ($(`#${prefix}-npc`).is(':checked')) {
        template.npc = {
            autokill: $(`#${prefix}-autokill`).is(':checked'),
            hitPoints: $(`#${prefix}-hit-points`).val() as string,
        };
    }
    return template;
};

const set = (template: Template, prefix: string) => {
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
    localStorage.setItem('templates', jsonExport());
    $('#export-json').val(jsonExport());
    $('#add-template').html(Object.keys(templates).map(name => 
        `<a class="dropdown-item" href="#">${name}</p>`    
    ).join(''));
    $('#add-template a').click(function () {
        const name = $(this).text();
        const template = templates[name];
        set(template, 'add');
    });
};

const jsonImport = (json: string) => {
    templates = JSON.parse(json);
    update();
};

const jsonExport = (): string =>
    JSON.stringify(templates);

const save = (template: Template) => {
    templates[template.name] = template;
    update();
};

export const Template = {
    all: templates,
    get,
    set,
    update,
    load,
    jsonImport,
    jsonExport,
    save,
};