/* Don't forget to add trigger.js for a sample demo */

var API_URL = "http://127.0.0.1:5000";

var get_icon_color = function (level){
  if(level == 1){
    return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  }else if(level == 2){
    return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
  }else{
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  }
}


const buttons = document.querySelectorAll(`button[data-modal-trigger]`);

for(let button of buttons) {
    modalEvent(button);
}

function modalEvent(button) {
    button.addEventListener('click', () => {

        const trigger = button.getAttribute('data-modal-trigger');
        const modal = document.querySelector(`[data-modal=${trigger}]`);
        const contentWrapper = modal.querySelector('.content-wrapper');
        const close = modal.querySelector('.close');

        close.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', () => modal.classList.remove('open'));
        contentWrapper.addEventListener('click', (e) => e.stopPropagation());

        modal.classList.toggle('open');
    });
}

// In the form [LOOKING FOR, etc...]
var a,lat,long;
var markerimg = 'https://i.imgur.com/Qwv4lBZ.png';

var initialize_form_place = function() {
    //document.getElementById("info").style.backgroundImage = "url(https://maps.googleapis.com/maps/api/staticmap?center=toronto&zoom=15&scale=1&size=700x420&maptype=roadmap&format=png&visual_refresh=true&markers=icon:"+markerimg+"%7Cshadow:true%7Ctoronto)";

    var searchBox = document.getElementById('searchTextField');
    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(43.7182713,-79.3777061));

    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(searchBox,defaultBounds);
  
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      a = place.formatted_address;
      lat = place.geometry.location.lat();
      long = place.geometry.location.lng();
      document.getElementById("latlng").innerHTML = ' '+lat+' , '+long;
      document.getElementById("lat").value = lat;
      document.getElementById("lng").value = long;
      // document.getElementById("info").style.backgroundImage = "url(https://maps.googleapis.com/maps/api/staticmap?center="+lat+','+long+"&zoom=15&key=AIzaSyAfxspB4AgYgfzf1ipKS5Al0CA3cAYfZRQ&scale=1&size=700x420&maptype=roadmap&format=png&visual_refresh=true&markers=icon:"+markerimg+"%7Cshadow:true%7C"+lat+','+long+")";
    });


    var searchBox2 = document.getElementById('searchTextField2');
    var defaultBounds2 = new google.maps.LatLngBounds(new google.maps.LatLng(43.7182713,-79.3777061));

    var input2 = document.getElementById('searchTextField2');
    var autocomplete2 = new google.maps.places.Autocomplete(searchBox2,defaultBounds2);
  
    google.maps.event.addListener(autocomplete2, 'place_changed', function () {
      var place = autocomplete2.getPlace();
      a = place.formatted_address;
      lat = place.geometry.location.lat();
      long = place.geometry.location.lng();
      document.getElementById("latlng2").innerHTML = ' '+lat+' , '+long;
      document.getElementById("lat2").value = lat;
      document.getElementById("lng2").value = long;
      // document.getElementById("info").style.backgroundImage = "url(https://maps.googleapis.com/maps/api/staticmap?center="+lat+','+long+"&zoom=15&key=AIzaSyAfxspB4AgYgfzf1ipKS5Al0CA3cAYfZRQ&scale=1&size=700x420&maptype=roadmap&format=png&visual_refresh=true&markers=icon:"+markerimg+"%7Cshadow:true%7C"+lat+','+long+")";
    });
};

var UniqueID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};


var buildInfowindow = function(locations, comments){
  ////console.log("locations: ", locations);
  var id = UniqueID();
  return '<div id="iw-container">' +
          ((locations[4] !== "found") ? '<div class="redSup" translate="LOOKING_BUTTON">Looking for</div>' : '<div class="greenSup" translate="FOUND_BUTTON"> I found </div>') +
            '<div class="iw-content">' +
              '<img src="http://'+locations[5]+'" alt="Image" >' +
              '<div class="iw-subTitle">' + locations[0] + '</div>' +
              '<br><div class="infowindow_description">' + locations[6] + '</div><hr>'+
              // '<span translate="EXPLICATIONS_COMMENTS">Please contact me directly or write a small comment here to help me, thank you (<b>Note:</b> You can write only 2 comments).<br></span>'+
              // '<div id="found_'+id+'" >'+
              //   '<label>'+
              //       '<span translate="FORM_CONTACT">Your Contact</span><br>'+
              //       '<input type="text" id="textfound_'+id+'" placeholder="max(50)" class="infowindowForm"/>'+
              //   '</label><br>'+
              //   '<label>'+
              //       '<span  translate="FORM_COMMENTS_DESCRIPTION">Explains in few line where you found(max 100)</span><br>'+
              //       '<textarea rows="5" id="descriptionfound_'+id+'" class="infowindowForm"></textarea><br>'+
              //   '</label>'+
              //   '<button translate="BUTTON_SEND">Send</button>'+
              // '</div>'+
              // '<br><span translate="SUBTITLE_COMMENTS">Some Comments</span>'+
              // '<div id="comments_'+id+'">'+
              //   comments+
              // '</div>'+
            '</div>'+
          '</div>';
} 

