import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useProducts } from "@/lib/productStore";
import { categories, formatTZS, type Product } from "@/lib/products";
import { useAdminAuth } from "@/lib/adminAuth";
import { Plus, Pencil, Trash2, X, RotateCcw, Upload, LogOut, Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — TechZetu" }, { name: "robots", content: "noindex" }] }),
  component: AdminGate,
});

function AdminGate() {
  const { isAuthed } = useAdminAuth();
  return isAuthed ? <AdminPage /> : <LoginScreen />;
}

function LoginScreen() {
  const { login } = useAdminAuth();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="mx-auto max-w-md px-5 py-24">
      <div className="rounded-2xl border border-[var(--border)] surface p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 grid place-items-center rounded-xl bg-[var(--surface2)]">
            <Lock className="w-5 h-5 text-[var(--green)]" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl">Admin login</h1>
            <p className="text-xs text-[var(--text-muted)]">Authorized staff only.</p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!login(pw)) setErr("Invalid password");
          }}
          className="mt-6 grid gap-3"
        >
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            placeholder="Password"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--border-green)]"
          />
          {err && <p className="text-xs text-[var(--amber)]">{err}</p>}
          <button type="submit" className="rounded-full bg-[var(--green)] text-[var(--primary-foreground)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--green-dark)]">
            Sign in
          </button>
          <p className="text-xs text-[var(--text-muted)] text-center mt-2">
            v1 local-only gate. Default password: <code className="text-[var(--text-mid)]">techzetu2026</code>
          </p>
        </form>
      </div>
    </div>
  );
}


const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type FormState = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Product["category"];
  price: string;
  oldPrice: string;
  stock: string;
  image: string;
  images: string[];
  descEn: string;
  descSw: string;
  specs: { label: string; value: string }[];
};

const empty: FormState = {
  id: "",
  slug: "",
  name: "",
  brand: "",
  category: "phones",
  price: "",
  oldPrice: "",
  stock: "0",
  image: "",
  images: [],
  descEn: "",
  descSw: "",
  specs: [{ label: "", value: "" }],
};

const toForm = (p: Product): FormState => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  brand: p.brand,
  category: p.category,
  price: String(p.price),
  oldPrice: p.oldPrice ? String(p.oldPrice) : "",
  stock: String(p.stock),
  image: p.image,
  images: p.images || [],
  descEn: p.description.en,
  descSw: p.description.sw,
  specs: p.specs.map((s) => ({ label: s.label.en, value: s.value })),
});

function AdminPage() {
  const { products, upsert, remove, reset } = useProducts();
  const { logout } = useAdminAuth();
  const [editing, setEditing] = useState<FormState | null>(null);

  const startNew = () => setEditing({ ...empty, id: crypto.randomUUID() });
  const startEdit = (p: Product) => setEditing(toForm(p));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || slugify(editing.name);
    const product: Product = {
      id: editing.id,
      slug,
      name: editing.name,
      brand: editing.brand,
      category: editing.category,
      price: Number(editing.price) || 0,
      oldPrice: editing.oldPrice ? Number(editing.oldPrice) : undefined,
      stock: Number(editing.stock) || 0,
      image: editing.image,
      images: editing.images.filter(Boolean),
      description: { en: editing.descEn, sw: editing.descSw || editing.descEn },
      specs: editing.specs
        .filter((s) => s.label && s.value)
        .map((s) => ({ label: { en: s.label, sw: s.label }, value: s.value })),
    };
    upsert(product);
    setEditing(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-4xl">Admin</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Local-only product management (v1). Saved in your browser.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { if (confirm("Reset to seed products?")) reset(); }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--border-green)]"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--border-green)]"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--green)] text-[var(--primary-foreground)] px-4 py-2 text-sm font-semibold hover:bg-[var(--green-dark)]"
          >
            <Plus className="w-4 h-4" /> New product
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--border)] surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--surface2)] text-[var(--text-muted)] text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3 hidden sm:table-cell">Category</th>
              <th className="text-right px-4 py-3">Price</th>
              <th className="text-right px-4 py-3 hidden sm:table-cell">Stock</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <Link to="/product/$slug" params={{ slug: p.slug }} className="font-medium hover:text-[var(--green)]">
                        {p.name}
                      </Link>
                      <div className="text-xs text-[var(--text-muted)]">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell capitalize text-[var(--text-mid)]">{p.category}</td>
                <td className="px-4 py-3 text-right">{formatTZS(p.price)}</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--border-green)]"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { if (confirm(`Delete ${p.name}?`)) remove(p.id); }}
                      className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--amber)] text-[var(--amber)]"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
          <form
            onSubmit={save}
            className="bg-[var(--background)] border border-[var(--border)] rounded-2xl w-full max-w-2xl my-8"
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h2 className="font-display font-bold text-xl">
                {products.find((p) => p.id === editing.id) ? "Edit product" : "New product"}
              </h2>
              <button type="button" onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-[var(--surface)]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 grid gap-4">
              <Field label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v, slug: editing.slug || slugify(v) })} required />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: slugify(v) })} required />
                <Field label="Brand" value={editing.brand} onChange={(v) => setEditing({ ...editing, brand: v })} required />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label>Category</Label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value as Product["category"] })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                  >
                    {categories.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>{c.en}</option>
                    ))}
                  </select>
                </div>
                <Field label="Price (TZS)" type="number" value={editing.price} onChange={(v) => setEditing({ ...editing, price: v })} required />
                <Field label="Old price" type="number" value={editing.oldPrice} onChange={(v) => setEditing({ ...editing, oldPrice: v })} />
              </div>
              <Field label="Stock" type="number" value={editing.stock} onChange={(v) => setEditing({ ...editing, stock: v })} required />
              <ImageUploader
                main={editing.image}
                gallery={editing.images}
                onChange={(image, images) => setEditing({ ...editing, image, images })}
              />
              <div>
                <Label>Description (EN)</Label>
                <textarea
                  value={editing.descEn}
                  onChange={(e) => setEditing({ ...editing, descEn: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <Label>Description (SW, optional)</Label>
                <textarea
                  value={editing.descSw}
                  onChange={(e) => setEditing({ ...editing, descSw: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>Specs</Label>
                  <button
                    type="button"
                    onClick={() => setEditing({ ...editing, specs: [...editing.specs, { label: "", value: "" }] })}
                    className="text-xs text-[var(--green)]"
                  >
                    + Add spec
                  </button>
                </div>
                <div className="mt-2 grid gap-2">
                  {editing.specs.map((s, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                      <input
                        value={s.label}
                        onChange={(e) => {
                          const next = [...editing.specs];
                          next[i] = { ...s, label: e.target.value };
                          setEditing({ ...editing, specs: next });
                        }}
                        placeholder="Label"
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                      />
                      <input
                        value={s.value}
                        onChange={(e) => {
                          const next = [...editing.specs];
                          next[i] = { ...s, value: e.target.value };
                          setEditing({ ...editing, specs: next });
                        }}
                        placeholder="Value"
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setEditing({ ...editing, specs: editing.specs.filter((_, j) => j !== i) })}
                        className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--amber)]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-5 border-t border-[var(--border)]">
              <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm">
                Cancel
              </button>
              <button type="submit" className="rounded-full bg-[var(--green)] text-[var(--primary-foreground)] px-5 py-2 text-sm font-semibold hover:bg-[var(--green-dark)]">
                Save product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{children}</label>;
}

function Field({
  label, value, onChange, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <Label>{label}{required && <span className="text-[var(--green)]"> *</span>}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--border-green)]"
      />
    </div>
  );
}
