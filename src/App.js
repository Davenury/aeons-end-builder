import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Mage from './pages/Mage'
import Supply from './pages/Supply';
import Nemesis from './pages/Nemesis';
import NemesisCards from './pages/NemesisCards';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {

  return (
    <HashRouter>
      <div className="app-container">
        <Navbar />

        <div class="top-warning" id="topWarning">
          <div class="warning-content">
            <span class="warning-text">
              <strong>Heads up! Progress is now saved locally on your device. </strong> Your data will stay here even if you refresh or leave the page. Clearing browser data, using private mode, or switching devices will reset it.
              <span class="coming-soon">Export and import features coming soon.</span>
            </span>
          </div>
        </div>

        <img src="https://cdn.shopify.com/s/files/1/0916/9970/8282/files/Aeons-end-BANNER-upc-lc.png" style={{width: "100%", height: "13em", objectFit: "cover"}} />

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
    </HashRouter>
  );
}

export default App;
