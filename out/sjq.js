/**
 * SJQ - The tiny, simple jQuery-like API
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 Zoweb
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(){
function isNode(o) {
  return typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
}
function isElement(o) {
  return typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
}
function sjq(selector, context) {
  return new SJQ(selector, context);
}
function SJQ(selector, context) {
  if (this.constructor !== SJQ) {
    return new SJQ(selector, context);
  }
  this.SJQ_INFO = SJQ.info;
  var element;
  if (typeof selector == "string") {
    element = document.querySelectorAll(selector);
  }
  if (selector === window) {
    element = window;
    selector = "window";
  }
  if (typeof selector == "object" && !isNode(selector)) {
    element = selector.objects;
    selector = selector.selector;
  }
  if (typeof selector == "object" && isNode(selector)) {
    element = selector;
    selector = "HTMLElement";
  }
  if (selector === undefined) {
    console.error("SJQ requires parameter SELECTOR");
    return false;
  }
  this.selector = selector;
  this.context = context;
  this.objects = [];
  for (var i = 0;i < element.length;i++) {
    this.objects[i] = element[i];
    this.objects[i].data = {events:{}};
  }
  if (this.objects.length === 0) {
    this.objects[0] = element;
    this.objects[0].data = {events:{}};
  }
}
SJQ.fn = SJQ.prototype;
sjq.fn = SJQ.fn;
var $ = sjq;
window.$ = window.sjq = $;
window.SJQ = SJQ;
$.fn.attr = function(attrName, attrValue) {
  if (!attrValue) {
    return this.objects[0].getAttribute(attrName);
  } else {
    return this.each(function() {
      this.objects[0].setAttribute(attrName, attrValue);
    });
  }
};
$.fn.css = function(name, attr) {
  if (typeof name == "string") {
    var style = name.replace(/-(.)/g, function(match, p1, offset) {
      var upperCase = p1.toUpperCase();
      return upperCase;
    });
    if (attr) {
      return this.each(function() {
        if (typeof attr == "number") {
          attr += "px";
        }
        this.objects[0].style[style] = attr;
      });
    } else {
      return window.getComputedStyle(this.objects[0])[style];
    }
  } else {
    return this;
  }
};
$.fn.each = function(fn) {
  for (var i = 0;i < this.objects.length;i++) {
    fn.call($(this.objects[i]), i, $(this.objects[i]));
  }
  return this;
};
$.fn.get = function(index) {
  return typeof index == "number" ? this.objects[index] : this.objects;
};
$.fn.html = function(html) {
  if (!html) {
    return this.objects[0].innerHTML;
  } else {
    return this.each(function() {
      this.objects[0].innerHTML = html;
    });
  }
};
$.fn.on = function(event, listener) {
  this.each(function() {
    var obj = this.get(0);
    var eventObj = obj["data"]["events"][event];
    if (!eventObj || eventObj.length == 0) {
      eventObj = [function() {
      }];
    }
    console.log(eventObj, obj["data"]["events"]);
    eventObj[eventObj.length] = listener;
    console.log(eventObj);
    obj.addEventListener(event, listener, false);
  });
};
$.fn.off = function(event) {
  this.each(function() {
    var obj = this.get(0);
    var eventObj = obj["data"]["events"][event];
    eventObj = undefined;
    for (var i = 0;i < eventObj.length;i++) {
      obj.removeEventListener(event, eventObj[i]);
    }
  });
};
$.fn.trigger = function(event, eventArgs) {
  this.each(function() {
    var obj = this.get(0);
    var eventObj = obj["data"]["events"][event];
    for (var i = 0;i < eventObj.length;i++) {
      eventObj[i](eventArgs);
    }
  });
};
$.fn.scrollTop = function(pos) {
  if (pos === undefined) {
    return this.get(0).scrollTop;
  } else {
    this.each(function() {
      this.get(0).scrollTop = pos;
    });
  }
};
$.fn.scrollLeft = function(pos) {
  if (pos === undefined) {
    return this.get(0).scrollLeft;
  } else {
    this.each(function() {
      this.get(0).scrollLeft = pos;
    });
  }
};
$.fn.text = function(text) {
  if (!text) {
    return this.objects[0].textContent;
  } else {
    return this.each(function() {
      this.objects[0].textContent = text;
    });
  }
};
}).call(window);
/**
 * http://github.com/zoweb/sjq
 */
