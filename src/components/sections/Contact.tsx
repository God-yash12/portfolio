import { useState, useRef, FormEvent, ChangeEvent, JSX, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { BeatLoader } from 'react-spinners';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

// Import the CanvasLoader component
const CanvasLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

// Earth component
const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

// EarthCanvas component
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactDetail {
  icon: JSX.Element;
  title: string;
  value: string;
  link: string;
}

interface SubmitStatus {
  success: boolean;
  error: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    success: false,
    error: ''
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Replace these with your actual EmailJS credentials
    const serviceId = 'service_9mkuwbr';
    const templateId = 'template_h7t4geh';
    const publicKey = 'WvTca2_Igoe3uLlbN';
    
    if (formRef.current) {
      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSubmitStatus({
            success: true,
            error: ''
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
          
          // Reset success message after 5 seconds
          setTimeout(() => {
            setSubmitStatus({
              success: false,
              error: ''
            });
          }, 5000);
        })
        .catch((err) => {
          console.log('FAILED...', err);
          setSubmitStatus({
            success: false,
            error: 'Failed to send message. Please try again later.'
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
      setSubmitStatus({
        success: false,
        error: 'Form reference is not available.'
      });
    }
  };
  
  const contactDetails: ContactDetail[] = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'ganeshthapa98457@gmail.com',
      link: 'mailto:ganeshthapa98457@gmail.com'
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Phone',
      value: '+977 9845753788',
      link: 'tel:+9779845753788'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Tilottama-3, Rupandehi, Nepal',
      link: 'https://maps.google.com/?q=Tilottama+Rupandehi+Nepal'
    }
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
          Get In Touch
        </motion.h2>
        
        <motion.p 
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm interested in freelance opportunities – especially ambitious or large projects. 
          However, if you have other requests or questions, don't hesitate to contact me.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 text-gray-200">
          {contactDetails.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="text-2xl text-primary bg-primary/10 p-4 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{item.value}</p>
            </motion.a>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              
              {submitStatus.success && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-4 rounded-lg mb-6">
                  Your message has been sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus.error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
                  {submitStatus.error}
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <BeatLoader size={10} color="#ffffff" />
                      <span className="ml-2">Sending...</span>
                    </div>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Earth Canvas Section */}
          <motion.div
            className="h-[400px] lg:h-auto rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-full h-full bg-slate-800 relative">
              <EarthCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;