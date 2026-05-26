import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return `${amount} ريال`
}

export function formatPriceWithSAR(amount: number): string {
  return `${amount} ر.س`
}

export function formatSavings(savings: number): string {
  return `وفّرت ${savings} ريال`
}
