import { useState, useRef, FormEvent, ChangeEvent, JSX } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { BeatLoader } from 'react-spinners';

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
    
    // Prepare template parameters
    // const templateParams = {
    //   from_name: formData.name,
    //   from_email: formData.email,
    //   subject: formData.subject,
    //   message: formData.message
    // };
    
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
        
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 text-gray-200">
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
            
            <div className="relative h-full min-h-[300px] lg:min-h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.979433140826!2d83.45!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996864275d9755f%3A0x2b1e92d89d4bb3ae!2sTilottama%2C%20Nepal!5e0!3m2!1sen!2sus!4v1649679371025!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Map showing Tilottama, Nepal"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;