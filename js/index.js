/* Don't forget to add trigger.js for a sample demo */



var send = function (type){

  document.querySelector(".action").innerHTML = (LangWanted == "fr") ? "Envoies en cours..." : "Sending....";

   var formData = new FormData();

   if (type == "looking")
      formData.append("file", input.files[0]);
   else
      formData.append("file", input2.files[0]);

   var request = new XMLHttpRequest();
   request.open("POST", "http://");
   request.onload = function () {
     
     var response = JSON.parse(request.responseText);
     if (request.readyState == 4 && request.status == "200") {

         var image = response.url, categorie = "", adresse =  "", lat =  "", lng =  "", description = "";

         if (type == "looking"){
            categorie = document.getElementById("categorie").value;
            adresse = document.getElementById("searchTextField").value;
            lat = document.getElementById("lat").value;
            lng = document.getElementById("lng").value;
            description = document.getElementById("description").value;
         }else{
            categorie = document.getElementById("categorie2").value;
            adresse = document.getElementById("searchTextField2").value;
            lat = document.getElementById("lat2").value;
            lng = document.getElementById("lng2").value;
            description = document.getElementById("description2").value;
         }

         var request2 = new XMLHttpRequest();
         request2.open("GET", 
          API_URL + "/api/lost?method=post&image=" + image + 
          "&categorie=" + categorie + 
          "&adresse=" + adresse + 
          "&lat=" + lat + "&lng=" + lng +
          "&description=" + description + 
          "&type="+type
         );
         request2.onload = function () {
           
           var response2 = JSON.parse(request2.responseText);
           if (request2.readyState == 4 && request2.status == "200") {
              document.querySelector('.close').click();
              // close
              initMap();
              // Center sur les parametres voulus
              moveToLocation(parseFloat(lat), parseFloat(lng));
              
              document.querySelector(".action").innerHTML = (LangWanted == "fr") ? "Envoyer" : "Send";
              
              document.getElementById("previewimg1").src="";
              document.getElementById("previewimg2").src="";
              document.getElementById("categorie").value = null;
              document.getElementById("searchTextField").value = null;
              document.getElementById("lat").value = null;
              document.getElementById("lng").value = null;
              document.getElementById("description").value = null;
              document.getElementById("categorie2").value = null;
              document.getElementById("searchTextField2").value = null;
              document.getElementById("lat2").value = null;
              document.getElementById("lng2").value = null;
              document.getElementById("description2").value = null;
          }
        }
        request2.send(null);
     }
   }
   request.send(formData);
}
