import React from 'react';
import PropTypes from 'prop-types';

const Podcast = props => (
  <div className="podcast">
    <img className="podcast__img" src={props['im:image'][0].label} alt={props['im:name'].label} />
    <h4 className="podcast__name ">{props['im:name'].label}</h4>
    <span className="podcast__author ">Author : {props['im:artist'].label}</span>
    {}
  </div>
);

Podcast.propTypes = {
  'im:name': PropTypes.shape(PropTypes.func.isRequired).isRequired,
  'im:image': PropTypes.arrayOf(PropTypes.shape).isRequired,
  'im:artist': PropTypes.shape(PropTypes.func.isRequired).isRequired,
};

export default Podcast;
