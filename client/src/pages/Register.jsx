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
export default function Register() {
    const {registerUser, clearErrors, toasts, isAuthenticated} = useAuth();


    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: 'Peter', lastName: 'Pan', 
        email: 'peterpan@mail.com', password: 'Password123', 
        confirmPassword: 'Password123'
    })

    const [showPassword, setShowPassword] = useState({
        password: false, confirmPassword: false
    })

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
        const { firstName, lastName, email, password, confirmPassword } = user
        if(!firstName || !lastName || !email || !password || !confirmPassword) {
            toast('Please fill all the fields', {type: 'error'})
            return
        }

        if(password !== confirmPassword) {
            toast('Passwords do not match', {type: 'error'})
            return
        }

        registerUser(user)
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
                    Register
                </Typography>

                <Grid container spacing={2} sx={{mt: 3}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='First Name' name='firstName' value={user.firstName} 
                            onChange={(e) => setUser({...user, firstName: e.target.value})}
                          />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            placeholder='Enter Your Last Name' name='lastName' 
                            label='Last Name' value={user.lastName} 
                            onChange={(e) => setUser({...user, lastName: e.target.value})}
                        />
                    </Grid>
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
                            type={showPassword.password ? 'text' : 'password'}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}>
                                    {!showPassword.password ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                </InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            placeholder='Confirm Password' name='confirmPassword' 
                            label='Confirm Password' value={user.confirmPassword} 
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword({...showPassword, confirmPassword: !showPassword.confirmPassword})}>
                                    {!showPassword.confirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
                    Register
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{mt: 4}} />
        </Container>
    )
}
