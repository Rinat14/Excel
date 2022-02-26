// !
// !	                            _____
// !	                            /___\
// !	 _< _/_-_\_/_-_             \"_"/            _-_\_/_-_\_ >_
// !	                           __|_|__
// !	                          //"_-_"\\
// !	                         //|_____|\\
// !	                        // \ |_| / \\
// !	                       |_| |\___/| |_|
// !	                           ||   ||
// !	                           ||   ||
// !	                          |__| |__|
// !	
// !     It's property of Mr. Darov ----- Created by Rinat Samandarov ! ----- In Js Excel course by Vladilen Minin.
// !
// !

import { Excel } from './components/excel/Excel';
import { Formula } from './components/Formula/Formula';
import { Header } from './components/header/header';
import { Table } from './components/table/Table';
import { Toolbar } from './components/toolbar/Toolbar';
import './scss/style.scss';

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table]
});
excel.render();