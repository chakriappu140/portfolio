import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Linkedin, Mail, Code, User, Home, MessageSquare, Briefcase, Award, Zap, GitBranch, LayoutGrid, Database, Cloud } from 'lucide-react';
import { motion } from 'framer-motion'; // Import Framer Motion
import emailjs from 'emailjs-com';

// Animation variants for common entrance effects
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};


const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};


const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};


const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};


const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};


// Main App Component
const App = () => {
  // State for theme (light/dark)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });


  // State for contact form submission message
  const [contactMessage, setContactMessage] = useState('');


  // Effect to update html class and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);


  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  // State for active section for smooth scrolling/navigation
  const [activeSection, setActiveSection] = useState('home');


  // Function to handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };


    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  // Function to handle smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'auto', block: 'start' }); // Changed smooth to auto per your request
    }
  };


  // Handle contact form submission — updated to send email with EmailJS
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const templateParams = {
      from_name: form.name.value,
      reply_to: form.email.value,
      message: form.message.value,
    };


    emailjs.send('service_vs2v0b9', 'template_9n42n8h', templateParams, 'ChD6zERAjA-SsWtHE')
      .then(() => {
        setContactMessage('Message sent successfully!');
        form.reset();
        setTimeout(() => setContactMessage(''), 3000);
      }, () => {
        setContactMessage('Failed to send message, please try again.');
        setTimeout(() => setContactMessage(''), 3000);
      });
  };


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 font-inter transition-colors duration-500">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-lg backdrop-blur-md p-4 flex justify-between items-center rounded-b-xl border-b border-gray-200 dark:border-gray-700">
        <div className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
          <a href="#home" onClick={() => scrollToSection('home')} className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Chakri</a>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#home"
                onClick={() => scrollToSection('home')}
                className={`text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center ${activeSection === 'home' ? 'text-blue-600 dark:text-blue-400 font-semibold scale-105' : ''}`}
              >
                <Home className="mr-2" size={20} /> Home
              </motion.a>
            </li>
            <li>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#about"
                onClick={() => scrollToSection('about')}
                className={`text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center ${activeSection === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold scale-105' : ''}`}
              >
                <User className="mr-2" size={20} /> About
              </motion.a>
            </li>
            <li>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#skills"
                onClick={() => scrollToSection('skills')}
                className={`text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center ${activeSection === 'skills' ? 'text-blue-600 dark:text-blue-400 font-semibold scale-105' : ''}`}
              >
                <Award className="mr-2" size={20} /> Skills
              </motion.a>
            </li>
            <li>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#projects"
                onClick={() => scrollToSection('projects')}
                className={`text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center ${activeSection === 'projects' ? 'text-blue-600 dark:text-blue-400 font-semibold scale-105' : ''}`}
              >
                <Code className="mr-2" size={20} /> Projects
              </motion.a>
            </li>
            <li>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#contact"
                onClick={() => scrollToSection('contact')}
                className={`text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center ${activeSection === 'contact' ? 'text-blue-600 dark:text-blue-400 font-semibold scale-105' : ''}`}
              >
                <MessageSquare className="mr-2" size={20} /> Contact
              </motion.a>
            </li>
          </ul>
        </div>
      </nav>


      {/* Main Content */}
      <main className="pt-24 px-4 md:px-8 lg:px-12"> {/* Padding to account for fixed navbar */}
        {/* Hero Section */}
        <section id="home" className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center text-center bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-900 dark:to-purple-900 text-white p-8 rounded-3xl shadow-2xl overflow-hidden mb-16">
          {/* Abstract background shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-64 h-64 bg-white rounded-full -top-16 -left-16 blur-3xl opacity-10"></div>
            <div className="absolute w-96 h-96 bg-yellow-300 rounded-full -bottom-24 -right-24 blur-3xl opacity-10"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              src="/profile.png" // Reference from public folder
              alt="Chakri's Profile"
              className="rounded-full w-44 h-44 md:w-52 md:h-52 mx-auto mb-8 border-6 border-white shadow-xl transform hover:scale-105 transition-transform duration-300 object-cover"
            />
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg"
            >
              Hello, I'm <span className="text-yellow-300">Chakri 👋</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="text-blue-200 dark:text-blue-300 text-3xl md:text-4xl font-semibold mb-6"
            >
              Fullstack Developer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90"
            >
              I'm a passionate developer who loves building beautiful and functional web applications.
              I enjoy working with React and learning new technologies to solve real-world problems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#contact"
                onClick={() => scrollToSection('contact')}
                className="bg-white text-blue-700 hover:bg-gray-200 px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <MessageSquare size={24} className="mr-2" /> Contact Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/resume.pdf" // Reference from public folder
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <Briefcase size={24} className="mr-2" /> Download Resume
              </motion.a>
            </motion.div>
          </div>
        </section>


        {/* About Section */}
        <motion.section
          id="about"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="py-20 px-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl mx-auto max-w-7xl my-16 border border-gray-200 dark:border-gray-700"
        >
          <motion.h2 variants={fadeIn} className="text-5xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">About Me</motion.h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-16">
            <motion.div variants={slideInLeft} whileHover={{ rotate: 3 }} className="md:w-1/3 mb-10 md:mb-0 flex justify-center">
              <img
                src="https://placehold.co/350x350/a0c4ff/ffffff?text=About+Chakri" // Placeholder image
                alt="About Chakri"
                className="rounded-full w-72 h-72 object-cover shadow-2xl border-4 border-blue-200 dark:border-blue-700 transition-transform duration-300"
              />
            </motion.div>
            <motion.div variants={slideInRight} className="md:w-2/3 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p className="mb-6 text-xl">
                Hello! I'm <span className="font-semibold text-blue-600 dark:text-blue-400">Chakri</span>, a passionate and dedicated software developer with a strong focus on creating intuitive and high-performance web applications. My journey into the world of technology began with a deep curiosity for how digital experiences are crafted, leading me to immerse myself in various programming paradigms and frameworks.
              </p>
              <p className="mb-6 text-xl">
                I specialize in <span className="font-semibold text-blue-600 dark:text-blue-400">React.js</span> for building dynamic and responsive front-end interfaces, ensuring a seamless user experience. On the backend, I'm proficient with <span className="font-semibold text-blue-600 dark:text-blue-400">Node.js</span> and adept at managing databases using <span className="font-semibold text-blue-600 dark:text-blue-400">MongoDB</span> and <span className="font-semibold text-blue-600 dark:text-blue-400">PostgreSQL</span>. I thrive on transforming complex challenges into elegant, efficient, and scalable solutions.
              </p>
              <p className="text-xl">
                Beyond coding, I enjoy exploring cutting-edge technologies, contributing to open-source projects, and staying active with outdoor adventures. I am a firm believer in continuous learning and am always excited to collaborate on innovative projects that push the boundaries of what's possible.
              </p>
            </motion.div>
          </div>
        </motion.section>


        {/* Skills Section */}
        <motion.section
          id="skills"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="py-20 px-6 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-xl mx-auto max-w-7xl my-16 border border-gray-200 dark:border-gray-700"
        >
          <motion.h2 variants={fadeIn} className="text-5xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">My Skills</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Frontend */}
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeInScale} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-transform duration-300 border border-gray-200 dark:border-gray-700">
              <Zap size={48} className="text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Frontend</h3>
              <ul className="list-none p-0 text-gray-700 dark:text-gray-300 text-lg">
                <li>React</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>Tailwind CSS</li>
                <li>Redux</li>
              </ul>
            </motion.div>
            {/* Backend */}
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeInScale} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-transform duration-300 border border-gray-200 dark:border-gray-700">
              <GitBranch size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Backend</h3>
              <ul className="list-none p-0 text-gray-700 dark:text-gray-300 text-lg">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>Python</li>
                <li>RESTful APIs</li>
                <li>Authentication</li>
              </ul>
            </motion.div>
            {/* Databases */}
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeInScale} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-transform duration-300 border border-gray-200 dark:border-gray-700">
              <Database size={48} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Databases</h3>
              <ul className="list-none p-0 text-gray-700 dark:text-gray-300 text-lg">
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>Firebase Firestore</li>
              </ul>
            </motion.div>
            {/* Tools & Platforms */}
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeInScale} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-transform duration-300 border border-gray-200 dark:border-gray-700">
              <Cloud size={48} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Tools & Platforms</h3>
              <ul className="list-none p-0 text-gray-700 dark:text-gray-300 text-lg">
                <li>Git & GitHub</li>
                <li>VS Code</li>
                <li>Netlify / Vercel</li>
                <li>Docker</li>
                <li>AWS Basics</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>



        {/* Projects Section */}
        <motion.section
          id="projects"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="py-20 px-6 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl mx-auto max-w-7xl my-16 border border-gray-200 dark:border-gray-700"
        >
          <motion.h2 variants={fadeIn} className="text-5xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">My Projects</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Project Card 1 */}
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeInScale} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <img
                src="https://placehold.co/600x400/818cf8/ffffff?text=Project+1" // Placeholder image
                alt="Project 1"
                className="w-full h-56 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-semibold mb-4 text-blue-700 dark:text-blue-400">E-commerce Platform</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  A full-stack e-commerce application featuring user authentication, product catalog, shopping cart, and secure payment processing. Built for scalability and a seamless user experience.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">React</span>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Node.js</span>
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-900 dark:text-purple-300">MongoDB</span>
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Stripe API</span>
                </div>
                <div className="flex justify-between items-center">
                  <motion.a whileHover={{ scale: 1.05 }} href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center font-medium text-lg">
                    Live Demo <span className="ml-2">&#8599;</span>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center text-lg">
                    <Github size={22} className="mr-2" /> GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>


            {/* Project Card 2 */}
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeInScale} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <img
                src="https://placehold.co/600x400/fecaca/ffffff?text=Project+2"
                alt="Project 2"
                className="w-full h-56 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Task Management App</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  A collaborative task management application with real-time updates, drag-and-drop functionality, and user roles. Designed to boost team productivity.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-300">Vue.js</span>
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Firebase</span>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Firestore</span>
                </div>
                <div className="flex justify-between items-center">
                  <motion.a whileHover={{ scale: 1.05 }} href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center font-medium text-lg">
                    Live Demo <span className="ml-2">&#8599;</span>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center text-lg">
                    <Github size={22} className="mr-2" /> GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>


            {/* Project Card 3 */}
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeInScale} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <img
                src="https://placehold.co/600x400/bfdbfe/ffffff?text=Project+3"
                alt="Project 3"
                className="w-full h-56 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Data Visualization Dashboard</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  An interactive dashboard visualizing complex datasets with custom charts and filters. Built for data analysis and insightful reporting.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-orange-900 dark:text-orange-300">D3.js</span>
                  <span className="bg-cyan-100 text-cyan-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-cyan-900 dark:text-cyan-300">Python</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200">Flask</span>
                </div>
                <div className="flex justify-between items-center">
                  <motion.a whileHover={{ scale: 1.05 }} href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center font-medium text-lg">
                    Live Demo <span className="ml-2">&#8599;</span>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center text-lg">
                    <Github size={22} className="mr-2" /> GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>


        {/* Contact Section */}
        <motion.section
          id="contact"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="py-20 px-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl mx-auto max-w-7xl my-16 border border-gray-200 dark:border-gray-700"
        >
          <motion.h2 variants={fadeIn} className="text-5xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">Get In Touch</motion.h2>
          <motion.div variants={fadeIn} className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-10 text-gray-700 dark:text-gray-300">
              I'm always open to new opportunities, collaborations, and interesting discussions. Feel free to reach out!
            </p>
            <motion.div variants={staggerContainer} className="flex justify-center space-x-8 mb-12">
              <motion.a
                whileHover={{ scale: 1.15 }}
                href="mailto:chakravarthyanekula@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex flex-col items-center group"
                aria-label="Email me"
              >
                <Mail size={48} className="mb-3 group-hover:drop-shadow-lg" />
                <span className="text-xl font-semibold">Email</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                href="https://github.com/chakriappu140"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex flex-col items-center group"
                aria-label="Visit my GitHub profile"
              >
                <Github size={48} className="mb-3 group-hover:drop-shadow-lg" />
                <span className="text-xl font-semibold">GitHub</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                href="https://www.linkedin.com/in/chakravarthy-anekula-2968a9257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors flex flex-col items-center group"
                aria-label="Visit my LinkedIn profile"
              >
                <Linkedin size={48} className="mb-3 group-hover:drop-shadow-lg" />
                <span className="text-xl font-semibold">LinkedIn</span>
              </motion.a>
            </motion.div>
            {/* Contact Form */}
            <motion.form variants={fadeIn} onSubmit={handleContactSubmit} className="bg-gray-50 dark:bg-gray-700 p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="mb-6">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
              <div className="mb-6">
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
              <div className="mb-8">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  required
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-lg w-full md:w-auto"
              >
                Send Message
              </motion.button>
              {contactMessage && (
                <p className="mt-4 text-green-600 dark:text-green-400 font-semibold text-lg">{contactMessage}</p>
              )}
            </motion.form>
          </motion.div>
        </motion.section>
      </main>


      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-10 text-center rounded-t-3xl border-t border-gray-700 dark:border-gray-800">
        <p className="text-lg mb-4">&copy; {new Date().getFullYear()} Chakri. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <motion.a whileHover={{ scale: 1.25 }} href="https://github.com/chakriappu140" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
            <Github size={28} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.25 }} href="https://www.linkedin.com/in/chakravarthy-anekula-2968a9257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={28} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.25 }} href="mailto:chakravarthyanekula@gmail.com" className="hover:text-white transition-colors" aria-label="Email">
            <Mail size={28} />
          </motion.a>
        </div>
      </footer>
    </div>
  );
};


export default App;
