import React, { useEffect, useRef, useState } from "react";

interface NavIndicatorProps {
  location: any;
  navLinks: { to: string; label: string }[];
}

const NavIndicator: React.FC<NavIndicatorProps> = ({ location, navLinks }) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    // Find all nav link elements
    const navBar = indicatorRef.current?.parentElement;
    if (!navBar) return;
    // Get all anchor tags in the nav bar
    const anchors = navBar.querySelectorAll("a[href]");
    let activeAnchor: HTMLAnchorElement | null = null;
    anchors.forEach(anchor => {
      if (anchor.getAttribute("href") === location.pathname) {
        activeAnchor = anchor as HTMLAnchorElement;
      }
    });
    // Special case for home link
    if (!activeAnchor && location.pathname === "/") {
      anchors.forEach(anchor => {
        if (anchor.getAttribute("href") === "/") {
          activeAnchor = anchor as HTMLAnchorElement;
        }
      });
    }
    if (activeAnchor) {
      setStyle({
        left: activeAnchor.offsetLeft,
        width: activeAnchor.offsetWidth,
        opacity: 1,
      });
    } else {
      setStyle({ left: 0, width: 0, opacity: 0 });
    }
  }, [location.pathname]);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-0 h-1 bg-black rounded transition-all duration-300 ease-in-out"
      style={{
        left: style.left,
        width: style.width,
        opacity: style.opacity,
        pointerEvents: "none",
      }}
    />
  );
};

export default NavIndicator;
