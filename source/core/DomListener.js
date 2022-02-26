import { capitalize } from "./utils";

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('No $root provided for DomListener');
		}
		this.$root = $root;
		this.listeners = listeners;
	}
	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			if (!this[method]) {
				const name = this.name || '';
				throw new Error(`Method ${method} is not implemented in ${name} Component`);
			}
			_this[method] = _this[method].bind(this);
			// Это тоже самое что addEventListener();
			dom.on(listener, _this[method]);
		})
	}
	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			this.$root.off(listener, this[method]);
		})
	}
}

function getMethodName(eventName) {
	return 'on' + capitalize(eventName);
}