// components/layouts/DashboardLayout.tsx — Production-ready layout

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect user to login if not authenticated and loading has finished
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // While checking auth state
  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Verifying authentication...
      </div>
    );
  }

  return (
    <div className="h-screen bg-background text-foreground pt-16"> {/* Removed flex and sidebar */}
      <main className="w-full max-w-7xl mx-auto overflow-y-auto p-6">{children}</main>
      <Toaster />
    </div>
  );
}
