import React, { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#1c202e' }}>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center z-0 sticky top-0">
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
      <div className="relative z-10 -mt-32" style={{ background: '#1c202e' }}>
        {/* Section 1 */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0" style={{ background: '#1c202e' }} />

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              INVISIBLE TEXT
            </h2>
            <p className="text-lg md:text-xl text-white leading-loose">
              This text appears black on black background, creating an illusion
              of text floating in the void. The parallax effect creates depth
              while maintaining the mysterious aesthetic of darkness.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0" style={{ background: '#1c202e' }} />

          <div className="relative z-10 max-w-4xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  SHADOW LAYERS
                </h3>
                <p className="text-base md:text-lg text-white leading-relaxed">
                  Multiple layers of black create depth and dimension. Each
                  element moves at different speeds, creating a complex visual
                  hierarchy that emerges from the darkness.
                </p>
              </div>

              <div className="relative h-64">
                <div className="absolute inset-0 bg-gray-900 rounded-lg opacity-20" />
                <div className="absolute inset-4 bg-gray-800 rounded-lg opacity-30" />
                <div className="absolute inset-8 bg-gray-700 rounded-lg opacity-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="min-h-screen flex items-center justify-center relative" style={{ background: '#1c202e' }}>
          <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 text-white">
              DARK POETRY
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "VOID",
                  text: "In the space between spaces, where light fears to tread, darkness whispers secrets only shadows understand.",
                },
                {
                  title: "DEPTH",
                  text: "Layer upon layer of black, each one deeper than the last, creating infinity within finite bounds.",
                },
                {
                  title: "MYSTERY",
                  text: "What cannot be seen becomes more powerful than what can, invisible text speaking volumes in silence.",
                },
              ].map((item, index) => (
                <div key={index} className="p-8 rounded-lg" style={{ background: 'rgba(28, 32, 46, 0.8)' }}>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div className="min-h-screen flex items-center justify-center relative" style={{ background: '#1c202e' }}>
          <div className="relative z-10 text-center px-4">
            <h1
              className="text-8xl md:text-9xl font-bold text-white mb-8"
              style={{
                transform: `translateY(${(scrollY - 3200) * 0.4}px) scale(${1 + Math.max(0, (scrollY - 3200) * 0.0001)})`,
                opacity: Math.max(0, Math.min(1, (scrollY - 3000) / 400)),
              }}
            >
              END
            </h1>
            <p
              className="text-xl text-white max-w-2xl mx-auto"
              style={{
                transform: `translateY(${(scrollY - 3200) * 0.2}px)`,
                opacity: Math.max(0, Math.min(1, (scrollY - 3200) / 400)),
              }}
            >
              Where darkness meets darkness, the journey completes its circle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
