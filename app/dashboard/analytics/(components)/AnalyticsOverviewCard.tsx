"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { AcceptedUsers } from "@/svg-icons/AcceptedUsers";
import { RejectedUsers } from "@/svg-icons/RejectedUsers";
import { NewUsers } from "@/svg-icons/NewUsers";
import { LoggedInUsers } from "@/svg-icons/LoggedInUsers";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';  // for dynamic import to handle SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
// import ReactApexChart from 'react-apexcharts'



export default function AnalyticsOverviewCard() {

  const [state] = useState<any>({
    series: [
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      },
      {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      grid: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " thousands"
          }
        }
      }
    }
  });

  return (<Card className="max-w-full">
    <CardHeader >
      <div className="flex justify-between items-center" >
        <h1 className="font-bold text-2xl">Analytics</h1>
      </div>
    </CardHeader>

    <CardContent className="">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 my-6">
        <div className="flex flex-col justify-between h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl">
          <p className="font-semibold text-color-primary text-[40px] leading-none z-[1]">100k+</p>

          <div className="flex justify-between items-baseline h-fit">
            <p className="text-color-secondary font-medium z-[1]">Accepted Users</p>

            <AcceptedUsers />
          </div>
        </div>

        <div className="flex flex-col justify-between  h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl relative overflow-hidden">
          <p className="font-semibold text-color-primary text-[40px] leading-none z-[1]">100k+</p>

          <div className="flex justify-between items-baseline">
            <p className="text-color-secondary font-medium z-[1]">Rejected Users</p>

            <RejectedUsers className="z-[1]" />
          </div>

          <div className="w-[200px] h-[180px] absolute -right-16 -bottom-16" style={{
            borderRadius: '263px',
            background: 'radial-gradient(50% 50% at 50% 50%, #FFE0E0 0%, #F8FAFC 100%)',
            backdropFilter: 'blur(74.01068115234375px)',
            zIndex: 0
          }}></div>
        </div>

        <div className="flex flex-col justify-between h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl relative overflow-hidden">
          <p className="font-semibold text-color-primary text-[40px] leading-none z-[1]">100k+</p>

          <div className="flex justify-between items-baseline">
            <p className="text-color-secondary font-medium z-[1]">New Users</p>

            <NewUsers className="z-[1]" />
          </div>


          <div className="w-[200px] h-[180px] absolute -right-16 -bottom-16" style={{
            borderRadius: '263px',
            background: 'radial-gradient(50% 50% at 50% 50%, #FFF2CC 0%, #F8FAFC 100%)',
            backdropFilter: 'blur(74.01068115234375px)',
            zIndex: 0
          }}></div>
        </div>

        <div className="flex flex-col justify-between h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl relative overflow-hidden">
          <p className="font-semibold text-color-primary text-[40px] leading-none z-[1]">100k+</p>

          <div className="flex justify-between items-baseline">
            <p className="text-color-secondary font-medium z-[1]">Logged In Users</p>

            <LoggedInUsers className="z-[1]" />
          </div>

          <div className="w-[200px] h-[180px] absolute -right-16 -bottom-16" style={{
            borderRadius: '263px',
            background: 'radial-gradient(50% 50% at 50% 50%, #E8FFE4 0%, #F8FAFC 100%)',
            backdropFilter: 'blur(74.01068115234375px)',
            zIndex: 0
          }}></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Select>
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue placeholder="Bar Chart" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="barchart" defaultChecked>Bar Chart</SelectItem>
            <SelectItem value="linechart">Line Chart</SelectItem>
          </SelectContent>
        </Select>


        <Select>
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last12">Last 12 months</SelectItem>
            <SelectItem value="last6">Last 6 months</SelectItem>
            <SelectItem value="last3">Last 3 months</SelectItem>
          </SelectContent>
        </Select>

      </div>

      {/* charts */}
      <div>
        <div id="chart">
          <ReactApexChart options={state.options} series={state.series} type="bar" height={350} width={"100%"} />
        </div>
        <div id="html-dist"></div>
      </div>
    </CardContent>

  </Card>)
}