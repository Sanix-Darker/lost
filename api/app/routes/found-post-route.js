module.exports = function (app, db) {
    
    // Add new found
    // http://localhost:4300/api/found
    // Sending a JSON body:
    // {
    //     "name": "ExampleFoundName",
    //     "description": "Example found description",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of founds:
    // [
    //     {...},{...}
    // ]
    app.post('/api/found/', (req, res) => {
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
        insertFound(prod, res, db);
    }
}

function processFound(req, res, db){
    validateRequest(req, res);
    insertFound(req.body, res, db);
}

function insertFound(found, res, db){
    var image = found.image;
    var categorie = found.categorie;
    var adresse = found.adresse;
    var lat = found.lat;
    var lng = found.lng;
    var description = found.description;
    var type = found.type;

    console.log("found:", found);

    var sql = `INSERT INTO "founds" (image, categorie, adresse, lat, lng, description, type) VALUES  (?, ?, ?, ?, ?, ?, ?);`;

    var values = [image, categorie, adresse, lat, lng, description, type];

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

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/found-schema.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });

    if (req.body.id) {
        res.status(400).send("ID cannot be submmited");
    }
}