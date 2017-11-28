import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Loading = (props) => {
  const isLoading = (loading) => {
    if (loading) {
      return <div className="Loading__indicator pull-right" />;
    }

    return null;
  };

  return (
    <div>
      <div className="Loading">{props.error}</div>
      <div className="Loading">{isLoading(props.loading)}</div>
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Loading);
