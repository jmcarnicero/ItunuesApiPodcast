import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PodcastDetailInfo from './podcast_detail_info';

class PodcastDetail extends Component {
  componentDidMount() {
    this.props.fetchPodcastDetail(this.props.params.id);
  }

  render() {
    return (
      <div>
        <h1>Detail</h1>;
        <PodcastDetailInfo />
        {}
      </div>
    );
  }
}

PodcastDetail.propTypes = {
  params: PropTypes.shape({ id: PropTypes.string }).isRequired,
  fetchPodcastDetail: PropTypes.func.isRequired,
  // podcastSelected: PropTypes.shape.isRequired,
};

function mapStateToProps(state) {
  return {
    podcastDetail: state.podcastDetail,
    podcasts: state.podcasts,
    // podcastSelected: state.podcastSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return { fetchPodcastDetail: id => dispatch(actions.fetchPodcastDetail(id)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
