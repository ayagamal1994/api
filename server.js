const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ✅ Custom CORS middleware
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (or restrict to your domain)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1", // rewrites /api/articles to /articles
  })
);

server.use(router);

module.exports = (req, res) => {
  server(req, res);
};
