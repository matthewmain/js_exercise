

////////////////////////////////////
/////////    Risk Icon     /////////
////////////////////////////////////



///---INITIATION---///


let svg = document.getElementById("risk-icon-svg");
let envWidth = 300;  //physics environment width (as x value)
let envHeight = 190.95;  //physics environment height (as y value to ground)
 
//settings
var rigidity = 5;  // (iterations of position-accuracy refinement)
var gravity = 0.1;  // (rate of y-velocity increase per frame)
var friction = 0.999;  // (proportion of previous velocity after frame refresh)
var bounceLoss = 0.9;  // (proportion of previous velocity after bouncing)
var skidLoss = 0.9;  // (proportion of previous velocity if touching the ground)
var expOrig = { x: 150, y: 190 };  // explosion origin
var expInt = 8;  // explosion intensity (as velocity in svg units)
var explosionDelay = 300;
var assemblyDelay = 300;
var reasSpd = 3;  // reassemble speed (as svg units per iteration)

//trackers
var isExploded = false;
var iterationsSinceLastExplosion = 0;
var iterationsSinceLastAssembly = 0;

//components
var pointCount = 0;
var points = [];
var spanCount = 0;
var spans = [];
var skinCount = 0;
var skins = [];



///---SHAPES---///

//svg home points (forms broken triangle icon, clockwise from top)
let spT1 =  { x: 150,     y: 111.97 };  // svg point tip 1
let spE1a = { x: 167.88,  y: 143.12 };  // svg point edge 1a
let spE1b = { x: 177.5,   y: 159.89 };  // svg point edge 1b
let spT2 =  { x: 195.31,  y: 190.95 };  // svg point tip 2
let spE2a = { x: 166,     y: 190.95 };  // svg point edge 2a
let spE2b = { x: 114,     y: 190.95 };  // svg point edge 2b
let spT3 =  { x: 104.69,  y: 190.95 };  // svg point tip 3
let spE3 =  { x: 135.98,  y: 136.39 };  // svg point edge 3
let spC =   { x: 154.34,  y: 169.77 };  // svg point center

//shard 1 verlet components
var vpS1a = addPt( spT1 );  // verlet point shard 1a
var vpS1b = addPt( spE1a );  // verlet point shard 1b
var vpS1c = addPt( spC );  // verlet point shard 1c
var vpS1d = addPt( spE3 );  // verlet point shard 1d
var vsS2a = addSp( vpS1a, vpS1b );  // verlet span shard 1a
var vsS2b = addSp( vpS1b, vpS1c );  // verlet span shard 1b
var vsS2c = addSp( vpS1c, vpS1d );  // verlet span shard 1c
var vsS2d = addSp( vpS1d, vpS1a );  // verlet span shard 1d
var vsS2e = addSp( vpS1b, vpS1d );  // verlet span shard 1e  (scaffold)
var skinShard1 = addSk( [ vpS1a, vpS1b, vpS1c, vpS1d ] );  // border as skin object

//shard 3 verlet components
var vpS3a = addPt( spE1b );  // verlet point shard 1a
var vpS3b = addPt( spT2 );  // verlet point shard 1b
var vpS3c = addPt( spE2a );  // verlet point shard 1c
var vpS3d = addPt( spC );  // verlet point shard 1d
var vsS2a = addSp( vpS3a, vpS3b );  // verlet span shard 1a
var vsS2b = addSp( vpS3b, vpS3c );  // verlet span shard 1b
var vsS2c = addSp( vpS3c, vpS3d );  // verlet span shard 1c
var vsS2d = addSp( vpS3d, vpS3a );  // verlet span shard 1d
var vsS2e = addSp( vpS3a, vpS3c );  // verlet span shard 1e (scaffold)
var skinShard3 = addSk( [ vpS3a, vpS3b, vpS3c, vpS3d ] );  // border as skin object

//shard 4 verlet components
var vpS4a = addPt( spC );  // verlet point shard 2a
var vpS4b = addPt( spE2a );  // verlet point shard 2b
var vpS4c = addPt( spE2b );  // verlet point shard 2c
var vsS4a = addSp( vpS4a, vpS4b );  // verlet span shard 2a
var vsS4b = addSp( vpS4b, vpS4c );  // verlet span shard 2b
var vsS4c = addSp( vpS4c, vpS4a );  // verlet span shard 2c
var skinShard4 = addSk( [ vpS4a, vpS4b, vpS4c ] );  // border as skin object

//shard 5 verlet components
var vpS5a = addPt( spE3 );  // verlet point shard 2a
var vpS5b = addPt( spC );  // verlet point shard 2b
var vpS5c = addPt( spE2b );  // verlet point shard 2c
var vpS5d = addPt( spT3 );  // verlet point shard 2d
var vsS5a = addSp( vpS5a, vpS5b );  // verlet span shard 2a
var vsS5b = addSp( vpS5b, vpS5c );  // verlet span shard 2b
var vsS5c = addSp( vpS5c, vpS5d );  // verlet span shard 2c
var vsS5d = addSp( vpS5d, vpS5a );  // verlet span shard 2d
var vsS5e = addSp( vpS5a, vpS5c );  // verlet span shard 2e (scaffold)
var vsS5f = addSp( vpS5b, vpS5d );  // verlet span shard 2f (scaffold)
var skinShard5 = addSk( [ vpS5a, vpS5b, vpS5c, vpS5d ] );   // border as skin object

