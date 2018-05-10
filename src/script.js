function setColors(color) {
  var newDiv = document.createElement("li");
  var newContent = document.createTextNode(color.colorName);
  // テキストノードを新規作成した div に追加します
  newDiv.appendChild(newContent)
  newDiv.style.backgroundColor = color.hex;
  document.querySelector("#traditional").appendChild(newDiv);
}

function deleteLi(){
  document.querySelectorAll("#traditional > li").forEach((k) => { k.remove() })
}

function createColorLi(color) {
  const newLi = document.createElement("li");
  const newContent = document.createTextNode(
    `${color.name} ${color.ruby} ${color.hex}`
  );
  newLi.appendChild(newContent);
  newLi.style = "background-color:" + color.hex + ";"
  return newLi
}

function createLi(text) {
  const newLi = document.createElement("li");
  const newContent = document.createTextNode(text);
  newLi.appendChild(newContent);
  return newLi
}

const success = function(payload) {
  let colorsCount = { }
  payload.palette.forEach((color) => {
    const nearColorObj = tc.getNearColor(tc.rgbStrToObj(color.name))

    if ( nearColorObj.hex in colorsCount ) {
      colorsCount[nearColorObj.hex].count += color.count
    } else {
      colorsCount[nearColorObj.hex] = {
        count: color.count,
        obj: nearColorObj
      }
    }
  })
  colorsCount = Object.values(colorsCount).sort((a, b) =>  b.count - a.count)
  const ul = document.querySelector("#traditional")
  deleteLi()
  colorsCount.map((color) => {
    const li = createColorLi(color.obj)
    ul.appendChild(li)
    // console.log('%c this is color' + `${color.obj.hex}, ${color.obj.name}`, 'background-color:'+ color.obj.hex);
  })

}

var option = {
  paletteSize: 1000,
  exclude: ['rgb(0,0,0)', 'rgb(255,255,255)'],
  success
}

var image = document.getElementById('image');
RGBaster.colors(image, option);
const tc = new window.TraditionalColors();

document.querySelector("#file").addEventListener("change", function() {
  console.log("this", this)
  if (this.files.length > 0) {
    var reader = new FileReader();
    reader.readAsDataURL(this.files[0]);

    reader.onload = function() {
      deleteLi()
      document.querySelector("#traditional").appendChild(createLi("読み込み中"))
      img = document.querySelector('#image')
      img.setAttribute('src', reader.result);
      RGBaster.colors(img, option);
    }
  }
})
