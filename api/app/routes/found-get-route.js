module.exports = function(app, db) {

  // Load founds by ID: http://localhost:4300/api/found/id/$id
  // example: http://localhost:4300/api/found/id/15
  app.get('/api/found/id/:id', (req, res) => {
    processData(res, "SELECT * FROM founds where id == "+req.params.id);
  });

  // Load founds by attribute: http://localhost:4300/api/found/$attribute/$name
  // example: http://localhost:4300/api/found/price/24
  //          http://localhost:4300/api/found/name/Suntone
  // $attribute = ['name', 'price', 'currency', 'description']*
  // * this is not checked values, wrong parameters will return in a DB error.
  app.get('/api/found/:attribute/:name', (req, res) => {
    processData(res, "SELECT * FROM founds where "+req.params.attribute+" = '"+req.params.name+"'");
  });

  // Load all founds: http://localhost:4300/api/found/
  app.get('/api/found', (req, res) => {
    processData(res, "SELECT * FROM founds");
  });

  // Load founds: http://localhost:4300/api/found/sort/$attribute
  // example: http://localhost:4300/api/found/sort/price
  //          http://localhost:4300/api/found/sort/name
  // $attribute = ['name', 'price', 'currency', 'description']*
  app.get('/api/found/sort/:way', (req, res) => {
    processData(res, "SELECT * FROM founds order by " + req.params.way);
  });


  // Load founds: http://localhost:4300/api/found/sort/$direction/$attribute
  // example: http://localhost:4300/api/found/sort/asc/price
  //          http://localhost:4300/api/found/sort/desc/price
  // $attribute = ['name', 'price', 'currency', 'description']*
  // $direction [ASC or DESC]C]*
  // * the direction is checked and when wrong will return a 401 business error.
  app.get('/api/found/sort/:direction/:way', (req, res) => {
    var way = req.params.way;
    var direction = req.params.direction;

    if(direction !== "asc" && 
        direction !== "desc"){
      res.status(404).send("Sorting direction invalid!");
    }

    processData(res, "SELECT * FROM founds order by " + way + " " + direction);
  });

  function processData(res, sql){
    db.serialize(function() {
      db.all(sql, 
        function(err, rows) {
          if(err){
            console.error(err);
            res.status(500).send(err);
          }
          else
            sendData(res, rows, err);
      });
    });
  }

  function sendData(res, data, err){
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log("data:", data);
    if(data[0])
      res.send(data);
      
    else{
      res.status(404).send("Found not found");
    }
  }
};