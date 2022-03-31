import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { map, snakeCase, groupBy, size, filter, head } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { getUserAuthSelector, isAdmin } from '../selectors/auth';
import { canReadEntitySelector, canWriteEntitySelector, canAllEntitySelector } from '../selectors/entitiesSelector';
import { canReadEntity } from '../../../utils/roles';

// Material UI
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Masonry from '@mui/lab/Masonry';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

// Components
import RowRender from './RowRender';
import WithAccordion from './WithAccordion';
import Loading from './Loading';
import ArrayRender from './ArrayRender';
import AccessDeniedPage from '../../../routes/AccessDeniedPage';

const GroupMasonry = ({ rowsGroup = [] }) => {
    const { t } = useTranslation();
    if (size(rowsGroup) === 0) return <div />;

    return (
        <Grid item xs={12}>
            <Masonry columns={{ xs: 1, md: size(rowsGroup) > 1 ? 2 : 1 }} spacing={3}>
                {map(rowsGroup, (rows, groupName) => {
                    const firstRow: any = head(rows);
                    return (
                        <TableContainer
                            key={groupName}
                            component={Paper}
                            elevation={2}
                            sx={{ p: 2 }}
                            className={firstRow?.groupAlone && 'masonry-item-2'}
                        >
                            <Typography variant="h4" color="primary" sx={{ p: 1 }}>
                                {t(groupName.toString())}
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    {
                                        //  eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        map(rows, ({ type = 'string', groupGridTop, groupGridBottom, ...rest }, index: number) =>
                                            type === 'array' ? (
                                                <ArrayRender
                                                    key={index}
                                                    {...rest}
                                                    isLast={index === rows.length - 1}
                                                    withoutTitle={size(rows) === 1}
                                                />
                                            ) : (
                                                <TableRow hover key={index}>
                                                    <RowRender type={type} {...rest} isLast={index === rows.length - 1} />
                                                </TableRow>
                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    );
                })}
            </Masonry>
        </Grid>
    );
};

const EntityShowDetails = ({ rows = [], entityName, withoutButtonBottom = false, withoutButtonTop = false, ...rest }) => {
    const { t } = useTranslation();

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
        <Grid container item xs={12} spacing={3}>
            {rows.length > 10 && !withoutButtonTop && <ButtonSection entityName={entityName} {...rest} />}
            <GroupMasonry rowsGroup={rowsGridTop} />
            <GroupMasonry rowsGroup={rowsGroupBy} />
            {size(rowsWithoutGroup) > 0 && (
                <Grid item xs={12}>
                    <Masonry columns={{ xs: 1 }} spacing={3}>
                        <TableContainer component={Paper} elevation={2} sx={{ p: 2 }}>
                            <Typography variant="h4" color="primary" sx={{ p: 1 }}>
                                {size(rowsWithoutGroup) === 1 ? t(head(rowsWithoutGroup)?.title) : t('common.group.other')}
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    {
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        map(rowsWithoutGroup, ({ type = 'string', groupGridTop, groupGridBottom, ...rest }, index) =>
                                            type === 'array' ? (
                                                <ArrayRender
                                                    key={index}
                                                    {...rest}
                                                    isLast={index === rows.length - 1}
                                                    withoutTitle={size(rowsWithoutGroup) === 1}
                                                />
                                            ) : (
                                                <TableRow hover key={index}>
                                                    <RowRender type={type} {...rest} isLast={index === rows.length - 1} />
                                                </TableRow>
                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Masonry>
                </Grid>
            )}
            <GroupMasonry rowsGroup={rowsGridBottom} />
            {!withoutButtonBottom && <ButtonSection entityName={entityName} {...rest} />}
        </Grid>
    );
};

const EntityShow = ({ user, entityName, entity, loading = false, withAccordion = false, titleSummary = null, withoutTitle = false, ...rest }) => {
    const { t, i18n } = useTranslation();

    const titleDefault = i18n.exists(entityName + '.title.show')
        ? t(entityName + '.title.show', { ...entity })
        : t(entityName + '.entityName.0') + (entity?.name ? ` - ${entity?.name}` : '');

    if (loading || !user?.roles) return <Loading type="show" />;
    if (!canReadEntity) return <AccessDeniedPage />;

    return (
        <Grid container spacing={2}>
            {withAccordion ? (
                <Grid item xs={12}>
                    <WithAccordion titleSummary={withoutTitle ? '' : titleSummary ?? titleDefault} expanded>
                        <EntityShowDetails entityName={entityName} {...rest} />
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
                        <EntityShowDetails entityName={entityName} {...rest} />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

const ButtonSection = ({
    entityName,
    withoutBackLink = false,
    withoutList = false,
    backToListHandle = null,
    editLink = null,
    editHandle = null,
    removeHandle = null,
    disableHandle = null,
    closeHandle = null,
    enableHandle = null,
    otherHandle = null,
    otherLink = null,
    otherTitle = '',
    otherDisabled = false,
    otherIcon = <RadioButtonCheckedIcon />,
    otherButtons = null,
    canWriteEntity = false,
    canAllEntity = false,
}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const goTo = (path) => history.push(path);

    return (
        <Grid item xs={12}>
            {!withoutBackLink && (
                <Button size="small" title={t('common.goBack')} onClick={() => history.goBack()}>
                    <KeyboardReturnIcon />
                </Button>
            )}
            {!withoutList && (
                <Button
                    size="small"
                    title={t(entityName + '.link.backToList')}
                    onClick={() => (backToListHandle ? backToListHandle() : goTo('/' + snakeCase(entityName)))}
                >
                    <ListIcon />
                </Button>
            )}
            {editLink && canWriteEntity && (
                <Link to={() => editLink} className={'link-none'}>
                    <Button size="small" title={t(entityName + '.link.edit')}>
                        <EditIcon />
                    </Button>
                </Link>
            )}
            {editHandle && canWriteEntity && (
                <Button size="small" title={t(entityName + '.link.edit')} onClick={editHandle}>
                    <EditIcon />
                </Button>
            )}
            {closeHandle && canAllEntity && (
                <Button size="small" title={t(entityName + '.link.close')} onClick={closeHandle}>
                    <CloseIcon />
                </Button>
            )}
            {disableHandle && canAllEntity && (
                <Button size="small" title={t(entityName + '.link.disable')} onClick={disableHandle}>
                    <Switch checked color="success" />
                </Button>
            )}
            {enableHandle && canAllEntity && (
                <Button size="small" title={t(entityName + '.link.enable')} onClick={enableHandle}>
                    <Switch checked={false} color="secondary" />
                </Button>
            )}
            {removeHandle && canAllEntity && (
                <Button size="small" title={t(entityName + '.link.remove')} onClick={removeHandle}>
                    <DeleteIcon />
                </Button>
            )}
            {otherLink && (
                <Link to={() => otherLink} className={'link-none'}>
                    <Button size="small" title={otherTitle} disabled={otherDisabled}>
                        {otherIcon}
                    </Button>
                </Link>
            )}
            {otherHandle && (
                <Button size="small" title={otherTitle} onClick={otherHandle} disabled={otherDisabled}>
                    {otherIcon}
                </Button>
            )}
            {otherButtons}
        </Grid>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => ({
    isAdmin: isAdmin(state),
    user: getUserAuthSelector(state),
    canReadEntity: canReadEntitySelector(ownProps?.entityName, ownProps?.entity)(state),
    canWriteEntity: canWriteEntitySelector(ownProps?.entityName, ownProps?.entity)(state),
    canAllEntity: canAllEntitySelector(ownProps?.entityName, ownProps?.entity)(state),
});

export default connect(mapStateToProps)(EntityShow);
