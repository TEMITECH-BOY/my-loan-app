"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import type { Loan } from "@/lib/types";

export default function DashboardPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLoans: 0,
    activeLoans: 0,
    totalBorrowed: 0,
  });

  useEffect(() => {
    // Fetch user's loans from API
    const fetchLoans = async () => {
      try {
        // Replace with actual API call
        // const data = await loanAPI.getLoans()
        // setLoans(data)

        // Mock data for demonstration
        setLoans([
          {
            id: "1",
            amount: 50000,
            duration_months: 60,
            interest_rate: 5.5,
            status: "active",
            requested_at: new Date("2026-01-01"),
            approved_at: new Date("2026-01-05"),
          },
          {
            id: "2",
            amount: 30000,
            duration_months: 36,
            interest_rate: 6.2,
            status: "pending",
            requested_at: new Date("2026-01-08"),
            approved_at: null,
          },
        ]);

        setStats({
          totalLoans: 2,
          activeLoans: 1,
          totalBorrowed: 80000,
        });
      } catch (error) {
        console.error("Failed to fetch loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-accent/20 text-accent",
      pending: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
      approved: "bg-green-500/20 text-green-700 dark:text-green-400",
      rejected: "bg-destructive/20 text-destructive",
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, John
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your loans and applications
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card/50 border-border/40">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Loans</p>
              <p className="text-3xl font-bold">{stats.totalLoans}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 border-border/40">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Loans</p>
              <p className="text-3xl font-bold">{stats.activeLoans}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/10">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 border-border/40">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Borrowed</p>
              <p className="text-3xl font-bold">
                ${(stats.totalBorrowed / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-border/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              Ready to apply for a new loan?
            </h3>
            <p className="text-sm text-muted-foreground">
              Get instant approval and competitive rates
            </p>
          </div>
          <Link href="/dashboard/apply">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              Start Application <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Loans List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Loans</h2>

        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading your loans...</p>
          </Card>
        ) : loans.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No loans yet</p>
            <Link href="/dashboard/apply">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Apply for a Loan
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {loans.map((loan) => (
              <Card
                key={loan.id}
                className="p-6 border-border/40 hover:border-border/60 transition"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-xl font-bold">
                      ${(loan.amount / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-xl font-bold">
                      {loan.duration_months}mo
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Interest Rate
                    </p>
                    <p className="text-xl font-bold">{loan.interest_rate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Applied</p>
                    <p className="text-xl font-bold">
                      {loan.requested_at.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                        loan.status
                      )}`}
                    >
                      {loan.status.charAt(0).toUpperCase() +
                        loan.status.slice(1)}
                    </span>
                  </div>
                </div>

                {loan.status === "pending" && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-700 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-700 dark:text-yellow-400">
                      Your application is under review. We'll notify you once a
                      decision is made.
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-border/40 mt-4">
                  <Link href={`/dashboard/loans/${loan.id}`} className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { BarChart3 } from "lucide-react";
