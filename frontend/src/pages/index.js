import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTrends: 0,
    contentGenerated: 0,
    accuracyRate: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Simulate loading and fetch initial stats
    const timer = setTimeout(() => {
      setStats({
        totalTrends: 1247,
        contentGenerated: 8932,
        accuracyRate: 89.8,
        activeUsers: 2534
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading TrendLens AI...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>TrendLens AI - Next-Generation Social Intelligence Platform</title>
        <meta name="description" content="Predict viral content, generate contextual memes, and analyze social media trends with advanced AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        {/* Hero Section */}
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  TrendLens AI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                The world\'s first AI platform that predicts viral content, generates contextual memes, 
                and provides real-time social intelligence across all major platforms.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="text-3xl font-bold text-cyan-400">{stats.totalTrends.toLocaleString()}</div>
                  <div className="text-gray-300">Trends Analyzed</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="text-3xl font-bold text-pink-400">{stats.contentGenerated.toLocaleString()}</div>
                  <div className="text-gray-300">Content Generated</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="text-3xl font-bold text-green-400">{stats.accuracyRate}%</div>
                  <div className="text-gray-300">Prediction Accuracy</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="text-3xl font-bold text-yellow-400">{stats.activeUsers.toLocaleString()}</div>
                  <div className="text-gray-300">Active Users</div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  🚀 Launch Dashboard
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-lg border border-white/30 transition duration-300"
                >
                  📊 View Live Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dashboard Component */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Dashboard />
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="bg-black/20 backdrop-blur-sm py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Revolutionary AI Features
              </h2>
              <p className="text-xl text-gray-300">
                Everything you need to dominate social media trends
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-white mb-4">Trend Prediction</h3>
                <p className="text-gray-300">
                  Predict what will go viral with 89.8% accuracy using advanced machine learning algorithms.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-white mb-4">Meme Generation</h3>
                <p className="text-gray-300">
                  Create contextual memes automatically based on current events and trending topics.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-white mb-4">Real-time Analytics</h3>
                <p className="text-gray-300">
                  Monitor content performance across all platforms with live data and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
