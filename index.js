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

app.post("/api/getDots",jsonParser, async (req, res) => {
    const dataResp = await db.getDots();
    if (dataResp.error) {
      return res.status(200).send(dataResp);
    }
    return res.status(201).send(dataResp);
});


app.post("/api/deleteDot",jsonParser, async (req, res) => {
   const dataResp = await db.deleteDot(req.body.id);
   if (dataResp.error) {
     return res.status(200).send(dataResp);
   }
    return res.status(200).send(dataResp);
});

app.post("/api/addDot",jsonParser, async (req, res) => {
  // console.log(req.body.data);
   const dataResp = await db.addDot(req.body.data);
   if (dataResp.error) {
     return res.status(200).send(dataResp);
   }
    return res.status(200).send(dataResp);
});