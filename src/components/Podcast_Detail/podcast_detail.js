import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

import PodcastInfo from '../podcast_info';

class PodcastDetail extends Component {
  constructor(props) {
    super(props);
    this.props.setPodcastSelected(this.props.params.podcastId);
  }

  render() {
    const renderInfo = function () {
      if (Object.keys(this.props.podcastSelected).length > 0) {
        return <PodcastInfo {...this.props.podcastSelected} />;
      }
      return null;
    }.bind(this);

    return (
      <div>
        <h1>PodcastDetail</h1>
        {renderInfo()}
      </div>
    );
  }
}

PodcastDetail.propTypes = {
  setPodcastSelected: PropTypes.func.isRequired,
  podcastSelected: PropTypes.func.isRequired,
  params: PropTypes.shape({
    podcastId: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return { podcastSelected: state.podcastSelected };
}

function mapDispatchToProps(dispatch) {
  return { setPodcastSelected: id => dispatch(actions.setPodcastSelected(id)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