var map;
var generateMapFromLocations = function(locations){

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: new google.maps.LatLng(4, 9),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: {
        url: get_icon_color(locations[i][3])
      }
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        var comments = "";
        // une query qui recuperes les commentaires sur cet article que lorsqu'on cliques dessus
        comments += '<hr><b>> 6999999999</b> 2016/05/12 :<br>'+
                    '<i>"Example of note that mention, i found some thing!</i>'+
                    '<hr><b>> salem@yahoo.fr</b> 2016/05/12 :<br>'+
                    '<i>"ha ha trouvee!</i>';

        infowindow.setContent(buildInfowindow(locations[i], comments));
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

/* AUTO COMPLETE METHODS ----
----------------------------*/
//the text field element and an array of possible autocompleted values:*/
var currentFocus;
var inp = document.getElementById("myInput");
function addActive(x) {
  /*a function to classify an item as "active":*/
  if (!x) return false;
  /*start by removing the "active" class on all items:*/
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  /*add class "autocomplete-active":*/
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
  x[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists(elmnt) {
  /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
  if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
  }
  }
}


var getElement_By_Description = function(datas, description){
  // //console.log("datas: ", datas);
  // //console.log("description: ", description);
  return datas.filter(obj => {
    return obj.description == description
  })[0];
}

function moveToLocation(lat, lng){
  var center = new google.maps.LatLng(lat, lng);
  // using global variable:
  map.panTo(center);
  map.setZoom(13);
}

var xhr  = new XMLHttpRequest();
var locations;
var loc = [];
var initMap = function() {
    initialize_form_place();

    xhr.open('GET', API_URL + "/api/lost?method=getall", true)
    xhr.onload = function () {
      
      var lost = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == "200") {
        //console.log("Lost //console Datas!");
        //console.table(lost.data);
        for (var i = 0; i < lost.data.length; i++){
          loc.push([lost.data[i].adresse, 
                        parseFloat(lost.data[i].lat), 
                        parseFloat(lost.data[i].lng),
                        parseInt(lost.data[i].categorie), 
                        lost.data[i].type,
                        lost.data[i].image,
                        lost.data[i].description ]);
        }
        loc = loc.reverse();
        
        locations = loc;
        ////console.log("Haut locations:", locations)
        generateMapFromLocations(locations);

        /* AUTO COMPLETE SCRIPT ----
        ----------------------------*/
        /*the autocomplete function takes two arguments,*/
        var arr = lost.data;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/

            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                if (arr[i].description.toLowerCase().includes(val.toLowerCase())) {

                  /*create a DIV element for each matching element:*/
                  b = document.createElement("DIV");
                  /*make the matching letters bold:*/
                  var re = new RegExp("\\b("+val+")\\b");
                  var subst = '<strong>$1</strong>';

                  // A Proble for the regex here, will look it later
                  // //console.log("re: ", re);
                  // //console.log("val: ", val);
                  // //console.log("arr[i]: ", arr[i]);
                  // //console.log("subst: ", subst);
                  // //console.log("arr[i].replace(re, subst): ", arr[i].replace(re, subst));

                  b.innerHTML = arr[i].description.replace(re, subst);
                  /*insert a input field that will hold the current array item's value:*/
                  b.innerHTML += "<input type='hidden' value='" + arr[i].description + "'>";
                  /*execute a function when someone clicks on the item value (DIV element):*/
                  b.addEventListener("click", function(e) {
                      /*insert the value for the autocomplete text field:*/
                      inp.value = this.getElementsByTagName("input")[0].value;
                      /*close the list of autocompleted values,
                      (or any other open lists of autocompleted values:*/
                      closeAllLists();
                  });
                  a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                if (currentFocus > -1) {
                  /*and simulate a click on the "active" item:*/
                  if (x) x[currentFocus].click();
                  // //console.log("e:", e);
                  // //console.log("getElement_By_Description(lost.data, e.target.value): ", getElement_By_Description(lost.data, e.target.value));
                  var lost_element = getElement_By_Description(lost.data, e.target.value);
                  moveToLocation(lost_element.lat, lost_element.lng)
                }
            }
        });
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });



        // Autocomplete methods
        var input = document.getElementById('pac-input');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
          }

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
          });
          marker.setVisible(true);

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                                    'Place ID: ' + place.place_id + '<br>' +
                                    place.formatted_address);

          infowindow.open(map, marker);

          var service = new google.maps.places.PlacesService(map);
          
          var details_container = document.getElementById('details');
          
          service.getDetails({
            placeId: place.place_id
          }, function(place, status) {
            details_container.innerHTML = '<p><strong>Status:</strong> <code>' + status + '</code></p>' +
              '<p><strong>Place ID:</strong> <code>' + place.place_id + '</code></p>' +
              '<p><strong>Location:</strong> <code>' + place.geometry.location.lat() + ', ' + place.geometry.location.lng() + '</code></p>' +

              '<p><strong>Formatted address:</strong> <code>' + place.formatted_address + '</code></p>' +
              '<p><strong>GMap Url:</strong> <code>' + place.url + '</code></p>' +
              '<p><strong>Place details:</strong></p>' +
              '<pre>' + JSON.stringify(place, null, " ") + '</pre>';

          });

        }); // end autocomplete addListener

      } else {
        //console.error(lost.data);
      }
    }
    xhr.send(null);
  }


