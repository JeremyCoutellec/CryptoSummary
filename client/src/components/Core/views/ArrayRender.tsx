import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { includes, size, isEqual, filter } from 'lodash';
import { notFullEntitiesFromArray, getUrisFromArray } from '../../../utils/entity';

// Redux
import { connect } from 'react-redux';
import { getEntityByURi } from '../actions/entities';
import { getEntitiesBy } from '../selectors/entitiesSelector';

// Material UI
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

// Components
import Table from '../../Core/views/EntityTable';

const useStyles = makeStyles(() => ({
    tableRow: {
        // borderBottom: '1px solid',
        // borderColor: theme.palette.primary.dark + ' !important',
        borderBottom: 'none',
    },
    tableRowWithoutBorder: {
        borderBottom: 'none',
    },
    cellTitle: {
        whiteSpace: 'nowrap',
    },
}));

const ArrayRender = ({
    variable = '',
    getListRows = null,
    entities = null,
    entity = null,
    title = '',
    withoutTitle = false,
    editable = () => false,
    hideFooter = true,
    isLast = false,
    getEntityByURi,
    ...rest
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [loadingEntity, setLoadingEntity] = useState(true);

    useEffect(() => {
        const uris = notFullEntitiesFromArray(variable);
        if (entity && size(uris) > 0 && !isEqual(size(variable), size(filter(entities, (entity) => !entity?.notFull))) && loadingEntity) {
            getEntityByURi(entity, uris);
            setLoadingEntity(false);
        }
    }, [getEntityByURi, entities, entity, loadingEntity, variable]);

    const columns = useMemo(() => getListRows({ t }), [getListRows, t]);

    return (
        <TableRow hover>
            <TableCell colSpan={2} component="th" scope="row" className={isLast ? classes.tableRowWithoutBorder : classes.tableRow}>
                {title && !withoutTitle && (
                    <Grid item xs={12}>
                        <Typography className={classes.cellTitle}>{t([title, 'common.attributes.' + title])}</Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Table
                        withoutToolbar
                        withoutTitle
                        withoutFooter
                        rows={entities}
                        columns={columns}
                        pagination
                        rowCount={entities.length}
                        entityName={entity}
                        editable={editable}
                        loading={false}
                        propsTable={{ hideFooter }}
                        {...rest}
                    />
                </Grid>
            </TableCell>
        </TableRow>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => ({
    entities: getEntitiesBy(ownProps?.entity, (entity) => includes(getUrisFromArray(ownProps?.variable), entity['@id']))(state),
});

export default connect(mapStateToProps, { getEntityByURi })(ArrayRender);
