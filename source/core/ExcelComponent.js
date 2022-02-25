import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
	}

	// en - returns the template of the component
	// ru - возвращает шаблон компонента
	toHTML() {
		return '';
	}

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
	}
}