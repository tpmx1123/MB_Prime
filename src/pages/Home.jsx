import React from 'react';
import Hero from '../components/Hero';
import IntroPhilosophy from '../components/IntroPhilosophy';
import FeaturedProjectsHome from '../components/FeaturedProjectsHome';
import Commitments from '../components/Commitments';
import FounderSection from '../components/FounderSection';
import InvestmentPerspective from '../components/InvestmentPerspective';
import HomeFAQ from '../components/HomeFAQ';
import Location from '../components/Location';

const Home = () => (
  <>
    <Hero />
    <IntroPhilosophy />
    <FeaturedProjectsHome />
    <Commitments />
    <FounderSection />
    <InvestmentPerspective />
    <HomeFAQ />
    <Location />
  </>
);

export default Home;
