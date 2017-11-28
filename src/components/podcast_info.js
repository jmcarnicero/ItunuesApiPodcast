import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// eslint-disable-next-line  react/prefer-stateless-function
class PodcastInfo extends Component {
  static contextTypes = {
    router: PropTypes.shape(),
  };

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <Link to={`/podcast/${this.context.router.params.podcastId}`}>
            <img
              className="card-img-top img-responsive center-block"
              src={this.props['im:image'][2].label}
              alt="podcast detail"
            />
          </Link>
          <div className="card-block">
            <Link to={`/podcast/${this.context.router.params.podcastId}`}>
              <h6 className="card-title">{this.props['im:name'].label}</h6>
              <p className="card-text">by {this.props['im:artist'].label}</p>
            </Link>
          </div>

          <div className="card-block">
            <Link to={`/podcast/${this.context.router.params.podcastId}`}>
              <h6 className="card-title">Description</h6>
              <p className="card-text">{this.props.summary.label}</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

PodcastInfo.propTypes = {
  'im:name': PropTypes.shape(PropTypes.func.isRequired).isRequired,
  'im:image': PropTypes.arrayOf(PropTypes.shape).isRequired,
  'im:artist': PropTypes.shape(PropTypes.func.isRequired).isRequired,
  summary: PropTypes.shape(PropTypes.func.isRequired).isRequired,
};

export default PodcastInfo;
