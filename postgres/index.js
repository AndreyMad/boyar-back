const pg = require("pg");

  var conString = "postgres://xjqyfann:VsFPK5ncA9t_z-qWxK0bFnhm7-Q5Yp8m@dumbo.db.elephantsql.com:5432/xjqyfann" //Can be found in the Details page
  var client = new pg.Client(conString);
  client.connect(err => {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    return console.log("postgree connected");
  });


 const getDots=  ()=>{
      return  client.query('SELECT * FROM yandexboyardots').then(res=>{
          return res.rows
      })}
const deleteDot=  (id)=>{
        return  client.query(`Delete from yandexboyardots where id = '${id}'  `).then(res=>{
        if( res.rowCount===0){
          return 'Id not in database'
        }
        return getDots()
       })
      }
const addDot= (data)=>{

const query = `insert into yandexboyardots (latitude, longtitude, name, description, id) VALUES ('${data.latitude}', '${data.longtitude}', '${data.name}', '${data.description}', '${data.id}')`
return  client.query(query)
  .then(res=>{
    if( res.rowCount===0){
      return 'Не добавлено'
    }
    return getDots()
  })


}

  module.exports.getDots=getDots
  module.exports.deleteDot=deleteDot
  module.exports.addDot=addDot