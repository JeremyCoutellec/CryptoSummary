import React from 'react';
import { useTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';
import { getAllSkeletons } from '../actions/skeleton';
import { getSkeletonsSelector, getSkeletonSelector } from '../selectors/skeleton';

// Models
import { getListRows } from '../models/skeleton';

// Components
import Table from '../../Core/views/EntityTable';

const SkeletonList = ({ skeletons, totalSkeletons, loadingSkeletons, getAllSkeletons, ...rest }) => {
    const { t } = useTranslation();

    /**
     * Get all columns needed to show on the skeleton table
     */
    const columns = getListRows({ t });

    /**
     * Show link and edit link used by buttons on each row in the skeleton list
     */
    const showLink = (params) => `/skeleton-${params.id}`;
    const editLink = (params) => `/skeleton-${params.id}/edit`;

    return (
        <Table
            addLink={'/skeleton/new'}
            rows={skeletons}
            columns={columns}
            pagination
            rowCount={totalSkeletons}
            getAllEntities={getAllSkeletons}
            loading={loadingSkeletons}
            entityName="skeleton"
            showLink={showLink}
            editLink={editLink}
            {...rest}
        />
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => {
    const skeletons = getSkeletonsSelector(state);
    return {
        skeletons,
        loadingSkeletons: getSkeletonSelector(state)?.loading,
        totalSkeletons: getSkeletonSelector(state)?.totalSkeletons,
    };
};

export default connect(mapStateToProps, { getAllSkeletons })(SkeletonList);
