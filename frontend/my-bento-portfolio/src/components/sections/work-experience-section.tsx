"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";

function CompanyLogo({ company }: { company: string }) {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.04]">
      <span className="text-sm font-bold text-gh-400">{company.charAt(0)}</span>
    </div>
  );
}

export function WorkExperienceSection() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const experiences = [
    {
      title: "Full Stack & Gen AI Developer",
      company: "Independent",
      type: "Self-employed",
      period: "2025 - Present",
      duration: "Ongoing",
      description: [
        <>Building <span className="text-white font-medium">AI-powered applications</span> and <span className="text-white font-medium">full stack projects</span></>,
        <>Working with <span className="text-white font-medium">TypeScript</span>, <span className="text-white font-medium">Python</span>, <span className="text-white font-medium">Next.js</span>, and <span className="text-white font-medium">Node.js</span></>,
        <>Exploring <span className="text-white font-medium">Gen AI</span>, <span className="text-white font-medium">PyTorch</span>, and <span className="text-white font-medium">machine learning</span> workflows</>,
      ],
    },
    {
      title: "Open Source Contributor",
      company: "GitHub",
      type: "Community",
      period: "2025 - Present",
      duration: "Ongoing",
      description: [
        <>Contributing to open source projects across <span className="text-white font-medium">36+ repositories</span></>,
        <>Built projects spanning <span className="text-white font-medium">crypto automation</span>, <span className="text-white font-medium">AI tools</span>, and <span className="text-white font-medium">web platforms</span></>,
        <>Active in <span className="text-white font-medium">competitive programming</span> and <span className="text-white font-medium">low-level design</span> practice</>,
      ],
    },
  ];

  return (
    <Card className="p-5 pb-3">
      <h2 className="font-medium text-gh-500 text-xs uppercase tracking-wider mb-4">Experience</h2>
      <div className="space-y-0">
        {experiences.map((exp, index) => {
          const isExpanded = expandedIndices.includes(index);
          const isLast = index === experiences.length - 1;
          const toggleExpand = () => {
            setExpandedIndices(prev =>
              isExpanded ? prev.filter(i => i !== index) : [...prev, index]
            );
          };
          return (
            <div key={index} className={`relative ${!isLast ? 'border-b border-white/[0.06]' : ''}`}>
              <button
                type="button"
                aria-expanded={isExpanded}
                className={`pt-3 ${isLast ? 'pb-0' : 'pb-3'} cursor-pointer hover:bg-white/[0.03] transition-colors rounded-xl px-2 -mx-2 w-full text-left`}
                onClick={toggleExpand}
              >
                <div className="flex gap-3">
                  <CompanyLogo company={exp.company} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm">{exp.title}</h3>
                    <p className="text-gh-400 text-sm">{exp.company} · {exp.type}</p>
                    <p className="text-gh-500 text-xs mt-0.5">{exp.period} · {exp.duration}</p>
                    <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96 mt-3' : 'max-h-0'}`}>
                      <ul className="space-y-1.5">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm text-gh-400 flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-start mt-1" aria-hidden="true">
                    <svg className={`w-4 h-4 text-gh-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
