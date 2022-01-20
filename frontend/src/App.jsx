import MenuBar from './components/MenuBar';
import { Container, Box } from '@mui/material';
import RootProvider from './context/rootContext';
import Pager from './pages/Pager';

function App() {
  return (
    <Box sx={{ bgcolor: 'text.secondary' }}>
      <RootProvider>
        <Container disableGutters={true} maxWidth="sm" sx={{
          height: '100vh',
          background: '#fff'
        }}>
          <MenuBar />
          <Pager />
        </Container>
      </RootProvider>
    </Box>
  );
}

export default App;
