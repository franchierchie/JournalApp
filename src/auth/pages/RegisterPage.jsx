import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink  } from 'react-router';

import { Alert, Button, Grid2, Link, TextField } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { useForm } from '../../hooks';

// Keep formData like this to avoid a loop
const formData = {
  displayName: '',
  email: '',
  password: '',
}

const formValidations = {
  email: [(value) => value.includes('@') && value.includes('.com'), 'Please enter a valid email address'],
  password: [(value) => value.length >= 6, 'Password must be at least 6 characters long'],
  displayName: [(value) => value.length >= 1, 'A name is required'],
}

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData, formValidations );

  const onSubmit = ( e ) => {
    e.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword( formState ) );
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={ onSubmit }>
        <Grid2 container>
          <TextField
            xs={ 12 } sx={{ mt: 2 }}
            label="Full name"
            type="text"
            placeholder="John Doe"
            fullWidth
            name="displayName"
            value={ displayName }
            onChange={ onInputChange }
            error={ !!displayNameValid && formSubmitted }
            helperText={ formSubmitted ? displayNameValid : null }
          />

          <TextField
            xs={ 12 } sx={{ mt: 2 }}
            label="Email"
            type="email"
            placeholder="example@demo.com"
            fullWidth
            name="email"
            value={ email }
            onChange={ onInputChange }
            error={ !!emailValid && formSubmitted }
            helperText={ formSubmitted ? emailValid : null }
          />

          <TextField
            xs={ 12 } sx={{ mt: 2 }}
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={ password }
            onChange={ onInputChange }
            error={ !!passwordValid && formSubmitted }
            helperText={ formSubmitted ? passwordValid : null }
          />
        </Grid2>

        <Grid2 container spacing={ 2 } sx={{ mb: 2, mt: 2 }}>
          <Grid2 xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
            <Alert severity="error">{ errorMessage }</Alert>
          </Grid2>

          <Button
            disabled={ isCheckingAuthentication }
            type="submit"
            variant="contained"
            fullWidth
            xs={ 12 } sm={ 6 }
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Grid2>

        <Grid2
          direction="row"
          justifyContent="end"
        >
          Already have an account?
          <Link
            color="secondary.main"
            underline="none"
            sx={{ ml: .5 }}
            to="/auth/login"
            component={ RouterLink }
          >
            Log in
          </Link>
        </Grid2>
      </form>
    </AuthLayout>
  )
}
