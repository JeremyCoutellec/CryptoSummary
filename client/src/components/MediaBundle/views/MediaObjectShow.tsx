import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isImage } from '../../../utils/image-extension';
import { isString } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { getMediaObjectInfoBy } from '../selectors/mediaObject';
import { getMediaObjectByUri } from '../actions/mediaObject';

// Material ui
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

// Components
import Loading from '../../Core/views/Loading';

const { REACT_APP_WEB_API_URL } = process.env;

const useStyles = makeStyles(() => ({
    fileImg: {
        width: '15em',
        maxHeight: '11em',
        objectFit: 'contain',
    },
}));

const MediaObjectShow = ({
    media,
    contentUrl = null,
    mediaUri,
    alt = null,
    getMediaObjectByUri,
    className = null,
    onClick = null,
    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch = null,
    ...rest
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        if (mediaUri && (isString(mediaUri) || !mediaUri?.contentUrl) && !media) getMediaObjectByUri(mediaUri);
    }, [media, mediaUri, getMediaObjectByUri]);

    if (!media?.contentUrl) <Loading />;

    const mediaUrl = REACT_APP_WEB_API_URL + (mediaUri?.contentUrl ?? media?.contentUrl ?? contentUrl);

    return isImage(mediaUrl) ? (
        <img src={mediaUrl} alt={contentUrl ?? alt ?? 'Media ' + media?.id} className={className ?? classes.fileImg} {...rest} />
    ) : (
        <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => {
                if (onClick) onClick();

                window.open(mediaUrl);
            }}
        >
            {t('mediaObject.link.show')}
        </Button>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never, ownProps) => {
    return {
        media: ownProps?.media ?? getMediaObjectInfoBy({ '@id': ownProps.mediaUri })(state),
    };
};

export default connect(mapStateToProps, { getMediaObjectByUri })(MediaObjectShow);
