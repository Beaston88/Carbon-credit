import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import { FiUsers } from "react-icons/fi";
import { pendingVerifications } from "../Constants/index.js";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State for daily impact (randomized between 1-100)
  const [dailyImpact, setDailyImpact] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  // State for current month and year
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  // State for activity dates
  const [activityDates, setActivityDates] = useState([]);
  // State for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  // Ref for auto-scroll container
  const datesContainerRef = useRef(null);

  // Generate random chart data
  const generateChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = new Date().getMonth();
    const labels = months.slice(Math.max(0, currentMonthIndex - 5), currentMonthIndex + 1);
    
    const data = labels.map(() => Math.floor(Math.random() * 100) + 20);
    
    return {
      labels,
      datasets: [
        {
          label: 'Transaction Hours',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Initialize dates, chart data, and set up auto-scroll
  useEffect(() => {
    // Set current month and year
    const now = new Date();
    setCurrentMonth(now.toLocaleString('default', { month: 'long' }));
    setCurrentYear(now.getFullYear());

    // Generate recent dates (past 7 days)
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleString('default', { month: 'short', day: 'numeric' }));
    }
    setActivityDates(dates);

    // Generate initial chart data
    setChartData(generateChartData());

    // Set up auto-scroll effect
    const scrollContainer = datesContainerRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per interval
    const scrollInterval = 50; // milliseconds

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    const scrollIntervalId = setInterval(scroll, scrollInterval);

    // Change daily impact every 10 seconds for demo purposes
    const impactIntervalId = setInterval(() => {
      setDailyImpact(Math.floor(Math.random() * 100) + 1);
    }, 10000);

    // Update chart data every 15 seconds
    const chartIntervalId = setInterval(() => {
      setChartData(generateChartData());
    }, 15000);

    return () => {
      clearInterval(scrollIntervalId);
      clearInterval(impactIntervalId);
      clearInterval(chartIntervalId);
    };
  }, []);

  // Get current time of day for greeting
  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Hours (Last 6 Months)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad'
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto h-full p-4 md:p-8">
        <Header />

        <div className="p-4 md:p-8 overflow-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left */}
            <div>
              <h2 className="text-2xl font-semibold mt-4">
                {getTimeOfDayGreeting()}, CarbonChain User
              </h2>
              <p className="text-gray-600">
                Explore your impacts and progress in the marketplace
              </p>
              <button className="mt-3 px-4 py-2 bg-gray-200 rounded-2xl hover:bg-gray-300 transition-colors">
                Settings
              </button>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors">
                  <p>Upcoming</p>
                  <p>Current week</p>
                  <p className="flex items-center gap-3 text-lg mt-3">
                    <FiUsers /> Seller
                  </p>
                </div>
                <div className="bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors">
                  <p>Upcoming</p>
                  <p>Current week</p>
                  <p className="flex items-center gap-3 text-lg mt-3">
                    <FiUsers /> Buyer
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                Total Transaction Hours
              </h3>
              <div className="p-4 bg-gray-100 rounded-lg h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 mt-10">
                <div className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition-colors">
                  <p className="text-3xl font-bold">{dailyImpact}</p>
                  <p>Track your daily impact</p>
                </div>
                <div className="flex justify-center items-center bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition-colors">
                  <p>Verify your carbon transaction</p>
                </div>
                <div className="flex justify-center items-center bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition-colors">
                  <p>Frequently asked questions</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                {currentMonth} {currentYear} Activity
              </h3>
              <div 
                className="flex overflow-x-auto gap-2 mb-6 py-2 scrollbar-hide"
                ref={datesContainerRef}
              >
                {activityDates.map((date) => (
                  <button
                    key={date}
                    className="px-4 py-2 bg-gray-200 rounded-xl whitespace-nowrap hover:bg-gray-300 transition-colors"
                  >
                    {date}
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4">
                Pending Verifications
              </h3>
              <ul className="space-y-4">
                {pendingVerifications.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="bg-gray-300 text-black px-3 py-2 rounded-lg font-semibold">
                        {item.id}
                      </span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.details}</p>
                      </div>
                    </div>
                    <p className="text-gray-800">{item.time}</p>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center">
                <button className="mt-5 px-4 py-2 bg-gray-300 rounded-2xl w-1/2 cursor-pointer hover:bg-gray-400 transition-colors">
                  View full schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;