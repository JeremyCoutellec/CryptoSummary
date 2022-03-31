import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { map, head, join, compact, isEqual, includes } from 'lodash';
import { Country, State } from 'country-state-city';
import { sortDate, sortDatetime, sortEntity, sortText } from '../../../utils/sortColumns';
import { formatDate } from '../../../utils/date';
import { convertValueToDurationString } from './InputDuration';
import clsx from 'clsx';

// Redux
import { connect } from 'react-redux';
import { canReadEntitySelector, canWriteEntitySelector, canAllEntitySelector } from '../selectors/entitiesSelector';

// Material UI
import { makeStyles } from '@mui/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// Components
import WithAccordion from './WithAccordion';
import Loading from './Loading';
import LinkEntity from './LinkEntity';
import Color from './Color';
import MediaObjectShow from '../../MediaBundle/views/MediaObjectShow';

const { REACT_APP_DATE_TIME_FORMAT_SHOW, REACT_APP_DATE_FORMAT_SHOW } = process.env;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    entityTable: {
        border: 'none',
        '& .MuiDataGrid-cell': {
            border: 'none',
        },
        '& .MuiDataGrid-iconSeparator': {
            color: theme.palette.primary.dark,
        },
    },
    cellVisible: {
        '& .MuiDataGrid-row': {
            overflow: 'visible',
        },
        '& .MuiDataGrid-cell': {
            overflow: 'visible',
        },
        '& .MuiDataGrid-virtualScroller': {
            overflow: 'visible !important',
        },
        '& .MuiDataGrid-virtualScrollerRenderZone': {
            overflow: 'visible',
        },
    },
    withoutHeader: {
        '& .MuiDataGrid-columnHeaders': {
            display: 'none',
        },
        '& .MuiDataGrid-columnsContainer': {
            display: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
            marginTop: '0px !important',
        },
    },
    withoutHoverRow: {
        '& .MuiDataGrid-row:hover': {
            backgroundColor: 'transparent !important',
        },
    },
    accordionSummary: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
    buttonAdd: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        },
    },
}));

