/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./target/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./target/API.js":
/*!***********************!*\
  !*** ./target/API.js ***!
  \***********************/
/*! exports provided: API */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"API\", function() { return API; });\n/* harmony import */ var _State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./State */ \"./target/State.js\");\n/* harmony import */ var _Tracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tracker */ \"./target/Tracker.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./target/util.js\");\n\n\n\nconst withSelected = (fn) => () => {\n    const selected = _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].get().selected;\n    if (selected) {\n        fn(selected);\n    }\n};\nconst remove = (actor) => {\n    _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].update(state => {\n        let tracker = state.tracker;\n        if (_Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].current(tracker).uid === actor.uid) {\n            tracker = _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].next(tracker);\n        }\n        tracker = _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].remove(tracker, actor);\n        return { tracker, selected: _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].current(tracker) };\n    });\n};\nconst jump = (actor) => {\n    _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].update(state => {\n        const tracker = _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].jump(state.tracker, actor);\n        return { tracker };\n    });\n};\nconst next = () => {\n    _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].update(state => {\n        const tracker = _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].next(state.tracker);\n        return { tracker, selected: _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].current(tracker) };\n    });\n};\nconst previous = () => {\n    _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].update(state => {\n        const tracker = _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].previous(state.tracker);\n        return { tracker, selected: _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].current(tracker) };\n    });\n};\nconst changeHitPoints = (num) => {\n    _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].update(state => {\n        if (state.selected && state.selected.npc) {\n            const hitPoints = state.selected.npc.hitPoints + num;\n            const actor = _util__WEBPACK_IMPORTED_MODULE_2__[\"Util\"].merge(state.selected, { npc: { hitPoints } });\n            const tracker = _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].update(state.tracker, actor);\n            if (state.selected.npc.autokill && hitPoints <= 0) {\n                API.removeSelected();\n            }\n            else {\n                return { tracker, selected: actor };\n            }\n        }\n    });\n};\nconst API = {\n    remove,\n    jump,\n    next,\n    previous,\n    changeHitPoints,\n    removeSelected: withSelected(remove),\n    jumpSelected: withSelected(jump),\n    undo: _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].undo,\n    redo: _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].redo,\n};\n\n\n//# sourceURL=webpack:///./target/API.js?");

/***/ }),

/***/ "./target/Lang.js":
/*!************************!*\
  !*** ./target/Lang.js ***!
  \************************/
/*! exports provided: evaluate, Lang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"evaluate\", function() { return evaluate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Lang\", function() { return Lang; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./target/util.js\");\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./API */ \"./target/API.js\");\n\n\nconst evaluate = (source) => {\n    const transform = source\n        // Remove whitespace\n        .replace(/\\s*/g, '')\n        // Dice replacement\n        .replace(/(\\d+)d(\\d+)/g, (_, mult, die) => {\n        return (parseInt(mult) * _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].rand(1, parseInt(die) + 1)).toString();\n    })\n        .replace(/d(\\d+)/g, (_, die) => {\n        return _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].rand(1, parseInt(die) + 1).toString();\n    })\n        // Perform math ops in order */+-\n        .replace(/(\\d+)\\*(\\d+)/g, (_, a, b) => {\n        return (parseInt(a) * parseInt(b)).toString();\n    })\n        .replace(/(\\d+)\\/(\\d+)/g, (_, a, b) => {\n        return (parseInt(a) / parseInt(b)).toString();\n    })\n        .replace(/(\\d+)\\+(\\d+)/g, (_, a, b) => {\n        return (parseInt(a) + parseInt(b)).toString();\n    })\n        .replace(/(\\d+)\\-(\\d+)/g, (_, a, b) => {\n        return (parseInt(a) - parseInt(b)).toString();\n    })\n        // Unwrap parens last\n        .replace(/\\((\\d+)\\)/g, (_, num) => {\n        return num;\n    })\n        .replace(/hp\\+(\\d+)/g, (_, num) => {\n        _API__WEBPACK_IMPORTED_MODULE_1__[\"API\"].changeHitPoints(parseInt(num));\n        return '';\n    })\n        .replace(/hp-(\\d+)/g, (_, num) => {\n        _API__WEBPACK_IMPORTED_MODULE_1__[\"API\"].changeHitPoints(-parseInt(num));\n        return '';\n    })\n        .replace(/remove/g, () => {\n        _API__WEBPACK_IMPORTED_MODULE_1__[\"API\"].removeSelected();\n        return '';\n    })\n        .replace(/next/g, () => {\n        _API__WEBPACK_IMPORTED_MODULE_1__[\"API\"].next();\n        return '';\n    })\n        .replace(/previous/g, () => {\n        _API__WEBPACK_IMPORTED_MODULE_1__[\"API\"].previous();\n        return '';\n    })\n        .replace(/undo/g, () => {\n        _API__WEBPACK_IMPORTED_MODULE_1__[\"API\"].undo();\n        return '';\n    })\n        .replace(/redo/g, () => {\n        _API__WEBPACK_IMPORTED_MODULE_1__[\"API\"].redo();\n        return '';\n    });\n    // Recurse on transform to fully evaluate\n    if (transform !== source) {\n        return evaluate(transform);\n    }\n    else {\n        return source;\n    }\n};\nconst Lang = { evaluate };\n\n\n//# sourceURL=webpack:///./target/Lang.js?");

