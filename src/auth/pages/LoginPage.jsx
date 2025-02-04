import { useMemo } from 'react';
import { Link as RouterLink  } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Grid2, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { useForm } from '../../hooks';

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange, formState } = useForm( formData );

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  const onSubmit = ( e ) => {
    e.preventDefault();
    dispatch( startLoginWithEmailPassword( formState ) );
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }>
        <Grid2 container>
          <TextField
            xs={ 12 } sx={{ mt: 2 }}
            label="Email"
            type="email"
            placeholder="example@demo.com"
            fullWidth
            name="email"
            value={ email }
            onChange={ onInputChange }
          />

          <TextField
            xs={ 12 } sx={{ mt: 2 }}
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={ password }
            onChange={ onInputChange }
          />
        </Grid2>

        <Grid2 container sx={{ mt: 2 }} display={ !!errorMessage ? '' : 'none' }>
          <Grid2 xs={ 12 }>
            <Alert severity="error">{ errorMessage }</Alert>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={ 2 } sx={{ mb: 2, mt: 4 }}>
          <Button
            disabled={ isAuthenticating }
            type="submit"
            variant="contained"
            fullWidth
            xs={ 12 } sm={ 6 }
          >
            Login
          </Button>

          <Button
            onClick={ onGoogleSignIn }
            disabled={ isAuthenticating }
            variant="contained"
            fullWidth
            xs={ 12 } sm={ 6 }
          >
            <Google />
            <Typography sx={{ ml: .5 }}>Google</Typography>
          </Button>
        </Grid2>

        <Grid2
          direction="row"
          justifyContent="end"
        >
          Don't have an account?
          <Link
            color="secondary.main"
            underline="none"
            sx={{ ml: .5 }}
            to="/auth/register"
            component={ RouterLink }
          >
            Register
          </Link>
        </Grid2>
      </form>
    </AuthLayout>
  )
}
