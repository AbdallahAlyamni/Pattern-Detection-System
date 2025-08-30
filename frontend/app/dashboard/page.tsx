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
import { BACKEND_BASE_URL, createSeriesMarkers } from "@/lib/utils";

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
                {patternsFound > 0 ? (
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 m-4 p-8 border rounded-2xl">
                    <div className="text-lg font-semibold"> Patterns found {patternsFound}</div>
                    <ChartComponent data={data} markers={markers}></ChartComponent>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 m-4 p-8 border rounded-2xl">
                    <div className="text-lg font-semibold text-center">No patterns found </div>
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
