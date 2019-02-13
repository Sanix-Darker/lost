/* Don't forget to add trigger.js for a sample demo */

var loc = [
  ['Bondi Beach', -33.890542, 151.274856, 2],
  ['Coogee Beach', -33.923036, 151.259052, 3],
  ['Cronulla Beach', -34.028249, 151.157507, 1],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

var locations = loc;

var get_icon_color = function (level){
  if(level == 1){
    return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  }else if(level == 2){
    return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
  }else{
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  }
}

var initMap = function() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
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
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }


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
  }


  var filter = function(level){
    if(parseInt(level) === 4){
      locations = loc;
    }else{
      locations = locations.filter(location => location[3] === parseInt(level));
    }
    initMap();
    locations = loc;
  }