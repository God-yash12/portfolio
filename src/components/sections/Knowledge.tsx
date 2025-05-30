import { motion } from 'framer-motion';
import { JSX } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, 
  FaNodeJs, FaGitAlt, FaCode 
} from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiExpress, SiMongodb, SiMysql, SiNestjs } from 'react-icons/si';

interface Skill {
  name: string;
  icon: JSX.Element;
  level: number;
  textColor?: string;
  bgColor?: string;
}

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`text-2xl ${skill.textColor}`}>
            {skill.icon}
          </div>
          <h3 className="text-lg text-gray-300 font-semibold">{skill.name}</h3>
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {skill.level}%
        </span>
      </div>
      
      {/* Progress bar container */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        {/* Colored progress bar that fills according to skill level */}
        <motion.div 
          className={`h-2.5 rounded-full ${skill.bgColor}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const Knowledge = () => {
  const frontendSkills: Skill[] = [
    { name: 'HTML5', icon: <FaHtml5 />, level: 80, textColor: 'text-orange-500', bgColor: 'bg-orange-600' },
    { name: 'CSS3', icon: <FaCss3Alt />, level: 75, textColor: 'text-blue-500', bgColor: 'bg-orange-600' },
    { name: 'JavaScript', icon: <FaJs />, level: 60, textColor: 'text-yellow-500', bgColor: 'bg-orange-600' },
    { name: 'React.js', icon: <FaReact />, level: 65, textColor: 'text-sky-500', bgColor: 'bg-orange-600' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 70, textColor: 'text-cyan-500', bgColor: 'bg-orange-600' },
    { name: 'TypeScript', icon: <SiTypescript />, level: 55, textColor: 'text-blue-600', bgColor: 'bg-orange-600' },
  ];

  const backendSkills: Skill[] = [
    { name: 'Node.js', icon: <FaNodeJs />, level: 60, textColor: 'text-green-600', bgColor: 'bg-orange-600' },
    { name: 'Express.js', icon: <SiExpress />, level: 60, textColor: 'text-gray-600', bgColor: 'bg-orange-600' },
    { name: 'NestJS', icon: <SiNestjs />, level: 50, textColor: 'text-red-600', bgColor: 'bg-orange-600' },
    { name: 'MongoDB', icon: <SiMongodb />, level: 60, textColor: 'text-green-500', bgColor: 'bg-orange-600' },
    { name: 'MySQL', icon: <SiMysql />, level: 55, textColor: 'text-blue-500', bgColor: 'bg-orange-600' },
    { name: 'Git & GitHub', icon: <FaGitAlt />, level: 60, textColor: 'text-orange-600', bgColor: 'bg-orange-600' },
  ];

  const additionalSkills = [
    { name: 'UI/UX Principles', value: 'Proficient' },
    { name: 'RESTful APIs', value: 'Experienced' },
    { name: 'Modern Build Tools', value: 'Experienced' },
    { name: 'Problem-Solving', value: 'Advanced' },
    { name: 'Team Collaboration', value: 'Advanced' },
    { name: 'Time Management', value: 'Advanced' },
  ];

  return (
    <div className="section-padding">
      <div className="container mx-auto">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Knowledge
        </motion.h2>
        
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-semibold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Frontend Development
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-semibold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Backend & Tools
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {backendSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Additional Skills</h3>
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 text-orange-600">
                    <FaCode />
                  </div>
                  <div>
                    <h4 className=" text-gray-300 font-semibold">{skill.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{skill.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Knowledge;