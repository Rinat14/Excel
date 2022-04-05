const CODES = {
	A: 65,
	Z: 90
}

function createCell(_, col) {
	return `
		<div class="cell" contenteditable="true" data-col="${col}"></div>
	`
}

function createCol(col, index) {
	return `
	<div class="column" data-type="resizable" data-col="${index}">
		${col}
		<div class="col-resize" data-resize="col"></div>
	</div>
	`
}

function createRow(index, content, info, row) {
	const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';
	return `
	<div class="row${row ? row : ''}" data-type="resizable">
		<div class="row-info${info ? info : ''}">
			${index ? index : ''}
			${resize}
		</div>
		<div class="row-data">${content}</div>
	</div>
	`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

function createArray(elem, colCount, getChar = () => {return ''}) {
	const colsCells = new Array(colCount)
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

export function createTable(rowsCount = 40) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	rows.push(createRow(null, createArray(createCol, colsCount, toChar), ' first-info', ' first-row'));
	for (let i = 0; i < rowsCount; i++){
		rows.push(createRow(i + 1, createArray(createCell, colsCount), null, null));
	}
	return rows.join('');
}