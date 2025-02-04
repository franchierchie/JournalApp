import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

import { addNewEmptyNote, deleteNoteById, deletePhotoFromActiveNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

import { fileDelete, fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
  return async( dispatch, getState ) => {
    dispatch( savingNewNote() );

    // uid
    const { uid } = getState().auth;

    // firebase will set id to the note, so it's not necessary to add one ourselves
    const newNote = {
      title: '',
      body: '',
      imagesUrl: [],
      date: new Date().getTime(),
    }

    // Create a new document reference
    const newDoc = doc( collection(FirebaseDB, `${ uid }/journal/notes`) );
    // Save the data to firestore
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch( addNewEmptyNote( newNote ) );
    dispatch( setActiveNote( newNote ) );
  }
}

export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {
    const { uid } = getState().auth;
    if ( !uid ) throw new Error("The UID of the user doesn't exists");

    const notes = await loadNotes( uid );

    dispatch( setNotes( notes ) );
  }
}

export const startSavingNote = () => {
  return async( dispatch, getState ) => {
    dispatch( setSaving() );

    const { uid } = getState().auth;
    const { active:activeNote } = getState().journal;

    const noteToFirestore = { ...activeNote }
    // We delete the ID of the activeNote because firestore will add it again
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch( updateNote( activeNote ) );
  }
}

export const startDeletingNote = () => {
  return async( dispatch, getState ) => {
    const { uid } = getState().auth;
    const { active:activeNote } = getState().journal;

    const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
    await deleteDoc( docRef );

    dispatch( deleteNoteById( activeNote.id ) );
  }
}

export const startUploadingFiles = ( files = [] ) => {
  return async( dispatch ) => {
    dispatch( setSaving() );

    // upload all images at the same time
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push( fileUpload( file ) );
    }

    // We pass the array of pomises to Promise.all so it returns an array with the responses
    const photosUrls = await Promise.all( fileUploadPromises );

    dispatch( setPhotosToActiveNote( photosUrls ) );
  }
}

export const startDeletingFiles = ( files = [] ) => {
  return async( dispatch ) => {
    for (const file of files) {
      fileDelete( file );
    }

    dispatch( deletePhotoFromActiveNote( files ) );
  }
}