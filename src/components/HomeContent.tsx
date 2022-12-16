import { Box, Typography } from "@mui/material"
import { bgcolor, Container } from "@mui/system"
import bgSCI from '../assets/bg-sci.png'
import CPaper from './custom-mui/Paper'
import SearchBar from "./SearchBar"


export const HomeContent = () => {
  return (
    <div style={{ 'position': 'relative' }}>
      <Box height={'550px'} sx={{ backgroundImage: `url(${bgSCI})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

      </Box>
      <Container sx={{ position: 'relative', top: '-300px' }}>
        <CPaper 
          sx={{ p: '3rem', minHeight: '1400px', 

        }}>
          <Box display={'flex'} flexDirection='row'>
            <Typography variant="h5" component="h5">
              18 Vagas abertas
            </Typography>
            <SearchBar>
              Hello
            </SearchBar>
          </Box>
          
        </CPaper>
      </Container>
    </div>
  )
}
