import React from 'react';
import PropTypes from 'prop-types';

function PodcastInfo(props) {
  return (
    <div>
      <h1>Info </h1>
      <img src={props['im:image'][0].label} alt="podcast detail" />
      Name {props['im:name'].label} <br />
      Artist {props['im:artist'].label} <br />
      Descripcion {props.summary.label} <br />
    </div>
  );
}

PodcastInfo.defaultPropTypes = {
  label: PropTypes.shape(PropTypes.shape),
};
PodcastInfo.propTypes = {
  'im:name': PropTypes.shape(PropTypes.func.isRequired).isRequired,
  'im:image': PropTypes.arrayOf(PropTypes.shape).isRequired,
  'im:artist': PropTypes.shape(PropTypes.func.isRequired).isRequired,
  summary: PropTypes.shape(PropTypes.func.isRequired).isRequired,
};

export default PodcastInfo;
