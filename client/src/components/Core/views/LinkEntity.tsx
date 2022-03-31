import React, { Fragment, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isArray, map, join, snakeCase, take, get, size } from 'lodash';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';
import { getEntitySelectorByUri } from '../selectors/entitiesSelector';
import { getEntityByURi } from '../actions/entities';

// Material UI
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Grid, { GridSize } from '@mui/material/Grid';

// Components
import Loading from './Loading';

const useStyles = makeStyles(() => ({
    buttonEntityRight: {
        float: 'right',
    },
}));

const ButtonEntity = ({
    object,
    entity,
    index,
    center = false,
    showAttributes = [],
    joinAttributes = ' ',
    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch = null,
    ...rest
}) => {
    const classes = useStyles();

    return (
        <Link to={object?.id ? `/${snakeCase(entity)}-${object?.id}` : ''} className={'link-none'}>
            <Tooltip title={object?.name ?? `${entity} ${get(object, 'id', '')}`}>
                <Button
                    className={clsx('buttonEntity', !center && classes.buttonEntityRight)}
                    variant="outlined"
                    size="small"
                    color="primary"
                    {...rest}
                >
                    {object?.firstname && `${object?.firstname} `}
                    {map(showAttributes, (attribute, indexAttribute) => (
                        <span key={`${index}_${indexAttribute}`}>
                            {get(object, attribute)}
                            {get(object, attribute) && index !== size(showAttributes) - 1 && joinAttributes}
                        </span>
                    ))}
                    {size(showAttributes) === 0 && (object?.name ?? `${entity} ${get(object, 'id', '')}`)}
                </Button>
            </Tooltip>
        </Link>
    );
};

const LinkEntity = ({
    entity,
    uri,
    object,
    maxItems = null,
    multiline = false,
    maxItemsByRow = 2,
    center = false,
    showMore = null,
    getEntityByURi,
    getterAddForm = null,
    ...rest
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const mdItem: boolean | GridSize = useMemo(() => {
        if (multiline) return 12 / (maxItemsByRow ?? 2);
        else if (maxItems) return 12 / maxItems;
        return 'auto';
    }, [multiline, maxItemsByRow, maxItems]);

    useEffect(() => {
        if (uri && entity && ((isArray(uri) && uri.length > 0 && object.length === 0) || (!isArray(uri) && !object))) getEntityByURi(entity, uri);
    }, [entity, object, uri, getEntityByURi]);

    if (!uri || !entity) return <div />;

    if (!object && uri && entity) return <Loading type="button" />;

    return (
        <Fragment>
            {isArray(object) ? (
                <Grid container justifyContent={center ? 'center' : 'flex-end'}>
                    {map(
                        maxItems ? take(object, object.length > maxItems && (!multiline || showMore) ? maxItems - 1 : maxItems) : object,
                        (objectMap, index) => (
                            <Grid key={index} item xs={'auto'} md={mdItem}>
                                <ButtonEntity object={objectMap} entity={entity} index={index} center={center} {...rest} />
                            </Grid>
                        )
                    )}
                    {showMore && (
                        <Grid item xs={'auto'} md={mdItem}>
                            <Link to={showMore} className={'link-none'}>
                                <Tooltip title={t('common.showMore')}>
                                    <Button
                                        className={clsx('buttonEntity', !center && classes.buttonEntityRight)}
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                    >
                                        ...
                                    </Button>
                                </Tooltip>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            ) : (
                <ButtonEntity object={object} entity={entity} index={0} center={center} {...rest} />
            )}
            {getterAddForm && (
                <Link
                    to={`/${snakeCase(entity)}/new?${join(
                        map(getterAddForm, (getter, key) => key + '=' + getter),
                        '&'
                    )}`}
                >
                    <Button size="small" variant="outlined" color="primary">
                        <AddIcon />
                    </Button>
                </Link>
            )}
        </Fragment>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => {
    return {
        object: getEntitySelectorByUri(ownProps.entity, ownProps.uri)(state),
    };
};

export default connect(mapStateToProps, { getEntityByURi })(LinkEntity);
