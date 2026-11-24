import { SignUp } from "@clerk/nextjs";
import { AuthShell } from "@/components/custom/AuthShell";

export default function Page() {
  return (
    <AuthShell>
      <SignUp />
    </AuthShell>
  );
}
