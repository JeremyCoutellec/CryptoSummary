import { Theme, createTheme } from '@mui/material/styles';
import { frFR as dataGridFR, enUS as dataGridEN } from '@mui/x-data-grid';
import { frFR, enUS } from '@mui/material/locale';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

// A custom theme for this app
let theme = createTheme(
    {
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                },
            },
            MuiLink: {
                defaultProps: {
                    underline: 'always',
                },
            },
        },
        palette: {
            primary: {
                dark: '#183754',
                main: '#424B62',
                light: '#6DCDEE',
            },
            secondary: {
                dark: '#F37073',
                main: '#BEBFBB',
                light: '#F3F3F4',
            },
            error: {
                main: '#E30613',
                light: '#e30613a1',
            },
            warning: {
                main: '#F39207',
                light: '#f39207a1',
            },
            success: {
                main: '#4BBF9B',
                light: '#6fcbafba',
            },
            background: {
                default: '#fff',
            },
        },
        typography: {
            fontFamily: 'Roboto',
            h1: {
                fontSize: '2.5rem',
                fontWeight: 700,
                lineHeight: 1.25,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 700,
                lineHeight: 1.3333,
            },
            h3: {
                fontSize: '1.5rem',
                fontWeight: 700,
                lineHeight: 1.5,
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: 1.5,
            },
            h5: {
                fontSize: '1.125rem',
                fontWeight: 700,
                lineHeight: 1.5,
            },
            h6: {
                fontSize: '1.0625rem',
                fontWeight: 700,
                lineHeight: 1.5,
            },
            subtitle1: {
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.55555,
            },
            subtitle2: {
                fontSize: '0.875rem',
                fontWeight: 600,
                lineHeight: 1.57143,
            },
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5,
            },
            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.57143,
            },
            caption: {
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 1.5,
            },
            button: {
                fontSize: '0.875rem',
                fontWeight: 700,
                lineHeight: 1.71429,
            },
            overline: {
                fontSize: '0.75rem',
                fontWeight: 700,
                lineHeight: 1.5,
            },
        },
    },
    localStorage.getItem('locale') === 'en' ? dataGridEN : dataGridFR,
    localStorage.getItem('locale') === 'en' ? enUS : frFR
);

export default theme;
