module.exports = function (app, db) {
    
    // Delete a found
    // http://localhost:4300/api/found
    // Sending a JSON body: (ID is needed)
    // {
    //     "id": "12",            
    //     "name": "ExampleFoundName",
    //     "description": "Example found description",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of founds:
    // [
    //     {...},{...}
    // ]
    app.delete('/api/found/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

         var data = req.body;
         
         if((data.constructor === Array))
            processFounds(req, res, db);
         else
            processFound(req, res, db);
    });
};

function processFounds(req, res, db){
    for (var prod of req.body) {
        updateFound(prod, res, db);
    }
}

function processFound(req, res, db){
    updateFound(req.body, res, db);
}

function updateFound(found, res, db){
    var id = found.id;

    if(!id){
        res.status(400).send("ID is mandatory");
    }

    else{
        var sql = `delete from founds where id = ?;`;
        var values = [id];

        db.serialize(function () {
            db.run(sql, values, function (err) {
                if (err){
                    console.error(err);
                    res.status(500).send(err);
                }
                else
                    res.send();
            });
        });
    }
}

