import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "./util/session-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formaty",
  description: "Your Research partner",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
