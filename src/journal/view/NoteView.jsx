import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid2, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { useForm, useNoteView } from '../../hooks';
import { setActiveNote } from '../../store/journal';
import { ImageGallery } from '../components';

export const NoteView = () => {
  const { active:activeNote, isSaving, messageSaved } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const { body, title, date, onInputChange, formState } = useForm( activeNote );
  const { dateString, onDelete, onFileInputChange, onSaveNote, selectImage } = useNoteView( date );

  const fileInputRef = useRef();


  useEffect(() => {
    dispatch( setActiveNote(formState) );
  }, [formState]);

  useEffect(() => {
    if ( messageSaved.length > 0 ) {
      Swal.fire('Note updated!', messageSaved, 'success');
    }
  }, [messageSaved]);

  return (
    <Grid2 container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
      <Grid2>
        <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
      </Grid2>

    <Grid2>
      <input
        type="file"
        multiple
        ref={ fileInputRef }
        onChange={ onFileInputChange }
        style={{ display: 'none' }}
      />

      <IconButton
        color="primary"
        disabled={ isSaving }
        onClick={ () => fileInputRef.current.click()}
      >
        <UploadOutlined />
      </IconButton>

        <Button
          onClick={ onSaveNote }
          disabled={ isSaving }
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid2>

      <TextField
        type="text"
        variant="filled"
        fullWidth
        placeholder="Add a title"
        label="Title"
        sx={{ border: 'none', mb: 1 }}
        name="title"
        value={ title }
        onChange={ onInputChange }
      />

      <TextField
        type="text"
        variant="filled"
        fullWidth
        multiline
        placeholder="What happened today?"
        minRows={ 5 }
        name="body"
        value={ body }
        onChange={ onInputChange }
      />

      <Grid2 container justifyContent="end">
        <Button
          onClick={ onDelete }
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Delete
        </Button>
      </Grid2>

      <ImageGallery images={ activeNote.imageUrls } selectImage={ selectImage } />
    </Grid2>
  )
}
