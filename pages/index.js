import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-curl-open");
            entry.target.querySelector("img").classList.add("animate-image-up");
            entry.target.classList.remove("opacity-50", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
          } else {
            entry.target.classList.remove("animate-curl-open");
            entry.target.querySelector("img").classList.remove("animate-image-up");
            entry.target.classList.add("opacity-15", "translate-y-8");
            entry.target.classList.remove("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.15 } // Adjusted threshold to make it less sensitive
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

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
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkfGVufDB8fDB8fHww"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <button
          onClick={() => setIsMenuOpen(true)}
          className="focus:outline-none relative z-50"
        >
          <svg
            className="w-9 h-6 text-white"
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
        className="relative flex items-center min-h-screen bg-cover bg-center pt-24 px-8 md:px-16 lg:px-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?fit=crop&w=1920&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Left Content - Text Section */}
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Hi, I'm Harmo
          </h1>
          <p className="text-lg md:text-2xl mb-6 animate-fade-in delay-200">
            A passionate front-end developer crafting amazing user experiences.
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
        className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white px-8 md:px-16 lg:px-24 opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="md:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
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
            src="https://images.unsplash.com/photo-1738167039036-de7b00545f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            alt="About Me"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-gray-600">Portfolio</h2>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-gray-100 px-8 py-16"
      >
        <div className="max-w-5xl w-full bg-white shadow-lg p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Feel free to reach out for collaborations or inquiries. I'll get
              back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Email:</strong> your.email@example.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +123 456 789
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> Nairobi, Kenya
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message"
                  className="w-full p-3 border border-gray-400 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-900 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Harmo | All Rights Reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
