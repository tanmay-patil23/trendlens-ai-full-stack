import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrendAnalysis() {
  const [trendData, setTrendData] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [loading, setLoading] = useState(false);

  const mockTrendData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        label: 'AI Trends',
        data: [65, 78, 90, 81, 95, 88],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Tech News',
        data: [45, 52, 68, 74, 82, 79],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Social Media',
        data: [35, 44, 55, 61, 70, 75],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Trend Analysis - Real Time',
        color: 'white'
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.8)' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: 'rgba(255,255,255,0.8)' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  const topTrends = [
    { keyword: 'Artificial Intelligence', score: 95, change: '+12%', platform: 'All Platforms' },
    { keyword: 'Machine Learning', score: 89, change: '+8%', platform: 'Twitter' },
    { keyword: 'ChatGPT Updates', score: 85, change: '+15%', platform: 'LinkedIn' },
    { keyword: 'Tech Innovation', score: 82, change: '+6%', platform: 'Instagram' },
    { keyword: 'Future Tech', score: 78, change: '+4%', platform: 'TikTok' }
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">📈 Trend Analysis</h2>

        <div className="flex space-x-2">
          {['1h', '24h', '7d', '30d'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                selectedTimeframe === timeframe
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8 bg-black/20 rounded-lg p-4">
        <Line data={mockTrendData} options={chartOptions} />
      </div>

      {/* Top Trends Table */}
      <div className="bg-black/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">🔥 Top Trending Keywords</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 px-4 text-gray-300 font-medium">Keyword</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Score</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Change</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Platform</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {topTrends.map((trend, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition duration-200">
                  <td className="py-4 px-4 text-white font-medium">{trend.keyword}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-12 h-2 bg-gray-600 rounded-full mr-3">
                        <div
                          className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                          style={{ width: `${trend.score}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{trend.score}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-green-400 font-medium">{trend.change}</td>
                  <td className="py-4 px-4 text-gray-300">{trend.platform}</td>
                  <td className="py-4 px-4">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-1 rounded text-sm transition duration-200">
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
          Export Report
        </button>
        <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
          Set Alerts
        </button>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
          Deep Analysis
        </button>
      </div>
    </div>
  );
}
