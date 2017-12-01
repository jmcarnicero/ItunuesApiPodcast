import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../data/actions';

import Info from '../../../components/Info';
import TrackList from './components/TrackList';

class Detail extends Component {
  static defaultProps = {
    children: PropTypes.objectOf(),
  };

  componentWillMount() {
    this.props.fetchPodcastDetail(this.props.params.podcastId);
    this.setState({ tracks: [] });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tracks !== this.state.tracks) {
      this.setState({ tracks: nextProps.tracks });
    }
  }

  render() {
    const renderInfo = () => {
      if (Object.keys(this.props.podcastSelected).length > 0) {
        return <Info {...this.props.podcastSelected} {...this.context} />;
      }
      return null;
    };

    return (
      <div>
        {}
        <div className="col-md-3">{renderInfo()}</div>
        <div className="col-md-9">
          <TrackList tracks={this.state.tracks} />
        </div>

        {this.props.children}
      </div>
    );
  }
}

Detail.propTypes = {
  children: PropTypes.objectOf(),
  fetchFeeds: PropTypes.func.isRequired,
  setPodcastSelected: PropTypes.func.isRequired,
  fetchPodcastDetail: PropTypes.func.isRequired,
  podcastDetail: PropTypes.shape().isRequired,
  podcastSelected: PropTypes.shape().isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  params: PropTypes.shape({
    podcastId: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
