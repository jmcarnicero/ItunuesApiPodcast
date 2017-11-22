import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Podcast from './podcast';
import * as actions from '../actions';

class PodcastList extends Component {
  static propTypes = {
    fetchPodcasts: PropTypes.func.isRequired,
    podcasts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  };
  componentWillMount() {
    this.props.fetchPodcasts('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
  }

  render() {
    const renderPodcast = (podcast, i) => <Podcast key={i} {...podcast} />;

    return (
      <div className="podcast-list grid-container">{this.props.podcasts.map(renderPodcast)}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    podcasts: state.podcasts,
  };
}
const mapDispatchToProps = dispatch => ({
  fetchPodcasts: url => dispatch(actions.fetchPodcasts(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList);
