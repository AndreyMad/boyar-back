const express = require("express");
const app = express();
const db = require("./postgres/index");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs= require('fs')
var https = require( "https" )

app.use(express.static("build"));
app.use(cors());
app.use(jsonParser);
app.use(express.static(`../boyar-front/build`));

const port = process.env.PORT || 443;

const key = fs.readFileSync('cert/private.key');
const cert = fs.readFileSync( 'cert/certificate.crt' );
const ca = fs.readFileSync( 'cert/ca_bundle.crt' );

const options = {
  key: key,
  cert: cert,
  ca: ca
};

var httpsServer = https.createServer(options, app);
httpsServer.listen(port, () => {
  console.log(`Example app aa:${port}`);
});


app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../boyar-front", "build", "index.html"));
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

app.post("/api/editDot",jsonParser, async (req, res) => {
  // console.log(req.body.data);
   const dataResp = await db.editDot(req.body.dot);
   if (dataResp.error) {
     return res.status(200).send(dataResp);
   }
    return res.status(200).send(dataResp);
});