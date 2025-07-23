import React from "react";
import { useFirestoreCollection } from "../../hooks/useFirestore";
import type { CaseStudy } from "../../types/firestore";
import CaseStudyCard from "../../components/CaseStudyCard";
import ScrollIndicator from "../../components/ScrollIndicator";
import Loading from "../../components/ui/Loading";

/**
 * Page listing case studies.
 * Fetches case studies from Firestore and displays them.
 */
const CaseStudiesPage: React.FC = () => {
  // Fetch case studies from Firestore - all non-hidden case studies (no index required)
  const { data: caseStudies, loading, error } = useFirestoreCollection<CaseStudy>("caseStudies", {
      where: [{ field: "hidden", operator: "==", value: false }]
  });

  // Add a timeout to prevent infinite loading
  const [showFallback, setShowFallback] = React.useState(false);
  
  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 3000); // Show fallback after 3 seconds of loading
      
      return () => clearTimeout(timer);
    } else {
      setShowFallback(false);
    }
  }, [loading]);

  // Fallback case study data (in case Firestore is empty or unavailable)
  const fallbackCaseStudy: CaseStudy = {
    id: "veterans-affairs",
    company: "Veterans Affairs",
    image: "https://res.cloudinary.com/dxm6xswdr/image/upload/f_auto,q_auto/v1752918381/Launch_page_nstnt0.png",
    hidden: false,
    featured: true
  };

           // Sort case studies: featured first, then by timeline year (newest to oldest)
         const sortedCaseStudies = React.useMemo(() => {
           if (caseStudies.length === 0) return [fallbackCaseStudy];
           
           return [...caseStudies].sort((a, b) => {
             // Featured case studies first
             if (a.featured && !b.featured) return -1;
             if (!a.featured && b.featured) return 1;
             
             // For non-featured case studies, sort by timeline year (newest to oldest)
             if (!a.featured && !b.featured) {
               const getYearFromTimeline = (timeline?: string) => {
                 if (!timeline) return 0;
                 // Extract the ending year from timeline (e.g., "2018–2021" -> 2021)
                 const match = timeline.match(/(\d{4})$/);
                 return match ? parseInt(match[1], 10) : 0;
               };
               
               const yearA = getYearFromTimeline(a.details?.timeline);
               const yearB = getYearFromTimeline(b.details?.timeline);
               
               return yearB - yearA; // Newest first
             }
             
             // If both are featured or both are non-featured with same year, sort by company name
             return (a.company || '').localeCompare(b.company || '');
           });
         }, [caseStudies, fallbackCaseStudy]);

  // Use sorted data
  const displayCaseStudies = sortedCaseStudies;

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#23263a' }}>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center z-0 bg-[#23263a]">
        <div className="relative z-10 px-4 w-full max-w-5xl">
          <div className="text-center">
            <h1 className="font-heading text-white text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-2 leading-[0.9]">
              Case Studies
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl text-center" style={{ color: 'rgb(58, 255, 253)' }}>
              Explore detailed case studies of past work, client journeys, and project outcomes.
            </p>
          </div>
        </div>
        {/* Scroll Indicator at bottom of hero */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <ScrollIndicator />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Show loading only if we don't have any data yet and there's no error and haven't timed out */}
        {loading && caseStudies.length === 0 && !error && !showFallback && (
          <div className="flex justify-center py-12">
            <Loading size="lg" text="Loading case studies..." />
          </div>
        )}
        
        {/* Show error message but still display fallback data */}
        {(error || showFallback) && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-300 text-sm">
              <strong>Note:</strong> {
                error?.includes('Permission denied') 
                  ? 'Database access is restricted. This is normal during development.' 
                  : error?.includes('Collection not found')
                  ? 'Case studies collection not found. This is normal if no data has been added yet.'
                  : error 
                  ? 'Unable to load case studies from database.' 
                  : 'Loading is taking longer than expected.'
              } Showing sample content.
            </p>
          </div>
        )}
        
        {/* Case Studies Grid - always show if we have data */}
        <div className="space-y-16">
          {displayCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
        
        {/* Only show "no case studies" if we have no data and no error */}
        {caseStudies.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">
              No case studies found. Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudiesPage;
