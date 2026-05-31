import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const heroSlides = [
  "https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?w=1920&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop&q=80",
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);
  const lastScrollY = useRef(0);
  const slideTimerRef = useRef(null);
  const [aboutSectionVisible, setAboutSectionVisible] = useState(false);

  const startAutoPlay = useCallback(() => {
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
  }, []);

  const goToSlide = useCallback(
    (index) => {
      stopAutoPlay();
      setCurrentSlide(index);
      startAutoPlay();
    },
    [stopAutoPlay, startAutoPlay]
  );

  const goNext = useCallback(
    () => goToSlide((currentSlide + 1) % heroSlides.length),
    [currentSlide, goToSlide]
  );

  const goPrev = useCallback(
    () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length),
    [currentSlide, goToSlide]
  );

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (target.id === "portfolio" || target.id === "contact") {
            setIsDarkBackground(entry.isIntersecting);
          }
          if (target.id === "about") {
            setAboutSectionVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (portfolioRef.current) observer.observe(portfolioRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (portfolioRef.current) observer.unobserve(portfolioRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  const scrollToSection = (section) => {
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
      <section id="home" className="relative flex items-center min-h-screen overflow-hidden">
        {/* Carousel background slides */}
        {heroSlides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: i === currentSlide ? 1 : 0,
            }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero content */}
        <div className="relative z-10 text-white w-full px-6 md:px-16 lg:px-24 pt-28 pb-24 md:pt-0 md:pb-0">
          <div className="max-w-2xl">
            {/* Availability badge */}
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-300 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for Work
            </span>

            <h1 className="font-fraunces text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-5 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
              Hi, I&apos;m<br />Humphrey
            </h1>

            <p className="font-poppins text-base sm:text-lg md:text-xl text-gray-100 mb-8 max-w-md leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              A passionate front-end developer crafting amazing user experiences always.
            </p>

            <a
              href="mailto:amphreyomosh2001@gmail.com"
              className="inline-flex items-center gap-2.5 bg-white text-black font-semibold px-7 py-3.5 text-base rounded-full shadow-xl hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Desktop — vertical nav stack on far right */}
        <div className="hidden md:flex flex-col items-center gap-3 absolute right-10 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          <div className="flex flex-col items-center gap-2 py-1">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-2 h-7 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Desktop — slide counter bottom right */}
        <div className="hidden md:flex items-baseline gap-1 absolute bottom-8 right-12 z-10 text-white/60 text-sm font-mono">
          <span className="text-white text-base font-semibold">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="mx-0.5">/</span>
          <span>{String(heroSlides.length).padStart(2, "0")}</span>
        </div>

        {/* Mobile — horizontal dots at bottom center */}
        <div className="flex md:hidden items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-7 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Mobile — left/right arrow buttons at bottom corners */}
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="flex md:hidden absolute bottom-6 left-6 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white items-center justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="flex md:hidden absolute bottom-6 right-6 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white items-center justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
          <h2 className="font-fraunces text-9xl font-bold text-white mb-4">About Me</h2>
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
        <h2 className="font-fraunces text-4xl font-bold text-gray-600 mb-12">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1663047707111-c022dee3abe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhbHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Project 1"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-fraunces text-2xl font-semibold text-gray-800 mb-4">
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

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0fGVufDB8fDB8fHww0"
              alt="Project 2"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-fraunces text-2xl font-semibold text-gray-800 mb-4">
                Project Two | <i>Artwork Site</i>
              </h3>
              <p className="text-gray-600 mb-6">
                A gallery website that showcases various artworks, providing an
                interactive experience for art enthusiasts to explore and enjoy.
              </p>
              <a
                href="https://artwork-kappa.vercel.app/"
                className="inline-block bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              >
                View Project
              </a>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1682147208772-c4ae4db3ab7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljJTIwYXJ0fGVufDB8fDB8fHww"
              alt="Project 3"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-fraunces text-2xl font-semibold text-gray-800 mb-4">
                Project Three | <i>Dreamsters Site</i>
              </h3>
              <p className="text-gray-600 mb-6">
                A music streaming platform that allows users to discover, listen
                to, and share their favorite tracks, integrating with various
                music APIs for a seamless listening experience.
              </p>
              <a
                href="https://dreamsters.netlify.app"
                className="inline-block bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              >
                View Project
              </a>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/comingsoon.jpg"
              alt="Coming Soon"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-fraunces text-2xl font-semibold text-gray-800 mb-4">
                Project Four
              </h3>
              <p className="text-gray-600 mb-6">
                A responsive portfolio website that showcases my web development
                skills, featuring an interactive design and a smooth user
                experience.
              </p>
              <span className="inline-block bg-gray-300 text-gray-600 font-semibold px-4 py-2 rounded-lg">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="flex flex-col items-center justify-center py-24 px-8 md:px-16 lg:px-24">
        <h2 className="font-fraunces text-4xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-300 mb-10 text-center max-w-xl">
          Have a project in mind or just want to say hi? My inbox is always
          open.
        </p>
        <a
          href="mailto:amphreyomosh2001@gmail.com"
          className="bg-white text-black font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300"
        >
          Say Hello
        </a>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-black text-white py-6 text-center">
        <p>&copy; 2026 Harmo. All rights reserved.</p>
      </footer>
    </div>
  );
}
