module.exports = function (app, db) {
    
    // Update a found
    // http://localhost:4300/api/found
    // Sending a JSON body:
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
    app.put('/api/found/', (req, res) => {
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
    validateRequest(req, res);
    updateFound(req.body, res, db);
}

function checkIfExist(){
    // TODO: check business
}

function updateFound(found, res, db){
    checkIfExist();

    var name = found.name;
    var description = found.description;
    var price = found.price;
    var currency = found.currency;
    var id = found.id;

    var sql = `update Founds
            set name = ?, description = ?, price = ?, currency = ?
            where id = ?;`;

    var values = [name, description, price, currency, id];

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
    var schema = JSON.parse(fs.readFileSync('app/data/found-schema-update.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });
}