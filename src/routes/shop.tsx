import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { products, categories, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useI18n } from "@/lib/i18n";
import { Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — TechZetu" },
      { name: "description", content: "Browse phones, laptops, audio gear and more. Order via WhatsApp." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { t, lang } = useI18n();
  const [cat, setCat] = useState<Product["category"] | "all">("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = products;
    if (cat !== "all") l = l.filter((p) => p.category === cat);
    const query = q.trim().toLowerCase();
    if (query) {
      // smart query: "phones under 500K"
      const underMatch = query.match(/under\s+(\d+)\s*(k|m)?/);
      if (underMatch) {
        const n = parseInt(underMatch[1]);
        const mult = underMatch[2] === "m" ? 1_000_000 : underMatch[2] === "k" ? 1000 : 1;
        const max = n * mult;
        l = l.filter((p) => p.price <= max);
      }
      l = l.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.includes(query) ||
          underMatch,
      );
    }
    return l;
  }, [cat, q]);

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
      <h1 className="font-display font-bold text-4xl sm:text-5xl">{t("shop.title")}</h1>

      <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                cat === c.id
                  ? "bg-[var(--green)] text-[var(--primary-foreground)] border-[var(--green)]"
                  : "border-[var(--border)] text-[var(--text-mid)] hover:border-[var(--border-green)]"
              }`}
            >
              {c[lang]}
            </button>
          ))}
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("shop.search")}
            className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--border-green)]"
          />
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-[var(--text-muted)]">{t("shop.empty")}</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
