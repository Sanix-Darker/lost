/* AUTO COMPLETE METHODS ----
----------------------------*/
//the text field element and an array of possible autocompleted values:*/
var currentFocus;
var inp = document.getElementById("myInput");

/**
 * a function to classify an item as "active":
 * start by removing the "active" class on all items:
 * @param {*} x 
 */
var addActive = function (x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  /*add class "autocomplete-active":*/
  x[currentFocus].classList.add("autocomplete-active");
}

/**
 * A function to remove the "active" class from all autocomplete items:
 * @param {*} x 
 */
var removeActive = function (x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}

/**
 * close all autocomplete lists in the document, except the one passed as an argument
 * @param {*} elmnt 
 */
var closeAllLists = function (elmnt) {
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
    }
  }
}

var getElement_By_Description = function(datas, description){
  return datas.filter(obj => {
    return obj.description == description
  })[0];
}

/**
 * We create the event listener on a button
 * @param {*} button 
 */
var modalEvent = function (button) {
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

/**
 * This method will return a unique ID
 */
var UniqueID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};


/**
 * This method will just return an appropriate icon depending on the level
 * @param {*} level 
 */
var get_icon_color = function (level){
    if(level == 1){
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }else if(level == 2){
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }else{
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
}

/**
 * This method will just generate the InfoWindow bull
 * @param {*} locations 
 * @param {*} comments 
 */
var buildInfowindow = function(locations, comments){
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
  