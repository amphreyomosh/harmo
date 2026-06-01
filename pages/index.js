import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─── Static data ────────────────────────────────────────────────────────────

const heroSlides = [
  "https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?w=1920&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop&q=80",
];

const websiteProjects = [
  {
    id: 1,
    label: "Project One",
    title: "Meal Site",
    description:
      "A web application that allows users to search for recipes based on ingredients, dietary restrictions, and meal types — with save and shopping list features.",
    image:
      "https://plus.unsplash.com/premium_photo-1663047707111-c022dee3abe7?w=800&auto=format&fit=crop&q=60",
    link: "https://mealsite.netlify.app/",
    tech: ["React", "API", "CSS"],
  },
  {
    id: 2,
    label: "Project Two",
    title: "Artwork Site",
    description:
      "A gallery website that showcases various artworks, providing an interactive experience for art enthusiasts to explore and enjoy.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
    link: "https://artwork-kappa.vercel.app/",
    tech: ["Next.js", "Vercel", "CSS"],
  },
  {
    id: 3,
    label: "Project Three",
    title: "Dreamsters Site",
    description:
      "A music streaming platform for discovering, listening to, and sharing favorite tracks, with seamless music API integrations.",
    image:
      "https://plus.unsplash.com/premium_photo-1682147208772-c4ae4db3ab7e?w=800&auto=format&fit=crop&q=60",
    link: "https://dreamsters.netlify.app",
    tech: ["React", "Netlify", "API"],
  },
  {
    id: 4,
    label: "Project Four",
    title: "Coming Soon",
    description:
      "A responsive portfolio website showcasing web development skills with an interactive design and smooth user experience.",
    image: "/comingsoon.jpg",
    link: null,
    tech: ["TBA"],
  },
];

const aboutSlides = [
  {
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&auto=format&fit=crop&q=80",
    caption: "Developing digital experiences",
  },
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80",
    caption: "Training the next generation",
  },
  {
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop&q=80",
    caption: "Designing with purpose",
  },
  {
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop&q=80",
    caption: "Exploring AI & innovation",
  },
];

const categoryColors = {
  "Homepage":   "bg-blue-500",
  "Web Design": "bg-violet-500",
  "UI":         "bg-orange-500",
};

