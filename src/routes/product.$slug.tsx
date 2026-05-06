import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { formatTZS } from "@/lib/products";
import { useProducts, findProduct } from "@/lib/productStore";
import { useI18n } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, MessageCircle, Truck, ShieldCheck, BadgePercent } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — TechZetu` },
      { property: "og:title", content: `${params.slug} — TechZetu` },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-display font-bold text-3xl">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-[var(--green)]">
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="text-sm text-[var(--text-muted)]">{error.message}</p>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { products } = useProducts();
  const { t, lang } = useI18n();
  const p = findProduct(products, slug);
  if (!p) throw notFound();

  const gallery = p.images && p.images.length > 0 ? p.images : [p.image];
  const [active, setActive] = useState(0);

  const msg = t("msg.product", { name: p.name, price: formatTZS(p.price) });
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-[var(--text-mid)] hover:text-[var(--foreground)]">
        <ArrowLeft className="w-4 h-4" /> {t("product.back")}
      </Link>

      <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="rounded-3xl overflow-hidden surface border border-[var(--border)] aspect-square">
            <img src={gallery[active]} alt={p.name} className="w-full h-full object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                    active === i ? "border-[var(--green)]" : "border-[var(--border)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt={`${p.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--green)]">{p.brand}</div>
          <h1 className="mt-2 font-display font-bold text-3xl sm:text-5xl leading-tight">{p.name}</h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display font-bold text-3xl text-[var(--green)]">{formatTZS(p.price)}</span>
            {p.oldPrice && (
              <span className="text-base text-[var(--text-muted)] line-through">{formatTZS(p.oldPrice)}</span>
            )}
            {p.oldPrice && (
              <span className="text-xs font-bold bg-[var(--amber)] text-black px-2 py-1 rounded-full">
                Save {formatTZS(p.oldPrice - p.price)}
              </span>
            )}
          </div>

          <div className="mt-3 inline-flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${p.stock > 5 ? "bg-[var(--green)]" : "bg-[var(--amber)]"}`} />
            <span className="text-[var(--text-mid)]">
              {p.stock > 5 ? t("product.stock") : t("product.lowStock")} · {p.stock}
            </span>
          </div>

          <p className="mt-6 text-[var(--text-mid)] leading-relaxed">{p.description[lang]}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink(msg)}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[var(--wa-green)] text-white px-6 py-3.5 font-semibold hover:opacity-90 transition shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)]"
            >
              <MessageCircle className="w-5 h-5" /> {t("cta.order")}
            </a>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Truck, label: t("product.delivery") },
              { icon: ShieldCheck, label: "100% authentic" },
              { icon: BadgePercent, label: "Pay on delivery" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="rounded-xl border border-[var(--border)] surface p-3 flex items-center gap-2 text-xs text-[var(--text-mid)]">
                <Icon className="w-4 h-4 text-[var(--green)] shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display font-semibold text-xl mb-4">{t("product.specs")}</h2>
            <dl className="rounded-2xl border border-[var(--border)] surface divide-y divide-[var(--border)]">
              {p.specs.map((s, i) => (
                <div key={i} className="grid grid-cols-2 px-4 py-3 text-sm">
                  <dt className="text-[var(--text-muted)]">{s.label[lang]}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-6">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
