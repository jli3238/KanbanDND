import React from 'react';
import ReactDOM from 'react-dom';
import './KanbanDND/KanbanDND.css';
import KanbanDND from './KanbanDND/KanbanDND';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <KanbanDND />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
