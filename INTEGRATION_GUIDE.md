# AI Defender Leaderboard Integration Guide

This guide provides detailed instructions for integrating the serverless leaderboard with your AI Defender game. Follow these steps to add a persistent leaderboard that updates in real-time across all devices.

## Step 1: Fork the Template Repository

1. Go to [github.com/your-username/ai-defender-leaderboard-template](https://github.com/your-username/ai-defender-leaderboard-template)
2. Click the "Fork" button in the top-right corner
3. Wait for GitHub to create your copy of the repository

## Step 2: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with your GitHub account (create one if needed)
3. Select your forked repository from the list
4. Keep all default settings and click "Deploy"
5. Wait for deployment to complete (usually takes less than a minute)
6. Once deployed, Vercel will provide you with a URL (e.g., `https://ai-defender-leaderboard.vercel.app`)
7. Save this URL - you'll need it for the next step

## Step 3: Add the Leaderboard Manager to Your Game

1. Download the `serverlessLeaderboardManager.js` file from your forked repository
2. Add this file to your AI Defender game's `js` folder
3. Open your game's `index.html` file and add the following script tag before your game.js script:

```html
<script src="js/serverlessLeaderboardManager.js"></script>
```

## Step 4: Modify Your Game Code

1. Open your game's main JavaScript file (likely `game.js` or similar)
2. Add the following code at the beginning of your file to initialize the leaderboard manager:

```javascript
// Initialize the leaderboard manager with your Vercel deployment URL
const leaderboardManager = new ServerlessLeaderboardManager('YOUR_VERCEL_URL_HERE');
```

3. Replace `'YOUR_VERCEL_URL_HERE'` with the URL you received from Vercel

4. Find the code where your game submits scores (likely in a game over function) and add:

```javascript
// Submit score to the serverless leaderboard
leaderboardManager.submitScore(playerName, score, playerEmail);
```

5. Find the code where your game displays the leaderboard and modify it to use the new manager:

```javascript
// Get top scores from the serverless leaderboard
leaderboardManager.getTopScores(10).then(scores => {
  // Display the scores in your UI
  displayLeaderboard(scores);
});
```

## Step 5: Test Your Integration

1. Open your game in a web browser
2. Play a game and submit a score
3. Verify that your score appears in the leaderboard
4. Test on different devices to ensure scores are synchronized

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify your Vercel URL is correct
3. Ensure all script tags are properly included
4. Check that your game is properly calling the leaderboard manager functions

## Advanced Customization

You can customize the leaderboard by:

1. Modifying the `serverlessLeaderboardManager.js` file to add additional features
2. Updating the server.js file in your repository to add custom endpoints
3. Styling the leaderboard display in your game's CSS

## Maintaining Your Leaderboard

Your leaderboard data is stored in Vercel's serverless environment. To manage this data:

1. You can view submitted scores by accessing `YOUR_VERCEL_URL/scores`
2. To reset the leaderboard, you can modify the db.json file in your repository and redeploy
3. For data backup, periodically download the scores from the API endpoint

## Security Considerations

This implementation is designed for a conference setting with moderate usage. For production use with high traffic:

1. Consider adding rate limiting to prevent abuse
2. Implement authentication for score submission
3. Add server-side validation of submitted scores

For any questions or issues, please refer to the README in the template repository.
