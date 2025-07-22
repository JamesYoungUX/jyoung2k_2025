import React from "react";

const ProcessesPage: React.FC = () => (
  <div className="min-h-screen text-white overflow-hidden" style={{ background: '#23263a' }}>
    {/* Hero Section */}
    <div className="relative h-screen flex items-center justify-center z-0 bg-[#23263a]">
      <div className="relative z-10 px-4 w-full max-w-5xl">
        <div className="text-left">
          <h1 className="font-heading text-white text-8xl md:text-9xl lg:text-[180px] xl:text-[200px] mb-2 leading-[0.9]">
            Process
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-left mt-2 w-full" style={{ color: 'rgb(58, 255, 253)' }}>
            Learn about the processes and methodologies used in projects, from discovery to delivery.
          </p>
        </div>
      </div>
    </div>
    {/* Content Section */}
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-end">
        <div className="text-right">
          <h2 className="text-3xl font-extrabold mb-4">Process</h2>
          <h3 className="text-xl font-bold mb-2">Cross-section methodology</h3>
          <p className="text-base text-gray-700 max-w-md ml-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet dictum, lectus urna placerat metus, ac dictum elit enim nec urna. Cras euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nunc eu nunc.
          </p>
        </div>
      </div>
      {/* Add more process details here */}
    </div>
  </div>
);

export default ProcessesPage;
