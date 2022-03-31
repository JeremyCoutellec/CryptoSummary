import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { createSkeleton } from '../actions/skeleton';

// Components
import SkeletonForm from './SkeletonForm';

const SkeletonAdd = ({ createSkeleton, ...rest }) => {
    const history = useHistory();
    const { t } = useTranslation();

    /**
     * Create the skeleton entity on submit
     * @param formData
     */
    const onSubmit = async (formData) => {
        createSkeleton(formData, history, t);
    };

    return (
        <Fragment>
            <SkeletonForm onSubmit={onSubmit} {...rest} />
        </Fragment>
    );
};

export default connect(null, { createSkeleton })(SkeletonAdd);
