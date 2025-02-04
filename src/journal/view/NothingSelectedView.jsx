import { Grid2, Typography } from '@mui/material';
import { StarOutline } from '@mui/icons-material';

export const NothingSelectedView = () => {
  return (
    <Grid2
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100dvh - 110px)', backgroundColor: 'primary.main', borderRadius: 2 }}
    >
      <Grid2 xs={ 12 }>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid2>

      <Grid2 xs={ 12 }>
        <Typography color="white" variant="h5">Select or create an entry</Typography>
      </Grid2>
    </Grid2>
  )
}
