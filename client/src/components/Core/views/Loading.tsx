import React from 'react';

// Material UI
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

const Loading = ({ type = null }) => {
    switch (type) {
        case 'table':
            return (
                <div className={'skeleton'}>
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                </div>
            );
        case 'button':
            return (
                <div className={'skeleton'}>
                    <Skeleton animation="wave" height={50}>
                        <Button />
                    </Skeleton>
                </div>
            );
        case 'show':
            return (
                <div className={'skeleton'}>
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </div>
            );
        default:
            return (
                <div className={'skeleton'}>
                    <Skeleton animation="wave" height={50} />
                </div>
            );
    }
};

export default Loading;
