"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut({callbackUrl: "/login"})
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Cargando...</div>; // o spinner
  }

  return <>{children}</>;
}