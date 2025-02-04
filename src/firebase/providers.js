import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    const resp = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( resp );
    const { displayName, email, photoURL, uid } = resp.user;

    return {
      ok: true,
      // user info
      displayName, email, photoURL, uid,
    }
    
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    }
  }
}

export const registerWithEmailPassword = async({ displayName, email, password }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName,
    }
    
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    }
  }
}

export const loginWithEmailPassword = async({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, photoURL, uid } = resp.user;

    return {
      ok: true,
      displayName, email, photoURL, uid,
    }
    
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    }
  }
}

export const logOutFirebase = async() => {
  return await FirebaseAuth.signOut();
}