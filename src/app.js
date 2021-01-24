const express = require("express");
const app = express();
const db = require("../postgres/index");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs= require('fs')
const  https = require( "https" )
const key = fs.readFileSync('cert/private.key');
const cert = fs.readFileSync( 'cert/certificate.crt' );
const ca = fs.readFileSync( 'cert/ca_bundle.crt' );
const config =require('../config')
const boyarRouter =require('./boyar/boyarRouter')



function start() {
app.use(cors());
app.use(jsonParser);
app.use(express.static(`../../boyar-front/public`));
app.use(express.static(`../../boyar-front/build`));
app.use("/boyar", boyarRouter);

const options = {
  key: key,
  cert: cert,
  ca: ca
};

var httpsServer = https.createServer(options, app);
httpsServer.listen(config.port, () => {
  console.log(`Example app aa:${config.port}`);
});

app.get("*", (req, res) => {
    // res.send('hello world')
     res.sendFile(path.join(__dirname, "../../boyar-front", "build", "index.html"));
  });
  







}
module.exports=start