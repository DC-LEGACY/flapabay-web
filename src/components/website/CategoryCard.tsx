import React from 'react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: React.ElementType;
  propertyCount: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon: Icon,
  propertyCount,
  onClick,
  isSelected = false,
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-6 rounded-xl text-center transition-all group ${
        isSelected
          ? "bg-blue-600 text-white"
          : "bg-gray-50 hover:bg-gray-100 text-gray-900"
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon
          size={32}
          className={`mx-auto mb-3 ${
            isSelected ? "text-white" : "text-blue-600"
          }`}
          variant="Bold"
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block text-lg font-medium mb-1"
      >
        {name}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`text-sm ${isSelected ? "text-white/80" : "text-gray-500"}`}
      >
        {propertyCount} properties
      </motion.span>
    </motion.button>
  );
};

export default CategoryCard; 