# node-js-sqlite
Simple NodeJS Rest API with CRUD routes.
Using SQLite database

## How to Install
```sh
$ npm install 
$ npm run dev
```

It will be running on port 4300

------------

## How to use

### POST
* **Add new found:**
```
http://localhost:4300/api/found
```
Sending a JSON body:
```javascript
{
	"name": "ExampleFoundName",
	"description": "Example found description",
	"price": 2.00,
	"currency": "EUR" 
}
```
or an array of founds:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### PUT
* **Update a found:**
```
http://localhost:4300/api/found
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleFoundName",
	"description": "Example found description",
	"price": 2.00,
	"currency": "EUR" 
}
```
or an array of founds:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### DELETE
* **Delete a found:**
```
http://localhost:4300/api/found
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleFoundName",
	"description": "Example found description",
	"price": 2.00,
	"currency": "EUR" 
}
```
or an array of founds:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### GET
* **Load founds by ID:**
```
http://localhost:4300/api/found/id/$id
```
example: http://localhost:4300/api/found/id/15
_____

* **Load all founds:**
```
http://localhost:4300/api/found/
```
______

* **Load founds by any attribute and value:** 
```
http://localhost:4300/api/found/$attribute/$name
```
example: 
- http://localhost:4300/api/found/price/24
- http://localhost:4300/api/found/name/Suntone
$attribute = ['name', 'price', 'currency', 'description']
(this is not checked values, wrong parameters will return a DB error.)
_____

* **Load all founds sorting by attribute** 
```
http://localhost:4300/api/found/sort/$attribute
```
example: 
- http://localhost:4300/api/found/sort/price
- http://localhost:4300/api/found/sort/name

$attribute = ['name', 'price', 'currency', 'description']
(this is not checked values, wrong parameters will return a DB error)
____

* **Load founds sorting ASC or DESC by any attribute:**
```
http://localhost:4300/api/found/sort/$direction/$attribute
```
example: 
- http://localhost:4300/api/found/sort/asc/price
- http://localhost:4300/api/found/sort/desc/price

$attribute = ['name', 'price', 'currency', 'description']*
$direction [ASC or DESC]C]*
(the direction is checked and when wrong will return a 401 business error)
_____

### Node version
The Node version used was 6.9.3