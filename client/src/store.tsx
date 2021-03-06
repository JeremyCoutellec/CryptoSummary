import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import coreReducer from './components/Core/reducers';
import mediaReducer from './components/MediaBundle/reducers';

// Initial Store
const initialState = {};

const middleware = [thunk];

// Store of Redux
/**
 * Here you can change the order of the bundles into the store.
 */
const store = createStore(
    combineReducers({
        ...coreReducer,
        ...mediaReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
