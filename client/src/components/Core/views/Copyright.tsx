import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Typography from '@mui/material/Typography';

const Copyright = () => (
    <Typography variant="caption" color="inherit" align="center">
        {'©  2021 '}
        <Link className="color-white" to="#">
            CryptoSummary
        </Link>
        {` v${process.env.REACT_APP_VERSION}`}
    </Typography>
);

export default Copyright;
