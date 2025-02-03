import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false); // Close the menu after clicking a link
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav id="navbar" className="sticky top-0 bg-white z-50">
        <div
          id="container"
          className="container mx-auto px-6 py-4 flex justify-between items-center"
        >
          {/* Hamburger Menu Button (always visible) */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkfGVufDB8fDB8fHww"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-9 h-6"
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
        </div>

        {/* Mobile & Desktop Menu */}
        <div
          className={`navbar-opens shadow-md transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
          style={{
            clipPath: isMenuOpen
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
        >
          <ul className="flex flex-col space-y-4 p-6">
            {[
              { name: "Home", id: "home" },
              { name: "About", id: "about" },
              { name: "Portfolio", id: "portfolio" },
              { name: "Contact", id: "contact" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-lg font-medium text-gray-700"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkfGVufDB8fDB8fHww"
                alt="Profile"
                className="w-48 h-48 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-4xl font-bold text-gray-600">
                Hi, I'm Harmo
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="flex flex-col items-center justify-center min-h-screen bg-white"
      >
        <h2 className="text-3xl font-bold text-gray-600">About Me</h2>
        <p className="mt-4 text-lg text-gray-700">
          This is the about section. Here, you can write about yourself.
        </p>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-600">Portfolio</h2>
        <p className="mt-4 text-lg text-gray-700">
          This is the portfolio section. Showcase your work here.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="flex flex-col items-center justify-center min-h-screen bg-white"
      >
        <h2 className="text-3xl font-bold text-gray-600">Contact Me</h2>
        <p className="mt-4 text-lg text-gray-700">
          This is the contact section. Add a contact form or details here.
        </p>
      </section>
    </div>
  );
}