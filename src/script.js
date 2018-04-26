var option = {
  paletteSize: 10,
  exclude: ['rgb(0,0,0)', 'rgb(255,255,255)'],
  success: function(payload) {
    console.log(payload)
    console.log(payload.dominant);
    console.log(payload.secondary);
    console.log(payload.palette);
    document.querySelector("#dominant").style = "background-color:" + payload.dominant + ";"
    document.querySelector("#dominant").innerText += payload.dominant
    payload.palette.forEach((color) =>{
      console.log('%csam', 'background-color:'+color)
    })
  }
}

var image = document.getElementById('image');
RGBaster.colors(image, option);

document.querySelector("#file").addEventListener("change", function() {
  console.log("this", this)
  if (this.files.length > 0) {
    var reader = new FileReader();
    reader.readAsDataURL(this.files[0]);

    reader.onload = function() {
      img = document.querySelector('#image')
      img.setAttribute('src', reader.result);
      RGBaster.colors(img, option);
    }
  }
})
