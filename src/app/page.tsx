"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div className="relative min-h-screen w-full text-black overflow-hidden flex flex-col bg-white">
      {/* Background Grid */}
      <InteractiveGridPattern
        className={cn(
          "absolute inset-0 -z-10 opacity-30",
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="fill-gray-800/30 hover:fill-gray-900"
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto w-full gap-8">
        {/* Left Side - Login/Register Box */}
        <div className="w-full md:w-1/2 max-w-md">
          <Card className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0)]">
            <CardContent className="p-0 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Finance-typeface</h2>
                <p className="text-sm text-gray-600">Your personal finance assistant</p>
              </div>
              
              <div className="space-y-4">
                <Link href="/login" className="w-full block">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white border border-black">
                    Login
                  </Button>
                </Link>
                
                <Link href="/register" className="w-full block">
                  <Button variant="outline" className="w-full bg-white hover:bg-gray-100 text-black border border-black">
                    Register
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side - Tagline and Carousel */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Welcome to <span className="text-black">Finance App</span>
            </h1>
            <p className="text-lg text-gray-700">
              Your AI-powered personal finance assistant — track your income, control your expenses,
              gain financial insights, and plan better with ease.
            </p>
          </div>
          
          {/* Feature Carousel */}
          <Carousel className="w-full h-64 mt-8" autoSlide={true}>
            {[
              { emoji: "📈", title: "Track Income & Expenses", desc: "Monitor your daily, monthly, and yearly financial transactions." },
              { emoji: "🧠", title: "AI-Powered Insights", desc: "Get intelligent suggestions based on your spending patterns." },
              { emoji: "📊", title: "Visual Analytics", desc: "Beautiful charts for trends, categories, and savings." },
              { emoji: "🧾", title: "Receipt OCR", desc: "Scan receipts and upload PDFs to auto-extract transactions." },
              { emoji: "📤", title: "Export to PDF", desc: "Generate your own financial statement anytime." },
              { emoji: "🔐", title: "Secure Cloud Backup", desc: "All your data stored securely using Firebase." },
            ].map((feature, idx) => (
              <CarouselItem key={idx}>
                <div className="h-full flex items-center justify-center p-6">
                  <div className="bg-white border-2 border-black p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0)] max-w-md mx-auto">
                    <div className="text-6xl mb-4">{feature.emoji}</div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-700">{feature.desc}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-600 relative z-10 border-t border-gray-200 bg-white">
        Developed by <span className="font-medium">Finance-typeface Team</span> — <span className="text-black font-semibold">Ojaswa Varshney</span>
      </footer>
    </div>
  );
}
