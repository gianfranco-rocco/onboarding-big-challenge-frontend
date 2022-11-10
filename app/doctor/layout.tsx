'use client'

import { FolderIcon, HomeIcon } from "@heroicons/react/24/outline"
import { MainLayout } from "../../components/layouts"
import { INavigation } from "../../components/ui"

const navigation: INavigation[] = [
  { name: 'Home', href: '/doctor/submissions', icon: HomeIcon },
  { name: 'Task history', href: '/doctor/task-history', icon: FolderIcon },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout navigation={navigation}>{children}</MainLayout>
}
