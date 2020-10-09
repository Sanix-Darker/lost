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

    locations = (parseInt(level) === 4) ? loc : locations.filter(location => location[3] === parseInt(level));

    generateMapFromLocations(locations);
    locations = loc;
}
  

// Formulaires
document.getElementById('previewfile1').addEventListener('change', function(event){
    // we preview the image to that image element
    previewImg(event, 'previewimg1');
});
  

document.getElementById('previewfile2').addEventListener('change', function(event){
    // we preview the image to that image element
    previewImg(event, 'previewimg2');
});
