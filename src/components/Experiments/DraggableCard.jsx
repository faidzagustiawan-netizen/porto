import { motion } from 'framer-motion';

const DraggableCard = () => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, rotate: 5 }}
      className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xl"
    >
      <p className="text-white font-bold text-xl">Drag me!</p>
    </motion.div>
  );
};

export default DraggableCard;