const TableDetails = ({
    withoutFooter = false,
    withoutToolbar = false,
    withoutHeader = false,
    withoutActionButton = false,
    addLink = null,
    addHandle = null,
    showLink = null,
    showHandle = null,
    editLink = null,
    editHandle = null,
    removeHandle = null,
    otherButtons = null,
    otherButtonsRows = null,
    otherLink = null,
    otherIcon = null,
    otherTitle = '',
    otherHandle = null,
    otherDisabled = false,
    titleNotFound = null,
    cellVisible = false,
    classNameEntityTable = null,
    withoutHoverRow = false,
    rows = [],
    columns = [],
    firstColumnSort = null,
    firstColumnField = null,
    pagination = false,
    pageSize = 10,
    rowHeight = 52,
    rowCount = 0,
    checkboxSelection = false,
    setSelectionModel = null,
    propsTable = null,
    loading = false,
    entityName = null,
    getAllEntities = null,
    editable = null,
    removable = null,
    canReadEntity,
    canWriteEntity,
    canAllEntity,
}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const [page, setPage] = useState(1);
    const [filterModel, setFilterModel] = React.useState({
        items: [],
    });
    const [sortModel, setSortModel] = useState([
        {
            field: firstColumnField ?? columns[0]?.field,
            sort: firstColumnSort ?? 'asc',
        },
    ]);
    const [loadingTable, setLoadingTable] = useState(loading);

    useEffect(() => {
        setLoadingTable(loading);
    }, [loading]);

    const onPageChange = (pageParams) => {
        setPage(pageParams + 1);
    };

    const previousPageRef = useRef<number>();
    const previousSortModelRef = useRef(head(sortModel));
    const previousFiltersRef = useRef(filterModel?.items);

    useEffect(() => {
        const firstSortModel = head(sortModel);

        if (
            !isEqual(firstSortModel?.field, previousSortModelRef.current?.field) ||
            !isEqual(firstSortModel?.sort, previousSortModelRef.current?.sort) ||
            !isEqual(page, previousPageRef.current) ||
            !isEqual(filterModel?.items, previousFiltersRef.current) ||
            (loading && loadingTable)
        ) {
            if (getAllEntities) getAllEntities(pagination ? page : null, firstSortModel?.field, firstSortModel?.sort, filterModel?.items);

            setLoadingTable(false);
        }

        previousPageRef.current = page;
        previousSortModelRef.current = firstSortModel;
        previousFiltersRef.current = filterModel?.items;
    }, [page, pagination, sortModel, filterModel, loadingTable, loading, getAllEntities]);

    let columnsWithButton = columns;
    // Show button
    if (!withoutActionButton && (showLink || showHandle || editLink || editHandle || removeHandle || otherButtonsRows)) {
        columnsWithButton = [
            ...columns,
            {
                field: 'Actions',
                sortable: false,
                filterable: false,
                width: 150,
                renderCell: (params) => (
                    <Fragment>
                        {showLink && canReadEntity && (
                            <Link to={() => showLink(params)} className={'link-none'}>
                                <Button size="small" color="primary" className={'buttonTable'}>
                                    <VisibilityIcon />
                                </Button>
                            </Link>
                        )}
                        {showHandle && canReadEntity && (
                            <Button size="small" color="primary" className={'buttonTable'} onClick={() => showHandle(params)}>
                                <VisibilityIcon />
                            </Button>
                        )}
                        {editLink && (!editable || editable(params)) && canWriteEntity && (
                            <Link to={() => canWriteEntity && editLink(params)} className={'link-none'}>
                                <Button size="small" color="primary" className={'buttonTable'}>
                                    <EditIcon />
                                </Button>
                            </Link>
                        )}
                        {editHandle && (!editable || editable(params)) && canWriteEntity && (
                            <Button size="small" color="primary" className={'buttonTable'} onClick={() => canWriteEntity && editHandle(params)}>
                                <EditIcon />
                            </Button>
                        )}
                        {removeHandle && (!removable || removable(params)) && canAllEntity && (
                            <Button size="small" color="primary" onClick={() => removeHandle(params)} className={'buttonTable'}>
                                <DeleteIcon />
                            </Button>
                        )}
                        {otherButtonsRows && otherButtonsRows(params)}
                    </Fragment>
                ),
            },
        ];
    }

    const heightTable = useMemo(
        () => (withoutHeader ? 120 : 160) + rowHeight * (rows.length > pageSize ? pageSize : rows.length),
        [withoutHeader, rowHeight, rows, pageSize]
    );

    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleCellClick = (params) => {
        if (!params?.isEditable || !params?.colDef?.editable) setEditRowsModel({});
        else {
            setEditRowsModel({
                [params?.id]: {
                    [params?.field]: { value: params?.value },
                },
            });
        }
    };

    if (loadingTable) return <Loading type="table" />;

    return (
        <Grid container>
            <Grid item xs={12}>
                {rows.length > 0 ? (
                    <div style={{ height: heightTable, width: '100%' }}>
                        <ClickAwayListener onClickAway={() => setEditRowsModel({})}>
                            <DataGrid
                                components={{
                                    Toolbar: !withoutToolbar && GridToolbar,
                                }}
                                editRowsModel={editRowsModel}
                                onCellClick={handleCellClick}
                                rowsPerPageOptions={[pageSize]}
                                rows={[...rows]}
                                columns={columnsWithButton}
                                pagination={pagination}
                                pageSize={pageSize}
                                rowCount={rowCount}
                                filterModel={filterModel}
                                onFilterModelChange={(model) => setFilterModel(model)}
                                onPageChange={onPageChange}
                                sortModel={sortModel}
                                sortingOrder={['desc', 'asc']}
                                onSortModelChange={(model) => !isEqual(model, sortModel) && setSortModel(model)}
                                loading={loadingTable}
                                className={clsx(
                                    classes.entityTable,
                                    cellVisible && classes.cellVisible,
                                    withoutHeader && classes.withoutHeader,
                                    withoutHoverRow && classes.withoutHoverRow,
                                    classNameEntityTable
                                )}
                                checkboxSelection={checkboxSelection}
                                onSelectionModelChange={setSelectionModel}
                                rowHeight={rowHeight}
                                disableVirtualization
                                disableSelectionOnClick
                                {...propsTable}
                            />
                        </ClickAwayListener>
                    </div>
                ) : (
                    <Typography>{titleNotFound ?? t(entityName + '.list.notFound')}</Typography>
                )}
            </Grid>
            {!withoutFooter && (
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={'auto'}>
                        <Button size="small" title={t('common.goBack')} onClick={() => history.goBack()}>
                            <KeyboardReturnIcon />
                        </Button>
                    </Grid>
                    {addLink && canWriteEntity && (
                        <Grid item xs={'auto'}>
                            <Link to={() => addLink} className={'link-none'}>
                                <Button size="small" title={t(entityName + '.link.add')} className={classes.buttonAdd}>
                                    <AddIcon />
                                </Button>
                            </Link>
                        </Grid>
                    )}
                    {addHandle && canWriteEntity && (
                        <Grid item xs={'auto'}>
                            <Button size="small" title={t(entityName + '.link.add')} onClick={addHandle} className={classes.buttonAdd}>
                                <AddIcon />
                            </Button>
                        </Grid>
                    )}
                    {otherLink && (
                        <Grid item xs={'auto'}>
                            <Link to={() => otherLink} className={'link-none'}>
                                <Button size="small" title={otherTitle} disabled={otherDisabled}>
                                    {otherIcon}
                                </Button>
                            </Link>
                        </Grid>
                    )}
                    {otherHandle && (
                        <Grid item xs={'auto'}>
                            <Button size="small" title={otherTitle} onClick={otherHandle} disabled={otherDisabled}>
                                {otherIcon}
                            </Button>
                        </Grid>
                    )}
                    <Grid item xs={'auto'}>
                        {otherButtons}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};
const EntityTable = ({
    titleSummary = null,
    withAccordion = false,
    withoutTitle = false,
    columns = null,
    entityName = null,
    canReadEntity,
    canWriteEntity,
    canAllEntity,
    ...rest
}) => {
    const { t, i18n } = useTranslation();

    const titleDefault = i18n.exists(`${entityName}.title.table`)
        ? t(`${entityName}.title.table`)
        : t(`${entityName}.entityName.0`) + ' - ' + t('common.list');

    const getValueGetterByType = (column) => {
        switch (column?.fieldType ?? column?.type) {
            case 'date':
                return (params) =>
                    formatDate(params.value, {
                        format: REACT_APP_DATE_FORMAT_SHOW,
                    });
            case 'datetime':
                return (params) =>
                    formatDate(params.value, {
                        format: REACT_APP_DATE_TIME_FORMAT_SHOW,
                    });
            case 'duration':
                return (params) => convertValueToDurationString(params.value);
            case 'constant':
                return (params) =>
                    i18n.exists((column.entity ?? 'common') + '.constants.' + params?.value)
                        ? t((column.entity ?? 'common') + '.constants.' + params?.value)
                        : '';
            case 'city':
                return (params) =>
                    join(
                        compact([
                            params.row?.city,
                            State.getStateByCodeAndCountry(params.row?.region, params.row?.country)?.name,
                            Country.getCountryByCode(params.row?.country)?.name,
                        ]),
                        ', '
                    );
        }
    };

    const getRenderCellByType = (column) => {
        switch (column?.fieldType ?? column?.type) {
            case 'entity':
                return (params) => (
                    <LinkEntity
                        entity={column.entity}
                        showAttributes={column.showAttributes}
                        joinAttributes={column.joinAttributes}
                        uri={params.value}
                        center
                        maxItems={3}
                    />
                );
            case 'file':
                return (params) => <MediaObjectShow contentUrl={params.value} />;
            case 'color':
                return (params) => <Color value={params.value} dense />;
            case 'bool':
            case 'boolean':
                return (params) => (
                    <div className={'valueCenter'}>{params?.value ? <DoneIcon color={'primary'} /> : <ClearIcon color={'secondary'} />}</div>
                );
            default:
                return (params) =>
                    includes(['date', 'datetime', 'file', 'city'], column?.type ?? column?.fieldType) ? (
                        <Tooltip placement="top-end" title={params?.value}>
                            <div className="MuiDataGrid-cell--withRenderer MuiDataGrid-cell MuiDataGrid-cell--textLeft">{params?.value}</div>
                        </Tooltip>
                    ) : (
                        <div className="MuiDataGrid-cell--withRenderer MuiDataGrid-cell MuiDataGrid-cell--textLeft">{params?.value}</div>
                    );
        }
    };

    const getSortByType = (column) => {
        switch (column?.fieldType ?? column?.type) {
            case 'date':
                return sortDate;
            case 'datetime':
                return sortDatetime;
            case 'entity':
                return column.entities ? sortEntity(column.entities) : sortText;
            default:
                return sortText;
        }
    };

    columns = map(columns, (column) => ({
        ...column,
        flex: column?.flex ?? (includes(['entity', 'date', 'datetime', 'file', 'city'], column?.type ?? column?.fieldType) ? 2 : 1),
        minWidth:
            column.minWidth ??
            (column.large || includes(['entity', 'date', 'datetime', 'file', 'city'], column?.type ?? column?.fieldType) ? 200 : 100),
        valueGetter: column.valueGetter ?? getValueGetterByType(column),
        renderCell: column.renderCell ?? getRenderCellByType(column),
        sortComparator: column.sortComparator ?? getSortByType(column),
    }));

    return (
        <Grid container spacing={2}>
            {withAccordion ? (
                <Grid item xs={12}>
                    <WithAccordion titleSummary={withoutTitle ? '' : titleSummary ?? titleDefault} expanded>
                        <TableDetails
                            columns={columns}
                            entityName={entityName}
                            canReadEntity={canReadEntity}
                            canWriteEntity={canWriteEntity}
                            canAllEntity={canAllEntity}
                            {...rest}
                        />
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
                        <TableDetails
                            columns={columns}
                            entityName={entityName}
                            canReadEntity={canReadEntity}
                            canWriteEntity={canWriteEntity}
                            canAllEntity={canAllEntity}
                            {...rest}
                        />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => ({
    canReadEntity: canReadEntitySelector(ownProps?.entityName)(state),
    canWriteEntity: canWriteEntitySelector(ownProps?.entityName)(state),
    canAllEntity: canAllEntitySelector(ownProps?.entityName)(state),
});

export default connect(mapStateToProps)(EntityTable);
