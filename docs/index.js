/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp */
import React from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from 'react-github-corner';
import {
 Catalog, pageLoader
} from 'catalog';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import 'purecss/build/pure.css';

import './jsoneditor.min.css';
import '../style.css';
import './main.css';
// import demoMUI from './pages/demo-mui';
// import textfield from './pages/textfield';
// import selectfield from './pages/selectfield';
// import checkbox from './pages/checkbox';
// import radio from './pages/radio';
// import toggle from './pages/toggle';
// import datepicker from './pages/datepicker';
// import timepicker from './pages/timepicker';
// // import autocomplete from './pages/autocomplete';
// import layout from './pages/layout';
// import validation from './pages/validation';
// import playground from './pages/playground';

// Add your documentation imports here. These are available to
// React specimen. Do NOT pass React here as Catalog does that.
const title = `${NAME} v${VERSION}`; // eslint-disable-line no-undef
const project = `${USER}/${NAME}`; // eslint-disable-line no-undef

// Create a convenient loader for markdown files
const demoMUI = () => pageLoader(() => import('./pages/demo-mui'));
const textfield = () => pageLoader(() => import('./pages/textfield'));
const selectfield = () => pageLoader(() => import('./pages/selectfield'));
const checkbox = () => pageLoader(() => import('./pages/checkbox'));
const radio = () => pageLoader(() => import('./pages/radio'));
const toggle = () => pageLoader(() => import('./pages/toggle'));
const datepicker = () => pageLoader(() => import('./pages/datepicker'));
const timepicker = () => pageLoader(() => import('./pages/timepicker'));
const layout = () => pageLoader(() => import('./pages/layout'));
const validation = () => pageLoader(() => import('./pages/validation'));
const playground = () => pageLoader(() => import('./pages/playground'));
const README = pageLoader('../README.md');

const pages = [
  {
    path: '/',
    title: 'Introduction',
    content: README
  },
  {
    path: '/simpleform',
    title: 'Simple Form',
    component: demoMUI()
  },
  {
    path: '/textfield',
    title: 'Textfield',
    component: textfield()
  },
  {
    path: '/selectfield',
    title: 'Selectfield',
    component: selectfield()
  },
  {
    path: '/checkbox',
    title: 'Checkbox',
    component: checkbox()
  },
  {
    path: '/radio',
    title: 'Radio',
    component: radio()
  },
  {
    path: '/toggle',
    title: 'Toggle',
    component: toggle()
  },
  {
    path: '/datepicker',
    title: 'Datepicker',
    component: datepicker()
  },
  {
    path: '/timepicker',
    title: 'Timepicker',
    component: timepicker()
  },
  // {
  //   path: '/autocomplete',
  //   title: 'Autocomplete',
  //   component: autocomplete
  // },
  {
    path: '/layout',
    title: 'Layout',
    component: layout()
  },
  {
    path: '/validation',
    title: 'Validation',
    content: validation()
  },
  {
    path: '/playground',
    title: 'Playground',
    content: playground()
  }
];

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4285f4' },
  },
  typography: {
    useNextVariants: true,
  },
});

// Catalog - logoSrc="../images/logo.png"
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <div>
      <GithubCorner
        href={`https://github.com/${project}`}
        bannerColor="#1F2532"
        octoColor="#f36"
        width={80}
        height={80}
        direction="right"
      />
      <Catalog
        title={title}
        useBrowserHistory
        theme={
          {
            // Uses default theme
          }
        }
        pages={pages}
      />
    </div>
  </MuiThemeProvider>,
  document.getElementById('app')
);
