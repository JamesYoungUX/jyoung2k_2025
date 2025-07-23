import { useState, useEffect, useRef } from "react";
import NavIndicator from "./components/NavIndicator";
import HamburgerMenu from "./components/HamburgerMenu";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudiesPage from "./pages/CaseStudies/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetail/CaseStudyDetailPage";
import ResumePage from "./pages/ResumePage";
import ProcessesPage from "./pages/ProcessesPage";
import ScrollToTop from "./components/ScrollToTop";
import { CaseStudySeeder } from "./utils/caseStudySeeder";

/**
 * Navigation bar that implements a parallax effect.
 * It pins to the top of the viewport after scrolling past the hero section
 * on routes where parallax is enabled ("/" or "/parallax").
 */
function NavParallax() {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  const isParallaxRoute = location.pathname === "/";

  useEffect(() => {
    if (!isParallaxRoute) {
      setIsPinned(true);
      return;
    }

    const handleScroll = () => {
      if (!navRef.current) return;
      const heroHeight = window.innerHeight;
      setIsPinned(window.scrollY >= heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isParallaxRoute]);

  const navLinks = [
    { to: "/case-studies", label: "Case Studies" },
    { to: "/processes", label: "Process" },
    { to: "/resume", label: "Resume" },
  ];

  const navClasses = isParallaxRoute
    ? `w-full z-50 ${isPinned ? "fixed top-0 left-0 bg-cyan-300" : "absolute left-0 bottom-0 bg-cyan-300"}`
    : "w-full z-50 fixed top-0 left-0 bg-cyan-300";

  return (
    <nav
      ref={navRef}
      className={navClasses}
    >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative h-16">
          <div className="flex items-center h-full">
            <Link
              to="/"
              className={`font-heading font-medium tracking-tight text-black hover:text-opacity-80 transition-colors text-base md:text-lg flex items-center h-full px-2`}
              style={{position: 'relative', display: 'flex', alignItems: 'center', height: '100%'}}>
              JYOUNG2K
            </Link>
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8 h-full">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-opacity-80 transition-colors text-black text-base md:text-lg flex items-center h-full px-2`}
                style={{position: 'relative', display: 'flex', alignItems: 'center', height: '100%'}}>
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/jyoung2k/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-opacity-80 transition-colors text-black flex items-center text-base md:text-lg h-full px-2">
              LinkedIn <span className="ml-2">→</span>
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <HamburgerMenu navLinks={navLinks} />
          
          {/* Active page underline indicator at bottom - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0">
            <NavIndicator location={location} />
          </div>
        </div>
    </nav>
  );
}

/**
 * Layout component used as the shell for pages.
 * Contains background color, navigation, and page routing outlet.
 */
const Layout = () => (
  <div className="min-h-screen bg-[#23263a] text-white">
    <NavParallax />
    <main>
      <Outlet />
    </main>
  </div>
);

/**
 * Main App component.
 * Sets up Router, layout, and root-level routes.
 */
function App() {
  // On mount, set scroll restoration to manual and scroll to top.
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Make CaseStudySeeder available globally for development
  useEffect(() => {
    if (import.meta.env.DEV) {
      (window as any).seedCaseStudies = async () => {
        try {
          const ids = await CaseStudySeeder.seedAll();
          console.log('Successfully seeded case studies:', ids);
          return ids;
        } catch (error) {
          console.error('Failed to seed case studies:', error);
          throw error;
        }
      };
      
      (window as any).seedBravadoHealth = async () => {
        try {
          const id = await CaseStudySeeder.seedBravadoHealth();
          console.log('Successfully seeded Bravado Health case study:', id);
          return id;
        } catch (error) {
          console.error('Failed to seed Bravado Health case study:', error);
          throw error;
        }
      };
    }
  }, []);

  return (
    <Router>
      {/* Handles manual scroll restoration on route change */}
      <ScrollToTop />
      <Routes>
        {/* Layout wraps all routes */}
        <Route element={<Layout />}>
          {/* Index route ("/") renders the HomePage */}
          <Route index element={<HomePage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-study/:id" element={<CaseStudyDetailPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="processes" element={<ProcessesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
