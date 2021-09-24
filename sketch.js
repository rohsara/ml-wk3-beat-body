// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let myRects = [];
let isPlaying = false;
let bass, drum, perc, electro;
let noseX = 0, noseY = 0;
let rightWristX = 0, rightWristY = 0;
let leftWristX = 0, leftWristY = 0;
let rightElbowX = 0, rightElbowY = 0;

function preload() {
  bass = loadSound('assets/bass.mp3');
  drum = loadSound('assets/drum-kick.mp3');
  perc = loadSound('assets/perc-loop.mp3');
  electro = loadSound('assets/electro-loop.mp3');
}

function setup() {
  rectMode(CENTER);
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single', modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // Create 3 rects
  for (let i = 0; i < 4; i++) {
    let myRect = new Square(Math.floor(random(100, width-140)), Math.floor(random(100, height-100)), Math.floor(random(60, 100)))
    myRects.push(myRect);
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
  
}

function draw() {
  // Flip the video from left to right, mirror the video
  translate(width, 0)
  scale(-1, 1);
  image(video, 0, 0, width, height);
  filter(GRAY);
  noStroke();
  drawRect();
  checkNose();
  checkRightWrist();
  checkLeftWrist();
  checkRightElbow();
  drawNose();
  drawRightWrist();
  drawLeftWrist();
  drawRightElbow();
}

function checkNose() {
  for (let k = 0; k < 3; k++) {
    myRects[k].checkIfInside(noseX, noseY);
  }
  isPlaying = myRects.some(r => r.isInside);
  if (isPlaying) {
    // .isPlaying() returns a boolean
    // If the electro is not playing, play the electro
    if (!electro.isPlaying()) {
      electro.play();
    }
  } else {
    // .isPaused()() returns a boolean
    // If the electro is not paused, pause the electro
    if (!electro.isPaused()) {
      electro.pause();
    }
  }
}

function checkRightWrist() {
  for (let k = 0; k < 3; k++) {
    myRects[k].checkIfInside(rightWristX, rightWristY);
  }
  isPlaying = myRects.some(r => r.isInside);
  if (isPlaying) {
    // .isPlaying() returns a boolean
    // If the drum is not playing, play the drum
    if (!drum.isPlaying()) {
      drum.play();
    }
  } else {
    // .isPaused()() returns a boolean
    // If the drum is not paused, pause the drum
    if (!drum.isPaused()) {
      drum.pause();
    }
  }
}
function checkLeftWrist() {
  for (let k = 0; k < 3; k++) {
    myRects[k].checkIfInside(leftWristX, leftWristY);
  }
  isPlaying = myRects.some(r => r.isInside);
  if (isPlaying) {
    // .isPlaying() returns a boolean
    // If the perc is not playing, play the perc
    if (!perc.isPlaying()) {
      perc.play();
    }
  } else {
    // .isPaused()() returns a boolean
    // If the perc is not paused, pause the perc
    if (!perc.isPaused()) {
      perc.pause();
    }
  }
}

function checkRightElbow() {
  for (let k = 0; k < 3; k++) {
    myRects[k].checkIfInside(rightElbowX, rightElbowY);
  }
  isPlaying = myRects.some(r => r.isInside);
  if (isPlaying) {
    // .isPlaying() returns a boolean
    // If the bass is not playing, play the bass
    if (!bass.isPlaying()) {
      bass.play();
    }
  } else {
    // .isPaused()() returns a boolean
    // If the bass is not paused, pause the bass
    if (!bass.isPaused()) {
      bass.pause();
    }
  }
}

function drawRect() {
  for (let j = 0; j < 4; j++) {
    myRects[j].show();
  }
}

function drawNose() {
  if (poses[0] && poses[0].pose && poses[0].pose.nose) {
    noseX = poses[0].pose.nose.x;
    noseY = poses[0].pose.nose.y;
    fill(0, 255, 255);
	noStroke();
    ellipse(noseX, noseY, 35, 35)
  }
}

function drawRightWrist() {
  if (poses[0] && poses[0].pose && poses[0].pose.rightWrist) {
    rightWristX = poses[0].pose.rightWrist.x;
    rightWristY = poses[0].pose.rightWrist.y;
    fill(0, 255, 255);
	noStroke();
    ellipse(rightWristX, rightWristY, 35, 35)
  }
}

function drawLeftWrist() {
  if (poses[0] && poses[0].pose && poses[0].pose.leftWrist) {
    leftWristX = poses[0].pose.leftWrist.x;
    leftWristY = poses[0].pose.leftWrist.y;
    fill(0, 255, 255);
	noStroke();
    ellipse(leftWristX, leftWristY, 35, 35)
  }
}

function drawRightElbow() {
  if (poses[0] && poses[0].pose && poses[0].pose.rightElbow) {
    rightElbowX = poses[0].pose.rightElbow.x;
    rightElbowY = poses[0].pose.rightElbow.y;
    fill(0, 255, 255);
	noStroke();
    ellipse(rightElbowX, rightElbowY, 35, 35)
  }
}