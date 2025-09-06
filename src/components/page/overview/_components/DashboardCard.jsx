import React from "react";
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
  // Line chart data
  const lineData = {
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

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false, // ✅ allows custom height
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Doughnut chart data
  const doughnutData = {
    labels: ["Keeping Notes", "Creating Events"],
    datasets: [
      {
        data: [20, 80],
        backgroundColor: ["#3B82F6", "#FBBF24"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%",
    plugins: { legend: { display: false } },
    maintainAspectRatio: false, // ✅ keeps it fixed
  };

  return (
    <div className="md:flex gap-6 mt-6 mb-4">
      {/* Line Chart Card */}
      <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Users Activity</h2>
          <select className="text-sm border rounded p-1">
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
        </div>
        <div className="h-64"> {/* ✅ fixed height */}
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Doughnut Chart Card */}
      <div className="flex-[1] bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <h3 className="font-medium mb-4">App Users</h3>
        <div className="relative w-32 h-32">
          <Doughnut data={doughnutData} options={doughnutOptions} />
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
            <span>20%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span>Creating Events</span>
            </div>
            <span>80%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
