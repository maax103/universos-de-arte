import { MyThemeProvider } from './theme/MyThemeProvider';
import { CssBaseline } from '@mui/material';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';

function App() {
  return (
    <>
      <MyThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Página nao encontrada</h1>} />
          </Routes>
        </Router>
      </MyThemeProvider>
    </>
  );
}

export default App;
