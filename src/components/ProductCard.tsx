import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { formatTZS } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function ProductCard({ p }: { p: Product }) {
  const { t } = useI18n();
  const msg = t("msg.product", { name: p.name, price: formatTZS(p.price) });

  return (
    <div className="group relative rounded-2xl border border-[var(--border)] surface overflow-hidden hover-lift">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
        <div className="relative aspect-square overflow-hidden bg-[var(--surface2)]">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {p.oldPrice && (
            <span className="absolute top-3 left-3 text-xs font-semibold bg-[var(--amber)] text-black px-2 py-1 rounded-full">
              -{Math.round((1 - p.price / p.oldPrice) * 100)}%
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{p.brand}</div>
          <h3 className="mt-1 font-display font-semibold text-base leading-snug line-clamp-2">{p.name}</h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-semibold text-[var(--green)]">{formatTZS(p.price)}</span>
            {p.oldPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">{formatTZS(p.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <a
          href={waLink(msg)}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--wa-green)] text-white py-2.5 text-sm font-semibold hover:opacity-90 transition"
        >
          <MessageCircle className="w-4 h-4" />
          {t("cta.order")}
        </a>
      </div>
    </div>
  );
}