//shard 2 verlet components
var vpS2a = addPt( spE1a );  // verlet point shard 2a
var vpS2b = addPt( spE1b );  // verlet point shard 2b
var vpS2c = addPt( spC );  // verlet point shard 2c
var vsS2a = addSp( vpS2a, vpS2b );  // verlet span shard 2a
var vsS2b = addSp( vpS2b, vpS2c );  // verlet span shard 2b
var vsS2c = addSp( vpS2c, vpS2a );  // verlet span shard 2c
var skinShard2 = addSk( [ vpS2a, vpS2b, vpS2c ] );  // border as skin object



///---OBJECT HANDLING---///


//POINTS

//point constructor
function Point( current_x, current_y, homePoint ) {
  this.cx = current_x;
  this.cy = current_y; 
  this.px = this.cx;  // previous x value
  this.py = this.cy;  // previous y value
  this.width = 0;
  this.pinned = false;
  this.id = pointCount; 
  this.homePoint = homePoint
  pointCount += 1;
}

//adds a new point object instance to points array
function addPt( homePoint ) {
  points.push( new Point( homePoint.x, homePoint.y, homePoint ) ); 
  return points[points.length-1];
}


//SPANS

//span constructor
function Span( point_1, point_2 ) {
  this.p1 = point_1;
  this.p2 = point_2;
  this.l = distanceBetween( this.p1, this.p2 ); // length
  this.id = spanCount;
  spanCount += 1;
}

//adds a new span object instance to spans array
function addSp( p1, p2 ) {
  spans.push( new Span( getPt(p1.id), getPt(p2.id) ) );
  return spans[spans.length-1];
}


//SKINS

//skin constructor
function Skin(points_array) { 
  this.pa = points_array;
  this.id = skinCount;
  skinCount += 1;
}

//adds a new skin object instance to skins array
function addSk(points_array) {
  skins.push( new Skin(points_array) );
  return skins[skins.length-1];
}



///---FUNCTIONS---///


//generates random integer between minimum and maximum integer values (inclusive)
function randNumBetween( minInt, maxInt ) {
  return Math.floor( Math.random() * ( maxInt - minInt + 1 ) ) + minInt;
}

//generates random float between any minimum and maximum values
function randIntBetween( min, max ) {
  return Math.random() * ( max - min ) + min;
}

//gets a point by id number
function getPt(id) {
  for (var i=0; i<points.length; i++) { 
    if (points[i].id == id) { return points[i]; }
  }
}

//gets distance between two points 
function distanceBetween(point_1, point_2) {
  var x_difference = point_2.cx - point_1.cx;
  var	y_difference = point_2.cy - point_1.cy;
  return Math.sqrt( x_difference*x_difference + y_difference*y_difference);
}

//pins all points to current locations
function pinPoints() {
  for (var i=0; i<points.length; i++) {
    points[i].pinned = true;
  }
}

//unpins all points
function unpinPoints() {
  for (var i=0; i<points.length; i++) {
    points[i].pinned = false;
  }
}

//adds skins to the viewbox as svg path elements
function placeSkins() {
  for (var i=0; i<skins.length; i++) {
    var sk = skins[i];
    var skinPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    skinPath.classList.add("skin");
    skinPath.id = "sk"+sk.id;
    var pathString = "M" + (sk.pa[0].cx) + "," + sk.pa[0].cy + " ";
    for (j=1; j<sk.pa.length; j++) {
      pathString += "L" + (sk.pa[j].cx) + "," + sk.pa[j].cy + " ";
    }
    pathString += "Z";
    skinPath.setAttribute("d", pathString );
    svg.appendChild( skinPath );
  }
}

//updates points using verlet velocity 
function updatePoints() {
  for(var i=0; i<points.length; i++) {
    var p = points[i];  // point object
    if (!p.pinned) {
      var xv = (p.cx - p.px) * friction;  // x velocity
      var yv = (p.cy - p.py) * friction;  // y velocity
      if (p.py >= envHeight-p.width/2-0.1) { xv *= skidLoss; }
      p.px = p.cx;  // updates previous x as current x
      p.py = p.cy;  // updates previous y as current y
      p.cx += xv;  // updates current x with new velocity
      p.cy += yv;  // updates current y with new velocity
      p.cy += gravity;  // add gravity to y
    }
  }	
}

