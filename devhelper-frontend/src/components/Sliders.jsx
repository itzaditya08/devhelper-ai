import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sliders = ({ title = "How This Feature Works", sections = [] }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSlider = () => setIsOpen(!isOpen);

  const renderCard = (num, title, description, color) => (
    <div
      key={num + title}
      className="bg-muted rounded-2xl p-4 flex items-start gap-4 min-w-[300px] w-full"
    >
      <div
        className="rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: color }}
      >
        {num}
      </div>
      <div>
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="mt-10 border border-border rounded-xl p-2 bg-background shadow-sm">
      <button
        onClick={toggleSlider}
        className="flex items-center justify-between w-full text-left text-lg font-semibold text-foreground"
      >
        <span>{title}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {sections.map((section, idx) => (
                <div key={section.title + idx}>
                  <h2 className="text-xl font-bold mb-3 text-primary">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.cards.map((card, index) =>
                      renderCard(index + 1, card.title, card.description, card.color)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sliders;
