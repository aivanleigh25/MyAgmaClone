var Vector2 = function (a, b) {
  this.x = a || 0;
  this.y = b || 0
};
Vector2.prototype = {
  reset: function (a, b) {
    this.x = a;
    this.y = b;
    return this
  },
  toString: function (b) {
    b = b || 3;
    var a = Math.pow(10, b);
    return '[' + Math.round(this.x * a) / a + ', ' + Math.round(this.y * a) / a + ']'
  },
  clone: function () {
    return new Vector2(this.x, this.y)
  },
  copyTo: function (a) {
    a.x = this.x;
    a.y = this.y
  },
  copyFrom: function (a) {
    this.x = a.x;
    this.y = a.y
  },
  magnitude: function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  },
  magnitudeSquared: function () {
    return (this.x * this.x) + (this.y * this.y)
  },
  normalise: function () {
    var a = this.magnitude();
    this.x = this.x / a;
    this.y = this.y / a;
    return this
  },
  reverse: function () {
    this.x = - this.x;
    this.y = - this.y;
    return this
  },
  plusEq: function (a) {
    this.x += a.x;
    this.y += a.y;
    return this
  },
  plusNew: function (a) {
    return new Vector2(this.x + a.x, this.y + a.y)
  },
  minusEq: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    return this
  },
  minusNew: function (a) {
    return new Vector2(this.x - a.x, this.y - a.y)
  },
  multiplyEq: function (a) {
    this.x *= a;
    this.y *= a;
    return this
  },
  multiplyNew: function (a) {
    var b = this.clone();
    return b.multiplyEq(a)
  },
  divideEq: function (a) {
    this.x /= a;
    this.y /= a;
    return this
  },
  divideNew: function (a) {
    var b = this.clone();
    return b.divideEq(a)
  },
  dot: function (a) {
    return (this.x * a.x) + (this.y * a.y)
  },
  angle: function (a) {
    return Math.atan2(this.y, this.x) * (a ? 1 : Vector2Const.TO_DEGREES)
  },
  rotate: function (d, a) {
    var b = Math.cos(d * (a ? 1 : Vector2Const.TO_RADIANS));
    var c = Math.sin(d * (a ? 1 : Vector2Const.TO_RADIANS));
    Vector2Const.temp.copyFrom(this);
    this.x = (Vector2Const.temp.x * b) - (Vector2Const.temp.y * c);
    this.y = (Vector2Const.temp.x * c) + (Vector2Const.temp.y * b);
    return this
  },
  equals: function (a) {
    return ((this.x == a.x) && (this.y == a.x))
  },
  isCloseTo: function (b, a) {
    if (this.equals(b)) {
      return true
    }
    Vector2Const.temp.copyFrom(this);
    Vector2Const.temp.minusEq(b);
    return (Vector2Const.temp.magnitudeSquared() < a * a)
  },
  rotateAroundPoint: function (a, c, b) {
    Vector2Const.temp.copyFrom(this);
    Vector2Const.temp.minusEq(a);
    Vector2Const.temp.rotate(c, b);
    Vector2Const.temp.plusEq(a);
    this.copyFrom(Vector2Const.temp)
  },
  isMagLessThan: function (a) {
    return (this.magnitudeSquared() < a * a)
  },
  isMagGreaterThan: function (a) {
    return (this.magnitudeSquared() > a * a)
  }
};
Vector2Const = {
  TO_DEGREES: 180 / Math.PI,
  TO_RADIANS: Math.PI / 180,
  temp: new Vector2()
};
