import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Image from "next/image";

// Lazy load components
const AboutSection = lazy(() => import('./components/AboutSection'));
const PortfolioSection = lazy(() => import('./components/PortfolioSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);
  const lastScrollY = useRef(0); // To track last scroll position
  const [scrollDirection, setScrollDirection] = useState(null);
  const [aboutSectionVisible, setAboutSectionVisible] = useState(false); // Track if the about section is in view

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        // Scrolling down
        setScrollDirection("down");
      } else {
        // Scrolling up
        setScrollDirection("up");
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          // Check if portfolio or contact section is in view
          if (target.id === "portfolio" || target.id === "contact") {
            setIsDarkBackground(entry.isIntersecting);
          }

          // Track if the About section is in view
          if (target.id === "about") {
            setAboutSectionVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.25 } // Adjusted threshold to make it less sensitive
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      if (portfolioRef.current) {
        observer.unobserve(portfolioRef.current);
      }
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [scrollDirection]);

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center transition-opacity duration-700 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-90"
        }`}
      >
        <Image
          src="/harmo-image.jpg"
          alt="Profile"
          width={48}
          height={48}
          className="rounded-full object-cover"
          priority
        />
        <button
          onClick={() => setIsMenuOpen(true)}
          className="focus:outline-none relative z-50"
        >
          <svg
            className={`w-9 h-14 ${
              isDarkBackground ? "text-black" : "text-white"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {/* Full-Screen Navigation */}
      <div
        className={`fixed inset-0 bg-black z-40 bg-opacity-90 flex flex-col items-start justify-center transition-transform duration-700 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-4xl z-50"
        >
          &times;
        </button>
        <ul
          id="menuOpen"
          className="text-white text-5xl space-y-10 text-start ml-10"
        >
          {["home", "about", "portfolio", "contact"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className="hover:text-gray-400 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Home Section */}
      <section
        id="home"
        className="relative flex items-center min-h-screen pt-24 px-8 md:px-16 lg:px-24"
      >
        {/* Image Background */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?w=1920&auto=format&fit=crop&q=100&ixlib=rb-4.0.3')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Left Content - Text Section */}
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Hi, I'm Humphrey
          </h1>
          <p className="text-lg md:text-2xl mb-6 animate-fade-in delay-200">
            A passionate front-end developer crafting amazing user experiences
            always.
          </p>
          <a
            href="#portfolio"
            className="inline-block bg-white text-black font-semibold px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300 animate-fade-in delay-400"
          >
            View My Work
          </a>
        </div>

        {/* Right Floating Call-To-Action */}
        <div className="hidden md:block absolute right-12 bottom-12 z-10">
          <a
            href="#contact"
            className="bg-white text-black font-semibold px-5 py-3 text-lg rounded-full shadow-lg hover:bg-gray-300 transition-all duration-300"
          >
            Let's Connect
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`flex flex-col md:flex-row items-center justify-center min-h-screen px-8 md:px-16 lg:px-24 transition-all duration-700 transform ${
          aboutSectionVisible ? "translate-y-0" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="md:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-9xl font-bold text-white mb-4">About Me</h2>
          <p className="text-lg text-white leading-relaxed">
            I am a passionate front-end developer with a strong background in
            web design and development. With a keen eye for aesthetics and
            functionality, I create seamless user experiences that bring ideas
            to life.
          </p>
          <p className="text-lg text-white mt-4">
            My expertise includes React, Next.js, and WordPress, enabling me to
            build modern, dynamic websites. I am dedicated to continuous
            learning and innovation in the digital space.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://media.istockphoto.com/id/183766364/photo/portrait-of-a-faceless-man.webp?a=1&b=1&s=612x612&w=0&k=20&c=487iEyJGi7hMSti8b3ocY5mbXoL20uH6IulaQbYzDcQ="
            alt="About Me"
          />
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        ref={portfolioRef}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-16"
      >
        <h2 className="text-4xl font-bold text-gray-600 mb-12">Portfolio</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1663047707111-c022dee3abe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhbHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Project 1"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Project One | <i>Meal Site</i>
              </h3>
              <p className="text-gray-600 mb-6">
                A web application that allows users to search for recipes based
                on ingredients, dietary restrictions, and meal types. Users can
                also save their favorite recipes and create a shopping list
                based on their meal plan.
              </p>
              <a
                href="https://mealsite.netlify.app/"
                className="inline-block bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              >
                View Project
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0fGVufDB8fDB8fHww0"
              alt="Project 2"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Project Two | <i>artwork Site</i>
              </h3>
              <p className="text-gray-600 mb-6">
                A gallery website that showcases various artworks, providing an
                interactive experience for art enthusiasts to explore and enjoy
              </p>
              <a
                href="https://artwork-kappa.vercel.app/"
                className="inline-block bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              >
                View Project
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1682147208772-c4ae4db3ab7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljJTIwYXJ0fGVufDB8fDB8fHww"
              alt="Project 3"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Project Three | <i>Dreamsters site</i>
              </h3>
              <p className="text-gray-600 mb-6">
                A music streaming platform that allows users to discover, listen
                to, and share their favorite tracks. Built with a focus on user
                experience, this project integrates with various music APIs to
                provide a seamless and enjoyable listening experience.
              </p>
              <a
                href="https://dreamsters.netlify.app"
                className="inline-block bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              >
                View Project
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/comingsoon.jpg"
              alt="Project 4"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Project Four
              </h3>
              <p className="text-gray-600 mb-6">
                A responsive portfolio website that showcases my web development
                skills, featuring an interactive design and a smooth user
                experience.
              </p>
              <a
                href="/comingsoon.jpg"
                className="inline-block bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              >
                View Project
              </a>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Main Content */}
      <main className="flex-grow">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="text-xl mb-8">Web Developer & Designer</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                About Me
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </section>

        {/* Lazy loaded sections */}
        <Suspense fallback={<div className="py-20">Loading...</div>}>
          <AboutSection aboutRef={aboutRef} />
        </Suspense>
        <Suspense fallback={<div className="py-20">Loading...</div>}>
          <PortfolioSection portfolioRef={portfolioRef} />
        </Suspense>
        <Suspense fallback={<div className="py-20">Loading...</div>}>
          <ContactSection contactRef={contactRef} />
        </Suspense>
      </main>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed right-0 top-0 w-full md:w-64 h-full bg-white shadow-lg z-50 p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="mt-8">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded"
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer id="footer" className="bg-black text-white py-6 text-center">
        <p>&copy; 2025 Harmo. All rights reserved.</p>
      </footer>
    </div>
  )}
