"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TotalBalanceCard from "@/components/dashboard/TotalBalanceCard";
import IncomeExpenseChart from "@/components/dashboard/IncomeExpenseChart";
import InsightSummaryCard from "@/components/dashboard/InsightSummaryCard";
import SpendingCategoryChart from "@/components/dashboard/SpendingCategoryChart";
import LatestTransactionsTable from "@/components/dashboard/LatestTransactionsTable";
import SavingsTrendChart from "@/components/dashboard/SavingsTrendChart";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// ---------- Constants ----------
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const generateYears = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

// ---------- Main Component ----------
export default function DashboardPage() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const years = generateYears(2020, currentYear + 5);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 text-foreground">
        {/* Dashboard Heading */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold">Dashboard</h1>
        </div>
        
        {/* Filter Section */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex flex-wrap items-center gap-4 bg-black p-4 rounded-lg border border-gray-700 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">Month:</span>
              <Select
                value={selectedMonth.toString()}
                onValueChange={(val) => setSelectedMonth(Number(val))}
              >
                <SelectTrigger className="bg-white text-black border border-gray-300 hover:bg-gray-100 focus:ring-black h-9 px-3 rounded">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border border-gray-300 shadow-lg">
                  {MONTHS.map((month, idx) => (
                    <SelectItem key={month} value={idx.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">Year:</span>
              <Select
                value={selectedYear.toString()}
                onValueChange={(val) => setSelectedYear(Number(val))}
              >
                <SelectTrigger className="bg-white text-black border border-gray-300 hover:bg-gray-100 focus:ring-black h-9 px-3 rounded">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border border-gray-300 shadow-lg">
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="bg-white text-black border border-gray-300 hover:bg-gray-100 hover:text-black h-9 px-4 rounded"
              onClick={() => {
                setSelectedMonth(now.getMonth());
                setSelectedYear(now.getFullYear());
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Dashboard Charts - Reshuffled Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column - 9 units wide */}
          <div className="md:col-span-9 grid grid-cols-1 gap-6 pr-6">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SavingsTrendChart year={selectedYear} />
              <TotalBalanceCard month={selectedMonth} year={selectedYear} />
            </div>
            
            {/* Middle Row */}
            <div className="grid grid-cols-1 gap-6">
              <IncomeExpenseChart year={selectedYear} />
            </div>
            
            {/* Bottom Row - Stacked Latest Transactions and Spending Category */}
            <div className="grid grid-cols-1 gap-6">
              <LatestTransactionsTable month={selectedMonth} year={selectedYear} />
              <SpendingCategoryChart month={selectedMonth} year={selectedYear} />
            </div>
          </div>
          
          {/* Right Column - 3 units wide for AI Insights (no padding) */}
          <div className="md:col-span-3 p-0">
            <InsightSummaryCard month={selectedMonth} year={selectedYear} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
