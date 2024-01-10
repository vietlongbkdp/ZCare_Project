import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage/HomePage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HomePage />
);
reportWebVitals();
