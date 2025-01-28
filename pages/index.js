import { useState } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false); // Close the menu after clicking a link
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">My Portfolio</h1>

          {/* Hamburger Menu Button (visible on small screens) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navbar Links (hidden on small screens, visible on larger screens) */}
          <ul className="hidden lg:flex space-x-6">
            <li>
              <button
                onClick={() => scrollToSection('home')}
                className={`text-lg font-medium ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-lg font-medium ${activeSection === 'about' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('portfolio')}
                className={`text-lg font-medium ${activeSection === 'portfolio' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-lg font-medium ${activeSection === 'contact' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu (visible on small screens when hamburger is clicked) */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-4 p-6">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className={`text-lg font-medium ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`text-lg font-medium ${activeSection === 'about' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className={`text-lg font-medium ${activeSection === 'portfolio' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`text-lg font-medium ${activeSection === 'contact' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to My Portfolio!</h1>
        <p className="mt-4 text-lg text-gray-700">This is the home section of my single-page application.</p>
        <button
          onClick={() => scrollToSection('about')}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Learn More About Me
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h2 className="text-3xl font-bold text-blue-600">About Me</h2>
        <p className="mt-4 text-lg text-gray-700">This is the about section. Here, you can write about yourself.</p>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-blue-600">Portfolio</h2>
        <p className="mt-4 text-lg text-gray-700">This is the portfolio section. Showcase your work here.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h2 className="text-3xl font-bold text-blue-600">Contact Me</h2>
        <p className="mt-4 text-lg text-gray-700">This is the contact section. Add a contact form or details here.</p>
      </section>
    </div>
  );
}