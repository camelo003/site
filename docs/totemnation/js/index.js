/*
TO-DOS:
01 [ok] Qtde. de "totem steps" dinâmica;
02 [ok] Repetir primeiras entradas;
03 [ok] Calcular loop dinamicamente;
04 [ok] Pause quando enquanto 'over';
05 [  ] Ordem randômica;
06 [ok] Puxar gifs.
07 [ok] Loading (https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen)
08 [ok] Reestruturar o totem:
        -uma div para o totem
          -uma div para o andar
            -o gif
            -o link
09 [ok] Cores!
10 [ok] Scroll steps! (naquelas)
11 [ok] Links style!
12 [  ] Arrumar scroll para amboas os lados!
13 [  ] Nova resolucao
14 [  ] Gabarito + modelo
15 [  ] Presentations
16 [  ] Formulário

*/
var gifWidth = 400;
var gifHeight = 300;


var comtainer;
var totem;
var isOverTotem = false;

var entries = [
  {key: "3HDgoMoeold2Xmv8vH", credit: "Bruno Augusto Voginski (Karx)", link: "https://k4rx.tumblr.com/"},
  {key: "1zgdaD2EEOWxP7yXUb", credit: "Ágatha Tarrataca", link: "https://agathatarrataca.wordpress.com/"},
  {key: "g0NmaZ5VJmAM47fhhn", credit: "Alexandre Gonçalves", link: "https://giphy.com/channel/peixe180graus"},
  {key: "1yiPbbKa8bk7TyNJhh", credit: "Gabriel Camelo", link: "https://plus.google.com/+GabrielCamelo"}
];

var vel = 0.5;

function initAndFillDiv(entrie){
  var floor  = createDiv("");
  floor.class("totemFloor");
  floor.parent(totem);
  var img = createImg(entrie.json.data.images.original.url);
  img.parent(floor);
  img.style("width","400px");
  img.style("height","225px");
  var link = createA(entrie.link,entrie.credit,"_blank");
  link.class("link");
  link.parent(floor);
}

function fillComplete(amount){
  for(var i=0;i<amount;i=i+1){
    initAndFillDiv(entries[i]);
  }
}

function overTotem(){
  //vel = 0.0;
  isOverTotem = true;
}

function outTotem(){
  //vel = 0.5;
  isOverTotem = false;
}

function mouseClicked(){
  print(winMouseX + " " + winMouseY);
}

function overUpdate(status){
  if(status){
    vel = vel - 0.05;
    if(vel < 0){
      vel = 0.0;
    }
  }else{
    vel = vel + 0.05;
    if(vel > 0.5){
      vel = 0.5;
    }
  }
}

var scrollInc = 0.0;

function mouseWheel(event) {
  scrollInc = event.delta;
}

function preload(){
  for(var i=0;i<entries.length;i=i+1){
    var url = "http://api.giphy.com/v1/gifs/" + entries[i].key + "?api_key=dc6zaTOxFJmzC";
    entries[i].json = loadJSON(url);
  }
}

function setup(){
  noCanvas();

  comtainer = select("#container");
  comtainer.class("cont");

  totem = createDiv("");
  totem.class("totem");
  totem.parent(comtainer);

  for(var i=0;i<entries.length;i=i+1){
    initAndFillDiv(entries[i]);
  }

  fillComplete(Math.ceil(500/225));

  totem.mouseOver(overTotem);
  totem.mouseOut(outTotem);
}

function draw(){
  {
  var a = totem.style("transform").split(", ");
  var b = a[5];
  var c = b.slice(0,-1);
  var d = parseFloat(c);

  overUpdate(isOverTotem);

  var e = d - vel;

  if(isOverTotem){
    e = e - Math.abs(scrollInc);
  }

  totem.style("transform", "matrix(1, 0, 0, 1, 0, " + e + ")");
  } //read, increment and update css translation!

  {
    //(180 for totem floor height)
    if(e < -(225*entries.length)+1){
       totem.style("transform", "matrix(1, 0, 0, 1, 0, 0)");
       }
  } //check and loop translation!

  //reset scrollInc
  scrollInc = 0;
}
