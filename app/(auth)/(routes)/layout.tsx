import { Metadata } from "next";
import Link from "next/link";

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
    <main className="relative w-screen h-screen">
      <div className="w-full h-12 flex absolute top-0 px-8 items-center text-sm font-semibold text-sky-800 border-b border-sky-800/50">
        <Link href="/">Shiqocred.</Link>
      </div>
      {children}
    </main>
  );
}
