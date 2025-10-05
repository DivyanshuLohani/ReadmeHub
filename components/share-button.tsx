"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Copy } from "lucide-react"

function ShareButton({ user }: { user: any }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.username} - README Contributions 🎃`,
          text: `Check out ${user.username}'s "valuable" contributions on ReadmeHub 🎉`,
          url: shareUrl,
        })
      } catch (err) {
        console.error("Share cancelled", err)
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      onClick={handleShare}
      className="flex items-center gap-2 bg-[#21262d] text-white border border-[#30363d] hover:bg-[#30363d]"
    >
      {copied ? <Copy size={18} /> : <Share2 size={18} />}
      {copied ? "Copied!" : "Share"}
    </Button>
  )
}

export default ShareButton
