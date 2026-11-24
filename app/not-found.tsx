import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/Brand";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-6 lg:px-8">
        <Logo />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <p className="font-mono text-[12px] text-muted-foreground">404</p>
        <h1 className="mt-3 text-[32px] font-medium leading-[1.15] tracking-[-0.02em]">
          This scene didn&apos;t make the cut
        </h1>
        <p className="mt-3 text-[15px] leading-[22px] text-subtle">
          The page you&apos;re looking for doesn&apos;t exist or has moved
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to home</Link>
        </Button>
      </main>
    </div>
  );
}
