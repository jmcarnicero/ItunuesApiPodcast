import React from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  return (
    <div className="input-group input-group-sm pull-right">
      <input
        type="text"
        className="form-control"
        placeholder="Filter Podcast"
        aria-describedby="sizing-addon2"
        onChange={e => props.handleChange(e)}
      />
    </div>
  );
}

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Filter;
