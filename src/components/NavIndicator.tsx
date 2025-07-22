import React, { useEffect, useRef, useState } from "react";
import type { Location } from "react-router-dom";

interface NavIndicatorProps {
  location: Location;
}

const NavIndicator: React.FC<NavIndicatorProps> = ({ location }) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const navBar = indicatorRef.current?.parentElement;
    if (!navBar) return;
    
    const anchors = navBar.querySelectorAll("a[href]");
    let activeAnchor: Element | null = null;
    
    anchors.forEach(anchor => {
      if (anchor.getAttribute("href") === location.pathname) {
        activeAnchor = anchor;
      }
    });
    
    if (!activeAnchor && location.pathname === "/") {
      anchors.forEach(anchor => {
        if (anchor.getAttribute("href") === "/") {
          activeAnchor = anchor;
        }
      });
    }
    
    if (activeAnchor) {
      const rect = (activeAnchor as any).getBoundingClientRect();
      const navRect = navBar.getBoundingClientRect();
      setStyle({
        left: rect.left - navRect.left,
        width: rect.width,
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
