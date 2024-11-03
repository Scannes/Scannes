const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const server = http.createServer(app);

const db = mongoose
  .connect(process.env.DB.replace("PASSWORD", process.env.PASSWORD))
  .then(() => {
    console.log("Connected to Database");
  });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port no ${port}..........`);
});
