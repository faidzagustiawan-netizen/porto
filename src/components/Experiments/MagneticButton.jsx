import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const strength = 0.3;
      setPosition({
        x: deltaX * strength,
        y: deltaY * strength,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
