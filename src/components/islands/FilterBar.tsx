import type { FacetGroup, Locale } from "../../i18n/utils";
import { formatFacet, t } from "../../i18n/utils";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  muscle: string | null;
  onMuscleChange: (v: string | null) => void;
  equipment: string | null;
  onEquipmentChange: (v: string | null) => void;
  level: string | null;
  onLevelChange: (v: string | null) => void;
  category: string | null;
  onCategoryChange: (v: string | null) => void;
  muscles: string[];
  equipmentOptions: string[];
  levels: string[];
  categories: string[];
  onReset: () => void;
  locale: Locale;
};

const orNull = (v: string) => (v === "" ? null : v);

export default function FilterBar(props: Props) {
  const hasActive =
    props.query !== "" ||
    props.muscle !== null ||
    props.equipment !== null ||
    props.level !== null ||
    props.category !== null;

  return (
    <div className="sticky top-0 z-30 -mx-6 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 14l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={props.query}
            onChange={(e) => props.onQueryChange(e.target.value)}
            placeholder={t(props.locale, "filters.searchPlaceholder")}
            aria-label={t(props.locale, "filters.searchAria")}
            className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder-[var(--color-muted)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap">
          <Select
            label={t(props.locale, "filters.muscle.label")}
            allLabel={t(props.locale, "filters.muscle.all")}
            value={props.muscle ?? ""}
            onChange={(v) => props.onMuscleChange(orNull(v))}
            options={props.muscles}
            facetGroup="muscle"
            locale={props.locale}
          />
          <Select
            label={t(props.locale, "filters.equipment.label")}
            allLabel={t(props.locale, "filters.equipment.all")}
            value={props.equipment ?? ""}
            onChange={(v) => props.onEquipmentChange(orNull(v))}
            options={props.equipmentOptions}
            facetGroup="equipment"
            locale={props.locale}
          />
          <Select
            label={t(props.locale, "filters.level.label")}
            allLabel={t(props.locale, "filters.level.all")}
            value={props.level ?? ""}
            onChange={(v) => props.onLevelChange(orNull(v))}
            options={props.levels}
            facetGroup="level"
            locale={props.locale}
          />
          <Select
            label={t(props.locale, "filters.category.label")}
            allLabel={t(props.locale, "filters.category.all")}
            value={props.category ?? ""}
            onChange={(v) => props.onCategoryChange(orNull(v))}
            options={props.categories}
            facetGroup="category"
            locale={props.locale}
          />
        </div>

        {hasActive && (
          <button
            type="button"
            onClick={props.onReset}
            className="rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {t(props.locale, "filters.reset")}
          </button>
        )}
      </div>

    </div>
  );
}

function Select({
  label,
  allLabel,
  value,
  onChange,
  options,
  facetGroup,
  locale,
}: {
  label: string;
  allLabel: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  facetGroup: FacetGroup;
  locale: Locale;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="select-dark rounded-full border border-[var(--color-border)] py-3 pl-4 text-sm text-[var(--color-text)]"
    >
      <option value="">{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {formatFacet(locale, facetGroup, o)}
        </option>
      ))}
    </select>
  );
}
