/* Don't forget to add trigger.js for a sample demo */

var API_URL = "http://sanix.pythonanywhere.com";

var get_icon_color = function (level){
  if(level == 1){
    return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  }else if(level == 2){
    return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
  }else{
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  }
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

  var id = UniqueID();
  return '<div id="iw-container">' +
            '<div class="iw-content">' +
              '<img src="'+locations[5]+'" alt="Image" >' +
              '<div class="iw-subTitle">' + locations[0] + '</div>' +
              '<br><div class="infowindow_description">' + locations[6] + '</div><hr>'+
              '<span translate="EXPLICATIONS_COMMENTS">Please contact me directly or write a small comment here to help me, thank you (<b>Note:</b> You can write only 2 comments).<br></span>'+
              '<div id="found_'+id+'" >'+
                '<label>'+
                    '<span translate="FORM_CONTACT">Your Contact</span><br>'+
                    '<input type="text" id="textfound_'+id+'" placeholder="max(50)" class="infowindowForm"/>'+
                '</label><br>'+
                '<label>'+
                    '<span  translate="FORM_COMMENTS_DESCRIPTION">Explains in few line where you found(max 100)</span><br>'+
                    '<textarea rows="5" id="descriptionfound_'+id+'" class="infowindowForm"></textarea><br>'+
                '</label>'+
                '<button translate="BUTTON_SEND">Send</button>'+
              '</div>'+
              '<br><span translate="SUBTITLE_COMMENTS">Some Comments</span>'+
              '<div id="comments_'+id+'">'+
                comments+
              '</div>'+
            '</div>'+
          '</div>';
} 

var map;
var generateMapFromLocations = function(locations){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
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


var xhr  = new XMLHttpRequest();
var locations;
var loc = [];
var initMap = function() {
    initialize_form_place();

    xhr.open('GET', API_URL + "/api/lost?method=getall", true)
    xhr.onload = function () {
      
      var lost = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == "200") {
        console.log("Lost Console Datas!");
        console.table(lost.data);
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
        //console.log("array_", loc);

        locations = loc;

        generateMapFromLocations(locations);

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
            map.setZoom(17);
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
        console.error(lost.data);
      }
    }
    xhr.send(null);
  }

  var filter = function(level){
    // console.log(level)
    if(parseInt(level) === 4){
      locations = loc;
    }else{
      locations = locations.filter(location => location[3] === parseInt(level));
    }

    generateMapFromLocations(locations);

    locations = loc;
  }