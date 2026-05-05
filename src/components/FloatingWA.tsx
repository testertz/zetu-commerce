import { useI18n } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function FloatingWA() {
  const { t } = useI18n();
  return (
    <a
      href={waLink(t("msg.general"))}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[var(--wa-green)] text-white pl-3 pr-4 py-3 shadow-[0_10px_40px_-10px_rgba(37,211,102,0.7)] hover:scale-105 transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
}
