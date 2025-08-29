'use client';

import { useState, useEffect } from 'react';
import type { DataEntry, KnowledgeEntry } from '@/utils/fileUtils';
import SqlViewer from '@/components/SqlViewer';
import QuantitativeResults from './components/QuantitativeResults';
import FAQSection from './components/FAQSection';
import DiscussionSection from './components/DiscussionSection';
import StayTunedSection from './components/StayTunedSection';
import RelatedArticles from './components/RelatedArticles';
import Citation from './components/Citation';
import Dataset from './components/Dataset';
import NoticeBanner from './components/NoticeBanner';
import LogoAndTitle from './components/LogoAndTitle';
import LinksSection from './components/LinksSection';
import LatestNews from './components/LatestNews';
import PartnerLogos from './components/PartnerLogos';
import ButtonsAndContent from './components/ButtonsAndContent';
import Introduction from './components/Introduction';
import DataViewer from './components/DataViewer';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Notice Banner */}
      <NoticeBanner />

      {/* Logo and Title */}
      <LogoAndTitle />
        
      {/* Links */}
      <LinksSection />

      {/* Latest News */}
      <LatestNews />

      {/* Partner Logos */}
      {/* <PartnerLogos /> */}
    
      {/* Buttons and Content */}
      {/* <ButtonsAndContent /> */}

      {/* FAQ Section */}
      <FAQSection />

      {/* Introduction */}
      <Introduction />

      {/* Dataset */}
      {/* <Dataset /> */}
      
      {/* Data Viewer */}
      {/* <DataViewer /> */}
      
      {/* Quantitative Results */
      }
      <QuantitativeResults />

      {/* Discussion Section */}
      <DiscussionSection />
      
      {/* Stay Tuned Section */}
      {/* <StayTunedSection /> */}
      
      {/* Related Articles */}
      {/* <RelatedArticles /> */}
      
      {/* Citation */}
      <Citation />
    </main>
  );
}
