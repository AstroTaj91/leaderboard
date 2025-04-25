const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for all origins
server.use(cors());

// Use default middlewares (logger, static, etc)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Add middleware to handle CORS preflight requests
server.options('*', cors());

// Use router
server.use(router);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
