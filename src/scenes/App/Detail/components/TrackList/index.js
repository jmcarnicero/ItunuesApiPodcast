import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class TrackList extends Component {
  static contextTypes = {
    router: PropTypes.shape(),
  };

  render() {
    const checkItemDuration = (item) => {
      if (!item['itunes:duration']) {
        const element = item;
        element['itunes:duration'] = [0];
        return item;
      }

      return item;
    };

    const formatDate = (date) => {
      const dateSplit = date.split(' ');
      return `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[3]}`;
    };

    const trackLink = (item, i) => {
      const itemTmp = checkItemDuration(item);
      return (
        <tr key={i}>
          <td>
            <Link to={`/podcast/${this.context.router.params.podcastId}/episode/${i}`}>
              {itemTmp.title[0]}
            </Link>
          </td>
          <td>{formatDate(itemTmp.pubDate[0])}</td>
          <td>{itemTmp['itunes:duration'][0]}</td>
        </tr>
      );
    };

    return (
      <div>
        <div className="card card-episodes"> Episodes {this.props.tracks.length}</div>
        <table className="card table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>{this.props.tracks.map(trackLink)}</tbody>
        </table>
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default TrackList;
