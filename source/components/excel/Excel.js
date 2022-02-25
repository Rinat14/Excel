import {$} from '../../core/dom';

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || [];
	}
	getRoot() {
		const $root = $.create('div', 'excel');
		// const $root = document.createElement('div');
		// $root.classList.add('excel');
		// $root.textContent = 'Test';
		// $root.style.fontSize = '3rem';
		this.components = this.components.map(Component => {
			// const $el = document.createElement('div');
			// $el.classList.add(Component.className);
			const $el = $.create('div', Component.className);
			const component = new Component($el);
			// Debug
			// if (component.name) {
			// 	window['c' + component.name] = component;
			// }
			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});
		return $root;
	}
	render() {
		/*
		afterbegin, afterend, beforebegin, beforeend
		this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`);
		*/
		/*
		const node = document.createElement('h1');
		node.textContent = 'Test';
		this.$el.append(node);
		*/
		this.$el.append(this.getRoot());
		this.components.forEach(component => {
			component.init();
		});
	}
}