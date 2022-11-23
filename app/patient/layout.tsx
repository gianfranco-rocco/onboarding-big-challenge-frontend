'use client'

import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { MainLayout } from "../../components/layouts"
import { INavigation } from "../../components/ui"

const navigation: INavigation[] = [
  { name: 'Home', href: '/patient/submissions', icon: HomeIcon },
  { name: 'New submission', href: '/patient/submissions/create', icon: PlusCircleIcon },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout navigation={navigation} profilePageHref='/patient/profile'>{children}</MainLayout>
}
