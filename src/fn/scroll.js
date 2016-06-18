$.fn.scrollTop = function(pos) {
    if (pos == undefined) {
        return this.get(0)["scrollTop"];
    } else {
        this.each(function() {
            this.get(0)["scrollTop"] = pos;
        });
    }
};

$.fn.scrollLeft = function(pos) {
    if (pos == undefined) {
        return this.get(0)["scrollLeft"];
    } else {
        this.each(function() {
            this.get(0)["scrollLeft"] = pos;
        });
    }
};