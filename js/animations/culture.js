

//////////////////////////////////////
/////////    Culture Icon    /////////
//////////////////////////////////////



///--- Initiation ---///

var cultureIconSvg = document.getElementById("culture-icon-svg");

//outer hexagon home positions
let po1 = { x: 150,   y: 95    };  // position outer 1
let po2 = { x: 197.5, y: 122.5 };  // position outer 2
let po3 = { x: 197.5, y: 177.5 };  // position outer 3
let po4 = { x: 150,   y: 205   };  // position outer 4
let po5 = { x: 102.5, y: 177.5 };  // position outer 5
let po6 = { x: 102.5, y: 122.5 };  // position outer 6

//outer hexagon current states
var so1 = { x: po1.x, y: po1.y };  // state outer 1
var so2 = { x: po2.x, y: po2.y };  // state outer 2
var so3 = { x: po3.x, y: po3.y };  // state outer 3
var so4 = { x: po4.x, y: po4.y };  // state outer 4
var so5 = { x: po5.x, y: po5.y };  // state outer 5
var so6 = { x: po6.x, y: po6.y };  // state outer 6

//inner hexagon home positions
let pi1 = { x: 171, y: 114 };  // position inner 1
let pi2 = { x: 192, y: 150 };  // position inner 2
let pi3 = { x: 171, y: 186 };  // position inner 3
let pi4 = { x: 129, y: 186 };  // position inner 4
let pi5 = { x: 108, y: 150 };  // position inner 5
let pi6 = { x: 129, y: 114 };  // position inner 6

//inner hexagon current states
var si1 = { x: pi1.x, y: pi1.y };  // state inner 1
var si2 = { x: pi2.x, y: pi2.y };  // state inner 2
var si3 = { x: pi3.x, y: pi3.y };  // state inner 3
var si4 = { x: pi4.x, y: pi4.y };  // state inner 4
var si5 = { x: pi5.x, y: pi5.y };  // state inner 5
var si6 = { x: pi6.x, y: pi6.y };  // state inner 6

//place outer hexagon
var outerHexagon = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
outerHexagon.id = "outer-hexagon";
cultureIconSvg.appendChild( outerHexagon );
placeOuterHexagon();

//place inner hexagon
var innerHexagon = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
innerHexagon.id = "inner-hexagon";
cultureIconSvg.appendChild( innerHexagon );
placeInnerHexagon();



///-- Functions ---///

//places outer hexagon at current state
function placeOuterHexagon() {
  outerHexagon.setAttribute("d",`
    M${so1.x}, ${so1.y}  
    L${so2.x}, ${so2.y}
    L${so3.x}, ${so3.y}
    L${so4.x}, ${so4.y}
    L${so5.x}, ${so5.y}
    L${so6.x}, ${so6.y}
    Z
  `);
}

//resets outer hexagon current state to home points
function resetOuterHexagon() {
  so1 = { x: po1.x, y: po1.y }; 
  so2 = { x: po2.x, y: po2.y };
  so3 = { x: po3.x, y: po3.y };
  so4 = { x: po4.x, y: po4.y };
  so5 = { x: po5.x, y: po5.y };
  so6 = { x: po6.x, y: po6.y };
  placeOuterHexagon();
}

//places inner hexagon at current state
function placeInnerHexagon() {
  innerHexagon.setAttribute("d",`
    M${si1.x}, ${si1.y}  
    L${si2.x}, ${si2.y}
    L${si3.x}, ${si3.y}
    L${si4.x}, ${si4.y}
    L${si5.x}, ${si5.y}
    L${si6.x}, ${si6.y}
    Z
  `);
}

//resets inner hexagon current state to home points
function resetInnerHexagon() {
  si1 = { x: pi1.x, y: pi1.y }; 
  si2 = { x: pi2.x, y: pi2.y };
  si3 = { x: pi3.x, y: pi3.y };
  si4 = { x: pi4.x, y: pi4.y };
  si5 = { x: pi5.x, y: pi5.y };
  si6 = { x: pi6.x, y: pi6.y };
  placeInnerHexagon();
}



///--- Animation ---///

var durationInFramesC = 150;  // duration in frames (culture icon)
var animationActiveC = false;  // animation active (culture icon)
var currentFrameC = 0;  // current frame (culture icon)

//runs animation (culture icon)
function runAnimationC() {
  animationActiveC = true;
  currentFrameC++;
  if ( currentFrameC <= durationInFramesC ) {
    window.requestAnimationFrame( ()=> { 
      //outer hexagon twist-morphs into inner hexagon
      so1.x = AJS.easeOutQuint( po1.x, pi1.x, durationInFramesC, currentFrameC );
      so1.y = AJS.easeOutQuint( po1.y, pi1.y, durationInFramesC, currentFrameC );
      so2.x = AJS.easeOutQuint( po2.x, pi2.x, durationInFramesC, currentFrameC );
      so2.y = AJS.easeOutQuint( po2.y, pi2.y, durationInFramesC, currentFrameC );
      so3.x = AJS.easeOutQuint( po3.x, pi3.x, durationInFramesC, currentFrameC );
      so3.y = AJS.easeOutQuint( po3.y, pi3.y, durationInFramesC, currentFrameC );
      so4.x = AJS.easeOutQuint( po4.x, pi4.x, durationInFramesC, currentFrameC );
      so4.y = AJS.easeOutQuint( po4.y, pi4.y, durationInFramesC, currentFrameC );
      so5.x = AJS.easeOutQuint( po5.x, pi5.x, durationInFramesC, currentFrameC );
      so5.y = AJS.easeOutQuint( po5.y, pi5.y, durationInFramesC, currentFrameC );
      so6.x = AJS.easeOutQuint( po6.x, pi6.x, durationInFramesC, currentFrameC );
      so6.y = AJS.easeOutQuint( po6.y, pi6.y, durationInFramesC, currentFrameC );
      //inner hexagon twist-morphs into outer hexagon
      si1.x = AJS.easeOutQuint( pi1.x, po2.x, durationInFramesC, currentFrameC );
      si1.y = AJS.easeOutQuint( pi1.y, po2.y, durationInFramesC, currentFrameC );
      si2.x = AJS.easeOutQuint( pi2.x, po3.x, durationInFramesC, currentFrameC );
      si2.y = AJS.easeOutQuint( pi2.y, po3.y, durationInFramesC, currentFrameC );
      si3.x = AJS.easeOutQuint( pi3.x, po4.x, durationInFramesC, currentFrameC );
      si3.y = AJS.easeOutQuint( pi3.y, po4.y, durationInFramesC, currentFrameC );
      si4.x = AJS.easeOutQuint( pi4.x, po5.x, durationInFramesC, currentFrameC );
      si4.y = AJS.easeOutQuint( pi4.y, po5.y, durationInFramesC, currentFrameC );
      si5.x = AJS.easeOutQuint( pi5.x, po6.x, durationInFramesC, currentFrameC );
      si5.y = AJS.easeOutQuint( pi5.y, po6.y, durationInFramesC, currentFrameC );
      si6.x = AJS.easeOutQuint( pi6.x, po1.x, durationInFramesC, currentFrameC );
      si6.y = AJS.easeOutQuint( pi6.y, po1.y, durationInFramesC, currentFrameC );
      //update svg
      placeOuterHexagon();
      placeInnerHexagon();
      //recursion
      runAnimationC();
    });
  } else {
    currentFrameC = 0;
    animationActiveC = false;
    resetOuterHexagon();
    resetInnerHexagon();
    runAnimationC();
  }
}



///--- Activation ---///

runAnimationC();




