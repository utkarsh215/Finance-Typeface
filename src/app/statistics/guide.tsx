"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function StatisticsGuide() {
  return (
    <Card className="bg-black text-white border border-gray-800 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg mb-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">How to Use Financial Statistics</h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-1">1. Select a Date Range</h4>
            <p className="text-gray-300">Click the "Pick a date range" button and select start and end dates for your analysis period.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-1">2. Generate Statistics</h4>
            <p className="text-gray-300">Click the "View Statistics" button to process your financial data for the selected period.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-1">3. Review Summary</h4>
            <p className="text-gray-300">Examine the three summary cards showing your total income (green), total expenses (red), and net savings (yellow).</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-1">4. Explore Categories</h4>
            <p className="text-gray-300">Below the summary, view your spending breakdown by category to identify where your money is going.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-1">5. Read AI Insights</h4>
            <p className="text-gray-300">Check the AI-powered insights section for personalized observations about your spending patterns and potential savings opportunities.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-1">6. Export Data</h4>
            <p className="text-gray-300">Click the "Export XLSX" button to download your financial statistics as an Excel file for further analysis or record-keeping.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}