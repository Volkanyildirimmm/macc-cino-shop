import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const productHandles = [
    { handle: "matcha-konsantre-250ml", label: "Matcha 250ml" },
    { handle: "matcha-konsantre-500ml", label: "Matcha 500ml" },
    { handle: "matcha-konsantre-1000ml", label: "Matcha 1000ml" },
    { handle: "matcha-konsantre-1000ml-pompali", label: "Matcha 1000ml Pump" },
  ] as const;

  return (
    <footer style={{ backgroundColor: "#1A2E12" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" style={{ fontFamily: "var(--font-logo), 'Kaushan Script', cursive" }}>
                <span style={{ color: "#c9a961" }}>Macc</span>
                <span style={{ color: "#e6cc8a" }}> & </span>
                <span style={{ color: "#c9a961" }}>Cino</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {tFooter("tagline")}
            </p>
            <p className="text-white/30 text-xs mt-4">
              © {new Date().getFullYear()} macc-cino.com
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest opacity-60">
              {tFooter("products_title")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {productHandles.map((p) => (
                <li key={p.handle}>
                  <Link
                    href={{
                      pathname: "/urunler/[handle]",
                      params: { handle: p.handle },
                    }}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest opacity-60">
              {tFooter("info_title")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/iletisim"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>Ceremonial Grade · Organic · Made in Germany</span>
          </div>
          <p className="text-xs text-white/20">macc-cino.com</p>
        </div>
      </div>
    </footer>
  );
}
