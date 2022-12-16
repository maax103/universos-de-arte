import './App.css';
import { MyThemeProvider } from './theme/MyThemeProvider.js';
import { CssBaseline } from '@mui/material';
import { Home } from './pages/Home';
import { ReactDOM } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Vagas } from './pages/Vagas';

function App() {

  return (
    <>
      <MyThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vagas" element={<Vagas />} />
            <Route path="*" element={<h1>Erro</h1>}/>
          </Routes>
        </Router>
      </MyThemeProvider>
    </>
  );
}

export default App;