/***/ }),

/***/ "./target/Render.js":
/*!**************************!*\
  !*** ./target/Render.js ***!
  \**************************/
/*! exports provided: Render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Render\", function() { return Render; });\n/* harmony import */ var _State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./State */ \"./target/State.js\");\n/* harmony import */ var _Tracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tracker */ \"./target/Tracker.js\");\n\n\nconst update = (state) => {\n    updateInitiativeTable(state);\n    updateDetails(state);\n    updateOutput(state);\n    // Needs to be reapplied whenever the table rows update\n    $('.actor-row').click(function (e) {\n        _State__WEBPACK_IMPORTED_MODULE_0__[\"State\"].update(state => {\n            const id = parseInt(this.id);\n            return { selected: state.tracker.actors.find(actor => actor.uid === id) };\n        });\n    });\n};\nconst updateInitiativeTable = (state) => {\n    $('#initiative-table').html('');\n    for (const actor of _Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].seq(state.tracker)) {\n        $('#initiative-table').append(`\n            <tr id=\"${actor.uid}\" class=\"actor-row ${_Tracker__WEBPACK_IMPORTED_MODULE_1__[\"Tracker\"].current(state.tracker).uid === actor.uid\n            ? 'table-primary' :\n            state.selected && state.selected.uid === actor.uid\n                ? 'table-active'\n                : ''}\">\n                <td>${actor.name}</td>\n                <td>${actor.npc ? actor.npc.hitPoints : ''}</td>\n            </tr>\n        `);\n    }\n};\nconst updateDetails = (state) => {\n    if (state.selected) {\n        const actor = state.selected;\n        $('#details').show();\n        $('#name').text(actor.name);\n        $('#initiative').text(actor.initiative.toFixed(0));\n        $('#hit-points').text(actor.npc ? actor.npc.hitPoints : 'N/A');\n        $('#description').text(actor.description);\n        $('#notes').val(actor.note);\n    }\n    else {\n        $('#details').hide();\n        $('#name').text('');\n    }\n};\nconst updateOutput = (state) => {\n    $('#output').html(state.output.join('<br />'));\n};\nconst Render = { update };\n\n\n//# sourceURL=webpack:///./target/Render.js?");

/***/ }),

/***/ "./target/State.js":
/*!*************************!*\
  !*** ./target/State.js ***!
  \*************************/
/*! exports provided: State */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"State\", function() { return State; });\n/* harmony import */ var _Tracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tracker */ \"./target/Tracker.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./target/util.js\");\n/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Render */ \"./target/Render.js\");\n\n\n\nconst states = [\n    { tracker: _Tracker__WEBPACK_IMPORTED_MODULE_0__[\"Tracker\"].init(), output: [] }\n];\nconst undoStack = [];\nconst merge = (partial) => {\n    states.push(_util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(get(), partial));\n    console.log('New State: ', get());\n};\nconst update = (fn) => {\n    const newState = fn(get());\n    if (newState) {\n        merge(newState);\n    }\n    _Render__WEBPACK_IMPORTED_MODULE_2__[\"Render\"].update(get());\n};\nconst get = () => states[states.length - 1];\nconst undo = () => {\n    if (states.length > 1) {\n        const state = states.pop();\n        if (state) {\n            undoStack.push(state);\n        }\n    }\n    _Render__WEBPACK_IMPORTED_MODULE_2__[\"Render\"].update(get());\n};\nconst redo = () => {\n    const state = undoStack.pop();\n    if (state) {\n        states.push(state);\n    }\n    _Render__WEBPACK_IMPORTED_MODULE_2__[\"Render\"].update(get());\n};\nconst State = { update, merge, get, undo, redo };\n\n\n//# sourceURL=webpack:///./target/State.js?");

/***/ }),

/***/ "./target/Tracker.js":
/*!***************************!*\
  !*** ./target/Tracker.js ***!
  \***************************/
