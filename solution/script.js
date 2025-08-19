// Simple Traffic Management System

// Get references to the traffic lights
const northLight = document.getElementById("light-north");
const southLight = document.getElementById("light-south");
const eastLight = document.getElementById("light-east");
const westLight = document.getElementById("light-west");

// Get control elements
const emergencyButton = document.getElementById("emergency-stop");
const resetButton = document.getElementById("reset-system");
const statusDisplay = document.getElementById("current-phase");

// Traffic system state
let currentPhase = 0; // 0=NorthSouth Green, 1=NorthSouth Yellow, 2=EastWest Green, 3=EastWest Yellow
let isEmergencyStopped = false;
let trafficInterval = null;

// Phase timing (in milliseconds)
const phaseTiming = {
  green: 4000, // 4 seconds
  yellow: 2000, // 2 seconds
};

// Function to set a traffic light to a specific color
function setLight(lightElement, color) {
  // Remove all color classes and emergency blink
  const lights = lightElement.querySelectorAll(".light");
  lights.forEach(light => {
    light.classList.remove("active", "emergency-blink");
  });

  // Add active class to the specified color
  const targetLight = lightElement.querySelector(`.${color}`);
  if (targetLight) {
    targetLight.classList.add("active");
  }
}

// Function to update the status display
function updateStatus(message) {
  statusDisplay.textContent = "Current Phase: " + message;
}

// Function to set lights for each phase
function setTrafficPhase() {
  if (isEmergencyStopped) return;

  switch (currentPhase) {
    case 0: // North/South Green
      setLight(northLight, "green");
      setLight(southLight, "green");
      setLight(eastLight, "red");
      setLight(westLight, "red");
      updateStatus("North/South Green");
      break;

    case 1: // North/South Yellow
      setLight(northLight, "yellow");
      setLight(southLight, "yellow");
      setLight(eastLight, "red");
      setLight(westLight, "red");
      updateStatus("North/South Yellow");
      break;

    case 2: // East/West Green
      setLight(northLight, "red");
      setLight(southLight, "red");
      setLight(eastLight, "green");
      setLight(westLight, "green");
      updateStatus("East/West Green");
      break;

    case 3: // East/West Yellow
      setLight(northLight, "red");
      setLight(southLight, "red");
      setLight(eastLight, "yellow");
      setLight(westLight, "yellow");
      updateStatus("East/West Yellow");
      break;
  }
}

// Function to advance to the next phase
function nextPhase() {
  if (isEmergencyStopped) return;

  currentPhase = (currentPhase + 1) % 4; // Cycle through 0,1,2,3
  setTrafficPhase();

  // Set timing for next phase change
  let delay = currentPhase === 1 || currentPhase === 3 ? phaseTiming.yellow : phaseTiming.green;
  trafficInterval = setTimeout(nextPhase, delay);
}

// Emergency stop function
function emergencyStop() {
  isEmergencyStopped = true;

  // Clear the running timer
  if (trafficInterval) {
    clearTimeout(trafficInterval);
    trafficInterval = null;
  }

  // Set all lights to red with blinking animation
  setLight(northLight, "red");
  setLight(southLight, "red");
  setLight(eastLight, "red");
  setLight(westLight, "red");

  // Add blinking effect to all red lights
  northLight.querySelector(".red").classList.add("emergency-blink");
  southLight.querySelector(".red").classList.add("emergency-blink");
  eastLight.querySelector(".red").classList.add("emergency-blink");
  westLight.querySelector(".red").classList.add("emergency-blink");

  updateStatus("EMERGENCY STOP - All Red");
  console.log("Emergency stop activated");
}

// Reset system function
function resetSystem() {
  isEmergencyStopped = false;

  // Clear any running timer
  if (trafficInterval) {
    clearTimeout(trafficInterval);
    trafficInterval = null;
  }

  // Start from North/South green
  currentPhase = 0;
  setTrafficPhase();

  // Start the cycling
  trafficInterval = setTimeout(nextPhase, phaseTiming.green);

  console.log("Traffic system reset");
}

// Set up event listeners and start the system
document.addEventListener("DOMContentLoaded", function () {
  emergencyButton.addEventListener("click", emergencyStop);
  resetButton.addEventListener("click", resetSystem);

  // Start the traffic system
  resetSystem();

  console.log("Traffic system started");
});
