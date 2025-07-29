// ExpenseChart.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

interface MonthlyExpense {
  name: string; // Month abbreviation, e.g., "Jan"
  expense: number;
}

interface ExpenseData {
  date: Timestamp | string | Date;
  amount: number;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const parseDate = (raw: Timestamp | string | Date | undefined | null): Date | null => {
  if (!raw) return null;
  if (raw instanceof Timestamp) return raw.toDate();
  if (typeof raw === "string") return new Date(raw);
  if (raw instanceof Date) return raw;
  return null;
};

const buildMonthlyExpenseData = (expenses: ExpenseData[]): MonthlyExpense[] => {
  const totals: Record<string, number> = {};

  expenses.forEach((expense) => {
    const date = parseDate(expense.date);
    if (!date) return;

    const month = dayjs(date).format("MMM");
    totals[month] = (totals[month] || 0) + Number(expense.amount || 0);
  });

  return MONTHS.map((month) => ({
    name: month,
    expense: totals[month] || 0,
  }));
};

export default function ExpenseChart({ refreshKey = 0 }: { refreshKey?: number }) {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<MonthlyExpense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      if (!user) return;
      setLoading(true);

      try {
        const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const rawExpenses: ExpenseData[] = snapshot.docs.map((doc) => doc.data() as ExpenseData);

        const monthlyData = buildMonthlyExpenseData(rawExpenses);
        setChartData(monthlyData);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyExpenses();
  }, [user, refreshKey]);

  return (
    <Card className="bg-black text-white h-full min-h-[300px] border border-gray-800">
      <CardContent className="p-4 flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-2">💸 Expense Trend</h2>
        <div className="flex-grow">
          {loading ? (
            <Skeleton className="w-full h-full rounded-md bg-gray-800/50" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#000000", border: "1px solid #333333" }}
                  labelStyle={{ color: "#ffffff" }}
                  itemStyle={{ color: "#ffffff" }}
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, "Expense"]}
                />
                <Bar dataKey="expense" fill="#ffffff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
