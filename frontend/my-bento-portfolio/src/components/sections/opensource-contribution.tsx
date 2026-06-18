"use client";

import React from "react";
import { Card } from "../ui/card";
import { ExternalLink, GitFork, Star } from "lucide-react";

const featuredRepos = [
  { name: "Sugar Labs", description: "Open source educational software and activities", lang: "Python/JS" },
  { name: "MLabs", description: "Machine learning and open source contributions", lang: "TypeScript/Python" },
];

export function OpenSourceContribution() {
  return (
    <Card className="p-5">
      <p className="text-gh-400 text-sm leading-relaxed mb-4">
        <span className="text-white font-medium">
          Active open source contributor
        </span>{" "}
        on{" "}
        <a
          href="https://github.com/kaiju-no-9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline font-medium"
        >
          GitHub
        </a>{" "}
        <span className="text-gh-500">(</span>
        <GitFork className="inline w-3.5 h-3.5 text-gh-500 -mt-0.5" />
        <span className="text-white font-medium"> 36</span>
        <span className="text-gh-500"> repos)</span> — building{" "}
        <span className="text-white font-medium">full stack apps</span>,{" "}
        <span className="text-white font-medium">AI tools</span>, and{" "}
        <span className="text-white font-medium">backend systems</span> in{" "}
        <span className="text-white font-medium">TypeScript</span> &{" "}
        <span className="text-white font-medium">Python</span>.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] rounded-lg">
          <Star className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-sm font-medium">
            36 repos
          </span>
        </div>
        <a
          href="https://github.com/kaiju-no-9?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors"
        >
          <span className="text-gh-300 text-sm font-medium">View All</span>
          <ExternalLink className="w-3.5 h-3.5 text-gh-500" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        {featuredRepos.map((repo) => (
          <a
            key={repo.name}
            href={`https://github.com/kaiju-no-9/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] rounded-lg transition-colors group"
          >
            <GitFork className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="text-gh-300 text-sm font-medium">{repo.name}</span>
            <span className="text-gh-500 text-sm truncate group-hover:text-gh-200 transition-colors">
              {repo.description}
            </span>
            <span className="ml-auto text-gh-600 text-xs font-mono shrink-0">{repo.lang}</span>
          </a>
        ))}
      </div>
    </Card>
  );
}
