import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import ProgramsPreview from '@/components/home/ProgramsPreview';
import GlobalDestinations from '@/components/home/GlobalDestinations';
import BookingCTA from '@/components/home/BookingCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutPreview />
      <ProgramsPreview />
      <GlobalDestinations />
      <BookingCTA />
    </div>
  );
}