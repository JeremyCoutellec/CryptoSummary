import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../css/theme';

import Color from '../views/Color';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

test('Color rendering', () => {
    const propsColor = {
        value: '#ffffff',
        dense: true,
    };
    const component = renderer.create(
        <ThemeProvider theme={theme}>
            <Color {...propsColor} />
        </ThemeProvider>
    );
    const color = component.toJSON();
    expect(color).toMatchSnapshot();
});
