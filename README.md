# CSS & JavaScript Debugging Lab - Traffic Management System

## Overview

This is a comprehensive debugging lab focused on CSS Grid, Flexbox, and JavaScript DOM manipulation through building and fixing a traffic management system. Students will learn essential debugging skills by systematically diagnosing and fixing a broken 4-way intersection traffic control system.

![Working Traffic System Example](assets/traffic_management.gif)

## Project Structure

```
lab/
├── index.html      # HTML structure with intentional bugs
├── style.css       # CSS styling with missing properties and classes
├── script.js       # JavaScript functionality with timing and DOM issues
└── README.md       # Detailed debugging instructions and hints
assets/
└── traffic_management.gif  # Reference demo of working system
```

## Learning Objectives

You will gain hands-on experience with:

### CSS Skills
- **CSS Grid Layout**: Understanding grid-template-areas, grid positioning
- **Flexbox Properties**: Using display: flex, flex-direction, justify-content, align-items
- **CSS Classes & Selectors**: Proper class naming and cascading specificity
- **CSS Animations**: Creating keyframe animations and applying them conditionally

### JavaScript Skills  
- **DOM Manipulation**: Finding elements with getElementById, adding/removing CSS classes
- **Event Handling**: Setting up button click listeners and managing user interactions
- **Timer Management**: Using setTimeout/clearTimeout for automated sequences
- **Error Debugging**: Reading console errors and tracing execution flow

### Debugging Methodology
- **Systematic Problem Solving**: Working through issues step-by-step rather than randomly
- **Browser Developer Tools**: Using Console, Elements, and Styles panels effectively
- **Testing Incremental Changes**: Validating each fix before moving to the next issue

## How the Lab Works

The lab is structured as a **guided debugging journey** in two phases:

### Phase 1: Visual Layout Issues (~1.5 hours)
Students fix CSS problems that prevent the intersection from looking correct:
- Broken grid layout structure
- Missing flexbox properties on roads and crosswalks  
- Missing CSS classes and color definitions
- Non-functional traffic light styling

### Phase 2: JavaScript Debugging Journey (~1.5 hours)
Students follow a step-by-step process to fix JavaScript functionality:
- Script timing and DOM readiness issues
- Element selection and ID matching problems
- CSS class manipulation and visual state changes
- Timer management and event handling bugs

## Key Features Being Built

- **4-Way Intersection**: Grid-based layout with roads extending in all directions
- **Traffic Light System**: Individual lights for each direction with proper state management
- **Crosswalk Markings**: Flexbox-based pedestrian crossing indicators  
- **Emergency Controls**: Stop/reset functionality with visual feedback
- **Automatic Cycling**: Timed progression through traffic phases
- **Emergency Blinking**: CSS animation triggered by JavaScript events

## Pedagogical Approach

Rather than simply providing solutions, this lab teaches debugging methodology:

1. **Error Recognition**: Students learn to read and understand browser console errors
2. **Hypothesis Testing**: Each bug includes hints to guide investigation rather than direct answers
3. **Incremental Validation**: Students test each fix individually to understand its impact
4. **Real-World Simulation**: The debugging process mirrors actual development workflows

## Prerequisites

Students should have basic familiarity with:
- HTML structure and semantic elements
- Basic CSS properties and selectors
- JavaScript variables, functions, and basic DOM concepts
- Browser developer tools (F12)

## Getting Started

Navigate to the `lab/` directory and open `index.html` in a browser. The initial state will show a completely broken intersection that needs systematic debugging to become functional.

Detailed instructions and guided hints are provided in `lab/README.md`.
