"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function ApplyForLoanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Loan Details
    loanAmount: 25000,
    loanDuration: 36,
    loanPurpose: "",

    // Step 2: Employment & Income
    employmentStatus: "employed",
    employmentYears: 1,
    annualIncome: 50000,
    employer: "",
    position: "",

    // Step 3: Personal Info & Documents
    address: "",
    city: "",
    state: "",
    zipCode: "",
    documentFile: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("Years") ||
        name.includes("Amount") ||
        name === "annualIncome"
          ? Number.parseInt(value)
          : value,
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      loanAmount: value[0],
    }));
  };

  const handleDurationChange = (value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      loanDuration: value[0],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        documentFile: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with actual API call
      // const response = await loanAPI.applyForLoan(formData)

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/loans");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setLoading(false);
    }
  };

  const canProceedToNextStep = () => {
    if (step === 1) {
      return (
        formData.loanAmount > 0 &&
        formData.loanDuration > 0 &&
        formData.loanPurpose.trim() !== ""
      );
    } else if (step === 2) {
      return (
        formData.employmentStatus &&
        formData.employmentYears > 0 &&
        formData.annualIncome > 0 &&
        formData.employer.trim() !== "" &&
        formData.position.trim() !== ""
      );
    }
    return true;
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-12 text-center border-border/40">
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-full bg-accent/20">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for applying. Our team will review your application and
            get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting to your loans...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Apply for a Loan</h1>
        <p className="text-muted-foreground">
          Complete this form to submit your loan application
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                s === step
                  ? "bg-primary text-primary-foreground"
                  : s < step
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-foreground">
              {s === 1 ? "Loan Details" : s === 2 ? "Employment" : "Documents"}
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Step 1: Loan Details */}
        {step === 1 && (
          <Card className="p-6 border-border/40 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-6">Loan Details</h2>

              {/* Loan Amount */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Loan Amount</Label>
                  <span className="text-2xl font-bold text-primary">
                    ${formData.loanAmount.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[formData.loanAmount]}
                  onValueChange={handleSliderChange}
                  min={5000}
                  max={250000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$5,000</span>
                  <span>$250,000</span>
                </div>
              </div>

              {/* Loan Duration */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">
                    Loan Duration
                  </Label>
                  <span className="text-2xl font-bold text-primary">
                    {formData.loanDuration} months
                  </span>
                </div>
                <Slider
                  value={[formData.loanDuration]}
                  onValueChange={handleDurationChange}
                  min={6}
                  max={120}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6 months</span>
                  <span>10 years</span>
                </div>
              </div>

              {/* Estimated Monthly Payment */}
              <Card className="p-4 bg-secondary/20 border-border/40 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Estimated Monthly Payment
                </p>
                <p className="text-2xl font-bold text-foreground">
                  $
                  {Math.round(
                    (formData.loanAmount / formData.loanDuration) * 1.06
                  ).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on an estimated 6% annual interest rate
                </p>
              </Card>

              {/* Loan Purpose */}
              <div className="space-y-3 mt-6">
                <Label
                  htmlFor="loanPurpose"
                  className="text-base font-semibold"
                >
                  What is this loan for?
                </Label>
                <select
                  id="loanPurpose"
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                  required
                >
                  <option value="">Select a purpose</option>
                  <option value="home_improvement">Home Improvement</option>
                  <option value="debt_consolidation">Debt Consolidation</option>
                  <option value="education">Education</option>
                  <option value="car_purchase">Car Purchase</option>
                  <option value="business">Business</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Employment & Income */}
        {step === 2 && (
          <Card className="p-6 border-border/40 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-6">Employment Information</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="employmentStatus"
                    className="text-sm font-semibold"
                  >
                    Employment Status
                  </Label>
                  <select
                    id="employmentStatus"
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                  >
                    <option value="employed">Employed</option>
                    <option value="self_employed">Self-Employed</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="employmentYears"
                    className="text-sm font-semibold"
                  >
                    Years at Current Job
                  </Label>
                  <Input
                    id="employmentYears"
                    name="employmentYears"
                    type="number"
                    min="0"
                    max="70"
                    value={formData.employmentYears}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="employer" className="text-sm font-semibold">
                  Employer Name
                </Label>
                <Input
                  id="employer"
                  name="employer"
                  placeholder="Company name"
                  value={formData.employer}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="position" className="text-sm font-semibold">
                  Job Title
                </Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="Your position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualIncome" className="text-sm font-semibold">
                  Annual Income
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="annualIncome"
                    name="annualIncome"
                    type="number"
                    min="0"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    className="pl-8"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <Card className="p-6 border-border/40 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-6">Address & Documents</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-semibold">
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="NY"
                    maxLength="2"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-semibold">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 border-2 border-dashed border-border rounded-lg">
                <Label className="text-sm font-semibold cursor-pointer">
                  Upload Supporting Documents
                </Label>
                <p className="text-xs text-muted-foreground">
                  Please upload proof of income (pay stub, tax return, etc.) and
                  identification
                </p>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {formData.documentFile && (
                  <p className="text-sm text-accent">
                    ✓ {formData.documentFile.name} selected
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1 || loading}
            className="bg-transparent"
          >
            Previous
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canProceedToNextStep() || loading}
              className="bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
