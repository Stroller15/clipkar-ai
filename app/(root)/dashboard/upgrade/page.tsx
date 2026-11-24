import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/custom/PageHeader";

export const metadata = { title: "Plans" };

const UpgradePage = () => {
  return (
    <div className="space-y-8">
      <PageHeader title="Plans" />
      <div className="max-w-xl rounded-2xl border border-border bg-card p-6">
        <p className="text-[13px] text-muted-foreground">Current plan</p>
        <p className="mt-1 text-[20px] font-medium leading-7">Free</p>
        <p className="mt-2 text-[15px] leading-[22px] text-subtle">
          Paid plans aren&apos;t available yet. You can keep creating shorts on
          the free plan in the meantime.
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <Link href="/dashboard/create">Create a short</Link>
        </Button>
      </div>
    </div>
  );
};

export default UpgradePage;
