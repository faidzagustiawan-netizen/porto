import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navigation from './components/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills';
import Experiments from './components/Experiments/Experiments';
import Footer from './components/Footer';
import CustomCursor from './components/Experiments/CustomCursor';

function App() {
  useSmoothScroll();

  return (
    <div className="bg-slate-950">
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experiments />
      <Footer />
    </div>
  );
}

export default App;
