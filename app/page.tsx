"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import {
  Search,
  Menu,
  X,
  Zap,
  Store,
  TrendingUp,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Camera,
  LayoutGrid,
  Tag,
  SlidersHorizontal,
  Timer,
  RefreshCw,
  Heart,
  Check,
} from "lucide-react";
import { notchStyle } from "@/lib/notch";
import Image from "next/image";
import SearchBarHome from "@/components/home/SearchBarHome";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-plex-mono",
});

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Stores", href: "#stores" },
  { label: "How It Works", href: "#how" },
  { label: "About", href: "#about" },
];

const CATEGORIES = [
  {
    icon: Smartphone,
    title: "Mobiles",
    desc: "Compare phone prices instantly",
  },
  { icon: Laptop, title: "Laptops", desc: "Find the best laptop deals" },
  { icon: Tablet, title: "Tablets", desc: "Screens sized for every budget" },
  {
    icon: Watch,
    title: "Smartwatches",
    desc: "Track fitness, track prices too",
  },
  {
    icon: Headphones,
    title: "Accessories",
    desc: "Earbuds, chargers, cases & more",
  },
  { icon: Camera, title: "Cameras", desc: "Compare specs before you shoot" },
];

const HOW_STEPS = [
  {
    num: "01",
    title: "Search a product",
    desc: "Type the phone, laptop or gadget you're eyeing — brand, model, or even just \u201cRedmi 13\u201d.",
  },
  {
    num: "02",
    title: "Compare prices from stores",
    desc: "We pull live listings from Nepali stores so you can see every price side by side.",
  },
  {
    num: "03",
    title: "Choose the best deal",
    desc: "Pick the cheapest trusted store, tap \u201cView Deal\u201d, and check out directly with them.",
  },
];

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Compare prices in one place",
    desc: "Every store's listing for a product, gathered in a single view — no tab-hopping.",
  },
  {
    icon: Tag,
    title: "Find the cheapest store",
    desc: "We highlight the lowest verified price automatically, so you don't have to hunt.",
  },
  {
    icon: SlidersHorizontal,
    title: "Check RAM/storage variants",
    desc: "Prices differ by variant. See 8/128, 12/256 and more, priced separately.",
  },
  {
    icon: Timer,
    title: "Save time and money",
    desc: "One search replaces an afternoon of comparing prices across apps and shops.",
  },
  {
    icon: RefreshCw,
    title: "Updated product prices",
    desc: "Prices are refreshed regularly so what you see closely reflects what you'll pay.",
  },
  {
    icon: Heart,
    title: "Built for Nepali shoppers",
    desc: "Nepali stores, Nepali rupees, Nepali shopping habits — designed around how you buy.",
  },
];

const PRODUCTS = [
  {
    brand: "Samsung",
    name: "Galaxy S25 Ultra",
    spec: "12GB / 256GB",
    store: "Lowest at Hukut",
    price: "Rs 1,79,900",
  },
  {
    brand: "Apple",
    name: "iPhone 15",
    spec: "128GB · Black",
    store: "Lowest at Yantra",
    price: "Rs 1,29,900",
  },
  {
    brand: "Xiaomi",
    name: "Redmi Note 13",
    spec: "8GB / 128GB",
    store: "Lowest at Daraz",
    price: "Rs 27,999",
  },
  {
    brand: "Nothing",
    name: "Nothing Phone (2a)",
    spec: "12GB / 256GB",
    store: "Lowest at GadgetByte",
    price: "Rs 54,500",
  },
];

const STORES = [
  { letter: "G", name: "GadgetByte Nepal", desc: "Tech news & store" },
  { letter: "H", name: "Hukut", desc: "Electronics retailer" },
  { letter: "Y", name: "Yantra", desc: "Gadgets & mobiles" },
  { letter: "D", name: "Daraz", desc: "Online marketplace" },
];

