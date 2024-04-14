/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserContext} from './context'
import {BrowserRouter as Router} from 'react-router-dom';
import './styles/index.css';

const chequear_cliente = localStorage.getItem('cliente_inicio_sesion');

const root = ReactDOM.createRoot(document.getElementById('root'));*/
/*root.render(
  <>
   <Router>
       <App/>
        <UserContext.Provider value={{'login':chequear_cliente}}><App /></UserContext.Provider>
   </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);


