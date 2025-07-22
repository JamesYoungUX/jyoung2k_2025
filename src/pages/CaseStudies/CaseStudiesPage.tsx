import React from "react";

/**
 * Page listing case studies.
 * Extend with real content as needed.
 */
const CaseStudiesPage: React.FC = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#23263a' }}>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center z-0 bg-[#23263a]">
        <div className="relative z-10 px-4 w-full max-w-5xl">
          <div className="text-left">
            <h1 className="font-heading text-white text-8xl md:text-9xl lg:text-[180px] xl:text-[200px] mb-2 leading-[0.9]">
              Case Studies
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl text-left mt-2 w-full" style={{ color: 'rgb(58, 255, 253)' }}>
              Explore detailed case studies of past work, client journeys, and project outcomes.
            </p>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* List or link to individual case studies here */}
      </div>
    </div>
  );
};

export default CaseStudiesPage;
