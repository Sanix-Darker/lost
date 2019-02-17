var input = document.getElementById('previewfile1');
var img = document.getElementById('previewimg1');

input.addEventListener('change', function(event){
   var file = event.target.files[0];

   if (file) {
      var fileReader = new FileReader();

      fileReader.addEventListener("load", function () {
      img.src = fileReader.result;
      }, false);

      img.src = fileReader.readAsDataURL(file);
   }
});

var input2 = document.getElementById('previewfile2');
var img2 = document.getElementById('previewimg2');

input2.addEventListener('change', function(event){
   var file = event.target.files[0];

   if (file) {
      var fileReader = new FileReader();

      fileReader.addEventListener("load", function () {
         img2.src = fileReader.result;
      }, false);

      img2.src = fileReader.readAsDataURL(file);
   }
});


// function clearField() {
//    img.src ="";   
//    input.value="";
// };

function send(type){

   var image = "", categorie = "", adresse =  "", lat =  "", lng =  "", description = "";
 
   if (type == "looking"){
     image = document.getElementById("image").value;
     categorie = document.getElementById("categorie").value;
     adresse = document.getElementById("searchTextField").value;
     lat = document.getElementById("lat").value;
     lng = document.getElementById("lng").value;
     description = document.getElementById("description").value;
   }else{
     image = document.getElementById("image2").value;
     categorie = document.getElementById("categorie2").value;
     adresse = document.getElementById("searchTextField2").value;
     lat = document.getElementById("lat2").value;
     lng = document.getElementById("lng2").value;
     description = document.getElementById("description2").value;
   }
 
   // http://sanix.pythonanywhere.com/api/lost?method=getall
 }