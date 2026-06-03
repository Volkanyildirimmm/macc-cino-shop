import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { fetchCategories } from "@/lib/medusa-fetch";

export async function Categories() {
  const [categories, t] = await Promise.all([
    fetchCategories(),
    getTranslations("categories"),
  ]);

  if (categories.length === 0) return null;

  return (
    <section
      id="kategoriler"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2D5016] mb-4">
            {t("section_label")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1A1A1A] tracking-tight">
            {t("title")}
          </h2>
          <p className="text-[#4A4A4A] mt-4 max-w-xl mx-auto text-sm sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={{
                pathname: "/kategori/[handle]",
                params: { handle: cat.handle },
              }}
              className="group bg-white border border-[#E8E6E0] rounded-2xl p-6 sm:p-8 text-center hover:border-[#2D5016] hover:shadow-lg transition-all duration-300"
            >
              <h3
                className="font-display font-semibold text-lg sm:text-xl mb-2 group-hover:text-[#2D5016] transition-colors"
                style={{ color: "#1A1A1A" }}
              >
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-[#8A8A7A] text-xs sm:text-sm line-clamp-2">
                  {cat.description}
                </p>
              )}
              <span className="inline-block mt-4 text-[#2D5016] text-sm font-medium">
                {t("explore_link")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
