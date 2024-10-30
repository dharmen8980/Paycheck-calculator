"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [grossPay, setGrossPay] = useState<number>(0);
  const [payPeriodStart, setPayPeriodStart] = useState<Date>();
  const [payPeriodEnd, setPayPeriodEnd] = useState<Date>();

  // Tax rates (these are example rates, adjust as needed)
  const medicareTaxRate = 0.0145;
  const socialSecurityTaxRate = 0.062;

  // Calculate taxes
  const medicareTax = grossPay * medicareTaxRate;
  const socialSecurityTax = grossPay * socialSecurityTaxRate;
  const totalTax = medicareTax + socialSecurityTax;
  const netPay = grossPay - totalTax;

  const handleGrossPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setGrossPay(isNaN(value) ? 0 : Math.max(0, value));
  };

  return (
    <main className="flex justify-center items-center h-[90svh]">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="mx-auto">Paycheck Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee-name">Employee Name</Label>
            <Input
              id="employee-name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label>Pay Period</Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[140px] pl-3 text-left font-normal">
                    {payPeriodStart ? format(payPeriodStart, "MMM dd, yyyy") : <span>From date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={payPeriodStart} onSelect={setPayPeriodStart} initialFocus />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[140px] pl-3 text-left font-normal">
                    {payPeriodEnd ? format(payPeriodEnd, "MMM dd, yyyy") : <span>To date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={payPeriodEnd} onSelect={setPayPeriodEnd} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gross-pay">Gross Pay</Label>
            <Input
              id="gross-pay"
              type="number"
              min="0"
              step="0.01"
              value={grossPay || ""}
              onChange={handleGrossPayChange}
              placeholder="Enter your gross pay"
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label>Medicare Tax</Label>
            <div className="flex justify-between text-sm">
              <span>Tax rate: {(medicareTaxRate * 100).toFixed(2)}%</span>
              <span>Tax amount: ${medicareTax.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Social Security Tax</Label>
            <div className="flex justify-between text-sm">
              <span>Tax rate: {(socialSecurityTaxRate * 100).toFixed(2)}%</span>
              <span>Tax amount: ${socialSecurityTax.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Net Pay</Label>
              <span className="text-lg font-bold">${netPay.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
