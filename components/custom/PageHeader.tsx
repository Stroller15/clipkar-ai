export const PageHeader = ({
  title,
  meta,
  description,
  action,
}: {
  title: string;
  meta?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-[28px] font-medium leading-[1.15] tracking-[-0.01em]">
        {title}
        {meta !== undefined && (
          <span className="ml-3 font-mono text-[14px] font-normal tracking-normal text-muted-foreground tabular-nums">
            {meta}
          </span>
        )}
      </h1>
      {description && (
        <p className="mt-2 text-[15px] leading-[22px] text-subtle">{description}</p>
      )}
    </div>
    {action}
  </div>
);
