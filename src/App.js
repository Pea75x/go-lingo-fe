import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './components/Map'
import Phrases from './components/Phrases'
import Home from  './components/Home'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Home/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Map />} />
        <Route path='/phrases' element={<Phrases />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
