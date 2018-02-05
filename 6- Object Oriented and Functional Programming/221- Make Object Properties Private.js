var Car = function () {
  // this is a private variable
  var speed = 10;

  // these are public methods
  this.accelerate = function (change) {
    speed += change;
  };

  this.decelerate = function () {
    speed -= 5;
  };

  this.getSpeed = function () {
    return speed;
  };
};

var Bike = function () {

  // Only change code below this line.

  var gear;

  this.getGear = function () {
    return this.gear;
  };

  this.setGear = function (value) {
    this.gear = value;
  };

};

var myCar = new Car();

var myBike = new Bike();
