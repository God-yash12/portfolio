import { motion } from 'framer-motion';
import { FaUser, FaCode, FaGraduationCap, FaLanguage } from 'react-icons/fa';
import AboutMe from "../../assets/AboutMe.jpg";

const About = () => {
  return (
    <div className="pt-10 min-h-screen flex items-center justify-center section-padding md:pt-0">
      <div className="container mx-auto">
        <motion.h2
          className="section-title text-3xl md:text-4xl font-bold text-center mb-12 relative pt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative patterns */}
              <div className="absolute top-4 left-4 w-full h-full border-2 border-primary rounded-lg -z-10"></div>

              {/* Replace with your actual image */}
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={AboutMe}
                  alt="Ganesh Thapa"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Frontend Developer based in Nepal
            </h3>

            <div className="text-base md:text-lg space-y-5 mb-8 ">
              <p className=''>
                I'm a passionate frontend developer with a strong focus on creating intuitive and
                visually appealing user interfaces. With hands-on experience in React.js, Tailwind CSS,
                and JavaScript, I enjoy turning complex problems into simple, beautiful, and intuitive
                designs.
              </p>

              <p className='text-base md:text-lg space-y-5 mb-8'>
                Currently in my third year of BSc.IT at ISMT College, I'm constantly learning and
                improving my skills. I have experience working with modern frontend technologies and
                basic knowledge of backend development, making me a versatile developer ready to take
                on exciting challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <FaUser />
                </div>
                <div>
                  <h4 className="font-semibold">Name</h4>
                  <p>Ganesh Thapa</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <FaGraduationCap />
                </div>
                <div>
                  <h4 className="font-semibold">Education</h4>
                  <p>BSc.IT (3rd year)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <FaCode />
                </div>
                <div>
                  <h4 className="font-semibold">Experience</h4>
                  <p>Frontend Developer Intern</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <FaLanguage />
                </div>
                <div>
                  <h4 className="font-semibold">Languages</h4>
                  <p>Nepali, English, Hindi, French (Basic)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/GaneshThapaCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                download={true}
              >
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;