//detects walls (inverts velocity if point moves beyond a wall)
function detectWalls() {
  for (var i=0; i<points.length; i++) {
    var p = points[i];
    var pr = p.width/2;  // point radius
    var pd = 10;  // padding
    var xv = p.cx - p.px;  // x velocity
    var yv = p.cy - p.py;  // y velocity
    //right wall
    if (p.cx > envWidth - pr - pd) { 
      p.cx = envWidth - pr - pd;  // move point back to wall
      p.px = p.cx + xv * bounceLoss;  // reverse x velocity
    }
    //left wall
    if (p.cx < 0 + pr + pd) {
      p.cx = 0 + pr + pd;  // move point back to wall
      p.px = p.cx + xv * bounceLoss;  // reverse x velocity
    }
    //floor
    if (p.cy > envHeight - pr ) {
      p.cy = envHeight - pr;  // move point back to wall
      p.py = p.cy + yv * bounceLoss;  // reverse y velocity
    }
    //ceiling
    if (p.cy < 0 + pr + pr) {
      p.cy = pr + pr;  // move point back to wall
      p.py = p.cy + yv * bounceLoss;  // reverse y velocity
    }
  }
}

//updates spans by reconciling new point positions with span length
function updateSpans() {
  for (var i=0; i<spans.length; i++) {
    var sp = spans[i];
    var dx = sp.p2.cx - sp.p1.cx;  // distance between x values
    var	dy = sp.p2.cy - sp.p1.cy;  // distance between y values
    var d = Math.sqrt( dx*dx + dy*dy);  // distance between the points
    var	r = sp.l / d;	// ratio (span length over distance between points)
    var	mx = sp.p1.cx + dx / 2;  // midpoint between x values 
    var my = sp.p1.cy + dy / 2;  // midpoint between y values
    var ox = dx / 2 * r;  // offset of each x value (compared to span length)
    var oy = dy / 2 * r;  // offset of each y value (compared to span length) 
    if (!sp.p1.pinned) {
      sp.p1.cx = mx - ox;  // updates span's first point x value
      sp.p1.cy = my - oy;  // updates span's first point y value
    }
    if (!sp.p2.pinned) {
      sp.p2.cx = mx + ox;  // updates span's second point x value
      sp.p2.cy = my + oy;  // updates span's second point y value 
    }
  }
}

//updates svg elements
function updateSvg() {
  for (k=0; k<skins.length; k++) {
    var sk = skins[k];
    var skinPath = document.getElementById("sk"+sk.id);  // gets svg element by id value
    var pathString = "M" + (sk.pa[0].cx) + "," + sk.pa[0].cy + " ";
    for (j=1; j<sk.pa.length; j++) {
      pathString += "L" + (sk.pa[j].cx) + "," + sk.pa[j].cy + " ";
    }
    pathString += "Z";
    skinPath.setAttribute("d", pathString);
  }
}

//explodes triangle
function explode() {
  unpinPoints();
  isExploded = true;
  iterationsSinceLastExplosion = 0;
  varExpInt = randIntBetween( expInt-2, expInt+2 );  // varying explosion intensity
  for (i=0; i<points.length; i++) {
    var p = points[i];
    var xDist = p.cx - expOrig.x;  // x distance from explosion origin to point 
    var yDist = p.cy - expOrig.y;  // y distance from explosion origin to point
    var dist = Math.sqrt( xDist*xDist + yDist*yDist );  // distance from explosion origin to point
    var distRat = varExpInt / dist;  // distance ratio (of velocity to distance from explosion origin point)
    p.px = p.cx - xDist * distRat;
    p.py = p.cy - yDist * distRat;
  }
}

function explodeIfReady() {
  iterationsSinceLastAssembly++;
  if ( iterationsSinceLastAssembly > explosionDelay && !isExploded ) {
    explode();
  }
}

function reassemble() {
  gravity = 0;
  isExploded = false;
  for (i=0; i<points.length; i++) {
    var p = points[i];
    var xDist = p.cx - p.homePoint.x;  // x distance from current point to home point 
    var yDist = p.cy - p.homePoint.y;  // y distance from current point to home point
    var dist = Math.sqrt( xDist*xDist + yDist*yDist );  // distance from current point to home point
    var distRat = reasSpd / dist;  // distance ratio (of velocity to distance from home point)
    p.cx = p.px = p.cx - xDist * distRat;
    p.cy = p.py = p.cy - yDist * distRat;
    if ( dist < 2 ) {
      p.cx = p.px = p.homePoint.x;
      p.cy = p.py = p.homePoint.y;
      p.pinned = true;
    } else {
      isExploded = true;
    }
  }
  if ( !isExploded ) {
    pinPoints();
    gravity = 0.1;
    iterationsSinceLastAssembly = 0;
  }
}

function reassembleIfReady() {
  iterationsSinceLastExplosion++;
  if ( iterationsSinceLastExplosion > assemblyDelay && isExploded ) {
    reassemble();
  }
}

//runs physics environment
function updateViewbox() {
  updatePoints();
  detectWalls();
  for (var i=0; i<rigidity; i++) { updateSpans(); }
  updateSvg();
  explodeIfReady();
  reassembleIfReady();
  window.requestAnimationFrame( updateViewbox );
}



///---EXECUTION---///


pinPoints()
placeSkins();

window.addEventListener( "load", updateViewbox );

svg.addEventListener("click", explode );