/*! exports provided: Tracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tracker\", function() { return Tracker; });\n/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor */ \"./target/actor.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./target/util.js\");\n\n\nconst init = () => ({\n    actors: [],\n    current: 0,\n});\nconst compare = (a, b) => {\n    if (a.initiative > b.initiative) {\n        return -1;\n    }\n    if (a.initiative < b.initiative) {\n        return 1;\n    }\n    return 0;\n};\nconst insert = (tracker, actor, options) => {\n    if (options && options.before) {\n        actor = _actor__WEBPACK_IMPORTED_MODULE_0__[\"Actor\"].before(actor, options.before);\n    }\n    if (options && options.after) {\n        actor = _actor__WEBPACK_IMPORTED_MODULE_0__[\"Actor\"].after(actor, options.after);\n    }\n    if (options && options.first) {\n        actor = _actor__WEBPACK_IMPORTED_MODULE_0__[\"Actor\"].before(actor, tracker.actors[0]);\n    }\n    if (options && options.immediately) {\n        actor = _actor__WEBPACK_IMPORTED_MODULE_0__[\"Actor\"].before(actor, tracker.actors[tracker.current]);\n    }\n    const actors = [...tracker.actors, actor];\n    const newIdx = actors.indexOf(actor);\n    if (options && options.immediately || newIdx > tracker.current) {\n        return _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(tracker, { actors });\n    }\n    return next(_util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(tracker, { actors }));\n};\nconst current = (tracker) => tracker.actors[tracker.current];\nconst next = (tracker) => {\n    return _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(tracker, { current: (tracker.current + 1) % (tracker.actors.length || 1) });\n};\nconst previous = (tracker) => {\n    return _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(tracker, { current: (tracker.current + tracker.actors.length - 1) % (tracker.actors.length || 1) });\n};\nconst seq = function* (tracker) {\n    let idx = tracker.current;\n    let start = undefined;\n    for (;;) {\n        const actor = tracker.actors[idx];\n        if (actor === start) {\n            return;\n        }\n        if (!start) {\n            start = actor;\n        }\n        if (idx === tracker.actors.length) {\n            idx = 0;\n        }\n        else {\n            yield actor;\n            idx++;\n        }\n    }\n};\nconst update = (tracker, actor) => _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(tracker, { actors: tracker.actors.map(oldActor => {\n        if (oldActor.uid === actor.uid) {\n            return actor;\n        }\n        else {\n            return oldActor;\n        }\n    }) });\nconst remove = (tracker, actor) => _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(tracker, { actors: tracker.actors.filter(oldActor => {\n        return oldActor.uid !== actor.uid;\n    }) });\nconst jump = (tracker, actor) => {\n    while (current(tracker).uid !== actor.uid) {\n        tracker = next(tracker);\n    }\n    return tracker;\n};\nconst Tracker = {\n    init,\n    compare,\n    insert,\n    current,\n    next,\n    previous,\n    seq,\n    update,\n    remove,\n    jump,\n};\n\n\n//# sourceURL=webpack:///./target/Tracker.js?");

/***/ }),

/***/ "./target/actor.js":
/*!*************************!*\
  !*** ./target/actor.js ***!
  \*************************/
/*! exports provided: Actor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Actor\", function() { return Actor; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./target/util.js\");\n\nlet uidCounter = 0;\nconst init = () => ({\n    uid: uidCounter++,\n    name: '',\n    initiative: 0,\n    description: '',\n    note: '',\n    npc: null,\n});\nconst epsilon = 0.001;\nconst after = (a, b) => _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].merge(a, { initiative: b.initiative - epsilon });\nconst before = (a, b) => _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].merge(a, { initiative: b.initiative + epsilon });\nconst Actor = { init, after, before };\n\n\n//# sourceURL=webpack:///./target/actor.js?");

/***/ }),

