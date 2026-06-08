import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LungLogoProps {
  className?: string
  /** Kept for compatibility with existing header/footer usage */
  variant?: 'brand' | 'light'
  priority?: boolean
}

export default function LungLogo({
  className,
  priority = false,
}: LungLogoProps) {
  return (
    <Image
      src="/images/nasama-logo.png"
      alt="شعار نَفَس"
      width={256}
      height={256}
      priority={priority}
      className={cn('h-full w-full object-contain', className)}
    />
  )
}
