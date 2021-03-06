import React from 'react';
import ReactDOM from 'react-dom';

// Components
import './i18n/i18next';
import reportWebVitals from './reportWebVitals';
import App from './App';

// Css
import './css/CryptoSummary.css';

const container = document.getElementById('root'); // Make sure root id is defined on /public/index.html

// First render of React component name App
ReactDOM.render(<App />, container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
