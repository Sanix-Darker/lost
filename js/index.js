// Get all users
// var url  = "http://localhost:8080/api/v1/users";
// var xhr  = new XMLHttpRequest()
// xhr.open('GET', url, true)
// xhr.onload = function () {
// 	var users = JSON.parse(xhr.responseText);
// 	if (xhr.readyState == 4 && xhr.status == "200") {
// 		console.table(users);
// 	} else {
// 		console.error(users);
// 	}
// }
// xhr.send(null);


// // Get a user
// var url  = "http://localhost:8080/api/v1/users";
// var xhr  = new XMLHttpRequest()
// xhr.open('GET', url+'/1', true)
// xhr.onload = function () {
// 	var users = JSON.parse(xhr.responseText);
// 	if (xhr.readyState == 4 && xhr.status == "200") {
// 		console.table(users);
// 	} else {
// 		console.error(users);
// 	}
// }
// xhr.send(null);


// // Post a user
// var url = "http://localhost:8080/api/v1/users";

// var data = {};
// data.firstname = "John";
// data.lastname  = "Snow";
// var json = JSON.stringify(data);

// var xhr = new XMLHttpRequest();
// xhr.open("POST", url, true);
// xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
// xhr.onload = function () {
// 	var users = JSON.parse(xhr.responseText);
// 	if (xhr.readyState == 4 && xhr.status == "201") {
// 		console.table(users);
// 	} else {
// 		console.error(users);
// 	}
// }
// xhr.send(json);


// // Update a user
// var url = "http://localhost:8080/api/v1/users";

// var data = {};
// data.firstname = "John2";
// data.lastname  = "Snow2";
// var json = JSON.stringify(data);

// var xhr = new XMLHttpRequest();
// xhr.open("PUT", url+'/12', true);
// xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
// xhr.onload = function () {
// 	var users = JSON.parse(xhr.responseText);
// 	if (xhr.readyState == 4 && xhr.status == "200") {
// 		console.table(users);
// 	} else {
// 		console.error(users);
// 	}
// }
// xhr.send(json);


// // Delete a user
// var url = "http://localhost:8080/api/v1/users";
// var xhr = new XMLHttpRequest();
// xhr.open("DELETE", url+'/12', true);
// xhr.onload = function () {
// 	var users = JSON.parse(xhr.responseText);
// 	if (xhr.readyState == 4 && xhr.status == "200") {
// 		console.table(users);
// 	} else {
// 		console.error(users);
// 	}
// }
// xhr.send(null);


// function send(type){

//   var image = "", categorie = "", adresse =  "", lat =  "", lng =  "", description = "";

//   if (type == "looking"){
//     image = document.getElementById("image").value;
//     categorie = document.getElementById("categorie").value;
//     adresse = document.getElementById("searchTextField").value;
//     lat = document.getElementById("lat").value;
//     lng = document.getElementById("lng").value;
//     description = document.getElementById("description").value;
//   }else{
//     image = document.getElementById("image2").value;
//     categorie = document.getElementById("categorie2").value;
//     adresse = document.getElementById("searchTextField2").value;
//     lat = document.getElementById("lat2").value;
//     lng = document.getElementById("lng2").value;
//     description = document.getElementById("description2").value;
//   }

//   // http://sanix.pythonanywhere.com/api/lost?method=getall
// }