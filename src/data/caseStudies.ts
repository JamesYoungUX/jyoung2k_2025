import type { CaseStudy } from '../types/firestore';

export const bravadoHealthCaseStudy: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'> = {
  company: "Bravado Health",
  image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  hidden: false,
  featured: true,
  details: {
    timeline: "2018–2021"
  },
  intro: "<p>I applied user-centered design methodology to create an engaging mobile app for Bravado Health, empowering people to prepare for and recover from surgery with confidence.</p>",
  sections: [
    {
      heading: 'Insurance and Fintech',
      content: 'Worked on digital transformation for insurance and fintech clients, improving user experience and streamlining claims processing.',
      images: []
    },
    {
      heading: 'Government',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.',
      images: []
    },
    {
      heading: 'E-commerce',
      content: 'Designed and optimized e-commerce flows for increased conversion and customer satisfaction.',
      images: []
    },
    {
      heading: 'Accessibility',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nisi vel consectetur euismod, nisl nisi consectetur nisi, euismod consectetur nisi nisi euismod nisi.',
      images: []
    }
  ]
};

// Export all case studies for easy access
export const caseStudies = [
  bravadoHealthCaseStudy
]; 