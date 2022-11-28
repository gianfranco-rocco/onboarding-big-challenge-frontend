'use client'

import { FolderIcon, HomeIcon } from "@heroicons/react/24/outline"
import { MainLayout } from "../../components/layouts"
import { INavigation } from "../../components/ui"
import paths from "../../utils/paths"

const { doctor } = paths

const navigation: INavigation[] = [
  { name: 'Home', href: doctor.home, icon: HomeIcon },
  { name: 'Task history', href: doctor.taskHistory, icon: FolderIcon },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout navigation={navigation}>{children}</MainLayout>
}
