import React, { useEffect, useRef, useState } from "react";
import type { Location } from "react-router-dom";

interface NavIndicatorProps {
  location: Location;
}

const NavIndicator: React.FC<NavIndicatorProps> = ({ location }) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    // Look for the entire navbar container, not just the parent
    const navBar = indicatorRef.current?.closest('nav');
    if (!navBar) {
      console.log("NavIndicator: No nav element found");
      return;
    }
    
    // Find the active link based on current location
    let activeLink: string | null = null;
    
    if (location.pathname === "/") {
      // For home page, look for the JYOUNG2K logo link
      activeLink = "/";
    } else if (location.pathname.startsWith("/case-studies")) {
      activeLink = "/case-studies";
    } else if (location.pathname.startsWith("/processes")) {
      activeLink = "/processes";
    } else if (location.pathname.startsWith("/resume")) {
      activeLink = "/resume";
    }
    
    // Find the corresponding anchor element
    const anchors = navBar.querySelectorAll("a[href]");
    let activeAnchor: Element | null = null;
    
    anchors.forEach(anchor => {
      const href = anchor.getAttribute("href");
      if (href === activeLink) {
        activeAnchor = anchor;
      }
    });
    
    // For home page, if we didn't find a link with href="/", look for the logo
    if (!activeAnchor && location.pathname === "/") {
      anchors.forEach(anchor => {
        const href = anchor.getAttribute("href");
        if (href === "/") {
          activeAnchor = anchor;
        }
      });
    }
    
    if (activeAnchor) {
      const rect = (activeAnchor as HTMLElement).getBoundingClientRect();
      
      // Find the indicator's parent container (the one with absolute bottom-0 left-0 right-0)
      const indicatorContainer = indicatorRef.current?.parentElement;
      if (!indicatorContainer) {
        console.log("NavIndicator: No parent container found");
        return;
      }
      
      const containerRect = indicatorContainer.getBoundingClientRect();
      
      // Calculate position relative to the indicator's parent container
      const left = rect.left - containerRect.left;
      const width = rect.width;
      
      console.log("Active anchor found:", (activeAnchor as HTMLElement).textContent);
      console.log("Anchor rect:", rect);
      console.log("Container rect:", containerRect);
      console.log("Calculated left:", left);
      console.log("Calculated width:", width);
      
      const newStyle = {
        left: left,
        width: width,
        opacity: 1,
      };
      console.log("NavIndicator: Setting style:", newStyle);
      setStyle(newStyle);
    } else {
      console.log("No active anchor found for pathname:", location.pathname);
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
        zIndex: 10,
      }}
    />
  );
};

export default NavIndicator;
