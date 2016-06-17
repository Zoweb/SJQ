/**
 * kjscompiler annotation
 * @depends {sjq.js}
 */

$.fn.text = function(text) {
    if (!text) {
        return this.objects[0].textContent;
    } else {
        return this.each(function() {
            this.objects[0].textContent = text;
        });
    }
};