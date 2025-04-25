# AI Defender Serverless Leaderboard

This repository provides a simple serverless leaderboard API for the AI Defender game. It allows you to track player scores across multiple devices and display them in real-time.

## Features

- Persistent leaderboard that works across all devices
- Simple REST API for submitting and retrieving scores
- Automatic deployment to Vercel
- CORS enabled for cross-origin requests
- Fallback to localStorage when offline

## Quick Start

1. Fork this repository
2. Connect your fork to Vercel (see deployment instructions below)
3. Add the client-side integration code to your AI Defender game
4. That's it! Your leaderboard is now live

## Deployment Instructions

### Deploy to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your forked GitHub repository
4. Keep all default settings and click "Deploy"
5. Once deployed, Vercel will provide you with a URL (e.g., `https://ai-defender-leaderboard.vercel.app`)
6. Use this URL as your API endpoint in the client-side integration

## Client-Side Integration

Add the `serverlessLeaderboardManager.js` file to your AI Defender game's `js` folder and include it in your HTML:

```html
<script src="js/serverlessLeaderboardManager.js"></script>
```

Then initialize it with your Vercel deployment URL:

```javascript
// Initialize the leaderboard manager with your Vercel deployment URL
const leaderboardManager = new ServerlessLeaderboardManager('https://your-vercel-deployment-url.vercel.app');

// Submit a score
leaderboardManager.submitScore('PlayerName', 1000);

// Get top scores
leaderboardManager.getTopScores(10).then(scores => {
  console.log(scores);
});
```

## API Endpoints

- `GET /scores` - Get all scores
- `POST /scores` - Submit a new score
- `GET /health` - Check if the API is running

## Local Development

If you want to run the API locally:

1. Clone your fork
2. Run `npm install`
3. Run `npm run dev`
4. The API will be available at `http://localhost:3000`

## Need Help?

If you encounter any issues, please open an issue in this repository.
