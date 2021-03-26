import React from 'react';
import Navbar from "./components/Navbar";
import Universities from "./pages/Universities";
import Departments from "./pages/Departments";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <Switch>
            <Route path="/" component={Universities} exact />
            <Route path="/departments" component={Departments} />
            <Route path="/students" component={Students} />
            <Route path="/teachers" component={Teachers} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
