import Header from './assets/components/Header.jsx'
import Footer from './assets/components/Footer.jsx'
import Home from './assets/pages/Home.jsx'
import Login from './assets/pages/Login.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      < Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
      < Footer />
    </div>
  )
}

export default App
