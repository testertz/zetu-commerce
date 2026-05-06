import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { categories, type Product, formatTZS } from "@/lib/products";
import { useProducts } from "@/lib/productStore";
import { ProductCard } from "@/components/ProductCard";
import { useI18n } from "@/lib/i18n";
import { Search, SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — TechZetu" },
      { name: "description", content: "Browse phones, laptops, audio gear and more. Order via WhatsApp." },
    ],
  }),
  component: ShopPage,
});

const PAGE_SIZE = 8;

function ShopPage() {
  const { t, lang } = useI18n();
  const { products } = useProducts();
  const [cat, setCat] = useState<Product["category"] | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  const priceBounds = useMemo(() => {
    if (products.length === 0) return [0, 0] as const;
    const ps = products.map((p) => p.price);
    return [Math.min(...ps), Math.max(...ps)] as const;
  }, [products]);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const list = useMemo(() => {
    let l = products;
    if (cat !== "all") l = l.filter((p) => p.category === cat);
    const query = q.trim().toLowerCase();
    if (query) {
      const underMatch = query.match(/under\s+(\d+)\s*(k|m)?/);
      if (underMatch) {
        const n = parseInt(underMatch[1]);
        const mult = underMatch[2] === "m" ? 1_000_000 : underMatch[2] === "k" ? 1000 : 1;
        l = l.filter((p) => p.price <= n * mult);
      }
      const cleaned = query.replace(/under\s+\d+\s*(k|m)?/, "").trim();
      if (cleaned) {
        l = l.filter(
          (p) =>
            p.name.toLowerCase().includes(cleaned) ||
            p.brand.toLowerCase().includes(cleaned) ||
            p.category.includes(cleaned),
        );
      }
    }
    if (minPrice !== "") l = l.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") l = l.filter((p) => p.price <= Number(maxPrice));

    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [products, cat, q, minPrice, maxPrice, sort]);

  const shown = list.slice(0, visible);
  const hasMore = visible < list.length;

  const resetFilters = () => {
    setCat("all");
    setQ("");
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
      <h1 className="font-display font-bold text-4xl sm:text-5xl">{t("shop.title")}</h1>
      <p className="mt-3 text-[var(--text-mid)]">
        {list.length} {list.length === 1 ? "result" : "results"}
        {priceBounds[0] > 0 && (
          <span className="text-[var(--text-muted)]"> · {formatTZS(priceBounds[0])} – {formatTZS(priceBounds[1])}</span>
        )}
      </p>

      <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCat(c.id); setVisible(PAGE_SIZE); }}
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
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setVisible(PAGE_SIZE); }}
              placeholder={t("shop.search")}
              className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--border-green)]"
            />
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2.5 text-sm hover:border-[var(--border-green)]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 rounded-2xl border border-[var(--border)] surface p-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Min price (TZS)</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value === "" ? "" : Number(e.target.value)); setVisible(PAGE_SIZE); }}
              placeholder={String(priceBounds[0])}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-green)]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Max price (TZS)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value === "" ? "" : Number(e.target.value)); setVisible(PAGE_SIZE); }}
              placeholder={String(priceBounds[1])}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-green)]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-green)]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--foreground)]"
            >
              <X className="w-3 h-3" /> Reset filters
            </button>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <p className="mt-16 text-center text-[var(--text-muted)]">{t("shop.empty")}</p>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {shown.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold hover:border-[var(--border-green)] transition"
              >
                Load more ({list.length - visible} left)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
