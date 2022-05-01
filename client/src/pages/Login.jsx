import {useState, useEffect} from 'react'
import {
    Grid, TextField, Button, Typography,
    CssBaseline, Container, Box, Avatar,
    InputAdornment
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import Copyright
 from '../components/Copyright'
// #region --------------( ICONS )--------------
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #endregion

import {useAuth} from '../middleware/contextHooks'
export default function Login() {
    const {loginUser, clearErrors, toasts, isAuthenticated} = useAuth();
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: 'Peter', lastName: 'Pan', 
        email: 'peterpan@mail.com', password: 'Password123', 
        confirmPassword: 'Password123'
    })

    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if(isAuthenticated) navigate('/blogs')

        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {
                    type: ele.type
                })
            });
            clearErrors()
        }
    }, [toasts, isAuthenticated, clearErrors, navigate])

    const handleRegister = () => {
        const { email, password } = user
        if(!email || !password ) {
            toast('Please fill all the fields', {type: 'error'})
            return
        }
        loginUser(user)
    }
    return (
        <Container maxWidth="xs">
            <CssBaseline />

            <Box
                sx={{
                    mt: 8, display: 'flex', mb: 6,
                    flexDirection: 'column', alignItems: 'center'
                }}
            >
                <Avatar sx={{m: 1, backgroundColor: 'secondary.main'}}>
                    <LockOutlinedIcon  />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <Grid container spacing={2} sx={{mt: 3}}>
  
                    <Grid item xs={12}>
                        <TextField
                            placeholder='Enter Your Email' name='email' 
                            label='Email' value={user.email} 
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            placeholder='Enter Password' name='password' 
                            label='Password' value={user.password} 
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                </InputAdornment>,
                            }}
                        />
                    </Grid>                      
                </Grid>
                <Button 
                    onClick={handleRegister}
                    fullWidth sx={{
                        mt: 3, mb: 2
                    }}
                >
                    Login
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/register">
                            Don't have an account? Register
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{mt: 4}} />
        </Container>
    )
}
