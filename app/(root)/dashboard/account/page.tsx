"use client";
import { UserProfile } from "@clerk/nextjs";
import { PageHeader } from "@/components/custom/PageHeader";

const AccountPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader title="Account" />
      <UserProfile
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "w-full max-w-none shadow-none border border-border rounded-2xl",
          },
        }}
      />
    </div>
  );
};

export default AccountPage;
