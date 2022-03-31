import React from 'react';
import { map, isEqual, find, size, difference } from 'lodash';
import { useTranslation } from 'react-i18next';

// Material UI
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Chip from '@mui/material/Chip';

const InputAutoComplete = ({
    title = '',
    options = null,
    checkbox = false,
    multiple = false,
    required = false,
    value,
    fullWidth = true,
    selectAll = false,
    limitTags = 4,
    disabled = false,
    onChange = null,
    ...rest
}) => {
    const { t } = useTranslation();

    const selectAllChange = () =>
        onChange(
            value,
            map(options, (option) => option.value)
        );
    const deselectAllChange = () => onChange(value, []);
    const isAllSelected = () => {
        return (
            size(
                difference(
                    map(options, (option) => option.value),
                    value
                )
            ) === 0
        );
    };

    return (
        <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            {multiple && selectAll && !isAllSelected() && (
                <Grid item xs={'auto'}>
                    <Button variant={'outlined'} onClick={selectAllChange}>
                        {t('common.selectAll')}
                    </Button>
                </Grid>
            )}
            {multiple && selectAll && isAllSelected() && (
                <Grid item xs={'auto'}>
                    <Button variant={'outlined'} onClick={deselectAllChange}>
                        {t('common.deselectAll')}
                    </Button>
                </Grid>
            )}
            <Grid item xs>
                <Autocomplete
                    value={value ?? (multiple ? [] : null)}
                    onChange={onChange}
                    disablePortal
                    isOptionEqualToValue={(option, value) => isEqual(option?.title, value?.title) || isEqual(option?.value, value)}
                    multiple={multiple}
                    options={map(options, (option) => ({
                        ...option,
                        group: option?.group ? t(option.group) : null,
                    }))}
                    getOptionDisabled={(option) => option?.disabled}
                    limitTags={limitTags}
                    groupBy={(option) => option.group}
                    getOptionLabel={(option) => option?.title ?? option}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => {
                            const optionTag = find(options, { value: option });
                            return (
                                <Chip key={index} label={optionTag?.title} {...getTagProps({ index })} disabled={optionTag?.disabled || disabled} />
                            );
                        })
                    }
                    disabled={disabled}
                    disableCloseOnSelect={multiple}
                    renderOption={(props, option, { selected }) =>
                        checkbox ? (
                            <li {...props}>
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    style={{ marginRight: 8 }}
                                    checked={selected || option?.selected}
                                    disabled={option?.disabled}
                                />
                                {option.title}
                            </li>
                        ) : (
                            <li {...props}>{option.title}</li>
                        )
                    }
                    renderInput={(params) => (
                        <TextField label={title} required={required} fullWidth={fullWidth} value={value ?? (multiple ? [] : null)} {...params} />
                    )}
                    {...rest}
                />
            </Grid>
        </Grid>
    );
};

export default InputAutoComplete;
