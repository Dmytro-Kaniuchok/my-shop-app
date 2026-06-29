"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./Hero.module.css";
import { LuSearch, LuCar, LuCalendar, LuChevronDown } from "react-icons/lu";
import SearchInput from "../SearchInput/SearchInput";

const CAR_BRANDS = [
  "Toyota",
  "BMW",
  "Volkswagen",
  "Ford",
  "Audi",
  "Mercedes-Benz",
  "Honda",
  "Hyundai",
  "Kia",
  "Skoda",
  "Renault",
  "Peugeot",
  "Opel",
  "Mazda",
  "Nissan",
  "Mitsubishi",
  "Subaru",
  "Lexus",
  "Volvo",
  "Fiat",
];

const CAR_MODELS: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Land Cruiser", "Yaris", "Highlander"],
  BMW: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X6"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "Touareg", "Jetta"],
  Ford: ["Focus", "Fiesta", "Mondeo", "Kuga", "Explorer", "Mustang"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLC", "A-Class"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Pilot"],
  Hyundai: ["i30", "Elantra", "Tucson", "Santa Fe", "Sonata"],
  Kia: ["Ceed", "Sportage", "Sorento", "Rio", "Stinger"],
  Skoda: ["Octavia", "Fabia", "Superb", "Kodiaq", "Karoq"],
  Renault: ["Megane", "Logan", "Duster", "Clio", "Kadjar"],
  Peugeot: ["206", "307", "308", "3008", "5008"],
  Opel: ["Astra", "Corsa", "Insignia", "Mokka", "Zafira"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-3", "MX-5"],
  Nissan: ["Juke", "Qashqai", "X-Trail", "Leaf", "Navara"],
  Mitsubishi: ["Lancer", "Outlander", "ASX", "Pajero", "Eclipse Cross"],
  Subaru: ["Impreza", "Forester", "Outback", "Legacy", "XV"],
  Lexus: ["IS", "ES", "RX", "NX", "GX"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90"],
  Fiat: ["Punto", "500", "Bravo", "Tipo", "Doblo"],
};

const YEARS = Array.from({ length: 30 }, (_, i) => String(2025 - i));

interface PillDropdownProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
  disabled?: boolean;
}

function PillDropdown({
  icon,
  label,
  value,
  options,
  onSelect,
  disabled,
}: PillDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={css.pillWrap} ref={ref}>
      <button
        type="button"
        className={`${css.pill} ${value ? css.pillActive : ""} ${disabled ? css.pillDisabled : ""}`}
        onClick={() => !disabled && setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {icon}
        <span>{value || label}</span>
        <LuChevronDown
          size={12}
          className={`${css.pillChevron} ${open ? css.pillChevronOpen : ""}`}
        />
      </button>

      {open && (
        <ul className={css.pillMenu} role="listbox">
          {value && (
            <li
              className={css.pillClear}
              onClick={() => {
                onSelect("");
                setOpen(false);
              }}
            >
              Скинути
            </li>
          )}
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={`${css.pillItem} ${value === opt ? css.pillItemSelected : ""}`}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Hero() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();

  const handleBrandChange = (val: string) => {
    setBrand(val);
    setModel("");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set("carBrand", brand);
    if (model) params.set("carModel", model);
    if (year) params.set("year", year);
    router.push(`/catalog?${params.toString()}`);
  };

  const models = brand ? (CAR_MODELS[brand] ?? []) : [];
  const hasFilters = !!(brand || year);

  return (
    <section className={css.hero}>
      <div className={css.heroContainer}>
        <div className={css.left}>
          <h1 className={css.title}>Запчастини для вас швидко і зручно</h1>

          <p className={css.description}>
            Широкий асортимент запчастин від провідних виробників
          </p>

          {/* SEARCH BAR */}
          <div className={css.searchBar}>
            <LuSearch size={17} className={css.searchIcon} />

            <SearchInput />

            <div className={css.sep} />

            <div className={css.pills}>
              <PillDropdown
                icon={<LuCar size={14} />}
                label="Марка"
                value={brand}
                options={CAR_BRANDS}
                onSelect={handleBrandChange}
              />

              {brand && (
                <PillDropdown
                  icon={<LuCar size={14} />}
                  label="Модель"
                  value={model}
                  options={models}
                  onSelect={setModel}
                />
              )}

              <PillDropdown
                icon={<LuCalendar size={14} />}
                label="Рік"
                value={year}
                options={YEARS}
                onSelect={setYear}
              />
            </div>

            <div className={css.sep} />

            <button
              className={css.searchBtn}
              onClick={handleSearch}
              type="button"
            >
              <LuSearch size={15} />
              <span>Пошук</span>
            </button>
          </div>

          {hasFilters && (
            <div className={css.activeFilters}>
              {brand && (
                <span className={css.filterTag}>
                  {brand}
                  {model ? ` · ${model}` : ""}
                </span>
              )}
              {year && <span className={css.filterTag}>{year}</span>}
              <button
                className={css.clearAll}
                onClick={() => {
                  setBrand("");
                  setModel("");
                  setYear("");
                }}
              >
                Скинути все
              </button>
            </div>
          )}

          <div className={css.actions}>
            <Link href="/catalog" className={css.сatalogBtn}>
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
