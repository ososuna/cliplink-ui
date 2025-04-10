import * as React from "react"
import { Check, Copy } from 'lucide-react'
import { Input } from "@/presentation/styled-components"
import { cn } from "@/presentation/lib/utils"

interface CopyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export function CopyInput({ value, className, ...props }: CopyInputProps) {
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <Input
        type="text"
        readOnly
        value={value}
        className={cn(
          "pr-10 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          className
        )}
        onClick={handleCopy}
        {...props}
      />
      <div 
        className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        aria-hidden="true"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
        )}
      </div>
    </div>
  )
}