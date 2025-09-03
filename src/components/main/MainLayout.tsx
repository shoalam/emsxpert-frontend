import React from 'react'
import Header from './Header'

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <>
    <Header />
    <div>{children}</div>
    </>
  )
}
