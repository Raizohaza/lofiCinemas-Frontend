import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import AdminApp from './AdminApp';
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from './reportWebVitals';
import {store as adminStore} from './app/store';
ReactDOM.render
(
  <Router>
    <Switch>
      <Route path='/admin'>
        <Provider store={adminStore}>
          <AdminApp />
        </Provider>
      </Route>
      <Provider store={store}>
        <App />
      </Provider>
    </Switch>
  </Router>,
  
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
