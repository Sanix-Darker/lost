exports.test = function(sql, assert) {
  // Create a database
  var db = new sql.Database();

  db.run("CREATE TABLE test (data TEXT);");

  db.exec("SELECT * FROM test;");
  assert.deepEqual(db.getRowsModified(), 0, "getRowsModified returns 0 at first");
  
  db.exec("INSERT INTO test VALUES ('Hello1');");
  db.exec("INSERT INTO test VALUES ('Hello');");
  db.exec("INSERT INTO test VALUES ('Hello');");
  db.exec("INSERT INTO test VALUES ('World4');");
  assert.deepEqual(db.getRowsModified(), 1, "getRowsModified works for inserts");

  db.exec("UPDATE test SET data = 'World4' where data = 'Hello';");
  assert.deepEqual(db.getRowsModified(), 2, "getRowsModified works for updates");

  db.exec("DELETE FROM test;");
  assert.deepEqual(db.getRowsModified(), 4, "getRowsModified works for deletes");

  db.exec("SELECT * FROM test;");
  assert.deepEqual(db.getRowsModified(), 4, "getRowsModified unmodified by queries");

};

if (module == require.main) {
  var sql = require('../js/sql.js');
  var assert = require('assert');
  exports.test(sql, assert);
}
