// Traffic Management System JavaScript

class TrafficSystem {
    constructor() {
        // Traffic light elements
        this.lights = {
            north: document.getElementById('light-north'),
            south: document.getElementById('light-south'),
            east: document.getElementById('light-east'),
            west: document.getElementById('light-west')
        };

        // Pedestrian signal elements
        this.pedSignals = {
            north: document.getElementById('ped-north'),
            south: document.getElementById('ped-south'),
            east: document.getElementById('ped-east'),
            west: document.getElementById('ped-west')
        };

        // Control elements
        this.emergencyButton = document.getElementById('emergency-stop');
        this.resetButton = document.getElementById('reset-system');
        this.statusDisplay = document.getElementById('current-phase');
        this.pedButtons = document.querySelectorAll('.ped-button');

        // System state
        this.currentPhase = 'ns-green'; // ns-green, ns-yellow, ew-green, ew-yellow
        this.isEmergencyStopped = false;
        this.phaseTimer = null;
        this.pedRequests = new Set(); // Track pedestrian crossing requests

        // Timing constants (in milliseconds)
        this.timing = {
            greenLight: 8000,    // 8 seconds
            yellowLight: 3000,   // 3 seconds
            redLight: 1000,      // 1 second transition
            pedWalk: 10000,      // 10 seconds for pedestrian crossing
            pedFlash: 3000       // 3 seconds flashing don't walk
        };

        this.initialize();
    }

