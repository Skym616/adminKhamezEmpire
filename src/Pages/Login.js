import React, { useState } from 'react';
import { Alert, Box, Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const AuthContext = useAuthContext();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';

  const handleChange = (e) => {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://khamez-empire-api.herokuapp.com/login', user).then((response) => {
      console.log(response.data);
      if (response.status && response.status === 200) {
        window.sessionStorage.setItem('user', JSON.stringify(response.data));
        navigate('/admin');
        AuthContext.update();
      } else {
        setOpen(true);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  console.log(user);
  return (<Container>
    <Box sx={{ margin: 'auto' }}>
      <Typography variant='h6' sx={{ textAlign: 'center', my: '10%', fontWeight: 'bolder' }}>
        Login Administration
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name='email' type='email' fullWidth label='email' variant='outlined' value={user.email}
                       onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField name='password' type='password' fullWidth label='password' variant='outlined'
                       value={user.password} onChange={handleChange} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' fullWidth sx={{ mt: '20px' }} onClick={handleSubmit}>Login</Button>
        </Grid>
      </form>
    </Box>
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={2000}
      onClose={() => {
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }}
      message='I love snacks'
      key={'bottom' + 'center'}
    >
      <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
        email or password invalid'
      </Alert>
    </Snackbar>
  </Container>);
};

export default Login;
