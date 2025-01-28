import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './Map'
import Phrases from './Phrases'
import Home from  './Home'

function App() {
  return (
    <BrowserRouter>
      <Home/>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/phrases' element={<Phrases />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
