import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFirestoreDocument } from '../../hooks/useFirestore';
import type { CaseStudy } from '../../types/firestore';
import { bravadoHealthCaseStudy } from '../../data/caseStudies';

function stripPTags(html: string) {
  return html.replace(/^<p>(.*?)<\/p>$/is, '$1');
}

const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch case study from Firestore
  const { data: caseStudy, loading, error } = useFirestoreDocument<CaseStudy>("caseStudies", id || '');

  // Fallback to hardcoded data if Firestore fails
  const displayCaseStudy: CaseStudy = caseStudy || {
    id: id || 'bravado-health',
    company: bravadoHealthCaseStudy.company,
    image: bravadoHealthCaseStudy.image,
    hidden: bravadoHealthCaseStudy.hidden,
    featured: bravadoHealthCaseStudy.featured,
    details: bravadoHealthCaseStudy.details,
    intro: bravadoHealthCaseStudy.intro
  };

  // Helper to get project details from root or details, with multiple fallback keys
  const getDetailMulti = (keys: string[], fallback = '') => {
    if (!displayCaseStudy) return fallback;
    for (const key of keys) {
      if (displayCaseStudy && (displayCaseStudy as Record<string, unknown>)[key]) return (displayCaseStudy as Record<string, unknown>)[key];
      if (displayCaseStudy.details && (displayCaseStudy.details as Record<string, unknown>)[key]) return (displayCaseStudy.details as Record<string, unknown>)[key];
    }
    return fallback;
  };

  // Safely extract project details
  const role = getDetailMulti(['role']);
  const platform = getDetailMulti(['platform']);
  const teamList = (displayCaseStudy?.details && displayCaseStudy.details.teamMembers) || '';
  const methodologyRaw = getDetailMulti(['methodologies', 'methodology', 'method', 'process', 'approach']);
  const methodologyList = Array.isArray(methodologyRaw)
    ? methodologyRaw
    : (typeof methodologyRaw === 'string' ? methodologyRaw.split(/[,\n]/).map(s => s.trim()).filter(Boolean) : []);
  const year = (displayCaseStudy?.details && displayCaseStudy.details.timeline) || '';

  if (loading) {
    return (
      <div className="min-h-screen bg-surface dark:bg-surface-dark text-text dark:text-text-dark pt-32 px-4 transition-colors">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-teal-400/20 to-purple-400/20 blur-3xl rounded-full"></div>
              <div className="relative animate-pulse space-y-6">
                <div className="h-12 bg-linear-to-r from-teal-400/30 to-purple-400/30 rounded-2xl w-2/3 mx-auto"></div>
                <div className="h-8 bg-linear-to-r from-teal-400/20 to-purple-400/20 rounded-xl w-1/2 mx-auto"></div>
                <div className="flex justify-center space-x-4 mt-12">
                  <div className="h-6 w-20 bg-teal-400/20 rounded-full"></div>
                  <div className="h-6 w-16 bg-purple-400/20 rounded-full"></div>
                  <div className="h-6 w-24 bg-blue-400/20 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="text-teal-600 dark:text-teal-400 text-lg font-medium">
              Loading case study...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !caseStudy) {
    return (
      <div className="min-h-screen bg-surface dark:bg-surface-dark text-text dark:text-text-dark pt-32 px-4 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4 text-primary dark:text-primary-light">Case Study Not Found</h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 mb-8">
              {error || 'The requested case study could not be found.'}
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#23263a' }}>
      <div className="pt-20">
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/case-studies" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">{displayCaseStudy.company}</span>
          </nav>
        </div>

        {/* Title Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          {/* Company name with accents */}
          {displayCaseStudy.company && (
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-1 bg-orchid-600 dark:bg-orchid-400 mr-3 rounded-full"></div>
              <span className="text-lg font-semibold text-primary dark:text-primary-light tracking-wide uppercase">
                {displayCaseStudy.company}
              </span>
              <div className="w-8 h-1 bg-orchid-600 dark:bg-orchid-400 ml-3 rounded-full"></div>
            </div>
          )}
          <div>
            {/* Intro as hero (h1) */}
            {displayCaseStudy.intro && (
              <h1 className="text-4xl md:text-5xl font-medium text-primary dark:text-primary-light mb-2 leading-snug md:leading-snug text-left md:text-justify"
                style={{ fontWeight: 500 }}
                dangerouslySetInnerHTML={{ __html: stripPTags(displayCaseStudy.intro) }}
              />
            )}
            {/* Tags below hero, right-aligned on desktop */}
            {(displayCaseStudy as Record<string, unknown>).tags && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-end mb-6">
                {((displayCaseStudy as Record<string, unknown>).tags as string[])?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-lime-300 dark:bg-lime-300 text-black dark:text-black text-sm font-medium rounded-full border border-lime-300 dark:border-lime-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Hero Section - Clean */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          {/* Hero Image */}
          {((displayCaseStudy as Record<string, unknown>).heroImage || displayCaseStudy.image) && (
            <div className="relative w-full rounded-xl overflow-hidden mb-8">
              <img 
                src={((displayCaseStudy as Record<string, unknown>).heroImage as string) || displayCaseStudy.image} 
                alt={displayCaseStudy.company}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          {/* Title below hero image, styled like intro was */}
          {(displayCaseStudy as any).title && (
            <div className="bg-muted dark:bg-muted-dark backdrop-blur-xs p-8 rounded-xl border border-border dark:border-crystal-700 mb-8">
              <p className="text-2xl md:text-3xl font-bold text-orchid-600 dark:text-orchid-400 text-center mb-2">
                {(displayCaseStudy as any).title}
              </p>
            </div>
          )}
          
          {/* Project Details Block - 3-Column Layout, Team spans both rows */}
          <div className="bg-muted dark:bg-muted-dark backdrop-blur-xs p-8 rounded-xl border border-border dark:border-crystal-700">
            <div className="grid grid-cols-3 gap-8 items-start">
              {/* Row 1: Role, Platform, Team (team spans 2 rows) */}
              <div>
                <h3 className="text-sm font-semibold text-orchid-600 dark:text-orchid-400 uppercase tracking-wider mb-3">Role</h3>
                <div className="text-text dark:text-text-dark text-sm">
                  {role && Array.isArray(role)
                    ? role.map((item: string, i: number) => <div key={i}>{item}</div>)
                    : typeof role === 'string' && role.split(/[,\n]/).map((item: string, i: number) => (
                        <div key={i}>{item.trim()}</div>
                      ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-orchid-600 dark:text-orchid-400 uppercase tracking-wider mb-3">Platform</h3>
                <div className="text-text dark:text-text-dark text-sm">
                  {platform && Array.isArray(platform)
                    ? platform.map((item, i) => <div key={i}>{item}</div>)
                    : platform && platform.split(/[,\n]/).map((item, i) => (
                        <div key={i}>{item.trim()}</div>
                      ))}
                </div>
              </div>
              <div className="row-span-2">
                <h3 className="text-sm font-semibold text-orchid-600 dark:text-orchid-400 uppercase tracking-wider mb-3">Team</h3>
                <div className="text-text dark:text-text-dark text-sm">
                  {teamList && Array.isArray(teamList)
                    ? teamList.map((item, i) => <div key={i}>{item}</div>)
                    : teamList && teamList.split(/[,\n]/).map((item, i) => (
                        <div key={i}>{item.trim()}</div>
                      ))}
                </div>
              </div>
              {/* Row 2: Methodology, Year */}
              <div>
                <h3 className="text-sm font-semibold text-orchid-600 dark:text-orchid-400 uppercase tracking-wider mb-3">Methodology</h3>
                <div className="text-text dark:text-text-dark text-sm">
                  {methodologyList.length > 0
                    ? methodologyList.map((item, i) => <div key={i}>{item}</div>)
                    : <span className="italic text-text/60 dark:text-text-dark">—</span>}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-orchid-600 dark:text-orchid-400 uppercase tracking-wider mb-3">Year</h3>
                <div className="text-text dark:text-text-dark text-sm">
                  {year && Array.isArray(year)
                    ? year.map((item, i) => <div key={i}>{item}</div>)
                    : year && year.split(/[,\n]/).map((item, i) => (
                        <div key={i}>{item.trim()}</div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections - Single Card with Dividers */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-muted dark:bg-muted-dark backdrop-blur-xs p-8 rounded-2xl border border-border dark:border-crystal-700">
            {/* Sections */}
            {(displayCaseStudy as Record<string, unknown>).sections && Array.isArray((displayCaseStudy as Record<string, unknown>).sections) && (
              <>
                {((displayCaseStudy as Record<string, unknown>).sections as Array<{
                  heading?: string;
                  content?: string;
                  images?: string[];
                }>).map((section, idx) => (
                  <div key={idx}>
                    {idx > 0 && <div className="border-t border-border dark:border-crystal-700 my-8" />}
                    {section.heading && (
                      <h2 className="text-2xl font-bold text-orchid-600 dark:text-orchid-400 mb-6">{section.heading}</h2>
                    )}
                    {section.images && section.images.length > 0 && (
                      <div className="flex gap-4 mb-4 flex-wrap">
                        {section.images.map((img, i) =>
                          img ? (
                            <img
                              key={i}
                              src={img}
                              alt={section.heading + ' image ' + (i + 1)}
                              className="w-full h-64 rounded-lg border border-border dark:border-crystal-700 object-top object-cover"
                            />
                          ) : null
                        )}
                      </div>
                    )}
                    {section.content && (
                      <div className="prose prose-invert max-w-none text-text dark:text-text-dark text-xl leading-normal">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: stripPTags(section.content)
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage; 