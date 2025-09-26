// Simple Traffic Management System

// DEBUGGING WALKTHROUGH: DOM Element Selection
//
// PROBLEM: Traffic lights don't change colors, console shows "Cannot read property 'querySelectorAll' of null"
//
// INVESTIGATION STEPS:
// 1. Check the HTML - what are the actual IDs of the traffic light elements?
// 2. Compare those IDs with what JavaScript is looking for
// 3. Use console.log(northLight) to see if the element was found
//
// UNDERSTANDING THE ISSUE:
// When getElementById() can't find an element, it returns 'null'
// Later, when we try to use methods like .querySelectorAll() on null, we get errors
//
// SOLUTION: Make sure the IDs match exactly between HTML and JavaScript

// Get references to the traffic lights - BUG: Wrong IDs
const northLight = document.getElementById('north-light');
const southLight = document.getElementById('south-light');
const eastLight = document.getElementById('east-light');
const westLight = document.getElementById('west-light');

// Get control elements - BUG: Script runs before DOM is ready
const emergencyButton = document.getElementById('emergency-stop');
const resetButton = document.getElementById('reset-system');
const statusDisplay = document.getElementById('current-phase');

// Traffic system state
let currentPhase = 0; // 0=NS Green, 1=NS Yellow, 2=EW Green, 3=EW Yellow
let isEmergencyStopped = false;
let trafficInterval = null;

// Phase timing (in milliseconds)
const phaseTiming = {
    green: 4000,  // 4 seconds
    yellow: 2000  // 2 seconds
};

// Function to set a traffic light to a specific color
function setLight(lightElement, color) {
    // DEBUGGING WALKTHROUGH: Defensive Programming
    //
    // PROBLEM: Function crashes when lightElement is null
    //
    // UNDERSTANDING: If getElementById() failed to find an element,
    // lightElement will be null, and calling .querySelectorAll() on null causes an error
    //
    // SOLUTION: Always check if elements exist before using them
    // Add: if (!lightElement) return; at the start of this function
    
    // BUG: Function doesn't check if element exists
    // Remove all color classes and emergency blink
    const lights = lightElement.querySelectorAll('.light');
    lights.forEach(light => {
        light.classList.remove('active', 'emergency-blink');
    });
    
    // Add active class to the specified color
    const targetLight = lightElement.querySelector(`.${color}`);
    if (targetLight) {
        targetLight.classList.add('active');
    }
}

// Function to update the status display
function updateStatus(message) {
    statusDisplay.textContent = 'Current Phase: ' + message;
}

// Function to set lights for each phase
function setTrafficPhase() {
    if (isEmergencyStopped) return;
    
    switch (currentPhase) {
        case 0: // North/South Green
            setLight(northLight, 'green');
            setLight(southLight, 'green');
            setLight(eastLight, 'red');
            setLight(westLight, 'red');
            updateStatus('North/South Green');
            break;
            
        case 1: // North/South Yellow
            setLight(northLight, 'yellow');
            setLight(southLight, 'yellow');
            setLight(eastLight, 'red');
            setLight(westLight, 'red');
            updateStatus('North/South Yellow');
            break;
            
        case 2: // East/West Green
            setLight(northLight, 'red');
            setLight(southLight, 'red');
            setLight(eastLight, 'green');
            setLight(westLight, 'green');
            updateStatus('East/West Green');
            break;
            
        case 3: // East/West Yellow
            setLight(northLight, 'red');
            setLight(southLight, 'red');
            setLight(eastLight, 'yellow');
            setLight(westLight, 'yellow');
            updateStatus('East/West Yellow');
            break;
    }
}

// Function to advance to the next phase
function nextPhase() {
    if (isEmergencyStopped) return;
    
    currentPhase = (currentPhase + 1) % 4; // Cycle through 0,1,2,3
    setTrafficPhase();
    
    // Set timing for next phase change
    let delay = (currentPhase === 1 || currentPhase === 3) ? phaseTiming.yellow : phaseTiming.green;
    trafficInterval = setTimeout(nextPhase, delay);
}

// Emergency stop function
function emergencyStop() {
    isEmergencyStopped = true;
    
    // BUG: Timer not cleared properly in emergency stop either
    // if (trafficInterval) {
    //     clearTimeout(trafficInterval);
    //     trafficInterval = null;
    // }
    
    // Set all lights to red with blinking animation
    setLight(northLight, 'red');
    setLight(southLight, 'red');
    setLight(eastLight, 'red');
    setLight(westLight, 'red');
    
    // BUG: Emergency blinking classes not being added
    // Add blinking effect to all red lights
    // northLight.querySelector('.red').classList.add('emergency-blink');
    // southLight.querySelector('.red').classList.add('emergency-blink');
    // eastLight.querySelector('.red').classList.add('emergency-blink');
    // westLight.querySelector('.red').classList.add('emergency-blink');
    
    updateStatus('EMERGENCY STOP - All Red');
    console.log('Emergency stop activated');
}

// Reset system function
function resetSystem() {
    isEmergencyStopped = false;
    
    // BUG: Timer not cleared properly - can cause multiple timers running
    // if (trafficInterval) {
    //     clearTimeout(trafficInterval);
    //     trafficInterval = null;
    // }
    
    // Start from North/South green
    currentPhase = 0;
    setTrafficPhase();
    
    // Start the cycling
    trafficInterval = setTimeout(nextPhase, phaseTiming.green);
    
    console.log('Traffic system reset');
}

// BUG: Event listeners and system startup happen immediately when script loads
// This will cause errors because the HTML elements don't exist yet when script is in <head>

emergencyButton.addEventListener('click', emergencyStop);
resetButton.addEventListener('click', resetSystem);

// Start the traffic system immediately
resetSystem();
console.log('Traffic system started');