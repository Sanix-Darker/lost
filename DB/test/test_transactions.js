exports.test = function(SQL, assert){
  var db = new SQL.Database();
  db.exec("CREATE TABLE test (data); INSERT INTO test VALUES (1);");

  // Open a transaction
  db.exec("BEGIN TRANSACTION;");

  // Insert a row
  db.exec("INSERT INTO test VALUES (4);")

  // Rollback
  db.exec("ROLLBACK;");

  var res = db.exec("SELECT data FROM test WHERE data = 4;");
  var expectedResult =  [];
  assert.deepEqual(res, expectedResult, "transaction rollbacks work");

  // Open a transaction
  db.exec("BEGIN TRANSACTION;");

  // Insert a row
  db.exec("INSERT INTO test VALUES (4);")

  // Commit
  db.exec("COMMIT;");

  var res = db.exec("SELECT data FROM test WHERE data = 4;");
  var expectedResult =  [{
    columns : ['data'],
    values : [
      [4]
    ]
  }];
  assert.deepEqual(res, expectedResult, "transaction commits work");

  // Open a transaction
  db.exec("BEGIN TRANSACTION;");

  // Insert a row
  db.exec("INSERT INTO test VALUES (5);")

  // Rollback
  db.exec("ROLLBACK;");

  var res = db.exec("SELECT data FROM test WHERE data IN (4,5);");
  var expectedResult =  [{
    columns : ['data'],
    values : [
      [4]
    ]
  }];
  assert.deepEqual(res, expectedResult, "transaction rollbacks after commits work");

  db.close();
};

if (module == require.main) {
  var sql = require('../js/sql.js');
  var assert = require("assert");
  exports.test(sql, assert);
}