const mockupProjects = [
  { id: 1,  title: "Consumer Federation",     category: "Web Design", href: "https://www.gladtech.io/consumerfederation" },
  { id: 2,  title: "Daughters of Zion",       category: "Homepage",   href: "https://www.gladtech.io/daughters-of-zion" },
  { id: 3,  title: "Davis Water Club Polo",   category: "Homepage",   href: "https://www.gladtech.io/davis-water-club-polo" },
  { id: 4,  title: "Dot Dot",                 category: "UI",         href: "https://www.gladtech.io/dot-dot" },
  { id: 5,  title: "Excelerate Foundation",   category: "Web Design", href: "https://www.gladtech.io/excelerate-foundation" },
  { id: 6,  title: "Escape Velocity",         category: "UI",         href: "https://www.gladtech.io/escape-velocity" },
  { id: 7,  title: "Faithfools",              category: "Homepage",   href: "https://www.gladtech.io/faithfools" },
  { id: 8,  title: "Farmers Market Coalition",category: "Web Design", href: "https://www.gladtech.io/farmers-market-coalition" },
  { id: 9,  title: "FDAC",                    category: "Web Design", href: "https://www.gladtech.io/fdac" },
  { id: 10, title: "Fulton Avenue",           category: "Homepage",   href: "https://www.gladtech.io/fulton-avenue" },
  { id: 11, title: "Globaltrans Safety",      category: "Web Design", href: "https://www.gladtech.io/globaltrans-safety" },
  { id: 12, title: "IMBA",                    category: "UI",         href: "https://www.gladtech.io/imba" },
  { id: 13, title: "Basset Rescue",           category: "Homepage",   href: "https://www.gladtech.io/basset-rescue" },
  { id: 14, title: "Greentech Education",     category: "Web Design", href: "https://www.gladtech.io/greentech-education" },
  { id: 15, title: "IASD",                    category: "UI",         href: "https://www.gladtech.io/iasd" },
  { id: 16, title: "Italian Center",          category: "Homepage",   href: "https://www.gladtech.io/italian-center" },
  { id: 17, title: "IWF",                     category: "Web Design", href: "https://www.gladtech.io/iwf" },
  { id: 18, title: "Twelvebridges Rhino",       category: "UI",         href: "https://www.gladtech.io/twelvebridges-rhino" },
  { id: 19, title: "AFM Local 12",             category: "Homepage",   href: "https://www.gladtech.io/afmlocal12" },
  { id: 20, title: "Ancil Hoffman Golf Club",  category: "Web Design", href: "https://www.gladtech.io/ancilhoffman-golf-club" },
  { id: 21, title: "Polo Club",                category: "Homepage",   href: "https://www.gladtech.io/polo-club" },
  { id: 22, title: "Animal Rescue Squad",      category: "Homepage",   href: "https://www.gladtech.io/animal-rescue-squad" },
  { id: 23, title: "Aqua Monsters",            category: "UI",         href: "https://www.gladtech.io/aqua-monsters" },
  { id: 24, title: "ACBO",                     category: "Web Design", href: "https://www.gladtech.io/acbo" },
  { id: 25, title: "Roseville",                category: "Homepage",   href: "https://www.gladtech.io/roseville" },
  { id: 26, title: "Decathlon",                category: "UI",         href: "https://www.gladtech.io/decathlon" },
  { id: 27, title: "Broken Chain",             category: "Web Design", href: "https://www.gladtech.io/broken-chain" },
  { id: 28, title: "California Museum",        category: "Homepage",   href: "https://www.gladtech.io/california-museum" },
  { id: 29, title: "CAA",                      category: "Web Design", href: "https://www.gladtech.io/caa" },
  { id: 30, title: "CAPRED",                   category: "UI",         href: "https://www.gladtech.io/capred" },
  { id: 31, title: "CAPSES",                   category: "Homepage",   href: "https://www.gladtech.io/capses" },
  { id: 32, title: "CARPD",                    category: "Web Design", href: "https://www.gladtech.io/carpd" },
  { id: 33, title: "Capital Network",          category: "UI",         href: "https://www.gladtech.io/capital-network" },
  { id: 34, title: "Flood Association",        category: "Homepage",   href: "https://www.gladtech.io/flood-association" },
  { id: 35, title: "California Citrus",        category: "Web Design", href: "https://www.gladtech.io/california-citrus" },
  { id: 36, title: "CERA",                     category: "UI",         href: "https://www.gladtech.io/cera" },
  { id: 37, title: "CFWC",                     category: "Homepage",   href: "https://www.gladtech.io/cfwc" },
  { id: 38, title: "CFOT",                     category: "Web Design", href: "https://www.gladtech.io/cfot" },
  { id: 39, title: "CFSA",                     category: "UI",         href: "https://www.gladtech.io/cfsa" },
  { id: 40, title: "Cal Hospice",              category: "Homepage",   href: "https://www.gladtech.io/calhospice" },
  { id: 41, title: "CIF",                      category: "Web Design", href: "https://www.gladtech.io/cif" },
  { id: 42, title: "Activated Ministries",     category: "Homepage",   href: "https://www.gladtech.io/activated-ministries" },
  { id: 43, title: "CALPSC",                   category: "UI",         href: "https://www.gladtech.io/calpsc" },
  { id: 44, title: "CNSO",                     category: "Web Design", href: "https://www.gladtech.io/cnso" },
  { id: 45, title: "CSSSC",                    category: "Homepage",   href: "https://www.gladtech.io/csssc" },
  { id: 46, title: "Elk Grove Educators",      category: "Web Design", href: "https://www.gladtech.io/elkgrooveeducators" },
  { id: 47, title: "CSOAA",                    category: "UI",         href: "https://www.gladtech.io/csoaa" },
  { id: 48, title: "Campus Life Connectors",   category: "Homepage",   href: "https://www.gladtech.io/campus-life-connectors" },
  { id: 49, title: "Children of Promise",      category: "Web Design", href: "https://www.gladtech.io/children-of-promise" },
  { id: 50, title: "CT Catholic",              category: "UI",         href: "https://www.gladtech.io/ctcatholic" },
  { id: 51, title: "Bradshaw PI",              category: "Web Design", href: "https://bradshaw-pi.vercel.app/" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    handle: "Connect professionally",
    href: "https://www.linkedin.com/in/humphrey-amphrey",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    handle: "Chat directly",
    href: "https://wa.me/254700000000",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "Follow updates",
    href: "https://www.facebook.com/humphrey.amphrey",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "Watch content",
    href: "https://www.tiktok.com/@humphrey",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mockupCanScrollLeft, setMockupCanScrollLeft] = useState(false);
  const [mockupCanScrollRight, setMockupCanScrollRight] = useState(true);
  const [aboutSlide, setAboutSlide] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutRow2Visible, setAboutRow2Visible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const aboutRef = useRef(null);
  const aboutRow2Ref = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const slideTimerRef = useRef(null);
  const mockupScrollRef = useRef(null);

  // Parallax scroll tracking
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero carousel autoplay
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

  // About section slideshow auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setAboutSlide((p) => (p + 1) % aboutSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Horizontal scroll helpers
  const checkMockupScroll = () => {
    const el = mockupScrollRef.current;
    if (!el) return;
    setMockupCanScrollLeft(el.scrollLeft > 0);
    setMockupCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };
  const scrollMockups = (dir) => {
    const el = mockupScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.55), behavior: "smooth" });
  };

  // Check initial scroll state after first paint
  useEffect(() => {
    const frame = requestAnimationFrame(checkMockupScroll);
    return () => cancelAnimationFrame(frame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Section visibility observers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { id } = entry.target;
          if (id === "projects") setIsDarkBackground(entry.isIntersecting);
          if (id === "about") setAboutVisible(entry.isIntersecting);
          if (id === "projects") setProjectsVisible(entry.isIntersecting);
          if (id === "contact") setContactVisible(entry.isIntersecting);
          if (entry.target === aboutRow2Ref.current) setAboutRow2Visible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (aboutRow2Ref.current) observer.observe(aboutRow2Ref.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (aboutRow2Ref.current) observer.unobserve(aboutRow2Ref.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  const scrollToSection = (section) => {
    setIsMenuOpen(false);
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
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
        <button onClick={() => setIsMenuOpen(true)} className="focus:outline-none">
          <svg
            className={`w-9 h-14 transition-colors duration-300 ${isDarkBackground ? "text-black" : "text-white"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {/* ── Full-screen navigation overlay ─────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-black z-40 bg-opacity-95 flex flex-col items-start justify-center transition-transform duration-700 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white text-4xl z-50">
          &times;
        </button>
        <ul id="menuOpen" className="text-white space-y-10 text-start ml-10">
          {["home", "about", "projects", "contact"].map((section) => (
            <li key={section}>
              <button onClick={() => scrollToSection(section)} className="hover:text-gray-400 transition-colors">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative flex items-center min-h-[100dvh] overflow-hidden">
        {heroSlides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url('${src}')`, opacity: i === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-white w-full px-6 md:px-16 lg:px-24 pt-20 pb-20 md:pt-0 md:pb-0">
          <div className="max-w-4xl">
            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
              Your Idea, Built and Launched Properly.
            </h1>
            <p className="font-poppins text-base sm:text-lg md:text-xl text-gray-100 mb-8 max-w-md leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              Frontend development and design for founders who care about quality.
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

        {/* Available for Work ribbon — left edge slide-in/out */}
        <div className="fixed left-0 top-[18%] z-50 ribbon-in-out pointer-events-none select-none">
          <div className="bg-white text-black flex items-center px-6 py-3.5 shadow-xl rounded-r-full">
            <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap font-poppins">
              Available for Work
            </span>
          </div>
        </div>

        {/* Desktop carousel nav — far right vertical stack */}
        <div className="hidden md:flex flex-col items-center gap-3 absolute right-10 top-1/2 -translate-y-1/2 z-10">
          <button onClick={goPrev} aria-label="Previous slide" className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <div className="flex flex-col items-center gap-2 py-1">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goToSlide(i)} aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === currentSlide ? "w-2 h-7 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <button onClick={goNext} aria-label="Next slide" className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-baseline gap-1 absolute bottom-8 right-12 z-10 text-white/60 text-sm font-mono">
          <span className="text-white text-base font-semibold">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="mx-0.5">/</span>
          <span>{String(heroSlides.length).padStart(2, "0")}</span>
        </div>

        {/* Mobile dots */}
        <div className="flex md:hidden items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === currentSlide ? "w-7 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"}`}
            />
          ))}
        </div>
        <button onClick={goPrev} aria-label="Previous slide" className="flex md:hidden absolute bottom-6 left-6 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={goNext} aria-label="Next slide" className="flex md:hidden absolute bottom-6 right-6 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        ref={aboutRef}
        className="relative overflow-hidden bg-[rgb(18,18,18)]"
      >
        {/* Parallax dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: `translateY(${scrollY * 0.12}px)`,
          }}
        />

        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-24 pb-0">

          {/* About Me — centered eyebrow */}
          <p className={`text-xs uppercase tracking-widest text-gray-500 text-center mb-10 transition-all duration-700 ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            About Me
          </p>

          {/* ── Row 1: text left · image right ─────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center pb-20">

            {/* Text column */}
            <div className={`transition-all duration-1000 ${aboutVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}`}>
              <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Creating Impact Through<br />Technology and Education.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Technology has always been more than code and tools to me. What excites me most is helping people understand how technology can solve real problems and create new opportunities. Over the years, I have focused on exploring Artificial Intelligence, web development, user experience, and digital innovation — constantly looking for practical ways to turn complex ideas into simple solutions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                My work combines technology and education. I enjoy training students, guiding beginners, and designing learning experiences that make AI and digital skills accessible to everyone. Whether I&apos;m leading a workshop, building a project, or experimenting with new tools, my goal is always the same: to transform knowledge into something useful, actionable, and impactful.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I believe the future belongs to people who can learn, adapt, and work alongside emerging technologies. That belief drives me to keep learning, building, and sharing what I discover. When I&apos;m not building or teaching, you&apos;ll find me exploring new AI tools and searching for better ways to bridge the gap between technology and human potential.
              </p>
              <div className="flex flex-wrap gap-2">
                {["WordPress", "Squarespace", "UI Design", "Web Design & Dev", "Trainer in Tech"].map((skill) => (
                  <span key={skill} className="text-xs border border-white/20 text-gray-300 px-3 py-1.5 rounded-full hover:border-white/50 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Image column — inner parallax */}
            <div className={`transition-all duration-1000 delay-200 ${aboutVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://media.istockphoto.com/id/183766364/photo/portrait-of-a-faceless-man.webp?a=1&b=1&s=612x612&w=0&k=20&c=487iEyJGi7hMSti8b3ocY5mbXoL20uH6IulaQbYzDcQ="
                  alt="Humphrey"
                  className="w-full h-[420px] md:h-[520px] object-cover"
                  style={{ transform: `scale(1.06) translateY(${scrollY * 0.025}px)` }}
                />
              </div>
            </div>
          </div>

          {/* ── Divider ─────────────────────────────────────────────────────── */}
          <div className="border-t border-white/10" />

          {/* The Journey — centered eyebrow */}
          <p className={`text-xs uppercase tracking-widest text-gray-500 text-center mt-16 mb-10 transition-all duration-700 ${aboutRow2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            The Journey
          </p>

          {/* ── Row 2: slideshow left · story text right ────────────────────── */}
          <div
            ref={aboutRow2Ref}
            className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center pb-20"
          >
            {/* Mini slideshow */}
            <div className={`transition-all duration-1000 ${aboutRow2Visible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}`}>
              <div className="relative rounded-2xl overflow-hidden h-72 md:h-[420px] group">
                {/* Slides */}
                {aboutSlides.map((slide, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === aboutSlide ? "opacity-100" : "opacity-0"}`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <p className="absolute bottom-12 left-5 text-white text-sm font-medium tracking-wide">
                      {slide.caption}
                    </p>
                  </div>
                ))}

                {/* Hover arrows */}
                <button
                  onClick={() => setAboutSlide((p) => (p - 1 + aboutSlides.length) % aboutSlides.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setAboutSlide((p) => (p + 1) % aboutSlides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Slide dots */}
                <div className="absolute bottom-4 left-5 flex gap-1.5">
                  {aboutSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setAboutSlide(i)}
                      className={`rounded-full transition-all duration-300 ${i === aboutSlide ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Story text */}
            <div className={`transition-all duration-1000 delay-200 ${aboutRow2Visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}>
              <h3 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                Building, Teaching,<br />Repeating.
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Every project begins with a question: what does success look like for you? That question shapes everything — the design choices, the tools, the way I train or build. There are no shortcuts when quality is the standard.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                From workshops and training sessions to live websites and design systems, I&apos;ve spent years working at the intersection of building and teaching. These images capture moments from that ongoing journey — proof that great work is rarely finished; it just keeps evolving.
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  "50+ Students Trained",
                  "20+ Projects Delivered",
                  "AI Tools Explorer",
                  "Workshop Facilitator",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-colors">
                    <span className="text-white/40 mt-0.5">✦</span>
                    <span className="text-gray-300 text-xs leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="projects"
        ref={projectsRef}
        className="min-h-screen bg-gray-50 py-24 px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-7xl mx-auto">
          <p className={`text-xs uppercase tracking-widest text-gray-400 mb-4 text-center transition-all duration-700 ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            My Work
          </p>
          <h2 className={`font-fraunces text-4xl md:text-5xl font-bold text-gray-900 mb-3 transition-all duration-700 delay-100 ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Selected Projects.
          </h2>
          <p className={`text-gray-500 text-lg mb-10 max-w-lg transition-all duration-700 delay-150 ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            From fully functional live websites to polished design mockups — here's what I've been building.
          </p>

          {/* ── Four large cards — 2 × 2 grid ── */}
          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            {websiteProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                    Live
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{project.label}</p>
                  <h3 className="font-fraunces text-xl font-bold text-gray-900 mb-2 leading-snug">{project.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed mb-5">{project.description}</p>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-black border border-gray-200 px-4 py-2 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-shrink-0"
                      >
                        View Live
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 flex-shrink-0">Coming Soon</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Mockups — label + prev/next, then horizontal scroll ── */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Design Mockups</p>
              <p className="font-fraunces text-lg font-semibold text-gray-900">51 Selected Designs</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollMockups(-1)}
                disabled={!mockupCanScrollLeft}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-25 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollMockups(1)}
                disabled={!mockupCanScrollRight}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-25 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={mockupScrollRef}
            onScroll={checkMockupScroll}
            className="flex gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {mockupProjects.map((mockup) => (
              <a
                key={mockup.id}
                href={mockup.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex-none w-[170px] sm:w-[190px] h-[250px] rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={`https://image.thum.io/get/width/800/crop/500/${mockup.href}`}
                  alt={mockup.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <span className={`absolute top-3 left-3 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${categoryColors[mockup.category]}`}>
                  {mockup.category}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-fraunces text-sm font-bold text-white leading-snug">{mockup.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        ref={contactRef}
        className="relative min-h-screen bg-[rgb(18,18,18)] flex items-center overflow-hidden border-t border-white/10"
      >
        {/* Parallax dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        />

        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-24">
          {/* Let's Talk — centered eyebrow */}
          <p className={`text-xs uppercase tracking-widest text-gray-500 text-center mb-12 transition-all duration-700 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Let&apos;s Talk
          </p>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

            {/* Left: text + CTA — slides in from left */}
            <div className={`transition-all duration-1000 ${contactVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}`}>
              <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Let's Build Something<br />Great Together.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Have a project in mind or want to collaborate? I'd love to hear about your idea and how we can bring it to life with quality and intention.
              </p>
              <a
                href="mailto:amphreyomosh2001@gmail.com"
                className="inline-flex items-center gap-2.5 bg-white text-black font-semibold px-7 py-3.5 rounded-full hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
              >
                Send an Email
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right: social icons 2×2 — slides in from right */}
            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-200 ${contactVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    {social.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">{social.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-black text-white py-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Harmo. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
