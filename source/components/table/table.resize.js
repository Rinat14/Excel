import {$} from '../../core/dom'

export function resizeHandler($root, event) {
	const $resizer = $(event.target);
			const $parent = $resizer.closest('[data-type="resizable"]');
			const coords = $parent.getCoords();
			const type = $resizer.data.resize;
			let value;

			$resizer.css({ opacity: 1 });

			document.onmousemove = ev => {
				if (type === 'col') {
					const delta = ev.pageX - coords.right;
					value = coords.width + delta;
					$resizer.css({ right: -delta + 'px' });
				} else {
					const delta = ev.pageY - coords.bottom;
					value = coords.height + delta;
				}
			}

			document.onmouseup = () => {
				document.onmousemove = null;
				document.onmouseup = null;
				if (type === 'col') {
					$parent.css({width: value + 'px'});
					$root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => el.style.width = value + "px");
				} else {
					$parent.css({height: value + 'px'});
				}
				$resizer.css({ opacity: 0, bottom: '-2px' });
			}
}