export default function KatiHoLandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/comparison?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div
      className={`${jakarta.variable} ${plexMono.variable} font-sans bg-canvas text-ink`}
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-2 sm:px-8">
          <a href="#home" className="flex items-center gap-2">
            <div className="relative h-16 w-32">
              <Image
                src="/katiho-logoo.png"
                alt="Kati Ho? logo"
                fill
                priority
                sizes="428px"
                className="object-contain"
              />
            </div>
          </a>

          <ul className="hidden items-center gap-8 text-[15px] font-semibold text-muted md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="/comparison"
              className="hidden rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_6px_18px_rgba(15,110,93,0.28)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:inline-flex"
            >
              Search Prices
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center md:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-line bg-surface px-5 pb-4 md:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-[15px] font-semibold text-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#search"
              onClick={() => setMenuOpen(false)}
              className="mt-4 block rounded-full bg-primary px-6 py-3 text-center text-sm font-bold text-white"
            >
              Search Prices
            </a>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="overflow-hidden px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20"
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
            {/* Left column */}
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-primary">
                🇳🇵 Made for Nepali shoppers
              </span>
              <h1 className="mb-5 text-[36px] font-extrabold leading-[1.08] tracking-tight sm:text-[46px] lg:text-[54px]">
                Compare Prices <br />
                Before You{" "}
                <span className="relative whitespace-nowrap">
                  <span className="absolute inset-x-0 bottom-1.5 -z-10 h-3.5 rounded bg-accent-light" />
                  Buy
                </span>
              </h1>
              <p className="mb-8 max-w-[520px] text-lg leading-relaxed text-muted">
                Kati Ho? helps you find the best prices for mobiles, gadgets,
                and electronics across trusted Nepali stores — in one search.
              </p>

              {/* Search box */}
              <SearchBarHome />
              <p className="mt-4 text-[15px] font-semibold text-primary-dark">
                Find cheaper deals. Compare variants. Save money.
              </p>

              {/* Trust badges */}
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] font-semibold text-muted">
                  <Zap size={15} className="text-primary" /> Real-time scraped
                  prices
                </span>
                <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] font-semibold text-muted">
                  <Store size={15} className="text-primary" /> Multiple Nepali
                  stores
                </span>
                <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] font-semibold text-muted">
                  <TrendingUp size={15} className="text-primary" /> Latest
                  product data
                </span>
              </div>
            </div>

            {/* Right column — signature "receipt" card */}
            <div className="relative flex justify-center">
              <div className="absolute -left-2 top-[6%] z-10 hidden -rotate-3 items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3 text-[13px] font-bold shadow-soft-md sm:flex">
                <span>💰</span> Save up to{" "}
                <span className="font-mono text-accent-dark">Rs 8,500</span>
              </div>

              <div className="relative w-full max-w-[360px] rotate-0 rounded-t-[18px] border border-b-0 border-line bg-surface p-6 pb-5 shadow-soft-lg sm:-rotate-2">
                <div className="mb-1 text-[13px] font-bold uppercase tracking-wide text-muted-light">
                  Price Check
                </div>
                <div className="mb-0.5 text-[19px] font-extrabold">
                  Samsung Galaxy S25 Ultra
                </div>
                <div className="mb-4 text-[13px] text-muted">
                  12GB / 256GB · Titanium Black
                </div>
                <hr className="my-3.5 border-t-[1.5px] border-dashed border-line" />

                <div className="flex items-center justify-between py-2 text-sm">
                  <span className="font-semibold text-muted">Daraz</span>
                  <span className="font-mono font-bold">Rs 1,89,999</span>
                </div>
                <div className="flex items-center justify-between py-2 text-sm">
                  <span className="font-semibold text-muted">Yantra</span>
                  <span className="font-mono font-bold">Rs 1,84,500</span>
                </div>
                <div className="-mx-3 mt-1.5 flex items-center justify-between rounded-[10px] bg-primary-light px-3 py-2.5 text-sm">
                  <span className="font-semibold text-primary-dark">
                    Hukut{" "}
                    <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#3A2600]">
                      Best
                    </span>
                  </span>
                  <span className="font-mono font-bold text-primary-dark">
                    Rs 1,79,900
                  </span>
                </div>

                {/* Receipt jagged edge */}
                <div
                  className="absolute -bottom-[13px] left-0 right-0 h-[14px] [filter:drop-shadow(0_6px_6px_rgba(18,33,29,0.06))]"
                  style={notchStyle("%23FFFFFF")}
                />
              </div>

              <div className="absolute -right-2 bottom-[2%] z-10 hidden -rotate-3 items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3 text-[13px] font-bold shadow-soft-md sm:flex">
                <Check size={16} className="text-primary" /> 4 stores compared
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="products" className="px-5 pb-20 pt-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHead
              eyebrow="Browse categories"
              title="What are you shopping for?"
              sub="Compare prices across the categories Nepali shoppers search for most."
            />
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="cursor-pointer rounded-2xl border border-line bg-surface p-6 text-center shadow-soft-sm transition-all hover:-translate-y-1.5 hover:border-primary hover:shadow-soft-md"
                >
                  <div className="mx-auto mb-3.5 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-primary-light text-primary">
                    <cat.icon size={24} />
                  </div>
                  <h3 className="mb-1 text-[15px] font-extrabold">
                    {cat.title}
                  </h3>
                  <p className="text-[12.5px] leading-tight text-muted-light">
                    {cat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="px-4 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1136px] rounded-[22px] bg-primary-dark px-6 py-11 sm:rounded-[32px] sm:px-10 sm:py-16">
            <SectionHead
              dark
              eyebrow="Simple process"
              title="How Kati Ho? works"
              sub="Three steps between you and the best price in Nepal."
            />
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
              {HOW_STEPS.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border border-white/15 bg-white/5 p-7"
                >
                  <span className="mb-4 block font-mono text-sm font-bold text-accent">
                    {step.num}
                  </span>
                  <h3 className="mb-2 text-[19px] font-extrabold text-white">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-white/[0.68]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHead
              eyebrow="Why Kati Ho?"
              title="Built for how Nepal actually shops"
              sub="No more opening five tabs and five apps to check one price."
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-line bg-surface p-7 shadow-soft-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent-dark">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="mb-2 text-[16.5px] font-extrabold">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCT PREVIEW — receipt-style ticket cards */}
        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHead
              eyebrow="Trending right now"
              title="Popular comparisons this week"
              sub="A sample of what shoppers are comparing on Kati Ho? today."
            />
            <div className="mx-auto grid max-w-[340px] grid-cols-1 gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.map((p) => (
                <div
                  key={p.name}
                  className="relative rounded-t-2xl border border-b-0 border-line bg-surface p-5 pb-4 shadow-soft-sm transition-all hover:-translate-y-1 hover:shadow-soft-md"
                >
                  <span className="mb-3 inline-block rounded-full bg-primary-light px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide text-primary">
                    {p.brand}
                  </span>
                  <h3 className="mb-0.5 text-[16.5px] font-extrabold leading-snug">
                    {p.name}
                  </h3>
                  <p className="mb-3.5 text-[12.5px] text-muted-light">
                    {p.spec}
                  </p>
                  <hr className="mb-3.5 border-t-[1.5px] border-dashed border-line" />
                  <div className="mb-1.5 text-[12.5px] font-semibold text-muted">
                    {p.store}
                  </div>
                  <div className="mb-4">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
                      Starting from
                    </span>
                    <span className="font-mono text-[22px] font-bold">
                      {p.price}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="block w-full rounded-full bg-primary py-2.5 text-center text-[13.5px] font-bold text-white transition-all hover:bg-primary-dark"
                  >
                    View Deal
                  </a>

                  <div
                    className="absolute -bottom-[12px] left-0 right-0 h-[13px] [filter:drop-shadow(0_4px_4px_rgba(18,33,29,0.05))]"
                    style={notchStyle("%23FFFFFF", 14, 13)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORES */}
        <section id="stores" className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="rounded-3xl border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12">
              <SectionHead
                eyebrow="Trusted network"
                title="Compare prices from popular Nepali tech stores"
                sub="We check listings across these stores — and we're always adding more."
                noMarginBottom
              />
              <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {STORES.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-2xl border border-line bg-canvas p-5 text-center"
                  >
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-base font-extrabold text-white">
                      {s.letter}
                    </div>
                    <h4 className="text-[13.5px] font-bold">{s.name}</h4>
                    <p className="mt-1 text-[11.5px] text-muted-light">
                      {s.desc}
                    </p>
                  </div>
                ))}
                <div className="rounded-2xl border border-line bg-canvas p-5 text-center">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-base font-extrabold text-[#3A2600]">
                    +
                  </div>
                  <h4 className="text-[13.5px] font-bold">More coming soon</h4>
                  <p className="mt-1 text-[11.5px] text-muted-light">
                    New stores added often
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="about" className="px-4 pb-24 sm:px-8">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[22px] bg-gradient-to-br from-primary to-primary-dark px-6 py-14 text-center sm:rounded-[32px] sm:px-10 sm:py-[70px]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0, transparent 40%), radial-gradient(circle at 85% 75%, rgba(240,162,2,0.18) 0, transparent 45%)",
              }}
            />
            <h2 className="relative mb-3.5 text-[28px] font-extrabold text-white sm:text-[40px]">
              Ready to find the best price?
            </h2>
            <p className="relative mx-auto mb-7 max-w-[480px] text-[17px] leading-relaxed text-white/[0.78]">
              Search once and compare prices across multiple Nepali stores —
              free, fast, and built for how you shop.
            </p>
            <a
              href="/comparison"
              className="relative inline-flex rounded-full bg-accent px-7 py-3.5 text-[15px] font-bold text-[#3A2600] shadow-[0_6px_18px_rgba(240,162,2,0.32)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              Start Searching
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="px-5 pb-8 pt-4 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-10 border-b border-line pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a
                href="#home"
                className="flex items-center gap-2 text-lg font-extrabold"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-primary font-mono text-sm font-bold text-white">
                  Ki?
                </span>
                Kati <span className="text-accent-dark">Ho?</span>
              </a>
              <p className="mt-3.5 max-w-[280px] text-sm leading-relaxed text-muted">
                Nepal&apos;s price comparison platform for mobiles, laptops,
                gadgets and electronics. Search once, compare everywhere, buy
                smart.
              </p>
            </div>

            <FooterCol
              title="Explore"
              links={[
                { label: "Products", href: "#products" },
                { label: "Stores", href: "#stores" },
                { label: "How It Works", href: "#how" },
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                { label: "About", href: "#about" },
                { label: "Contact", href: "#" },
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Use", href: "#" },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-7 text-[13.5px] text-muted-light">
            <span>© 2026 Kati Ho?. All rights reserved.</span>
            <span>Made with 💚 in Nepal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  dark = false,
  noMarginBottom = false,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  dark?: boolean;
  noMarginBottom?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center ${
        noMarginBottom ? "mb-0" : "mb-11 sm:mb-[52px]"
      }`}
    >
      <span
        className={`mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-wide ${
          dark ? "bg-white/[0.12] text-white" : "bg-primary-light text-primary"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mb-3.5 text-[28px] font-extrabold leading-tight tracking-tight sm:text-[36px] lg:text-[40px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <p
        className={`max-w-[520px] text-[17px] leading-relaxed ${
          dark ? "text-white/[0.72]" : "text-muted"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-muted-light">
        {title}
      </h4>
      <ul className="flex flex-col gap-[11px]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[14.5px] font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
