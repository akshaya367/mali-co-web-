"use client";

import Toast from "./Toast";

// Supabase auth handles session state via hooks, no provider required here.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toast />
    </>
  );
}
