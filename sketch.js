var y = 0;
var x = 0;
var z = 0;
var r = 0;
var thetaAngle = 0; // 0 => PI
var phiAngle = 0;  // 0 > 2PI
var deltaTheta = 0.09;
var deltaPhi = 0.25;
var lobeFactor = 2.7;
var throatRadius = 0;
var centerX = 0;
var centerY = 0;
var redC =134, greenC = 123, blueC = 250;
var lastMouseY = 1.5;
var prevMouseY = 0;
var scrollFactor = 0.002;

function setup() {
  // put setup code here
  createCanvas(800, 820, WEBGL);

  centerX = displayWidth / 2;
  centerY = displayHeight / 2;

  background(0);

  // console.log('Center X: ' + centerX);
  // console.log('center Y: ' + centerY);
}

function draw() {
  // put drawing code here
  //translate(centerX, centerY, 0);
  background(0);
  rotateX(lastMouseY); 
  //rotateY(mouseX * 0.007);

  for (var ta = 0; ta < PI + deltaTheta; ta += deltaTheta) {
    thetaAngle = ta;

    beginShape();
    
    for (var pa = 0; pa < PI * 2 + deltaPhi; pa += deltaPhi) {
          phiAngle = pa;
      r = 300 * sin(lobeFactor * thetaAngle);

      x = sphericalX(r, thetaAngle, phiAngle) + throatRadius * (sin(phiAngle) + cos(phiAngle));
      y = sphericalY(r, thetaAngle, phiAngle) + throatRadius * (sin(phiAngle) + sin(phiAngle));
      z = sphericalZ(r, thetaAngle, phiAngle);

      //phiAngle += delta;
      if (y > displayHeight) y = 0;
      if (x > displayWidth) x = 0;

      stroke(redC, greenC, blueC);

      noFill();
      vertex(x, y, z);
      //vertex(x+1, y+1, z);

    }
    endShape();
  }
}

function mousePressed() {
  prevMouseY = mouseY;
}

function mouseDragged() {
  lastMouseY += (prevMouseY - mouseY) * scrollFactor;
  prevMouseY = mouseY;
}
// ***** Spherical Coordinate system equations to translate into cartesian coordinates (x,y,z) *****
// Spherical Coordinates where phi is the azimuth angle and theta is the polar or elevation angle.
// r >=0, 0 <= theta <= pi, 0 <= phi < 2PI.
// *************************************************************************************************
function sphericalX(r, theta, phi) {
  return r * sin(theta) * cos(phi);
}

// ***** Spherical Coordinate system equations to translate into cartesian coordinates (x,y,z) *****
// Spherical Coordinates where phi is the azimuth angle and theta is the polar or elevation angle.
// r >=0, 0 <= theta <= pi, 0 <= phi < 2PI.
// *************************************************************************************************
function sphericalY(r, theta, phi) {
  return r * sin(theta) * sin(phi);
}

// ***** Spherical Coordinate system equations to translate into cartesian coordinates (x,y,z) *****
// Spherical Coordinates where phi is the azimuth angle and theta is the polar or elevation angle.
// r >=0, 0 <= theta <= pi, 0 <= phi < 2PI.
// *************************************************************************************************
function sphericalZ(r, theta, phi) {
  return r * cos(theta);
}

function mouseWheel( event) {
  var mScroll = event.delta;
  lobeFactor+= mScroll * 0.0001;
//console.log('Wheel:' + event.delta);
  if (lobeFactor <=0 ) lobeFactor = 0.1;
  //console.log('Lobe Factor: ' + lobeFactor);
}
