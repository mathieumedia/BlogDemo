import { createTheme } from "@mui/material";

export default createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                size: "small",
                variant: "outlined",
                margin: "dense",
                fullWidth: true,
                InputLabelProps: {
                    shrink: true,
                    color: 'primary'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                size: "small",
                color: 'primary',
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                }
            }
        }
    }
})