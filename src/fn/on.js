// THIS CODE IS CURRENTLY NOT WORKING
// PLEASE CREATE AN ISSUE ON HOW TO FIX

$.fn.on = function(event, listener) {
    this.each(function() {
        var obj = this.get(0);
        var eventObj = obj['data']['events'][event];
        if (!eventObj || eventObj.length == 0) eventObj = [function(){}];
        console.log(eventObj, obj['data']['events']);
        eventObj[eventObj.length] = listener;
        console.log(eventObj);
        obj.addEventListener(event, listener, false);
    });
};

$.fn.off = function(event) {
    this.each(function() {
        var obj = this.get(0);
        var eventObj = obj['data']['events'][event];
        eventObj = undefined;
        for (var i = 0; i < eventObj.length; i++) {
            obj.removeEventListener(event, eventObj[i]);
        }
    });
};

$.fn.trigger = function(event, eventArgs) {
    this.each(function() {
        var obj = this.get(0);
        var eventObj = obj['data']['events'][event];
        for (var i = 0; i < eventObj.length; i++) {
            eventObj[i](eventArgs);
        }
    })
};