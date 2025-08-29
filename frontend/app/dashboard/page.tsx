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
import axios from "axios";
import { BACKEND_BASE_URL } from "@/lib/utils";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [patternsFound, setPatternsFound] = useState(0);

  async function onSubmit(values: any) {
    setLoading(true);
    const patternType = values["patternType"];
    const response = await axios.post(`${BACKEND_BASE_URL}/api/patterns`, values);
    if (!response || response.status !== 200) {
      setLoading(false);
      return;
    }
    const { data, patterns } = response.data;
    setPatternsFound(patterns.length);
    setData(data);
    setMarkers(createSeriesMarkers(patternType, patterns));
    setLoading(false);
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
              <>
                {patternsFound > 0 && (
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 m-4 p-8 border rounded-2xl">
                    <div className="text-lg font-semibold"> Patterns found {patternsFound}</div>
                    <ChartComponent data={data} markers={markers}></ChartComponent>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function createSeriesMarkers(patternType: any, data: any[]) {
  if (data.length === 0) return [];
  let markers: any = [];
  if (patternType == "double-top") {
    data.forEach((pattern) => {
      markers.push({
        time: pattern.firstTop.date.split("T")[0],
        position: "aboveBar",
        color: "red",
        shape: "arrowDown",
        text: "Top 1",
      });
      markers.push({
        time: pattern.secondTop.date.split("T")[0],
        position: "aboveBar",
        color: "red",
        shape: "arrowDown",
        text: "Top 2",
      });
      markers.push({
        time: pattern.valley.date.split("T")[0],
        position: "belowBar",
        color: "blue",
        shape: "arrowUp",
        text: "Valley",
      });
      markers.push({
        time: pattern.breakDown.date.split("T")[0],
        position: "belowBar",
        color: "blue",
        shape: "arrowUp",
        text: "Breakdown",
      });
    });
    return markers;
  } else if (patternType == "Head and Shoulders") {
    return [
      { time: data[0].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Left Shoulder" },
      { time: data[1].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Head" },
      { time: data[2].time, position: "aboveBar", color: "red", shape: "arrowDown", text: "Right Shoulder" },
    ];
  } else if (patternType == "Triple Bottom") {
    return [
      { time: data[0].time, position: "belowBar", color: "blue", shape: "arrowUp", text: "Bottom 1" },
      { time: data[1].time, position: "belowBar", color: "blue", shape: "arrowUp", text: "Bottom 2" },
      { time: data[2].time, position: "belowBar", color: "blue", shape: "arrowUp", text: "Bottom 3" },
    ];
  }
  return [];
}
