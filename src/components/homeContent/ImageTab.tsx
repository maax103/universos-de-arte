import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, Button, IconButton, Modal, Typography } from '@mui/material';

interface IitemDataItem {
  img: string;
  title?: string;
}

export const ImageTab: React.FC<{ itemData: Array<IitemDataItem> }> = ({ itemData }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState('');
  function handleModalImage(action: boolean, url?: string) {
    setIsModalOpen(action);
    url && setActiveImage(url);
  }
  function handleDownloadImage() {
    const link = document.createElement('a');
    link.href = activeImage;
    link.download = 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      {itemData.length ? (
        <ImageList sx={{ width: '100%', height: 600 }} cols={3}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <button
                onClick={() => {
                  handleModalImage(true, item.img);
                }}
                onKeyDown={() => {
                  console.log('hello');
                }}
              >
                <img src={`${item.img}`} srcSet={`${item.img}`} alt={item.title} loading="lazy" />
              </button>
            </ImageListItem>
          ))}
          <Modal
            open={isModalOpen}
            onClose={() => {
              handleModalImage(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="moral-moral-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Box sx={modalStyle}>
              <IconButton
                onClick={() => {
                  handleModalImage(false);
                }}
                sx={{ position: 'relative', top: '-1rem', left: '78vh' }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  alt="produced by AI"
                  src={activeImage}
                  style={{ display: 'block', width: '80vh', height: '80vh' }}
                />
                <Button onClick={handleDownloadImage} sx={{ marginTop: '1rem' }} variant="contained">
                  Download
                </Button>
              </Box>
            </Box>
          </Modal>
        </ImageList>
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="body1">Aguardando chamada da API</Typography>
        </Box>
      )}
    </>
  );
};
