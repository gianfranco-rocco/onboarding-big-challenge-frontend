'use client'

import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { MainLayout } from "@components/layouts"
import { INavigation } from "@components/ui"
import { paths } from "@utils"

const { patient } = paths

const navigation: INavigation[] = [
  { name: 'Home', href: patient.home, icon: HomeIcon },
  { name: 'New submission', href: patient.createSubmission, icon: PlusCircleIcon },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout navigation={navigation} profilePageHref={patient.profile}>{children}</MainLayout>
}