/***/ "./target/index.js":
/*!*************************!*\
  !*** ./target/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Tracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tracker */ \"./target/Tracker.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./target/util.js\");\n/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actor */ \"./target/actor.js\");\n/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Lang */ \"./target/Lang.js\");\n/* harmony import */ var _State__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./State */ \"./target/State.js\");\n/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Render */ \"./target/Render.js\");\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./API */ \"./target/API.js\");\n\n\n\n\n\n\n\n// Provide console access to APIs\nconst global = window;\nglobal.Tracker = _Tracker__WEBPACK_IMPORTED_MODULE_0__[\"Tracker\"];\nglobal.Actor = _actor__WEBPACK_IMPORTED_MODULE_2__[\"Actor\"];\nglobal.Util = _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"];\nglobal.Lang = _Lang__WEBPACK_IMPORTED_MODULE_3__[\"Lang\"];\nglobal.State = _State__WEBPACK_IMPORTED_MODULE_4__[\"State\"];\nglobal.Render = _Render__WEBPACK_IMPORTED_MODULE_5__[\"Render\"];\nglobal.API = _API__WEBPACK_IMPORTED_MODULE_6__[\"API\"];\n// Jquery initializations\n$(document).ready(() => {\n    // Process commands\n    $('#command').keypress(e => {\n        if (e.which == 13) {\n            _State__WEBPACK_IMPORTED_MODULE_4__[\"State\"].update(state => {\n                const output = _Lang__WEBPACK_IMPORTED_MODULE_3__[\"Lang\"].evaluate($('#command').val());\n                $('#command').val('');\n                if (output) {\n                    return { output: [output, ...state.output] };\n                }\n            });\n        }\n    });\n    // Hide/show npc health\n    $('#add-hit-points-group').hide();\n    $('#add-npc').change(() => {\n        if ($('#add-npc').is(':checked')) {\n            $('#add-hit-points-group').show();\n        }\n        else {\n            $('#add-hit-points-group').hide();\n        }\n    });\n    // Handle add actors dialog pane\n    $('#add-finished').click(() => {\n        const actor = _actor__WEBPACK_IMPORTED_MODULE_2__[\"Actor\"].init();\n        actor.name = $('#add-name').val();\n        actor.initiative = parseInt($('#add-initiative').val()) || 0;\n        actor.description = $('#add-description').val();\n        actor.npc = $('#add-npc').is(':checked') ? {\n            autokill: $('#add-autokill').is(':checked'),\n            hitPoints: parseInt($('#add-hit-points').val()),\n        } : null;\n        _State__WEBPACK_IMPORTED_MODULE_4__[\"State\"].update(state => {\n            return { tracker: _Tracker__WEBPACK_IMPORTED_MODULE_0__[\"Tracker\"].insert(state.tracker, actor) };\n        });\n    });\n    // Handle buttons\n    $('#next').click(() => _API__WEBPACK_IMPORTED_MODULE_6__[\"API\"].next());\n    $('#previous').click(() => _API__WEBPACK_IMPORTED_MODULE_6__[\"API\"].previous());\n    $('#remove').click(() => _API__WEBPACK_IMPORTED_MODULE_6__[\"API\"].removeSelected());\n    $('#jump').click(() => _API__WEBPACK_IMPORTED_MODULE_6__[\"API\"].jumpSelected());\n    // Handle notes update\n    $('#notes').change(() => {\n        _State__WEBPACK_IMPORTED_MODULE_4__[\"State\"].update(state => {\n            if (state.selected) {\n                const actor = _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].merge(state.selected, { note: $('#notes').val() });\n                const tracker = _Tracker__WEBPACK_IMPORTED_MODULE_0__[\"Tracker\"].update(state.tracker, actor);\n                return { tracker, selected: actor };\n            }\n        });\n    });\n    // Initial Render\n    _Render__WEBPACK_IMPORTED_MODULE_5__[\"Render\"].update(_State__WEBPACK_IMPORTED_MODULE_4__[\"State\"].get());\n});\n\n\n//# sourceURL=webpack:///./target/index.js?");

/***/ }),

/***/ "./target/util.js":
/*!************************!*\
  !*** ./target/util.js ***!
  \************************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Util\", function() { return Util; });\nconst merge = (full, partial) => {\n    if (typeof partial === 'undefined') {\n        return full;\n    }\n    if (Array.isArray(full)\n        || typeof full !== 'object'\n        || typeof partial !== 'object'\n        || full === null\n        || partial === null) {\n        return partial;\n    }\n    const copy = {};\n    Object.keys(full).forEach(key => {\n        copy[key] = merge(full[key], partial[key]);\n    });\n    Object.keys(partial).forEach(key => {\n        copy[key] = merge(full[key], partial[key]);\n    });\n    return copy;\n};\nconst rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;\nconst eq = (a, b, comparator) => {\n    if (comparator) {\n        return comparator(a, b) === 0;\n    }\n    return JSON.stringify(a) === JSON.stringify(b);\n};\nconst lt = (a, b, comparator) => comparator(a, b) > 0;\nconst gt = (a, b, comparator) => comparator(a, b) < 0;\nconst Util = {\n    merge,\n    eq,\n    lt,\n    gt,\n    rand,\n};\n\n\n//# sourceURL=webpack:///./target/util.js?");

/***/ })

/******/ });