// To manage Filter on the level of the thing lost
var filter = function(level){
  document.getElementById("filter_1").classList.remove("menu_selected");
  document.getElementById("filter_2").classList.remove("menu_selected");
  document.getElementById("filter_3").classList.remove("menu_selected");
  document.getElementById("filter_4").classList.remove("menu_selected");
  document.getElementById("filter_"+level).classList.add("menu_selected");
  // //console.log(level)
  if(parseInt(level) === 4){
    locations = loc;
  }else{
    locations = locations.filter(location => location[3] === parseInt(level));
  }
  generateMapFromLocations(locations);
  locations = loc;
}


// Formulaires
var input = document.getElementById('previewfile1');
var img = document.getElementById('previewimg1');

input.addEventListener('change', function(event){
   var file = event.target.files[0];

   if(file.size > 500000){
     alert("Your image is too hight!")
     return false;
   }

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
  
    if(file.size > 500000){
      alert("Your image is too hight!")
      return false;
    }
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

  if(value_of_lang_you_want == "fr"){
    document.querySelector(".action").innerHTML = "Envoies en cours...";
  }else{
    document.querySelector(".action").innerHTML = "Sending....";
  }

   var formData = new FormData();

   if (type == "looking"){
      // HTML file input, chosen by user
      formData.append("file", input.files[0]);
   }else{
      // HTML file input, chosen by user
      formData.append("file", input2.files[0]);
   }

   var request = new XMLHttpRequest();
   request.open("POST", "http://lostimage.000webhostapp.com");
   request.onload = function () {
     
     var response = JSON.parse(request.responseText);
     if (request.readyState == 4 && request.status == "200") {

         ////console.log("response: ", response);

         var image = response.url, categorie = "", adresse =  "", lat =  "", lng =  "", description = "";

         ////console.log("image:", image);

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

        //  //console.log("http://sanix.pythonanywhere.com/api/lost?method=post&image="+image+
        //  "&categorie="+categorie+
        //    "&adresse="+adresse+
        //      "&lat="+lat+
        //        "&lng="+lng+
        //          "&description="+description);

         var request2 = new XMLHttpRequest();
         request2.open("GET", "http://sanix.pythonanywhere.com/api/lost?method=post&image="+image+
                                                                                              "&categorie="+categorie+
                                                                                                "&adresse="+adresse+
                                                                                                  "&lat="+lat+
                                                                                                    "&lng="+lng+
                                                                                                      "&description="+description+
                                                                                                        "&type="+type);
         request2.onload = function () {
           
           var response2 = JSON.parse(request2.responseText);
           if (request2.readyState == 4 && request2.status == "200") {
               //console.log("response2: ", response2);
               document.querySelector('.close').click();
               // close
               initMap();
               // Center sur les parametres voulus
               moveToLocation(parseFloat(lat), parseFloat(lng));

              if(value_of_lang_you_want == "fr"){
                document.querySelector(".action").innerHTML = "Envoyer";
              }else{
                document.querySelector(".action").innerHTML = "Send";
              }
              
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



   // http://sanix.pythonanywhere.com/api/lost?method=getall
 }