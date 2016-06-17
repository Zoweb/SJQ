/**
 * kjscompiler annotation
 * @depends {sjq.js}
 */

$.fn.attr = function(attrName, attrValue) {
    if (!attrValue) {
        return this.objects[0].getAttribute(attrName);
    } else {
        return this.each(function() {
            this.objects[0].setAttribute(attrName, attrValue);
        });
    }
};