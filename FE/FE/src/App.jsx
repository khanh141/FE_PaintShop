import Header from './assets/components/Header.jsx'
import Footer from './assets/components/Footer.jsx'
import Home from './assets/pages/Home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup  from './assets/components/Signup.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
import './assets/CSS/Body.scss'


function App() {
  return (
    <div className="App">
      < Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
      < Footer />
    </div>
  )
}

export default App
