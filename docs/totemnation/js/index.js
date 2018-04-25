/*
TO-DOS:
1. [ok] Qtde. de "totem steps" dinâmica;
2. [ok] Repetir primeiras entradas;
3. [ok] Calcular loop dinamicamente;
4. [ok] Pause quando enquanto 'over';
5. [  ] Ordem randômica;
6. [ok] Puxar gifs.
7. [ok] Loading (https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen)
8. [ok] reestruturar o totem:
        -uma div para o totem
          -uma div para o andar
            -o gif
            -o link

*/

var comtainer;
var totem;
var isOverTotem = false;

var entries = [
  {key: "l1IBhYOZfhLz2NfSU", credit: "Pedro Miranda Filho", link: "https://giphy.com/pedromirfilho/"},
  {key: "3o751YFJcflc0SOBS8", credit: "Pedro Miranda Filho", link: "https://giphy.com/pedromirfilho/"},
  {key: "1yMfhX748Xzo5fF2d4", credit: "Pedro Miranda Filho", link: "https://giphy.com/pedromirfilho/"},
  {key: "26gN0Jn614shuSf2U", credit: "Pedro Miranda Filho", link: "https://giphy.com/pedromirfilho/"},
  {key: "3o752gFScyte7n6fCM", credit: "Pedro Miranda Filho", link: "https://giphy.com/pedromirfilho/"},
  {key: "l0HUeDZfTRQuKIvCg", credit: "Pedro Miranda Filho", link: "https://giphy.com/pedromirfilho/"},
  {key: "1lvTGOdg47rhHP0d61", credit: "Pedro Miranda Filho", link: "https://giphy.com/pedromirfilho/"}
];

var vel = 0.5;

function initAndFillDiv(entrie){
  var floor  = createDiv("");
  floor.class("totemFloor");
  floor.parent(totem);
  var img = createImg(entrie.json.data.images.original.url);
  img.parent(floor);
  img.style("width","400px");
  img.style("height","180px");
  var link = createA(entrie.link,entrie.credit);
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
    vel = vel - 0.02;
    if(vel < 0){
      vel = 0.0;
    }
  }else{
    vel = vel + 0.02;
    if(vel > 0.5){
      vel = 0.5;
    }
  }
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

  fillComplete(Math.ceil(500/180));

  totem.mouseOver(overTotem);
  totem.mouseOut(outTotem);
}

function draw(){
  {
  var a = totem.style("transform").split(", ");
  var b = a[5];
  var c = b.slice(0,-1);
  var d = parseFloat(c);
  var e = d - vel;
  totem.style("transform", "matrix(1, 0, 0, 1, 0, " + e + ")");
  } //read, increment and update css translation!

  {
    //(180 for totem floor height)
    if(e < -(180*entries.length)+1){
       totem.style("transform", "matrix(1, 0, 0, 1, 0, 0)");
       }
  } //check and loop translation!

  overUpdate(isOverTotem);
}
