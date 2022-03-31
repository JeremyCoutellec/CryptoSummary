import React from 'react';
import ReactDOM from 'react-dom';

// Components
import './i18n/i18next';
import reportWebVitals from './reportWebVitals';
import App from './App';

// Css
import './css/theme.css';

// First render of React component name App
ReactDOM.render(
    <App />,
    document.getElementById('root') // Make sure root id is defined on /public/index.html
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
