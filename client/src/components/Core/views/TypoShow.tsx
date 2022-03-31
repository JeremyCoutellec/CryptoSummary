import React from 'react';

// Material UI
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
});

const TypoShow = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="h1" display="block" gutterBottom>
                    h1. Heading
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 2.5rem / weight: 700 / l-height: 1.25)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="h2" display="block" gutterBottom>
                    h2. Heading
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 2rem / weight: 700 / l-height: 1.3333)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="h3" display="block" gutterBottom>
                    h3. Heading
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 1.5rem / weight: 700 / l-height: 1.5)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="h4" display="block" gutterBottom>
                    h4. Heading
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 1.25rem / weight: 700 / l-height: 1.5)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="h5" display="block" gutterBottom>
                    h5. Heading
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 1.125rem / weight: 700 / l-height: 1.5)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="h6" display="block" gutterBottom>
                    h6. Heading
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 1.0625rem / weight: 700 / l-height: 1.5)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="subtitle1" display="block" gutterBottom>
                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 1rem / weight: 600 / l-height: 1.55555)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                    subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 0.875rem / weight: 600 / l-height: 1.57143)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="body1" display="block" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                    inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 1rem / weight: 400 / l-height: 1.5)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="body2" display="block" gutterBottom>
                    body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                    inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 0.875rem / weight: 400 / l-height: 1.57143)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="button" display="block" gutterBottom>
                    button text
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 0.875rem / weight: 700 / l-height: 1.71429)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="caption" display="block" gutterBottom>
                    caption text
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 0.75rem / weight: 400 / l-height: 1.5)
                </Typography>
            </Paper>
            <Paper elevation={1} sx={{ m: 2, p: 2 }}>
                <Typography variant="overline" display="block" gutterBottom>
                    overline text
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ( size: 0.75rem / weight: 700 / l-height: 1.5)
                </Typography>
            </Paper>
        </div>
    );
};
export default TypoShow;
