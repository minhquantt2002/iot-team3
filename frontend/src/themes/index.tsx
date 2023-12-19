import { useMemo } from 'react'

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Palette from './palette'
import Typography from './typography'
import componentsOverride from './overrides'

const ThemeCustomization = ({ children }: { children: React.ReactNode }) => {
    const theme = Palette()

    const themeTypography = Typography()

    const themeOptions = useMemo(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536,
                },
            },
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
            },
            palette: theme.palette,
            typography: themeTypography,
        }),
        [
            theme,
            themeTypography,
            // themeCustomShadows
        ]
    )

    const themes = createTheme(themeOptions)
    themes.components = componentsOverride(themes)

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default ThemeCustomization
