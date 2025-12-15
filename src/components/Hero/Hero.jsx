import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { EASING, DURATION, STAGGER } from '../../constants/motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import Scene3D from './Scene3D';

const Hero = () => {
  const mousePosition = useMousePosition();
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);

  useEffect(() => {
    const chars = headlineRef.current.querySelectorAll('.char');
    const words = sublineRef.current.querySelectorAll('.word');

    gsap.fromTo(
      chars,
      { opacity: 0, y: 100, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.5,
      }
    );

    gsap.fromTo(
      words,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.5,
      }
    );
  }, []);

  const headline = "I design and engineer interactive web experiences.";
  const subline = "Crafting digital products with motion, depth, and purpose.";

  return (
    <section id="home" className="relative h-screen w-full bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene3D mousePosition={mousePosition} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 max-w-5xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 leading-tight"
          style={{ perspective: '1000px' }}
        >
          {headline.split('').map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p
          ref={sublineRef}
          className="text-lg md:text-xl text-gray-400 text-center max-w-2xl"
        >
          {subline.split(' ').map((word, index) => (
            <span key={index} className="word inline-block mr-2">
              {word}
            </span>
          ))}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: DURATION.normal }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: EASING.easeInOut }}
            className="text-white cursor-pointer"
            onClick={() => {
              document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={32} className="opacity-60 hover:opacity-100 transition-opacity" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
