import React from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';
import '../styles/App.css';

const App = props => (
  <div>
    <div className="row">
      <div classnames="header clearfix ">
        <Loading />
        <a className="navbar-brand" href="#/">
          Podcasters
        </a>
      </div>
    </div>
    <div>{props.children}</div>
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
