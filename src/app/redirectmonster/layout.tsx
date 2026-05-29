import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redirect Monster',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RedirectMonsterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
