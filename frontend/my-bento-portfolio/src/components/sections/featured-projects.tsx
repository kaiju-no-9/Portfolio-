// featured project cards for each category
"use client";

import React from "react";
import { Card } from "../ui/card";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
  videoDemo?: string;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 bg-white/[0.06] text-gh-400 rounded-md text-xs font-medium">
      {children}
    </span>
  );
}

function ViewAllLink({ href, label = "View All" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 text-gh-400 hover:text-gh-200 text-sm font-medium transition-colors"
    >
      {label}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-colors p-4 flex flex-col justify-between h-full">
      <div>
        {project.videoDemo && (
          <div className="mb-3 rounded-lg overflow-hidden border border-white/[0.06] bg-black/20 aspect-video flex items-center justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={project.videoDemo} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
        <h4 className="font-semibold text-sm text-white mb-1">{project.title}</h4>
        <p className="text-gh-500 text-sm mb-3 leading-relaxed">{project.description}</p>
      </div>
      <div className="flex gap-2">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-gh-300 rounded-lg text-xs font-medium transition-colors"
          >
            <Github size={13} />
            GitHub
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-gh-300 rounded-lg text-xs font-medium transition-colors"
          >
            <ExternalLink size={13} />
            Live
          </a>
        )}
      </div>
    </div>
  );
}

export function FullStackProjectsCard() {
  const projects: Project[] = [
    {
      title: "GrabPic",
      description:
        "AI-powered photo grabbing platform built with modern web technologies for intelligent image management.",
      tags: ["TypeScript", "AI", "Full Stack"],
      githubLink: "https://github.com/kaiju-no-9/GrabPic",
    },
    {
      title: "t-8-t",
      description:
        "A crypto-based automation platform inspired by n8n, enabling workflow automation for blockchain tasks.",
      tags: ["TypeScript", "Crypto", "Automation"],
      githubLink: "https://github.com/kaiju-no-9/t-8-t",
      videoDemo: "/videos/t-8-t.mov",
    },
  ];

  return (
    <Card className="col-span-1 sm:col-span-2 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
            <span className="text-xs">🚀</span>
          </div>
          <h3 className="font-medium text-sm text-white">Full Stack Projects</h3>
        </div>
        <ViewAllLink href="https://github.com/kaiju-no-9?tab=repositories" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </Card>
  );
}

export function AIProjectsCard() {
  const projects: Project[] = [
    {
      title: "Rusty Token",
      description:
        "A Rust-based tool for optimizing credits in AI conversations, reducing token usage and cost.",
      tags: ["Rust", "AI", "Optimization"],
      githubLink: "https://github.com/kaiju-no-9/Rusty_token",
    },
    {
      title: "GrabPic",
      description:
        "AI-powered photo grabbing platform built with modern web technologies for intelligent image management.",
      tags: ["TypeScript", "AI", "Full Stack"],
      githubLink: "https://github.com/kaiju-no-9/GrabPic",
    },
  ];

  return (
    <Card className="col-span-1 sm:col-span-2 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center">
            <span className="text-xs">🤖</span>
          </div>
          <h3 className="font-medium text-sm text-white">AI & Machine Learning</h3>
        </div>
        <ViewAllLink href="https://github.com/kaiju-no-9?tab=repositories" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </Card>
  );
}

export function BackendProjectsCard() {
  const projects: Project[] = [
    {
      title: "Steam Backend",
      description:
        "A scalable backend service mimicking Steam's core functionalities.",
      tags: ["Backend", "Scalable", "System"],
      githubLink: "https://github.com/kaiju-no-9/steam",
    },
  ];

  return (
    <Card className="col-span-1 sm:col-span-2 lg:col-span-4 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Info */}
        <div className="flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-medium text-gh-500 text-xs uppercase tracking-wider">Backend & Tools</h3>
              <ViewAllLink href="https://github.com/kaiju-no-9?tab=repositories" />
            </div>

            <h4 className="text-white text-lg font-semibold mb-3">Scalable Backend Systems</h4>

            <p className="text-gh-400 text-sm leading-relaxed mb-4">
              Building <span className="text-white font-medium">production-grade backends</span> with{" "}
              <span className="text-white font-medium">TypeScript</span> and{" "}
              <span className="text-white font-medium">Node.js</span>. Focused on{" "}
              <span className="text-white font-medium">clean architecture</span>,{" "}
              <span className="text-white font-medium">database design</span>, and{" "}
              <span className="text-white font-medium">API development</span>.
            </p>

            <p className="text-gh-500 text-sm leading-relaxed mb-5">
              Exploring low-level design patterns, database internals, and system design through hands-on projects.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["Next.js", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "Docker", "Python"].map((skill) => (
              <span key={skill} className="px-2.5 py-1 bg-white/[0.06] text-gh-400 rounded-lg text-xs font-medium">{skill}</span>
            ))}
          </div>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </Card>
  );
}

export function FeaturedProjects() {
  return (
    <>
      <FullStackProjectsCard />
      <AIProjectsCard />
      <BackendProjectsCard />
    </>
  );
}
