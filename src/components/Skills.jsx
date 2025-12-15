import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { DURATION, EASING } from '../constants/motion';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const [hoveredNode, setHoveredNode] = useState(null);

  const skillNodes = [
    { id: 'react', label: 'React', x: 50, y: 30, connections: ['state', 'animation', 'performance'] },
    { id: 'state', label: 'State Management', x: 25, y: 50, connections: ['react', 'performance'] },
    { id: 'animation', label: 'Animation', x: 75, y: 50, connections: ['react', 'performance', 'design'] },
    { id: 'performance', label: 'Performance', x: 50, y: 70, connections: ['react', 'state', 'animation'] },
    { id: 'design', label: 'Design Systems', x: 85, y: 30, connections: ['animation'] },
    { id: 'typescript', label: 'TypeScript', x: 15, y: 30, connections: ['state'] },
    { id: 'testing', label: 'Testing', x: 50, y: 90, connections: ['performance'] },
    { id: 'accessibility', label: 'Accessibility', x: 15, y: 70, connections: ['state', 'design'] },
  ];

  const getConnections = (nodeId) => {
    const node = skillNodes.find((n) => n.id === nodeId);
    return node ? node.connections : [];
  };

  const isConnected = (nodeId) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    const hoveredConnections = getConnections(hoveredNode);
    const nodeConnections = getConnections(nodeId);
    return hoveredConnections.includes(nodeId) || nodeConnections.includes(hoveredNode);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen bg-slate-900 py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Skills as Systems
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies don't exist in isolation. They form interconnected systems where
            each choice influences the whole.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DURATION.slow, delay: 0.3 }}
          className="relative h-[600px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          >
            {skillNodes.map((node) =>
              node.connections.map((connectionId) => {
                const targetNode = skillNodes.find((n) => n.id === connectionId);
                if (!targetNode) return null;

                const isActive = isConnected(node.id) && isConnected(connectionId);

                return (
                  <motion.line
                    key={`${node.id}-${connectionId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isActive ? '#60a5fa' : '#334155'}
                    strokeWidth={isActive ? '2' : '1'}
                    opacity={isActive ? 0.6 : 0.2}
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                );
              })
            )}
          </svg>

          {skillNodes.map((node, index) => {
            const isActive = isConnected(node.id);

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: DURATION.normal,
                  delay: 0.6 + index * 0.05,
                  ease: EASING.bounce,
                }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.2 }}
                className="cursor-pointer z-10"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    px-6 py-3 rounded-full font-medium whitespace-nowrap
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-800 text-gray-400'
                    }
                  `}
                >
                  {node.label}
                </motion.div>

                <motion.div
                  animate={{
                    scale: hoveredNode === node.id ? [1, 1.5, 1] : 1,
                    opacity: hoveredNode === node.id ? [0.5, 1, 0.5] : 0,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-500 rounded-full"
                  style={{ zIndex: -1 }}
                />
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-sm"
          >
            Hover over skills to explore connections
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
