window.onload = setup;
setInterval(Update, 1000 / 120);
var drawAtX;
var drawAtY;
var drawRate = 120;
var drawCount = 0;
var drawCountMax = 60;
var drawingEnabled = false;
var particals = [];
var particalCount = 0;
var selectedShape = "square";
var color;
var fade;
var animate;
var transition;
var transform;


function setup() {
    /* mouse and touch inputs */
    window.addEventListener("mousedown", myMouseStart);
    window.addEventListener("mouseup", myMouseStop);
    window.addEventListener("mousemove", myMouseMove);
    window.addEventListener("touchmove", myTouchMove);
    window.addEventListener("touchend", myMouseStop);
    document.body.style.userSelect = "none";
    /* settings controls */
    let shape = document.getElementById("shapeSetting");
    let rate = document.getElementById("rateSetting");
    let colorSelector = document.getElementById("colorSetting");
    let faderate = document.getElementById("fadeSetting");
    let animateMe = document.getElementById("animateMe");
    let transitionMe = document.getElementById("transitionMe");
    let transformMe = document.getElementById("transformMe");
    selectedShape = shape.value;
    drawRate = rate.value;
    color = colorSelector.value;
    fade = faderate.value;
    animate = animateMe.value;
    transition = transitionMe.value;
    transform = transformMe.value;
    shape.addEventListener("change", function(event) {selectedShape = event.target.value});
    rate.addEventListener("change", function(event) {drawRate = event.target.value});
    colorSelector.addEventListener("change", function(event) {color = event.target.value});
    faderate.addEventListener("change", function(event) {fade = event.target.value});
    animateMe.addEventListener("change", function(event) {animate = event.target.value});
    transitionMe.addEventListener("change", function(event) {transition = event.target.value});
    transformMe.addEventListener("change", function(event) {alert(event.target.value); transform = event.target.value});
}

function drawing() {
    if (!drawingEnabled) return;
    document.getElementById("inputDisplayDrawing").innerHTML = drawAtX + ", " + drawAtY;
    drawCount -= drawRate;
    if (drawCount <= 0) {
        drawPartical(drawAtX, drawAtY);
        drawCount = drawCountMax;
    }
}

function drawingAt(x, y) {
    drawAtX = x - 25;
    drawAtY = y;
}

function drawPartical(x, y) {
    let partical = new Partical(x, y);
    console.log('Animate: ' + animate + ', Transition: ' + transition + ', Transform: ' + transform);
    if(animate) partical.animate();
    if(transition) partical.transition();
    if(transform) partical.transform();
    particals.push(partical);
}

function myTouchMove(event) {
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY - 25;
    document.getElementById("inputDisplay").innerHTML = x + ", " + y;
    drawingEnabled = true;
    drawingAt(x, y);
}

function myMouseStart(event) {
    var x = event.screenX;
    var y = event.screenY - 85;
    document.getElementById("inputDisplayMouse").innerHTML = x + ", " + y;
    drawingEnabled = true;
    drawingAt(x, y);
}

function myMouseMove(event) {
    var x = event.screenX;
    var y = event.screenY - 85;
    drawingAt(x, y);
}

function myMouseStop(event) {
    drawingEnabled = false;
}

function Update() {
    drawing();
}

function randomPoint(number) {
    return (Math.random() * 10) + number; 
}

function Partical(x, y) {
    this.id = "Partical" + particalCount++;
    this.body = document.createElement("div");
    this.body.id = this.id; 
    this.body.style.position = "fixed";
    this.body.style.left = x + "px";
    this.body.style.top = y + "px";
    this.body.classList.add(selectedShape);
    this.body.style.border = "solid 1px " + color;
    document.body.appendChild(this.body);
    this.animate = function () {
        //console.log('animate for ' + this.id + ' was executed');
        this.body.style.animationName = "freefadein, freefadeout";
        this.body.style.animationDuration = fade+"s";
        this.body.addEventListener("webkitAnimationEnd", this.killit);
    }
    this.transition = function () {
        //console.log('transision for ' + this.id + ' was executed');
        this.body.classList.add('transitionary');
        this.body.classList.add('small');
    }
    this.transform = function () {
        //console.log('transform for ' + this.id + ' was executed');
        this.body.style.transform = 'matrix(1,0,0,1,' + randomPoint(x) + ',' + randomPoint(y) + ')';
    }
    this.killit = function () {
        let blackSpot = particals.findIndex(function (element) { return element.id == this.id; })
        particals.splice(blackSpot, 1);
        let element = document.getElementById(this.id);
        if(element != null) {
            element.remove();
        }
    }
}