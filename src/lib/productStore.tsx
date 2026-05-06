import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products as seedProducts, type Product } from "./products";

const KEY = "tz-products-v1";

type Ctx = {
  products: Product[];
  upsert: (p: Product) => void;
  remove: (id: string) => void;
  reset: () => void;
};

const ProductCtx = createContext<Ctx | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<Product[]>(seedProducts);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setList(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Product[]) => {
    setList(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const upsert = (p: Product) => {
    const idx = list.findIndex((x) => x.id === p.id);
    const next = idx >= 0 ? list.map((x) => (x.id === p.id ? p : x)) : [p, ...list];
    persist(next);
  };

  const remove = (id: string) => persist(list.filter((p) => p.id !== id));

  const reset = () => persist(seedProducts);

  return (
    <ProductCtx.Provider value={{ products: list, upsert, remove, reset }}>
      {children}
    </ProductCtx.Provider>
  );
}

export const useProducts = () => {
  const c = useContext(ProductCtx);
  if (!c) throw new Error("useProducts must be inside ProductProvider");
  return c;
};

export const findProduct = (list: Product[], slug: string) => list.find((p) => p.slug === slug);
