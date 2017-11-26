import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Loading = (props) => {
  const isLoading = (loading) => {
    if (loading) {
      return <div className="Loading__indicator" />;
    }

    return null;
  };

  return <div className="Loading">{isLoading(props.loading)}</div>;
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { loading: state.loading };
}

export default connect(mapStateToProps)(Loading);
