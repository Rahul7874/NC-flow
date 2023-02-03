import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import {  PostLoginRequest } from '../../services/userServices'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./login.css"

const theme = createTheme();

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    let navigate = useNavigate();
    // login function
    const dispatch = useDispatch()
    const validateData = (event) => {
        event.preventDefault();
        if(username.length===0)
        {
            alert("Please enter username");
        }
        else if(password.length===0)
        {
            alert("Please enter password");
        }
        else{
           LoginFunction(event);
        }
    }
    const LoginFunction = (e) => {
        e.preventDefault()
        dispatch(PostLoginRequest({ username, password }))
        localStorage.setItem('username',username)
        navigate('/app')
    }
    if (!localStorage.getItem('token')) {
        return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  minHeight:'450px',
                  marginTop: 10,
                  display: 'flex',
                  padding: '20px',
                  boxShadow: '0 0px 50px 0 rgba(0,0,0,0.2)',
                  borderRadius: '5px',
                  width: '100%',
                  border: '2px solid black',
                  flexDirection: 'column',
                  alignItems:'center',
        
                }}
              >
                <Avatar style={{marginTop:'30px'}} sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in 
                </Typography>
                <Box component="form"  noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    style={{marginTop:'30px'}}
                    label="Username"
                    value={username} onChange={(e)=>setUsername(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
              
                  <Button
                    type="submit"
                    style={{marginTop:'40px',padding:'8px',fontWeight:'bold'}}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={validateData}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
         )
    }
    if (localStorage.getItem('token')) {
        return <Navigate to='/app'/>
   }
}
export default Login