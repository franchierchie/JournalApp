import { loginWithEmailPassword, logOutFirebase, registerWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logOut } from './authSlice';

export const startGoogleSignIn = () => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await signInWithGoogle();
    if ( !result.ok ) return dispatch( logOut( result.errorMessage ) );

    dispatch( login( result ) );
  }
}

export const startCreatingUserWithEmailPassword = ({ displayName, email, password }) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const resp = await registerWithEmailPassword({ displayName, email, password });
    if ( !resp.ok ) return dispatch( logOut( resp.errorMessage ) );

    dispatch( login( resp ) );
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const resp = await loginWithEmailPassword({ email, password });
    if ( !resp.ok ) return dispatch( logOut( resp.errorMessage ) );
    
    dispatch( login( resp ) );
  }
}

export const startLogOut = () => {
  return async( dispatch ) => {
    await logOutFirebase();
    dispatch( logOut() );
  }
}