const $ = {};

/*========================================
Utility
========================================*/

$.PI = Math.PI;
$.TAU = $.PI * 2;

$.rand = function (min, max) {
  if (!max) {
    var max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

/*========================================
Initialize
========================================*/

$.init = () => {
  $.c = document.querySelector('canvas');
  $.ctx = $.c.getContext('2d');
  $.simplex = new SimplexNoise();
  $.events();
  $.reset();
  $.loop();
};

/*========================================
Reset
========================================*/

$.reset = () => {
  $.dpr = window.devicePixelRatio;
  $.w = window.innerWidth;
  $.h = window.innerHeight;
  $.cx = $.w / 2;
  $.cy = $.h / 2;
  $.c.width = $.w * $.dpr;
  $.c.height = $.h * $.dpr;
  $.c.style.width = `${$.w}px`;
  $.c.style.height = `${$.h}px`;
  $.ctx.scale($.dpr, $.dpr);

  $.count = Math.floor($.w / 50);
  $.xoff = 0;
  $.xinc = 0.05;
  $.yoff = 0;
  $.yinc = 0.003;
  $.goff = 0;
  $.ginc = 0.003;
  $.y = $.h * 0.66;
  $.length = $.w + 10;
  $.amp = 40;
};

/*========================================
Event
========================================*/

$.events = () => {
  window.addEventListener('resize', $.reset.bind(this));
};

/*========================================
Wave
========================================*/

$.wave = () => {
  $.ctx.beginPath();
  let sway = $.simplex.noise2D($.goff, 0) * $.amp;
  for (let i = 0; i <= $.count; i++) {
    $.xoff += $.xinc;
    let x = $.cx - $.length / 2 + $.length / $.count * i;
    let y = $.y + $.simplex.noise2D($.xoff, $.yoff) * $.amp + sway;
    $.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
  }
  $.ctx.lineTo($.w, $.h);
  $.ctx.lineTo(0, $.h);
  $.ctx.closePath();
  $.ctx.fillStyle = 'hsla(210, 90%, 50%, 0.2)';
  $.ctx.fill();
};

/*========================================
Loop
========================================*/

$.loop = () => {
  requestAnimationFrame($.loop);
  $.ctx.clearRect(0, 0, $.w, $.h);
  $.xoff = 0;
  $.wave();
  $.wave();
  $.wave();
  $.wave();
  $.yoff += $.yinc;
  $.goff += $.ginc;
};

/*========================================
Start
========================================*/

$.init();