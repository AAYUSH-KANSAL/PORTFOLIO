import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import './style.css';

// Lazy load the Spline runtime to optimize bundle size
const Spline = lazy(() => import('@splinetool/react-spline'));

// --- Custom Spline 3D Scene Component with Loader ---
function SplineScene({ scene }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="spline-wrapper">
      <div className="spline-glow"></div>
      {!isLoaded && (
        <div className="spline-loader">
          <div className="spline-spinner"></div>
          <span className="spline-loader-text">Loading 3D Scene</span>
        </div>
      )}
      <Suspense fallback={null}>
        <Spline
          scene={scene}
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
            display: 'block',
          }}
        />
      </Suspense>
    </div>
  );
}

// --- Circular Progress Component for About section stats ---
function CircularProgress({ percent, label, isVisible }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(percent);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isVisible, percent]);

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="about-stat-circle-box">
      <div className="circle-svg-wrapper">
        <svg className="circle-svg" width="80" height="80" viewBox="0 0 80 80">
          <circle className="circle-bg" cx="40" cy="40" r={radius} />
          <circle
            className="circle-progress"
            cx="40"
            cy="40"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="circle-text-pct">{progress}%</span>
      </div>
      <span className="about-stat-lbl">{label}</span>
    </div>
  );
}

// --- Service Card with Cursor-tracking Radial Glow ---
function ServiceCard({ icon, title, description, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className="service-card reveal-zoom"
      onMouseMove={handleMouseMove}
      style={{
        transitionDelay: `${index * 0.12}s`
      }}
    >
      <div className="service-glow" />
      <div className="service-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

// --- Lazy Section Loading Wrapper Component ---
function LazySection({ children }) {
  return <>{children}</>;
}

// --- Projects Data System ---
const projectsData = [
  {
    id: 'ai-mock-interviewer',
    title: 'AI Mock Interviewer',
    isFeatured: true,
    description: 'An AI-powered interview preparation platform that simulates real interview experiences, generates intelligent questions, evaluates responses, and helps users improve communication and technical interview skills.',
    techStack: ['Next.js', 'React', 'Groq', 'Supabase', 'Tailwind CSS', 'TypeScript'],
    liveDemo: 'https://ai-interview-coach-nine-ebon.vercel.app/',
    github: 'https://github.com/AAYUSH-KANSAL/ai-interview-coach',
    features: [
      'AI-generated interview questions',
      'Real-time interview simulation',
      'Performance evaluation',
      'Communication skill improvement',
      'User-friendly dashboard'
    ],
    accent: '#8b5cf6',
    brand: 'INTERVIEW',
    subBrand: 'AI.MOCK'
  },
  {
    id: 'pooriwala',
    title: 'Pooriwala',
    isFeatured: false,
    description: 'A full-stack food ordering mobile application developed for restaurant and food delivery operations with authentication, menu management, and order processing functionality.',
    techStack: ['React Native', 'Expo', 'Supabase', 'JavaScript'],
    liveDemo: 'https://expo.dev/accounts/sigma1234567880/projects/pooriwala',
    github: 'https://github.com/AAYUSH-KANSAL/POORIWALA',
    features: [
      'Food ordering system',
      'User authentication',
      'Menu management',
      'Order tracking',
      'Mobile-first experience'
    ],
    accent: '#f59e0b',
    brand: 'POORIWALA',
    subBrand: 'DELIVERY'
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    isFeatured: false,
    description: 'A premium, interactive digital portfolio showcasing personal projects, interactive 3D assets, and custom design tokens built with hardware-accelerated animations.',
    techStack: ['React', 'Spline 3D', 'CSS3', 'Vite'],
    liveDemo: 'https://portfolio-woad-six-76.vercel.app/',
    github: 'https://github.com/AAYUSH-KANSAL/PORTFOLIO',
    features: [
      'Interactive 3D Spline robot character',
      'High-performance scroll-driven animations',
      'Custom glassmorphism UI card layouts',
      'High-end 12-point cursor trail tracking'
    ],
    accent: '#3b82f6',
    brand: 'PORTFOLIO',
    subBrand: 'PERSONAL'
  },
  {
    id: 'clinic-os',
    title: 'Clinic OS',
    isFeatured: true,
    description: 'A complete clinic management system designed to streamline healthcare operations including patient management, appointments, records, and administrative workflows.',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Supabase'],
    liveDemo: 'https://clinic-os-five.vercel.app/',
    github: 'https://github.com/AAYUSH-KANSAL/clinic-os',
    features: [
      'Patient management',
      'Appointment scheduling',
      'Medical records handling',
      'Administrative dashboard',
      'Responsive healthcare platform'
    ],
    accent: '#06b6d4',
    brand: 'CLINIC',
    subBrand: 'SYSTEM'
  },
  {
    id: 'insightify',
    title: 'Insightify',
    isFeatured: false,
    description: 'A data visualization platform that transforms CSV datasets into meaningful charts, graphs, and actionable business insights through an intuitive interface.',
    techStack: ['Python', 'Streamlit', 'Pandas', 'Matplotlib'],
    liveDemo: 'https://csvdatavisualization.streamlit.app/',
    github: 'https://github.com/AAYUSH-KANSAL/data_visualization',
    features: [
      'CSV upload support',
      'Interactive visualizations',
      'Automated insights',
      'Business analytics',
      'User-friendly dashboard'
    ],
    accent: '#10b981',
    brand: 'INSIGHTIFY',
    subBrand: 'DATA'
  },
  {
    id: 'resuparse-ai',
    title: 'ResuParse AI',
    isFeatured: false,
    description: 'An AI-powered resume parsing and analysis tool that extracts candidate information, analyzes resumes, and provides structured insights for recruitment workflows.',
    techStack: ['Python', 'Streamlit', 'LangChain', 'Groq', 'RAG'],
    liveDemo: 'https://resuparse.streamlit.app/',
    github: 'https://github.com/AAYUSH-KANSAL/RESUPARSE-AI',
    features: [
      'Resume parsing',
      'Information extraction',
      'AI-powered analysis',
      'Structured candidate insights',
      'Recruitment workflow optimization'
    ],
    accent: '#ec4899',
    brand: 'RESUME PARSER',
    subBrand: 'AI.PARSER'
  }
];

// --- Project Stats Counter Component ---
function ProjectStatsCounter({ target, label, prefix = '', suffix = '', isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);
    let timer;

    const run = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
      } else {
        setCount(Math.floor(start));
        timer = requestAnimationFrame(run);
      }
    };

    run();
    return () => cancelAnimationFrame(timer);
  }, [target, isVisible]);

  return (
    <div className="projects-stat-pill">
      <span className="stat-number">{prefix}{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// --- Custom Project Card Component ---
function ProjectCard({ project, isVisible, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`portfolio-project-card ${project.isFeatured ? 'featured' : ''} ${isVisible ? 'revealed' : ''}`}
      style={{
        '--project-accent': project.accent,
        transitionDelay: isVisible ? `${index * 0.15}s` : '0s'
      }}
    >
      <div className="portfolio-project-glow" />
      <div className="portfolio-project-visual">
        <div className="project-grid-overlay" />
        <div className="project-glow-orb orb-1" />
        <div className="project-glow-orb orb-2" />
        
        <div className="portfolio-project-hud">
          <div className="hud-header">
            <div className="hud-dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <span className="hud-brand">{project.subBrand}</span>
          </div>
          <div className="hud-center">
            <div className="hud-scanline" />
            <h3 className="hud-title">{project.brand}</h3>
            <div className="hud-status-bar">
              <span className="pulse-indicator" />
              <span className="status-text">SYSTEM ACTIVE</span>
            </div>
          </div>
          <div className="hud-footer">
            <span className="hud-coord">LOC: [45.10.98.02]</span>
            <span className="hud-ver">v1.4.0</span>
          </div>
        </div>

        {project.isFeatured && (
          <span className="featured-project-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Featured
          </span>
        )}
      </div>

      <div className="portfolio-project-info">
        <div className="portfolio-project-tags">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="portfolio-project-tag">{tech}</span>
          ))}
        </div>

        <h3 className="portfolio-project-title">{project.title}</h3>
        <p className="portfolio-project-desc">{project.description}</p>

        <div className="portfolio-project-features">
          <h4>Key Features:</h4>
          <ul>
            {project.features.map((feature, idx) => (
              <li key={idx}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="portfolio-project-actions">
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action live-demo"
            >
              <span>Live Demo</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ) : (
            <span className="btn-action live-demo disabled">
              <span>Demo Coming Soon</span>
            </span>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action github-repo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          ) : (
            <span className="btn-action github-repo disabled">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Repo Pending</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  // About Section Ref, Visibility & Tilt State
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const [activeTab, setActiveTab] = useState('web');

  // Projects Section Ref & Visibility State
  const projectsSecRef = useRef(null);
  const [projectsVisible, setProjectsVisible] = useState(false);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = -(y / (box.height / 2)) * 10;
    const rotateY = (x / (box.width / 2)) * 10;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.05s ease-out'
    });
  };

  const handleCardMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === aboutRef.current) {
              setAboutVisible(true);
            }
            if (entry.target === projectsSecRef.current) {
              setProjectsVisible(true);
            }
            if (
              entry.target.classList.contains('reveal') ||
              entry.target.classList.contains('reveal-zoom') ||
              entry.target.classList.contains('reveal-slide-left') ||
              entry.target.classList.contains('reveal-slide-right') ||
              entry.target.classList.contains('reveal-fade')
            ) {
              entry.target.classList.add('active');
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (projectsSecRef.current) {
      observer.observe(projectsSecRef.current);
    }

    // Select and observe all reveal elements
    const revealEls = document.querySelectorAll(
      '.reveal, .reveal-zoom, .reveal-slide-left, .reveal-slide-right, .reveal-fade'
    );
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skillsData = {
    web: [
      { name: 'React / Next.js', level: 98 },
      { name: 'Cursor', level: 95 },
      { name: 'CodeX', level: 90 },
      { name: 'Antigravity', level: 97 },
      { name: 'Supabase MCPs', level: 92 },
      { name: 'Stitch UI Design', level: 94 }
    ],
    app: [
      { name: 'React Native', level: 94 },
      { name: 'Expo Router', level: 90 },
      { name: 'Flutter / Dart', level: 80 },
      { name: 'Mobile UX Architecture', level: 92 },
      { name: 'Native Bridges', level: 75 },
      { name: 'Push Notification Systems', level: 85 }
    ],
    uiux: [
      { name: 'Figma UI Design', level: 96 },
      { name: 'Design Systems (Tokens/Themes)', level: 94 },
      { name: 'Wireframing & Mapping', level: 90 },
      { name: 'High-Fidelity Prototyping', level: 95 },
      { name: 'Interaction Design', level: 92 },
      { name: 'Visual Branding', level: 88 }
    ],
    ai: [
      { name: 'LLM API Integrations (Gemini/OpenAI)', level: 95 },
      { name: 'Vector DBs (Supabase pgvector)', level: 88 },
      { name: 'Prompt Engineering', level: 98 },
      { name: 'LangChain & Agent Workflows', level: 85 },
      { name: 'AI Coding Copilots & DevTools', level: 96 },
      { name: 'Retrieval Augmented Gen (RAG)', level: 87 }
    ]
  };

  // Glow Ref (Direct DOM manipulation for performance to avoid component re-renders)
  const glowRef = useRef(null);
  
  // Cursor Trail Refs
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const coordsRef = useRef(Array(12).fill({ x: 0, y: 0 }));

  // Sliding Nav Indicator Refs
  const indicatorRef = useRef(null);
  const navLinksRef = useRef([]);

  // State for Particles
  const [particles, setParticles] = useState([]);

  // State for Navigation / Scroll effects
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Stats Counter Refs & State
  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    satisfaction: 0,
  });

  // Contact Form State
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      syncTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Keep active section and navbar scroll state synced with Lenis scroll events
    lenis.on('scroll', (e) => {
      document.documentElement.style.setProperty('--scroll-y', `${e.scroll}px`);
      setIsScrolled(e.scroll > 50);

      const sections = ['hero', 'about', 'work', 'contact'];
      let current = 'hero';
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && e.scroll >= section.offsetTop - 150) {
          current = id;
        }
      }
      setActiveSection(current);
    });

    // Save lenis instance globally for smooth scrolling on link click
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Sliding Indicator Positioning Logic
  const updateIndicator = (element) => {
    if (indicatorRef.current && element) {
      indicatorRef.current.style.width = `${element.offsetWidth}px`;
      indicatorRef.current.style.left = `${element.offsetLeft}px`;
      indicatorRef.current.style.opacity = '1';
    }
  };

  const hideIndicator = () => {
    const activeEl = navLinksRef.current.find(
      (el) => el && el.getAttribute('data-section') === activeSection
    );
    if (activeEl) {
      updateIndicator(activeEl);
    } else {
      if (indicatorRef.current) indicatorRef.current.style.opacity = '0';
    }
  };

  // Sync indicator with active section changes (e.g. on scroll or click)
  useEffect(() => {
    const activeEl = navLinksRef.current.find(
      (el) => el && el.getAttribute('data-section') === activeSection
    );
    if (activeEl) {
      updateIndicator(activeEl);
    }
  }, [activeSection]);

  // Handle High-Performance Cursor Glow & 12-point Trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0.4';
      dotsRef.current.forEach(dot => {
        if (dot) dot.style.opacity = '1';
      });
    };

    const handleMouseLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
      dotsRef.current.forEach(dot => {
        if (dot) dot.style.opacity = '0';
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // 60FPS animation loop for trail physics
    let animationFrameId;
    const animateCursor = () => {
      // 1. Update glow position
      if (glowRef.current) {
        glowRef.current.style.left = `${mouseRef.current.x}px`;
        glowRef.current.style.top = `${mouseRef.current.y}px`;
      }

      // 2. Update 12-point trail physics
      const coords = [...coordsRef.current];
      
      // First point directly follows mouse
      coords[0] = { x: mouseRef.current.x, y: mouseRef.current.y };

      // Remaining points interpolate with elastic lag
      for (let i = 1; i < coords.length; i++) {
        const prev = coords[i - 1];
        const curr = coords[i];
        coords[i] = {
          x: curr.x + (prev.x - curr.x) * 0.35, // lag speed factor
          y: curr.y + (prev.y - curr.y) * 0.35
        };
      }

      coordsRef.current = coords;

      // Apply coordinates to elements via Ref
      dotsRef.current.forEach((dot, i) => {
        if (dot) {
          const x = coords[i].x;
          const y = coords[i].y;
          const scale = 1 - (i / 12);
          dot.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }
      });

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Generate Floating Particles
  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 3,
    }));
    setParticles(generated);
  }, []);

  // Stats Animation on Scroll Viewport Intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const targets = { experience: 1, projects: 25, clients: 15, satisfaction: 99 };
          const duration = 2000;
          const start = performance.now();

          const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4); // Quartic ease-out

            setAnimatedStats({
              experience: Math.floor(targets.experience * ease),
              projects: Math.floor(targets.projects * ease),
              clients: Math.floor(targets.clients * ease),
              satisfaction: Math.floor(targets.satisfaction * ease),
            });

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };
          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Smooth Scroll Helper via Lenis
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (window.lenis) {
      const target = document.getElementById(id);
      if (target) {
        window.lenis.scrollTo(target, { offset: -80 });
      }
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Form Submit Handler — Web3Forms Integration
  const [formSending, setFormSending] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '2129a21f-961c-424b-bce0-15f9015eaad1',
          from_name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          subject: `Portfolio Message from ${formState.firstName} ${formState.lastName}`,
          message: formState.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormState({ firstName: '', lastName: '', email: '', message: '' });
          setFormSubmitted(false);
        }, 4000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    } finally {
      setFormSending(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Cursor Glow */}
      <div ref={glowRef} className="cursor-glow" />

      {/* 12-point Cursor Trail */}
      <div className="cursor-trail">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="trail-dot"
          />
        ))}
      </div>


      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="nav-logo" onClick={(e) => scrollToSection(e, 'hero')}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">Aayush</span>
            <span className="logo-bracket">/&gt;</span>
          </a>
          
          <div className="nav-links-wrapper">
            <div ref={indicatorRef} className="nav-indicator" />
            <ul className="nav-links" onMouseLeave={hideIndicator}>
              <li>
                <a
                  href="#hero"
                  ref={(el) => (navLinksRef.current[0] = el)}
                  data-section="hero"
                  className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                  onMouseEnter={(e) => updateIndicator(e.target)}
                  onClick={(e) => scrollToSection(e, 'hero')}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  ref={(el) => (navLinksRef.current[1] = el)}
                  data-section="about"
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onMouseEnter={(e) => updateIndicator(e.target)}
                  onClick={(e) => scrollToSection(e, 'about')}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  ref={(el) => (navLinksRef.current[2] = el)}
                  data-section="work"
                  className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}
                  onMouseEnter={(e) => updateIndicator(e.target)}
                  onClick={(e) => scrollToSection(e, 'work')}
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  ref={(el) => (navLinksRef.current[3] = el)}
                  data-section="contact"
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onMouseEnter={(e) => updateIndicator(e.target)}
                  onClick={(e) => scrollToSection(e, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="nav-actions">
            <a href="#contact" className="nav-cta" onClick={(e) => scrollToSection(e, 'contact')}>
              Let's Talk
            </a>
            <button
              className={`nav-menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li className="mobile-nav-item">
            <a href="#hero" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'hero')}>
              Home
            </a>
          </li>
          <li className="mobile-nav-item">
            <a href="#about" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'about')}>
              About
            </a>
          </li>
          <li className="mobile-nav-item">
            <a href="#work" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'work')}>
              Work
            </a>
          </li>
          <li className="mobile-nav-item">
            <a href="#contact" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'contact')}>
              Contact
            </a>
          </li>
        </ul>
      </div>

      <section className="hero" id="hero">
        <div className="hero-grid-bg"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="particles">
          {particles.map((p) => (
            <div
              key={`hero-p-${p.id}`}
              className="particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>

        <div className="hero-container">
          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Available for freelance work</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line title-line-1">
                <span className="title-word">I craft</span>
              </span>
              <span className="title-line title-line-2">
                <span className="title-word title-gradient">digital</span>
              </span>
              <span className="title-line title-line-3">
                <span className="title-word">experiences</span>
                <span className="title-cursor">_</span>
              </span>
            </h1>

            <p className="hero-description">
              Creative developer blending <strong>design</strong> and <strong>technology</strong> to build immersive web experiences that captivate users and drive results.
            </p>

            <div className="hero-cta-group">
              <a href="#work" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'work')}>
                <span>View My Work</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
              <a href="#contact" className="btn btn-secondary" onClick={(e) => scrollToSection(e, 'contact')}>
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Tech Stack */}
            <div className="hero-tech">
              <span className="tech-label">Tech Stack</span>
              <div className="tech-icons">
                <div className="tech-icon" data-tooltip="React">
                  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="#61dafb" strokeWidth="1">
                    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                    <g stroke="#61dafb">
                      <ellipse rx="11" ry="4.2"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                  </svg>
                </div>
                <div className="tech-icon" data-tooltip="Next.js">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 16L9.3 7.8C9.1 7.5 8.7 7.7 8.7 8V16" strokeLinecap="round"/>
                    <path d="M15.3 8V13.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="tech-icon" data-tooltip="TypeScript">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect width="24" height="24" rx="4" fill="#3178c6"/>
                    <path d="M6 8h6v2.5H9.5V17H6.5v-6.5H6V8zm7.5 4.5c0-.85.65-1.2 1.4-1.2.7 0 1.1.25 1.3.5l1-1c-.55-.6-1.35-.9-2.3-.9-1.95 0-3 1.25-3 2.8 0 1.85 1.15 2.45 2.5 3l.4.15c.9.35 1.45.6 1.45 1.25 0 .6-.5.95-1.15.95-.8 0-1.35-.4-1.65-.85l-.9.9c.65.85 1.65 1.25 2.65 1.25 2.1 0 3.25-1.15 3.25-2.85 0-1.8-1.2-2.35-2.6-2.95l-.4-.15c-.9-.35-1.3-.55-1.3-1.15z" fill="white"/>
                  </svg>
                </div>
                <div className="tech-icon" data-tooltip="Supabase">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.167 11.25H12.75v-9a.9.9 0 00-1.554-.619L2.571 9.756a.9.9 0 00.619 1.549h6.417v9a.9.9 0 001.554.619l8.625-8.125a.901.901 0 00-.619-1.549z" fill="#3ECF8E" />
                  </svg>
                </div>
                <div className="tech-icon" data-tooltip="Antigravity">
                  <svg viewBox="0 0 100 100" fill="none">
                    <path d="M15 82c-4-1-6.5-5.5-4-9 6-9 14-23 21.5-37C39.5 23 45.5 12.5 50 15.5c4.5-3 10.5 7.5 17.5 20.5 7.5 14 15.5 28 21.5 37 2.5 3.5 0 8-4 9-3 1-6.5-1.5-10.5-6.5S61.5 54 50 52.5c-11.5 1.5-21 11-25 18S19 83 15 82z" fill="url(#antigravityLogoGradient)" />
                    <defs>
                      <linearGradient id="antigravityLogoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="25%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="75%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="tech-icon" data-tooltip="Stitch UI">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 1 4 4c0 3-4 5-4 8v8" stroke="url(#stitchGradient)" />
                    <circle cx="12" cy="6" r="2.5" fill="currentColor" />
                    <circle cx="12" cy="18" r="2.5" fill="currentColor" />
                    <defs>
                      <linearGradient id="stitchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content — Spline 3D */}
          <div className="hero-visual">
            <SplineScene scene="https://prod.spline.design/FhAwJs2nFumZp1pV/scene.splinecode" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll</span>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats" id="heroStats" ref={statsRef}>
          <div className="stat-item">
            <span className="stat-number">{animatedStats.experience}</span>
            <span className="stat-suffix">+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{animatedStats.projects}</span>
            <span className="stat-suffix">+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{animatedStats.clients}</span>
            <span className="stat-suffix">+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{animatedStats.satisfaction}</span>
            <span className="stat-suffix">%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section">
        {/* Row 1: Scrolls Left */}
        <div className="marquee-track row-left">
          <div className="marquee-content">
            {Array.from({ length: 2 }).map((_, idx) => (
              <React.Fragment key={idx}>
                <span className="marquee-pill">✨ Web Development</span>
                <span className="marquee-pill">🎨 UI/UX Design</span>
                <span className="marquee-pill">🚀 3D Experiences</span>
                <span className="marquee-pill">⚡ Creative Coding</span>
                <span className="marquee-pill">💎 Brand Identity</span>
                <span className="marquee-pill">🎬 Motion Design</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="marquee-track row-right">
          <div className="marquee-content">
            {Array.from({ length: 2 }).map((_, idx) => (
              <React.Fragment key={idx}>
                <span className="marquee-pill">💻 Frontend Architect</span>
                <span className="marquee-pill">🔮 WebGL Interfaces</span>
                <span className="marquee-pill">📱 Responsive Apps</span>
                <span className="marquee-pill">🤖 AI Integrations</span>
                <span className="marquee-pill">📈 High Performance</span>
                <span className="marquee-pill">🛠️ Next-Gen Tech</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about" ref={aboutRef}>
        {/* Futuristic Background Continuation */}
        <div className="about-grid-bg"></div>
        <div className="about-glow-accent-1"></div>
        <div className="about-glow-accent-2"></div>
        <div className="particles">
          {particles.map((p) => (
            <div
              key={`about-p-${p.id}`}
              className="particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>
        
        <LazySection height="600px">
          {/* Floating tech nodes/particles */}
          <div className="about-ambient-particles">
            <div className="about-particle part-1"></div>
            <div className="about-particle part-2"></div>
            <div className="about-particle part-3"></div>
            <div className="about-particle part-4"></div>
          </div>

          <div className="section-header reveal" style={{ position: 'relative', zIndex: 3 }}>
            <span className="section-badge">01 // About Me</span>
            <h2 className="section-title">Designing with purpose,<br />coding with precision.</h2>
          </div>

          <div className="about-container">
            {/* Left Visual Card */}
            <div
              className="about-visual reveal-slide-left"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={tiltStyle}
            >
              <div className="about-card">
                <div className="about-avatar-container">
                  <div className="about-avatar-wrapper">
                    <div className="about-avatar">A</div>
                    <div className="avatar-ring ring-1"></div>
                    <div className="avatar-ring ring-2"></div>
                    <div className="avatar-dot dot-1"></div>
                    <div className="avatar-dot dot-2"></div>
                  </div>
                  <div className="about-meta">
                    <h3>Aayush</h3>
                    <p>Creative Web Developer</p>
                  </div>
                </div>

                <div className="about-stats-grid">
                  <CircularProgress
                    percent={95}
                    label="UX/UI Design"
                    isVisible={aboutVisible}
                  />
                  <CircularProgress
                    percent={98}
                    label="Development"
                    isVisible={aboutVisible}
                  />
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="about-text reveal-slide-right">
              <p className="aboutBio">
                I am a developer who believes that beautiful designs deserve exceptional code. I specialize in bridging the gap between design systems and complex interactive layouts. By blending WebGL, Spline, and custom React architectures, I bring flat pixels into responsive, three-dimensional reality.
              </p>

              {/* Skills Matrix Tabs */}
              <div className="about-skills-tabs">
                <div className="tabs-header">
                  <button
                    className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`}
                    onClick={() => setActiveTab('web')}
                  >
                    Web Dev
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'app' ? 'active' : ''}`}
                    onClick={() => setActiveTab('app')}
                  >
                    App Dev
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'uiux' ? 'active' : ''}`}
                    onClick={() => setActiveTab('uiux')}
                  >
                    UI/UX Design
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ai')}
                  >
                    AI Tools
                  </button>
                </div>

                <div className="tab-content-grid">
                  {skillsData[activeTab].map((skill, idx) => (
                    <div key={idx} className="skill-pill">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-pct">{skill.level}%</span>
                      </div>
                      <div className="skill-progress-bar-bg">
                        <div
                          className="skill-progress-bar-fill"
                          style={{ width: aboutVisible ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Zone 2: Core Philosophy Asymmetrical Card Grid */}
          <div className="about-pillars-header reveal">
            <span className="about-pillars-subtitle">Philosophy & Pillars</span>
            <h3 className="about-pillars-title">The principles that power our execution</h3>
          </div>

          <div className="about-philosophy-grid">
            {/* Card 1: Who We Are */}
            <div className="philosophy-card span-2 reveal-zoom" style={{ transitionDelay: '0.1s' }}>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-light)' }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Who We Are
              </h3>
              <p>
                We are a collective of forward-thinking designers, code architects, and creative technologists. We reject traditional constraints to engineer digital systems that command attention and scale effortlessly.
              </p>
            </div>

            {/* Card 2: Our Mission */}
            <div className="philosophy-card span-2 reveal-zoom" style={{ transitionDelay: '0.2s' }}>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ec4899' }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
                Our Mission
              </h3>
              <p>
                To merge advanced interactive science-fiction aesthetics with production-ready software engineering. We turn flat interfaces into responsive, three-dimensional digital environments.
              </p>
            </div>

            {/* Card 3: What We Do */}
            <div className="philosophy-card span-2 reveal-zoom" style={{ transitionDelay: '0.3s' }}>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#06b6d4' }}>
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 17 22 12"></polyline>
                </svg>
                What We Do
              </h3>
              <p>
                We craft high-performance web systems, reactive cross-platform mobile apps, bespoke design tokens, and next-generation AI agent automation workflows that streamline execution.
              </p>
            </div>

            {/* Card 4: Why Choose Us */}
            <div className="philosophy-card span-3 reveal-zoom" style={{ transitionDelay: '0.4s' }}>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f59e0b' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Why Choose Us
              </h3>
              <p>
                We design with pixel-perfection and deploy using light, hardware-accelerated codebases. By utilizing CSS properties over heavy JS runtimes, our sites load instantly and feel premium.
              </p>
            </div>

            {/* Card 5: Our Approach */}
            <div className="philosophy-card span-3 reveal-zoom" style={{ transitionDelay: '0.5s' }}>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10b981' }}>
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
                Our Approach
              </h3>
              <p>
                Rigor meets creativity. We map user journeys, iterate rapidly using custom UI components, integrate modern AI capabilities, and test thoroughly to ensure perfect performance across devices.
              </p>
            </div>
          </div>

          {/* Zone 3: Services Grid */}
          <div className="about-services-header reveal">
            <span className="about-pillars-subtitle">Core Capabilities</span>
            <h3 className="about-pillars-title">The tools and skillsets we deploy daily</h3>
          </div>

          <div className="about-container" style={{ marginTop: 0 }}>
            <div className="about-text" style={{ width: '100%', maxWidth: '100%', gridColumn: 'span 2' }}>
              <div className="services-grid">
                <ServiceCard
                  index={0}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 17 22 12"></polyline>
                    </svg>
                  }
                  title="3D Integrations"
                  description="Embedding high-fidelity 3D assets & micro-interactions with WebGL & Spline APIs."
                />

                <ServiceCard
                  index={1}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  }
                  title="Frontend Architecture"
                  description="Writing highly performant, modular React components using clean states and props."
                />

                <ServiceCard
                  index={2}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  }
                  title="UI/UX Strategy"
                  description="Wireframing and refining complex application flows to maximize visitor engagement."
                />

                <ServiceCard
                  index={3}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  }
                  title="Creative Coding"
                  description="Adding smooth animation timelines, hover logic, and user responsive layouts."
                />
              </div>
            </div>
          </div>
        </LazySection>
      </section>

      <section className="work" id="work" ref={projectsSecRef}>
        {/* Glow ambient background assets */}
        <div className="projects-ambient-glow-1"></div>
        <div className="projects-ambient-glow-2"></div>
        <div className="section-grid-bg"></div>
        <div className="particles">
          {particles.map((p) => (
            <div
              key={`work-p-${p.id}`}
              className="particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>
        <LazySection height="600px">
          <div className="section-header reveal">
            <span className="section-badge">02 // Selected Projects</span>
            <h2 className="section-title">Bringing concepts to life<br />through code.</h2>
            
            {/* Animated Project Stats Counters */}
            <div className="projects-stats-row">
              <ProjectStatsCounter target={5} label="Production Systems" isVisible={projectsVisible} />
              <ProjectStatsCounter target={2} label="Featured AI/SaaS Apps" isVisible={projectsVisible} />
              <ProjectStatsCounter target={450} label="GitHub Commits" suffix="+" isVisible={projectsVisible} />
              <ProjectStatsCounter target={100} label="Deployment Success" suffix="%" isVisible={projectsVisible} />
            </div>
          </div>

          <div className="portfolio-projects-grid">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isVisible={projectsVisible}
                index={index}
              />
            ))}
          </div>
        </LazySection>
      </section>

      <section className="contact" id="contact">
        {/* Decorative background elements */}
        <div className="contact-bg-orb contact-orb-1"></div>
        <div className="contact-bg-orb contact-orb-2"></div>
        <div className="contact-grid-lines"></div>
        <div className="particles">
          {particles.map((p) => (
            <div
              key={`contact-p-${p.id}`}
              className="particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>

        <LazySection height="500px">
          <div className="section-header reveal">
            <span className="section-badge">03 // Get In Touch</span>
            <h2 className="section-title">Let's create something<br />exceptional together.</h2>
            <p className="contact-subtitle">Have an exciting project or just want to chat? I'd love to hear from you.</p>
          </div>

          <div className="contact-container">
            {/* Left — Info cards */}
            <div className="contact-info">
              {/* Availability banner */}
              <div className="contact-availability-card reveal-slide-left">
                <div className="availability-pulse-ring">
                  <span className="availability-dot"></span>
                </div>
                <div className="availability-text">
                  <p className="availability-status">Available Now</p>
                  <p className="availability-detail">Open for freelance projects & collaborations</p>
                </div>
              </div>

              {/* Contact detail cards */}
              <div className="contact-details">
                <a href="mailto:ayush.kansal321@gmail.com" className="contact-card-item reveal-slide-left" style={{ transitionDelay: '0.1s' }}>
                  <div className="contact-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-card-text">
                    <p className="contact-card-label">Email Me</p>
                    <p className="contact-card-value">ayush.kansal321@gmail.com</p>
                  </div>
                  <div className="contact-card-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </div>
                </a>

                <a href="https://maps.google.com/?q=Hapur+Uttar+Pradesh" target="_blank" rel="noopener noreferrer" className="contact-card-item reveal-slide-left" style={{ transitionDelay: '0.2s' }}>
                  <div className="contact-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-card-text">
                    <p className="contact-card-label">Location</p>
                    <p className="contact-card-value">Hapur, Uttar Pradesh</p>
                  </div>
                  <div className="contact-card-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </div>
                </a>

                <a href="https://wa.me/918433055349?text=Hi%20Aayush!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project%20with%20you." target="_blank" rel="noopener noreferrer" className="contact-card-item reveal-slide-left" style={{ transitionDelay: '0.3s' }}>
                  <div className="contact-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <div className="contact-card-text">
                    <p className="contact-card-label">Chat on</p>
                    <p className="contact-card-value">WhatsApp</p>
                  </div>
                  <div className="contact-card-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div className="contact-socials reveal-slide-left" style={{ transitionDelay: '0.4s' }}>
                <p className="contact-socials-label">Find me on</p>
                <div className="social-links">
                  <a href="https://github.com/AAYUSH-KANSAL/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/aayush-kansal-85a173243/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://x.com/AyushKansal321" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X (Twitter)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    <span>X</span>
                  </a>
                  <a href="https://www.instagram.com/AAYUSHKANSAL08" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a href="https://wa.me/918433055349" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-form-wrapper reveal-slide-right">
              <div className="contact-form-glow"></div>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="contact-form-header">
                  <h3>Send a Message</h3>
                  <p>Fill out the form below and I'll get back to you within 24 hours.</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className={`contact-submit-btn ${formSubmitted ? 'submitted' : ''} ${formSending ? 'sending' : ''}`}
                  disabled={formSubmitted || formSending}
                >
                  <span className="btn-content">
                    {formSending ? (
                      <>
                        <span className="btn-spinner"></span>
                        Sending...
                      </>
                    ) : formSubmitted ? (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </>
                    )}
                  </span>
                  <span className="btn-shimmer"></span>
                </button>
              </form>
            </div>
          </div>
        </LazySection>
      </section>

      <footer className="footer">
        <div className="footer-glow-orb"></div>
        <div className="section-grid-bg"></div>
        <div className="particles">
          {particles.map((p) => (
            <div
              key={`footer-p-${p.id}`}
              className="particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>

        <div className="footer-container">
          {/* Top CTA Area */}
          <div className="footer-cta reveal">
            <h2 className="footer-cta-title">
              Let's build something <span className="footer-gradient-text">amazing</span> together.
            </h2>
            <a href="mailto:ayush.kansal321@gmail.com" className="footer-cta-btn">
              <span>ayush.kansal321@gmail.com</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>

          {/* Social Icons Row */}
          <div className="footer-socials reveal-zoom">
            <a href="https://github.com/AAYUSH-KANSAL/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/aayush-kansal-85a173243/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://x.com/AyushKansal321" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/AAYUSHKANSAL08" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://wa.me/918433055349?text=Hi%20Aayush!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project%20with%20you." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <a href="#" className="footer-logo" onClick={(e) => scrollToSection(e, 'hero')}>
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">Aayush</span>
              <span className="logo-bracket">/&gt;</span>
            </a>

            <div className="footer-nav">
              <a href="#hero" className="footer-link" onClick={(e) => scrollToSection(e, 'hero')}>Home</a>
              <a href="#about" className="footer-link" onClick={(e) => scrollToSection(e, 'about')}>About</a>
              <a href="#work" className="footer-link" onClick={(e) => scrollToSection(e, 'work')}>Work</a>
              <a href="#contact" className="footer-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
            </div>

            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Aayush Kansal. All rights reserved.
            </p>
          </div>

          {/* Back to top */}
          <button className="back-to-top" onClick={(e) => scrollToSection(e, 'hero')} aria-label="Back to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
        </div>
      </footer>
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
