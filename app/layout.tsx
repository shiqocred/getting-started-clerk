import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/providers/toast-provider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Shiqocred",
    default: "Shiqocred",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
