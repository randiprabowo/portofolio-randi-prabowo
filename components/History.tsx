import type { Experience, Period, Skill, Education } from "@/lib/content-types";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";
import { safeUrl } from "@/lib/links";

export function period(item: Period, locale: Locale, current = false) {
  const format = (date?: string) =>
    date &&
    new Intl.DateTimeFormat(locale, {
      month: date.length === 4 ? undefined : "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));
  return [
    format(item.startDate),
    current ? ui[locale].current : format(item.endDate),
  ]
    .filter(Boolean)
    .join(" – ");
}
export function Experiences({
  items,
  locale,
}: {
  items: Experience[];
  locale: Locale;
}) {
  return (
    <ol className="history">
      {items.map((item) => (
        <li key={item._id}>
          <div className="entry-meta">
            <span>{item.company}</span>
            <small>{period(item, locale, item.isCurrent)}</small>
          </div>
          <div>
            <h2>{item.position?.[locale]}</h2>
            {item.location?.[locale] && <p>{item.location[locale]}</p>}
            {item.description?.[locale] && <p>{item.description[locale]}</p>}
            {item.highlights?.length ? (
              <ul className="bullets">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h[locale]}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
export function Skills({ items, locale }: { items: Skill[]; locale: Locale }) {
  if (!items.length) return null;
  return (
    <section className="section">
      <h2 className="section-title">{ui[locale].skills}</h2>
      {Object.entries(ui[locale].groups).map(([key, label]) => {
        const group = items.filter((item) => item.category === key);
        return (
          group.length > 0 && (
            <div className="skill-row" key={key}>
              <h3>{label}</h3>
              <ul>
                {group.map((item) => (
                  <li key={item._id}>
                    {item.name}
                    {item.level?.[locale] && (
                      <small> · {item.level[locale]}</small>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        );
      })}
    </section>
  );
}
export function EducationList({
  items,
  locale,
}: {
  items: Education[];
  locale: Locale;
}) {
  if (!items.length) return null;
  const kinds = ui[locale].educationKinds;
  return (
    <section className="section">
      <h2 className="section-title">{ui[locale].education}</h2>
      <ul className="history">
        {items.map((item) => (
          <li key={item._id}>
            <div className="entry-meta">
              <span>{item.institution}</span>
              <small>
                {[kinds[item.kind as keyof typeof kinds], period(item, locale)]
                  .filter(Boolean)
                  .join(" · ")}
              </small>
            </div>
            <div>
              <h3>{item.title?.[locale]}</h3>
              {item.description?.[locale] && <p>{item.description[locale]}</p>}
              {safeUrl(item.credentialUrl) && (
                <a className="inline-link" href={safeUrl(item.credentialUrl)}>
                  {ui[locale].credential}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
