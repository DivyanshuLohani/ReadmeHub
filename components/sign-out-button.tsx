"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
    })
    router.push("/")
    router.refresh()
  }

  return (
    <Button 
      variant="outline" 
      className="bg-white/10 text-white border-white/20 hover:bg-white/20"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  )
}
