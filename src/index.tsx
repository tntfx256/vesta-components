import React from 'react';
import ReactDOM from 'react-dom';
import Actionsheet, { IActionsheetItem } from './components/core/Actionsheet';
import { ThemeProvider } from 'theming';
import { createTheme } from '@vesta/theme';

const actions: IActionsheetItem[] = [
    { title: "test", value: 1 },
    { title: "another test", value: 2 }
]

const theme = createTheme();

ReactDOM.render(<ThemeProvider theme={theme}>
    <Actionsheet show={true} actions={actions} onSelect={onItemSelect} />
</ThemeProvider>, document.getElementById('root'));

function onItemSelect(item: IActionsheetItem) {
    console.log(item);
}