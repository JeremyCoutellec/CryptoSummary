import React from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserHistory } from 'history';
import { Router, Route, BrowserRouter as Switch } from 'react-router-dom';
import Routes from './routes';

// Material UI
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Layout
import Landing from './components/Core/views/Landing';
import theme from './css/theme';

// Creation of the browser history for changing routes
const history = createBrowserHistory();

const cache = createCache({
    key: 'css',
    prepend: true,
});

/*
 * Provide the store of redux
 * Add the history on the component Router
 * Use the material ui theme
 * Switch between the landing page and all routes by the url path
 */
const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <CacheProvider value={cache}>
                        <ThemeProvider theme={theme}>
                            <Route exact path="/" component={Landing} />
                            <Route component={Routes} />
                        </ThemeProvider>
                    </CacheProvider>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
