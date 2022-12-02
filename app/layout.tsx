import React from 'react'
import { ToastContainer } from '@clientSidePackages'
import { Providers } from '@providers'
import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ToastContainer />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}