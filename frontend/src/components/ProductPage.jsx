import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDownpayment, setSelectedDownpayment] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products/${slug}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [slug]);

  useEffect(() => {
    setSelectedVariantIndex(0);
  }, [slug]);

  const variant = useMemo(() => {
    if (!product?.variants?.length) return null;
    return product.variants[selectedVariantIndex] || product.variants[0];
  }, [product, selectedVariantIndex]);

  const downpaymentOptions = useMemo(() => {
    if (!variant?.price) return [];
    const price = variant.price;
    return [
      {
        value: Math.round(price * 0.15),
        label: "Recommended",
      },
      {
        value: Math.round(price * 0.3),
        label: "Higher Savings",
      },
    ];
  }, [variant]);

  useEffect(() => {
    if (!variant?.emiPlans?.length) {
      setSelectedPlan(null);
      return;
    }

    const matchesCurrentPlan = selectedPlan
      ? variant.emiPlans.some(
          (plan) =>
            plan.tenure === selectedPlan.tenure &&
            plan.monthlyPayment === selectedPlan.monthlyPayment &&
            plan.interestRate === selectedPlan.interestRate
        )
      : false;

    if (!matchesCurrentPlan) {
      setSelectedPlan(variant.emiPlans[0]);
    }
  }, [variant, selectedPlan]);

  useEffect(() => {
    if (!downpaymentOptions.length) {
      setSelectedDownpayment(null);
      return;
    }

    const matchesCurrentDownpayment = selectedDownpayment
      ? downpaymentOptions.some((option) => option.value === selectedDownpayment.value)
      : false;

    if (!matchesCurrentDownpayment) {
      setSelectedDownpayment(downpaymentOptions[0]);
    }
  }, [downpaymentOptions, selectedDownpayment]);

  if (!product || !variant) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 lg:flex-row lg:items-start px-6">
        <div className="flex-1 w-full">
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 flex flex-col items-center">
            <div className="bg-linear-to-b from-white to-slate-100 rounded-3xl w-full flex justify-center p-6 md:p-10">
              <img
                src={`${API_BASE}${variant.image}`}
                alt={product.name}
                className="max-h-[360px] object-contain drop-shadow-xl"
              />
            </div>
            <div className="mt-8 text-center space-y-3">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
                {product.name}
              </h1>
              <p className="text-slate-500">
                Storage: {variant.storage} • Color: {variant.color}
              </p>
              <div className="flex items-center justify-center gap-3 text-xl md:text-2xl">
                <span className="text-slate-900 font-semibold">
                  {formatCurrency(variant.price)}
                </span>
                <span className="text-slate-400 line-through text-lg">
                  {formatCurrency(variant.mrp)}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {product.variants.map((option, index) => {
                  const isSelected = index === selectedVariantIndex;
                  const swatch = option.swatchColor || stringToColor(`${option.color}-${option.storage}`);
                  return (
                    <button
                      key={`${option.color}-${option.storage}`}
                      type="button"
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                        isSelected
                          ? "border-[#024c5f] bg-[#f1fcff] shadow-sm"
                          : "border-slate-200 bg-white hover:border-[#76c6e6]"
                      }`}
                      aria-pressed={isSelected}
                    >
                     
                      <span className="text-sm font-medium text-slate-700">
                        {option.color} · {option.storage}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-[#e8f5fb] border border-[#c5e6f5] rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">
                  Choose a Downpayment
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {downpaymentOptions.map((option) => {
                    const isSelected = selectedDownpayment?.value === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedDownpayment(option)}
                        className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                          isSelected
                            ? "bg-[#024c5f] text-white border-transparent shadow-md"
                            : "bg-white text-slate-700 border-[#c5e6f5] hover:border-[#76c6e6]"
                        }`}
                      >
                        <span className="block text-lg font-semibold">
                          {formatCurrency(option.value)}
                        </span>
                        <span className="block text-xs mt-1 opacity-80">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-slate-900">Choose EMI Tenure</p>
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                    0% EMI available
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {variant.emiPlans.map((plan, idx) => {
                    const isSelected = selectedPlan?.tenure === plan.tenure &&
                      selectedPlan?.monthlyPayment === plan.monthlyPayment;
                    const monthlyInterest = plan.interestRate
                      ? `${(plan.interestRate / plan.tenure).toFixed(2)}% per mon*`
                      : "0% EMI";

                    return (
                      <label
                        key={`${plan.tenure}-${plan.monthlyPayment}-${idx}`}
                        className={`flex items-center gap-4 rounded-2xl border px-4 py-4 cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#024c5f] bg-[#f1fcff] shadow-sm"
                            : "border-slate-200 hover:border-[#76c6e6]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="emi-tenure"
                          checked={isSelected}
                          onChange={() => setSelectedPlan(plan)}
                          className="accent-[#024c5f] h-5 w-5"
                        />
                        <div className="flex-1">
                          <p className="text-base font-semibold text-slate-900">
                            {formatCurrency(plan.monthlyPayment)} x {plan.tenure} months
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {monthlyInterest}
                            {plan.cashback && (
                              <span className="text-emerald-600 font-medium ml-2">
                                {plan.cashback} cashback
                              </span>
                            )}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <p className="text-[11px] text-slate-400 mt-3">
                  *Total extra payment per month / order value. EMIs starting 3rd Dec.
                </p>
              </div>

              <button
                disabled={!selectedPlan}
                className="w-full rounded-2xl bg-[#024c5f] text-white py-4 text-lg font-semibold shadow-lg transition hover:bg-[#03627a] disabled:opacity-60 disabled:hover:bg-[#024c5f]"
              >
                {selectedPlan
                  ? `Buy on ${selectedPlan.tenure} months EMI`
                  : "Choose an EMI plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
