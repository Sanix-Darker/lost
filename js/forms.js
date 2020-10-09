/***
 * forms.js
 * this file is for all form stuffs
 */

// To manage Filter on the level of the thing lost
var filter = function(level){
    document.getElementById("filter_1").classList.remove("menu_selected");
    document.getElementById("filter_2").classList.remove("menu_selected");
    document.getElementById("filter_3").classList.remove("menu_selected");
    document.getElementById("filter_4").classList.remove("menu_selected");
    document.getElementById("filter_"+level).classList.add("menu_selected");

    if(parseInt(level) === 4){
      locations = loc;
    }else{
      locations = locations.filter(location => location[3] === parseInt(level));
    }
    generateMapFromLocations(locations);
    locations = loc;
}


/**
 * We preview the img
 * @param {*} event 
 * @param {*} Id 
 */
var previewImg = function (event, Id){
    var file = event.target.files[0];

    if(file.size > 500000){
       alert("Your image is too hight!")
       return false;
    }

    if (file) {
        var fileReader = new FileReader();

        fileReader.addEventListener("load", function () {
            document.getElementById(Id).src = fileReader.result;
        }, false);

        document.getElementById(Id).src = fileReader.readAsDataURL(file);
    }
}
  

// Formulaires
document.getElementById('previewfile1').addEventListener('change', function(event){
    previewImg(event, 'previewimg1');
});
  

document.getElementById('previewfile2').addEventListener('change', function(event){
    previewImg(event, 'previewimg2');
});
