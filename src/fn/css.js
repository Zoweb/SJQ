/**
 *
 * @param name
 * @param attr
 * @returns {string|SJQ}
 */
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