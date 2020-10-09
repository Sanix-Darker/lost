
for(let button of document.querySelectorAll(`button[data-modal-trigger]`)) {
    modalEvent(button);
}

// In the form [LOOKING FOR, etc...]
var a,lat,long;
var markerimg = 'https://i.imgur.com/Qwv4lBZ.png';

var initialize_form_place = function() {
  
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
    });
};

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

        });
      }
    }
    xhr.send(null);
}