    initialize() {
        // Set up event listeners
        this.emergencyButton.addEventListener('click', () => this.emergencyStop());
        this.resetButton.addEventListener('click', () => this.resetSystem());
        
        // Add pedestrian button listeners
        this.pedButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const direction = e.target.getAttribute('data-direction');
                this.requestPedestrianCrossing(direction);
            });
        });

        // Start the traffic system
        this.resetSystem();
    }

    // Set light colors for a specific direction
    setLight(direction, color) {
        const lightElement = this.lights[direction];
        if (!lightElement) return;

        // Remove active class from all lights in this direction
        const lights = lightElement.querySelectorAll('.light');
        lights.forEach(light => light.classList.remove('active'));

        // Add active class to the specified color
        const targetLight = lightElement.querySelector(`[data-color="${color}"]`);
        if (targetLight) {
            targetLight.classList.add('active');
        }
    }

    // Set pedestrian signal state
    setPedSignal(direction, state) {
        const pedElement = this.pedSignals[direction];
        if (!pedElement) return;

        const dontWalk = pedElement.querySelector('.dont-walk');
        const walk = pedElement.querySelector('.walk');

        dontWalk.classList.remove('active');
        walk.classList.remove('active');

        if (state === 'walk') {
            walk.classList.add('active');
        } else {
            dontWalk.classList.add('active');
        }
    }

    // Update the status display
    updateStatus(message) {
        this.statusDisplay.textContent = `Current Phase: ${message}`;
    }

    // Request pedestrian crossing
    requestPedestrianCrossing(direction) {
        if (this.isEmergencyStopped) return;

        this.pedRequests.add(direction);
        
        // Visual feedback for button press
        const button = document.querySelector(`[data-direction="${direction}"]`);
        button.classList.add('pressed');
        setTimeout(() => button.classList.remove('pressed'), 500);

        console.log(`Pedestrian crossing requested for ${direction}`);
    }

    // Handle pedestrian crossing during appropriate phase
    handlePedestrianCrossing() {
        // Allow pedestrian crossing when perpendicular traffic has green (their direction is red)
        if (this.currentPhase === 'ew-green') {
            // East/West traffic is green, so North/South pedestrians can cross safely
            if (this.pedRequests.has('north')) {
                this.setPedSignal('north', 'walk');
                this.pedRequests.delete('north');
            }
            if (this.pedRequests.has('south')) {
                this.setPedSignal('south', 'walk');
                this.pedRequests.delete('south');
            }
        } else if (this.currentPhase === 'ns-green') {
            // North/South traffic is green, so East/West pedestrians can cross safely
            if (this.pedRequests.has('east')) {
                this.setPedSignal('east', 'walk');
                this.pedRequests.delete('east');
            }
            if (this.pedRequests.has('west')) {
                this.setPedSignal('west', 'walk');
                this.pedRequests.delete('west');
            }
        }
    }

    // Main traffic cycle logic
    runTrafficCycle() {
        if (this.isEmergencyStopped) return;

        switch (this.currentPhase) {
            case 'ns-green':
                // North/South green, East/West red
                this.setLight('north', 'green');
                this.setLight('south', 'green');
                this.setLight('east', 'red');
                this.setLight('west', 'red');
                
                // Handle pedestrian crossings
                this.handlePedestrianCrossing();
                
                this.updateStatus('North/South Green');
                
                // Next phase after green time
                this.phaseTimer = setTimeout(() => {
                    this.currentPhase = 'ns-yellow';
                    this.runTrafficCycle();
                }, this.timing.greenLight);
                break;

            case 'ns-yellow':
                // North/South yellow, East/West red
                this.setLight('north', 'yellow');
                this.setLight('south', 'yellow');
                this.setLight('east', 'red');
                this.setLight('west', 'red');
                
                // Clear pedestrian signals
                this.setPedSignal('north', 'dont-walk');
                this.setPedSignal('south', 'dont-walk');
                
                this.updateStatus('North/South Yellow');
                
                // Next phase after yellow time
                this.phaseTimer = setTimeout(() => {
                    this.currentPhase = 'ew-green';
                    this.runTrafficCycle();
                }, this.timing.yellowLight);
                break;

            case 'ew-green':
                // East/West green, North/South red
                this.setLight('north', 'red');
                this.setLight('south', 'red');
                this.setLight('east', 'green');
                this.setLight('west', 'green');
                
                // Handle pedestrian crossings
                this.handlePedestrianCrossing();
                
                this.updateStatus('East/West Green');
                
                // Next phase after green time
                this.phaseTimer = setTimeout(() => {
                    this.currentPhase = 'ew-yellow';
                    this.runTrafficCycle();
                }, this.timing.greenLight);
                break;

            case 'ew-yellow':
                // East/West yellow, North/South red
                this.setLight('north', 'red');
                this.setLight('south', 'red');
                this.setLight('east', 'yellow');
                this.setLight('west', 'yellow');
                
                // Clear pedestrian signals
                this.setPedSignal('east', 'dont-walk');
                this.setPedSignal('west', 'dont-walk');
                
                this.updateStatus('East/West Yellow');
                
                // Next phase after yellow time
                this.phaseTimer = setTimeout(() => {
                    this.currentPhase = 'ns-green';
                    this.runTrafficCycle();
                }, this.timing.yellowLight);
                break;
        }
    }

    // Emergency stop - all lights red
    emergencyStop() {
        this.isEmergencyStopped = true;
        
        // Clear any running timers
        if (this.phaseTimer) {
            clearTimeout(this.phaseTimer);
            this.phaseTimer = null;
        }

        // Set all lights to red
        this.setLight('north', 'red');
        this.setLight('south', 'red');
        this.setLight('east', 'red');
        this.setLight('west', 'red');

        // Clear all pedestrian signals
        this.setPedSignal('north', 'dont-walk');
        this.setPedSignal('south', 'dont-walk');
        this.setPedSignal('east', 'dont-walk');
        this.setPedSignal('west', 'dont-walk');

        // Clear pedestrian requests
        this.pedRequests.clear();

        this.updateStatus('EMERGENCY STOP - All Red');
        
        console.log('Emergency stop activated');
    }

    // Reset system to normal operation
    resetSystem() {
        this.isEmergencyStopped = false;
        
        // Clear any running timers
        if (this.phaseTimer) {
            clearTimeout(this.phaseTimer);
            this.phaseTimer = null;
        }

        // Clear pedestrian requests
        this.pedRequests.clear();

        // Start with North/South green phase
        this.currentPhase = 'ns-green';
        this.runTrafficCycle();
        
        console.log('Traffic system reset and restarted');
    }
}

// Initialize the traffic system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.trafficSystem = new TrafficSystem();
    console.log('Traffic Management System initialized');
});