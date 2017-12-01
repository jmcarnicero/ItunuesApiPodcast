import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Info from '../../../components/Info';

function Track(props) {
  const track = props.tracks[props.params.episodeId];
  const mp3Url = track.enclosure[0].$.url;
  const urlType = track.enclosure[0].$.type;

  return (
    <div className="row">
      <div className="col-md-3">
        <Info {...props.podcastSelected} />
      </div>

      <div className=" col-md-9">
        <div className="card chapter">
          <h6 className="card-title"> {track.title[0]} </h6>
          <div dangerouslySetInnerHTML={{ __html: track.description[0] }} />
          <audio controls>
            <track kind="captions" />
            <source src={mp3Url} type={urlType} />
          </audio>
        </div>
      </div>
    </div>
  );
}

Track.propTypes = {
  podcastSelected: PropTypes.shape().isRequired,
  params: PropTypes.shape().isRequired,
  tracks: PropTypes.shape().isRequired,
  track: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    podcastSelected: state.podcastSelected,
    tracks: state.tracks,
  };
}

export default connect(mapStateToProps)(Track);
