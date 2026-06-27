import React from "react";
import { CopyEmailButton } from "../ui/copy-email-button";
import { Github, Linkedin, Mail } from "lucide-react";
import { SocialIcon } from "../ui/social-icon";
import { Card } from "../ui/card";
import { ThemeToggle } from "../ui/theme-toggle";

export function ContactSection() {
  return (
    <Card className="col-span-1 sm:col-span-2 lg:col-span-4 px-5 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-white font-semibold text-sm shrink-0 hover:text-gh-300 transition-colors"
        >
          Nishchay
        </a>

        {/* Center social links */}
        <div className="flex items-center gap-5">
          <SocialIcon
            href="https://x.com/kumar_nish98725"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            }
            label="X"
          />
          <SocialIcon
            href="https://github.com/kaiju-no-9"
            icon={<Github size={20} />}
            label="GitHub"
          />
          <SocialIcon
            href="https://www.linkedin.com/in/nishchay-kumar-63bb92325/"
            icon={<Linkedin size={20} />}
            label="LinkedIn"
          />
          <CopyEmailButton email="nishchay@example.com" />
        </div>

        {/* Right: theme toggle + CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="mailto:nishchay@example.com"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <Mail size={14} />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </Card>
  );
}
