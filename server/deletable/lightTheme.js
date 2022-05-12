import { createTheme } from "@mui/material";
export default createTheme({
    // palette: {
    //     primary: {
    //         main: "#1fbfc1",
    //         light:'#f5f5f5'
    //     },
    //     secondary: {
    //         main: "#ffb300"
    //     },
    //     text: {
    //         light: "#f5f5f5",
    //         primary: "#1fbfc1"
    //     }

    // },
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
        // MuiListItemText: {
        //     styleOverrides: {
        //         root: {
        //             color: '#1fbfc1',
        //         }
        //     }
        // },

        MuiButton: {
            defaultProps: {
                size: "small",
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    color: '#fff'
                }
            }
        },
        MuiCard: {
            variants:[
                {
                    props: {variant: 'shaded'},
                    style: {
                        backgroundColor: "#E0E0D9", 
                        borderRadius: '10px',
                    }
                }
            ]
        },
        MuiTypography:{
            defaultProps: {
                align: 'left'
            }
        },
        MuiPaper: {
            styleOverrides: {
                root:{
                    padding: 8
                }
            }
        },
        // MuiAppBar: {
        //     styleOverrides: {
        //         root: {
        //             padding: 0
        //         }
        //     }
        // },
        MuiList:{
            styleOverrides: {
                root:{
                    backgroundColor: "#E0E0D9"
                }
            }
        }
    }
})