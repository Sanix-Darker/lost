var xhr = new XMLHttpRequest();
xhr.open('GET', '/DB/lost.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.onload = e => {
  var uInt8Array = new Uint8Array(this.response);
  var db = new SQL.Database(uInt8Array);
  var contents = db.exec("SELECT * FROM my_table");
  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]



  //Create the database
  // var db = new SQL.Database();
  // Run a query without reading the results
  db.run("CREATE TABLE test (col1, col2);");
  // Insert two rows: (1,111) and (2,222)
  db.run("INSERT INTO test VALUES (?,?)", [1,111,2,222]);

  // Prepare a statement
  var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
  stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

  // Bind new values
  stmt.bind({$start:1, $end:2});
  while(stmt.step()) { //
    var row = stmt.getAsObject();
    // [...] do something with the row of result
  }

};
xhr.send();

var INSERT = function (database, table, array_row){

}

var UPDATE = function (database, table, array_row){

}

var DELETE = function(database, table, array_row){

}