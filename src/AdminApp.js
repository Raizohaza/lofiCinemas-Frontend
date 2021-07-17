import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import AdminLayout from "./layouts/layout.js";

function AdminApp() {
  return (
    <div>
      <header>
        <Router>
          <Switch>
            <Route path="/admin" render={(props) => {
              console.log('props:',props);
              return <AdminLayout {...props} />
            }} />
            {/* <Redirect from="/" to="/admin/dashboard" /> */}
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default AdminApp;
