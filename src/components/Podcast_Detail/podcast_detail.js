import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

import PodcastInfo from '../podcast_info';
import PodcastTrackList from './podcast_track_list';

class PodcastDetail extends Component {
  static defaultProps = {
    children: PropTypes.objectOf(),
  };

  constructor(props) {
    super(props);
    this.props.setPodcastSelected(this.props.params.podcastId);
    this.props.fetchPodcastDetail(this.props.params.podcastId);
    this.state = { podcastDetail: {}, tracks: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.podcastDetail.feedUrl && nextProps.podcastDetail !== this.state.podcastDetail) {
      this.setState({ podcastDetail: nextProps.podcastDetail });
      this.props.fetchFeeds(nextProps.podcastDetail.feedUrl);
    }
    if (nextProps.tracks.length && nextProps.tracks !== this.state.tracks) {
      this.setState({ tracks: nextProps.tracks });
    }
  }

  render() {
    const renderInfo = () => {
      if (Object.keys(this.props.podcastSelected).length > 0) {
        return <PodcastInfo {...this.props.podcastSelected} />;
      }
      return null;
    };

    return (
      <div>
        <h1>PodcastDetail</h1>
        {renderInfo()}
        <PodcastTrackList tracks={this.state.tracks} />
        {this.props.children}
      </div>
    );
  }
}

PodcastDetail.propTypes = {
  children: PropTypes.objectOf(),
  fetchFeeds: PropTypes.func.isRequired,
  setPodcastSelected: PropTypes.func.isRequired,
  fetchPodcastDetail: PropTypes.func.isRequired,
  podcastDetail: PropTypes.shape().isRequired,
  podcastSelected: PropTypes.shape().isRequired,
  tracks: PropTypes.oneOfType([PropTypes.shape, PropTypes.objectOf]).isRequired,
  params: PropTypes.shape({
    podcastId: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  console.log('state', state);
  return {
    podcastSelected: state.podcastSelected,
    podcastDetail: state.podcastDetail,
    tracks: state.tracks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPodcastSelected: id => dispatch(actions.setPodcastSelected(id)),
    fetchPodcastDetail: id => dispatch(actions.fetchPodcastDetail(id)),
    fetchFeeds: url => dispatch(actions.fetchFeeds(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
