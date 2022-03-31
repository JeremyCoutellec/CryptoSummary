import React, { Fragment } from 'react';
import { round } from 'lodash';

// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgressMui from '@mui/material/CircularProgress';

const CircularProgressWithLabel = ({ value, valueShow = null, ...rest }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgressMui variant="determinate" value={value} {...rest} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="primary">
                    {`${round(valueShow ?? value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

const CircularProgress = ({
    value = 0,
    backgroundColor = null,
    valueColor = null,
    withoutValue = false,
    size = 48,
    thickness = 3,
    thicknessError = null,
}) => {
    const CircularProgressComponent = withoutValue ? CircularProgressMui : CircularProgressWithLabel;

    return (
        <Box className="valueCenter" sx={{ position: 'relative' }}>
            {value > 100 ? (
                <Fragment>
                    <CircularProgressMui
                        variant="determinate"
                        value={100}
                        size={size}
                        thickness={thickness}
                        sx={{
                            color: valueColor,
                            position: 'absolute',
                            zIndex: 4,
                        }}
                    />
                    <CircularProgressComponent
                        variant="determinate"
                        value={value > 200 ? 100 : value - 100}
                        valueShow={value}
                        size={size - 1}
                        thickness={thicknessError ?? thickness * 2 - 1}
                        color={'error'}
                        sx={{ zIndex: 3 }}
                    />
                </Fragment>
            ) : (
                <Fragment>
                    {backgroundColor && (
                        <CircularProgressMui
                            variant="determinate"
                            value={100}
                            size={size}
                            thickness={thickness}
                            sx={{
                                color: backgroundColor,
                                position: 'absolute',
                            }}
                        />
                    )}
                    <CircularProgressComponent variant="determinate" value={value} size={size} thickness={thickness} sx={{ color: valueColor }} />
                </Fragment>
            )}
        </Box>
    );
};

export default CircularProgress;
