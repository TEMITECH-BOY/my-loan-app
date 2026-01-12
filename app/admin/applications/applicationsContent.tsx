"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Application {
  id: string;
  userName: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  appliedDate: Date;
  incomeAmount: number;
}

export default function ApplicationsContent() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(statusFilter);

  useEffect(() => {
    // Fetch applications from API
    const fetchApplications = async () => {
      try {
        // Replace with actual API call
        // const data = await adminAPI.getLoans()

        // Mock data
        setApplications([
          {
            id: "APP-001",
            userName: "John Smith",
            amount: 35000,
            status: "pending",
            appliedDate: new Date("2026-01-08"),
            incomeAmount: 65000,
          },
          {
            id: "APP-002",
            userName: "Sarah Johnson",
            amount: 50000,
            status: "pending",
            appliedDate: new Date("2026-01-07"),
            incomeAmount: 85000,
          },
          {
            id: "APP-003",
            userName: "Michael Brown",
            amount: 25000,
            status: "pending",
            appliedDate: new Date("2026-01-06"),
            incomeAmount: 55000,
          },
          {
            id: "APP-004",
            userName: "Emily Davis",
            amount: 45000,
            status: "approved",
            appliedDate: new Date("2026-01-05"),
            incomeAmount: 75000,
          },
          {
            id: "APP-005",
            userName: "Robert Wilson",
            amount: 30000,
            status: "rejected",
            appliedDate: new Date("2026-01-04"),
            incomeAmount: 35000,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (filterStatus !== "all") {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [applications, filterStatus, searchTerm]);

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
      approved: "bg-green-500/20 text-green-700 dark:text-green-400",
      rejected: "bg-destructive/20 text-destructive",
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Manage and review loan applications
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition whitespace-nowrap ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <Card className="border-border/40 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading applications...
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No applications found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/40 bg-secondary/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                     ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Applicant Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Loan Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Annual Income
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-secondary/20 transition">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {app.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {app.userName}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      ${app.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      ${app.incomeAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {app.appliedDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge
                        className={`${getStatusBadge(app.status)} border-none`}
                      >
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link href={`/admin/applications/${app.id}`}>
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
        )}
      </Card>
    </div>
  );
}
