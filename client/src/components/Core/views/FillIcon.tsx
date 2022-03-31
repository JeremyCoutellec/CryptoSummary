import React, { Fragment } from 'react';
import { useTheme } from '@mui/styles';
import { random } from 'lodash';

const FillIcon = ({ Icon, percent = 100, size = 50, mainColor = null, lightColor = null }) => {
    const theme = useTheme();
    const randomValue = random(0, 1000);

    return (
        <Fragment>
            <svg width={0} height={0}>
                <linearGradient id={`linearColors_${percent}_${Icon?.type?.render?.displayName}_${randomValue}`} x1={1} y1={1} x2={1} y2={0}>
                    <stop offset={percent + '%'} stopColor={mainColor ?? theme.palette.primary.main} />
                    <stop offset={percent + '%'} stopColor={lightColor ?? theme.palette.primary.light} />
                </linearGradient>
            </svg>
            <Icon
                sx={{
                    fill: `url(#linearColors_${percent}_${Icon?.type?.render?.displayName}_${randomValue})`,
                    fontSize: size,
                }}
            />
        </Fragment>
    );
};

export default FillIcon;
