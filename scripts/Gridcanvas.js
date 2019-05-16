window.onload = setup;
setInterval(update, 1000);
var timers = [];
var cardHolder;
var addBtn;

function setup() {
    cardHolder = document.getElementById("cardholder");
    addBtn = document.getElementById("AddBtn");
    addBtn.addEventListener("click", addTimerCard);
}

function addTimerCard() {
    var timer = new Timer();
    var card = document.createElement("div");
    var text = document.createTextNode("started");
    var display = document.createElement("h3");
    display.id = timer.displayid;
    display.appendChild(text);
    card.appendChild(display);
    card.classList.add("timercard");
    cardHolder.appendChild(card);
    timers.push(timer);
}

function Timer() {
    this.time = new Date().getTime();
    this.displayid = "timerDisplay" + timers.length;
};

function update() {
    for(let i=0; i < timers.length; i++){
        console.log("updating" + i);
        var display = document.getElementById(timers[i].displayid);
        display.innerText = getDifferenceInTime(timers[i].time);
    }
}

function getDifferenceInTime(startTime){
    var elapsedSeconds = (new Date().getTime()) - startTime;
    var days = Math.floor(elapsedSeconds / (1000 * 60 * 60 * 24));
    var hours = Math.floor((elapsedSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedSeconds % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsedSeconds % (1000 * 60)) / 1000);
    return days + ":" + hours + ":" + minutes + ":" + seconds;
}