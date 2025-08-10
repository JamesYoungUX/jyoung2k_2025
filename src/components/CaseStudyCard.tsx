import React from "react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../types/firestore";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => {
         // Use structure with image and intro
       const title = caseStudy.company || 'Untitled Case Study';
       const description = caseStudy.intro || 'No description available';
       const imageUrl = caseStudy.image || '';
       const imageAlt = title;
       const slug = caseStudy.id || 'untitled';

  return (
    <div 
      className="bg-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col-reverse md:flex-row items-stretch mb-8 w-full border border-white/20 animate-fade-in" 
      style={{ minHeight: '600px', height: '600px' }}
    >
                   <div className="flex flex-col justify-end grow p-6 md:p-8 gap-3 min-w-[260px] md:basis-2/5 md:w-2/5">
        <h2 className="text-3xl font-semibold text-lime-300 mb-2 text-left leading-tight">
          {title}
        </h2>
                       <div className="text-gray-300 text-base font-semibold mb-4 text-left max-w-2xl leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: description }}
               />
        <Link 
          to={`/case-study/${slug}`}
          className="w-max px-8 py-4 rounded-lg bg-lime-300 hover:bg-lime-400 text-black font-bold text-base tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 transform inline-block"
        >
          READ CASE STUDY
        </Link>
      </div>
                   {imageUrl && (
               <div className="flex items-stretch justify-center bg-muted dark:bg-muted-dark h-full md:mt-6 md:basis-3/5 md:w-3/5 relative rounded-t-2xl md:rounded-tl-2xl overflow-hidden group">
        <img 
                   src={imageUrl}
          alt={imageAlt} 
          className="w-full h-full object-cover object-left rounded-t-2xl md:rounded-tl-2xl transition-all duration-300 group-hover:scale-105 group-hover:brightness-110" 
                   style={{ minHeight: 0, minWidth: 0 }}
        />
      </div>
             )}
    </div>
  );
};

export default CaseStudyCard; 