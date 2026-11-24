export const Field = ({
  step,
  title,
  hint,
  id,
  children,
}: {
  step: string;
  title: string;
  hint: string;
  id: string;
  children: React.ReactNode;
}) => (
  <section aria-labelledby={id} className="py-8 first:pt-0">
    <div className="flex gap-3">
      <span className="pt-[3px] font-mono text-[12px] text-muted-foreground">{step}</span>
      <div>
        <h2 id={id} className="text-[17px] font-medium leading-6">
          {title}
        </h2>
        <p className="mt-1 text-[14px] leading-5 text-subtle">{hint}</p>
      </div>
    </div>
    <div className="mt-4 sm:pl-7">{children}</div>
  </section>
);

export const chipClass = (selected: boolean) =>
  [
    "inline-flex h-9 items-center rounded-lg border px-3 text-[14px] transition-colors",
    selected
      ? "border-caption/60 bg-caption/10 text-foreground"
      : "border-border bg-card text-subtle hover:border-foreground/20 hover:text-foreground",
  ].join(" ");
