import { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ViralAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  // Mock data for platform performance
  const platformData = {
    labels: ['Twitter', 'Instagram', 'TikTok', 'LinkedIn', 'Facebook'],
    datasets: [{
      data: [32, 28, 25, 10, 5],
      backgroundColor: [
        '#1DA1F2',  // Twitter blue
        '#E4405F',  // Instagram pink
        '#000000',  // TikTok black
        '#0A66C2',  // LinkedIn blue
        '#1877F2'   // Facebook blue
      ],
      borderWidth: 0
    }]
  };

  // Mock data for engagement metrics
  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Likes',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      },
      {
        label: 'Shares',
        data: [400, 600, 1200, 1800, 800, 1200, 1600],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Comments',
        data: [200, 300, 500, 800, 400, 600, 700],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'white' }
      }
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

  const topPerformingContent = [
    {
      id: 1,
      content: "The future of AI is here! 🚀 #TechTrends",
      platform: "Twitter",
      engagement: 94.5,
      reach: "2.4M",
      viralScore: 89
    },
    {
      id: 2,
      content: "How to predict viral content using AI 🤖",
      platform: "LinkedIn", 
      engagement: 87.2,
      reach: "1.8M",
      viralScore: 85
    },
    {
      id: 3,
      content: "Social media trends that will dominate 2025",
      platform: "Instagram",
      engagement: 82.1,
      reach: "1.5M", 
      viralScore: 78
    },
    {
      id: 4,
      content: "AI-generated memes are taking over 😂",
      platform: "TikTok",
      engagement: 91.8,
      reach: "3.1M",
      viralScore: 92
    }
  ];

  const insights = [
    {
      title: "Peak Engagement Time",
      value: "2:30 PM - 4:00 PM",
      change: "+15%",
      icon: "⏰"
    },
    {
      title: "Best Performing Platform",
      value: "TikTok",
      change: "+23%",
      icon: "🎵"
    },
    {
      title: "Avg. Virality Score",
      value: "86.2",
      change: "+8%",
      icon: "🔥"
    },
    {
      title: "Content Success Rate",
      value: "89.8%",
      change: "+12%",
      icon: "✅"
    }
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">📊 Viral Analytics</h2>

        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                timeRange === range
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {insights.map((insight, index) => (
          <div key={index} className="bg-black/40 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{insight.icon}</span>
              <span className="text-green-400 text-sm font-medium">{insight.change}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{insight.value}</div>
            <div className="text-gray-400 text-sm">{insight.title}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Platform Performance */}
        <div className="bg-black/40 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Platform Performance</h3>
          <div className="h-64">
            <Doughnut 
              data={platformData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: 'white' }
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-black/40 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Weekly Engagement</h3>
          <div className="h-64">
            <Bar 
              data={engagementData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: 'white' }
                  }
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
              }} 
            />
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="bg-black/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">🏆 Top Performing Content</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 px-4 text-gray-300 font-medium">Content</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Platform</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Engagement</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Reach</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Viral Score</th>
                <th className="py-3 px-4 text-gray-300 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {topPerformingContent.map((content) => (
                <tr key={content.id} className="border-b border-white/10 hover:bg-white/5 transition duration-200">
                  <td className="py-4 px-4">
                    <div className="text-white max-w-xs truncate">{content.content}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      content.platform === 'Twitter' ? 'bg-blue-500/20 text-blue-400' :
                      content.platform === 'Instagram' ? 'bg-pink-500/20 text-pink-400' :
                      content.platform === 'LinkedIn' ? 'bg-blue-600/20 text-blue-300' :
                      content.platform === 'TikTok' ? 'bg-black/40 text-white border border-white/20' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {content.platform}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-600 rounded-full mr-3">
                        <div
                          className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                          style={{ width: `${content.engagement}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{content.engagement}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{content.reach}</td>
                  <td className="py-4 px-4">
                    <span className="text-cyan-400 font-medium">{content.viralScore}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-1 rounded text-sm transition duration-200">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          Last updated: {new Date().toLocaleString()}
        </div>

        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
            Export Report
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
