$.fn.html = function(html) {
    if (!html) {
        return this.objects[0].innerHTML;
    } else {
        return this.each(function() {
            this.objects[0].innerHTML = html;
        });
    }
};