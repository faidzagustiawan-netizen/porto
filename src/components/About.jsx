import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASING, DURATION } from '../constants/motion';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const visualRef = useRef(null);

  useEffect(() => {
    if (!visualRef.current) return;

    const shapes = visualRef.current.querySelectorAll('.shape');

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        shapes.forEach((shape, index) => {
          const speed = 1 + index * 0.2;
          const yPos = self.progress * 100 * speed;
          const rotation = self.progress * 360 * (index % 2 === 0 ? 1 : -1);
          gsap.to(shape, {
            y: yPos,
            rotation: rotation,
            duration: 0.3,
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const highlights = [
    { word: 'interaction', color: 'text-blue-400' },
    { word: 'motion', color: 'text-purple-400' },
    { word: 'state', color: 'text-cyan-400' },
    { word: 'experience', color: 'text-indigo-400' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-slate-950 relative overflow-hidden py-32 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: DURATION.slow, ease: EASING.easeOut }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.2 }}
          >
            Building interfaces
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              that feel alive
            </span>
          </motion.h2>

          <motion.div
            className="space-y-6 text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.4 }}
          >
            <p>
              I'm a frontend engineer obsessed with the intersection of design,
              code, and human perception. Every animation serves a purpose,
              every transition guides attention.
            </p>

            <p>
              My focus is on crafting{' '}
              <span className="text-blue-400 font-semibold">interaction</span> systems
              that respond naturally, managing{' '}
              <span className="text-purple-400 font-semibold">motion</span> with
              precision, understanding{' '}
              <span className="text-cyan-400 font-semibold">state</span> deeply, and
              building{' '}
              <span className="text-indigo-400 font-semibold">experiences</span> that
              users remember.
            </p>

            <p>
              I believe that performance is a feature, accessibility is non-negotiable,
              and great products feel like magic because they respect physics, timing,
              and human intuition.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.6 }}
          >
            {highlights.map((item, index) => (
              <motion.span
                key={item.word}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`px-6 py-3 bg-slate-900 rounded-full ${item.color} font-medium cursor-default border border-slate-800 hover:border-slate-700 transition-colors`}
              >
                {item.word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          ref={visualRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DURATION.slow, ease: EASING.easeOut, delay: 0.3 }}
          className="relative h-[500px] hidden lg:block"
        >
          <div className="shape absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-xl" />
          <div className="shape absolute top-1/2 right-1/4 w-40 h-40 bg-purple-500 opacity-20 rounded-lg blur-2xl rotate-45" />
          <div className="shape absolute bottom-1/4 left-1/3 w-24 h-24 bg-cyan-500 opacity-20 rounded-full blur-xl" />
          <div className="shape absolute top-1/3 right-1/3 w-36 h-36 bg-indigo-500 opacity-20 rounded-lg blur-2xl rotate-12" />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-64 h-64 border border-slate-800 rounded-full" />
          </motion.div>

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-48 h-48 border border-slate-700 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
