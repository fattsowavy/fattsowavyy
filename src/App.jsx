import BootScreen from './components/BootScreen';
import RetroFX from './components/RetroFX';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <BootScreen />
      <RetroFX />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Achievements />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}

export default App;
