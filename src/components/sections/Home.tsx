import { Link } from "react-scroll";
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowDown  } from 'react-icons/fa';
import MyImage from "../../assets/me.jpg";



const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding pt-24 md:pt-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2 lg:m-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-lg mb-2 text-slate-900 dark:text-slate-400">Hello, I'm</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Ganesh Thapa
            </h1>
            <div className="text-2xl md:text-3xl font-semibold mb-6 text-primary">
              <TypeAnimation
                sequence={[
                  'Frontend Developer',
                  2000,
                  'React Specialist',
                  2000,
                  'UI/UX Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <div>
              <p className="text-base md:text-lg space-y-5 mb-8">
                Passionate and detail-oriented Frontend Developer with hands-on experience in
                React.js, Tailwind CSS, and JavaScript. Building dynamic, responsive, and
                user-friendly web applications.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="projects"
                smooth
                duration={500}
                className="btn-primary flex items-center gap-2"
              >
                View My Work <FaArrowRight />
              </Link>
              <Link
                to="contact"
                smooth
                duration={500}
                className="btn-outline"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl"></div>

              {/* Replace with your actual profile image */}
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                <img
                  src={MyImage}
                  alt="Ganesh Thapa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Scroll Down</div>
            <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700 animate-bounce"> </div>
            <div className=" text-slate-300 dark:text-slate-700 animate-bounce"><FaArrowDown /></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;