import { ExcelComponent } from "../../core/ExcelComponent";

export class Toolbar extends ExcelComponent {
	static className = 'excel__toolbar';

	constructor($root) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click']
		});
	}

	toHTML() {
		return `
			<div class="button">
				<i title="Format align left" class="material-icons">format_align_left</i>
			</div>
			<div class="button">
				<i title="Format align center" class="material-icons">format_align_center</i>
			</div>
			<div class="button">
				<i title="Format align right" class="material-icons">format_align_right</i>
			</div>
			<div class="button">
				<i title="Format bold" class="material-icons">format_bold</i>
			</div>
			<div class="button">
				<i title="Format italic" class="material-icons">format_italic</i>
			</div>
			<div class="button">
				<i title="Format underlined" class="material-icons">format_underlined</i>
			</div>
		`;
	}

	onClick(event) {
		console.log(event.target);
	}
}