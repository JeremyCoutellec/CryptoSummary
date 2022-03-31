import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

// Material UI
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
    colorDiv: {
        padding: theme.spacing(1),
        cursor: 'pointer',
        display: 'inline-block',
        border: 'solid',
        float: 'right',
    },
    colorDivDense: {
        lineHeight: 'initial',
        padding: theme.spacing(0.5),
    },
}));

const Color = ({ value, dense = false, ...rest }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const copyValue = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(function () {
            setCopied(false);
        }, 2000);
    };

    return value ? (
        <Tooltip
            title={t('common.copied')}
            open={copied}
            placement="top-end"
            leaveDelay={200}
            disableFocusListener
            disableHoverListener
            disableTouchListener
        >
            <div className={clsx(classes.colorDiv, dense && classes.colorDivDense)} onClick={copyValue} style={{ borderColor: value }} {...rest}>
                {value}
            </div>
        </Tooltip>
    ) : (
        <div />
    );
};

export default Color;
