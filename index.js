const express = require("express");
const app = express();
const port = 3000;
const db = require("./postgres/index");
const cors = require("cors");
const bodyParser = require("body-parser");


const jsonParser = bodyParser.json();

app.use(express.static("build"));
app.use(cors());
app.use(jsonParser);

app.listen(port, () => {
  console.log(`Example app aa:${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/*",jsonParser, async (req, res) => {
    const dataResp = await db.getUsers();
    console.log(dataResp)
    if (dataResp.error) {
      return res.status(200).send(dataResp);
    }
    return res.status(201).send(dataResp);
});
