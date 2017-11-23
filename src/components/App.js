import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import '../styles/App.css';

import PodcastFiltered from './podcats_filtered';

class App extends Component {
  static propTypes = {
    fetchPodcasts: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchPodcasts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Podcasters</h1>
        </header>
        <PodcastFiltered />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  podcasts: state.podcasts,
});

const mapDispatchToProps = dispatch => ({
  fetchPodcasts: () => dispatch(actions.fetchPodcasts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
