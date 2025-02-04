import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startDeletingFiles, startDeletingNote, startSavingNote, startUploadingFiles } from '../store/journal';

export const useNoteView = ( date ) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const dispatch = useDispatch();

  const dateString = useMemo(() => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    dispatch( startSavingNote() );
  }

  const onFileInputChange = ({ target }) => {
    if ( target.files === 0 ) return;

    dispatch( startUploadingFiles( target.files ) );
  }

  const onDelete = () => {
    dispatch( startDeletingNote() );
  }

  const selectImage = ( imageUrl ) => {
    const newSelectedImages = [...selectedImages, imageUrl]
    setSelectedImages( newSelectedImages );
    dispatch( startDeletingFiles( newSelectedImages ) );
  }

  return {
    dateString,
    onSaveNote,
    onFileInputChange,
    onDelete,
    selectImage,
  }
}