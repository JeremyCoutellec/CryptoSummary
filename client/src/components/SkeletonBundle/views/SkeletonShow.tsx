import React, { useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getSkeletonInfoById } from '../selectors/skeleton';
import { patchSkeleton, getSkeletonById, removeSkeleton, disableSkeleton, enableSkeleton } from '../actions/skeleton';

// Models
import { getShowRows } from '../models/skeleton';

// Components
import Show from '../../Core/views/EntityShow';

const SkeletonShow = ({
    idSkeleton = null,
    match,
    getSkeletonById,
    skeleton,
    patchSkeleton,
    disableSkeleton,
    enableSkeleton,
    removeSkeleton,
    ...rest
}) => {
    /**
     * get the id on match props into the url or into SkeletonShow props
     */
    const idSkeletonToShow = idSkeleton ?? match?.params?.id;

    /**
     * goTo function to switch routes
     */
    const history = useHistory();
    const goTo = useCallback((path) => history.push(path), [history]);
    const { t } = useTranslation();

    /**
     * Get the skeleton resource by the skeleton id
     * only if skeleton is not into the store or if they are not all props into
     */
    useEffect(() => {
        if (idSkeletonToShow && (!skeleton || skeleton?.notFull)) getSkeletonById(idSkeletonToShow);
    }, [skeleton, idSkeletonToShow, getSkeletonById]);

    /**
     * Get all rows needed to show the skeleton entity
     */
    const rows = useMemo(() => getShowRows({ skeleton, patchSkeleton, t }), [skeleton, patchSkeleton, t]);

    const editLink = useMemo(() => (skeleton?.id ? `/skeleton-${skeleton?.id}/edit` : null), [skeleton]);

    /**
     * Function isRemovable and removeHandle is needed to remove the skeleton resource
     */
    const isRemovable = useMemo(() => {
        return skeleton && !skeleton.isEnable;
    }, [skeleton]);

    const removeHandle = () => {
        removeSkeleton(skeleton?.id, t);
        goTo('/skeleton');
    };

    const disableHandle = () => {
        disableSkeleton(skeleton?.id, t);
    };

    const enableHandle = () => {
        enableSkeleton(skeleton?.id, t);
    };

    return (
        <Show
            entity={skeleton}
            loading={!skeleton}
            rows={rows}
            entityName="skeleton"
            editLink={skeleton?.id ? editLink : null}
            removeHandle={isRemovable ? removeHandle : null}
            disableHandle={skeleton?.isEnable ? disableHandle : null}
            enableHandle={!skeleton?.isEnable ? enableHandle : null}
            {...rest}
        />
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => {
    const id = ownProps.idSkeleton ?? ownProps.match?.params?.id;
    const skeleton = getSkeletonInfoById(id)(state);
    return {
        skeleton,
    };
};

export default connect(mapStateToProps, {
    getSkeletonById,
    removeSkeleton,
    patchSkeleton,
    disableSkeleton,
    enableSkeleton,
})(SkeletonShow);
