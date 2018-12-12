import { createTheme } from '@vesta/theme';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'theming';
import { Demo } from './demo/Demo';

const theme = createTheme();

ReactDOM.render(<ThemeProvider theme={theme}><Demo /></ThemeProvider>, document.getElementById('root'));
