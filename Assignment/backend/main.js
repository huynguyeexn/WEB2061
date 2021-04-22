const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("./db/db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Custom pagination API
router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeader = headers["x-total-count"] || null;
  if (req.method === "GET" && totalCountHeader) {
    const queryString = require("query-string");
    const query = queryString.parse(req._parsedUrl.query);

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(query._page) || 1,
        _limit: Number.parseInt(query._limit) || 10,

        // _Last page =  Math.ceil(_totalRows / _limit)
        _lastPage: Math.ceil(
          Number.parseInt(totalCountHeader) /
            (Number.parseInt(query._limit) || 10)
        ),
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };
    return res.jsonp(result);
  }
  res.jsonp(res.locals.data);
};

const rules = auth.rewriter({
  // Permission rules
  products: 600,
  messages: 640,
});

// You must apply the middlewares in the following order
server.use(rules);

// Use default router
server.use("/api", router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
