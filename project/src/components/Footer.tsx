import React from 'react';

interface FooterProps {
  theme: 'morning' | 'evening' | 'night' | string;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const textColor = theme === 'morning' ? 'text-gray-800' : 'text-white/80';
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer
      className={`w-full py-4 mt-8 border-t border-white/20 flex justify-center items-center transition-colors duration-500 ${textColor}`}
    >
      <p className="font-quicksand text-sm select-none">
        © {currentYear} Little Gratitude Garden 🌸. Crafted by Anusha with 💖
      </p>
    </footer>
  );
};

export default Footer;
