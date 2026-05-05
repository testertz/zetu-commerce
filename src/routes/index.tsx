import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { products, formatTZS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { waLink } from "@/lib/whatsapp";
import { MessageCircle, ShoppingBag, ShieldCheck, Truck, BadgePercent, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-radial">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-green)] bg-[var(--green-dim)] px-3 py-1 text-xs font-medium text-[var(--green)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
              {t("hero.tag")}
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              {t("hero.title1")}
              <br />
              <span className="text-[var(--text-mid)]">{t("hero.title2")}</span>
              <br />
              <span className="text-[var(--green)] text-glow">{t("hero.title3")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base lg:text-lg text-[var(--text-mid)] leading-relaxed">
              {t("hero.sub")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waLink(t("msg.general"))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--green)] text-[var(--primary-foreground)] px-6 py-3.5 font-semibold hover:bg-[var(--green-dark)] transition shadow-[0_10px_40px_-10px_rgba(0,232,122,0.6)]"
              >
                <MessageCircle className="w-5 h-5" />
                {t("cta.order")}
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3.5 font-semibold hover:border-[var(--border-green)] transition"
              >
                <ShoppingBag className="w-5 h-5" />
                {t("cta.browse")}
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[var(--green)]" /> 1,000+ orders delivered</span>
              <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-[var(--green)]" /> Same-day in Dar</span>
              <span className="flex items-center gap-2"><BadgePercent className="w-4 h-4 text-[var(--green)]" /> Pay on delivery</span>
            </div>
          </div>

          {/* Floating product preview */}
          <div className="lg:col-span-5 relative h-[420px] lg:h-[520px] hidden lg:block">
            <div className="absolute top-0 right-10 w-56 rounded-2xl surface border border-[var(--border)] p-4 animate-fade-up glow-green">
              <img src={products[0].image} alt="" className="w-full aspect-square rounded-xl object-cover" />
              <div className="mt-3 text-sm font-semibold">{products[0].name}</div>
              <div className="text-[var(--green)] text-sm font-bold">{formatTZS(products[0].price)}</div>
            </div>
            <div className="absolute top-32 left-0 w-52 rounded-2xl surface border border-[var(--border)] p-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <img src={products[3].image} alt="" className="w-full aspect-square rounded-xl object-cover" />
              <div className="mt-3 text-sm font-semibold">{products[3].name}</div>
              <div className="text-[var(--green)] text-sm font-bold">{formatTZS(products[3].price)}</div>
            </div>
            <div className="absolute bottom-0 right-0 w-60 rounded-2xl surface border border-[var(--border)] p-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <img src={products[2].image} alt="" className="w-full aspect-square rounded-xl object-cover" />
              <div className="mt-3 text-sm font-semibold">{products[2].name}</div>
              <div className="text-[var(--green)] text-sm font-bold">{formatTZS(products[2].price)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <div className="flex ticker-track py-4 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 px-6 text-sm text-[var(--text-mid)]">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> {t("ticker.delivered")}</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> {t("ticker.dar")}</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> {t("ticker.pod")}</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> {t("ticker.warranty")}</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> {t("ticker.sealed")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHY */}
      <section id="why" className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--green)]">{t("nav.trust")}</div>
          <h2 className="mt-3 font-display font-bold text-4xl sm:text-5xl">{t("why.title")}</h2>
          <p className="mt-3 text-[var(--text-mid)]">{t("why.sub")}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: MessageCircle, key: "1" },
            { icon: ShieldCheck, key: "2" },
            { icon: Truck, key: "3" },
            { icon: BadgePercent, key: "4" },
          ].map(({ icon: Icon, key }) => (
            <div key={key} className="rounded-2xl border border-[var(--border)] surface p-6 hover-lift">
              <div className="w-11 h-11 rounded-xl bg-[var(--green-dim)] grid place-items-center text-[var(--green)]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg">{t(`why.${key}.t`)}</h3>
              <p className="mt-2 text-sm text-[var(--text-mid)]">{t(`why.${key}.d`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--green)]">Shop</div>
            <h2 className="mt-3 font-display font-bold text-4xl sm:text-5xl">{t("products.title")}</h2>
            <p className="mt-2 text-[var(--text-mid)]">{t("products.sub")}</p>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--green)] hover:gap-2 transition-all">
            {t("cta.viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--green)]">Process</div>
          <h2 className="mt-3 font-display font-bold text-4xl sm:text-5xl">{t("how.title")}</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {["1", "2", "3"].map((k, i) => (
            <div key={k} className="rounded-2xl border border-[var(--border)] surface p-7 relative hover-lift">
              <div className="text-[var(--green)] font-display font-bold text-5xl opacity-30">0{i + 1}</div>
              <h3 className="mt-3 font-display font-semibold text-xl">{t(`how.${k}.t`)}</h3>
              <p className="mt-2 text-sm text-[var(--text-mid)]">{t(`how.${k}.d`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp preview */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="rounded-3xl border border-[var(--border-green)] gradient-radial p-8 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl">Just one message away.</h2>
            <p className="mt-3 text-[var(--text-mid)] max-w-md">
              No signup. No checkout. Tap the button — your message is pre-filled. We confirm and deliver, often the same day.
            </p>
            <a
              href={waLink(t("msg.general"))}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--wa-green)] text-white px-6 py-3.5 font-semibold hover:opacity-90 transition"
            >
              <MessageCircle className="w-5 h-5" /> {t("cta.chat")}
            </a>
          </div>
          <div className="rounded-2xl surface-2 border border-[var(--border)] p-5 text-sm space-y-3 max-w-md ml-auto w-full">
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm bg-[var(--wa-green)] text-white px-4 py-2 max-w-[80%]">
                Hi TechZetu, I want to order iPhone 15 Pro 256GB.
              </div>
            </div>
            <div className="flex">
              <div className="rounded-2xl rounded-tl-sm surface px-4 py-2 max-w-[80%]">
                Karibu! It's in stock at 2,850,000 TZS. Free delivery in Dar — when works for you?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm bg-[var(--wa-green)] text-white px-4 py-2">Today, 5pm 🙏</div>
            </div>
            <div className="flex">
              <div className="rounded-2xl rounded-tl-sm surface px-4 py-2">Confirmed ✅ See you then.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 text-center">
        <h2 className="font-display font-bold text-4xl sm:text-5xl">Ready to upgrade?</h2>
        <p className="mt-3 text-[var(--text-mid)] max-w-md mx-auto">Browse our shop or message us directly — your tech is one chat away.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="rounded-full border border-[var(--border)] px-6 py-3.5 font-semibold hover:border-[var(--border-green)] transition">
            {t("cta.browse")}
          </Link>
          <a href={waLink(t("msg.general"))} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--green)] text-[var(--primary-foreground)] px-6 py-3.5 font-semibold hover:bg-[var(--green-dark)] transition">
            {t("cta.order")}
          </a>
        </div>
      </section>
    </div>
  );
}
