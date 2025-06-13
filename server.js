const http = require("http");
const { getProducts, getProduct } = require("./controllers/productController");

const server = http.createServer((req, res) => {
  // all products
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  }
  // single all product
  else if (req.url.match(/\/api\/products\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  }
  // Route Not Found
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Route Not Found: Please use the api/products endpoint",
      })
    );
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
