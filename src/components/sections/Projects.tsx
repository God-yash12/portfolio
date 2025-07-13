import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import HotelLogo from "../../assets/hotel.png";
import CMSImage from "../../assets/cms.jpeg";
import AILogo from "../../assets/ai-logo.jpeg"

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center section-padding pt-6 md:pt-0">
      <div className="container mx-auto">
        <motion.div
          className="rounded-lg overflow-hidden shadow-md group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-2 mb-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary/20 text-white rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-gray-800/80 dark:bg-slate-800/80 p-2 rounded-full hover:bg-primary transition-colors duration-300"
                  aria-label="GitHub Repository"
                >
                  <FaGithub className="text-lg" />
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-gray-800/80 dark:bg-slate-800/80 p-2 rounded-full hover:bg-primary transition-colors duration-300"
                    aria-label="Live Demo"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              {project.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Content Management System",
      description: "A full-featured CMS built with React, TypeScript, and Tailwind CSS. Includes user management, content creation, and publishing features.",
      image: CMSImage,
      tags: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/God-yash12/amphlo_cms.git",
      demo: "https://cms-project.example.com"
    },
    {
      id: 2,
      title: "AI Solutions Website",
      description: "Modern and responsive website for a tech company with interactive elements and smooth animations.",
      image: AILogo,
      tags: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/God-yash12/AI_Solutions-.git",
      demo: "https://tech-website.example.com"
    },
    {
      id: 3,
      title: "Kusum Airport Hotel",
      description: "Elegant and user-friendly hotel website with booking functionality and room showcase.",
      image: HotelLogo,
      tags: ["React", "TypeScript", "Tailwind CSS", "React Query", "React Hook Form", "Zod"],
      github: "https://github.com/God-yash12/kusum_hotel.git",
      demo: process.env.Hotel_WEBSITE_URL || "https://kusumairporthotel-git-main-ganesh-thapas-projects.vercel.app/"
    },
    // Add more projects as needed
  ];

  return (
    <div className="section-padding ">
      <div className="container mx-auto">
        <motion.h2
          className="section-title "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here are some of my recent projects. Each project reflects my commitment to clean code,
          responsive design, and user-friendly interfaces.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://github.com/God-yash12"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 text-gray-700 dark:text-white border-gray-700 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaGithub /> View More on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;