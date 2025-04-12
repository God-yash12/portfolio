import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Knowledge from './components/sections/Knowledge';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';

function App() {
  // Set dark mode to true by default
  const [darkMode, setDarkMode] = useState(true);

  // Add effect to set dark mode class when component mounts
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SocialSidebar />
      <main>
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="knowledge"><Knowledge /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;