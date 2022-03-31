import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { formatDate } from '../../../utils/date';
import { map, last, split, join, tail, size } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { disableMediaObject, enableMediaObject, getAllMediaObjects, removeMediaObject } from '../actions/mediaObject';
import { getMediaObjectsSelector, getMediaObjectSelector } from '../selectors/mediaObject';

// Material UI
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Component
import Loading from '../../Core/views/Loading';

const { REACT_APP_WEB_API_URL, REACT_APP_DATE_TIME_FORMAT_SHOW } = process.env;

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));

const MediaObjectList = ({
    mediaObjects,
    totalMediaObjects,
    loadingMediaObjects,
    removeMediaObject,
    enableMediaObject,
    disableMediaObject,
    getAllMediaObjects,
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {
        if (mediaObjects?.length !== totalMediaObjects || loadingMediaObjects) getAllMediaObjects();
    }, [mediaObjects, totalMediaObjects, loadingMediaObjects, getAllMediaObjects]);

    const toggleEnable = (media) => {
        if (media?.isEnable) disableMediaObject(media?.id, t);
        else enableMediaObject(media?.id, t);
    };
    if (loadingMediaObjects) <Loading type="show" />;

    if (!loadingMediaObjects && size(mediaObjects) === 0) {
        return (
            <Grid container spacing={3}>
                <Typography gutterBottom variant="h5" component="h2">
                    {t('mediaObject.list.notFound')}
                </Typography>
            </Grid>
        );
    }

    return (
        <Grid container spacing={3}>
            {map(mediaObjects, (mediaObject, index) => (
                <Grid item xs={4} key={index}>
                    <Card className={classes.root}>
                        <CardActionArea onClick={() => window.open(REACT_APP_WEB_API_URL + mediaObject?.contentUrl)}>
                            <CardMedia className={classes.media} image={REACT_APP_WEB_API_URL + mediaObject?.contentUrl} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {join(tail(split(last(split(mediaObject?.contentUrl, '/')), '_')))}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Moment format={REACT_APP_DATE_TIME_FORMAT_SHOW}>{formatDate(mediaObject?.createdAt, {})}</Moment>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {mediaObject?.contentUrl && (
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => window.open(REACT_APP_WEB_API_URL + mediaObject?.contentUrl)}
                                >
                                    {t('mediaObject.link.show')}
                                </Button>
                            )}
                            <Button size="small" color="primary" onClick={() => toggleEnable(mediaObject)}>
                                {t(mediaObject?.isEnable ? 'common.disable' : 'common.enable')}
                            </Button>
                            <Button size="small" color="primary" onClick={() => removeMediaObject(mediaObject?.id, t)}>
                                {t('common.remove')}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => {
    const mediaObjects = getMediaObjectsSelector(state);
    return {
        mediaObjects,
        loadingMediaObjects: getMediaObjectSelector(state)?.loading,
        totalMediaObjects: getMediaObjectSelector(state)?.totalMediaObjects,
    };
};

export default connect(mapStateToProps, {
    removeMediaObject,
    enableMediaObject,
    disableMediaObject,
    getAllMediaObjects,
})(MediaObjectList);
