import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, TextField, Theme, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles()
  const { login, user } = useAuth();
  const navigate = useNavigate()

  const handleLogin = async () => {
    await login(email, password)
  };

  useEffect(() => {
    if(user){
      navigate(`/dashboard`)
    }
  }, [user])

  return (
    <div className={classes.wrapper}>
      <div className={classes.box}>
        <Box marginBottom={2}>
          <Typography variant='h4'>Login</Typography>
        </Box>

        <form>
          <Box marginBottom={2}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>
          
          <Box marginBottom={2}>
            <TextField fullWidth label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Box>

          <Box marginBottom={2}>
            <Button fullWidth variant='contained' type="button" onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </form>

        <Box display='flex' alignItems='center'>
          <Typography component='span' variant='body2'>Create an account</Typography>&nbsp;
          <NavLink to={'/signup'}>Signup</NavLink>
        </Box>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: theme.spacing(40),
    border: '1px solid '+theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[15],
    padding: theme.spacing(2),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  }
}));


