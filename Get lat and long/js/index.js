var a,lat,long;
var markerimg = 'https://i.imgur.com/Qwv4lBZ.png';

function initialize() {
    document.getElementById("info").style.backgroundImage = "url(https://maps.googleapis.com/maps/api/staticmap?center=toronto&zoom=15&scale=1&size=700x420&maptype=roadmap&format=png&visual_refresh=true&markers=icon:"+markerimg+"%7Cshadow:true%7Ctoronto)";

    var searchBox = document.getElementById('searchTextField');
    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(43.7182713,-79.3777061));

    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(searchBox,defaultBounds);
  
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      a = place.formatted_address;
      lat = place.geometry.location.lat();
      long = place.geometry.location.lng();
      document.getElementById("latlng").innerHTML = 'Coordinates: '+lat+' , '+long;
      document.getElementById("info").style.backgroundImage = "url(https://maps.googleapis.com/maps/api/staticmap?center="+lat+','+long+"&zoom=15&scale=1&size=700x420&maptype=roadmap&format=png&visual_refresh=true&markers=icon:"+markerimg+"%7Cshadow:true%7C"+lat+','+long+")";
    });
};
google.maps.event.addDomListener(window, 'load', initialize);