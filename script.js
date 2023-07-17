

// ---------------first tab------------
const hourhand = document.querySelector('.hour');
const display = document.getElementById('digital');
const datedisplay = document.getElementById('date');
const minutehand = document.querySelector('.minute');
const secondhand = document.querySelector('.second');
const modeswitch = document.querySelector('.mode-switch');
const toggle = document.getElementById('toggledark');
const body = document.querySelector('body');
const displaytimer = document.getElementById('displaytimer');

const updateTime = () => {
  const date = new Date();
  const seconds = formatTime(date.getSeconds());
  const minutes = formatTime(date.getMinutes());
  const hours = formatTime(date.getHours());
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  datedisplay.innerText = `${day}:${month}:${year}`;

  const secToDeg = (seconds / 60) * 360;
  const minToDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hrToDeg = ((hours % 12 + minutes / 60) / 12) * 360;

  secondhand.style.transform = `rotate(${secToDeg}deg)`;
  minutehand.style.transform = `rotate(${minToDeg}deg)`;
  hourhand.style.transform = `rotate(${hrToDeg}deg)`;
  display.innerText = `${hours}:${minutes}:${seconds}`;
};

function formatTime(time) {
  if (time < 10) {
    return '0' + time;
  }
  return time;
}

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
datedisplay.innerText = `${day}:${month}:${year}`;

setInterval(updateTime, 1000);

// -----------------------tab2-----------------------
let timerRef = document.querySelector('.timer-display');
const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');
const activeAlarms = document.querySelector('.activeAlarms');
const setAlarm = document.getElementById('set');
let alarmsArray = [];
let alarmSound = new Audio("1.mp3");

let initialHour = 0;
let initialMinute = 0;
let alarmIndex = 0;

const appendZero = (value) => (value < 10 ? '0' + value : value);

const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  displaytimer.innerText = `${hours}:${minutes}:${seconds}`;

  alarmsArray.forEach((alarm) => {
    if (alarm.isActive) {
      if (
        `${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`
      ) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

window.onload = () => {
  setInterval(displayTimer, 1000);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};

const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute('data-id');
  let [exist, obj, index] = searchObject('id', searchId);
  if (exist) {
    alarmsArray[index].isActive = true;
  }
};

const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute('data-id');
  let [exists, obj, index] = searchObject('id', searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute('data-id');
  let [exists, obj, index] = searchObject('id', searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener('input', () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener('input', () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

const createAlarm = (alarmObj) => {
  const { id, alarmHour, alarmMinute } = alarmObj;

  let alarmDiv = document.createElement('div');
  alarmDiv.classList.add('alarm');
  alarmDiv.setAttribute('data-id', id);
  alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('click', (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButton.classList.add('deleteButton');
  deleteButton.addEventListener('click', (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

setAlarm.addEventListener('click', () => {
  alarmIndex += 1;

  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});


// -----------------------tab3----------------

let stopwatch = document.querySelector('.stopwatch');
let stopbtn = document.getElementById("stopbtn");
let startbtn = document.getElementById("startbtn");
let resetbtn = document.getElementById("resetbtn");

let msec = 0;
let secs = 0;
let mins = 0;

let timerId = null;

function startTimer() {
  msec++;
  if (msec === 100) {
    msec = 0;
    secs++;
    if (secs === 60) {
      secs = 0;
      mins++;
    }
  }
  let msecString = msec < 10 ? '0' + msec : msec;
  let secsString = secs < 10 ? '0' + secs : secs;
  let minsString = mins < 10 ? '0' + mins : mins;

  stopwatch.innerHTML = minsString + ":" + secsString + ":" + msecString;
}

startbtn.addEventListener('click', function() {
  if (timerId !== null) {
    clearInterval(timerId);
  }
  timerId = setInterval(startTimer, 10);
});

stopbtn.addEventListener('click', function() {
  clearInterval(timerId);
  timerId = null;
});

resetbtn.addEventListener('click', function() {
  clearInterval(timerId);
  timerId = null;
  msec = 0;
  secs = 0;
  mins = 0;
  stopwatch.innerHTML = '00:00:00';
});

// var icon = document.querySelector("mode-switch");
// icon.onclick = function(){
//   document.body.classList.toggle("dark");
//   if(document.body.classList.toggle(dark)){
//     icon.src = "fa-sun";
//   }else{
//     icon.src = "fa-moon";
//   }
// }
var icon = document.querySelector(".mode-switch");

icon.onclick = function() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.src = "fa-sun";
  } else {
    icon.src = "fa-moon";
  }
};



