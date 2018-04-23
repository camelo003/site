/*
TO-DOS:
1. [ok] Qtde. de "totem steps" dinâmica;
2. [ok] Repetir primeiras entradas;
3. [  ] Calcular loop dinamicamente;
4. [  ] Pause quando enquanto 'over';
5. [  ] Ordem randômica;
6. [  ] Puxar gifs.
*/

var container;
var totem;

var entries = [
  {key: "div1", credit: ".camelo", link: "https://twitter.com/camelo003", div: ""},
  {key: "div2", credit: ".camelo", link: "https://twitter.com/camelo003", div: ""},
  {key: "div3", credit: ".camelo", link: "https://twitter.com/camelo003", div: ""},
  {key: "div4", credit: ".camelo", link: "https://twitter.com/camelo003", div: ""},
  {key: "div5", credit: ".camelo", link: "https://twitter.com/camelo003", div: ""},
  {key: "div6", credit: ".camelo", link: "https://twitter.com/camelo003", div: ""},
  {key: "div7", credit: ".camelo", link: "https://twitter.com/camelo003", div: ""}
];
var complete = {};

var vel = 0.5;

function initDiv(entrie){
  entrie.div = createDiv(entrie.key);
  entrie.div.class("totemFloor");
  entrie.div.parent(totem);
  var a = createA(entrie.link,entrie.credit);
  a.parent(totem);
}

function fillComplete(amount){
  for(var i=0;i<amount;i=i+1){
    complete[i] = {key: entries[i].key,credit: entries[i].credit,link: entries[i].link,div: entries[i].div};
    initDiv(complete[i]);
  }
}

var json = {};

function preload(){
  var url = "http://api.giphy.com/v1/gifs/" + "26gN0Jn614shuSf2U" + "?api_key=dc6zaTOxFJmzC";
  json = loadJSON(url);
}

function setup(){
  { //puxa imagem e coloca no html!
    var tempLink = json.data.images.original.url
    createImg("http" + tempLink.substring(5));
    print("http" + tempLink.substring(5));
  }

  container = createDiv("");
  container.class("cont");

  totem = createDiv("");
  totem.class("totem");
  totem.parent(container);

  for(var i=0;i<entries.length;i=i+1){
    initDiv(entries[i]);
  }

  fillComplete(6);

  noCanvas();
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
    //(100 for totem floor heught and 7 for entries.length)
    if(e < -(100*7)+1){
       totem.style("transform", "matrix(1, 0, 0, 1, 0, 0)");
       }
  } //check and loop translation!
}
