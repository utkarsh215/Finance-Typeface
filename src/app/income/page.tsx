// app/income/page.tsx
"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddIncomeForm from "@/components/income/AddIncomeForm";
import IncomeList from "@/components/income/IncomeList";
import IncomeChart from "@/components/income/IncomeChart";
import { useState } from "react";

export default function IncomePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 text-foreground">
        {/* Dashboard Heading */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold">Income Management</h1>
        </div>

        {/* Charts + Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <IncomeChart refreshKey={refreshKey}/>
          </div>
          <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <AddIncomeForm onAdded={() => setRefreshKey((prev) => prev + 1)} />
          </div>
        </div>

        {/* Latest Incomes */}
        <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
          <IncomeList refreshKey={refreshKey} />
        </div>
      </div>
    </DashboardLayout>
  );
}
