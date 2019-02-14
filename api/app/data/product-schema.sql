CREATE TABLE IF NOT EXISTS Founds
( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL , 
    description TEXT NOT NULL , 
    price INT NOT NULL , 
    currency TEXT NOT NULL
);