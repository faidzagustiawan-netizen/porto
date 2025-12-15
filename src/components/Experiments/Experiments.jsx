import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';
import DraggableCard from './DraggableCard';
import { DURATION } from '../../constants/motion';

const Experiments = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section
      id="experiments"
      ref={sectionRef}
      className="min-h-screen bg-slate-950 py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-yellow-400" size={32} />
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Experiments
            </h2>
            <Sparkles className="text-yellow-400" size={32} />
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Exploring the boundaries of interaction design through playful micro-interactions
            and physics-based animations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.1 }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Magnetic Button</h3>
            <p className="text-gray-400 mb-8">
              Button that responds to cursor proximity with spring physics
            </p>
            <div className="flex justify-center">
              <MagneticButton>Hover near me</MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.2 }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Physics Drag</h3>
            <p className="text-gray-400 mb-8">
              Drag interaction with elastic constraints and rotation
            </p>
            <div className="flex justify-center items-center h-64">
              <DraggableCard />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.3 }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ripple Effect</h3>
            <p className="text-gray-400 mb-8">
              Click anywhere to create expanding ripple animations
            </p>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="relative h-64 bg-slate-800 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('div');
                ripple.className = 'ripple-animation';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                e.currentTarget.appendChild(ripple);

                setTimeout(() => ripple.remove(), 1000);
              }}
            >
              <p className="text-gray-500 text-lg">Click me</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.4 }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Morphing Shapes</h3>
            <p className="text-gray-400 mb-8">
              SVG path animations with smooth morphing transitions
            </p>
            <div className="flex justify-center items-center h-64">
              <motion.svg width="200" height="200" viewBox="0 0 200 200">
                <motion.path
                  d="M100,50 L150,150 L50,150 Z"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  animate={{
                    d: [
                      'M100,50 L150,150 L50,150 Z',
                      'M100,100 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0',
                      'M50,50 L150,50 L150,150 L50,150 Z',
                      'M100,50 L150,150 L50,150 Z',
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.5 }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Parallax Cards</h3>
            <p className="text-gray-400 mb-8">
              Mouse-tracked 3D perspective with depth layers
            </p>
            <div className="relative h-64">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="absolute inset-4 bg-slate-900/50 rounded-lg flex items-center justify-center"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <p className="text-white font-bold text-xl">Hover me</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.6 }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Text Scramble</h3>
            <p className="text-gray-400 mb-8">
              Cyberpunk-style text reveal with character randomization
            </p>
            <div className="flex items-center justify-center h-64">
              <motion.p
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                DIGITAL_FUTURE
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>
        {`
          .ripple-animation {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(96, 165, 250, 0.5);
            transform: translate(-50%, -50%);
            animation: ripple 1s ease-out;
            pointer-events: none;
          }

          @keyframes ripple {
            to {
              width: 300px;
              height: 300px;
              opacity: 0;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Experiments;
