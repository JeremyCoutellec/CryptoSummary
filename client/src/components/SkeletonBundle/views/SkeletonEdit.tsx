import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { isEqual } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { editSkeleton, getSkeletonById } from '../actions/skeleton';
import { getSkeletonInfoById } from '../selectors/skeleton';

// Components
import SkeletonForm from './SkeletonForm';

const SkeletonEdit = ({ idSkeleton = null, match, skeleton, getSkeletonById, editSkeleton, ...rest }) => {
    const idSkeletonToShow = idSkeleton ?? match?.params?.id;
    const { t } = useTranslation();
    const history = useHistory();

    /*
     *  Get by id the skeleton entity by calling the api
     */
    useEffect(() => {
        if (idSkeletonToShow && !skeleton) getSkeletonById(idSkeletonToShow);
    }, [skeleton, idSkeletonToShow, getSkeletonById]);

    /**
     * Update the skeleton entity on submit
     * use the id and the formData to update
     * @param formData
     */
    const onSubmit = async (formData) => {
        if (!isEqual(skeleton, formData)) editSkeleton(skeleton?.id, formData, history, t);
    };

    return <Fragment>{skeleton && <SkeletonForm skeleton={skeleton} onSubmit={onSubmit} {...rest} />}</Fragment>;
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => {
    const id = ownProps.idSkeleton ?? ownProps.match?.params?.id;
    /**
     * Get the skeleton resource on the store
     */
    return {
        skeleton: getSkeletonInfoById(id)(state),
    };
};

export default connect(mapStateToProps, { getSkeletonById, editSkeleton })(SkeletonEdit);
