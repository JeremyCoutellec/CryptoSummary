import React from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthSelector } from '../selectors/auth';

export const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return <Redirect to="/login" />;
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => ({
    isAuthenticated: getAuthSelector(state)?.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
