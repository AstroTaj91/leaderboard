/**
 * ServerlessLeaderboardManager.js
 * A client-side manager for interacting with the serverless leaderboard API
 * for the AI Defender game.
 */

class ServerlessLeaderboardManager {
  /**
   * Initialize the leaderboard manager
   * @param {string} apiUrl - The URL of your Vercel deployment (without trailing slash)
   */
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.localStorageKey = 'aiDefenderLeaderboard';
    this.pendingScores = [];
    
    // Load any pending scores from localStorage
    this.loadPendingScores();
    
    // Try to submit any pending scores
    this.submitPendingScores();
  }
  
  /**
   * Submit a score to the leaderboard
   * @param {string} playerName - The name of the player
   * @param {number} score - The player's score
   * @param {string} email - Optional email address
   * @returns {Promise} - Resolves when the score is submitted
   */
  submitScore(playerName, score, email = '') {
    const scoreData = {
      playerName: playerName,
      score: score,
      email: email,
      timestamp: new Date().toISOString()
    };
    
    // Always save to localStorage as a backup
    this.saveScoreLocally(scoreData);
    
    // Try to submit to the API
    return fetch(`${this.apiUrl}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error submitting score:', error);
      // Save to pending scores to try again later
      this.addPendingScore(scoreData);
      // Return the locally saved score
      return scoreData;
    });
  }
  
  /**
   * Get the top scores from the leaderboard
   * @param {number} limit - The maximum number of scores to retrieve
   * @returns {Promise} - Resolves with an array of scores
   */
  getTopScores(limit = 10) {
    return fetch(`${this.apiUrl}/scores?_sort=score&_order=desc&_limit=${limit}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch scores');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching scores:', error);
        // Fall back to local scores if API is unavailable
        return this.getLocalScores(limit);
      });
  }
  
  /**
   * Save a score to localStorage
   * @param {Object} scoreData - The score data to save
   * @private
   */
  saveScoreLocally(scoreData) {
    const scores = this.getLocalScores();
    scores.push(scoreData);
    
    // Sort by score (highest first)
    scores.sort((a, b) => b.score - a.score);
    
    // Save to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(scores));
  }
  
  /**
   * Get scores from localStorage
   * @param {number} limit - The maximum number of scores to retrieve
   * @returns {Array} - An array of scores
   * @private
   */
  getLocalScores(limit = null) {
    const scoresJson = localStorage.getItem(this.localStorageKey);
    const scores = scoresJson ? JSON.parse(scoresJson) : [];
    
    // Sort by score (highest first)
    scores.sort((a, b) => b.score - a.score);
    
    // Apply limit if specified
    return limit ? scores.slice(0, limit) : scores;
  }
  
  /**
   * Add a score to the pending scores list
   * @param {Object} scoreData - The score data to add
   * @private
   */
  addPendingScore(scoreData) {
    this.pendingScores.push(scoreData);
    localStorage.setItem('aiDefenderPendingScores', JSON.stringify(this.pendingScores));
  }
  
  /**
   * Load pending scores from localStorage
   * @private
   */
  loadPendingScores() {
    const pendingScoresJson = localStorage.getItem('aiDefenderPendingScores');
    this.pendingScores = pendingScoresJson ? JSON.parse(pendingScoresJson) : [];
  }
  
  /**
   * Try to submit any pending scores
   * @private
   */
  submitPendingScores() {
    if (this.pendingScores.length === 0) {
      return;
    }
    
    const pendingScores = [...this.pendingScores];
    this.pendingScores = [];
    localStorage.removeItem('aiDefenderPendingScores');
    
    // Try to submit each pending score
    const promises = pendingScores.map(scoreData => {
      return fetch(`${this.apiUrl}/scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scoreData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit pending score');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error submitting pending score:', error);
        // Add back to pending scores
        this.addPendingScore(scoreData);
        return null;
      });
    });
    
    return Promise.all(promises);
  }
  
  /**
   * Check if the API is available
   * @returns {Promise<boolean>} - Resolves with true if the API is available
   */
  isApiAvailable() {
    return fetch(`${this.apiUrl}/health`)
      .then(response => response.ok)
      .catch(() => false);
  }
}

// Example usage:
/*
const leaderboardManager = new ServerlessLeaderboardManager('https://your-vercel-deployment-url.vercel.app');

// Submit a score
leaderboardManager.submitScore('PlayerName', 1000);

// Get top scores
leaderboardManager.getTopScores(10).then(scores => {
  console.log(scores);
});
*/
