import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
