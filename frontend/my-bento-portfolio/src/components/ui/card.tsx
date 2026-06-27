import { cn } from "@/lib/utils";
import Image from "next/image";

import SolanaBg from "@/assets/tech-bg/solana-bg.jpg";
import SolidityBg from "@/assets/tech-bg/ethereum-bg.jpg";
import RustBg from "@/assets/tech-bg/rust-bg.jpg";
import GoBg from "@/assets/tech-bg/go-bg.jpg";
import FrontendBg from "@/assets/tech-bg/frontend-bg.jpg";

type CardVariant =
  | "solana"
  | "solidity"
  | "rust"
  | "go"
  | "frontend"
  | "default";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
}
export function Card({ children, className, variant, ...props }: CardProps) {
  const bgImage = {
    solana: SolanaBg,
    solidity: SolidityBg,
    rust: RustBg,
    go: GoBg,
    frontend: FrontendBg,
    default: null,
  }[variant || "default"];

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden relative backdrop-blur-sm transition-[transform,border-color,background,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01]",
        "bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow-inner)] hover:border-[var(--card-border-hover)]",
        className
      )}
      {...props}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt=""
            fill
            className="opacity-70 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
