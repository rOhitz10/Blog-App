import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./Routes/AppRouter";
import { AuthProvider } from './contexts/Auth';

function AppContent() {
  return <AppRouter />
}

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <div className='app'>
    <AppContent/>
    </div>
    </AuthProvider>
    </BrowserRouter>
  
    </>
  )
}

export default App
