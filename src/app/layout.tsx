import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finance-Typeface",
  description: "Smart Personal Finance Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className="pt-16"> {/* Add padding to account for fixed navbar */}
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}