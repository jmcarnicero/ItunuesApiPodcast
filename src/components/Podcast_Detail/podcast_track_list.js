import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class PodcastTrackList extends Component {
  static contextTypes = {
    router: PropTypes.shape(),
  };

  render() {
    const checkItemDuration = (item) => {
      if (!item['itunes:duration']) {
        item['itunes:duration'] = [0];
        return item;
      }

      return item;
    };

    const trackLink = (item, i) => {
      const itemTmp = checkItemDuration(item);
      return (
        <li key={i}>
          <Link to={`/podcast/${this.context.router.params.podcastId}/episode/${i}`}>
            Title{itemTmp.title[0]}
            pubDate{itemTmp.pubDate[0]}
            Duration{itemTmp['itunes:duration'][0]}
          </Link>
        </li>
      );
    };

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
  tracks: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default PodcastTrackList;
