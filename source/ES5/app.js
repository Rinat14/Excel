'use strict';

var formulaEcxel = document.querySelector('.excel__formula');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function capitalize(string) {
	if (typeof string !== 'string') {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

var Dom = function () {
	function Dom(selector) {
		_classCallCheck(this, Dom);

		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	Dom.prototype.html = function html(_html) {
		if (typeof _html === 'string') {
			this.$el.innerHTML = _html;
			return this;
		}
		return this.$el.outherHTML.trim();
	};

	Dom.prototype.clear = function clear() {
		this.html('');
		return this;
	};

	Dom.prototype.on = function on(eventType, callback) {
		var a = document.querySelector('.excel__formula');
		var b = document.querySelector('.excel__toolbar');
		a.addEventListener(eventType, callback);
		b.addEventListener(eventType, callback);
	};

	Dom.prototype.off = function off(eventType, callback) {
		var a = document.querySelector('.excel__formula');
		var b = document.querySelector('.excel__toolbar');
		a.removeEventListener(eventType, callback);
		b.removeEventListener(eventType, callback);
	}

	Dom.prototype.append = function append(node) {
		if (node instanceof Dom) {
			node = node.$el;
		}
		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
		return this;
	};

	return Dom;
}();

function $(selector) {
	return new Dom(selector);
}

$.create = function (tagName) {
	var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	var el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};
var DomListener = function () {
	function DomListener($root) {
		var listeners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		_classCallCheck(this, DomListener);

		if (!$root) {
			throw new Error('No $root provided for DomListener');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	DomListener.prototype.initDOMListeners = function initDOMListeners() {
		var _this = this;
		var dom = new Dom();
		this.listeners.forEach(function (listener) {
			var method = getMethodName(listener);
			if (!_this[method]) {
				var name = _this.name || '';
				throw new Error(`Method ${method} is not implemented in ${name} Component`);
			}
			// todo
			// todo	                            _____
			// todo	                            /___\
			// todo	 _< _/_-_\_/_-_             \"_"/            _-_\_/_-_\_ >_
			// todo	                           __|_|__
			// todo	                          //"_-_"\\
			// todo	                         //|_____|\\
			// todo	                        // \ |_| / \\
			// todo	                       |_| |\___/| |_|
			// todo	                           ||   ||
			// todo	                           ||   ||
			// todo	                          |__| |__|
			// todo	
			// todo     It's property of Mr. Darov ----- Created by Rinat Samandarov ! ----- In Js Excel course by Vladilen Minin.
			// todo
			// todo
			_this[method] = _this[method].bind(this);
			// Это тоже самое что addEventListener();
			dom.on(listener, _this[method]);
		});
	};

	DomListener.prototype.removeDOMListeners = function removeDOMListeners() {
		var _this = this;
		var dom = new Dom();
		this.listeners.forEach(function (listener) {
			var method = getMethodName(listener);
			dom.off(listener, _this[method]);
		});
	};

	return DomListener;
}();

function getMethodName(eventName) {
	return 'on' + capitalize(eventName);
}

var ExcelComponent = function (_DomListener) {
	_inherits(ExcelComponent, _DomListener);

	function ExcelComponent($root) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, ExcelComponent);

		var _this = _possibleConstructorReturn(this, _DomListener.call(this, $root, options.listeners));

		_this.name = options.name || '';

		return _this;
	}

	ExcelComponent.prototype.toHTML = function toHTML() {
		return '';
	};

	ExcelComponent.prototype.init = function init() {
		this.initDOMListeners();
	};

	ExcelComponent.prototype.destroy = function destroy() {
		this.removeDOMListeners();
	};

	return ExcelComponent;
}(DomListener);

var Excel = function () {
	function Excel(selector, options) {
		_classCallCheck(this, Excel);

		this.$el = $(selector);
		this.components = options.components || [];
	}

	Excel.prototype.getRoot = function getRoot() {
		var $root = $.create('div', 'excel');
		this.components = this.components.map(function (Component) {
			var $el = document.createElement('div');
			var component = new Component($el);
			// DEBUG
			// if (component.name) {
			// 	window['c' + component.name] = component;
			// }
			$el.classList.add(component.toStatic());
			$el.innerHTML = component.toHTML();
			$root.append($el);
			return component;
		});
		return $root;
	};

	Excel.prototype.render = function render() {
		this.$el.append(this.getRoot());
		this.components.forEach(function (component) {
			component.init();
		});
	};

	return Excel;
}();

var Header = function (_ExcelComponent) {
	_inherits(Header, _ExcelComponent);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, _ExcelComponent.apply(this, arguments));
	}

	Header.prototype.toStatic = function toStatic() {
		return 'excel__header';
	};

	Header.prototype.toHTML = function toHTML() {
		return '\n\t\t\t<input class="input" title="Rename" type="text" name="table-name" value="Untitled spreadsheet">\n\t\t\t<div>\n\t\t\t\t<div class="button">\n\t\t\t\t\t<i title="Delete" class="material-icons">delete</i>\n\t\t\t\t</div>\n\t\t\t\t<div class="button">\n\t\t\t\t\t<i title="Exit to app" class="material-icons">exit_to_app</i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';
	};

	return Header;
}(ExcelComponent);

var Toolbar = function (_ExcelComponent2) {
	_inherits(Toolbar, _ExcelComponent2);

	Toolbar.prototype.toStatic = function toStatic() {
		return 'excel__toolbar';
	};

	function Toolbar($root) {
		_classCallCheck(this, Toolbar);

		return _possibleConstructorReturn(this, _ExcelComponent2.call(this, $root, {
			name: 'Toolbar',
			listeners: ['click']
		}));
	}

	Toolbar.prototype.toHTML = function toHTML() {
		return '\n\t\t\t<div class="button">\n\t\t\t\t<i title="Format align left" class="material-icons">format_align_left</i>\n\t\t\t</div>\n\t\t\t<div class="button">\n\t\t\t\t<i title="Format align center" class="material-icons">format_align_center</i>\n\t\t\t</div>\n\t\t\t<div class="button">\n\t\t\t\t<i title="Format align right" class="material-icons">format_align_right</i>\n\t\t\t</div>\n\t\t\t<div class="button">\n\t\t\t\t<i title="Format bold" class="material-icons">format_bold</i>\n\t\t\t</div>\n\t\t\t<div class="button">\n\t\t\t\t<i title="Format italic" class="material-icons">format_italic</i>\n\t\t\t</div>\n\t\t\t<div class="button">\n\t\t\t\t<i title="Format underlined" class="material-icons">format_underlined</i>\n\t\t\t</div>\n\t\t';
	};

	Toolbar.prototype.onClick = function onClick(event) {
		console.log(event.target);
	};

	return Toolbar;
}(ExcelComponent);

var Formula = function (_ExcelComponent3) {
	_inherits(Fromula, _ExcelComponent3);

	Fromula.prototype.toStatic = function toStatic() {
		return 'excel__formula';
	};

	function Fromula($root) {
		_classCallCheck(this, Fromula);

		return _possibleConstructorReturn(this, _ExcelComponent3.call(this, $root, {
			name: 'Formula',
			listeners: ['input', 'click']
		}));
	}

	Fromula.prototype.toHTML = function toHTML() {
		return '\n\t\t\t<div class="info">fx</div>\n\t\t\t<div class="input" contenteditable="true" spellcheck="false"></div>\n\t\t';
	};

	Fromula.prototype.onInput = function onInput(event) {
		console.log('Formula onInput: ' + event.target.textContent.trim());
	};
	Fromula.prototype.onClick = function onClick() {
		console.log('mk');
	};

	return Fromula;
}(ExcelComponent);

var CODES = {
	A: 65,
	Z: 90
}

function createCell() {
	return `
		<div class="cell" contenteditable="true"></div>
	`
}

function createCol(col) {
	return `
	<div class="column">${col}</div>
	`
}

function createRow(index, content, info, row) {
	return `
	<div class="row${row ? row : ''}">
	<div class="row-info${info ? info : ''}">${index ? index : ''}</div>
	<div class="row-data">${content}</div>
	</div>
	`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

function createArray(elem, colCount, getChar = () => {return ''}) {
	var colsCells = new Array(colCount)
		.fill('')
		.map(getChar)
		.map(elem)
		.join('');
	return colsCells;
}

window.onload = () => {
	var excelTable = document.querySelector('.excel__table');

	excelTable.addEventListener('scroll', () => {
		setInterval(() => {
			if (excelTable.scrollLeft > 0) {
				excelTable.classList.add('active');
			} else {
				excelTable.classList.remove('active');
			}
		}, 1000);
	});
}

function createTable(rowsCount = 40) {
	var colsCount = CODES.Z - CODES.A + 1;
	var rows = [];
	rows.push(createRow(null, createArray(createCol, colsCount, toChar), ' first-info', ' first-row'));
	for (var i = 0; i < rowsCount; i++){
		rows.push(createRow(i + 1, createArray(createCell, colsCount), null, null));
	}
	return rows.join('');
}

var Table = function (_ExcelComponent4) {
	_inherits(Table, _ExcelComponent4);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, _ExcelComponent4.apply(this, arguments));
	}

	Table.prototype.toStatic = function toStatic() {
		return 'excel__table';
	};

	Table.prototype.toHTML = function toHTML() {
		return createTable(40);
	};

	return Table;
}(ExcelComponent);

var excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table]
});
excel.render();