import React from "react";

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#23263a' }}>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center z-0 bg-[#23263a]">
        {/* Main Content */}
        <div className="relative z-10 px-4 w-full max-w-5xl">
          <div className="text-left">
            <h1 className="font-heading text-white text-8xl md:text-9xl lg:text-[180px] xl:text-[200px] mb-2 leading-[0.9]">
              JYOUNG2K
            </h1>
            <p
              className="text-lg sm:text-xl md:text-3xl text-left mt-2 w-full"
              style={{
                color: 'rgb(58, 255, 253)'
              }}
            >
              Two decades of expertise in crafting innovative solutions for healthcare, e-commerce, and startups.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 -mt-32" style={{ background: '#23263a' }}>
        {/* Section 1: UX Design */}
        <div className="min-h-screen flex items-center justify-center relative py-12 sm:py-16 md:py-24">
          <div className="absolute inset-0 bg-[#23263a]" />
          <div className="relative z-10 w-full max-w-7xl px-0 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start content-start">
              {/* Left: Large vertical heading */}
              <div className="flex flex-col items-start md:max-w-xs pl-0">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lime-300 leading-tight text-left">
                  User<br/>Experience<br/>(UX) Design
                </h2>
              </div>
              {/* Center: Main content */}
              <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl font-bold text-lime-300 mb-4">
                  Cross-section methodology
                </h2>
                <p className="text-base md:text-lg text-white mb-8">
                  Our approach to UX design involves the innovative cross-section methodology. We take into consideration your business model and enhance the design through supportive design elements, ensuring a seamless and intuitive user experience. By integrating your strategic objectives with our design expertise, we create user-centric solutions that drive engagement and propel your business forward.
                </p>
                <h3 className="text-xl font-bold text-lime-300 mb-2">
                  Embracing the iterative LEAN approach
                </h3>
                <a
                  href="#"
                  className="inline-block px-6 py-3 rounded-lg bg-lime-300 text-gray-900 font-bold text-lg shadow hover:bg-lime-200 transition mb-8"
                >
                  Learn more
                </a>
              </div>
              {/* Right: Large outlined button */}
              <div className="flex flex-col w-full items-start">
                <a
                  href="/cross-section-design"
                  className="w-full border-2 border-lime-300 rounded-xl px-4 py-4 text-2xl font-bold text-lime-300 flex flex-col items-start justify-between hover:bg-lime-100/10 transition min-h-[220px] relative"
                >
                  <span className="absolute top-4 left-4 text-left">Learn about Cross-section design</span>
                  <span className="arrow text-4xl absolute bottom-4 right-4">→</span>
                </a>
              </div>
              {/* iterative approach Diagram */}
              <div className="col-span-1 md:col-start-2 md:col-span-2 w-full flex flex-col items-center justify-center mt-0 mb-8">
                <div className="relative w-full max-w-5xl h-[420px] md:h-[420px] sm:h-[320px] xs:h-[220px] mx-auto">
                  {/* SVG for circle and horizontal line */}
                  <svg viewBox="0 0 900 400" fill="none" className="absolute left-0 top-0 w-full h-full">
                    {/* Horizontal line with arrows */}
                    <line x1="60" y1="350" x2="840" y2="350" stroke="#D9FF50" strokeWidth="2" />
                    {/* Main circle - moved up so its bottom just touches the line */}
                    <circle cx="450" cy="210" r="140" stroke="#D9FF50" strokeWidth="2" />
                    {/* Left arrowhead on line */}
                    <polygon points="60,344 60,356 78,350" fill="#D9FF50" />
                    {/* Right arrowhead on line (fixed direction) */}
                    <polygon points="840,344 840,356 858,350" fill="#D9FF50" />
                    {/* Arrowheads on the circle (responsive) */}
                    {/* 0° (right, 3. Ideation) - Upward, tangent and larger */}
                    <polygon points="590,210 586,218 594,218" fill="#D9FF50" />
                    {/* 90° (bottom, 2. Analysis) - Left, tangent and larger */}
                    <polygon points="450,350 444,344 444,356" fill="#D9FF50" />
                    {/* 180° (left, 5. Testing) - Downward, tangent and larger */}
                    <polygon points="310,210 306,202 314,202" fill="#D9FF50" />
                    {/* 270° (top, 4. Design) - Right, tangent and larger */}
                    <polygon points="450,70 456,64 456,76" fill="#D9FF50" />
                  </svg>
                  {/* Step labels/descriptions - absolutely positioned */}
                  {/* 1. Research (left, moved below the line) */}
                  <div className="absolute left-[-20px] bottom-8 md:bottom-0 text-center">
                    <div className="font-bold text-lime-300 text-lg">1. Research</div>
                    <div className="text-sm" style={{ color: 'rgb(165, 169, 179)' }}>Market & User Research</div>
                  </div>
                  {/* 2. Analysis (bottom center, just below the line, centered and even) */}
                  <div className="absolute left-1/2 bottom-8 md:bottom-0 -translate-x-1/2 text-center">
                    <div className="font-bold text-lime-300 text-lg">2. Analysis</div>
                    <div className="text-sm" style={{ color: 'rgb(165, 169, 179)' }}>Insights & Report Analysis</div>
                  </div>
                  {/* 6. Delivery (right, moved further right below the line) */}
                  <div className="absolute right-[-10px] bottom-8 md:bottom-0 text-center">
                    <div className="font-bold text-lime-300 text-lg">6. Delivery</div>
                    <div className="text-sm" style={{ color: 'rgb(165, 169, 179)' }}>Design to Engineering</div>
                  </div>
                  {/* 4. Design (top center, moved down) */}
                  <div className="absolute left-1/2 sm:top-8 top-20 -translate-x-1/2 text-center">
                    <div className="font-bold text-lime-300 text-lg">4. Design</div>
                    <div className="text-sm" style={{ color: 'rgb(165, 169, 179)' }}>Idea Framing & Wireframes</div>
                  </div>
                  {/* 5. Testing (left center, moved further left) */}
                  <div className="absolute sm:left-[100px] left-0 top-1/2 -translate-y-1/2 text-center break-words w-auto xs:w-24">
                    <div className="font-bold text-lime-300 text-lg">5. Testing</div>
                    <div className="text-sm" style={{ color: 'rgb(165, 169, 179)' }}>User Testing & Feedback</div>
                  </div>
                  {/* 3. Ideation (right center, moved further right) */}
                  <div className="absolute sm:right-[100px] right-0 top-1/2 -translate-y-1/2 text-center break-words w-auto xs:w-24">
                    <div className="font-bold text-lime-300 text-lg">3. Ideation</div>
                    <div className="text-sm" style={{ color: 'rgb(165, 169, 179)' }}>Sketching & User Flows</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <section className="w-full bg-[#23263a] py-8 px-4 mt-0">
        <div className="max-w-7xl px-0 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left: Services heading */}
            <div className="flex flex-col items-start md:items-start md:justify-start pl-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-left">Specializations</h2>
            </div>
            {/* Right: Services content */}
            <div className="md:col-span-2 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">From concept to reality</h3>
              <p className="text-base md:text-lg text-white mb-10 max-w-2xl">I am committed to crafting seamless user experiences tailored to address unique business needs. My expertise spans a diverse range of specializations:</p>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">User Experience (UX) Design</h4>
                  <p className="text-[18px] text-white">I transform complex processes into intuitive, user-friendly experiences that engage and delight users. Through thoughtful research and design, I make each interaction clear, seamless, and rewarding.</p>
                </div>
                <div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">User Interface (UI) Design</h4>
                  <p className="text-[18px] text-white">I design visually appealing interfaces that capture your product’s needs and reinforce user engagement, making every interaction intuitive and enjoyable while supporting seamless task completion.</p>
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
    </div>
  );
};

export default HomePage;
