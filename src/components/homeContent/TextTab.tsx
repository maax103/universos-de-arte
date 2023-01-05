import { Box, Typography, Tab, Tabs } from '@mui/material';
import { FC, useState } from 'react';

export const TextTab: FC<{ textList: Array<string> }> = ({ textList }) => {
  const [imageType, setImageType] = useState('feed');

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
      id: `vertical-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      {textList.length ? (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            sx={{ borderRight: 1, borderColor: 'divider' }}
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            {textList.map((text, index) => (
              <Tab key={text.slice(0, 15)} label={`Opção ${index + 1}`} {...a11yProps(index)} />
            ))}
          </Tabs>

          {textList.map((text, index) => (
            <TabPanel key={text.slice(0, 15)} value={tabValue} index={index}>
              {text.split('\n').map((line, index) => {
                if (line === '') {
                  return <br key={index} />;
                } else return <p>{line}</p>;
              })}
            </TabPanel>
          ))}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="body1">Aguardando chamada da API</Typography>
        </Box>
      )}
    </>
  );
};
