import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Sermons from "./pages/Sermons";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import Location from "./pages/Location";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/sermons" element={<Sermons/>}/>
            <Route path="/activities" element={<Activities/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/location" element={<Location/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
