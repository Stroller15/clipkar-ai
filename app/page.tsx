"use client";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <UserButton />
    </div>
  );
}
