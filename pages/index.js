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
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-black p-6 flex justify-between items-center transition-opacity duration-700 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-90"}`}>
        <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkfGVufDB8fDB8fHww" alt="Profile" className="w-12 h-12 rounded-full object-cover" />
        <button onClick={() => setIsMenuOpen(true)} className="focus:outline-none relative z-50">
          <svg className="w-9 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {/* Full-Screen Navigation */}
      <div className={`fixed inset-0 bg-black bg-opacity-90 flex flex-col items-start justify-center transition-transform duration-700 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white text-4xl z-50">&times;</button>
        <ul id="menuOpen" className="text-white text-5xl space-y-10 text-start ml-10">
          {["home", "about", "portfolio", "contact"].map((section) => (
            <li key={section}>
              <button onClick={() => scrollToSection(section)} className="hover:text-gray-400 transition-colors">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <section id="home" className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold text-gray-600">Hi, I'm Harmo</h1>
      </section>

      <section id="about" className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h2 className="text-4xl font-bold text-gray-600">About Me</h2>
      </section>

      <section id="portfolio" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-4xl font-bold text-gray-600">Portfolio</h2>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-100 px-8 py-16">
        <div className="max-w-5xl w-full bg-white shadow-lg p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">Feel free to reach out for collaborations or inquiries. I'll get back to you as soon as possible.</p>
            <div className="space-y-4">
              <p className="text-gray-700"><strong>Email:</strong> your.email@example.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +123 456 789</p>
              <p className="text-gray-700"><strong>Address:</strong> Nairobi, Kenya</p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input type="text" placeholder="Enter your name" className="w-full p-3 border border-gray-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                <input type="email" placeholder="Enter your email" className="w-full p-3 border border-gray-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea rows="4" placeholder="Write your message" className="w-full p-3 border border-gray-400 focus:outline-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 font-medium hover:bg-gray-900 transition">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Harmo | All Rights Reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.54 17.52 2 12 2S2 6.54 2 12.07C2 16.6 5.24 20.35 9.43 21v-6.43h-2.1v-2.5h2.1v-1.9c0-2.07 1.23-3.2 3.11-3.2.9 0 1.84.17 1.84.17v2h-1.02c-1 0-1.31.63-1.31 1.27v1.66h2.34l-.38 2.5h-1.96V21c4.19-.65 7.43-4.4 7.43-8.93z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 4.02 9 9 9 1.61 0 3.13-.43 4.42-1.17l-1.02-2.05A6.946 6.946 0 0112 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7h2c0-5.52-4.48-10-10-10z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
