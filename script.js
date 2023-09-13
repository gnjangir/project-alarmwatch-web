// Get elements from the DOM
const clockDisplay = document.getElementById('time');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const alarmsList = document.getElementById('alarmsList');

// Array to store alarms
const alarms = [];

// Function to display the current time
function displayTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Convert to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zero to minutes and seconds if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Update the clock display
    clockDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${hours >= 12 ? 'PM' : 'AM'}`;
}

// Function to add an alarm to the list
function addAlarmToList(alarm) {
    const li = document.createElement('li');
    li.textContent = `${alarm.hours}:${alarm.minutes}:${alarm.seconds} ${alarm.amPm}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteAlarm(alarm.id));

    li.appendChild(deleteButton);
    alarmsList.appendChild(li);
}

// Function to delete an alarm
function deleteAlarm(alarmId) {
    const alarmIndex = alarms.findIndex(alarm => alarm.id === alarmId);
    if (alarmIndex !== -1) {
        alarms.splice(alarmIndex, 1);
        // updateAlarmsList();
        localStorage.setItem('alarms',JSON.stringify(alarms));
        updateAlarmsList();
    }
}

// Function to update the alarms list
function updateAlarmsList() {
    alarmsList.innerHTML = '';
    alarms.forEach(alarm => addAlarmToList(alarm));
}

// Function to check for alarms and trigger alerts
function checkAlarms() {
    const now = new Date();

    alarms.forEach(alarm => {
        const alarmTime = new Date(now);
        alarmTime.setHours(alarm.hours);
        alarmTime.setMinutes(alarm.minutes);
        alarmTime.setSeconds(alarm.seconds);

        if (
            alarm.amPm === (now.getHours() >= 12 ? 'PM' : 'AM') &&
            alarm.hours === (now.getHours() % 12 || 12) &&
            alarm.minutes === now.getMinutes() &&
            alarm.seconds === now.getSeconds()
        ) {
            alert('Alarm triggered!');
            deleteAlarm(alarm.id); // Remove the alarm that triggered the alert
        }
    });
}

// Update the clock display every second
setInterval(displayTime, 1000);

    // Function to save alarms to local storage
function saveAlarmsToLocalStorage() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

// Load alarms from local storage (if any) when the page loads
function loadAlarmsFromLocalStorage() {
    const savedAlarms = localStorage.getItem('alarms');
    if (savedAlarms) {
        alarms.push(...JSON.parse(savedAlarms));
        updateAlarmsList();
    }
}

// Update the clock display every second
setInterval(displayTime, 1000);

// Set Alarm button click event
setAlarmBtn.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 100;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const amPm = document.getElementById('amPm').value;

    // Create a unique ID for the alarm
    const alarmId = Date.now();
    
    if( ( hours<=0 || hours >12 )||(minutes<0 || minutes>=60)||(seconds<0 || seconds>=60) ){
        alert('Please enter a valid time :)');
    }
    else{
        // Add the alarm to the alarms array
        alarms.push({
            id: alarmId,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            amPm: amPm
        });
        console.log(hours);
        // Update the alarms list
        updateAlarmsList();

        // Save the alarms to local storage
        saveAlarmsToLocalStorage();
    }
  
});

// Load alarms from local storage when the page loads
loadAlarmsFromLocalStorage();

// Check for alarms every second
setInterval(checkAlarms, 1000);