import React, { Fragment, useMemo, useState } from 'react';
import Moment from 'react-moment';
import { formatDate } from '../../../utils/date';
import { useTranslation } from 'react-i18next';
import { convertValueToDurationString } from './InputDuration';
import clsx from 'clsx';

// Redux
import { connect } from 'react-redux';
import { canWriteEntitySelector } from '../selectors/entitiesSelector';

// Material UI
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';

// Component
import LinkEntity from './LinkEntity';
import Input from './Input';
import Color from './Color';
import MediaObjectShow from '../../MediaBundle/views/MediaObjectShow';

const { REACT_APP_DATE_TIME_FORMAT_SHOW, REACT_APP_DATE_FORMAT_SHOW } = process.env;

const useStyles = makeStyles((theme) => ({
    tableRow: {
        // borderBottom: '1px solid',
        // borderColor: theme.palette.primary.dark + ' !important',
    },
    tableRowWithoutBorder: {
        borderBottom: 'none',
    },
    editableCell: {
        cursor: 'pointer',
    },
    cellTitle: {
        whiteSpace: 'nowrap',
    },
    editButton: {
        verticalAlign: 'middle',
        fontSize: '1em',
        marginLeft: theme.spacing(0.5),
        cursor: 'pointer',
    },
    helpIcon: {
        verticalAlign: 'text-top',
        fontSize: '1em',
        marginLeft: theme.spacing(0.5),
        cursor: 'pointer',
    },
}));

const CellRender = ({
    render = null,
    variable = '',
    type = null,
    entity = null,
    maxItems = null,
    editable = false,
    canWriteEntity = false,
    ...rest
}) => {
    const { t, i18n } = useTranslation();

    if (render) return render();
    if (!variable && type !== 'bool' && type !== 'boolean') return '';

    switch (type) {
        case 'date':
            return <Moment format={REACT_APP_DATE_FORMAT_SHOW}>{formatDate(variable, {})}</Moment>;
        case 'datetime':
            return <Moment format={REACT_APP_DATE_TIME_FORMAT_SHOW}>{formatDate(variable, {})}</Moment>;
        case 'duration':
            return convertValueToDurationString(variable);
        case 'constant':
            return i18n.exists((entity ?? 'common') + '.constants.' + variable) ? t((entity ?? 'common') + '.constants.' + variable) : '';
        case 'entity':
            return <LinkEntity entity={entity} uri={variable} maxItems={maxItems} {...rest} />;
        case 'color':
            return <Color value={variable} {...rest} />;
        case 'file':
            return <MediaObjectShow mediaUri={variable} {...rest} />;
        case 'bool':
        case 'boolean':
            return variable ? <DoneIcon color={'primary'} /> : <ClearIcon color={'secondary'} />;
        default:
            return editable && canWriteEntity ? (
                <Tooltip title={t('common.edit')} placement="top-end">
                    <span>{variable}</span>
                </Tooltip>
            ) : (
                variable
            );
    }
};

const RowRender = ({
    variable = '',
    title = null,
    type = 'string',
    editable = false,
    canWriteEntity = false,
    onChange = null,
    isLast = false,
    help = null,
    ...rest
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [edit, setEdit] = useState(false);
    const initialValue = useMemo(() => variable, [variable]);
    const [value, setValue] = useState(initialValue);

    const endAdornment = (event) => {
        event.stopPropagation();
        setEdit(false);
        onChange(value);
    };

    const showEdit = () => {
        setEdit(true);
    };

    const toogleEdit = () => {
        setEdit(!edit);
    };

    return (
        <Fragment>
            {title && (
                <TableCell component="th" scope="row" className={isLast ? classes.tableRowWithoutBorder : classes.tableRow}>
                    <Typography className={classes.cellTitle}>
                        {t([title, 'common.attributes.' + title])}
                        {editable && canWriteEntity && <EditIcon className={classes.editButton} onClick={editable ? toogleEdit : null} />}
                        {help && (
                            <Tooltip title={help ?? ''} placement={'top-end'}>
                                <HelpOutlineIcon fontSize="small" className={classes.helpIcon} />
                            </Tooltip>
                        )}
                    </Typography>
                </TableCell>
            )}
            <TableCell
                align="right"
                colSpan={title ? 1 : 2}
                className={clsx(isLast ? classes.tableRowWithoutBorder : classes.tableRow, editable && !edit && classes.editableCell)}
                onClick={editable ? showEdit : null}
            >
                {editable && canWriteEntity && edit ? (
                    <Input
                        autoFocus
                        value={value}
                        type={type}
                        onChange={(e) => setValue(e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                        InputProps={
                            onChange && {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button size="small" color="primary" onClick={endAdornment}>
                                            <Tooltip title={t('common.save')} placement={'top'}>
                                                <CheckIcon />
                                            </Tooltip>
                                        </Button>
                                    </InputAdornment>
                                ),
                            }
                        }
                        {...rest}
                    />
                ) : (
                    <CellRender type={type} variable={variable} editable={editable} canWriteEntity={canWriteEntity} {...rest} />
                )}
            </TableCell>
        </Fragment>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => ({
    canWriteEntity: canWriteEntitySelector(ownProps?.entityName)(state),
});

export default connect(mapStateToProps, null)(RowRender);
