CREATE TABLE IF NOT EXISTS Founds
( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    image TEXT NOT NULL , 
    categorie TEXT NOT NULL , 
    adresse TEXT NOT NULL , 
    lat TEXT NOT NULL , 
    lng TEXT NOT NULL , 
    description TEXT NOT NULL , 
    type TEXT NOT NULL 
);