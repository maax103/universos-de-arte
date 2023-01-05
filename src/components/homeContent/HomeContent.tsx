import { Paper, Box, Typography, TextField, Grid, Tab, Tabs } from '@mui/material';
import { Container } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import React, { useState } from 'react';
import { ImageTab } from './ImageTab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextTab } from './TextTab';
import { handleCompletionResponse, handleCreateImage } from '../../utils/openai';
import LoadingButton from '@mui/lab/LoadingButton';

export const HomeContent = () => {
  const [textList, setTextList] = useState<Array<string>>([]);
  const [itemData, setItemData] = useState<Array<{ img: string }>>([]);
  const [imageType, setImageType] = useState('feed');
  const [isLoadingTextAPI, setIsLoadingTextAPI] = useState(false);
  const [isLoadingImageAPI, setIsLoadingImageAPI] = useState(false);

  function ControlledRadioButtonsGroup() {
    const handleChangeImageType = (event: React.ChangeEvent<HTMLInputElement>) => {
      setImageType((event.target as HTMLInputElement).value);
    };

    return (
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Tipo</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={imageType}
          onChange={handleChangeImageType}
        >
          <FormControlLabel value="feed" control={<Radio />} label="Feed" />
          <FormControlLabel value="reels" control={<Radio />} label="Reels" />
        </RadioGroup>
      </FormControl>
    );
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [textAPI, setTextAPI] = useState('');
  const [imageAPI, setImageAPI] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const handleCallTextAPI = async () => {
    setIsLoadingTextAPI(true);
    const response = await handleCompletionResponse(textAPI);
    if (response.status !== 200) {
      setIsLoadingTextAPI(false);
      throw new Error('http error with code ' + response.status);
    }
    const newTextList = [...response.data.choices.map((choice) => choice.text ?? '')];
    setTextList(newTextList);
    setIsLoadingTextAPI(false);
  };
  const handleCallImageAPI = async () => {
    setIsLoadingImageAPI(true);
    const response = await handleCreateImage(imageAPI);
    if (response.status !== 200) {
      setIsLoadingImageAPI(false);
      throw new Error('http error with code ' + response.status);
    }
    const newImageList = [
      ...response.data.data.map((elem) => {
        return { img: elem.url ?? '' };
      }),
    ];
    console.log(newImageList);
    setItemData(newImageList);
    setIsLoadingImageAPI(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container>
        <Grid container spacing={2} height={300}>
          <Grid item xs={6}>
            <Paper
              variant="outlined"
              sx={{
                height: '80%',
                marginTop: '2rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                sx={{ width: '100%' }}
                value={textAPI}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextAPI(e.target.value)}
                label="Busca de textos"
                variant="standard"
              />
              <LoadingButton
                onClick={handleCallTextAPI}
                sx={{ mt: '1rem' }}
                variant="contained"
                size="small"
                loading={isLoadingTextAPI}
                endIcon={<SearchIcon />}
                loadingPosition="end"
                // loadingIndicator='Carregando...'
              >
                {isLoadingTextAPI ? 'carregando...' : 'chamar api'}
              </LoadingButton>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              variant="outlined"
              sx={{
                height: '80%',
                marginTop: '2rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                <ControlledRadioButtonsGroup />
              </Box>
              <Box sx={{ minWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  sx={{ width: '100%' }}
                  value={imageAPI}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageAPI(e.target.value)}
                  label="Busca de imagens"
                  variant="standard"
                />
                <LoadingButton
                  loading={isLoadingImageAPI}
                  onClick={handleCallImageAPI}
                  endIcon={<ImageSearchIcon />}
                  sx={{ mt: '1rem' }}
                  variant="contained"
                  size="small"
                >
                  {isLoadingImageAPI ? 'carregando...' : 'chamar api'}
                </LoadingButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {/* <Divider sx={{ m: '2' }} /> */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example">
              <Tab label="Textos" {...a11yProps(0)} />
              <Tab label="Imagens" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <TextTab textList={textList} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ImageTab itemData={itemData} />
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
};
