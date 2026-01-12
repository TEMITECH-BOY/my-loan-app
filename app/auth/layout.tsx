import type { ReactNode } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 to-accent/20 flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">LoanHub</span>
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Your Financial Freedom Starts Here
            </h1>
            <p className="text-lg text-muted-foreground">
              Get instant access to loans with transparent terms and competitive
              rates.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Fast Approval</p>
                <p className="text-sm text-muted-foreground">
                  Get instant decisions on your application
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Low Interest Rates
                </p>
                <p className="text-sm text-muted-foreground">
                  Competitive rates tailored to your profile
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Flexible Terms</p>
                <p className="text-sm text-muted-foreground">
                  Choose repayment plans that work for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
