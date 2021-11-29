export function rectCollisionDetection(rects, x, y) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = rects[i];
        }
    }
    return isCollision;
}

export function circleAndMouseCollissionDetection(gameWidth, gameHeight, buttonRadius, mouse) {

    return gameWidth/2-buttonRadius < mouse.x && mouse.x < gameWidth/2+buttonRadius && gameHeight/2-buttonRadius < mouse.y  && mouse.y < gameHeight/2+buttonRadius;
}

var PIXEL_RATIO = (function () {
    var ctx = document.getElementById("gameScreen").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
  
    return dpr / bsr;
  })();
  
  
export function createHiDPICanvas (w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.getElementById("gameScreen");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
  }