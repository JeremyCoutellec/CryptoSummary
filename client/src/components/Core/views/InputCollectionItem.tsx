import React, { useMemo } from 'react';
import { map } from 'lodash';

// Material UI
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Components
import Input from './Input';

const InputCollectionItem = ({
    value,
    id,
    index,
    isLast = false,
    addRow = null,
    removeRow = null,
    removable = null,
    onChange,
    getFormRows,
    getFormData,
}) => {
    const initialEntityData = useMemo(() => getFormData(value), [getFormData, value]);

    const rows = useMemo(
        () => getFormRows(initialEntityData, (data) => onChange(data, id, index)),
        [getFormRows, id, index, initialEntityData, onChange]
    );

    return (
        <TableCell>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item container xs={9} md={10} lg={11} spacing={1}>
                    {map(rows, ({ title, id, valueRow, required, type = '', name = null, ...rest }, index) => (
                        <Grid item xs={12} sm={6} md={4} lg key={index} sx={{ alignSelf: 'center' }}>
                            <Input
                                title={title}
                                id={id}
                                type={type}
                                name={name ?? id}
                                fullWidth
                                value={valueRow}
                                required={required}
                                onChange={onChange}
                                {...rest}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={3} md={2} lg={1} container justifyContent="flex-end">
                    {addRow && isLast && (
                        <Grid item xs={12} md={6}>
                            <IconButton size="small" color="primary" onClick={addRow}>
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    )}
                    {removeRow && (!removable || removable(value)) && (
                        <Grid item xs={12} md={6}>
                            <IconButton size="small" color="primary" onClick={removeRow}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </TableCell>
    );
};

export default InputCollectionItem;
