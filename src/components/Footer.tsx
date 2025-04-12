import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaWhatsapp, FaLinkedin, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="home"
              smooth
              duration={500}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="bg-white p-3 rounded-full mb-2">
                <FaArrowUp className="text-gray-800 animate-bounce" />
              </div>
              <span className="text-sm">Back to Top</span>
            </Link>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold mb-6"
          >
            <span className="text-primary">Ganesh</span> Thapa
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-6 mb-8"
          >
            <a 
              href="https://github.com/God-yash12" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://wa.me/9779860603672" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a 
              href="https://www.linkedin.com/in/ganesh-thapa-357b9228b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-slate-400 text-sm"
          >
            <p>
              © {currentYear} Ganesh Thapa. All rights reserved.
            </p>
            <p className="mt-2">
              Frontend Developer based in Nepal
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;