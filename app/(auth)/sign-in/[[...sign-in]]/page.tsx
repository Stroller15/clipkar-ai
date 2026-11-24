import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/custom/AuthShell";

export default function Page() {
  return (
    <AuthShell>
      <SignIn />
    </AuthShell>
  );
}
