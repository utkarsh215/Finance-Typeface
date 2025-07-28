// components/charts/IncomeExpenseChart.tsx — Production-ready & well-commented

"use client";

import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface IncomeExpenseChartProps {
  year: number; // Financial year to filter
}

interface DataPoint {
  month: string;
  income: number;
  expenses: number;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function IncomeExpenseChart({ year }: IncomeExpenseChartProps) {
  const { user } = useAuth();

  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchIncomeExpenseData = async () => {
      setLoading(true);
      setError(null);

      // Initialize data map for 12 months
      const monthly: Record<number, { income: number; expenses: number }> = {};
      for (let i = 0; i < 12; i++) {
        monthly[i] = { income: 0, expenses: 0 };
      }

      try {
        // 🔁 Fetch income records
        const incomeQuery = query(
          collection(db, "incomes"),
          where("userId", "==", user.uid)
        );
        const incomeSnap = await getDocs(incomeQuery);

        incomeSnap.forEach((doc) => {
          const data = doc.data();
          const dt = data.date?.seconds
            ? new Date(data.date.seconds * 1000)
            : new Date(data.date);

          if (dt.getFullYear() === year) {
            const monthIdx = dt.getMonth();
            monthly[monthIdx].income += Number(data.amount || 0);
          }
        });

        // 🔁 Fetch expense records
        const expenseQuery = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
        );
        const expenseSnap = await getDocs(expenseQuery);

        expenseSnap.forEach((doc) => {
          const data = doc.data();
          const dt = data.date?.seconds
            ? new Date(data.date.seconds * 1000)
            : new Date(data.date);

          if (dt.getFullYear() === year) {
            const monthIdx = dt.getMonth();
            monthly[monthIdx].expenses += Number(data.amount || 0);
          }
        });

        // 🧾 Convert to chart-friendly format
        const chartData: DataPoint[] = Object.entries(monthly).map(
          ([idx, val]) => ({
            month: MONTH_NAMES[parseInt(idx)],
            income: val.income,
            expenses: val.expenses,
          })
        );

        setData(chartData);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Failed to load chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeExpenseData();
  }, [year, user]);

  return (
    <HoverCard className="bg-black text-white">
      <HoverCardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          Income & Expenses by Month (F.Y. {year})
        </h2>

        {loading && (
          <div className="text-center text-gray-400">Loading...</div>
        )}

        {error && (
          <div className="text-center text-white">{error}</div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#000000", border: "1px solid #333" }}
                  labelStyle={{ color: "#ffffff" }}
                  itemStyle={{ color: "#ffffff" }}
                  formatter={(value: number, key: string) => [`₹${value}`, key]}
                />
                <Legend wrapperStyle={{ color: "#ffffff" }} />
                <Bar dataKey="income" fill="#ffffff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#888888" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="text-center text-white">
            No data available for {year}.
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
