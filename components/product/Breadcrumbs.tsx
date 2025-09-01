import Link from "next/link";

type Crumb = { href?: string; label: string; isCurrent?: boolean };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-600">
      <ol className="flex items-center gap-2">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href && !c.isCurrent ? (
              <Link href={c.href} className="hover:text-[var(--kk-brand)]">{c.label}</Link>
            ) : (
              <span aria-current={c.isCurrent ? "page" : undefined} className={c.isCurrent ? "text-black font-medium" : ""}>{c.label}</span>
            )}
            {i < items.length - 1 && <span className="text-[var(--kk-brand)]/60">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
