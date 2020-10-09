
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

      const {
        image,
        categorie,
        adresse,
        lat, lng,
        description
      } = getParamsFromType(type);

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
          
          resetForm();
        }
      }
      request2.send(null);
    }
  }
  request.send(formData);
}
