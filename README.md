# Traffic Management System - Debug Lab

Welcome to the Traffic Management System debug lab! You've been called in to fix a broken traffic control system. The intersection is completely non-functional and needs your expertise to get it working properly.

## The Situation

A traffic management system was supposed to control a 4-way intersection with:
- Traffic lights for each direction (North, South, East, West)
- Crosswalk markings in the center
- Emergency stop and reset controls
- Automatic light cycling with proper timing

**Unfortunately, almost nothing is working correctly.** Your job is to systematically debug and fix the system.

## Phase 1: Visual Layout Issues (1.5 hours)

The intersection doesn't look anything like a real intersection. Before we can make it functional, we need to fix the visual layout.

### Problem 1: Intersection Structure is Broken
**What you should see**: A 4-way intersection with roads extending from a center point  
**What you actually see**: Roads are stacked vertically in a weird layout

*Investigation needed*: Look at the CSS grid properties for `.intersection` and the grid area assignments for each road. Something is missing or commented out.

### Problem 2: Roads Don't Look Like Roads
**What you should see**: Roads with traffic lights positioned properly  
**What you actually see**: Traffic lights are positioned strangely within each road section

*Investigation needed*: Check how the road elements are organizing their content. Look for flexbox properties that might be missing.

### Problem 3: Crosswalks are Invisible or Scattered
**What you should see**: White striped crosswalk markings forming proper pedestrian crossing areas  
**What you actually see**: No crosswalk markings visible, or white rectangles scattered randomly

*Investigation needed*: The crosswalk elements exist in the HTML, but their flexbox layout is broken. Look for missing `display` and arrangement properties.

### Problem 4: Traffic Lights Don't Look Like Traffic Lights
**What you should see**: Red, yellow, and green circles that look like actual traffic lights  
**What you actually see**: Gray circles with no colors

*Investigation needed*: The HTML has classes like `red`, `yellow`, `green` but the CSS styles for these classes are missing or commented out. Also check the `active` state styling.

## Phase 2: JavaScript Integration Issues (1.5 hours)

Once the intersection looks correct, we need to make it actually function.

### Problem 5: Nothing Happens When You Click Buttons
**Expected behavior**: Emergency stop should make all lights red and blinking, reset should start the cycling  
**Actual behavior**: Clicking buttons does nothing

*See detailed walkthrough in script.js starting at line 120 - this involves understanding how event listeners work and when they can be attached*

### Problem 6: Traffic Lights Don't Change Colors
**Expected behavior**: Lights should cycle automatically: North/South green → yellow → East/West green → yellow → repeat  
**Actual behavior**: All lights stay red, no cycling happens

*Investigation needed*: Check the browser console for errors. Look at how the JavaScript is trying to find the traffic light elements. Are the IDs correct?

### Problem 7: Emergency Stop Doesn't Blink
**Expected behavior**: Emergency stop should make red lights blink  
**Actual behavior**: Lights turn red but don't blink

*This requires both CSS animations AND JavaScript working together. Check both the animation CSS and how JavaScript adds the blinking class*

## Debugging Strategy

1. **Use Browser Developer Tools**: Open the browser's dev tools (F12) to see:
   - Console errors that show JavaScript problems
   - Elements panel to inspect HTML structure
   - Styles panel to see which CSS rules are applied

2. **Fix CSS Issues First**: Get the layout looking right before worrying about JavaScript functionality

3. **Test Each Fix**: After each change, refresh the page to see if that specific issue is resolved

4. **Work Systematically**: Don't try to fix everything at once. Focus on one problem area at a time.

## Learning Objectives

By the end of this lab, you should understand:
- How CSS Grid creates layout structure
- How Flexbox arranges elements within containers  
- How JavaScript finds and manipulates DOM elements
- How CSS classes can be toggled by JavaScript to create visual changes
- How timing and event handling work in browser JavaScript
- How CSS animations can be triggered by JavaScript

## Bonus Challenges

If you finish early, try these enhancements:
- Add sound effects when lights change
- Create a "rush hour" mode with faster cycling
- Add a manual override mode where you can click lights to change them
- Style the intersection to look more realistic with lanes and turn arrows

Good luck debugging! Remember: every developer spends a lot of time debugging - it's a core skill that gets better with practice.