function Elm(name, attributes, children = []){
  let elm = document.createElement(name);
  for(let name in attributes ){
      elm.setAttribute(name, attributes[name]);
  }
  children.forEach(e=>elm.appendChild(e))
  return elm;
}

let Text = (nodeValue=>document.createTextNode(nodeValue))

function deleteLi(){
  document.querySelectorAll("#traditional > li").forEach((k) => { k.remove() })
}

function createColorLi(color) {
  text = Text(`${color.name} ${color.ruby} ${color.hex}`)
  const elm = Elm("li",
    {"style": `background-color: ${color.hex};`, "class": "color-li"},
    [Elm("span", {"class": "white-span"}, [text])]
  )
  return elm
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
  if (this.files.length > 0) {
    var reader = new FileReader();
    reader.readAsDataURL(this.files[0]);

    reader.onload = function() {
      deleteLi()
      const li = Elm("li", {}, [Text("読み込み中")])
      document.querySelector("#traditional").appendChild(li)
      img = document.querySelector('#image')
      img.setAttribute('src', reader.result);
      RGBaster.colors(img, option);
    }
  }
})
