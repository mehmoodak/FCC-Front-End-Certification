"use strict";

var bar = new ProgressBar.Circle('#clock-timer', {
  strokeWidth: 4,
  duration: 10,
  color: '#229E74',
  trailColor: '#fff',
  trailWidth: 4,
});

bar.animate(0.8);  // Number from 0.0 to 1.0

$(document).ready(function (e) {

});
