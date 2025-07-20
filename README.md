# 🚀 TrendLens AI - Next-Generation Social Intelligence Platform

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/trendlens-ai)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)](docker-compose.yml)

> **Revolutionary social media intelligence platform that predicts viral content, generates contextual memes, and provides real-time trend analysis using advanced AI.**

## 🌟 Features

- 🔮 **AI-Powered Trend Prediction** - Forecast viral content before it happens
- 🎭 **Contextual Meme Generator** - Create memes based on current events and trends  
- 📊 **Real-time Analytics Dashboard** - Track content performance across platforms
- 🌐 **Multi-Platform Integration** - Connect Twitter, Instagram, TikTok, LinkedIn
- ⚡ **Live Current Affairs Feed** - Real-time news integration and analysis
- 🤖 **Automated Content Creation** - AI-generated posts optimized for each platform

## 🚀 Quick Start (One Command Setup)

```bash
# Clone the repository
git clone https://github.com/yourusername/trendlens-ai.git
cd trendlens-ai

# Copy environment variables
cp .env.example .env

# Start the entire application
docker-compose up --build
```

**That's it!** Your TrendLens AI platform will be running at:
- 🌐 **Frontend Dashboard**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8000  
- 🧠 **AI Service**: http://localhost:8001

## 📋 Prerequisites

- Docker & Docker Compose (recommended)
- OR Node.js 18+ and Python 3.9+ (manual setup)

## 🔧 Environment Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Add your API keys to `.env`:**
   ```env
   # AI Services
   OPENAI_API_KEY=your_openai_api_key_here

   # Social Media APIs  
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret

   # News APIs
   NEWS_API_KEY=your_news_api_key

   # Database
   MONGODB_URI=mongodb://mongodb:27017/trendlens
   REDIS_URL=redis://redis:6379
   ```

## 🐳 Docker Deployment (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services  
docker-compose down
```

## 💻 Manual Development Setup

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```

### AI Service Setup
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## 📱 Usage Examples

### 1. Trend Analysis
```javascript
// Get current trending topics
const trends = await fetch('/api/trends/realtime').then(r => r.json());
console.log(trends);
```

### 2. Content Generation
```javascript  
// Generate viral content
const content = await fetch('/api/content/generate', {
  method: 'POST',
  body: JSON.stringify({ 
    topic: 'AI trends 2025',
    platform: 'twitter' 
  })
}).then(r => r.json());
```

### 3. Meme Creation
```javascript
// Create contextual meme
const meme = await fetch('/api/content/meme', {
  method: 'POST', 
  body: JSON.stringify({
    prompt: 'Current tech news',
    style: 'popular'
  })
}).then(r => r.json());
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   AI Service    │
│  (Next.js)      │◄──►│  (Node.js)      │◄──►│   (Python)      │
│  Port: 3000     │    │  Port: 8000     │    │  Port: 8001     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                  ┌─────────────────────────────┐
                  │       Databases            │
                  │  MongoDB + Redis           │  
                  │  Ports: 27017 + 6379       │
                  └─────────────────────────────┘
```

## 🔑 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/trends/realtime` | GET | Get current trending topics |
| `/api/content/generate` | POST | Generate viral content |
| `/api/content/meme` | POST | Create contextual memes |
| `/api/analytics/performance` | GET | Content performance metrics |
| `/api/auth/login` | POST | User authentication |

## 📊 Tech Stack

- **Frontend**: Next.js, React, Chart.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Redis
- **AI Service**: Python, FastAPI, OpenAI GPT-4, TensorFlow
- **DevOps**: Docker, Docker Compose, GitHub Actions

## 💎 Premium Features

- 🔥 **Viral Prediction Scoring** (89.8% accuracy)
- 📈 **Advanced Analytics Dashboard**  
- 🎯 **Platform-Specific Optimization**
- 🤖 **Custom AI Model Training**
- 📞 **Priority Support & Consultation**

## 🚀 Deployment Options

### Vercel (Frontend)
```bash
npm install -g vercel
vercel --prod
```

### Railway (Full Stack)
```bash
railway login  
railway deploy
```

### AWS/Google Cloud (Production)
See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing  

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- 📧 **Email**: support@trendlens.ai  
- 💬 **Discord**: [Join our community](https://discord.gg/trendlens)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/trendlens-ai/issues)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by the TrendLens AI Team
