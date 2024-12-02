import { ReactNode, useContext } from 'react';
import * as materialMultiLanguages from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CustomStyleContext } from './shared/customStyleButton';
import { BROWSER_LANG } from './constants';
import { Margin } from '@mui/icons-material';

type LangMapType = {
  [index: string]: string;
};

const MUI_LANG_MAP: LangMapType = {
  en: 'enUS',
  zh: 'zhCN',
  fr: 'frFR',
  nl: 'nlNL',
  de: 'deDE',
  it: 'itIT',
  es: 'esES',
};

type MaterialMultiLanguagesType = {
  [K: string]: materialMultiLanguages.Localization;
};

type Props = {
  children?: ReactNode;
};

function B3ThemeProvider({ children }: Props) {
  const theme = (lang: string) =>
    createTheme(
      {
        palette: {
          primary: {
            main: '#808285',
            light: '#006892',
          },
          secondary: {
            main: '#004270',
          },
          error: {
            main: '#d32f2f',
          },
          success: {
            main: '#00873c',
          },
          warning: {
            main: '#ea9137',
            light: '#e0a800',
          },
        },
        typography: {
          fontFamily: '"proxima-nova", sans-serif',
          h1: { fontSize: '2.1875rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
          h2: { fontSize: '1.875rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
          h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#004270',
            marginBottom: '15px',
          },
          h4: { fontSize: '1.25rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
          h5: { fontSize: '1.125rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
          h6: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#004270',
            marginBottom: '15px',
          },
        },
        components: {
          MuiTypography: {
            styleOverrides: {
              root: {
                fontFamily: '"proxima-nova", sans-serif',
              },
            },
            defaultProps: {
              variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                body1: 'p',
                body2: 'span',
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                fontFamily: '"proxima-nova", sans-serif',
                fontSize: '16px',
              },
              body1: {
                fontFamily: '"proxima-nova", sans-serif',
              },
              a: {
                color: '#004270',
                '&:hover': {
                  color: '#006892',
                },
              },
              h1: { fontSize: '4rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
              h2: { fontSize: '3.125rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
              h3: {
                fontSize: '2.1875rem',
                fontWeight: 600,
                color: '#004270',
                marginBottom: '15px',
              },
              h4: { fontSize: '1.875rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
              h5: { fontSize: '1.5rem', fontWeight: 600, color: '#004270', marginBottom: '15px' },
              h6: {
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#004270',
                marginBottom: '15px',
              },
              p: {
                fontSize: '16px',
                color: '#004270',
                marginBottom: '15px',
                fontFamily: '"proxima-nova", sans-serif',
              },
              span: {
                fontFamily: '"proxima-nova", sans-serif',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                fontFamily: '"proxima-nova", sans-serif',
                borderRadius: '0px', // Tailwind rounded-md
                padding: '12px 24px', // Custom padding for all buttons
                textTransform: 'capitalize', // Disable uppercase text transformation
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: 'none', // Disable default shadow
                border: '1px solid #004270',
                lineHeight: '20px',
                color: '#ffffff',
                '&:hover': {
                  boxShadow: 'none', // Keep shadow disabled on hover
                  backgroundColor: '#ffffff', // Tailwind primaryHover
                  color: '#004270',
                },
              },
              sizeMedium: {
                // Add your custom styles here
                fontSize: '16px',
                padding: '9px 16px',
              },
              containedPrimary: {
                color: '#ffffff', // Text color for primary button
                backgroundColor: '#004270', // Primary background color
                '&:hover': {
                  backgroundColor: '#ffffff', // Darker hover color
                },
              },
              outlinedPrimary: {
                color: '#004270', // Primary color for outlined button
                borderColor: '#004270', // Border color
                '&:hover': {
                  backgroundColor: '#004270', // Light hover background
                  color: '#ffffff',
                },
              },
              textPrimary: {
                color: '#004270', // Primary text button color
                '&:hover': {
                  backgroundColor: '#004270', // Light hover background
                  color: '#ffffff',
                },
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              variant: 'standard',
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: '#808285', // Default text color
                fontSize: '1rem', // Default font size
                fontWeight: '400', // Font weight for emphasis
                marginBottom: '8px', // Add space below the label
                zIndex: '1',
                '&.Mui-focused': {
                  color: '#808285', // Change color when the input is focused
                },
                '&.Mui-error': {
                  color: '#808285', // Color for error state
                },
              },
              asterisk: {
                color: '#808285', // Red asterisk for required fields
              },
              formControl: {
                color: '#808285', // Default label color
                fontSize: '16px', // Adjust label font size
                fontWeight: '400', // Make the label bold
                transform: 'none', // Default position
                position: 'relative',
                '&.Mui-focused': {
                  color: '#808285', // Label color when focused
                },
                '&.Mui-error': {
                  color: '#808285', // Label color in error state
                },
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                fontFamily: '"proxima-nova", sans-serif',
                fontSize: '1rem', // Input text font size
                backgroundColor: '#ffffff', // Default background color for input
                borderRadius: '0px', // Rounded corners
                padding: '12px 16px', // Adjust padding inside the input
                border: '1px solid #939597',
                color: '#808285',
                '&:hover': {
                  backgroundColor: '#ffffff', // Background color on hover
                  borderColor: '#808285',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff', // Background when focused
                  borderColor: '#808285', // Focus border color
                  boxShadow: 'none', // Focus shadow
                },
              },
              input: {
                color: '#808285',
                height: 'auto',
                padding: '0px',
                lineHeight: '16px',
              },
              sizeSmall: {
                fontSize: '14px', // Smaller font size for the input
                padding: '13px 20px', // Adjust padding for smaller size
                borderRadius: '0px', // Rounded corners
                lineHeight: '16px',
                backgroundColor: '#ffffff', // Background color for small input
                '&:hover': {
                  backgroundColor: '#ffffff', // Hover effect for small input
                  borderColor: '#808285',
                },
                '&.Mui-focused': {
                  borderColor: '#808285', // Border color when focused
                  boxShadow: 'none', // Focus shadow
                },
              },
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: {
                backgroundColor: '#ffffff', // Default background color for input
                borderRadius: '0px', // Rounded corners
                padding: '12px 16px', // Adjust padding inside the input
                border: '1px solid #939597',
                '&:hover': {
                  backgroundColor: '#ffffff', // Background color on hover
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff', // Background when focused
                  borderColor: '#808285', // Focus border color
                  boxShadow: 'none', // Focus shadow
                },
              },
              input: {
                fontSize: '1rem', // Customize font size
                color: '#808285', // Text color
                padding: '0px !important',
                height: 'auto',
                lineHeight: '20px',
                '&::placeholder': {
                  color: '#808285', // Placeholder text color
                },
              },
              sizeSmall: {
                fontSize: '1rem', // Smaller font size for the input
                padding: '11px 20px', // Adjust padding for smaller size
                borderRadius: '0px', // Rounded corners
                lineHeight: '16px',
                backgroundColor: '#ffffff', // Background color for small input
                '&:hover': {
                  backgroundColor: '#ffffff', // Hover effect for small input
                },
                '&.Mui-focused': {
                  borderColor: '#808285', // Border color when focused
                  boxShadow: 'none', // Focus shadow
                },
              },
              underline: {
                '&:before': {
                  borderBottom: '0px solid #ccc', // Default underline
                },
                '&:after': {
                  borderBottom: '0px solid #939597', // Underline on focus
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottom: '0px solid #888', // Underline on hover
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                backgroundColor: '#ffffff', // Default background color
                borderRadius: '0px', // Rounded corners
                padding: '12px 16px !important', // Padding inside the select field
                color: '#808285', // Text color
                border: '1px solid #939597', // Border styling
                height: 'auto',
                minHeight: 'auto',
                '&:hover': {
                  backgroundColor: '#ffffff', // Background color on hover
                  borderColor: '#888', // Border color on hover
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff', // Background color when focused
                  borderColor: '#939597', // Border color when focused
                  boxShadow: 'none', // Focus shadow
                },
                '&.Mui-error': {
                  borderColor: '#d32f2f', // Border color in error state
                  backgroundColor: '#fff0f0', // Background for error state
                },
              },
              select: {
                backgroundColor: '#ffffff', // Default background color
                color: '#808285', // Text color
                height: 'auto',
                minHeight: 'auto',
                '&:hover': {
                  backgroundColor: '#ffffff', // Background color on hover
                  borderColor: '#ffffff', // Border color on hover
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff', // Background color when focused
                  borderColor: '#ffffff', // Border color when focused
                  boxShadow: 'none', // Focus shadow
                },
                '&.Mui-error': {
                  borderColor: '#d32f2f', // Border color in error state
                  backgroundColor: '#fff0f0', // Background for error state
                },
              },
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                fontSize: '0.875rem', // Adjust font size for the helper text
                color: '#808285', // Default text color
                marginTop: '4px', // Space above the helper text
                marginLeft: '0px',
                '&.Mui-error': {
                  color: '#d32f2f', // Color for error messages
                },
                '&.Mui-disabled': {
                  color: '#bdbdbd', // Color for disabled state
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: '#ffffff', // Light grey background
                boxShadow: 'none', // Custom shadow
                borderRadius: '0', // Rounded corners
                border: '1px solid rgba(0,0,0,0.12)',
                padding: '20px', // Padding inside the card
                transition: 'transform 0.3s ease', // Animation on hover
              },
            },
          },
          MuiTablePagination: {
            styleOverrides: {
              root: {
                backgroundColor: '#ebebeb', // Background color for pagination
                padding: '6px 16px', // Custom padding
              },
              toolbar: {
                justifyContent: 'space-between', // Space items evenly
              },
              selectLabel: {
                fontWeight: 'bold', // Bold font for select label
                color: '#004270', // Text color
                marginRight: '10px',
              },
              displayedRows: {
                fontSize: '1rem', // Adjust font size for row info
                color: '#004270', // Subtle text color
              },
              select: {
                backgroundColor: '#fff', // White background for the select dropdown
                borderRadius: '0px', // Rounded corners
                height: '16px',
                lineHeight: '16px',
                minWidth: '50px !important',
                textAlignLast: 'left',
                paddingLeft: '16px',
                padding: '0px',
                fontSize: '1rem',
              },
              actions: {
                '& button': {
                  color: '#004270', // Custom color for pagination buttons
                  svg: {
                    color: '#004270',
                  },
                  '&:hover': {
                    color: '#0d47a1', // Hover color for buttons
                  },
                  '&.Mui-disabled': {
                    color: '#808285',
                    svg: {
                      color: '#808285',
                    },
                  },
                },
              },
            },
          },
          MuiModal: {
            styleOverrides: {
              backdrop: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black backdrop
                backdropFilter: 'blur(4px)', // Add a blur effect
                transition: 'all 0.3s ease-in-out', // Smooth transition for backdrop appearance
              },
            },
          },
        },
      },

      (materialMultiLanguages as MaterialMultiLanguagesType)[MUI_LANG_MAP[lang] || 'enUS'],
    );

  return <ThemeProvider theme={theme(BROWSER_LANG)}>{children}</ThemeProvider>;
}

export default B3ThemeProvider;
