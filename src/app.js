const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs = require("fs");
const https = require("https");
const http = require("http");
const key = fs.readFileSync("cert/private.key");
const cert = fs.readFileSync("cert/certificate.crt");
const ca = fs.readFileSync("cert/ca_bundle.crt");
const config = require("../config");
const boyarRouter = require("./boyar/boyarRouter");
const socketIo = require("socket.io");

function start() {
  app.use(cors());
  app.use(jsonParser);
  app.use(express.static(path.join(__dirname, "../../mypage-front/build")));

  app.use("/boyar", boyarRouter);

  const options = {
    key: key,
    cert: cert,
    ca: ca,
  };

  // const  httpsServer = https.createServer(options, app);
  const httpServer = http.createServer(app);
  const io = socketIo(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", function (socket) {
    console.log("user connected with socketId " + socket.id);

    socket.on("event", function (data) {
      console.log("event fired");
    });

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  });

  // httpsServer.listen(config.port, () => {
  //   console.log(`Example  at:${config.port}`);
  // });

  httpServer.listen(80, () => {
    console.log(`Example  at:${80}`);
  });

  app.get("*", (req, res) => {
    res.send("hello world");
    //  res.sendFile(path.join(__dirname, "../..mypage-front", "build", "index.html"));
  });
}
module.exports = start;
