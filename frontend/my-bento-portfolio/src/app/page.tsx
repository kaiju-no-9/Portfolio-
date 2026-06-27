"use client";

import React from "react";
import { Suspense } from "react";

import { Toaster } from "react-hot-toast";

import { ContactSection } from "@/components/sections/contact-section";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WorkExperienceSection } from "@/components/sections/work-experience-section";
import { OpenSourceContribution } from "@/components/sections/opensource-contribution";
import { FullStackProjectsCard, AIProjectsCard, BackendProjectsCard } from "@/components/sections/featured-projects";
import { GithubCalendarGame } from "@/components/sections/github-calendar-game";

function HomeContent() {
  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 text-white relative">
        <Toaster position="top-center" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ContactSection />

          <Header />

          {/* work experience + open source stacked left */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            <WorkExperienceSection />
            <OpenSourceContribution />
          </div>

          {/* featured projects */}
          <FullStackProjectsCard />
          <AIProjectsCard />

          {/* backend & tools full-width */}
          <BackendProjectsCard />

          {/* github activity arcade */}
          <GithubCalendarGame />

          {/* footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}
