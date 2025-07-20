import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TrendAnalysis from './TrendAnalysis';
import ContentGenerator from './ContentGenerator';
import ViralAnalytics from './ViralAnalytics';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('trends');
  const [realTimeData, setRealTimeData] = useState({
    trendingNow: [],
    viralScore: 0,
    engagement: 0
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData({
        trendingNow: [
          { keyword: '#AI2025', volume: 45230, growth: '+127%' },
          { keyword: '#TechTrends', volume: 32100, growth: '+89%' },
          { keyword: '#SocialMedia', volume: 28900, growth: '+76%' },
          { keyword: '#Innovation', volume: 21500, growth: '+54%' }
        ],
        viralScore: Math.floor(Math.random() * 20) + 75,
        engagement: Math.floor(Math.random() * 15) + 85
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'trends', label: '📈 Trend Analysis', icon: '📈' },
    { id: 'generator', label: '🎯 Content Generator', icon: '🎯' },
    { id: 'analytics', label: '📊 Viral Analytics', icon: '📊' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Real-time Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mb-8 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Live Analysis Active</span>
            </div>
            <div className="text-gray-300">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{realTimeData.viralScore}</div>
              <div className="text-xs text-gray-300">Viral Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{realTimeData.engagement}%</div>
              <div className="text-xs text-gray-300">Engagement</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-black/20 backdrop-blur-sm rounded-lg p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trending Keywords Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20"
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              🔥 Trending Now
            </h3>
            <div className="space-y-4">
              {realTimeData.trendingNow.map((trend, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">{trend.keyword}</div>
                    <div className="text-gray-400 text-sm">{trend.volume.toLocaleString()} posts</div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">
                    {trend.growth}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 rounded-lg transition duration-200">
              View All Trends
            </button>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'trends' && <TrendAnalysis />}
            {activeTab === 'generator' && <ContentGenerator />}
            {activeTab === 'analytics' && <ViralAnalytics />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
