const pg = require("pg");

  var conString = "postgres://xjqyfann:VsFPK5ncA9t_z-qWxK0bFnhm7-Q5Yp8m@dumbo.db.elephantsql.com:5432/xjqyfann" //Can be found in the Details page
  var client = new pg.Client(conString);
  client.connect(err => {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    return console.log("postgree connected");
  });


 const getUsers=  ()=>{
      return  client.query('SELECT * FROM users').then(res=>{
          return res.rows
      })}

  module.exports.getUsers=getUsers