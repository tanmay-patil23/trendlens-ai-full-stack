import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [tone, setTone] = useState('engaging');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: 'from-blue-400 to-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'from-pink-400 to-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-black to-red-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' }
  ];

  const tones = [
    { id: 'engaging', name: 'Engaging', emoji: '🎯' },
    { id: 'professional', name: 'Professional', emoji: '💼' },
    { id: 'humorous', name: 'Humorous', emoji: '😄' },
    { id: 'inspirational', name: 'Inspirational', emoji: '✨' }
  ];

  const handleGenerate = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockContent = {
        text: `🚀 The future of AI is here and it's absolutely mind-blowing! From predicting viral trends to creating content that resonates with millions, we're witnessing a revolution in social intelligence. 

What's your take on AI-powered content creation? 

#AI #TechTrends #Innovation #SocialMedia #FutureTech`,
        hashtags: ['#AI', '#TechTrends', '#Innovation', '#SocialMedia'],
        viralityScore: 87,
        engagement: 94,
        bestTime: '2:30 PM - 4:00 PM',
        audience: 'Tech enthusiasts, Content creators, Marketing professionals'
      };

      setGeneratedContent(mockContent);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">🎯 AI Content Generator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-white font-medium mb-2">Content Topic/Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your topic, idea, or prompt for AI content generation..."
              rows="4"
              className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition duration-200"
            />
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-white font-medium mb-3">Target Platform</label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`p-3 rounded-lg border-2 transition duration-200 ${
                    platform === p.id
                      ? `border-cyan-400 bg-gradient-to-r ${p.color} text-white`
                      : 'border-white/20 bg-black/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-xl">{p.icon}</span>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div>
            <label className="block text-white font-medium mb-3">Content Tone</label>
            <div className="grid grid-cols-2 gap-3">
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`p-3 rounded-lg border-2 transition duration-200 ${
                    tone === t.id
                      ? 'border-cyan-400 bg-cyan-500/20 text-white'
                      : 'border-white/20 bg-black/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{t.emoji}</span>
                    <span className="font-medium">{t.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt || loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Generate Content</span>
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Generated Content</h3>

          {!generatedContent && !loading && (
            <div className="bg-black/20 rounded-lg p-8 text-center border-2 border-dashed border-white/20">
              <div className="text-6xl mb-4">🎭</div>
              <p className="text-gray-400">Your AI-generated content will appear here</p>
            </div>
          )}

          {loading && (
            <div className="bg-black/20 rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-white">AI is crafting your perfect content...</p>
            </div>
          )}

          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Content Preview */}
              <div className="bg-black/40 rounded-lg p-4 border border-white/20">
                <h4 className="text-white font-medium mb-2">Content Preview</h4>
                <p className="text-gray-300 whitespace-pre-line">{generatedContent.text}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-4 border border-green-400/30">
                  <div className="text-2xl font-bold text-green-400">{generatedContent.viralityScore}</div>
                  <div className="text-green-200 text-sm">Virality Score</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-400/30">
                  <div className="text-2xl font-bold text-blue-400">{generatedContent.engagement}%</div>
                  <div className="text-blue-200 text-sm">Est. Engagement</div>
                </div>
              </div>

              {/* Optimization Info */}
              <div className="bg-black/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Optimization Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Best Posting Time:</span>
                    <span className="text-white">{generatedContent.bestTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Audience:</span>
                    <span className="text-white">{generatedContent.audience}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
                  Copy Content
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
                  Schedule Post
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
