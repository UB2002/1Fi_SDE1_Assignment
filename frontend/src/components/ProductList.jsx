import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://onefi-sde1-assignment.onrender.com";

const stringToColor = (text = "") => {
  if (!text) return "#cbd5f5";
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 65%)`;
};

const formatCurrency = (value) =>
  value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const processedProducts = useMemo(
    () =>
      products.map((product) => {
        const prices = product.variants?.map((variant) => variant.price) || [];
        const lowestPrice = prices.length ? Math.min(...prices) : null;
        const highestPrice = prices.length ? Math.max(...prices) : null;

        return {
          ...product,
          lowestPrice,
          highestPrice,
          primaryVariant: product.variants?.[0],
        };
      }),
    [products]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Latest Flagship Phones</h1>
          <p className="text-sm text-slate-500">
            Discover flexible payment options and color choices tailored for every flagship model.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {processedProducts.map((product) => {
            const { slug, name, description, primaryVariant, lowestPrice, highestPrice } = product;

            return (
              <Link
                key={slug}
                to={`/products/${slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="bg-linear-to-b from-white to-slate-100 px-6 pt-8 pb-4">
                  {primaryVariant?.image ? (
                    <img
                      src={`${API_BASE}${primaryVariant.image}`}
                      alt={name}
                      className="mx-auto h-56 w-full max-w-[220px] object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="mx-auto flex h-56 w-full max-w-[220px] items-center justify-center text-sm text-slate-400">
                      Image unavailable
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6">
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-slate-900 transition group-hover:text-[#024c5f]">
                      {name}
                    </h2>
                    {product.variants?.length ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-[3px] text-xs font-medium text-emerald-600">
                        {product.variants.length} variants
                      </span>
                    ) : null}
                  </div>

                  {description ? (
                    <p className="mt-2 min-h-[42px] text-sm text-slate-500 overflow-hidden">
                      {description}
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-col gap-1">
                    {lowestPrice !== null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-semibold text-slate-900">
                          {formatCurrency(lowestPrice)}
                        </span>
                        {highestPrice !== null && highestPrice !== lowestPrice ? (
                          <span className="text-xs text-slate-400">
                            up to {formatCurrency(highestPrice)}
                          </span>
                        ) : null}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">Pricing unavailable</span>
                    )}
                    <span className="text-xs text-slate-400">Includes flexible EMI options</span>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex flex-col text-xs text-slate-400">
                      <span>EMI plans from launch partners</span>
                      <span>Tap to explore more</span>
                    </div>
                    <span className="rounded-full bg-[#024c5f] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#03627a]">
                      View details
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
