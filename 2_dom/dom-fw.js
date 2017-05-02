var $ = function (str) {
    if (str == null) return {
        version: "0.1a",
        updated: "1 May 2017"
    };

    if (window == this) return new $(str); // if global

    if (str.nodeType) this.dom = [str];
    else if (str) this.dom = document.querySelectorAll(str);

    return this;
};

$.each = function (arr, func) {
    for (var i = 0; i < arr.length; i++)
        func(arr[i]);

    return arr;
};

$.get = function (val) {
    var res;

    if (typeof val === "function") res = val();
    else res = val;

    return [res, res != null];
};

$.prototype = {
    each: function (func) {
        $.each(this.dom, func);
        return this;
    },
    size: function () {
        return this.dom.length;
    },
    hasClass: function (c) {
        var name = " " + $.get(c)[0] + " ", i = 0; // against such-name

        for (; i < this.size(); i++) {
            if ((" " + this.dom[i].className + " ").indexOf(name) == -1)
                return false;
        }
        return true;
    },
    addClass: function (c) {
        var arr = $.get(c), val = arr[0], valid = arr[1], finalName;
        if(!valid || !val) return this;

        return this.each(function (item) {
            finalName = (item.className + " " + val).trim();
            item.className = finalName;
        });
    },
    removeClass: function (c) {
        var arr = $.get(c), val = arr[0], valid = arr[1], name;
        if(!valid || !val) return this;

        return this.each(function (item) {
            name = (item.className + " ").replace(val + " ", "").trim();
            item.className = name;
        });
    },
    toggleClass: function (c) {
        var val = $.get(c)[0];

        return this.each(function (item) {
            var current = $(item);
            if (current.hasClass(val)) current.removeClass(val);
            else current.addClass(val);
        });
    },
    on: function (event, func, captured) {
        if (event == null || func == null || typeof func !== "function") return this;
        captured = captured != null ? captured : false;

        return this.each(function (item) {
            if (item.addEventListener)
                item.addEventListener(event, func, captured);
            else if (item.attachEvent)  // IE8 & earlier support 4 the future support
                item.attachEvent("on" + event, func);

        });
    },
    off: function (event, func, captured) {
        if (event == null || func == null || typeof func !== "function") return this;
        captured = captured != null ? captured : false;

        return this.each(function (item) {
            if (item.removeEventListener)
                item.removeEventListener(event, func, captured);
            else if (item.detachEvent)  // IE8 & earlier support 4 the future support
                item.detachEvent("on" + event, func);

        });
    },
    hasAttr: function (attr) {
        var fAttr = $.get(attr)[0];

        for (var i = 0; i < this.size(); i++) {
            if (!this.dom[i].hasAttribute(fAttr))
                return false;
        }
        return true;
    },
    attr: function (attr, val) {
        var arr = $.get(val), fVal = arr[0], valid = arr[1], fAttr = $.get(attr)[0];

        if (valid) {
            return this.each(function (item) {
                item.setAttribute(fAttr, fVal);
            });
        }

        return this.dom[0].getAttribute(fAttr);
    },
    remAttr: function (attr) {
        var fAttr = $.get(attr)[0];

        return this.each(function (item) {
            if (item.hasAttribute(fAttr))
                item.removeAttribute(fAttr);
        });
    },
    val: function (val) {
        var arr = $.get(val), fVal = arr[0], valid = arr[1];

        if (valid) {
            return this.each(function (item) {
                if (item.value != null)
                    item.value = fVal;
            });
        }

        return this.dom[0].value;
    },
    html: function (str) {
        var arr = $.get(str), fVal = arr[0], valid = arr[1];

        if (valid) {
            return this.each(function (item) {
                item.innerHTML = fVal;
            });
        }

        return this.dom[0].innerHTML;
    },
    add: function (str) {
        var arr = $.get(str), fVal = arr[0], valid = arr[1];
        if(!valid || !fVal) return this;

        return this.each(function (item) {
            item.innerHTML += fVal;
        });
    },
    css: function (obj) {
        var arr = $.get(obj), fObj = arr[0], valid = arr[1];
        if(!valid) return this;

        return this.each(function (item) {
            var style = item.style;
            for (var prop in fObj) {
                if (fObj.hasOwnProperty(prop))
                    style[prop] = fObj[prop];
            }
        });
    },
    show: function () {
        return this.each(function (item) {
            if (item.style.display == "none")
                item.style.display = "block";
        });
    },
    hide: function () {
        return this.each(function (item) {
            if (item.style.display != "none")
                item.style.display = "none";
        });
    },
    toggle: function () {
        return this.each(function (item) {
            if (item.style.display != "none")
                item.style.display = "none";
            else
                item.style.display = "block";
        });
    },
    click: function (func) {
        return this.on("click", func);
    }
};