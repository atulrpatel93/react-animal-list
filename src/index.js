import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import List from './list';
import Listdeatails from './listdetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Router>
      <div >
        <div className="navigation">
      <div className="container">
      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/list">List</Link>
        </li>
        {/* <li className="list-inline-item">
          <Link to="/deatails/2">details</Link>
        </li> */}
      </ul>
      </div>
      </div>
      <Route exact path="/" component={App} />
        <Route path="/list" component={List} />
        <Route path="/deatails/:id" component={Listdeatails} />
      </div>
    </Router>
  )

  ReactDOM.render(routing, document.getElementById('root'))
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
