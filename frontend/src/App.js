import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
      </Router>
    </Provider>
  );
};

export default App;