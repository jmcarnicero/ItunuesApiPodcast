import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PodcastInfo from '../podcast_info';

class PodcastChapter extends Component {
  static defaultProps = {
    track: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log('Chaper ', this.props);
    // return true;
  }
  render() {
    const track = this.props.tracks[this.props.params.episodeId];
    const mp3Url = track.enclosure[0].$.url;
    const urlType = track.enclosure[0].$.type;

    return (
      <div>
        <h1>PodcastChapter</h1>
        <PodcastInfo {...this.props.podcastSelected} />
        <h3> {track.title[0]} </h3>
        Description <div dangerouslySetInnerHTML={{ __html: track.description[0] }} />
        <audio controls>
          <track kind="captions" />

          <source src={mp3Url} type={urlType} />
        </audio>
      </div>
    );
  }
}

PodcastChapter.propTypes = {
  podcastSelected: PropTypes.shape().isRequired,
  params: PropTypes.shape().isRequired,
  tracks: PropTypes.shape().isRequired,
  track: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    podcastSelected: state.podcastSelected,
    tracks: state.tracks,
  };
}

export default connect(mapStateToProps)(PodcastChapter);
