import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {LoginProvider} from './context/LoginContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LoginProvider>
        <App />
    </LoginProvider>
    
);
reportWebVitals();
