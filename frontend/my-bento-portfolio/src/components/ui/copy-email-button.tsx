import { toast } from "react-hot-toast";
import { Mail } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!", {
      style: {
        background: "var(--card-bg)",
        color: "var(--text-heading)",
        border: "1px solid var(--card-border)",
        backdropFilter: "blur(8px)",
      },
      icon: "📧",
      duration: 2000,
    });
  };

  return (
    <button
      onClick={copyEmail}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      aria-label="Copy Email"
    >
      <Mail size={20} aria-hidden="true" />
    </button>
  );
}
