import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Metronom from './Pages/Metronom';
import Tuner from './Pages/Tuner';
import Academia from './Pages/Academia';
import Login from './Pages/Login';
import Registro from './Pages/Registro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Metronom" element={<Metronom />} />
        <Route path="/Tuner" element={<Tuner />} />
        <Route path="/Academia" element={<Academia />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
