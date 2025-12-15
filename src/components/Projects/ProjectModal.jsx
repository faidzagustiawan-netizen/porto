import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { EASING, DURATION } from '../../constants/motion';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: DURATION.normal, ease: EASING.easeOut }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">{project.title}</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={28} />
            </motion.button>
          </div>

          <div className="p-6 md:p-8">
            <div className="aspect-video bg-slate-800 rounded-xl mb-8 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Problem</h3>
                <p className="text-gray-300 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Approach</h3>
                <p className="text-gray-300 leading-relaxed">{project.approach}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Tech Decisions</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-slate-800 text-blue-400 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mt-4 leading-relaxed">
                {project.techDecisions}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Result & Impact</h3>
              <p className="text-gray-300 leading-relaxed">{project.result}</p>
            </div>

            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <ExternalLink size={20} />
                View Live
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
              >
                <Github size={20} />
                Source Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
