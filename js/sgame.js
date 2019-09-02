"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    <div class=", ">\n      ", "st iteration:\n      <input\n        type=\"range\"\n        :min=", "\n        :max=", "\n        .value=", "\n        @input=", "\n      >\n      <span>", "</span>\n    </div>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n<div class=\"controls\">\n  ", "\n  <div class=\"control\">\n    Recursion:\n    <input\n      type=\"range\"\n      :min=", "\n      :max=", "\n      .value=", "\n      @input=", "\n    >\n    <span>", "</span>\n  </div>\n</div>\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ANGLES = [14, 14, 14];
var RECURSION_RATE = 3;
var CURSOR = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};
var PI = Math.PI;
var TAU = PI * 2;

var r = function r() {
  return Math.random();
};

var angle2 = function angle2(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
};

var distance2 = function distance2(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

var lerp = function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
};

var radius = function radius() {
  return Math.min(w, h) * .1;
};

var vec2 = function vec2(_ref) {
  var x = _ref.x,
      y = _ref.y;
  return [x * radius(), y * radius()];
};

var clamp = function clamp(min, max) {
  return function (value) {
    return Math.max(Math.min(max, value), min);
  };
};

var anglesMin = 1;
var anglesMax = 20;
var recursionMin = 1;
var recursionMax = 3;
var clampAngles = clamp(anglesMin, anglesMax);
var clampRecursion = clamp(recursionMin, recursionMax);
var w = 800;
var h = 600;
var ctx = canvas.getContext('2d');

var setCanvasSize = function setCanvasSize() {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
};

setCanvasSize();
canvas.addEventListener('mousemove', function (_ref2) {
  var x = _ref2.x,
      y = _ref2.y;

  var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
      top = _canvas$getBoundingCl.top,
      left = _canvas$getBoundingCl.left,
      width = _canvas$getBoundingCl.width,
      height = _canvas$getBoundingCl.height;

  CURSOR.targetX = x - left - width / 2;
  CURSOR.targetY = y - top - height / 2;
});
canvas.addEventListener('mouseleave', function (_ref3) {
  var x = _ref3.x,
      y = _ref3.y;
  CURSOR.targetX = 0;
  CURSOR.targetY = 0;
});
window.addEventListener('resize', setCanvasSize);
var html = fhtml.default;
html(_templateObject(), function (f) {
  return f.map.state.angles(function (_, i) {
    return html(_templateObject2(), function (f) {
      return {
        'control': true,
        'control--drawn': f.state.recursion() === i + 1,
        'control--inactive': f.state.recursion() <= i
      };
    }, function (f) {
      return i + 1;
    }, function (f) {
      return f.state.anglesMin();
    }, function (f) {
      return f.state.anglesMax();
    }, function (f) {
      return f.prop.value();
    }, function (f) {
      return ANGLES[i] = f.prop.value(parseInt(f.node.value));
    }, function (f) {
      return f.prop.value();
    });
  });
}, function (f) {
  return f.state.recursionMin();
}, function (f) {
  return f.state.recursionMax();
}, function (f) {
  return f.state.recursion();
}, function (f) {
  return RECURSION_RATE = f.state.recursion(parseInt(f.node.value));
}, function (f) {
  return f.state.recursion();
}).state({
  angles: ANGLES.map(function (n) {
    return {
      value: n
    };
  }),
  anglesMin: anglesMin,
  anglesMax: anglesMax,
  recursion: RECURSION_RATE,
  recursionMin: recursionMin,
  recursionMax: recursionMax
}).mount(controls);
var points;

var update = function update() {
  CURSOR.x = lerp(CURSOR.x, CURSOR.targetX, .1);
  CURSOR.y = lerp(CURSOR.y, CURSOR.targetY, .1);
  points = ANGLES.map(function (angles) {
    return _toConsumableArray(new Array(angles + 1)).map(function (p, i) {
      return {
        x: Math.cos(TAU / angles * i),
        y: Math.sin(TAU / angles * i)
      };
    });
  });
};

var drawPoint = function drawPoint() {
  var recursion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var next = recursion + 1;
  return function (p, i, arr) {
    ctx.save();

    var _vec = vec2(p),
        _vec2 = _slicedToArray(_vec, 2),
        x = _vec2[0],
        y = _vec2[1];

    var distance = distance2(x, y, CURSOR.x, CURSOR.y);
    var angle = angle2(x, y, CURSOR.x, CURSOR.y);
    x -= Math.cos(angle) * Math.log(Math.pow(distance, TAU));
    y -= Math.sin(angle) * Math.log(Math.pow(distance, TAU));
    var angleToCenter = angle2(0, 0, x, y);
    ctx.translate(x, y); //ctx.rotate(angleToCenter)

    if (recursion < RECURSION_RATE - 1) {
      points[next].forEach(drawPoint(next));
    } else {
      if (i === 0) ctx.moveTo(0, 0);else ctx.lineTo(0, 0);
    }

    ctx.restore();
  };
};

var render = function render() {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(0,0,0,.2)";
  ctx.save();
  ctx.translate(w * .5, h * .5);
  ctx.beginPath();
  points[0].forEach(drawPoint(0));
  ctx.stroke();
  ctx.restore();
};

var loop = function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
};

loop();