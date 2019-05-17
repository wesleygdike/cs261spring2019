window.onload = setup;
setInterval(update, 1000 / 60);
var timers = [];
var cardHolder;
var addBtn;

function setup() {
    cardHolder = document.getElementById("cardholder");
    addBtn = document.getElementById("AddBtn");
    addBtn.addEventListener("click", addTimerCard);
}

function addTimerCard() {
    // track time and id
    var timer = new Timer();
    //create elements
    var leftcol = document.createElement("div");
    var rightcol = document.createElement("div");
    var card = document.createElement("div");
    var text = document.createTextNode("started");
    var display = document.createElement("h3");
    var resetImg = document.createElement("img");
    //make assignments
    resetImg.src = "img/reset.png";
    resetImg.displayid = timer.displayid;
    resetImg.addEventListener("click", resetTimer);
    display.id = timer.displayid;
    display.appendChild(text);
    rightcol.appendChild(display);
    rightcol.appendChild(resetImg);
    text.nodeValue = timer.displayid;
    leftcol.appendChild(text);
    card.appendChild(leftcol);
    card.appendChild(rightcol);
    card.classList.add("timercard");
    //add finished element to the document
    cardHolder.appendChild(card);
    //add timer to the current list
    timers.push(timer);
}

function Timer() {
    this.time = new Date().getTime();
    this.displayid = "timerDisplay" + timers.length;
    this.reset = function () {
        alert("reset fired");
        this.time = new Date().getTime();
    }
};

function resetTimer(event) {
    var tochange = timers.findIndex(function (element) { return element.displayid == event.target.displayid; });
    timers[tochange].time = new Date().getTime();
    update();
}

function killTimer() {
    //remove timer from document and timer list
    //add killer button to timer cards
}

function update() {
    for (let i = 0; i < timers.length; i++) {
        console.log("updating" + i);
        var display = document.getElementById(timers[i].displayid);
        display.innerText = getDifferenceInTime(timers[i].time);
    }
}

function getDifferenceInTime(startTime) {
    var elapsedSeconds = (new Date().getTime()) - startTime;
    var days = Math.floor(elapsedSeconds / (1000 * 60 * 60 * 24));
    var hours = Math.floor((elapsedSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedSeconds % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsedSeconds % (1000 * 60)) / 1000);
    var milseconds = Math.floor((elapsedSeconds % (1000 * 60)) / (1000 / 60));
    return days + ":" + hours + ":" + minutes + ":" + seconds + ":" + milseconds;
}