"use client";

import React from "react";
import Image from "next/image";
import ProfileImage from "@/assets/images/newdp.png";
import { Card } from "../ui/card";
import { SkillRadial } from "../ui/skill-radial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faDocker, faGitAlt, faNode, faPython } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faBolt, faTerminal, faBrain, faServer } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <>
      <Card className="col-span-1 sm:col-span-2 lg:col-span-1 p-5">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
          Hi, I&apos;m Nishchay
        </h1>
        <p className="text-gh-400 text-sm leading-relaxed">
          <span className="text-white font-medium">Full Stack Developer</span> &{" "}
          <span className="text-white font-medium">Gen AI Engineer</span> passionate about
          building <span className="text-white font-medium">AI-powered apps</span>,{" "}
          <span className="text-white font-medium">scalable backends</span>, and{" "}
          <span className="text-white font-medium">modern web experiences</span>.
        </p>
      </Card>

      <Card className="col-span-1 sm:col-span-2 lg:col-span-1 p-0 aspect-square">
        <Image
          src={ProfileImage}
          alt="Nishchay Kumar"
          width={400}
          height={400}
          className="object-cover rounded-2xl w-full h-auto"
        />
      </Card>

      <Card className="col-span-1 sm:col-span-2 lg:col-span-2 p-5">
        <h3 className="font-medium text-gh-500 text-xs uppercase tracking-wider mb-4">Skills</h3>
        <SkillRadial skills={[
          { name: "TypeScript", level: 90, color: "text-gh-200", icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
            </svg>
          ) },
          { name: "Python", level: 85, color: "text-gh-200", icon: <FontAwesomeIcon icon={faPython} className="w-5 h-5" /> },
          { name: "React", level: 88, color: "text-gh-200", icon: <FontAwesomeIcon icon={faReact} className="w-5 h-5" /> },
          { name: "Next.js", level: 85, color: "text-gh-200", icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a4456.31 4456.31 0 0 0 4.532 6.815l1.348 2.024.068-.042c1.2-.74 2.468-1.798 3.435-2.874a11.94 11.94 0 0 0 2.824-5.5c.096-.659.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
            </svg>
          ) },
          { name: "Node.js", level: 85, color: "text-gh-200", icon: <FontAwesomeIcon icon={faNode} className="w-5 h-5" /> },
          { name: "Gen AI", level: 82, color: "text-gh-200", icon: <FontAwesomeIcon icon={faBrain} className="w-5 h-5" /> },
          { name: "PostgreSQL", level: 78, color: "text-gh-200", icon: <FontAwesomeIcon icon={faDatabase} className="w-5 h-5" /> },
          { name: "PyTorch", level: 75, color: "text-gh-200", icon: <FontAwesomeIcon icon={faBolt} className="w-5 h-5" /> },
          { name: "Backend", level: 85, color: "text-gh-200", icon: <FontAwesomeIcon icon={faServer} className="w-5 h-5" /> },
          { name: "CLI Tools", level: 78, color: "text-gh-200", icon: <FontAwesomeIcon icon={faTerminal} className="w-5 h-5" /> },
          { name: "Docker", level: 78, color: "text-gh-200", icon: <FontAwesomeIcon icon={faDocker} className="w-5 h-5" /> },
          { name: "Git", level: 90, color: "text-gh-200", icon: <FontAwesomeIcon icon={faGitAlt} className="w-5 h-5" /> },
        ]} />
      </Card>
    </>
  );
}
