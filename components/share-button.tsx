'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button className="w-full" onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy Profile URL'}
    </Button>
  )
}
