import React from "react";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#23263a' }}>
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center z-0 bg-[#23263a]"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      >
        {/* Main Content */}
        <div className="relative z-10 px-6 sm:px-8 lg:px-12 w-full max-w-5xl">
          <div className="text-center">
            <h1 className="font-heading text-white text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 sm:mb-6 leading-[0.85] sm:leading-[0.9]">
              James Young
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-justify mt-4 sm:mt-6 w-full max-w-4xl mx-auto sm:mx-0"
              style={{
                color: 'rgb(58, 255, 253)'
              }}
            >
              With two decades of hands-on expertise, I craft innovative solutions for healthcare, e-commerce, government, and startups. My work empowers organizations to tackle complex challenges and deliver standout digital experiences that make a real impact.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="relative w-full bg-[#23263a] py-20 px-4 -mt-32 sm:-mt-48 pt-96 sm:pt-112 z-20">
        <div className="max-w-7xl px-0 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left: Services heading */}
            <div className="flex flex-col items-start md:items-start md:justify-start pl-0">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-left">Specializations</h2>
            </div>
            {/* Right: Services content */}
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">From concept to reality</h3>
              <p className="text-base md:text-lg text-white mb-10 max-w-2xl">I craft seamless user experiences that solve unique business challenges. My expertise spans a wide range of specialties, allowing me to deliver thoughtful, effective solutions at every stage of the design process:</p>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">User Experience (UX) Design</h4>
                  <p className="text-[18px] text-white">I transform complex processes into intuitive, user-friendly experiences that engage and delight users. Through thoughtful research and design, I make each interaction clear, seamless, and rewarding.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">User Interface (UI) Design</h4>
                  <p className="text-[18px] text-white">I design visually appealing interfaces that capture your product's needs and reinforce user engagement, making every interaction intuitive and enjoyable while supporting seamless task completion.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">UX Optimization</h4>
                  <p className="text-[18px] text-white">I analyze and optimize existing digital products to improve usability, boost user engagement, and enhance overall satisfaction. By identifying friction points and implementing targeted design solutions, I ensure products are more intuitive, efficient, and enjoyable to use.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">Prototyping & Usability Testing</h4>
                  <p className="text-[18px] text-white">I use an iterative approach to rapidly prototype and test designs, allowing me to identify and resolve potential issues early in the process. This ensures a seamless transition from concept to development and results in solutions that are both effective and user-centered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Visual Accent Above Mission */}
      <div className="w-full bg-[#23263a] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-linear-to-r from-transparent via-lime-300 to-transparent opacity-60"></div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="w-full bg-[#23263a] py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left: Mission heading */}
          <div className="flex flex-col items-start">
            <h2 className="text-5xl md:text-6xl font-bold text-lime-300 text-left">Mission</h2>
          </div>
          {/* Center: Empowering statement and icon */}
          <div className="flex flex-col items-start relative">
            <div className="font-bold text-2xl md:text-3xl lg:text-4xl text-lime-300 text-left mb-4">
              Driving innovation<br />through meaningful design
            </div>
            <div className="relative flex items-center justify-center mt-2">
              <div className="absolute w-32 h-32 rounded-full bg-lime-300 opacity-20 blur-3xl z-0"></div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path d="M24 6C16.268 6 10 12.268 10 20c0 5.522 3.438 10.197 8.25 12.02V36a2 2 0 002 2h7.5a2 2 0 002-2v-3.98C34.562 30.197 38 25.522 38 20c0-7.732-6.268-14-14-14zm3.5 30h-7v-2h7v2zm-3.5-4c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11z" fill="#D9FF50"/>
                <rect x="20" y="40" width="8" height="4" rx="2" fill="#D9FF50"/>
              </svg>
            </div>
          </div>
          {/* Right: Mission body copy */}
          <div className="text-white text-lg md:text-xl text-left">
            My mission is to empower startups and growing businesses in healthcare with world-class UX design. I believe intuitive, accessible digital experiences can transform complex products, improve patient outcomes, and build lasting trust. By partnering closely with clients, I help turn bold healthcare ideas into impactful solutions that make a real difference.
          </div>
        </div>
      </section>

      {/* Visual Accent Below Mission */}
      <div className="w-full bg-[#23263a] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-linear-to-r from-transparent via-lime-300 to-transparent opacity-60"></div>
        </div>
      </div>

      {/* Experience Section (duplicate of Specializations) */}
      <section className="w-full bg-[#23263a] py-8 px-4 mt-16">
        <div className="max-w-7xl px-0 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left: Experience heading */}
            <div className="flex flex-col items-start md:items-start md:justify-start pl-0">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-left">Experience</h2>
            </div>
            {/* Right: Experience content (same as Specializations for now) */}
            <div className="md:col-span-2 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Practical design mastery</h3>
              <p className="text-base md:text-lg text-white mb-10 max-w-2xl">With extensive experience in design for Healthcare, Insurance, and a variety of technology-driven industries, I understand the unique challenges and needs of each sector. By deeply immersing myself in these fields, I create user experiences that address real pain points, connect with target audiences, and deliver impactful results that support business growth.</p>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">Startups/New Products</h4>
                  <p className="text-[18px] text-white">I turn early-stage concepts into impactful digital products by guiding them from research and ideation through to polished, user-centered design. My collaborative approach ensures solutions are intuitive, scalable, and aligned with real user needs.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">Healthcare/Clinical UX</h4>
                  <p className="text-[18px] text-white">With a deep understanding of healthcare's unique needs, I design digital solutions that prioritize safety, privacy, and effective communication. My work ranges from patient-facing experiences to optimizing back-office systems for large healthcare organizations and government agencies.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">Insurance/Fintech</h4>
                  <p className="text-[18px] text-white">With extensive experience in both insurance and fintech, I design digital solutions that simplify complex processes and inspire user trust. Whether it's streamlining claims, managing policies, or building intuitive financial platforms, my work makes critical information clear and actionable while ensuring secure, seamless experiences for both customers and organizations.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">Government</h4>
                  <p className="text-[18px] text-white">Designing accessible digital solutions for large-scale government systems, including the Department of Veterans Affairs (VA). My work simplifies complex services for millions of veterans and their families while equipping VA employees with intuitive tools to deliver critical resources efficiently and ensure access for all, regardless of ability.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">E-commerce</h4>
                  <p className="text-[18px] text-white">With experience partnering with some of the largest e-commerce brands, I design solutions that streamline the entire shopping journey—from product discovery to simplified checkout. My work also extends to optimizing back-office operations like quoting, inventory, and shipping, helping businesses improve efficiency and deliver a seamless experience for both customers and internal teams.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">Accessibility</h4>
                  <p className="text-[18px] text-white">I prioritize accessibility in every project, ensuring digital solutions are usable by all, regardless of ability. My work adheres to Section 508 compliance, WCAG 2.2 and evolving WCAG 3 standards, and employs ARIA best practices and plain language principles to make information clear, actionable, and accessible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
