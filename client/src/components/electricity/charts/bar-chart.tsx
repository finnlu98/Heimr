import { useState } from "react";
import { ComponentData } from "../../../model/Deziarilize/ElectricityPrices";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";

import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, annotationPlugin);



interface BarChartProps {
    title: string
    chartData: ComponentData
}

const BarChart: React.FC<BarChartProps> = ({title, chartData}) => {
    
    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
            display: false,
            },
            title: {
            display: true,
            text: title,
            color: "white",
            },
            annotation: {
            annotations: {
                avgLine: {
                type: "line",
                yMin: 2,
                yMax: 2,
                borderColor: "white",
                borderWidth: 1,
                borderDash: [6, 6],
                label: {
                    display: true,
                    content: "Level 2",
                    position: "end",
                    yAdjust: -15, 
                    backgroundColor: "rgba(0,0,0,0)",
                    color: "white",
                },
                } as AnnotationOptions<"line">,
            },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "white" },
            },
            y: {
                grid: { display: false },
                ticks: { color: "white" },
            },
        },
    };
   
   
    return (
        <div className="electricity-widget">
            <Bar options={options} data={chartData} />
        </div>) 
}

export default BarChart