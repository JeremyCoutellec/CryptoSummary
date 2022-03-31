import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Copyright from '../views/Copyright';

test('Copyright rendering', () => {
    const propsCopyright = {};
    const history = createBrowserHistory();
    const component = renderer.create(
        <Router history={history}>
            <Copyright {...propsCopyright} />
        </Router>
    );
    const copyright = component.toJSON();
    expect(copyright).toMatchSnapshot();
});
