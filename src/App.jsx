import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar.jsx';
import Home from '@/pages/Home.jsx';
import About from '@/pages/About.jsx';

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}