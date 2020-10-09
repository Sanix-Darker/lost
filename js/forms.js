
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
  