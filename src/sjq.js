// ==ClosureCompiler==
// @output_file_name ../out/sjq.min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==

// Simple jQuery-like JS Plugin (c) Zoweb 2016
// Version 1.1

// Code from http://stackoverflow.com/a/384380
//Returns true if it is a DOM node
function isNode(o){
    return (
        typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
}

//Returns true if it is a DOM element
function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}

// The main function just returns new SJQ
function sjq(selector, context) {
    return new SJQ(selector, context);
}

/**
 * The main constructor
 * @param selector e.g. ".class" or "#id" or ".class > #id" (CSS-like selector)
 * @param [context] Currently not used.
 * @returns {SJQ}
 * @constructor
 */
function SJQ(selector, context) {
    // If this isn't used with `new`, return that
    if (this.__proto__.constructor !== SJQ) {
        return new SJQ(selector, context);
    }

    // Set info
    this.SJQ_INFO = SJQ.info;

    var element;
    if (typeof selector == "string") {
        element = document.querySelectorAll(selector);
    }
    if (typeof selector == "object" && !isNode(selector)) {
        element = selector.objects;
        selector = selector.selector;
    }
    if (typeof selector == "object" && isNode(selector)) {
        element = selector;
        selector = "HTMLElement";
    }
    if (typeof selector == "undefined") {
        console.error('SJQ requires parameter SELECTOR');
        return SJQ;
    }

    this.selector = selector;
    this.context = context;
    this.objects = [];
    for (var i = 0; i < element.length; i++) {
        this.objects[i] = element[i];
    }
    if (this.objects.length == 0) {
        this.objects[0] = element;
    }
}

SJQ.fn = SJQ.prototype;
sjq.fn = SJQ.fn;
window.$ = window.sjq = sjq;
window.SJQ = SJQ;