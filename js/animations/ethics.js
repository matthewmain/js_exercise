
//////////////////////////////////////
/////////    Ethics Icon     /////////
//////////////////////////////////////


var innerCircle = document.getElementById("ethics-icon-circle-inner");
var middleCircle = document.getElementById("ethics-icon-circle-middle");
var outerCircle = document.getElementById("ethics-icon-circle-outer");

swellPct = "130%";  // swell percent of base size
var dur = 2.5;  // animation segment duration
var rd = 3;  // repeat delay

var innerTl = new TimelineMax( { repeat: -1 } );
var middleTl = new TimelineMax( { repeat: -1, delay: 0.075 } );
var outerTl = new TimelineMax( { repeat: -1, delay: 0.150 } );

var ripple1 = CustomEase.create("custom", "M0,0 C0.022,0.452 0.106,0.674 0.15,0.674 0.246,0.674 0.31,-0.174 0.436,-0.174 0.556,-0.174 0.603,0.084 0.682,0.084 0.754,0.084 0.802,-0.054 0.87,-0.054 0.922,-0.054 1,0 1,0");

innerTl.to(innerCircle, dur, { ease: ripple1, delay: rd, width: swellPct, height: swellPct, opacity: 0.30 } )
middleTl.to(middleCircle, dur, { ease: ripple1, delay: rd, width: swellPct, height: swellPct, opacity: 0.15  } )
outerTl.to(outerCircle, dur, { ease: ripple1, delay: rd, width: swellPct, height: swellPct, opacity: 0.0  } )
  

