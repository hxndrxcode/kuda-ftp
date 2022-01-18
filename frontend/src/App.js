import MenuBar from './components/MenuBar';
import { Container } from '@mui/material';
import RootProvider from './context/rootContext';
import Pager from './components/Pager';

function App() {
  return (
    <RootProvider>
      <Container disableGutters={true} maxWidth="sm" sx={{
        height: '100vh',
        background: '#d2f2d2'
      }}>
        <MenuBar />
        <Pager />
      </Container>
      </RootProvider>
  );
}

export default App;
