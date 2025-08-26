"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartComponent } from "@/components/candlestick-chart";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import StockAnalysisForm from "@/components/stock-analysis-form";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Loader } from "lucide-react";
import { useState } from "react";

// import data from "./data.json"

const data = [
  { time: "2025-08-18", open: 100, high: 105, low: 95, close: 102 },
  { time: "2025-08-19", open: 102, high: 108, low: 101, close: 106 },
  { time: "2025-08-20", open: 106, high: 110, low: 104, close: 108 },
  { time: "2025-08-21", open: 108, high: 112, low: 107, close: 110 },
  { time: "2025-08-22", open: 110, high: 115, low: 109, close: 113 },
];

// const markers: any = [
//   { time: data[0].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Top 1" },
//   { time: data[1].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Top 2" },
//   { time: data[2].time, position: "belowBar", color: "blue", shape: "arrowUp", text: "Dip" },
// ];

const markers = createSeriesMarkers("Double Top", data);

export default function Page() {
  const [loading, setLoading] = useState(false);

  function onSubmit(values: FormData) {
    console.log(values);
    // Handle form submission here
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 m-4">
            <StockAnalysisForm onSubmit={onSubmit} />
            {loading ? (
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 m-4 p-8 border rounded-2xl">
                <Loader className="animate-spin mx-auto" />
              </div>
            ) : (
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 m-4 p-8 border rounded-2xl">
                <div className="text-lg font-semibold"> Patterns found 3</div>
                <ChartComponent data={data} markers={markers}></ChartComponent>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function createSeriesMarkers(pattern: any, data: any[]) {
  if (pattern == "Double Top") {
    return [
      { time: data[0].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Top 1" },
      { time: data[1].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Top 2" },
    ];
  } else if (pattern == "Head and Shoulders") {
    return [
      { time: data[0].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Left Shoulder" },
      { time: data[1].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Head" },
      { time: data[2].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Right Shoulder" },
    ];
  } else if (pattern == "Triple Bottom") {
    return [
      { time: data[0].time, position: "belowBar", color: "blue", shape: "arrowUp", text: "Bottom 1" },
      { time: data[1].time, position: "belowBar", color: "blue", shape: "arrowUp", text: "Bottom 2" },
      { time: data[2].time, position: "belowBar", color: "blue", shape: "arrowUp", text: "Bottom 3" },
    ];
  }
  return [];
}
