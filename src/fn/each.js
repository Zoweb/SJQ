$.fn.each = function(fn) {
    for (var i = 0; i < this.objects.length; i++) {
        fn.call($(this.objects[i]), i, $(this.objects[i]));
    }
    return this;
};