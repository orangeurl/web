# OrangeURL - Fast & Secure URL Shortener

A modern, fast, and secure URL shortener built with Next.js and Go, featuring an orange-themed design and powerful analytics.

## Features

- ⚡ **Lightning Fast**: Sub-second link generation with global CDN
- 📊 **Advanced Analytics**: Track clicks, geographic data, and user behavior
- 🔒 **Enterprise Security**: Bank-grade security with SSL encryption
- 🌐 **Custom Domains**: Use your own domain for branded links
- 🎨 **Modern UI**: Beautiful orange-themed interface with dark mode
- 📱 **Responsive**: Works perfectly on all devices

## Tech Stack

### Frontend (Web)
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible components
- **Lucide React** - Beautiful icons

### Backend (API)
- **Go** - High-performance backend
- **Fiber** - Fast HTTP framework
- **Redis** - Caching and rate limiting
- **Docker** - Containerization

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Go 1.22+
- Redis
- Docker (optional)

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd web
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend URL
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend/api
   ```

2. **Install Go dependencies**
   ```bash
   go mod download
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file with:
   APP_PORT=:3000
   DOMAIN=localhost:3000
   API_QUOTA=10
   ```

4. **Run the backend**
   ```bash
   go run main.go
   ```

### Docker Setup (Optional)

Use Docker Compose to run the entire stack:

```bash
docker-compose up -d
```

## API Endpoints

### POST /api/v1
Create a shortened URL

**Request:**
```json
{
  "url": "https://example.com/very/long/url",
  "short": "custom-alias", // optional
  "expiry": 24 // hours, optional (default: 24)
}
```

**Response:**
```json
{
  "url": "https://example.com/very/long/url",
  "short": "https://orangeurl.app/abc123",
  "expiry": 24,
  "rate_left": 9,
  "rate_limit_reset": 30
}
```

### GET /:shortCode
Redirect to the original URL

## Project Structure

```
web/
├── app/
│   ├── api/v1/route.ts      # API proxy to backend
│   ├── globals.css          # Global styles with orange theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── Navbar.tsx           # Navigation
│   ├── ParticleBackground.tsx
│   └── DarkModeToggle.tsx
├── lib/
│   └── utils.ts             # Utility functions
└── README.md
```

## Design System

The project uses an orange-themed design system with:

- **Primary Colors**: Orange gradients (#f97316, #ea580c)
- **Typography**: Inter font family
- **Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion for smooth interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

For questions or support, please open an issue on GitHub. 