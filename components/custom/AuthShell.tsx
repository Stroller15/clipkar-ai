import { Logo } from "./Brand";

export const AuthShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-6 lg:px-8">
      <Logo />
    </header>
    <main className="flex flex-1 items-center justify-center px-4 pb-16">{children}</main>
  </div>
);
