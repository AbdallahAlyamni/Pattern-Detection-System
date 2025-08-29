"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "./date-range-picker";

const formSchema = z.object({
  ticker: z.string().min(1, "Stock ticker is required").max(10, "Ticker must be 10 characters or less"),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  patternType: z.enum(["head-and-shoulders", "double-top", "triple-bottom"]),
});

type FormData = z.infer<typeof formSchema>;

export default function StockAnalysisForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: "",
      dateRange: { from: new Date("2018-08-30"), to: new Date("2018-10-15") },
      patternType: undefined,
    },
  });

  function onError(errors: any) {
    console.log(errors, form.getValues());
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Stock Pattern Analysis</CardTitle>
        <CardDescription>Enter stock details to analyze trading patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Stock Ticker</FormLabel>
                  <Input
                    placeholder="e.g., AAPL"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    className="uppercase"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Date Range</FormLabel>
                  {/* <Input type="date" value={field.value} onChange={field.onChange} /> */}

                  <DateRangePicker
                    onUpdate={(values) => {console.log(values); field.onChange(values.range)}}
                    initialDateFrom={new Date("2018-08-30")}
                    initialDateTo={new Date("2018-10-15")}
                    align="start"
                    locale="en-GB"
                    showCompare={false}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patternType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Pattern Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select pattern type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head-and-shoulders">Head and Shoulders</SelectItem>
                      <SelectItem value="double-top">Double Top</SelectItem>
                      <SelectItem value="triple-bottom">Triple Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!form.formState.isValid} className="w-full mt-6">
              Analyze Pattern
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
