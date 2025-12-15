import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { DURATION, STAGGER } from '../../constants/motion';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  const projects = [
    {
      id: 1,
      title: 'Real-time Collaboration Platform',
      description: 'A WebSocket-powered collaborative workspace with live cursors, presence, and state synchronization.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'WebSocket', 'Framer Motion', 'Zustand'],
      problem: 'Traditional collaboration tools felt disconnected and laggy, lacking the real-time responsiveness users expect from modern applications.',
      approach: 'Built a custom WebSocket infrastructure with optimistic updates, conflict resolution, and smooth animations for all state changes.',
      techDecisions: 'Chose Zustand for lightweight state management, Framer Motion for gesture-based interactions, and implemented a custom CRDT-like system for conflict resolution.',
      result: 'Achieved sub-50ms latency for all operations with smooth 60fps animations throughout the experience.',
    },
    {
      id: 2,
      title: 'E-commerce with Motion Design',
      description: 'A high-performance shopping experience with advanced transitions, micro-interactions, and optimistic UI.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Next.js', 'GSAP', 'Three.js', 'Shopify'],
      problem: 'E-commerce sites often sacrifice experience for conversion metrics, resulting in generic, lifeless interfaces.',
      approach: 'Created a component system where every interaction tells a story, from product cards that reveal details on hover to a 3D cart experience.',
      techDecisions: 'Used GSAP for complex timelines, Three.js for product visualization, and implemented shared element transitions between routes.',
      result: 'Increased engagement time by 40% and reduced cart abandonment through delightful micro-interactions.',
    },
    {
      id: 3,
      title: 'Data Visualization Dashboard',
      description: 'An animated analytics platform that transforms complex data into intuitive, interactive visualizations.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'D3.js', 'Framer Motion', 'WebGL'],
      problem: 'Data dashboards are typically static and overwhelming, making it hard for users to extract insights quickly.',
      approach: 'Designed animated transitions between data states, implemented intelligent filtering with spring physics, and added contextual micro-interactions.',
      techDecisions: 'Combined D3 for data transformation with Framer Motion for orchestration, using WebGL for rendering large datasets efficiently.',
      result: 'Users reported 60% faster insight discovery with significantly improved satisfaction scores.',
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen bg-slate-950 py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Selected Work
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Projects where interaction design, engineering excellence, and user experience
            converge into memorable digital products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.normal, delay: index * STAGGER.children }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
