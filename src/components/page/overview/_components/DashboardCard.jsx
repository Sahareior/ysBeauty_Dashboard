import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetUserActivitesYearlyQuery, useGetUserActivitiesMonthlyQuery } from "../../../../store/apis/apiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DashboardCard = () => {
  const { data: yearlyData } = useGetUserActivitesYearlyQuery();
  const { data: monthlyData } = useGetUserActivitiesMonthlyQuery();
  const [timeRange, setTimeRange] = useState("monthly");

  // Process monthly data for line chart
  const processMonthlyLineData = useMemo(() => {
    if (!monthlyData) return null;
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize data array with zeros
    const activityData = Array(12).fill(0);
    
    // Process the API data
    if (monthlyData.monthly_activity) {
      Object.entries(monthlyData.monthly_activity).forEach(([month, count]) => {
        const monthIndex = parseInt(month) - 1; // Convert to 0-based index
        if (monthIndex >= 0 && monthIndex < 12) {
          activityData[monthIndex] = count;
        }
      });
    }
    
    return {
      labels: months,
      datasets: [
        {
          label: "User Activities",
          data: activityData,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [monthlyData]);

  // Process yearly data for line chart
  const processYearlyLineData = useMemo(() => {
    if (!yearlyData) return null;
    
    // Get current year and previous 4 years
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 5}, (_, i) => currentYear - 4 + i);
    
    // Initialize data array with zeros
    const activityData = Array(5).fill(0);
    
    // Process the API data
    if (yearlyData.yearly_activity) {
      Object.entries(yearlyData.yearly_activity).forEach(([year, count]) => {
        const yearIndex = years.indexOf(parseInt(year));
        if (yearIndex >= 0 && yearIndex < 5) {
          activityData[yearIndex] = count;
        }
      });
    }
    
    return {
      labels: years.map(year => year.toString()),
      datasets: [
        {
          label: "User Activities",
          data: activityData,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [yearlyData]);

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

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  // Get current data based on selected time range
  const currentLineData = timeRange === "monthly" 
    ? (processMonthlyLineData || {
        labels: [],
        datasets: []
      }) 
    : (processYearlyLineData || {
        labels: [],
        datasets: []
      });

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[26px] popmed font-semibold">Users Activity</h2>
        <select 
          className="text-sm border rounded p-1"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="h-96">
        {currentLineData && currentLineData.datasets.length > 0 && currentLineData.datasets[0].data.some(val => val > 0) ? (
          <Line data={currentLineData} options={lineOptions} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p>No activity data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;