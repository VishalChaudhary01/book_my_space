import type { Metadata } from "next";
import { Toaster } from 'sonner'
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";
import { Poppins } from 'next/font/google';
import "./globals.css";
 
const poppins = Poppins({
  weight: ['200', '400'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Book My Space",
  description: "Book or Rent your space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased dark:bg-dark-4 bg-white flex flex-col`}
      >
        <Providers>
          <Toaster richColors />
          <div className="flex flex-col gap-4 my-4 min-h-screen">
            <Header />
            <main>
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
