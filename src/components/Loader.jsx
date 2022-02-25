import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

function Loader({ size }) {
  return (
    <div className="loader d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="light" size={ size } />
    </div>
  );
}

export default Loader;

Loader.propTypes = {
  size: PropTypes.string,
};

Loader.defaultProps = {
  size: 'md',
};
