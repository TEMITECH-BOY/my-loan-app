"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalUsers: number;
  totalLoansIssued: number;
  totalAmountLent: number;
  pendingReview: Loan[];
}

interface Loan {
  id: string;
  userName: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  appliedDate: Date;
  userId: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalUsers: 0,
    totalLoansIssued: 0,
    totalAmountLent: 0,
    pendingReview: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch admin dashboard stats from API
    const fetchStats = async () => {
      try {
        // Replace with actual API call
        // const data = await adminAPI.getDashboardStats()

        // Mock data
        setStats({
          totalApplications: 156,
          pendingApplications: 23,
          approvedApplications: 98,
          rejectedApplications: 35,
          totalUsers: 542,
          totalLoansIssued: 127,
          totalAmountLent: 5200000,
          pendingReview: [
            {
              id: "APP-001",
              userName: "John Smith",
              amount: 35000,
              status: "pending",
              appliedDate: new Date("2026-01-08"),
              userId: "user-123",
            },
            {
              id: "APP-002",
              userName: "Sarah Johnson",
              amount: 50000,
              status: "pending",
              appliedDate: new Date("2026-01-07"),
              userId: "user-124",
            },
            {
              id: "APP-003",
              userName: "Michael Brown",
              amount: 25000,
              status: "pending",
              appliedDate: new Date("2026-01-06"),
              userId: "user-125",
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "primary",
      change: 12,
      positive: true,
    },
    {
      title: "Pending Review",
      value: stats.pendingApplications,
      icon: AlertCircle,
      color: "yellow-500",
      change: 5,
      positive: false,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "accent",
      change: 8,
      positive: true,
    },
    {
      title: "Total Loans Issued",
      value: stats.totalLoansIssued,
      icon: TrendingUp,
      color: "green-600",
      change: 15,
      positive: true,
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <Card className="p-8 text-center border-border/40">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of loan applications and user management
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="p-6 border-border/40">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <Badge
                className={`gap-1 ${
                  stat.positive
                    ? "bg-green-500/20 text-green-700 dark:text-green-400"
                    : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-foreground">
              {stat.value.toLocaleString()}
            </p>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Approval Rate */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4">Application Status</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Approved</span>
                <span className="text-sm font-bold">
                  {Math.round(
                    (stats.approvedApplications / stats.totalApplications) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{
                    width: `${
                      (stats.approvedApplications / stats.totalApplications) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Rejected</span>
                <span className="text-sm font-bold">
                  {Math.round(
                    (stats.rejectedApplications / stats.totalApplications) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-destructive"
                  style={{
                    width: `${
                      (stats.rejectedApplications / stats.totalApplications) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pending</span>
                <span className="text-sm font-bold">
                  {Math.round(
                    (stats.pendingApplications / stats.totalApplications) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: `${
                      (stats.pendingApplications / stats.totalApplications) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Total Amount Lent */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4">Total Amount Lent</h3>
          <div className="space-y-3">
            <p className="text-3xl font-bold text-accent">
              ${(stats.totalAmountLent / 1000000).toFixed(1)}M
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Across {stats.totalLoansIssued} active loans</p>
              <p>
                Average loan: $
                {Math.round(
                  stats.totalAmountLent / stats.totalLoansIssued
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/admin/applications?status=pending" className="w-full">
              <Button
                variant="outline"
                className="w-full justify-center bg-transparent"
              >
                Review Applications
              </Button>
            </Link>
            <Link href="/admin/users" className="w-full">
              <Button
                variant="outline"
                className="w-full justify-center bg-transparent"
              >
                Manage Users
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Pending Applications Table */}
      <Card className="border-border/40">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Applications Pending Review</h2>
            <Link href="/admin/applications?status=pending">
              <Button size="sm" variant="outline" className="bg-transparent">
                View All
              </Button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-secondary/30">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Loan Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {stats.pendingReview.map((loan) => (
                <tr key={loan.id} className="hover:bg-secondary/20 transition">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {loan.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {loan.userName}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    ${loan.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {loan.appliedDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/admin/applications/${loan.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                      >
                        Review
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
