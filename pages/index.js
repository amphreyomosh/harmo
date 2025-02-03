import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar (hidden when menu is open) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-gray-600 p-4 flex justify-between items-center transition-opacity duration-700 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
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
        className={`fixed inset-0 bg-black bg-opacity-90 flex flex-col items-start justify-center transition-transform duration-700 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-4xl z-50"
        >
          &times;
        </button>
        <ul id="menuOpen" className="text-white text-5xl space-y-10 text-start ml-10">
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

      {/* Sections */}
      <section
        id="home"
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <h1 className="text-5xl font-bold text-gray-600">Hi, I'm Harmo</h1>
      </section>
      <section
        id="about"
        className="flex flex-col items-center justify-center min-h-screen bg-white"
      >
        <h2 className="text-4xl font-bold text-gray-600">About Me</h2>
      </section>
      <section
        id="portfolio"
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-gray-600">Portfolio</h2>
      </section>
      <section
        id="contact"
        className="flex flex-col items-center justify-center min-h-screen bg-white"
      >
        <h2 className="text-4xl font-bold text-gray-600">Contact Me</h2>
      </section>
    </div>
  );
}
