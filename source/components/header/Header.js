import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent{
	static className = 'excel__header';

	toHTML() {
		return `
			<input class="input" title="Rename" type="text" name="table-name" value="Untitled spreadsheet">
			<div>
				<div class="button">
					<i title="Delete" class="material-icons">delete</i>
				</div>
				<div class="button">
					<i title="Exit to app" class="material-icons">exit_to_app</i>
				</div>
			</div>
		`;
	}
}