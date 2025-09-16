import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardCard = () => {
  const [timeRange, setTimeRange] = useState("monthly");

  // Monthly data
  const monthlyLineData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Keeping Notes",
        data: [400, 600, 500, 700, 900, 1100, 1000, 1300, 900, 800, 700, 600],
        borderColor: "#3B82F6",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.4,
      },
      {
        label: "Creating Events",
        data: [300, 500, 400, 450, 600, 550, 500, 400, 450, 500, 600, 550],
        borderColor: "#FBBF24",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  // Weekly data
  const weeklyLineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Keeping Notes",
        data: [800, 1200, 900, 1100],
        borderColor: "#3B82F6",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.4,
      },
      {
        label: "Creating Events",
        data: [600, 800, 700, 750],
        borderColor: "#FBBF24",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  // Monthly doughnut data
  const monthlyDoughnutData = {
    labels: ["Keeping Notes", "Creating Events"],
    datasets: [
      {
        data: [20, 80],
        backgroundColor: ["#3B82F6", "#FBBF24"],
        borderWidth: 0,
      },
    ],
  };

  // Weekly doughnut data
  const weeklyDoughnutData = {
    labels: ["Keeping Notes", "Creating Events"],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["#3B82F6", "#FBBF24"],
        borderWidth: 0,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const doughnutOptions = {
    cutout: "70%",
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  // Handle time range change
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  // Get current data based on selected time range
  const currentLineData = timeRange === "monthly" ? monthlyLineData : weeklyLineData;
  const currentDoughnutData = timeRange === "monthly" ? monthlyDoughnutData : weeklyDoughnutData;
  const doughnutPercentages = timeRange === "monthly" ? [20, 80] : [30, 70];

  return (
    <div className="md:flex gap-6 mt-6 mb-4">
      {/* Line Chart Card */}
      <div className="w-[65.8%] bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[26px] popmed font-semibold">Users Activity</h2>
          <select 
            className="text-sm border rounded p-1"
            value={timeRange}
            onChange={handleTimeRangeChange}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="h-96">
          <Line data={currentLineData} options={lineOptions} />
        </div>
      </div>

      {/* Doughnut Chart Card */}
      <div className="flex-[1] bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <h3 className="font-medium mb-4">App Users</h3>
        <div className="relative w-32 h-32">
          <Doughnut data={currentDoughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-sm">100%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Keeping Notes</span>
            </div>
            <span>{doughnutPercentages[0]}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span>Creating Events</span>
            </div>
            <span>{doughnutPercentages[1]}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;