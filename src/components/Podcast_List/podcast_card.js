import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const PodcastCard = props => (
  <div className="podcast">
    <Link to={`/podcastInfo/${props.id.attributes['im:id']}`}>
      <img className="podcast__img" src={props['im:image'][0].label} alt={props['im:name'].label} />
      <h4 className="podcast__name ">{props['im:name'].label}</h4>
      <span className="podcast__author ">Author : {props['im:artist'].label}</span>
    </Link>
  </div>
);

PodcastCard.propTypes = {
  id: PropTypes.shape(PropTypes.func.isRequired).isRequired,
  'im:name': PropTypes.shape(PropTypes.func.isRequired).isRequired,
  'im:image': PropTypes.arrayOf(PropTypes.shape).isRequired,
  'im:artist': PropTypes.shape(PropTypes.func.isRequired).isRequired,
};

export default PodcastCard;
