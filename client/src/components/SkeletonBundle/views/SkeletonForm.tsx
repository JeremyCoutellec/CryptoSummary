import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { getAllSkeletons } from '../actions/skeleton';
import { getSkeletonsSelector, getSkeletonSelector } from '../selectors/skeleton';

// Models
import { getFormRows, getFormData } from '../models/skeleton';

// Components
import Form from '../../Core/views/EntityForm';

const SkeletonForm = ({ onSubmit, skeleton = null, getAllSkeletons, totalSkeletons, allSkeletons, loadingSkeletons, ...rest }) => {
    const { t } = useTranslation();

    /**
     * Initialize formData with skeleton props
     */
    const initialSkeletonData = useMemo(() => getFormData({ skeleton }), [skeleton]);
    const [formData, setFormData] = useState(initialSkeletonData);

    /**
     * Re Initialize the formData if skeleton props changed
     */
    useEffect(() => {
        if (skeleton) setFormData(initialSkeletonData);
    }, [skeleton, setFormData, initialSkeletonData]);

    /**
     * Get all others entity used on the form
     */
    useEffect(() => {
        if (!isEqual(allSkeletons?.length, totalSkeletons) || loadingSkeletons) getAllSkeletons();
    }, [allSkeletons, totalSkeletons, getAllSkeletons, loadingSkeletons]);

    /**
     * On submit form, call the onSubmit props used in SkeletonAdd or SkeletonEdit component
     */
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    /**
     * Get all rows needed to show on skeleton form
     */
    const rows = useMemo(() => getFormRows({ formData, setFormData, t, allSkeletons }), [formData, t, allSkeletons]);

    return (
        <Form
            entityName="skeleton"
            rows={rows}
            entity={skeleton}
            onSubmitHandle={onSubmitHandle}
            initialData={initialSkeletonData}
            formData={formData}
            {...rest}
        />
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => {
    /**
     * Get all others entities needed on the form
     */
    return {
        allSkeletons: getSkeletonsSelector(state),
        totalSkeletons: getSkeletonSelector(state)?.totalSkeletons,
        loadingSkeletons: getSkeletonSelector(state)?.loading,
    };
};

export default connect(mapStateToProps, { getAllSkeletons })(SkeletonForm);
