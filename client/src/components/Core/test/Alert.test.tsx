import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../../store';
import renderer from 'react-test-renderer';
import Alert from '../views/Alert';

let store;
describe('Your test', () => {
    beforeEach(() => {
        store = createStore;
    });
    test('Alerts rendering', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Alert />,
            </Provider>
        );
        const alert = component.toJSON();
        expect(alert).toMatchSnapshot();
    });
});
