import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./Routes/AppRouter";

function AppContent() {
  return <AppRouter />
}

function App() {
  return (
    <>
    <BrowserRouter>
    <div className='app'>
    <AppContent/>
    </div>
    </BrowserRouter>
  
    </>
  )
}

export default App
