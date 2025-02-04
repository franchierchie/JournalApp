import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Fab } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout';
import { NoteView, NothingSelectedView } from '../view';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
  const { isSaving, active } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {
        ( !!active )
          ? <NoteView />
          : <NothingSelectedView />
      }

      <Fab
        onClick={ onClickNewNote }
        disabled={ isSavingNote }
        color="error"
        aria-label="add"
        sx={{
          color: 'white',
          ':hover': { backgroundColor: 'error.main', opacity: .8 },
          position: 'fixed',
          right: 40,
          bottom: 40,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </Fab>
    </JournalLayout>
  )
}
