"use client";

import { useEffect, useMemo, useState } from "react";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface SavingsTrendChartProps {
  year: number;
}

interface SavingsDataPoint {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export default function SavingsTrendChart({ year }: SavingsTrendChartProps) {
  const { user } = useAuth();
  const [data, setData] = useState<SavingsDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const monthNames = useMemo(
    () => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    []
  );

  const parseDate = (raw: Timestamp | string | Date | null | undefined): Date | null => {
    if (!raw) return null;
    if (raw instanceof Timestamp) return raw.toDate();
    if (typeof raw === "string") return new Date(raw);
    if (raw instanceof Date) return raw;
    return null;
  };

  useEffect(() => {
    if (!user) return;

    const fetchSavingsData = async () => {
      setLoading(true);

      const monthly: SavingsDataPoint[] = monthNames.map((month) => ({
        month,
        income: 0,
        expense: 0,
        savings: 0,
      }));

      try {
        const [incomeSnap, expenseSnap] = await Promise.all([
          getDocs(query(collection(db, "incomes"), where("userId", "==", user.uid))),
          getDocs(query(collection(db, "expenses"), where("userId", "==", user.uid))),
        ]);

        incomeSnap.forEach((doc) => {
          const { amount, date } = doc.data();
          const parsed = parseDate(date);
          if (parsed && parsed.getFullYear() === year && typeof amount === "number") {
            monthly[parsed.getMonth()].income += amount;
          }
        });

        expenseSnap.forEach((doc) => {
          const { amount, date } = doc.data();
          const parsed = parseDate(date);
          if (parsed && parsed.getFullYear() === year && typeof amount === "number") {
            monthly[parsed.getMonth()].expense += amount;
          }
        });

        monthly.forEach((entry) => {
          entry.savings = entry.income - entry.expense;
        });

        setData(monthly);
      } catch (error) {
        console.error("Failed to fetch savings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsData();
  }, [user, year, monthNames]);

  const handleDownloadCSV = () => {
    const header = "Month,Income,Expenses,Savings\n";
    const rows = data
      .map(
        ({ month, income, expense, savings }) =>
          `${month},${income.toFixed(2)},${expense.toFixed(2)},${savings.toFixed(2)}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Savings_Trend_${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <HoverCard className="bg-black text-white">
      <HoverCardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Savings Trend - {year}</h2>
          <Button
            className="text-black bg-white hover:bg-gray-100 hover:text-black px-3 py-1.5 rounded-md text-sm border border-gray-300"
            onClick={handleDownloadCSV}
            disabled={loading || data.length === 0}
          >
            <Download className="w-4 h-4 mr-1" /> Export CSV
          </Button>
        </div>

        {loading ? (
          <p className="text-white">Loading savings trend...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="month" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip
                contentStyle={{ backgroundColor: "#000000", borderRadius: 8, border: "1px solid #333" }}
                labelStyle={{ color: "#ffffff" }}
                formatter={(value: number, name: string) => [
                  `₹${value.toFixed(2)}`,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{ r: 4, fill: "#000000", stroke: "#ffffff" }}
                activeDot={{ r: 6, fill: "#000000", stroke: "#ffffff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
