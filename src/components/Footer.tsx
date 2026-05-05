import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--green)]" />
            TechZetu
          </div>
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xs">{t("footer.tag")}</p>
        </div>
        <div className="text-sm space-y-2">
          <div className="text-[var(--text-muted)] uppercase tracking-wider text-xs mb-3">Shop</div>
          <a href="/shop" className="block text-[var(--text-mid)] hover:text-[var(--foreground)]">Phones</a>
          <a href="/shop" className="block text-[var(--text-mid)] hover:text-[var(--foreground)]">Laptops</a>
          <a href="/shop" className="block text-[var(--text-mid)] hover:text-[var(--foreground)]">Audio</a>
        </div>
        <div className="text-sm space-y-2">
          <div className="text-[var(--text-muted)] uppercase tracking-wider text-xs mb-3">Contact</div>
          <p className="text-[var(--text-mid)]">Dar es Salaam, Tanzania</p>
          <p className="text-[var(--text-mid)]">WhatsApp: +255 000 000 000</p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-5 text-center text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} TechZetu. {t("footer.rights")}
      </div>
    </footer>
  );
}
