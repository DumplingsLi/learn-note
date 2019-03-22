var tween = {
  linear: function(t, b, c, d) {
    return c * t / d + b;
  },
  easeIn: function(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
}

var Animate = function(dom) {
  this.dom = dom;
  this.startTime = 0;
  this.startPos = 0;
  this.endPos = 0;
  this.propertyName = null;    // 要改变的属性名称
  this.easing = null;
  this.duration = null;       // 动画持续时间
}

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
  this.startTime = +new Date(); //+ ???
  this.startPos = this.dom.getBoundingClientRect()[propertyName];
  // getBoundingClientRect返回一个具有四个属性left、top、right、bottom的DOMRect对象
  this.propertyName = propertyName;
  this.endPos = endPos;
  this.duration = duration;
  this.easing = tween[easing];

  var self = this;
  var timeId = setInterval(function(){
    if(self.step() === false) {  // 如果动画已结束，则清除定时器
      clearInterval(timeId);
    }
  }, 19);
};

Animate.prototype.step = function() {
  var t = +new Date();
  if(t >= this.startTime + this.duration) { // 动画结束，修正小球位置
    this.update(this.endPos);
    return false;
  }
  var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
  this.update(pos);
}

Animate.prototype.update = function(pos) {
  this.dom.style[this.propertyName] = pos + 'px';
}
