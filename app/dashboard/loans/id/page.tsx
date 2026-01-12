"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  DollarSign,
  Percent,
  Download,
  FileText,
} from "lucide-react";
import type { Loan } from "@/lib/types";

export default function LoanDetailsPage() {
  const params = useParams();
  const loanId = params.id as string;
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch loan details from API
    const fetchLoan = async () => {
      try {
        // Replace with actual API call
        // const data = await loanAPI.getLoan(loanId)

        // Mock data
        setLoan({
          id: loanId,
          amount: 50000,
          duration_months: 60,
          interest_rate: 5.5,
          status: "active",
          requested_at: new Date("2026-01-01"),
          approved_at: new Date("2026-01-05"),
        });
      } catch (error) {
        console.error("Failed to fetch loan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [loanId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="p-8 text-center border-border/40">
          <p className="text-muted-foreground">Loading loan details...</p>
        </Card>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/loans">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Loans
          </Button>
        </Link>
        <Card className="p-8 text-center border-border/40">
          <p className="text-muted-foreground">Loan not found</p>
        </Card>
      </div>
    );
  }

  const monthlyRate = loan.interest_rate / 100 / 12;
  const monthlyPayment = Math.round(
    (loan.amount *
      (monthlyRate * Math.pow(1 + monthlyRate, loan.duration_months))) /
      (Math.pow(1 + monthlyRate, loan.duration_months) - 1)
  );
  const totalPayable = monthlyPayment * loan.duration_months;
  const totalInterest = totalPayable - loan.amount;

  const statusColor = {
    active: "text-accent",
    pending: "text-yellow-700 dark:text-yellow-400",
    approved: "text-green-700 dark:text-green-400",
    completed: "text-blue-700 dark:text-blue-400",
    rejected: "text-destructive",
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back Button */}
      <Link href="/dashboard/loans">
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back to Loans
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Loan #{loan.id}</h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground ${
              statusColor[loan.status as keyof typeof statusColor]
            }`}
          >
            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
          </span>
        </div>
        <p className="text-muted-foreground">
          Applied {loan.requested_at.toLocaleDateString()}
        </p>
      </div>

      {/* Main Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Loan Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Amount & Terms */}
          <Card className="p-6 border-border/40">
            <h2 className="text-lg font-bold mb-4">Loan Terms</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Principal Amount
                </p>
                <p className="text-3xl font-bold text-foreground">
                  ${loan.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Annual Interest Rate
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {loan.interest_rate}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Loan Duration
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {loan.duration_months} Months
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Monthly Payment
                </p>
                <p className="text-3xl font-bold text-foreground">
                  ${monthlyPayment.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Payment Summary */}
          <Card className="p-6 border-border/40">
            <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="font-medium">Total Principal</span>
                </div>
                <span className="font-bold">
                  ${loan.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Percent className="w-5 h-5 text-accent" />
                  <span className="font-medium">Total Interest</span>
                </div>
                <span className="font-bold">
                  ${totalInterest.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/20 rounded-lg border border-primary/30">
                <span className="font-bold">Total Payable</span>
                <span className="font-bold text-lg text-primary">
                  ${totalPayable.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6 border-border/40">
            <h2 className="text-lg font-bold mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-accent ring-4 ring-accent/20" />
                  <div className="w-0.5 h-12 bg-border/40" />
                </div>
                <div className="pb-8">
                  <p className="text-sm font-semibold text-foreground">
                    Application Submitted
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {loan.requested_at.toLocaleDateString()}
                  </p>
                </div>
              </div>

              {loan.approved_at && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-accent ring-4 ring-accent/20" />
                    <div className="w-0.5 h-12 bg-border/40" />
                  </div>
                  <div className="pb-8">
                    <p className="text-sm font-semibold text-foreground">
                      Loan Approved
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {loan.approved_at.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      loan.status === "active"
                        ? "bg-accent ring-4 ring-accent/20"
                        : "bg-muted"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Expected Completion
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {loan.approved_at
                      ? new Date(
                          loan.approved_at.getTime() +
                            loan.duration_months * 30 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()
                      : "Not yet available"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Actions & Documents */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6 border-border/40">
            <h3 className="font-bold mb-4">Actions</h3>
            <div className="space-y-2">
              {loan.status === "active" && (
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Make Payment
                </Button>
              )}
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Agreement
              </Button>
            </div>
          </Card>

          {/* Documents */}
          <Card className="p-6 border-border/40">
            <h3 className="font-bold mb-4">Documents</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-3 p-3 hover:bg-secondary/30 rounded-lg transition"
              >
                <FileText className="w-4 h-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Loan Agreement
                  </p>
                  <p className="text-xs text-muted-foreground">PDF • 342 KB</p>
                </div>
                <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-3 hover:bg-secondary/30 rounded-lg transition"
              >
                <FileText className="w-4 h-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Disclosure Document
                  </p>
                  <p className="text-xs text-muted-foreground">PDF • 156 KB</p>
                </div>
                <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </a>
            </div>
          </Card>

          {/* Need Help? */}
          <Card className="p-6 border-border/40 bg-secondary/20">
            <h3 className="font-bold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about your loan? Our support team is here to help.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
