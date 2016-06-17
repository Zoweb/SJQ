/**
 * kjscompiler annotation
 * @depends {sjq.js}
 */

$.fn.get = function(index) {
    return typeof index == "number" ? this.objects[index] : this.objects;
};