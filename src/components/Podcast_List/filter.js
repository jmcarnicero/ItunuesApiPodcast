import React from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  return (
    <div>
      <h1>Filter</h1>
      <input type="text" onChange={e => props.handleChange(e)} />
    </div>
  );
}

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Filter;
