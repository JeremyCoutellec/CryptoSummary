import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { map, size, filter, isEqual, groupBy, head } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { canWriteEntitySelector } from '../selectors/entitiesSelector';
import { getUserAuthSelector } from '../selectors/auth';
import { canWriteEntity } from '../../../utils/roles';

// Material UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Masonry from '@mui/lab/Masonry';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// Components
import Input from './Input';
import WithAccordion from './WithAccordion';
import InputCollection from './InputCollection';
import AccessDeniedPage from '../../../routes/AccessDeniedPage';
import Loading from './Loading';

const EntityFormInput = ({ rows, entity }) => (
    <Grid container spacing={1}>
        {map(
            rows,
            (
                {
                    title,
                    id,
                    value,
                    required,
                    type = '',
                    name = null,
                    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
                    groupGridTop,
                    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
                    groupGridBottom,
                    onChange,
                    xs = null,
                    md = null,
                    lg = null,
                    ...rest
                },
                index
            ) =>
                type === 'array' ? (
                    <Grid item key={index} xs={xs ?? 12} md={md} lg={lg}>
                        <InputCollection
                            entity={entity}
                            title={size(rows) > 1 ? title : ''}
                            id={id}
                            name={name ?? id}
                            value={value}
                            required={required}
                            onChange={onChange}
                            {...rest}
                        />
                    </Grid>
                ) : (
                    <Grid item key={index} xs={xs ?? 12} md={md} lg={lg}>
                        <Input title={title} id={id} type={type} name={name ?? id} value={value} required={required} onChange={onChange} {...rest} />
                    </Grid>
                )
        )}
    </Grid>
);

const GroupMasonry = ({ rowsGroup = [], withoutPaper = false, entity }) => {
    const { t } = useTranslation();
    if (size(rowsGroup) === 0) return <div />;
    return (
        <Grid item xs={12}>
            <Masonry columns={{ xs: 1, md: size(rowsGroup) > 1 ? 2 : 1 }} spacing={3}>
                {map(rowsGroup, (rows, groupName) => (
                    <TableContainer key={groupName} component={!withoutPaper ? Paper : null} elevation={2} sx={{ p: !withoutPaper ? 2 : 0 }}>
                        <Typography variant="h4" color="primary" sx={{ p: 1 }}>
                            {t(groupName.toString())}
                        </Typography>
                        <EntityFormInput rows={rows} entity={entity} />
                    </TableContainer>
                ))}
            </Masonry>
        </Grid>
    );
};

const EntityFormDetails = ({
    withoutBackLink = false,
    entity,
    rows,
    onSubmitHandle = null,
    initialData = null,
    formData = null,
    withoutButtonTop = false,
    withoutPaper = false,
}) => {
    const { t } = useTranslation();
    const history = useHistory();

    const rowsGroupBy: any = groupBy(
        filter(rows, (row) => row?.group),
        'group'
    );
    const rowsGridTop: any = groupBy(
        filter(rows, (row) => row?.groupGridTop),
        'groupGridTop'
    );
    const rowsGridBottom: any = groupBy(
        filter(rows, (row) => row?.groupGridBottom),
        'groupGridBottom'
    );
    const rowsWithoutGroup = filter(rows, (row) => !row?.group && !row?.groupGridTop && !row?.groupGridBottom);

    return (
        <form className="form" onSubmit={(e) => onSubmitHandle(e)}>
            <Grid container spacing={2}>
                {rows.length > 10 && !withoutButtonTop && (
                    <Grid container item xs={12}>
                        {!withoutBackLink && (
                            <Grid item xs={1}>
                                <Button size="small" variant="outlined" title={t('common.goBack')} onClick={() => history.goBack()}>
                                    <KeyboardReturnIcon />
                                </Button>
                            </Grid>
                        )}
                        <Grid item xs />
                        {onSubmitHandle && (
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={entity && isEqual(initialData, formData)}
                                    style={{
                                        margin: '3rem, 0, 2rem',
                                    }}
                                >
                                    <Typography variant="body1">{t('common.save')}</Typography>
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                )}
                <Grid item xs={12} container spacing={2}>
                    <GroupMasonry rowsGroup={rowsGridTop} withoutPaper={withoutPaper} entity={entity} />
                    <GroupMasonry rowsGroup={rowsGroupBy} withoutPaper={withoutPaper} entity={entity} />
                    {size(rowsWithoutGroup) > 0 && (
                        <Grid item xs={12}>
                            <Masonry columns={{ xs: 1 }} spacing={3}>
                                <TableContainer component={!withoutPaper ? Paper : null} elevation={2} sx={{ p: !withoutPaper ? 2 : 0 }}>
                                    {(size(rowsGroupBy) > 0 || size(rowsGridTop) > 0 || size(rowsGridBottom) > 0) && (
                                        <Typography variant="h4" color="primary" sx={{ p: 1 }}>
                                            {/* Get title of the first group if there is one group
                                                else show 'other group' */}
                                            {/* eslint-disable-next-line no-nested-ternary */}
                                            {size(rowsWithoutGroup) === 1 ? head(rowsWithoutGroup)?.title : t('common.group.other')}
                                        </Typography>
                                    )}
                                    <EntityFormInput rows={rowsWithoutGroup} entity={entity} />
                                </TableContainer>
                            </Masonry>
                        </Grid>
                    )}
                    <GroupMasonry rowsGroup={rowsGridBottom} withoutPaper={withoutPaper} entity={entity} />
                </Grid>
                <Grid container item xs={12}>
                    {!withoutBackLink && (
                        <Grid item xs={1}>
                            <Button size="small" variant="outlined" title={t('common.goBack')} onClick={() => history.goBack()}>
                                <KeyboardReturnIcon />
                            </Button>
                        </Grid>
                    )}
                    <Grid item xs />
                    {onSubmitHandle && (
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={entity && isEqual(initialData, formData)}
                                style={{
                                    margin: '3rem, 0, 2rem',
                                }}
                            >
                                <Typography variant="body1">{t('common.save')}</Typography>
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

const EntityForm = ({
    user,
    entity = null,
    loading = false,
    entityName,
    rows,
    withoutTitle = false,
    titleSummary = null,
    withAccordion = false,
    ...rest
}) => {
    const { t, i18n } = useTranslation();

    const titleDefault = i18n.exists(`${entityName}.title.${entity ? 'edit' : 'add'}`)
        ? t(`${entityName}.title.${entity ? 'edit' : 'add'}`, { ...entity })
        : t(`${entityName}.entityName.0`) + ' - ' + t(`common.${entity ? 'edit' : 'add'}`);

    if (loading || !user?.roles) return <Loading type="show" />;
    if (!canWriteEntity) return <AccessDeniedPage />;

    return (
        <Grid container spacing={2}>
            {withAccordion ? (
                <Grid item xs={12}>
                    <WithAccordion titleSummary={withoutTitle ? '' : titleSummary ?? titleDefault}>
                        <EntityFormDetails entity={entity} rows={rows} {...rest} />
                    </WithAccordion>
                </Grid>
            ) : (
                <Grid container item xs={12} spacing={2}>
                    {!withoutTitle && (
                        <Grid item xs={12}>
                            <Typography variant="h2" color="primary">
                                {titleSummary ?? titleDefault}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <EntityFormDetails entity={entity} rows={rows} {...rest} />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => ({
    user: getUserAuthSelector(state),
    canWriteEntity: canWriteEntitySelector(ownProps?.entityName, ownProps?.entity)(state),
});

export default connect(mapStateToProps)(EntityForm);
