var input = document.querySelector('input[type="file"]');
var img = document.querySelector('.preview-img');

input.addEventListener('change', function(event){
   var file = event.target.files[0];

   if (file) {
      var fileReader = new FileReader();

      fileReader.addEventListener("load", function () {
      img.src = fileReader.result;
      }, false);

      img.src = fileReader.readAsDataURL(file);
   }
});

function clearField() {
   img.src ="";   
   input.value="";
};