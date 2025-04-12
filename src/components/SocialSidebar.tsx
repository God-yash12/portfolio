import { useState, useEffect, FC } from 'react';
import { FaGithub, FaWhatsapp, FaLinkedin, FaFilePdf, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SocialSidebar: FC = () => {
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

  const handleDownload = (): void => {
    const link = document.createElement('a');
    // This is the correct way to reference files in the public folder
    link.href = '/GaneshThapaCV.pdf';
    link.download = 'GaneshThapaCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <motion.div 
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a 
          href="https://github.com/God-yash12" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon text-white bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-primary transition-colors duration-300"
          aria-label="GitHub"
        >
          <FaGithub className="text-lg" />
        </a>
        <a 
          href="https://wa.me/9779860603672" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon text-white bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-primary transition-colors duration-300"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="text-lg" />
        </a>
        <a 
          href="https://www.linkedin.com/in/ganesh-thapa-357b9228b/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon text-white bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-primary transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-lg" />
        </a>
        <button
          onClick={() => setShowPdfModal(true)}
          className="social-icon text-white bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-primary transition-colors duration-300"
          aria-label="GaneshThapaCV/CV"
        >
          <FaFilePdf className="text-lg" />
        </button>
        <div className="h-24 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
      </motion.div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-auto relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 text-gray-700 dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="text-lg" />
            </button>
            
            <div className="p-4">
              <SimplePdfViewer pdfUrl="/GaneshThapaCV.pdf" />
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-700 text-center sticky bottom-0">
              <button
                onClick={handleDownload}
                className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                <FaFilePdf /> Download CV
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

interface SimplePdfViewerProps {
  pdfUrl: string;
}

// Use iframe as the most reliable method for displaying PDFs
const SimplePdfViewer: FC<SimplePdfViewerProps> = ({ pdfUrl }) => {
  const [fileExists, setFileExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if the PDF exists and is accessible
  useEffect(() => {
    const checkPdf = async () => {
      try {
        const response = await fetch(pdfUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Failed to load PDF: ${response.status}`);
        }
        setFileExists(true);
        setLoading(false);
      } catch (error) {
        console.error('Error checking PDF:', error);
        setFileExists(false);
        setLoading(false);
      }
    };

    checkPdf();
  }, [pdfUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!fileExists) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Could not load the PDF file. Please check if the file exists at {pdfUrl}</p>
        <p className="mt-2">Make sure your PDF is in the public folder and named exactly "GaneshThapaCV.pdf"</p>
      </div>
    );
  }

  // Use iframe as a reliable method to display PDFs
  return (
    <div className="w-full h-full">
      <iframe 
        src={`${pdfUrl}#view=FitH`}
        className="w-full h-screen max-h-[70vh]"
        title="CV Preview"
      />
    </div>
  );
};

export default SocialSidebar;