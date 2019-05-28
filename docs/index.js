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
const pagedownLoader = page => pageLoader(() => import(`./${page}`));
const pages = [
  {
    path: '/',
    title: 'Introduction',
    content: pageLoader('../README.md')
  },
  {
    path: '/simpleform',
    title: 'Simple Form',
    component: pagedownLoader('pages/demo-mui')
  },
  {
    path: '/textfield',
    title: 'Textfield',
    component: pagedownLoader('pages/textfield')
  },
  {
    path: '/selectfield',
    title: 'Selectfield',
    component: pagedownLoader('pages/selectfield')
  },
  {
    path: '/checkbox',
    title: 'Checkbox',
    component: pagedownLoader('pages/checkbox')
  },
  {
    path: '/radio',
    title: 'Radio',
    component: pagedownLoader('pages/radio')
  },
  {
    path: '/toggle',
    title: 'Toggle',
    component: pagedownLoader('pages/toggle')
  },
  {
    path: '/datepicker',
    title: 'Datepicker',
    component: pagedownLoader('pages/datepicker')
  },
  {
    path: '/timepicker',
    title: 'Timepicker',
    component: pagedownLoader('pages/timepicker')
  },
  // {
  //   path: '/autocomplete',
  //   title: 'Autocomplete',
  //   component: autocomplete
  // },
  {
    path: '/layout',
    title: 'Layout',
    component: pagedownLoader('pages/layout')
  },
  {
    path: '/validation',
    title: 'Validation',
    content: pagedownLoader('pages/validation')
  },
  {
    path: '/playground',
    title: 'Playground',
    content: pagedownLoader('pages/playground'),
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
