"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ExpenseChart from "@/components/expense/ExpenseChart";
import ExpenseList from "@/components/expense/ExpenseList";
import AddExpenseForm from "@/components/expense/AddExpenseForm";

export default function ExpensePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 text-foreground">
        {/* Dashboard Heading */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold">Expense Management</h1>
        </div>

        {/* Chart + Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 min-h-[300px] transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <ExpenseChart refreshKey={refreshKey} />
          </div>
          <div className="min-h-[300px] transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <AddExpenseForm onAdded={triggerRefresh} />
          </div>
        </div>

        {/* Expense Table/List */}
        <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
          <ExpenseList refreshKey={refreshKey} />
        </div>
      </div>
    </DashboardLayout>
  );
}
