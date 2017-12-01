import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Card = props => (
  <div className="podcast card">
    <Link className="card-link" to={`/podcast/${props.id.attributes['im:id']}`}>
      <img
        className="podcast__img card-img-top"
        src={props['im:image'][0].label}
        alt={props['im:name'].label}
      />
    </Link>
    <h4 className="podcast__name card-title ">{props['im:name'].label}</h4>
    <span className="podcast__author card-text">Author : {props['im:artist'].label}</span>
  </div>
);

Card.propTypes = {
  id: PropTypes.shape(PropTypes.func.isRequired).isRequired,
  'im:name': PropTypes.shape(PropTypes.func.isRequired).isRequired,
  'im:image': PropTypes.arrayOf(PropTypes.shape).isRequired,
  'im:artist': PropTypes.shape(PropTypes.func.isRequired).isRequired,
};

export default Card;
