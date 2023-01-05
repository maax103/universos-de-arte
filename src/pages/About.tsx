import { Box, Typography } from '@mui/material';
import { Appbar } from '../components/Appbar';

export const About = () => {
  return (
    <>
      <Appbar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 128px)',
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6">Universos de arte</Typography>
        <Typography sx={{ mt: 2 }} variant="body1">
          Desenvolvido por Maximiliano Matheus Furtado
        </Typography>
      </Box>
    </>
  );
};
