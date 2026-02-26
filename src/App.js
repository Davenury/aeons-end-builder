import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Mage from './pages/Mage'
import Supply from './pages/Supply';
import Nemesis from './pages/Nemesis';
import NemesisCards from './pages/NemesisCards';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <img src="https://cdn.shopify.com/s/files/1/0916/9970/8282/files/Aeons-end-BANNER-upc-lc.png" style={{width: "100%", height: "15em", objectFit: "cover"}} />

        <main className="page">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/mage" element={<Mage />}></Route>
            <Route path="/supply" element={<Supply />}></Route>
            <Route path="/nemesis" element={<Nemesis />}></Route>
            <Route path="/nemesis-cards" element={<NemesisCards />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
