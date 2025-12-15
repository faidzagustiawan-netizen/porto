import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { EASING, DURATION } from '../../constants/motion';

const ProjectCard = ({ project, onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ duration: 0.3, ease: EASING.easeOut }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative bg-slate-900 rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 p-8">
        <div className="aspect-video bg-slate-800 rounded-xl mb-6 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 45 }}
            className="text-gray-400 group-hover:text-white transition-colors"
          >
            <ExternalLink size={20} />
          </motion.div>
        </div>

        <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-800 text-gray-300 text-sm rounded-full group-hover:bg-slate-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 40%)',
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
