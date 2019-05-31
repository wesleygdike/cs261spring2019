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
    selectedShape = shape.value;
    drawRate = rate.value;
    color = colorSelector.value;
    fade = faderate.value;
    shape.addEventListener("change", function(event) {selectedShape = event.target.value});
    rate.addEventListener("change", function(event) {drawRate = event.target.value});
    colorSelector.addEventListener("change", function(event) {color = event.target.value});
    faderate.addEventListener("change", function(event) {fade = event.target.value});
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
    partical.animate();
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

function dropOldPartical(item, index) {

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
    this.body.classList.add('transitionary');
    document.body.appendChild(this.body);
    this.animate = function () {
        this.body.style.animationName = "freefadein, freefadeout";
        this.body.style.animationDuration = fade+"s";
        this.body.addEventListener("webkitAnimationStart", this.shrinkit);
        this.body.addEventListener("webkitAnimationEnd", this.killit);
    }
    this.shrinkit = function () {
        document.getElementById(this.id).classList.add('small');
    }
    this.killit = function () {
        let blackSpot = particals.findIndex(function (element) { return element.id == this.id; })
        particals.splice(blackSpot, 1);
        document.getElementById(this.id).remove();
    }
}