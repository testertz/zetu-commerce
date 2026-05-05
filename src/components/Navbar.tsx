import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Sun, Moon, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

export function Navbar() {
  const { t, lang, setLang, theme, toggleTheme } = useI18n();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--background)]/70 border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--green)] shadow-[0_0_12px_var(--green)]" />
          TechZetu
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-mid)]">
          <Link to="/shop" className="hover:text-[var(--foreground)] transition-colors">
            {t("nav.shop")}
          </Link>
          <a href="/#how" className="hover:text-[var(--foreground)] transition-colors">
            {t("nav.how")}
          </a>
          <a href="/#why" className="hover:text-[var(--foreground)] transition-colors">
            {t("nav.trust")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center text-xs rounded-full border border-[var(--border)] overflow-hidden">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition ${lang === "en" ? "bg-[var(--green)] text-[var(--primary-foreground)]" : "text-[var(--text-mid)]"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("sw")}
              className={`px-3 py-1.5 transition ${lang === "sw" ? "bg-[var(--green)] text-[var(--primary-foreground)]" : "text-[var(--text-mid)]"}`}
            >
              SW
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 grid place-items-center rounded-full border border-[var(--border)] hover:border-[var(--border-green)] transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href={waLink(t("msg.general"))}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[var(--green)] text-[var(--primary-foreground)] px-4 py-2 text-sm font-semibold hover:bg-[var(--green-dark)] transition"
          >
            <MessageCircle className="w-4 h-4" />
            {t("cta.chat")}
          </a>
        </div>
      </div>
    </header>
  );
}
