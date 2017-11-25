import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// function PodcastTrackList(props) {

class PodcastTrackList extends Component {
  static contextTypes = {
    router: PropTypes.shape(),
  };

  constructor(props) {
    super(props);
    return true;
  }
  render() {
    const trackLink = (item, i) => (
      <li key={i}>
        <Link to={`/podcast/${this.context.router.params.podcastId}/episode/${i}`}>
          Title{item.title[0]}
          pubDate{item.pubDate[0]}
          Duration{item['itunes:duration'][0]}
        </Link>
      </li>
    );

    return (
      <div>
        Episodes {this.props.tracks.length}
        <h1>Track list</h1>
        {this.props.tracks.map(trackLink)}
      </div>
    );
  }
}

PodcastTrackList.propTypes = {
  // tracks: PropTypes.objectOf(PropTypes.shape).isRequired,
  tracks: PropTypes.oneOfType([PropTypes.shape, PropTypes.objectOf]).isRequired,
  // tracks: React.PropTypes.object.isRequired,
};

export default PodcastTrackList;
