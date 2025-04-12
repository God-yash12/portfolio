import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle manual navigation completion
  useEffect(() => {
    if (isManualScroll && targetSection) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsManualScroll(false);
        setActiveSection(targetSection);
      }, 500); // Match this with your scroll duration
    }
  }, [isManualScroll, targetSection]);

  const handleNavClick = (sectionId: string) => {
    setTargetSection(sectionId);
    setIsManualScroll(true);

    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Control body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Knowledge', to: 'knowledge' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  // Animation variants for mobile menu
  const sidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for individual links
  const linkVariants = {
    closed: {
      x: -20,
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1
    }
  };

  // Animation variants for menu button
  const menuIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? `${darkMode ? 'bg-slate-900/90 shadow-lg' : 'bg-white/90 shadow-lg'}`
        : 'bg-transparent'
        } backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="home"
            smooth
            duration={500}
            className="cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <motion.h1
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary">Ganesh</span> Thapa
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  spy={false}
                  smooth={true}
                  offset={-70}
                  duration={10}
                  onSetActive={(to) => {
                    if (!isManualScroll) {
                      setActiveSection(to);
                    }
                  }}
                  onClick={() => handleNavClick(link.to)}
                  className={`nav-link text-base font-medium cursor-pointer ${isActive ? 'active text-blue-500' : ''
                    }`}
                  ignoreCancelEvents={true}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-white bg-slate-200 dark:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-white" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 mr-4 rounded-full bg-white dark:bg-slate-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-white" />}
            </button>
            <motion.button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none z-50 p-2"
              aria-label="Toggle Menu"
              variants={menuIconVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-6 h-6">
                <motion.span
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : -4
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2"
                  animate={{
                    opacity: isOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2"
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : 4
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu with Animation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar with Gradient */}
        <motion.div
          className={`fixed left-0 top-0 bottom-0 w-4/5 max-w-sm z-50 shadow-2xl flex flex-col 
                     ${darkMode
              ? 'bg-gray-800'
              : 'bg-gray-800'}`}
          variants={sidebarVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {/* Logo area in sidebar */}
          <div className=" border-b border-gray-200/20 dark:border-gray-700/20">
            <Link
              to="home"
              smooth
              duration={500}
              className="cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <h1 className="text-2xl font-bold pt-6 pl-6 text-white">
                <span className="text-blue-500">Ganesh</span> Thapa
              </h1>
            </Link>
          </div>

          {/* Links */}
          <div className="flex flex-col py-8 px-6 space-y-6 bg-gray-800">
            {navLinks.map((link) => {
              const isActive = activeSection === link.to;

              return (
                <motion.div
                  key={link.to}
                  variants={linkVariants}
                >
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={10}
                    onSetActive={(to) => {
                      if (!isManualScroll) {
                        setActiveSection(to);
                      }
                    }}
                    onClick={() => handleNavClick(link.to)}
                    className={`nav-link text-xl font-medium block text-white transition-colors duration-300 ${isActive
                      ? 'active text-blue-400 dark:text-blue-300'
                      : 'hover:text-blue-500 dark:hover:text-blue-300'
                      }`}
                    ignoreCancelEvents={true}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Social links or additional content could go here */}
          <div className="mt-auto p-6 border-t border-gray-200/20 text-white dark:border-gray-700/20 bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              &copy; {new Date().getFullYear()} Ganesh Thapa
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;