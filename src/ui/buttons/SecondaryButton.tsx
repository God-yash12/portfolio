import { ReactNode } from 'react';
import { Link as ScrollLink } from 'react-scroll';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}



export const SecondaryButton = ({ children, to, href, onClick, className = '' }: ButtonProps) => {
    // Content to be rendered inside any button type
    const content = (
      <span className="flex items-center gap-2 justify-center">
        {children}
      </span>
    );
  
    // If it's a scroll link
    if (to) {
      return (
        <ScrollLink
          to={to}
          smooth
          duration={500}
          className={`px-6 py-3 border-2 border-gray-400 text-2xl rounded-lg hover:bg-gray-400 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 ${className}`}
          onClick={onClick}
        >
          {content}
        </ScrollLink>
      );
    }
  
    // If it's an external link
    if (href) {
      return (
        <a
          href={href}
          className={`px-6 py-3 border-2 border-gray-400 text-2xl rounded-lg hover:bg-gray-400 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 ${className}`}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
  
    // If it's a button
    return (
      <button
        onClick={onClick}
        className={`px-6 py-3 border-2 border-gray-400 text-2xl rounded-lg hover:bg-gray-400 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 ${className}`}
      >
        {content}
      </button>
    );
  };