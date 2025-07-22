import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

/**
 * Navigation bar that implements a parallax effect.
 * It pins to the top of the viewport after scrolling past the hero section
 * on routes where parallax is enabled ("/" or "/parallax").
 */
function NavParallax() {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  // Determine if the route should have the parallax nav effect.
  const isParallaxRoute =
    location.pathname === "/parallax" || location.pathname === "/";

  useEffect(() => {
    if (!isParallaxRoute) return;

    /**
     * Handles scroll event and pins/unpins nav based on scroll position
     */
    const handleScroll = () => {
      if (!navRef.current) return;
      const heroHeight = window.innerHeight; // Height of hero section
      setIsPinned(window.scrollY >= heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial pin status on mount

    // Clean up event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isParallaxRoute]);

  // The primary navigation links
  const navContent = (
    <div className="flex space-x-6 text-lg">
      <Link
        to="/"
        className="font-heading font-medium tracking-tight text-black hover:text-opacity-80 transition-colors"
      >
        JYOUNG2K
      </Link>
      <Link
        to="/parallax"
        className="hover:underline text-black hover:text-opacity-80 transition-colors"
      >
        Parallax
      </Link>
    </div>
  );

  // CSS classes for nav positioning and effect
  const navClasses = isParallaxRoute
    ? `w-full z-50 ${isPinned ? "fixed top-0 left-0" : "absolute left-0 bottom-0"} ${
        location.pathname === "/" ? "border-b-2 border-black" : ""
      }`
    : "w-full";

  return (
    <div
      ref={navRef}
      className={navClasses}
      style={{
        background: "rgb(58, 255, 253)", // Vibrant background color
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)", // Smooth transition for pin/unpin
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {navContent}
      </div>
    </div>
  );
}

/**
 * Layout component used as the shell for pages.
 * Contains background color, navigation, and page routing outlet.
 */
const Layout = () => (
  <div className="min-h-screen bg-gray-50">
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

  return (
    <Router>
      {/* Handles manual scroll restoration on route change */}
      <ScrollToTop />
      <Routes>
        {/* Layout wraps all routes */}
        <Route element={<Layout />}>
          {/* Index route ("/") renders the HomePage */}
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
