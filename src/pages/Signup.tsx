import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { makeStyles } from '@mui/styles';
import { Alert, Box, Button, TextField, Theme, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '../firebase';
import { useAuth } from '../AuthContext';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const classes = useStyles()
  const { login } = useAuth();
  const navigate = useNavigate()

  const handleSignup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if(user){
        login(email, password); 
        navigate(`/dashboard`)
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('Error:'+ error.message);
      } else {
        setError('Error signup');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.box}>
        <Box marginBottom={2}>
          <Typography variant='h4'>Signup</Typography>
        </Box>

        {error ? <Box marginBottom={2}><Alert severity='error'>{error}</Alert></Box> : null}

        <form>
          <Box marginBottom={2}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>
          
          <Box marginBottom={2}>
            <TextField fullWidth label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Box>

          <Box marginBottom={2}>
            <Button disabled={isLoading} fullWidth variant='contained' type="button" onClick={handleSignup}>
              Signup
            </Button>
          </Box>
        </form>

        <Box display='flex' alignItems='center'>
          <Typography component='span' variant='body2'>Do you have an account?</Typography>&nbsp;
          <NavLink to={'/login'}>Login</NavLink>
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


