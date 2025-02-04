import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 123456,
    //   imageUrls: [],  // https://photo_1.jpg, https://photo_2.jpg, https://photo_3.jpg
    // },
  },
  reducers: {
    savingNewNote: ( state, ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, { payload }) => {
      state.notes.push( payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, { payload }) => {
      state.active = payload;
      state.messageSaved = '';
    },
    setNotes: ( state, { payload }) => {
      state.notes = payload;
    },
    setSaving: ( state ) => {
      state.isSaving = true;
    },
    updateNote: ( state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {  // payload: updated note
        if ( note.id === payload.id ) {
          return payload;
        }
        return note;
      });
      state.messageSaved = `${ payload.title }, updated successfully!`;
    },
    deleteNoteById: ( state, { payload }) => {  // payload: note id
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== payload);
    },
    setPhotosToActiveNote: ( state, { payload }) => {
      state.active.imageUrls = [ ...(state.active.imageUrls || []), ...payload ];
      state.isSaving = false;
    },
    deletePhotoFromActiveNote: ( state, { payload }) => {
      const imageUrlsToDelete = new Set(payload);
      state.active.imageUrls = state.active.imageUrls.filter(imageUrl => !imageUrlsToDelete.has(imageUrl));
    },
  }
});


// Action creators are generated for each case reducer function
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, setPhotosToActiveNote, deletePhotoFromActiveNote } = journalSlice.actions;