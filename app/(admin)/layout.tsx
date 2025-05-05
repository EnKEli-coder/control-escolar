"use client"

import { Button } from "@/components/ui/button";
import AuthGuard from "@/contexts/authProvider";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <header className="w-screen h-fit p-4 flex gap-8 border-b">
        <div className="flex gap-8 items-center m-auto">
          <Link href="/personal">
            Personal
          </Link>
          <Link href="/tipos-personal">
            Tipos de personal
          </Link>
          <Link href="/alumnos">
            Alumnos
          </Link>
        </div>
        <Button className="self-end ml-auto mr-4" onClick={() => signOut({callbackUrl: "/login"})}>
          <LogOut/>
          Cerrar sesión
        </Button>
      </header>
      {children}
    </AuthGuard>
  )
    
}