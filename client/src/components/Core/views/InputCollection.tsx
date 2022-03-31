import React, { useEffect, useMemo } from 'react';
import { map, size, forEach, isString, find, includes, fill, isEqual, get } from 'lodash';
import { notFullEntitiesFromArray } from '../../../utils/entity';

// Redux
import { getEntityByURi } from '../actions/entities';
import { connect } from 'react-redux';
import { getEntitiesBy } from '../selectors/entitiesSelector';

// Material UI
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

// Components
import InputCollectionItem from './InputCollectionItem';

const useStyles = makeStyles(() => ({
    tableHeadCell: {
        borderBottom: 'none',
    },
}));

const InputCollection = ({
    entities,
    entity = '',
    title = '',
    id,
    value,
    minRow = 1,
    addRow = true,
    removeRow = true,
    onChange = null,
    removable = null,
    getFormRows,
    getFormData,
    getEntityByURi,
}) => {
    const classes = useStyles();
    const defaultValueRow = useMemo(() => getFormData(), [getFormData]);

    useEffect(() => {
        const uris = notFullEntitiesFromArray(value);
        if (uris.length > 0) getEntityByURi(entity, uris);
    }, [getEntityByURi, entity, value]);

    useEffect(() => {
        const changingVal = [];
        const changingKey = [];
        forEach(value, (val, key) => {
            const newVal = isString(val) ? find(entities, (entity) => isEqual(get(entity, '@id'), val) && !get(entity, 'notFull')) : null;
            if (newVal) {
                changingVal.push(newVal);
                changingKey.push(key);
            }
        });
        if (size(changingVal) === 1) onChange(changingVal[0], id, changingKey[0]);
        else if (size(changingVal) > 1) onChange(changingVal, id, null, null, true);
    }, [onChange, value, id, entities]);

    useEffect(() => {
        if (minRow > size(value)) onChange(fill(Array(minRow - size(value)), defaultValueRow), id, null, true);
    }, [entity, minRow, value, defaultValueRow, id, onChange]);

    const addRowItem = () => {
        onChange(defaultValueRow, id, null, true);
    };

    const removeRowItem = (index) => {
        onChange(null, id, index);
    };

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeadCell} colSpan={getFormRows?.length}>
                            <Typography>{title}</Typography>
                            {size(value) === 0 && (
                                <IconButton size="small" color="primary" onClick={addRowItem}>
                                    <AddIcon />
                                </IconButton>
                            )}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {map(value, (valueEntity, index) => (
                        <TableRow key={index} hover>
                            <InputCollectionItem
                                index={index}
                                id={id}
                                value={valueEntity}
                                isLast={parseFloat(index) === (minRow > size(value) ? minRow - 1 : size(value) - 1)}
                                addRow={addRow ? addRowItem : null}
                                removeRow={removeRow ? () => removeRowItem(index) : null}
                                removable={removable}
                                onChange={onChange}
                                getFormRows={getFormRows}
                                getFormData={getFormData}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => ({
    entities: getEntitiesBy(ownProps?.entity, (entity) => includes(ownProps?.value, entity['@id']))(state),
});

export default connect(mapStateToProps, { getEntityByURi })(InputCollection);
