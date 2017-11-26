import React from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';
import '../styles/App.css';

const App = props => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Podcasters</h1>
      <Loading />
    </header>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
