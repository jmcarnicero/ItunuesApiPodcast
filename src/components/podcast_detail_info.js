import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class PodcastDetailInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { detail: {} };
    console.log('props,', props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.detail !== this.state.detail) {
      this.setState({ detail: newProps.detail });
    }
    console.log('newProps', newProps, this.props, this);
  }

  render() {
    return (
      <div>
        <h1>PodcastDetailInfo</h1>
        {
          // Artist {this.state.detail['im:artist']}
          // Titulo {props.title.label} <br />
          // Artista {props['im:artist'].label}
          // <br />
          // Descripcion{props.summary.label}
          // <br />
        }
      </div>
    );
  }
}

PodcastDetailInfo.propTypes = {
  // detail: PropTypes.arrayOf(PropTypes.string).isRequired,
  // label: PropTypes.string.isRequired,
  // 'im:artist': PropTypes.string.isRequired,
  // summary: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  console.log('state ', state);
  return { detail: state.podcastSelected };
}

export default connect(mapStateToProps)(PodcastDetailInfo);
