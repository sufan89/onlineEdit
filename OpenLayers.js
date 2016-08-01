var OpenLayers = {
	VERSION_NUMBER : "Release 2.12",
	singleFile : !0,
	_getScriptLocation : function () {
		for (var j = /(^|(.*?\/))(OpenLayers[^\/]*?\.js)(\?|$)/, i = document.getElementsByTagName("script"), h, g = "", l = 0, k = i.length; l < k; l++) {
			if (h = i[l].getAttribute("src")) {
				if (h = h.match(j)) {
					g = h[1];
					break
				}
			}
		}
		return function () {
			return g
		}
	}
	(),
	ImgPath : "",
	Class : function () {
		var h = arguments.length,
		g = arguments[0],
		f = arguments[h - 1],
		e = "function" == typeof f.initialize ? f.initialize : function () {
			g.prototype.initialize.apply(this, arguments)
		};
		1 < h ? (h = [e, g].concat(Array.prototype.slice.call(arguments).slice(1, h - 1), f), OpenLayers.inherit.apply(null, h)) : e.prototype = f;
		return e
	},
	inherit : function (i, h) {
		var g = function () {};
		g.prototype = h.prototype;
		i.prototype = new g;
		var f,
		j,
		g = 2;
		for (f = arguments.length; g < f; g++) {
			j = arguments[g],
			"function" === typeof j && (j = j.prototype),
			OpenLayers.Util.extend(i.prototype, j)
		}
	}
};
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.extend = function (h, g) {
	h = h || {};
	if (g) {
		for (var f in g) {
			var e = g[f];
			void 0 !== e && (h[f] = e)
		}
		!("function" == typeof window.Event && g instanceof window.Event) && (g.hasOwnProperty && g.hasOwnProperty("toString")) && (h.toString = g.toString)
	}
	return h
};
OpenLayers.String = {
	startsWith : function (d, c) {
		return 0 == d.indexOf(c)
	},
	contains : function (d, c) {
		return -1 != d.indexOf(c)
	},
	trim : function (b) {
		return b.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
	},
	camelize : function (i) {
		i = i.split("-");
		for (var h = i[0], g = 1, f = i.length; g < f; g++) {
			var j = i[g],
			h = h + (j.charAt(0).toUpperCase() + j.substring(1))
		}
		return h
	},
	format : function (d, f, e) {
		f || (f = window);
		return d.replace(OpenLayers.String.tokenRegEx, function (j, i) {
			for (var c, b = i.split(/\.+/), a = 0; a < b.length; a++) {
				0 == a && (c = f),
				c = c[b[a]]
			}
			"function" == typeof c && (c = e ? c.apply(null, e) : c());
			return "undefined" == typeof c ? "undefined" : c
		})
	},
	tokenRegEx : /\$\{([\w.]+?)\}/g,
	numberRegEx : /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
	isNumeric : function (b) {
		return OpenLayers.String.numberRegEx.test(b)
	},
	numericIf : function (b) {
		return OpenLayers.String.isNumeric(b) ? parseFloat(b) : b
	}
};
OpenLayers.Number = {
	decimalSeparator : ".",
	thousandsSeparator : ",",
	limitSigDigs : function (d, f) {
		var e = 0;
		0 < f && (e = parseFloat(d.toPrecision(f)));
		return e
	},
	format : function (j, i, h, g) {
		i = "undefined" != typeof i ? i : 0;
		h = "undefined" != typeof h ? h : OpenLayers.Number.thousandsSeparator;
		g = "undefined" != typeof g ? g : OpenLayers.Number.decimalSeparator;
		null != i && (j = parseFloat(j.toFixed(i)));
		var l = j.toString().split(".");
		1 == l.length && null == i && (i = 0);
		j = l[0];
		if (h) {
			for (var k = /(-?[0-9]+)([0-9]{3})/; k.test(j); ) {
				j = j.replace(k, "$1" + h + "$2")
			}
		}
		0 == i ? i = j : (h = 1 < l.length ? l[1] : "0", null != i && (h += Array(i - h.length + 1).join("0")), i = j + g + h);
		return i
	}
};
OpenLayers.Function = {
	bind : function (d, f) {
		var e = Array.prototype.slice.apply(arguments, [2]);
		return function () {
			var a = e.concat(Array.prototype.slice.apply(arguments, [0]));
			return d.apply(f, a)
		}
	},
	bindAsEventListener : function (d, c) {
		return function (a) {
			return d.call(c, a || window.event)
		}
	},
	False : function () {
		return !1
	},
	True : function () {
		return !0
	},
	Void : function () {}

};
OpenLayers.Array = {
	filter : function (l, k, j) {
		var i = [];
		if (Array.prototype.filter) {
			i = l.filter(k, j)
		} else {
			var h = l.length;
			if ("function" != typeof k) {
				throw new TypeError
			}
			for (var n = 0; n < h; n++) {
				if (n in l) {
					var m = l[n];
					k.call(j, m, n, l) && i.push(m)
				}
			}
		}
		return i
	}
};
OpenLayers.Bounds = OpenLayers.Class({
		left : null,
		bottom : null,
		right : null,
		top : null,
		centerLonLat : null,
		initialize : function (h, g, f, e) {
			OpenLayers.Util.isArray(h) && (e = h[3], f = h[2], g = h[1], h = h[0]);
			null != h && (this.left = OpenLayers.Util.toFloat(h));
			null != g && (this.bottom = OpenLayers.Util.toFloat(g));
			null != f && (this.right = OpenLayers.Util.toFloat(f));
			null != e && (this.top = OpenLayers.Util.toFloat(e))
		},
		clone : function () {
			return new OpenLayers.Bounds(this.left, this.bottom, this.right, this.top)
		},
		equals : function (d) {
			var c = !1;
			null != d && (c = this.left == d.left && this.right == d.right && this.top == d.top && this.bottom == d.bottom);
			return c
		},
		toString : function () {
			return [this.left, this.bottom, this.right, this.top].join()
		},
		toArray : function (b) {
			return !0 === b ? [this.bottom, this.left, this.top, this.right] : [this.left, this.bottom, this.right, this.top]
		},
		toBBOX : function (j, i) {
			null == j && (j = 6);
			var h = Math.pow(10, j),
			g = Math.round(this.left * h) / h,
			l = Math.round(this.bottom * h) / h,
			k = Math.round(this.right * h) / h,
			h = Math.round(this.top * h) / h;
			return !0 === i ? l + "," + g + "," + h + "," + k : g + "," + l + "," + k + "," + h
		},
		toGeometry : function () {
			return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left, this.bottom), new OpenLayers.Geometry.Point(this.right, this.bottom), new OpenLayers.Geometry.Point(this.right, this.top), new OpenLayers.Geometry.Point(this.left, this.top)])])
		},
		getWidth : function () {
			return this.right - this.left
		},
		getHeight : function () {
			return this.top - this.bottom
		},
		getSize : function () {
			return new OpenLayers.Size(this.getWidth(), this.getHeight())
		},
		getCenterPixel : function () {
			return new OpenLayers.Pixel((this.left + this.right) / 2, (this.bottom + this.top) / 2)
		},
		getCenterLonLat : function () {
			this.centerLonLat || (this.centerLonLat = new OpenLayers.LonLat((this.left + this.right) / 2, (this.bottom + this.top) / 2));
			return this.centerLonLat
		},
		scale : function (h, g) {
			null == g && (g = this.getCenterLonLat());
			var f,
			e;
			"OpenLayers.LonLat" == g.CLASS_NAME ? (f = g.lon, e = g.lat) : (f = g.x, e = g.y);
			return new OpenLayers.Bounds((this.left - f) * h + f, (this.bottom - e) * h + e, (this.right - f) * h + f, (this.top - e) * h + e)
		},
		add : function (d, c) {
			if (null == d || null == c) {
				throw new TypeError("Bounds.add cannot receive null values")
			}
			return new OpenLayers.Bounds(this.left + d, this.bottom + c, this.right + d, this.top + c)
		},
		extend : function (d) {
			var c = null;
			if (d) {
				switch (d.CLASS_NAME) {
				case "OpenLayers.LonLat":
					c = new OpenLayers.Bounds(d.lon, d.lat, d.lon, d.lat);
					break;
				case "OpenLayers.Geometry.Point":
					c = new OpenLayers.Bounds(d.x, d.y, d.x, d.y);
					break;
				case "OpenLayers.Bounds":
					c = d
				}
				if (c) {
					this.centerLonLat = null;
					if (null == this.left || c.left < this.left) {
						this.left = c.left
					}
					if (null == this.bottom || c.bottom < this.bottom) {
						this.bottom = c.bottom
					}
					if (null == this.right || c.right > this.right) {
						this.right = c.right
					}
					if (null == this.top || c.top > this.top) {
						this.top = c.top
					}
				}
			}
		},
		containsLonLat : function (h, g) {
			"boolean" === typeof g && (g = {
					inclusive : g
				});
			g = g || {};
			var f = this.contains(h.lon, h.lat, g.inclusive),
			e = g.worldBounds;
			e && !f && (f = e.getWidth(), e = Math.round((h.lon - (e.left + e.right) / 2) / f), f = this.containsLonLat({
						lon : h.lon - e * f,
						lat : h.lat
					}, {
						inclusive : g.inclusive
					}));
			return f
		},
		containsPixel : function (d, c) {
			return this.contains(d.x, d.y, c)
		},
		contains : function (h, g, f) {
			null == f && (f = !0);
			if (null == h || null == g) {
				return !1
			}
			h = OpenLayers.Util.toFloat(h);
			g = OpenLayers.Util.toFloat(g);
			var e = !1;
			return e = f ? h >= this.left && h <= this.right && g >= this.bottom && g <= this.top : h > this.left && h < this.right && g > this.bottom && g < this.top
		},
		intersectsBounds : function (l, k) {
			"boolean" === typeof k && (k = {
					inclusive : k
				});
			k = k || {};
			if (k.worldBounds) {
				var j = this.wrapDateLine(k.worldBounds);
				l = l.wrapDateLine(k.worldBounds)
			} else {
				j = this
			}
			null == k.inclusive && (k.inclusive = !0);
			var i = !1,
			h = j.left == l.right || j.right == l.left || j.top == l.bottom || j.bottom == l.top;
			if (k.inclusive || !h) {
				var i = l.top >= j.bottom && l.top <= j.top || j.top > l.bottom && j.top < l.top,
				h = l.left >= j.left && l.left <= j.right || j.left >= l.left && j.left <= l.right,
				n = l.right >= j.left && l.right <= j.right || j.right >= l.left && j.right <= l.right,
				i = (l.bottom >= j.bottom && l.bottom <= j.top || j.bottom >= l.bottom && j.bottom <= l.top || i) && (h || n)
			}
			if (k.worldBounds && !i) {
				var m = k.worldBounds,
				h = m.getWidth(),
				n = !m.containsBounds(j),
				m = !m.containsBounds(l);
				n && !m ? (l = l.add(-h, 0), i = j.intersectsBounds(l, {
							inclusive : k.inclusive
						})) : m && !n && (j = j.add(-h, 0), i = l.intersectsBounds(j, {
							inclusive : k.inclusive
						}))
			}
			return i
		},
		containsBounds : function (j, i, h) {
			null == i && (i = !1);
			null == h && (h = !0);
			var g = this.contains(j.left, j.bottom, h),
			l = this.contains(j.right, j.bottom, h),
			k = this.contains(j.left, j.top, h);
			j = this.contains(j.right, j.top, h);
			return i ? g || l || k || j : g && l && k && j
		},
		determineQuadrant : function (d) {
			var f = "",
			e = this.getCenterLonLat(),
			f = f + (d.lat < e.lat ? "b" : "t");
			return f += d.lon < e.lon ? "l" : "r"
		},
		transform : function (j, i) {
			this.centerLonLat = null;
			var h = OpenLayers.Projection.transform({
					x : this.left,
					y : this.bottom
				}, j, i),
			g = OpenLayers.Projection.transform({
					x : this.right,
					y : this.bottom
				}, j, i),
			l = OpenLayers.Projection.transform({
					x : this.left,
					y : this.top
				}, j, i),
			k = OpenLayers.Projection.transform({
					x : this.right,
					y : this.top
				}, j, i);
			this.left = Math.min(h.x, l.x);
			this.bottom = Math.min(h.y, g.y);
			this.right = Math.max(g.x, k.x);
			this.top = Math.max(l.y, k.y);
			return this
		},
		wrapDateLine : function (j, i) {
			i = i || {};
			var h = i.leftTolerance || 0,
			g = i.rightTolerance || 0,
			l = this.clone();
			if (j) {
				for (var k = j.getWidth(); l.left < j.left && l.right - g <= j.left; ) {
					l = l.add(k, 0)
				}
				for (; l.left + h >= j.right && l.right > j.right; ) {
					l = l.add(-k, 0)
				}
				h = l.left + h;
				h < j.right && (h > j.left && l.right - g > j.right) && (l = l.add(-k, 0))
			}
			return l
		},
		CLASS_NAME : "OpenLayers.Bounds"
	});
OpenLayers.Bounds.fromString = function (d, f) {
	var e = d.split(",");
	return OpenLayers.Bounds.fromArray(e, f)
};
OpenLayers.Bounds.fromArray = function (d, c) {
	return !0 === c ? new OpenLayers.Bounds(d[1], d[0], d[3], d[2]) : new OpenLayers.Bounds(d[0], d[1], d[2], d[3])
};
OpenLayers.Bounds.fromSize = function (b) {
	return new OpenLayers.Bounds(0, b.h, b.w, 0)
};
OpenLayers.Bounds.oppositeQuadrant = function (d) {
	var c;
	c = "" + ("t" == d.charAt(0) ? "b" : "t");
	return c += "l" == d.charAt(1) ? "r" : "l"
};
OpenLayers.Element = {
	visible : function (b) {
		return "none" != OpenLayers.Util.getElement(b).style.display
	},
	toggle : function () {
		for (var h = 0, g = arguments.length; h < g; h++) {
			var f = OpenLayers.Util.getElement(arguments[h]),
			e = OpenLayers.Element.visible(f) ? "none" : "";
			f.style.display = e
		}
	},
	remove : function (b) {
		b = OpenLayers.Util.getElement(b);
		b.parentNode.removeChild(b)
	},
	getHeight : function (b) {
		b = OpenLayers.Util.getElement(b);
		return b.offsetHeight
	},
	hasClass : function (d, f) {
		var e = d.className;
		return !!e && RegExp("(^|\\s)" + f + "(\\s|$)").test(e)
	},
	addClass : function (d, c) {
		OpenLayers.Element.hasClass(d, c) || (d.className += (d.className ? " " : "") + c);
		return d
	},
	removeClass : function (d, f) {
		var e = d.className;
		e && (d.className = OpenLayers.String.trim(e.replace(RegExp("(^|\\s+)" + f + "(\\s+|$)"), " ")));
		return d
	},
	toggleClass : function (d, c) {
		OpenLayers.Element.hasClass(d, c) ? OpenLayers.Element.removeClass(d, c) : OpenLayers.Element.addClass(d, c);
		return d
	},
	getStyle : function (h, g) {
		h = OpenLayers.Util.getElement(h);
		var f = null;
		if (h && h.style) {
			f = h.style[OpenLayers.String.camelize(g)];
			f || (document.defaultView && document.defaultView.getComputedStyle ? f = (f = document.defaultView.getComputedStyle(h, null)) ? f.getPropertyValue(g) : null : h.currentStyle && (f = h.currentStyle[OpenLayers.String.camelize(g)]));
			var e = ["left", "top", "right", "bottom"];
			window.opera && (-1 != OpenLayers.Util.indexOf(e, g) && "static" == OpenLayers.Element.getStyle(h, "position")) && (f = "auto")
		}
		return "auto" == f ? null : f
	}
};
OpenLayers.LonLat = OpenLayers.Class({
		lon : 0,
		lat : 0,
		initialize : function (d, c) {
			OpenLayers.Util.isArray(d) && (c = d[1], d = d[0]);
			this.lon = OpenLayers.Util.toFloat(d);
			this.lat = OpenLayers.Util.toFloat(c)
		},
		toString : function () {
			return "lon=" + this.lon + ",lat=" + this.lat
		},
		toShortString : function () {
			return this.lon + ", " + this.lat
		},
		clone : function () {
			return new OpenLayers.LonLat(this.lon, this.lat)
		},
		add : function (d, c) {
			if (null == d || null == c) {
				throw new TypeError("LonLat.add cannot receive null values")
			}
			return new OpenLayers.LonLat(this.lon + OpenLayers.Util.toFloat(d), this.lat + OpenLayers.Util.toFloat(c))
		},
		equals : function (d) {
			var c = !1;
			null != d && (c = this.lon == d.lon && this.lat == d.lat || isNaN(this.lon) && isNaN(this.lat) && isNaN(d.lon) && isNaN(d.lat));
			return c
		},
		transform : function (d, f) {
			var e = OpenLayers.Projection.transform({
					x : this.lon,
					y : this.lat
				}, d, f);
			this.lon = e.x;
			this.lat = e.y;
			return this
		},
		wrapDateLine : function (d) {
			var c = this.clone();
			if (d) {
				for (; c.lon < d.left; ) {
					c.lon += d.getWidth()
				}
				for (; c.lon > d.right; ) {
					c.lon -= d.getWidth()
				}
			}
			return c
		},
		CLASS_NAME : "OpenLayers.LonLat"
	});
OpenLayers.LonLat.fromString = function (b) {
	b = b.split(",");
	return new OpenLayers.LonLat(b[0], b[1])
};
OpenLayers.LonLat.fromArray = function (d) {
	var c = OpenLayers.Util.isArray(d);
	return new OpenLayers.LonLat(c && d[0], c && d[1])
};
OpenLayers.Pixel = OpenLayers.Class({
		x : 0,
		y : 0,
		initialize : function (d, c) {
			this.x = parseFloat(d);
			this.y = parseFloat(c)
		},
		toString : function () {
			return "x=" + this.x + ",y=" + this.y
		},
		clone : function () {
			return new OpenLayers.Pixel(this.x, this.y)
		},
		equals : function (d) {
			var c = !1;
			null != d && (c = this.x == d.x && this.y == d.y || isNaN(this.x) && isNaN(this.y) && isNaN(d.x) && isNaN(d.y));
			return c
		},
		distanceTo : function (b) {
			return Math.sqrt(Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2))
		},
		add : function (d, c) {
			if (null == d || null == c) {
				throw new TypeError("Pixel.add cannot receive null values")
			}
			return new OpenLayers.Pixel(this.x + d, this.y + c)
		},
		offset : function (d) {
			var c = this.clone();
			d && (c = this.add(d.x, d.y));
			return c
		},
		CLASS_NAME : "OpenLayers.Pixel"
	});
OpenLayers.Size = OpenLayers.Class({
		w : 0,
		h : 0,
		initialize : function (d, c) {
			this.w = parseFloat(d);
			this.h = parseFloat(c)
		},
		toString : function () {
			return "w=" + this.w + ",h=" + this.h
		},
		clone : function () {
			return new OpenLayers.Size(this.w, this.h)
		},
		equals : function (d) {
			var c = !1;
			null != d && (c = this.w == d.w && this.h == d.h || isNaN(this.w) && isNaN(this.h) && isNaN(d.w) && isNaN(d.h));
			return c
		},
		CLASS_NAME : "OpenLayers.Size"
	});
OpenLayers.Console = {
	log : function () {},
	debug : function () {},
	info : function () {},
	warn : function () {},
	error : function () {},
	userError : function (b) {
		alert(b)
	},
	assert : function () {},
	dir : function () {},
	dirxml : function () {},
	trace : function () {},
	group : function () {},
	groupEnd : function () {},
	time : function () {},
	timeEnd : function () {},
	profile : function () {},
	profileEnd : function () {},
	count : function () {},
	CLASS_NAME : "OpenLayers.Console"
};
(function () {
	for (var d = document.getElementsByTagName("script"), f = 0, e = d.length; f < e; ++f) {
		if (-1 != d[f].src.indexOf("firebug.js") && console) {
			OpenLayers.Util.extend(OpenLayers.Console, console);
			break
		}
	}
})();
OpenLayers.Lang = {
	code : null,
	defaultCode : "en",
	getCode : function () {
		OpenLayers.Lang.code || OpenLayers.Lang.setCode();
		return OpenLayers.Lang.code
	},
	setCode : function (d) {
		var f;
		d || (d = "msie" == OpenLayers.BROWSER_NAME ? navigator.userLanguage : navigator.language);
		d = d.split("-");
		d[0] = d[0].toLowerCase();
		"object" == typeof OpenLayers.Lang[d[0]] && (f = d[0]);
		if (d[1]) {
			var e = d[0] + "-" + d[1].toUpperCase();
			"object" == typeof OpenLayers.Lang[e] && (f = e)
		}
		f || (OpenLayers.Console.warn("Failed to find OpenLayers.Lang." + d.join("-") + " dictionary, falling back to default language"), f = OpenLayers.Lang.defaultCode);
		OpenLayers.Lang.code = f
	},
	translate : function (d, f) {
		var e = OpenLayers.Lang[OpenLayers.Lang.getCode()];
		(e = e && e[d]) || (e = d);
		f && (e = OpenLayers.String.format(e, f));
		return e
	}
};
OpenLayers.i18n = OpenLayers.Lang.translate;
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.getElement = function () {
	for (var h = [], g = 0, f = arguments.length; g < f; g++) {
		var e = arguments[g];
		"string" == typeof e && (e = document.getElementById(e));
		if (1 == arguments.length) {
			return e
		}
		h.push(e)
	}
	return h
};
OpenLayers.Util.isElement = function (b) {
	return !!(b && 1 === b.nodeType)
};
OpenLayers.Util.isArray = function (b) {
	return "[object Array]" === Object.prototype.toString.call(b)
};
"undefined" === typeof window.$ && (window.$ = OpenLayers.Util.getElement);
OpenLayers.Util.removeItem = function (d, f) {
	for (var e = d.length - 1; 0 <= e; e--) {
		d[e] == f && d.splice(e, 1)
	}
	return d
};
OpenLayers.Util.indexOf = function (h, g) {
	if ("function" == typeof h.indexOf) {
		return h.indexOf(g)
	}
	for (var f = 0, e = h.length; f < e; f++) {
		if (h[f] == g) {
			return f
		}
	}
	return -1
};
OpenLayers.Util.modifyDOMElement = function (o, n, m, l, k, j, i, p) {
	n && (o.id = n);
	m && (o.style.left = m.x + "px", o.style.top = m.y + "px");
	l && (o.style.width = l.w + "px", o.style.height = l.h + "px");
	k && (o.style.position = k);
	j && (o.style.border = j);
	i && (o.style.overflow = i);
	0 <= parseFloat(p) && 1 > parseFloat(p) ? (o.style.filter = "alpha(opacity=" + 100 * p + ")", o.style.opacity = p) : 1 == parseFloat(p) && (o.style.filter = "", o.style.opacity = "")
};
OpenLayers.Util.createDiv = function (r, q, p, o, n, m, l, k) {
	var i = document.createElement("div");
	o && (i.style.backgroundImage = "url(" + o + ")");
	r || (r = OpenLayers.Util.createUniqueID("OpenLayersDiv"));
	n || (n = "absolute");
	OpenLayers.Util.modifyDOMElement(i, r, q, p, n, m, l, k);
	return i
};
OpenLayers.Util.createImage = function (r, q, p, o, n, m, l, k) {
	var i = document.createElement("img");
	r || (r = OpenLayers.Util.createUniqueID("OpenLayersDiv"));
	n || (n = "relative");
	OpenLayers.Util.modifyDOMElement(i, r, q, p, n, m, null, l);
	k && (i.style.display = "none", q = function () {
		i.style.display = "";
		OpenLayers.Event.stopObservingElement(i)
	}, OpenLayers.Event.observe(i, "load", q), OpenLayers.Event.observe(i, "error", q));
	i.style.alt = r;
	i.galleryImg = "no";
	o && (i.src = o);
	return i
};
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;
OpenLayers.Util.alphaHackNeeded = null;
OpenLayers.Util.alphaHack = function () {
	if (null == OpenLayers.Util.alphaHackNeeded) {
		var d = navigator.appVersion.split("MSIE"),
		d = parseFloat(d[1]),
		f = !1;
		try {
			f = !!document.body.filters
		} catch (e) {}

		OpenLayers.Util.alphaHackNeeded = f && 5.5 <= d && 7 > d
	}
	return OpenLayers.Util.alphaHackNeeded
};
OpenLayers.Util.modifyAlphaImageDiv = function (r, q, p, o, n, m, l, k, i) {
	OpenLayers.Util.modifyDOMElement(r, q, p, o, m, null, null, i);
	q = r.childNodes[0];
	n && (q.src = n);
	OpenLayers.Util.modifyDOMElement(q, r.id + "_innerImage", null, o, "relative", l);
	OpenLayers.Util.alphaHack() && ("none" != r.style.display && (r.style.display = "inline-block"), null == k && (k = "scale"), r.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + q.src + "', sizingMethod='" + k + "')", 0 <= parseFloat(r.style.opacity) && 1 > parseFloat(r.style.opacity) && (r.style.filter += " alpha(opacity=" + 100 * r.style.opacity + ")"), q.style.filter = "alpha(opacity=0)")
};
OpenLayers.Util.createAlphaImageDiv = function (l, i, t, s, r, q, p, o, n) {
	var m = OpenLayers.Util.createDiv();
	n = OpenLayers.Util.createImage(null, null, null, null, null, null, null, n);
	n.className = "olAlphaImg";
	m.appendChild(n);
	OpenLayers.Util.modifyAlphaImageDiv(m, l, i, t, s, r, q, p, o);
	return m
};
OpenLayers.Util.upperCaseObject = function (d) {
	var f = {},
	e;
	for (e in d) {
		f[e.toUpperCase()] = d[e]
	}
	return f
};
OpenLayers.Util.applyDefaults = function (h, g) {
	h = h || {};
	var f = "function" == typeof window.Event && g instanceof window.Event,
	e;
	for (e in g) {
		if (void 0 === h[e] || !f && g.hasOwnProperty && g.hasOwnProperty(e) && !h.hasOwnProperty(e)) {
			h[e] = g[e]
		}
	}
	!f && (g && g.hasOwnProperty && g.hasOwnProperty("toString") && !h.hasOwnProperty("toString")) && (h.toString = g.toString);
	return h
};
OpenLayers.Util.getParameterString = function (o) {
	var n = [],
	m;
	for (m in o) {
		var l = o[m];
		if (null != l && "function" != typeof l) {
			if ("object" == typeof l && l.constructor == Array) {
				for (var k = [], j, i = 0, p = l.length; i < p; i++) {
					j = l[i],
					k.push(encodeURIComponent(null === j || void 0 === j ? "" : j))
				}
				l = k.join(",")
			} else {
				l = encodeURIComponent(l)
			}
			n.push(encodeURIComponent(m) + "=" + l)
		}
	}
	return n.join("&")
};
OpenLayers.Util.urlAppend = function (h, g) {
	var f = h;
	if (g) {
		var e = (h + " ").split(/[?&]/),
		f = f + (" " === e.pop() ? g : e.length ? "&" + g : "?" + g)
	}
	return f
};
OpenLayers.Util.getImagesLocation = function () {
	return OpenLayers.ImgPath || OpenLayers._getScriptLocation() + "img/"
};
OpenLayers.Util.getImageLocation = function (b) {
	return OpenLayers.Util.getImagesLocation() + b
};
OpenLayers.Util.Try = function () {
	for (var i = null, h = 0, g = arguments.length; h < g; h++) {
		var f = arguments[h];
		try {
			i = f();
			break
		} catch (j) {}

	}
	return i
};
OpenLayers.Util.getXmlNodeValue = function (d) {
	var c = null;
	OpenLayers.Util.Try(function () {
		c = d.text;
		c || (c = d.textContent);
		c || (c = d.firstChild.nodeValue)
	}, function () {
		c = d.textContent
	});
	return c
};
OpenLayers.Util.mouseLeft = function (d, f) {
	for (var e = d.relatedTarget ? d.relatedTarget : d.toElement; e != f && null != e; ) {
		e = e.parentNode
	}
	return e != f
};
OpenLayers.Util.DEFAULT_PRECISION = 14;
OpenLayers.Util.toFloat = function (d, c) {
	null == c && (c = OpenLayers.Util.DEFAULT_PRECISION);
	"number" !== typeof d && (d = parseFloat(d));
	return 0 === c ? d : parseFloat(d.toPrecision(c))
};
OpenLayers.Util.rad = function (b) {
	return b * Math.PI / 180
};
OpenLayers.Util.deg = function (b) {
	return 180 * b / Math.PI
};
OpenLayers.Util.VincentyConstants = {
	a : 6378137,
	b : 6356752.3142,
	f : 1 / 298.257223563
};
OpenLayers.Util.distVincenty = function (N, M) {
	for (var L = OpenLayers.Util.VincentyConstants, K = L.a, I = L.b, L = L.f, G = OpenLayers.Util.rad(M.lon - N.lon), D = Math.atan((1 - L) * Math.tan(OpenLayers.Util.rad(N.lat))), C = Math.atan((1 - L) * Math.tan(OpenLayers.Util.rad(M.lat))), B = Math.sin(D), D = Math.cos(D), A = Math.sin(C), C = Math.cos(C), z = G, y = 2 * Math.PI, x = 20; 1e-12 < Math.abs(z - y) && 0 < --x; ) {
		var w = Math.sin(z),
		J = Math.cos(z),
		H = Math.sqrt(C * w * C * w + (D * A - B * C * J) * (D * A - B * C * J));
		if (0 == H) {
			return 0
		}
		var J = B * A + D * C * J,
		F = Math.atan2(H, J),
		E = Math.asin(D * C * w / H),
		o = Math.cos(E) * Math.cos(E),
		w = J - 2 * B * A / o,
		i = L / 16 * o * (4 + L * (4 - 3 * o)),
		y = z,
		z = G + (1 - i) * L * Math.sin(E) * (F + i * H * (w + i * J * (-1 + 2 * w * w)))
	}
	if (0 == x) {
		return NaN
	}
	K = o * (K * K - I * I) / (I * I);
	L = K / 1024 * (256 + K * (-128 + K * (74 - 47 * K)));
	return (I * (1 + K / 16384 * (4096 + K * (-768 + K * (320 - 175 * K)))) * (F - L * H * (w + L / 4 * (J * (-1 + 2 * w * w) - L / 6 * w * (-3 + 4 * H * H) * (-3 + 4 * w * w))))).toFixed(3) / 1000
};
OpenLayers.Util.destinationVincenty = function (N, M, L) {
	var K = OpenLayers.Util,
	I = K.VincentyConstants,
	G = I.a,
	D = I.b,
	C = I.f,
	I = N.lon;
	N = N.lat;
	var B = K.rad(M);
	M = Math.sin(B);
	B = Math.cos(B);
	N = (1 - C) * Math.tan(K.rad(N));
	var A = 1 / Math.sqrt(1 + N * N),
	z = N * A,
	y = Math.atan2(N, B);
	N = A * M;
	for (var x = 1 - N * N, G = x * (G * G - D * D) / (D * D), w = 1 + G / 16384 * (4096 + G * (-768 + G * (320 - 175 * G))), J = G / 1024 * (256 + G * (-128 + G * (74 - 47 * G))), G = L / (D * w), H = 2 * Math.PI; 1e-12 < Math.abs(G - H); ) {
		var F = Math.cos(2 * y + G),
		E = Math.sin(G),
		o = Math.cos(G),
		i = J * E * (F + J / 4 * (o * (-1 + 2 * F * F) - J / 6 * F * (-3 + 4 * E * E) * (-3 + 4 * F * F))),
		H = G,
		G = L / (D * w) + i
	}
	L = z * E - A * o * B;
	D = Math.atan2(z * o + A * E * B, (1 - C) * Math.sqrt(N * N + L * L));
	M = Math.atan2(E * M, A * o - z * E * B);
	B = C / 16 * x * (4 + C * (4 - 3 * x));
	F = M - (1 - B) * C * N * (G + B * E * (F + B * o * (-1 + 2 * F * F)));
	Math.atan2(N, -L);
	return new OpenLayers.LonLat(I + K.deg(F), K.deg(D))
};
OpenLayers.Util.getParameters = function (o) {
	o = null === o || void 0 === o ? window.location.href : o;
	var n = "";
	if (OpenLayers.String.contains(o, "?")) {
		var n = o.indexOf("?") + 1,
		m = OpenLayers.String.contains(o, "#") ? o.indexOf("#") : o.length,
		n = o.substring(n, m)
	}
	o = {};
	for (var n = n.split(/[&;]/), m = 0, l = n.length; m < l; ++m) {
		var k = n[m].split("=");
		if (k[0]) {
			var j = k[0];
			try {
				j = decodeURIComponent(j)
			} catch (i) {
				j = unescape(j)
			}
			k = (k[1] || "").replace(/\+/g, " ");
			try {
				k = decodeURIComponent(k)
			} catch (p) {
				k = unescape(k)
			}
			k = k.split(",");
			1 == k.length && (k = k[0]);
			o[j] = k
		}
	}
	return o
};
OpenLayers.Util.lastSeqID = 0;
OpenLayers.Util.createUniqueID = function (b) {
	null == b && (b = "id_");
	OpenLayers.Util.lastSeqID += 1;
	return b + OpenLayers.Util.lastSeqID
};
OpenLayers.INCHES_PER_UNIT = {
	inches : 1,
	ft : 12,
	mi : 63360,
	m : 39.3701,
	km : 39370.1,
	dd : 4374754,
	yd : 36
};
OpenLayers.INCHES_PER_UNIT["in"] = OpenLayers.INCHES_PER_UNIT.inches;
OpenLayers.INCHES_PER_UNIT.degrees = OpenLayers.INCHES_PER_UNIT.dd;
OpenLayers.INCHES_PER_UNIT.nmi = 1852 * OpenLayers.INCHES_PER_UNIT.m;
OpenLayers.METERS_PER_INCH = 0.0254000508001016;
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
	Inch : OpenLayers.INCHES_PER_UNIT.inches,
	Meter : 1 / OpenLayers.METERS_PER_INCH,
	Foot : 0.3048006096012192 / OpenLayers.METERS_PER_INCH,
	IFoot : 0.3048 / OpenLayers.METERS_PER_INCH,
	ClarkeFoot : 0.3047972651151 / OpenLayers.METERS_PER_INCH,
	SearsFoot : 0.30479947153867626 / OpenLayers.METERS_PER_INCH,
	GoldCoastFoot : 0.3047997101815088 / OpenLayers.METERS_PER_INCH,
	IInch : 0.0254 / OpenLayers.METERS_PER_INCH,
	MicroInch : 0.0000254 / OpenLayers.METERS_PER_INCH,
	Mil : 2.54e-8 / OpenLayers.METERS_PER_INCH,
	Centimeter : 0.01 / OpenLayers.METERS_PER_INCH,
	Kilometer : 1000 / OpenLayers.METERS_PER_INCH,
	Yard : 0.9144018288036576 / OpenLayers.METERS_PER_INCH,
	SearsYard : 0.914398414616029 / OpenLayers.METERS_PER_INCH,
	IndianYard : 0.9143985307444408 / OpenLayers.METERS_PER_INCH,
	IndianYd37 : 0.91439523 / OpenLayers.METERS_PER_INCH,
	IndianYd62 : 0.9143988 / OpenLayers.METERS_PER_INCH,
	IndianYd75 : 0.9143985 / OpenLayers.METERS_PER_INCH,
	IndianFoot : 0.30479951 / OpenLayers.METERS_PER_INCH,
	IndianFt37 : 0.30479841 / OpenLayers.METERS_PER_INCH,
	IndianFt62 : 0.3047996 / OpenLayers.METERS_PER_INCH,
	IndianFt75 : 0.3047995 / OpenLayers.METERS_PER_INCH,
	Mile : 1609.3472186944373 / OpenLayers.METERS_PER_INCH,
	IYard : 0.9144 / OpenLayers.METERS_PER_INCH,
	IMile : 1609.344 / OpenLayers.METERS_PER_INCH,
	NautM : 1852 / OpenLayers.METERS_PER_INCH,
	"Lat-66" : 110943.31648893273 / OpenLayers.METERS_PER_INCH,
	"Lat-83" : 110946.25736872235 / OpenLayers.METERS_PER_INCH,
	Decimeter : 0.1 / OpenLayers.METERS_PER_INCH,
	Millimeter : 0.001 / OpenLayers.METERS_PER_INCH,
	Dekameter : 10 / OpenLayers.METERS_PER_INCH,
	Decameter : 10 / OpenLayers.METERS_PER_INCH,
	Hectometer : 100 / OpenLayers.METERS_PER_INCH,
	GermanMeter : 1.0000135965 / OpenLayers.METERS_PER_INCH,
	CaGrid : 0.999738 / OpenLayers.METERS_PER_INCH,
	ClarkeChain : 20.1166194976 / OpenLayers.METERS_PER_INCH,
	GunterChain : 20.11684023368047 / OpenLayers.METERS_PER_INCH,
	BenoitChain : 20.116782494375872 / OpenLayers.METERS_PER_INCH,
	SearsChain : 20.11676512155 / OpenLayers.METERS_PER_INCH,
	ClarkeLink : 0.201166194976 / OpenLayers.METERS_PER_INCH,
	GunterLink : 0.2011684023368047 / OpenLayers.METERS_PER_INCH,
	BenoitLink : 0.20116782494375873 / OpenLayers.METERS_PER_INCH,
	SearsLink : 0.2011676512155 / OpenLayers.METERS_PER_INCH,
	Rod : 5.02921005842012 / OpenLayers.METERS_PER_INCH,
	IntnlChain : 20.1168 / OpenLayers.METERS_PER_INCH,
	IntnlLink : 0.201168 / OpenLayers.METERS_PER_INCH,
	Perch : 5.02921005842012 / OpenLayers.METERS_PER_INCH,
	Pole : 5.02921005842012 / OpenLayers.METERS_PER_INCH,
	Furlong : 201.1684023368046 / OpenLayers.METERS_PER_INCH,
	Rood : 3.778266898 / OpenLayers.METERS_PER_INCH,
	CapeFoot : 0.3047972615 / OpenLayers.METERS_PER_INCH,
	Brealey : 375 / OpenLayers.METERS_PER_INCH,
	ModAmFt : 0.304812252984506 / OpenLayers.METERS_PER_INCH,
	Fathom : 1.8288 / OpenLayers.METERS_PER_INCH,
	"NautM-UK" : 1853.184 / OpenLayers.METERS_PER_INCH,
	"50kilometers" : 50000 / OpenLayers.METERS_PER_INCH,
	"150kilometers" : 150000 / OpenLayers.METERS_PER_INCH
});
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
	mm : OpenLayers.INCHES_PER_UNIT.Meter / 1000,
	cm : OpenLayers.INCHES_PER_UNIT.Meter / 100,
	dm : 100 * OpenLayers.INCHES_PER_UNIT.Meter,
	km : 1000 * OpenLayers.INCHES_PER_UNIT.Meter,
	kmi : OpenLayers.INCHES_PER_UNIT.nmi,
	fath : OpenLayers.INCHES_PER_UNIT.Fathom,
	ch : OpenLayers.INCHES_PER_UNIT.IntnlChain,
	link : OpenLayers.INCHES_PER_UNIT.IntnlLink,
	"us-in" : OpenLayers.INCHES_PER_UNIT.inches,
	"us-ft" : OpenLayers.INCHES_PER_UNIT.Foot,
	"us-yd" : OpenLayers.INCHES_PER_UNIT.Yard,
	"us-ch" : OpenLayers.INCHES_PER_UNIT.GunterChain,
	"us-mi" : OpenLayers.INCHES_PER_UNIT.Mile,
	"ind-yd" : OpenLayers.INCHES_PER_UNIT.IndianYd37,
	"ind-ft" : OpenLayers.INCHES_PER_UNIT.IndianFt37,
	"ind-ch" : 20.11669506 / OpenLayers.METERS_PER_INCH
});
OpenLayers.DOTS_PER_INCH = 72;
OpenLayers.Util.normalizeScale = function (b) {
	return 1 < b ? 1 / b : b
};
OpenLayers.Util.getResolutionFromScale = function (d, f) {
	var e;
	d && (null == f && (f = "degrees"), e = 1 / (OpenLayers.Util.normalizeScale(d) * OpenLayers.INCHES_PER_UNIT[f] * OpenLayers.DOTS_PER_INCH));
	return e
};
OpenLayers.Util.getScaleFromResolution = function (d, c) {
	null == c && (c = "degrees");
	return d * OpenLayers.INCHES_PER_UNIT[c] * OpenLayers.DOTS_PER_INCH
};
OpenLayers.Util.pagePosition = function (i) {
	var h = [0, 0],
	g = OpenLayers.Util.getViewportElement();
	if (!i || i == window || i == g) {
		return h
	}
	var f = OpenLayers.IS_GECKO && document.getBoxObjectFor && "absolute" == OpenLayers.Element.getStyle(i, "position") && ("" == i.style.top || "" == i.style.left),
	j = null;
	if (i.getBoundingClientRect) {
		i = i.getBoundingClientRect(),
		j = g.scrollTop,
		h[0] = i.left + g.scrollLeft,
		h[1] = i.top + j
	} else {
		if (document.getBoxObjectFor && !f) {
			i = document.getBoxObjectFor(i),
			g = document.getBoxObjectFor(g),
			h[0] = i.screenX - g.screenX,
			h[1] = i.screenY - g.screenY
		} else {
			h[0] = i.offsetLeft;
			h[1] = i.offsetTop;
			j = i.offsetParent;
			if (j != i) {
				for (; j; ) {
					h[0] += j.offsetLeft,
					h[1] += j.offsetTop,
					j = j.offsetParent
				}
			}
			g = OpenLayers.BROWSER_NAME;
			if ("opera" == g || "safari" == g && "absolute" == OpenLayers.Element.getStyle(i, "position")) {
				h[1] -= document.body.offsetTop
			}
			for (j = i.offsetParent; j && j != document.body; ) {
				h[0] -= j.scrollLeft;
				if ("opera" != g || "TR" != j.tagName) {
					h[1] -= j.scrollTop
				}
				j = j.offsetParent
			}
		}
	}
	return h
};
OpenLayers.Util.getViewportElement = function () {
	var b = arguments.callee.viewportElement;
	void 0 == b && (b = "msie" == OpenLayers.BROWSER_NAME && "CSS1Compat" != document.compatMode ? document.body : document.documentElement, arguments.callee.viewportElement = b);
	return b
};
OpenLayers.Util.isEquivalentUrl = function (h, g, f) {
	f = f || {};
	OpenLayers.Util.applyDefaults(f, {
		ignoreCase : !0,
		ignorePort80 : !0,
		ignoreHash : !0
	});
	h = OpenLayers.Util.createUrlObject(h, f);
	g = OpenLayers.Util.createUrlObject(g, f);
	for (var e in h) {
		if ("args" !== e && h[e] != g[e]) {
			return !1
		}
	}
	for (e in h.args) {
		if (h.args[e] != g.args[e]) {
			return !1
		}
		delete g.args[e]
	}
	for (e in g.args) {
		return !1
	}
	return !0
};
OpenLayers.Util.createUrlObject = function (i, h) {
	h = h || {};
	if (!/^\w+:\/\//.test(i)) {
		var g = window.location,
		f = g.port ? ":" + g.port : "",
		f = g.protocol + "//" + g.host.split(":").shift() + f;
		0 === i.indexOf("/") ? i = f + i : (g = g.pathname.split("/"), g.pop(), i = f + g.join("/") + "/" + i)
	}
	h.ignoreCase && (i = i.toLowerCase());
	g = document.createElement("a");
	g.href = i;
	f = {};
	f.host = g.host.split(":").shift();
	f.protocol = g.protocol;
	f.port = h.ignorePort80 ? "80" == g.port || "0" == g.port ? "" : g.port : "" == g.port || "0" == g.port ? "80" : g.port;
	f.hash = h.ignoreHash || "#" === g.hash ? "" : g.hash;
	var j = g.search;
	j || (j = i.indexOf("?"), j = -1 != j ? i.substr(j) : "");
	f.args = OpenLayers.Util.getParameters(j);
	f.pathname = "/" == g.pathname.charAt(0) ? g.pathname : "/" + g.pathname;
	return f
};
OpenLayers.Util.removeTail = function (d) {
	var f = null,
	f = d.indexOf("?"),
	e = d.indexOf("#");
	return f = -1 == f ? -1 != e ? d.substr(0, e) : d : -1 != e ? d.substr(0, Math.min(f, e)) : d.substr(0, f)
};
OpenLayers.IS_GECKO = function () {
	var b = navigator.userAgent.toLowerCase();
	return -1 == b.indexOf("webkit") && -1 != b.indexOf("gecko")
}
();
OpenLayers.CANVAS_SUPPORTED = function () {
	var b = document.createElement("canvas");
	return !(!b.getContext || !b.getContext("2d"))
}
();
OpenLayers.BROWSER_NAME = function () {
	var d = "",
	c = navigator.userAgent.toLowerCase();
	-1 != c.indexOf("opera") ? d = "opera" : -1 != c.indexOf("msie") ? d = "msie" : -1 != c.indexOf("safari") ? d = "safari" : -1 != c.indexOf("mozilla") && (d = -1 != c.indexOf("firefox") ? "firefox" : "mozilla");
	return d
}
();
OpenLayers.Util.getBrowserName = function () {
	return OpenLayers.BROWSER_NAME
};
OpenLayers.Util.getRenderedDimensions = function (o, n, m) {
	var i,
	v,
	u = document.createElement("div");
	u.style.visibility = "hidden";
	for (var t = m && m.containerElement ? m.containerElement : document.body, s = !1, r = null, q = t; q && "body" != q.tagName.toLowerCase(); ) {
		var p = OpenLayers.Element.getStyle(q, "position");
		if ("absolute" == p) {
			s = !0;
			break
		} else {
			if (p && "static" != p) {
				break
			}
		}
		q = q.parentNode
	}
	if (s && (0 === t.clientHeight || 0 === t.clientWidth)) {
		r = document.createElement("div"),
		r.style.visibility = "hidden",
		r.style.position = "absolute",
		r.style.overflow = "visible",
		r.style.width = document.body.clientWidth + "px",
		r.style.height = document.body.clientHeight + "px",
		r.appendChild(u)
	}
	u.style.position = "absolute";
	n && (n.w ? (i = n.w, u.style.width = i + "px") : n.h && (v = n.h, u.style.height = v + "px"));
	m && m.displayClass && (u.className = m.displayClass);
	n = document.createElement("div");
	n.innerHTML = o;
	n.style.overflow = "visible";
	if (n.childNodes) {
		o = 0;
		for (m = n.childNodes.length; o < m; o++) {
			n.childNodes[o].style && (n.childNodes[o].style.overflow = "visible")
		}
	}
	u.appendChild(n);
	r ? t.appendChild(r) : t.appendChild(u);
	i || (i = parseInt(n.scrollWidth), u.style.width = i + "px");
	v || (v = parseInt(n.scrollHeight));
	u.removeChild(n);
	r ? (r.removeChild(u), t.removeChild(r)) : t.removeChild(u);
	return new OpenLayers.Size(i, v)
};
OpenLayers.Util.getScrollbarWidth = function () {
	var d = OpenLayers.Util._scrollbarWidth;
	if (null == d) {
		var f = null,
		e = null,
		f = d = 0,
		f = document.createElement("div");
		f.style.position = "absolute";
		f.style.top = "-1000px";
		f.style.left = "-1000px";
		f.style.width = "100px";
		f.style.height = "50px";
		f.style.overflow = "hidden";
		e = document.createElement("div");
		e.style.width = "100%";
		e.style.height = "200px";
		f.appendChild(e);
		document.body.appendChild(f);
		d = e.offsetWidth;
		f.style.overflow = "scroll";
		f = e.offsetWidth;
		document.body.removeChild(document.body.lastChild);
		OpenLayers.Util._scrollbarWidth = d - f;
		d = OpenLayers.Util._scrollbarWidth
	}
	return d
};
OpenLayers.Util.getFormattedLonLat = function (j, i, h) {
	h || (h = "dms");
	j = (j + 540) % 360 - 180;
	var g = Math.abs(j),
	l = Math.floor(g),
	k = g = (g - l) / (1 / 60),
	g = Math.floor(g),
	k = Math.round(10 * ((k - g) / (1 / 60))),
	k = k / 10;
	60 <= k && (k -= 60, g += 1, 60 <= g && (g -= 60, l += 1));
	10 > l && (l = "0" + l);
	l += "\u00b0";
	0 <= h.indexOf("dm") && (10 > g && (g = "0" + g), l += g + "'", 0 <= h.indexOf("dms") && (10 > k && (k = "0" + k), l += k + '"'));
	return l = "lon" == i ? l + (0 > j ? OpenLayers.i18n("W") : OpenLayers.i18n("E")) : l + (0 > j ? OpenLayers.i18n("S") : OpenLayers.i18n("N"))
};
OpenLayers.Format = OpenLayers.Class({
		options : null,
		externalProjection : null,
		internalProjection : null,
		data : null,
		keepData : !1,
		initialize : function (b) {
			OpenLayers.Util.extend(this, b);
			this.options = b
		},
		destroy : function () {},
		read : function () {
			throw Error("Read not implemented.")
		},
		write : function () {
			throw Error("Write not implemented.")
		},
		CLASS_NAME : "OpenLayers.Format"
	});
OpenLayers.Format.CSWGetRecords = function (d) {
	d = OpenLayers.Util.applyDefaults(d, OpenLayers.Format.CSWGetRecords.DEFAULTS);
	var c = OpenLayers.Format.CSWGetRecords["v" + d.version.replace(/\./g, "_")];
	if (!c) {
		throw "Unsupported CSWGetRecords version: " + d.version
	}
	return new c(d)
};
OpenLayers.Format.CSWGetRecords.DEFAULTS = {
	version : "2.0.2"
};
OpenLayers.Control = OpenLayers.Class({
		id : null,
		map : null,
		div : null,
		type : null,
		allowSelection : !1,
		displayClass : "",
		title : "",
		autoActivate : !1,
		active : null,
		handler : null,
		eventListeners : null,
		events : null,
		initialize : function (b) {
			this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "");
			OpenLayers.Util.extend(this, b);
			this.events = new OpenLayers.Events(this);
			if (this.eventListeners instanceof Object) {
				this.events.on(this.eventListeners)
			}
			null == this.id && (this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_"))
		},
		destroy : function () {
			this.events && (this.eventListeners && this.events.un(this.eventListeners), this.events.destroy(), this.events = null);
			this.eventListeners = null;
			this.handler && (this.handler.destroy(), this.handler = null);
			if (this.handlers) {
				for (var b in this.handlers) {
					this.handlers.hasOwnProperty(b) && "function" == typeof this.handlers[b].destroy && this.handlers[b].destroy()
				}
				this.handlers = null
			}
			this.map && (this.map.removeControl(this), this.map = null);
			this.div = null
		},
		setMap : function (b) {
			this.map = b;
			this.handler && this.handler.setMap(b)
		},
		draw : function (b) {
			null == this.div && (this.div = OpenLayers.Util.createDiv(this.id), this.div.className = this.displayClass, this.allowSelection || (this.div.className += " olControlNoSelect", this.div.setAttribute("unselectable", "on", 0), this.div.onselectstart = OpenLayers.Function.False), "" != this.title && (this.div.title = this.title));
			null != b && (this.position = b.clone());
			this.moveTo(this.position);
			return this.div
		},
		moveTo : function (b) {
			null != b && null != this.div && (this.div.style.left = b.x + "px", this.div.style.top = b.y + "px")
		},
		activate : function () {
			if (this.active) {
				return !1
			}
			this.handler && this.handler.activate();
			this.active = !0;
			this.map && OpenLayers.Element.addClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active");
			this.events.triggerEvent("activate");
			return !0
		},
		deactivate : function () {
			return this.active ? (this.handler && this.handler.deactivate(), this.active = !1, this.map && OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active"), this.events.triggerEvent("deactivate"), !0) : !1
		},
		CLASS_NAME : "OpenLayers.Control"
	});
OpenLayers.Control.TYPE_BUTTON = 1;
OpenLayers.Control.TYPE_TOGGLE = 2;
OpenLayers.Control.TYPE_TOOL = 3;
OpenLayers.Event = {
	observers : !1,
	KEY_SPACE : 32,
	KEY_BACKSPACE : 8,
	KEY_TAB : 9,
	KEY_RETURN : 13,
	KEY_ESC : 27,
	KEY_LEFT : 37,
	KEY_UP : 38,
	KEY_RIGHT : 39,
	KEY_DOWN : 40,
	KEY_DELETE : 46,
	element : function (b) {
		return b.target || b.srcElement
	},
	isSingleTouch : function (b) {
		return b.touches && 1 == b.touches.length
	},
	isMultiTouch : function (b) {
		return b.touches && 1 < b.touches.length
	},
	isLeftClick : function (b) {
		return b.which && 1 == b.which || b.button && 1 == b.button
	},
	isRightClick : function (b) {
		return b.which && 3 == b.which || b.button && 2 == b.button
	},
	stop : function (d, c) {
		c || (d.preventDefault ? d.preventDefault() : d.returnValue = !1);
		d.stopPropagation ? d.stopPropagation() : d.cancelBubble = !0
	},
	findElement : function (d, f) {
		for (var e = OpenLayers.Event.element(d); e.parentNode && (!e.tagName || e.tagName.toUpperCase() != f.toUpperCase()); ) {
			e = e.parentNode
		}
		return e
	},
	observe : function (i, h, g, f) {
		i = OpenLayers.Util.getElement(i);
		f = f || !1;
		if ("keypress" == h && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || i.attachEvent)) {
			h = "keydown"
		}
		this.observers || (this.observers = {});
		if (!i._eventCacheID) {
			var j = "eventCacheID_";
			i.id && (j = i.id + "_" + j);
			i._eventCacheID = OpenLayers.Util.createUniqueID(j)
		}
		j = i._eventCacheID;
		this.observers[j] || (this.observers[j] = []);
		this.observers[j].push({
			element : i,
			name : h,
			observer : g,
			useCapture : f
		});
		i.addEventListener ? i.addEventListener(h, g, f) : i.attachEvent && i.attachEvent("on" + h, g)
	},
	stopObservingElement : function (b) {
		b = OpenLayers.Util.getElement(b)._eventCacheID;
		this._removeElementObservers(OpenLayers.Event.observers[b])
	},
	_removeElementObservers : function (d) {
		if (d) {
			for (var f = d.length - 1; 0 <= f; f--) {
				var e = d[f];
				OpenLayers.Event.stopObserving.apply(this, [e.element, e.name, e.observer, e.useCapture])
			}
		}
	},
	stopObserving : function (r, q, p, o) {
		o = o || !1;
		r = OpenLayers.Util.getElement(r);
		var n = r._eventCacheID;
		if ("keypress" == q && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || r.detachEvent)) {
			q = "keydown"
		}
		var m = !1,
		l = OpenLayers.Event.observers[n];
		if (l) {
			for (var k = 0; !m && k < l.length; ) {
				var i = l[k];
				if (i.name == q && i.observer == p && i.useCapture == o) {
					l.splice(k, 1);
					0 == l.length && delete OpenLayers.Event.observers[n];
					m = !0;
					break
				}
				k++
			}
		}
		m && (r.removeEventListener ? r.removeEventListener(q, p, o) : r && r.detachEvent && r.detachEvent("on" + q, p));
		return m
	},
	unloadCache : function () {
		if (OpenLayers.Event && OpenLayers.Event.observers) {
			for (var b in OpenLayers.Event.observers) {
				OpenLayers.Event._removeElementObservers.apply(this, [OpenLayers.Event.observers[b]])
			}
			OpenLayers.Event.observers = !1
		}
	},
	CLASS_NAME : "OpenLayers.Event"
};
OpenLayers.Event.observe(window, "unload", OpenLayers.Event.unloadCache, !1);
OpenLayers.Events = OpenLayers.Class({
		BROWSER_EVENTS : "mouseover mouseout mousedown mouseup mousemove click dblclick rightclick dblrightclick resize focus blur touchstart touchmove touchend keydown".split(" "),
		listeners : null,
		object : null,
		element : null,
		eventHandler : null,
		fallThrough : null,
		includeXY : !1,
		extensions : null,
		extensionCount : null,
		clearMouseListener : null,
		initialize : function (i, h, g, f, j) {
			OpenLayers.Util.extend(this, j);
			this.object = i;
			this.fallThrough = f;
			this.listeners = {};
			this.extensions = {};
			this.extensionCount = {};
			null != h && this.attachToElement(h)
		},
		destroy : function () {
			for (var b in this.extensions) {
				"boolean" !== typeof this.extensions[b] && this.extensions[b].destroy()
			}
			this.extensions = null;
			this.element && (OpenLayers.Event.stopObservingElement(this.element), this.element.hasScrollEvent && OpenLayers.Event.stopObserving(window, "scroll", this.clearMouseListener));
			this.eventHandler = this.fallThrough = this.object = this.listeners = this.element = null
		},
		addEventType : function () {},
		attachToElement : function (d) {
			this.element ? OpenLayers.Event.stopObservingElement(this.element) : (this.eventHandler = OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent, this), this.clearMouseListener = OpenLayers.Function.bind(this.clearMouseCache, this));
			this.element = d;
			for (var f = 0, e = this.BROWSER_EVENTS.length; f < e; f++) {
				OpenLayers.Event.observe(d, this.BROWSER_EVENTS[f], this.eventHandler)
			}
			OpenLayers.Event.observe(d, "dragstart", OpenLayers.Event.stop)
		},
		on : function (d) {
			for (var c in d) {
				"scope" != c && d.hasOwnProperty(c) && this.register(c, d.scope, d[c])
			}
		},
		register : function (i, h, g, f) {
			i in OpenLayers.Events && !this.extensions[i] && (this.extensions[i] = new OpenLayers.Events[i](this));
			if (null != g) {
				null == h && (h = this.object);
				var j = this.listeners[i];
				j || (j = [], this.listeners[i] = j, this.extensionCount[i] = 0);
				h = {
					obj : h,
					func : g
				};
				f ? (j.splice(this.extensionCount[i], 0, h), "object" === typeof f && f.extension && this.extensionCount[i]++) : j.push(h)
			}
		},
		registerPriority : function (d, f, e) {
			this.register(d, f, e, !0)
		},
		un : function (d) {
			for (var c in d) {
				"scope" != c && d.hasOwnProperty(c) && this.unregister(c, d.scope, d[c])
			}
		},
		unregister : function (i, h, g) {
			null == h && (h = this.object);
			i = this.listeners[i];
			if (null != i) {
				for (var f = 0, j = i.length; f < j; f++) {
					if (i[f].obj == h && i[f].func == g) {
						i.splice(f, 1);
						break
					}
				}
			}
		},
		remove : function (b) {
			null != this.listeners[b] && (this.listeners[b] = [])
		},
		triggerEvent : function (j, i) {
			var h = this.listeners[j];
			if (h && 0 != h.length) {
				null == i && (i = {});
				i.object = this.object;
				i.element = this.element;
				i.type || (i.type = j);
				for (var h = h.slice(), g, l = 0, k = h.length; l < k && !(g = h[l], g = g.func.apply(g.obj, [i]), void 0 != g && !1 == g); l++) {}

				this.fallThrough || OpenLayers.Event.stop(i, !0);
				return g
			}
		},
		handleBrowserEvent : function (o) {
			var n = o.type,
			m = this.listeners[n];
			if (m && 0 != m.length) {
				if ((m = o.touches) && m[0]) {
					for (var l = 0, k = 0, j = m.length, i, p = 0; p < j; ++p) {
						i = m[p],
						l += i.clientX,
						k += i.clientY
					}
					o.clientX = l / j;
					o.clientY = k / j
				}
				this.includeXY && (o.xy = this.getMousePosition(o));
				this.triggerEvent(n, o)
			}
		},
		clearMouseCache : function () {
			this.element.scrolls = null;
			this.element.lefttop = null;
			var b = document.body;
			if (b && (!(0 != b.scrollTop || 0 != b.scrollLeft) || !navigator.userAgent.match(/iPhone/i))) {
				this.element.offsets = null
			}
		},
		getMousePosition : function (d) {
			this.includeXY ? this.element.hasScrollEvent || (OpenLayers.Event.observe(window, "scroll", this.clearMouseListener), this.element.hasScrollEvent = !0) : this.clearMouseCache();
			if (!this.element.scrolls) {
				var c = OpenLayers.Util.getViewportElement();
				this.element.scrolls = [c.scrollLeft, c.scrollTop]
			}
			this.element.lefttop || (this.element.lefttop = [document.documentElement.clientLeft || 0, document.documentElement.clientTop || 0]);
			this.element.offsets || (this.element.offsets = OpenLayers.Util.pagePosition(this.element));
			return new OpenLayers.Pixel(d.clientX + this.element.scrolls[0] - this.element.offsets[0] - this.element.lefttop[0], d.clientY + this.element.scrolls[1] - this.element.offsets[1] - this.element.lefttop[1])
		},
		CLASS_NAME : "OpenLayers.Events"
	});
OpenLayers.Events.buttonclick = OpenLayers.Class({
		target : null,
		events : "mousedown mouseup click dblclick touchstart touchmove touchend keydown".split(" "),
		startRegEx : /^mousedown|touchstart$/,
		cancelRegEx : /^touchmove$/,
		completeRegEx : /^mouseup|touchend$/,
		initialize : function (b) {
			this.target = b;
			for (b = this.events.length - 1; 0 <= b; --b) {
				this.target.register(this.events[b], this, this.buttonClick, {
					extension : !0
				})
			}
		},
		destroy : function () {
			for (var b = this.events.length - 1; 0 <= b; --b) {
				this.target.unregister(this.events[b], this, this.buttonClick)
			}
			delete this.target
		},
		getPressedButton : function (d) {
			var f = 3,
			e;
			do {
				if (OpenLayers.Element.hasClass(d, "olButton")) {
					e = d;
					break
				}
				d = d.parentNode
			} while (0 < --f && d);
			return e
		},
		buttonClick : function (d) {
			var f = !0,
			e = OpenLayers.Event.element(d);
			if (e && (OpenLayers.Event.isLeftClick(d) || !~d.type.indexOf("mouse"))) {
				if (e = this.getPressedButton(e)) {
					if ("keydown" === d.type) {
						switch (d.keyCode) {
						case OpenLayers.Event.KEY_RETURN:
						case OpenLayers.Event.KEY_SPACE:
							this.target.triggerEvent("buttonclick", {
								buttonElement : e
							}),
							OpenLayers.Event.stop(d),
							f = !1
						}
					} else {
						this.startEvt && (this.completeRegEx.test(d.type) && (f = OpenLayers.Util.pagePosition(e), this.target.triggerEvent("buttonclick", {
									buttonElement : e,
									buttonXY : {
										x : this.startEvt.clientX - f[0],
										y : this.startEvt.clientY - f[1]
									}
								})), this.cancelRegEx.test(d.type) && delete this.startEvt, OpenLayers.Event.stop(d), f = !1)
					}
					this.startRegEx.test(d.type) && (this.startEvt = d, OpenLayers.Event.stop(d), f = !1)
				} else {
					delete this.startEvt
				}
			}
			return f
		}
	});
OpenLayers.Control.OverviewMap = OpenLayers.Class(OpenLayers.Control, {
		element : null,
		ovmap : null,
		size : {
			w : 180,
			h : 90
		},
		layers : null,
		minRectSize : 15,
		minRectDisplayClass : "RectReplacement",
		minRatio : 8,
		maxRatio : 32,
		mapOptions : null,
		autoPan : !1,
		handlers : null,
		resolutionFactor : 1,
		maximized : !1,
		initialize : function (b) {
			this.layers = [];
			this.handlers = {};
			OpenLayers.Control.prototype.initialize.apply(this, [b])
		},
		destroy : function () {
			this.mapDiv && (this.handlers.click && this.handlers.click.destroy(), this.handlers.drag && this.handlers.drag.destroy(), this.ovmap && this.ovmap.viewPortDiv.removeChild(this.extentRectangle), this.extentRectangle = null, this.rectEvents && (this.rectEvents.destroy(), this.rectEvents = null), this.ovmap && (this.ovmap.destroy(), this.ovmap = null), this.element.removeChild(this.mapDiv), this.mapDiv = null, this.div.removeChild(this.element), this.element = null, this.maximizeDiv && (this.div.removeChild(this.maximizeDiv), this.maximizeDiv = null), this.minimizeDiv && (this.div.removeChild(this.minimizeDiv), this.minimizeDiv = null), this.map.events.un({
					buttonclick : this.onButtonClick,
					moveend : this.update,
					changebaselayer : this.baseLayerDraw,
					scope : this
				}), OpenLayers.Control.prototype.destroy.apply(this, arguments))
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			if (0 === this.layers.length) {
				if (this.map.baseLayer) {
					this.layers = [this.map.baseLayer.clone()]
				} else {
					return this.map.events.register("changebaselayer", this, this.baseLayerDraw),
					this.div
				}
			}
			this.element = document.createElement("div");
			this.element.className = this.displayClass + "Element";
			this.element.style.display = "none";
			this.mapDiv = document.createElement("div");
			this.mapDiv.style.width = this.size.w + "px";
			this.mapDiv.style.height = this.size.h + "px";
			this.mapDiv.style.position = "relative";
			this.mapDiv.style.overflow = "hidden";
			this.mapDiv.id = OpenLayers.Util.createUniqueID("overviewMap");
			this.extentRectangle = document.createElement("div");
			this.extentRectangle.style.position = "absolute";
			this.extentRectangle.style.zIndex = 1000;
			this.extentRectangle.className = this.displayClass + "ExtentRectangle";
			this.element.appendChild(this.mapDiv);
			this.div.appendChild(this.element);
			if (this.outsideViewport) {
				this.element.style.display = ""
			} else {
				this.div.className += " " + this.displayClass + "Container";
				var b = OpenLayers.Util.getImageLocation("layer-switcher-maximize.png");
				this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(this.displayClass + "MaximizeButton", null, null, b, "absolute");
				this.maximizeDiv.style.display = "none";
				this.maximizeDiv.className = this.displayClass + "MaximizeButton olButton";
				this.div.appendChild(this.maximizeDiv);
				b = OpenLayers.Util.getImageLocation("layer-switcher-minimize.png");
				this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_minimizeDiv", null, null, b, "absolute");
				this.minimizeDiv.style.display = "none";
				this.minimizeDiv.className = this.displayClass + "MinimizeButton olButton";
				this.div.appendChild(this.minimizeDiv);
				this.minimizeControl()
			}
			this.map.getExtent() && this.update();
			this.map.events.on({
				buttonclick : this.onButtonClick,
				moveend : this.update,
				scope : this
			});
			this.maximized && this.maximizeControl();
			return this.div
		},
		baseLayerDraw : function () {
			this.draw();
			this.map.events.unregister("changebaselayer", this, this.baseLayerDraw)
		},
		rectDrag : function (j) {
			var i = this.handlers.drag.last.x - j.x,
			h = this.handlers.drag.last.y - j.y;
			if (0 != i || 0 != h) {
				var g = this.rectPxBounds.top,
				l = this.rectPxBounds.left;
				j = Math.abs(this.rectPxBounds.getHeight());
				var k = this.rectPxBounds.getWidth(),
				h = Math.max(0, g - h),
				h = Math.min(h, this.ovmap.size.h - this.hComp - j),
				i = Math.max(0, l - i),
				i = Math.min(i, this.ovmap.size.w - this.wComp - k);
				this.setRectPxBounds(new OpenLayers.Bounds(i, h + j, i + k, h))
			}
		},
		mapDivClick : function (j) {
			var i = this.rectPxBounds.getCenterPixel(),
			h = j.xy.x - i.x,
			g = j.xy.y - i.y,
			l = this.rectPxBounds.top,
			k = this.rectPxBounds.left;
			j = Math.abs(this.rectPxBounds.getHeight());
			i = this.rectPxBounds.getWidth();
			g = Math.max(0, l + g);
			g = Math.min(g, this.ovmap.size.h - j);
			h = Math.max(0, k + h);
			h = Math.min(h, this.ovmap.size.w - i);
			this.setRectPxBounds(new OpenLayers.Bounds(h, g + j, h + i, g));
			this.updateMapToRect()
		},
		onButtonClick : function (b) {
			b.buttonElement === this.minimizeDiv ? this.minimizeControl() : b.buttonElement === this.maximizeDiv && this.maximizeControl()
		},
		maximizeControl : function (b) {
			this.element.style.display = "";
			this.showToggle(!1);
			null != b && OpenLayers.Event.stop(b)
		},
		minimizeControl : function (b) {
			this.element.style.display = "none";
			this.showToggle(!0);
			null != b && OpenLayers.Event.stop(b)
		},
		showToggle : function (b) {
			this.maximizeDiv.style.display = b ? "" : "none";
			this.minimizeDiv.style.display = b ? "none" : ""
		},
		update : function () {
			null == this.ovmap && this.createMap();
			(this.autoPan || !this.isSuitableOverview()) && this.updateOverview();
			this.updateRectToMap()
		},
		isSuitableOverview : function () {
			var d = this.map.getExtent(),
			c = this.map.maxExtent,
			d = new OpenLayers.Bounds(Math.max(d.left, c.left), Math.max(d.bottom, c.bottom), Math.min(d.right, c.right), Math.min(d.top, c.top));
			this.ovmap.getProjection() != this.map.getProjection() && (d = d.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject()));
			c = this.ovmap.getResolution() / this.map.getResolution();
			return c > this.minRatio && c <= this.maxRatio && this.ovmap.getExtent().containsBounds(d)
		},
		updateOverview : function () {
			var d = this.map.getResolution(),
			f = this.ovmap.getResolution(),
			e = f / d;
			e > this.maxRatio ? f = this.minRatio * d : e <= this.minRatio && (f = this.maxRatio * d);
			this.ovmap.getProjection() != this.map.getProjection() ? (d = this.map.center.clone(), d.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject())) : d = this.map.center;
			this.ovmap.setCenter(d, this.ovmap.getZoomForResolution(f * this.resolutionFactor));
			this.updateRectToMap()
		},
		createMap : function () {
			var d = OpenLayers.Util.extend({
					controls : [],
					maxResolution : "auto",
					fallThrough : !1
				}, this.mapOptions);
			this.ovmap = new OpenLayers.Map(this.mapDiv, d);
			this.ovmap.viewPortDiv.appendChild(this.extentRectangle);
			OpenLayers.Event.stopObserving(window, "unload", this.ovmap.unloadDestroy);
			this.ovmap.addLayers(this.layers);
			this.ovmap.zoomToMaxExtent();
			this.wComp = (this.wComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle, "border-left-width")) + parseInt(OpenLayers.Element.getStyle(this.extentRectangle, "border-right-width"))) ? this.wComp : 2;
			this.hComp = (this.hComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle, "border-top-width")) + parseInt(OpenLayers.Element.getStyle(this.extentRectangle, "border-bottom-width"))) ? this.hComp : 2;
			this.handlers.drag = new OpenLayers.Handler.Drag(this, {
					move : this.rectDrag,
					done : this.updateMapToRect
				}, {
					map : this.ovmap
				});
			this.handlers.click = new OpenLayers.Handler.Click(this, {
					click : this.mapDivClick
				}, {
					single : !0,
					"double" : !1,
					stopSingle : !0,
					stopDouble : !0,
					pixelTolerance : 1,
					map : this.ovmap
				});
			this.handlers.click.activate();
			this.rectEvents = new OpenLayers.Events(this, this.extentRectangle, null, !0);
			this.rectEvents.register("mouseover", this, function () {
				!this.handlers.drag.active && !this.map.dragging && this.handlers.drag.activate()
			});
			this.rectEvents.register("mouseout", this, function () {
				this.handlers.drag.dragging || this.handlers.drag.deactivate()
			});
			if (this.ovmap.getProjection() != this.map.getProjection()) {
				var d = this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units,
				c = this.ovmap.getProjectionObject().getUnits() || this.ovmap.units || this.ovmap.baseLayer.units;
				this.resolutionFactor = d && c ? OpenLayers.INCHES_PER_UNIT[d] / OpenLayers.INCHES_PER_UNIT[c] : 1
			}
		},
		updateRectToMap : function () {
			var b;
			b = this.ovmap.getProjection() != this.map.getProjection() ? this.map.getExtent().transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject()) : this.map.getExtent();
			(b = this.getRectBoundsFromMapBounds(b)) && this.setRectPxBounds(b)
		},
		updateMapToRect : function () {
			var b = this.getMapBoundsFromRectBounds(this.rectPxBounds);
			this.ovmap.getProjection() != this.map.getProjection() && (b = b.transform(this.ovmap.getProjectionObject(), this.map.getProjectionObject()));
			this.map.panTo(b.getCenterLonLat())
		},
		setRectPxBounds : function (j) {
			var i = Math.max(j.top, 0),
			h = Math.max(j.left, 0),
			g = Math.min(j.top + Math.abs(j.getHeight()), this.ovmap.size.h - this.hComp);
			j = Math.min(j.left + j.getWidth(), this.ovmap.size.w - this.wComp);
			var l = Math.max(j - h, 0),
			k = Math.max(g - i, 0);
			l < this.minRectSize || k < this.minRectSize ? (this.extentRectangle.className = this.displayClass + this.minRectDisplayClass, l = h + l / 2 - this.minRectSize / 2, this.extentRectangle.style.top = Math.round(i + k / 2 - this.minRectSize / 2) + "px", this.extentRectangle.style.left = Math.round(l) + "px", this.extentRectangle.style.height = this.minRectSize + "px", this.extentRectangle.style.width = this.minRectSize + "px") : (this.extentRectangle.className = this.displayClass + "ExtentRectangle", this.extentRectangle.style.top = Math.round(i) + "px", this.extentRectangle.style.left = Math.round(h) + "px", this.extentRectangle.style.height = Math.round(k) + "px", this.extentRectangle.style.width = Math.round(l) + "px");
			this.rectPxBounds = new OpenLayers.Bounds(Math.round(h), Math.round(g), Math.round(j), Math.round(i))
		},
		getRectBoundsFromMapBounds : function (d) {
			var f = this.getOverviewPxFromLonLat({
					lon : d.left,
					lat : d.bottom
				});
			d = this.getOverviewPxFromLonLat({
					lon : d.right,
					lat : d.top
				});
			var e = null;
			f && d && (e = new OpenLayers.Bounds(f.x, f.y, d.x, d.y));
			return e
		},
		getMapBoundsFromRectBounds : function (d) {
			var c = this.getLonLatFromOverviewPx({
					x : d.left,
					y : d.bottom
				});
			d = this.getLonLatFromOverviewPx({
					x : d.right,
					y : d.top
				});
			return new OpenLayers.Bounds(c.lon, c.lat, d.lon, d.lat)
		},
		getLonLatFromOverviewPx : function (h) {
			var g = this.ovmap.size,
			f = this.ovmap.getResolution(),
			e = this.ovmap.getExtent().getCenterLonLat();
			return {
				lon : e.lon + (h.x - g.w / 2) * f,
				lat : e.lat - (h.y - g.h / 2) * f
			}
		},
		getOverviewPxFromLonLat : function (d) {
			var f = this.ovmap.getResolution(),
			e = this.ovmap.getExtent();
			if (e) {
				return {
					x : Math.round(1 / f * (d.lon - e.left)),
					y : Math.round(1 / f * (e.top - d.lat))
				}
			}
		},
		CLASS_NAME : "OpenLayers.Control.OverviewMap"
	});
OpenLayers.Animation = function (j) {
	var i = !(!j.requestAnimationFrame && !j.webkitRequestAnimationFrame && !j.mozRequestAnimationFrame && !j.oRequestAnimationFrame && !j.msRequestAnimationFrame),
	h,
	g = j.requestAnimationFrame || j.webkitRequestAnimationFrame || j.mozRequestAnimationFrame || j.oRequestAnimationFrame || j.msRequestAnimationFrame || function (a) {
		j.setTimeout(a, 16)
	};
	h = function (b, a) {
		g.apply(j, [b, a])
	};
	var l = 0,
	k = {};
	return {
		isNative : i,
		requestFrame : h,
		start : function (d, a, b) {
			a = 0 < a ? a : Number.POSITIVE_INFINITY;
			var e = ++l,
			c = +new Date;
			k[e] = function () {
				k[e] && +new Date - c <= a ? (d(), k[e] && h(k[e], b)) : delete k[e]
			};
			h(k[e], b);
			return e
		},
		stop : function (a) {
			delete k[a]
		}
	}
}
(window);
OpenLayers.Tween = OpenLayers.Class({
		easing : null,
		begin : null,
		finish : null,
		duration : null,
		callbacks : null,
		time : null,
		animationId : null,
		playing : !1,
		initialize : function (b) {
			this.easing = b ? b : OpenLayers.Easing.Expo.easeOut
		},
		start : function (h, g, f, e) {
			this.playing = !0;
			this.begin = h;
			this.finish = g;
			this.duration = f;
			this.callbacks = e.callbacks;
			this.time = 0;
			OpenLayers.Animation.stop(this.animationId);
			this.animationId = null;
			this.callbacks && this.callbacks.start && this.callbacks.start.call(this, this.begin);
			this.animationId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.play, this))
		},
		stop : function () {
			this.playing && (this.callbacks && this.callbacks.done && this.callbacks.done.call(this, this.finish), OpenLayers.Animation.stop(this.animationId), this.animationId = null, this.playing = !1)
		},
		play : function () {
			var h = {},
			g;
			for (g in this.begin) {
				var f = this.begin[g],
				e = this.finish[g];
				if (null == f || null == e || isNaN(f) || isNaN(e)) {
					throw new TypeError("invalid value for Tween")
				}
				h[g] = this.easing.apply(this, [this.time, f, e - f, this.duration])
			}
			this.time++;
			this.callbacks && this.callbacks.eachStep && this.callbacks.eachStep.call(this, h);
			this.time > this.duration && this.stop()
		},
		CLASS_NAME : "OpenLayers.Tween"
	});
OpenLayers.Easing = {
	CLASS_NAME : "OpenLayers.Easing"
};
OpenLayers.Easing.Linear = {
	easeIn : function (h, g, f, e) {
		return f * h / e + g
	},
	easeOut : function (h, g, f, e) {
		return f * h / e + g
	},
	easeInOut : function (h, g, f, e) {
		return f * h / e + g
	},
	CLASS_NAME : "OpenLayers.Easing.Linear"
};
OpenLayers.Easing.Expo = {
	easeIn : function (h, g, f, e) {
		return 0 == h ? g : f * Math.pow(2, 10 * (h / e - 1)) + g
	},
	easeOut : function (h, g, f, e) {
		return h == e ? g + f : f * (-Math.pow(2, -10 * h / e) + 1) + g
	},
	easeInOut : function (h, g, f, e) {
		return 0 == h ? g : h == e ? g + f : 1 > (h /= e / 2) ? f / 2 * Math.pow(2, 10 * (h - 1)) + g : f / 2 * (-Math.pow(2, -10 * --h) + 2) + g
	},
	CLASS_NAME : "OpenLayers.Easing.Expo"
};
OpenLayers.Easing.Quad = {
	easeIn : function (h, g, f, e) {
		return f * (h /= e) * h + g
	},
	easeOut : function (h, g, f, e) {
		return -f * (h /= e) * (h - 2) + g
	},
	easeInOut : function (h, g, f, e) {
		return 1 > (h /= e / 2) ? f / 2 * h * h + g : -f / 2 * (--h * (h - 2) - 1) + g
	},
	CLASS_NAME : "OpenLayers.Easing.Quad"
};
OpenLayers.Projection = OpenLayers.Class({
		proj : null,
		projCode : null,
		titleRegEx : /\+title=[^\+]*/,
		initialize : function (d, c) {
			OpenLayers.Util.extend(this, c);
			this.projCode = d;
			window.Proj4js && (this.proj = new Proj4js.Proj(d))
		},
		getCode : function () {
			return this.proj ? this.proj.srsCode : this.projCode
		},
		getUnits : function () {
			return this.proj ? this.proj.units : null
		},
		toString : function () {
			return this.getCode()
		},
		equals : function (d) {
			var c = !1;
			d && (d instanceof OpenLayers.Projection || (d = new OpenLayers.Projection(d)), window.Proj4js && this.proj.defData && d.proj.defData ? c = this.proj.defData.replace(this.titleRegEx, "") == d.proj.defData.replace(this.titleRegEx, "") : d.getCode && (c = this.getCode(), d = d.getCode(), c = c == d || !!OpenLayers.Projection.transforms[c] && OpenLayers.Projection.transforms[c][d] === OpenLayers.Projection.nullTransform));
			return c
		},
		destroy : function () {
			delete this.proj;
			delete this.projCode
		},
		CLASS_NAME : "OpenLayers.Projection"
	});
OpenLayers.Projection.transforms = {};
OpenLayers.Projection.defaults = {
	"EPSG:4326" : {
		units : "degrees",
		maxExtent : [-180, -90, 180, 90],
		yx : !0
	},
	"CRS:84" : {
		units : "degrees",
		maxExtent : [-180, -90, 180, 90]
	},
	"EPSG:900913" : {
		units : "m",
		maxExtent : [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
	}
};
OpenLayers.Projection.addTransform = function (h, g, f) {
	if (f === OpenLayers.Projection.nullTransform) {
		var e = OpenLayers.Projection.defaults[h];
		e && !OpenLayers.Projection.defaults[g] && (OpenLayers.Projection.defaults[g] = e)
	}
	OpenLayers.Projection.transforms[h] || (OpenLayers.Projection.transforms[h] = {});
	OpenLayers.Projection.transforms[h][g] = f
};
OpenLayers.Projection.transform = function (h, g, f) {
	if (g && f) {
		if (g instanceof OpenLayers.Projection || (g = new OpenLayers.Projection(g)), f instanceof OpenLayers.Projection || (f = new OpenLayers.Projection(f)), g.proj && f.proj) {
			h = Proj4js.transform(g.proj, f.proj, h)
		} else {
			g = g.getCode();
			f = f.getCode();
			var e = OpenLayers.Projection.transforms;
			if (e[g] && e[g][f]) {
				e[g][f](h)
			}
		}
	}
	return h
};
OpenLayers.Projection.nullTransform = function (b) {
	return b
};
(function () {
	function l(a) {
		a.x = 180 * a.x / i;
		a.y = 180 / Math.PI * (2 * Math.atan(Math.exp(a.y / i * Math.PI)) - Math.PI / 2);
		return a
	}
	function k(a) {
		a.x = a.x * i / 180;
		a.y = Math.log(Math.tan((90 + a.y) * Math.PI / 360)) / Math.PI * i;
		return a
	}
	function j(f, e) {
		var d = OpenLayers.Projection.addTransform,
		c = OpenLayers.Projection.nullTransform,
		b,
		a,
		r,
		o,
		g;
		b = 0;
		for (a = e.length; b < a; ++b) {
			r = e[b];
			d(f, r, k);
			d(r, f, l);
			for (g = b + 1; g < a; ++g) {
				o = e[g],
				d(r, o, c),
				d(o, r, c)
			}
		}
	}
	var i = 20037508.34,
	h = ["EPSG:900913", "EPSG:3857", "EPSG:102113", "EPSG:102100"],
	n = ["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"],
	m;
	for (m = h.length - 1; 0 <= m; --m) {
		j(h[m], n)
	}
	for (m = n.length - 1; 0 <= m; --m) {
		j(n[m], h)
	}
})();
OpenLayers.Map = OpenLayers.Class({
		Z_INDEX_BASE : {
			BaseLayer : 100,
			Overlay : 325,
			Feature : 725,
			Popup : 750,
			Control : 1000
		},
		id : null,
		fractionalZoom : !1,
		events : null,
		allOverlays : !1,
		div : null,
		dragging : !1,
		size : null,
		viewPortDiv : null,
		layerContainerOrigin : null,
		layerContainerDiv : null,
		layers : null,
		controls : null,
		popups : null,
		baseLayer : null,
		center : null,
		resolution : null,
		zoom : 0,
		panRatio : 1.5,
		options : null,
		tileSize : null,
		projection : "EPSG:4326",
		units : null,
		resolutions : null,
		maxResolution : null,
		minResolution : null,
		maxScale : null,
		minScale : null,
		maxExtent : null,
		minExtent : null,
		restrictedExtent : null,
		numZoomLevels : 16,
		theme : null,
		displayProjection : null,
		fallThrough : !0,
		panTween : null,
		eventListeners : null,
		panMethod : OpenLayers.Easing.Expo.easeOut,
		panDuration : 50,
		paddingForPopups : null,
		minPx : null,
		maxPx : null,
		initialize : function (j, i) {
			1 === arguments.length && "object" === typeof j && (j = (i = j) && i.div);
			this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH, OpenLayers.Map.TILE_HEIGHT);
			this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15);
			this.theme = OpenLayers._getScriptLocation() + "theme/default/style.css";
			this.options = OpenLayers.Util.extend({}, i);
			OpenLayers.Util.extend(this, i);
			OpenLayers.Util.applyDefaults(this, OpenLayers.Projection.defaults[this.projection instanceof OpenLayers.Projection ? this.projection.projCode : this.projection]);
			this.maxExtent && !(this.maxExtent instanceof OpenLayers.Bounds) && (this.maxExtent = new OpenLayers.Bounds(this.maxExtent));
			this.minExtent && !(this.minExtent instanceof OpenLayers.Bounds) && (this.minExtent = new OpenLayers.Bounds(this.minExtent));
			this.restrictedExtent && !(this.restrictedExtent instanceof OpenLayers.Bounds) && (this.restrictedExtent = new OpenLayers.Bounds(this.restrictedExtent));
			this.center && !(this.center instanceof OpenLayers.LonLat) && (this.center = new OpenLayers.LonLat(this.center));
			this.layers = [];
			this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");
			this.div = OpenLayers.Util.getElement(j);
			this.div || (this.div = document.createElement("div"), this.div.style.height = "1px", this.div.style.width = "1px");
			OpenLayers.Element.addClass(this.div, "olMap");
			var h = this.id + "_OpenLayers_ViewPort";
			this.viewPortDiv = OpenLayers.Util.createDiv(h, null, null, null, "relative", null, "hidden");
			this.viewPortDiv.style.width = "100%";
			this.viewPortDiv.style.height = "100%";
			this.viewPortDiv.className = "olMapViewport";
			this.div.appendChild(this.viewPortDiv);
			this.events = new OpenLayers.Events(this, this.viewPortDiv, null, this.fallThrough, {
					includeXY : !0
				});
			h = this.id + "_OpenLayers_Container";
			this.layerContainerDiv = OpenLayers.Util.createDiv(h);
			this.layerContainerDiv.style.width = "100px";
			this.layerContainerDiv.style.height = "100px";
			this.layerContainerDiv.style.zIndex = this.Z_INDEX_BASE.Popup - 1;
			this.viewPortDiv.appendChild(this.layerContainerDiv);
			this.updateSize();
			if (this.eventListeners instanceof Object) {
				this.events.on(this.eventListeners)
			}
			9 > parseFloat(navigator.appVersion.split("MSIE")[1]) ? this.events.register("resize", this, this.updateSize) : (this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, this), OpenLayers.Event.observe(window, "resize", this.updateSizeDestroy));
			if (this.theme) {
				for (var h = !0, g = document.getElementsByTagName("link"), l = 0, k = g.length; l < k; ++l) {
					if (OpenLayers.Util.isEquivalentUrl(g.item(l).href, this.theme)) {
						h = !1;
						break
					}
				}
				h && (h = document.createElement("link"), h.setAttribute("rel", "stylesheet"), h.setAttribute("type", "text/css"), h.setAttribute("href", this.theme), document.getElementsByTagName("head")[0].appendChild(h))
			}
			null == this.controls && (this.controls = [], null != OpenLayers.Control && (OpenLayers.Control.Navigation ? this.controls.push(new OpenLayers.Control.Navigation) : OpenLayers.Control.TouchNavigation && this.controls.push(new OpenLayers.Control.TouchNavigation), OpenLayers.Control.Zoom ? this.controls.push(new OpenLayers.Control.Zoom) : OpenLayers.Control.PanZoom && this.controls.push(new OpenLayers.Control.PanZoom), OpenLayers.Control.ArgParser && this.controls.push(new OpenLayers.Control.ArgParser), OpenLayers.Control.Attribution && this.controls.push(new OpenLayers.Control.Attribution)));
			l = 0;
			for (k = this.controls.length; l < k; l++) {
				this.addControlToMap(this.controls[l])
			}
			this.popups = [];
			this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
			OpenLayers.Event.observe(window, "unload", this.unloadDestroy);
			i && i.layers && (delete this.center, this.addLayers(i.layers), i.center && !this.getCenter() && this.setCenter(i.center, i.zoom))
		},
		getViewport : function () {
			return this.viewPortDiv
		},
		render : function (b) {
			this.div = OpenLayers.Util.getElement(b);
			OpenLayers.Element.addClass(this.div, "olMap");
			this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
			this.div.appendChild(this.viewPortDiv);
			this.updateSize()
		},
		unloadDestroy : null,
		updateSizeDestroy : null,
		destroy : function () {
			if (!this.unloadDestroy) {
				return !1
			}
			this.panTween && (this.panTween.stop(), this.panTween = null);
			OpenLayers.Event.stopObserving(window, "unload", this.unloadDestroy);
			this.unloadDestroy = null;
			this.updateSizeDestroy ? OpenLayers.Event.stopObserving(window, "resize", this.updateSizeDestroy) : this.events.unregister("resize", this, this.updateSize);
			this.paddingForPopups = null;
			if (null != this.controls) {
				for (var b = this.controls.length - 1; 0 <= b; --b) {
					this.controls[b].destroy()
				}
				this.controls = null
			}
			if (null != this.layers) {
				for (b = this.layers.length - 1; 0 <= b; --b) {
					this.layers[b].destroy(!1)
				}
				this.layers = null
			}
			this.viewPortDiv && this.div.removeChild(this.viewPortDiv);
			this.viewPortDiv = null;
			this.eventListeners && (this.events.un(this.eventListeners), this.eventListeners = null);
			this.events.destroy();
			this.options = this.events = null
		},
		setOptions : function (d) {
			var c = this.minPx && d.restrictedExtent != this.restrictedExtent;
			OpenLayers.Util.extend(this, d);
			c && this.moveTo(this.getCachedCenter(), this.zoom, {
				forceZoomChange : !0
			})
		},
		getTileSize : function () {
			return this.tileSize
		},
		getBy : function (h, g, f) {
			var e = "function" == typeof f.test;
			return OpenLayers.Array.filter(this[h], function (a) {
				return a[g] == f || e && f.test(a[g])
			})
		},
		getLayersBy : function (d, c) {
			return this.getBy("layers", d, c)
		},
		getLayersByName : function (b) {
			return this.getLayersBy("name", b)
		},
		getLayersByClass : function (b) {
			return this.getLayersBy("CLASS_NAME", b)
		},
		getControlsBy : function (d, c) {
			return this.getBy("controls", d, c)
		},
		getControlsByClass : function (b) {
			return this.getControlsBy("CLASS_NAME", b)
		},
		getLayer : function (i) {
			for (var h = null, g = 0, f = this.layers.length; g < f; g++) {
				var j = this.layers[g];
				if (j.id == i) {
					h = j;
					break
				}
			}
			return h
		},
		setLayerZIndex : function (d, c) {
			d.setZIndex(this.Z_INDEX_BASE[d.isBaseLayer ? "BaseLayer" : "Overlay"] + 5 * c)
		},
		resetLayersZIndex : function () {
			for (var d = 0, c = this.layers.length; d < c; d++) {
				this.setLayerZIndex(this.layers[d], d)
			}
		},
		addLayer : function (d) {
			for (var f = 0, e = this.layers.length; f < e; f++) {
				if (this.layers[f] == d) {
					return !1
				}
			}
			if (!1 === this.events.triggerEvent("preaddlayer", {
					layer : d
				})) {
				return !1
			}
			this.allOverlays && (d.isBaseLayer = !1);
			d.div.className = "olLayerDiv";
			d.div.style.overflow = "";
			this.setLayerZIndex(d, this.layers.length);
			d.isFixed ? this.viewPortDiv.appendChild(d.div) : this.layerContainerDiv.appendChild(d.div);
			this.layers.push(d);
			d.setMap(this);
			d.isBaseLayer || this.allOverlays && !this.baseLayer ? null == this.baseLayer ? this.setBaseLayer(d) : d.setVisibility(!1) : d.redraw();
			this.events.triggerEvent("addlayer", {
				layer : d
			});
			d.events.triggerEvent("added", {
				map : this,
				layer : d
			});
			d.afterAdd();
			return !0
		},
		addLayers : function (d) {
			for (var f = 0, e = d.length; f < e; f++) {
				this.addLayer(d[f])
			}
		},
		removeLayer : function (i, h) {
			if (!1 !== this.events.triggerEvent("preremovelayer", {
					layer : i
				})) {
				null == h && (h = !0);
				i.isFixed ? this.viewPortDiv.removeChild(i.div) : this.layerContainerDiv.removeChild(i.div);
				OpenLayers.Util.removeItem(this.layers, i);
				i.removeMap(this);
				i.map = null;
				if (this.baseLayer == i && (this.baseLayer = null, h)) {
					for (var g = 0, f = this.layers.length; g < f; g++) {
						var j = this.layers[g];
						if (j.isBaseLayer || this.allOverlays) {
							this.setBaseLayer(j);
							break
						}
					}
				}
				this.resetLayersZIndex();
				this.events.triggerEvent("removelayer", {
					layer : i
				});
				i.events.triggerEvent("removed", {
					map : this,
					layer : i
				})
			}
		},
		getNumLayers : function () {
			return this.layers.length
		},
		getLayerIndex : function (b) {
			return OpenLayers.Util.indexOf(this.layers, b)
		},
		setLayerIndex : function (h, g) {
			var f = this.getLayerIndex(h);
			0 > g ? g = 0 : g > this.layers.length && (g = this.layers.length);
			if (f != g) {
				this.layers.splice(f, 1);
				this.layers.splice(g, 0, h);
				for (var f = 0, e = this.layers.length; f < e; f++) {
					this.setLayerZIndex(this.layers[f], f)
				}
				this.events.triggerEvent("changelayer", {
					layer : h,
					property : "order"
				});
				this.allOverlays && (0 === g ? this.setBaseLayer(h) : this.baseLayer !== this.layers[0] && this.setBaseLayer(this.layers[0]))
			}
		},
		raiseLayer : function (d, f) {
			var e = this.getLayerIndex(d) + f;
			this.setLayerIndex(d, e)
		},
		setBaseLayer : function (d) {
			if (d != this.baseLayer && -1 != OpenLayers.Util.indexOf(this.layers, d)) {
				var f = this.getCachedCenter(),
				e = OpenLayers.Util.getResolutionFromScale(this.getScale(), d.units);
				null != this.baseLayer && !this.allOverlays && this.baseLayer.setVisibility(!1);
				this.baseLayer = d;
				if (!this.allOverlays || this.baseLayer.visibility) {
					this.baseLayer.setVisibility(!0),
					!1 === this.baseLayer.inRange && this.baseLayer.redraw()
				}
				null != f && (d = this.getZoomForResolution(e || this.resolution, !0), this.setCenter(f, d, !1, !0));
				this.events.triggerEvent("changebaselayer", {
					layer : this.baseLayer
				})
			}
		},
		addControl : function (d, c) {
			this.controls.push(d);
			this.addControlToMap(d, c)
		},
		addControls : function (i, h) {
			for (var g = 1 === arguments.length ? [] : h, f = 0, j = i.length; f < j; f++) {
				this.addControl(i[f], g[f] ? g[f] : null)
			}
		},
		addControlToMap : function (d, f) {
			d.outsideViewport = null != d.div;
			this.displayProjection && !d.displayProjection && (d.displayProjection = this.displayProjection);
			d.setMap(this);
			var e = d.draw(f);
			e && !d.outsideViewport && (e.style.zIndex = this.Z_INDEX_BASE.Control + this.controls.length, this.viewPortDiv.appendChild(e));
			d.autoActivate && d.activate()
		},
		getControl : function (i) {
			for (var h = null, g = 0, f = this.controls.length; g < f; g++) {
				var j = this.controls[g];
				if (j.id == i) {
					h = j;
					break
				}
			}
			return h
		},
		removeControl : function (b) {
			b && b == this.getControl(b.id) && (b.div && b.div.parentNode == this.viewPortDiv && this.viewPortDiv.removeChild(b.div), OpenLayers.Util.removeItem(this.controls, b))
		},
		addPopup : function (d, f) {
			if (f) {
				for (var e = this.popups.length - 1; 0 <= e; --e) {
					this.removePopup(this.popups[e])
				}
			}
			d.map = this;
			this.popups.push(d);
			if (e = d.draw()) {
				e.style.zIndex = this.Z_INDEX_BASE.Popup + this.popups.length,
				this.layerContainerDiv.appendChild(e)
			}
		},
		removePopup : function (d) {
			OpenLayers.Util.removeItem(this.popups, d);
			if (d.div) {
				try {
					this.layerContainerDiv.removeChild(d.div)
				} catch (c) {}

			}
			d.map = null
		},
		getSize : function () {
			var b = null;
			null != this.size && (b = this.size.clone());
			return b
		},
		updateSize : function () {
			var d = this.getCurrentSize();
			if (d && !isNaN(d.h) && !isNaN(d.w)) {
				this.events.clearMouseCache();
				var c = this.getSize();
				null == c && (this.size = c = d);
				if (!d.equals(c)) {
					this.size = d;
					d = 0;
					for (c = this.layers.length; d < c; d++) {
						this.layers[d].onMapResize()
					}
					d = this.getCachedCenter();
					null != this.baseLayer && null != d && (c = this.getZoom(), this.zoom = null, this.setCenter(d, c))
				}
			}
		},
		getCurrentSize : function () {
			var b = new OpenLayers.Size(this.div.clientWidth, this.div.clientHeight);
			if (0 == b.w && 0 == b.h || isNaN(b.w) && isNaN(b.h)) {
				b.w = this.div.offsetWidth,
				b.h = this.div.offsetHeight
			}
			if (0 == b.w && 0 == b.h || isNaN(b.w) && isNaN(b.h)) {
				b.w = parseInt(this.div.style.width),
				b.h = parseInt(this.div.style.height)
			}
			return b
		},
		calculateBounds : function (h, g) {
			var f = null;
			null == h && (h = this.getCachedCenter());
			null == g && (g = this.getResolution());
			if (null != h && null != g) {
				var f = this.size.w * g / 2,
				e = this.size.h * g / 2,
				f = new OpenLayers.Bounds(h.lon - f, h.lat - e, h.lon + f, h.lat + e)
			}
			return f
		},
		getCenter : function () {
			var d = null,
			c = this.getCachedCenter();
			c && (d = c.clone());
			return d
		},
		getCachedCenter : function () {
			!this.center && this.size && (this.center = this.getLonLatFromViewPortPx({
						x : this.size.w / 2,
						y : this.size.h / 2
					}));
			return this.center
		},
		getZoom : function () {
			return this.zoom
		},
		pan : function (h, g, f) {
			f = OpenLayers.Util.applyDefaults(f, {
					animate : !0,
					dragging : !1
				});
			if (f.dragging) {
				(0 != h || 0 != g) && this.moveByPx(h, g)
			} else {
				var e = this.getViewPortPxFromLonLat(this.getCachedCenter());
				h = e.add(h, g);
				if (this.dragging || !h.equals(e)) {
					e = this.getLonLatFromViewPortPx(h),
					f.animate ? this.panTo(e) : (this.moveTo(e), this.dragging && (this.dragging = !1, this.events.triggerEvent("moveend")))
				}
			}
		},
		panTo : function (i) {
			if (this.panMethod && this.getExtent().scale(this.panRatio).containsLonLat(i)) {
				this.panTween || (this.panTween = new OpenLayers.Tween(this.panMethod));
				var h = this.getCachedCenter();
				if (!i.equals(h)) {
					var h = this.getPixelFromLonLat(h),
					g = this.getPixelFromLonLat(i),
					f = 0,
					j = 0;
					this.panTween.start({
						x : 0,
						y : 0
					}, {
						x : g.x - h.x,
						y : g.y - h.y
					}, this.panDuration, {
						callbacks : {
							eachStep : OpenLayers.Function.bind(function (a) {
								this.moveByPx(a.x - f, a.y - j);
								f = Math.round(a.x);
								j = Math.round(a.y)
							}, this),
							done : OpenLayers.Function.bind(function () {
								this.moveTo(i);
								this.dragging = !1;
								this.events.triggerEvent("moveend")
							}, this)
						}
					})
				}
			} else {
				this.setCenter(i)
			}
		},
		setCenter : function (h, g, f, e) {
			this.panTween && this.panTween.stop();
			this.moveTo(h, g, {
				dragging : f,
				forceZoomChange : e
			})
		},
		moveByPx : function (r, q) {
			var p = this.size.w / 2,
			o = this.size.h / 2,
			n = p + r,
			m = o + q,
			l = this.baseLayer.wrapDateLine,
			k = 0,
			i = 0;
			this.restrictedExtent && (k = p, i = o, l = !1);
			r = l || n <= this.maxPx.x - k && n >= this.minPx.x + k ? Math.round(r) : 0;
			q = m <= this.maxPx.y - i && m >= this.minPx.y + i ? Math.round(q) : 0;
			if (r || q) {
				this.dragging || (this.dragging = !0, this.events.triggerEvent("movestart"));
				this.center = null;
				r && (this.layerContainerDiv.style.left = parseInt(this.layerContainerDiv.style.left) - r + "px", this.minPx.x -= r, this.maxPx.x -= r);
				q && (this.layerContainerDiv.style.top = parseInt(this.layerContainerDiv.style.top) - q + "px", this.minPx.y -= q, this.maxPx.y -= q);
				o = 0;
				for (n = this.layers.length; o < n; ++o) {
					if (p = this.layers[o], p.visibility && (p === this.baseLayer || p.inRange)) {
						p.moveByPx(r, q),
						p.events.triggerEvent("move")
					}
				}
				this.events.triggerEvent("move")
			}
		},
		adjustZoom : function (i) {
			var h = this.baseLayer.resolutions,
			g = this.getMaxExtent().getWidth() / this.size.w;
			if (this.getResolutionForZoom(i) > g) {
				for (var f = i | 0, j = h.length; f < j; ++f) {
					if (h[f] <= g) {
						i = f;
						break
					}
				}
			}
			return i
		},
		moveTo : function (l, i, t) {
			null != l && !(l instanceof OpenLayers.LonLat) && (l = new OpenLayers.LonLat(l));
			t || (t = {});
			null != i && (i = parseFloat(i), this.fractionalZoom || (i = Math.round(i)));
			if (this.baseLayer.wrapDateLine) {
				var s = i;
				i = this.adjustZoom(i);
				i !== s && (l = this.getCenter())
			}
			var s = t.dragging || this.dragging,
			r = t.forceZoomChange;
			!this.getCachedCenter() && !this.isValidLonLat(l) && (l = this.maxExtent.getCenterLonLat(), this.center = l.clone());
			if (null != this.restrictedExtent) {
				null == l && (l = this.center);
				null == i && (i = this.getZoom());
				var q = this.getResolutionForZoom(i),
				q = this.calculateBounds(l, q);
				if (!this.restrictedExtent.containsBounds(q)) {
					var p = this.restrictedExtent.getCenterLonLat();
					q.getWidth() > this.restrictedExtent.getWidth() ? l = new OpenLayers.LonLat(p.lon, l.lat) : q.left < this.restrictedExtent.left ? l = l.add(this.restrictedExtent.left - q.left, 0) : q.right > this.restrictedExtent.right && (l = l.add(this.restrictedExtent.right - q.right, 0));
					q.getHeight() > this.restrictedExtent.getHeight() ? l = new OpenLayers.LonLat(l.lon, p.lat) : q.bottom < this.restrictedExtent.bottom ? l = l.add(0, this.restrictedExtent.bottom - q.bottom) : q.top > this.restrictedExtent.top && (l = l.add(0, this.restrictedExtent.top - q.top))
				}
			}
			r = r || this.isValidZoomLevel(i) && i != this.getZoom();
			q = this.isValidLonLat(l) && !l.equals(this.center);
			if (r || q || s) {
				s || this.events.triggerEvent("movestart");
				q && (!r && this.center && this.centerLayerContainer(l), this.center = l.clone());
				l = r ? this.getResolutionForZoom(i) : this.getResolution();
				if (r || null == this.layerContainerOrigin) {
					this.layerContainerOrigin = this.getCachedCenter();
					this.layerContainerDiv.style.left = "0px";
					this.layerContainerDiv.style.top = "0px";
					var q = this.getMaxExtent({
							restricted : !0
						}),
					o = q.getCenterLonLat(),
					p = this.center.lon - o.lon,
					o = o.lat - this.center.lat,
					n = Math.round(q.getWidth() / l),
					m = Math.round(q.getHeight() / l);
					this.minPx = {
						x : (this.size.w - n) / 2 - p / l,
						y : (this.size.h - m) / 2 - o / l
					};
					this.maxPx = {
						x : this.minPx.x + Math.round(q.getWidth() / l),
						y : this.minPx.y + Math.round(q.getHeight() / l)
					}
				}
				r && (this.zoom = i, this.resolution = l);
				l = this.getExtent();
				this.baseLayer.visibility && (this.baseLayer.moveTo(l, r, t.dragging), t.dragging || this.baseLayer.events.triggerEvent("moveend", {
						zoomChanged : r
					}));
				l = this.baseLayer.getExtent();
				for (i = this.layers.length - 1; 0 <= i; --i) {
					q = this.layers[i],
					q !== this.baseLayer && !q.isBaseLayer && (p = q.calculateInRange(), q.inRange != p && ((q.inRange = p) || q.display(!1), this.events.triggerEvent("changelayer", {
								layer : q,
								property : "visibility"
							})), p && q.visibility && (q.moveTo(l, r, t.dragging), t.dragging || q.events.triggerEvent("moveend", {
								zoomChanged : r
							})))
				}
				this.events.triggerEvent("move");
				s || this.events.triggerEvent("moveend");
				if (r) {
					i = 0;
					for (t = this.popups.length; i < t; i++) {
						this.popups[i].updatePosition()
					}
					this.events.triggerEvent("zoomend")
				}
			}
		},
		centerLayerContainer : function (i) {
			var h = this.getViewPortPxFromLonLat(this.layerContainerOrigin),
			g = this.getViewPortPxFromLonLat(i);
			if (null != h && null != g) {
				var f = parseInt(this.layerContainerDiv.style.left);
				i = parseInt(this.layerContainerDiv.style.top);
				var j = Math.round(h.x - g.x),
				h = Math.round(h.y - g.y);
				this.layerContainerDiv.style.left = j + "px";
				this.layerContainerDiv.style.top = h + "px";
				f -= j;
				i -= h;
				this.minPx.x -= f;
				this.maxPx.x -= f;
				this.minPx.y -= i;
				this.maxPx.y -= i
			}
		},
		isValidZoomLevel : function (b) {
			return null != b && 0 <= b && b < this.getNumZoomLevels()
		},
		isValidLonLat : function (d) {
			var c = !1;
			null != d && (c = this.getMaxExtent(), c = c.containsLonLat(d, {
						worldBounds : this.baseLayer.wrapDateLine && c
					}));
			return c
		},
		getProjection : function () {
			var b = this.getProjectionObject();
			return b ? b.getCode() : null
		},
		getProjectionObject : function () {
			var b = null;
			null != this.baseLayer && (b = this.baseLayer.projection);
			return b
		},
		getMaxResolution : function () {
			var b = null;
			null != this.baseLayer && (b = this.baseLayer.maxResolution);
			return b
		},
		getMaxExtent : function (d) {
			var c = null;
			d && d.restricted && this.restrictedExtent ? c = this.restrictedExtent : null != this.baseLayer && (c = this.baseLayer.maxExtent);
			return c
		},
		getNumZoomLevels : function () {
			var b = null;
			null != this.baseLayer && (b = this.baseLayer.numZoomLevels);
			return b
		},
		getExtent : function () {
			var b = null;
			null != this.baseLayer && (b = this.baseLayer.getExtent());
			return b
		},
		getResolution : function () {
			var b = null;
			null != this.baseLayer ? b = this.baseLayer.getResolution() : !0 === this.allOverlays && 0 < this.layers.length && (b = this.layers[0].getResolution());
			return b
		},
		getUnits : function () {
			var b = null;
			null != this.baseLayer && (b = this.baseLayer.units);
			return b
		},
		getScale : function () {
			var b = null;
			null != this.baseLayer && (b = this.getResolution(), b = OpenLayers.Util.getScaleFromResolution(b, this.baseLayer.units));
			return b
		},
		getZoomForExtent : function (d, f) {
			var e = null;
			null != this.baseLayer && (e = this.baseLayer.getZoomForExtent(d, f));
			return e
		},
		getResolutionForZoom : function (d) {
			var c = null;
			this.baseLayer && (c = this.baseLayer.getResolutionForZoom(d));
			return c
		},
		getZoomForResolution : function (d, f) {
			var e = null;
			null != this.baseLayer && (e = this.baseLayer.getZoomForResolution(d, f));
			return e
		},
		zoomTo : function (b) {
			this.isValidZoomLevel(b) && this.setCenter(null, b)
		},
		zoomIn : function () {
			this.zoomTo(this.getZoom() + 1)
		},
		zoomOut : function () {
			this.zoomTo(this.getZoom() - 1)
		},
		zoomToExtent : function (d, f) {
			d instanceof OpenLayers.Bounds || (d = new OpenLayers.Bounds(d));
			var e = d.getCenterLonLat();
			if (this.baseLayer.wrapDateLine) {
				e = this.getMaxExtent();
				for (d = d.clone(); d.right < d.left; ) {
					d.right += e.getWidth()
				}
				e = d.getCenterLonLat().wrapDateLine(e)
			}
			this.setCenter(e, this.getZoomForExtent(d, f))
		},
		zoomToMaxExtent : function (b) {
			b = this.getMaxExtent({
					restricted : b ? b.restricted : !0
				});
			this.zoomToExtent(b)
		},
		zoomToScale : function (i, h) {
			var g = OpenLayers.Util.getResolutionFromScale(i, this.baseLayer.units),
			f = this.size.w * g / 2,
			g = this.size.h * g / 2,
			j = this.getCachedCenter(),
			f = new OpenLayers.Bounds(j.lon - f, j.lat - g, j.lon + f, j.lat + g);
			this.zoomToExtent(f, h)
		},
		getLonLatFromViewPortPx : function (d) {
			var c = null;
			null != this.baseLayer && (c = this.baseLayer.getLonLatFromViewPortPx(d));
			return c
		},
		getViewPortPxFromLonLat : function (d) {
			var c = null;
			null != this.baseLayer && (c = this.baseLayer.getViewPortPxFromLonLat(d));
			return c
		},
		getLonLatFromPixel : function (b) {
			return this.getLonLatFromViewPortPx(b)
		},
		getPixelFromLonLat : function (b) {
			b = this.getViewPortPxFromLonLat(b);
			b.x = Math.round(b.x);
			b.y = Math.round(b.y);
			return b
		},
		getGeodesicPixelSize : function (j) {
			var i = j ? this.getLonLatFromPixel(j) : this.getCachedCenter() || new OpenLayers.LonLat(0, 0),
			h = this.getResolution();
			j = i.add(-h / 2, 0);
			var g = i.add(h / 2, 0),
			l = i.add(0, -h / 2),
			i = i.add(0, h / 2),
			h = new OpenLayers.Projection("EPSG:4326"),
			k = this.getProjectionObject() || h;
			k.equals(h) || (j.transform(k, h), g.transform(k, h), l.transform(k, h), i.transform(k, h));
			return new OpenLayers.Size(OpenLayers.Util.distVincenty(j, g), OpenLayers.Util.distVincenty(l, i))
		},
		getViewPortPxFromLayerPx : function (d) {
			var f = null;
			if (null != d) {
				var f = parseInt(this.layerContainerDiv.style.left),
				e = parseInt(this.layerContainerDiv.style.top),
				f = d.add(f, e)
			}
			return f
		},
		getLayerPxFromViewPortPx : function (d) {
			var f = null;
			if (null != d) {
				var f = -parseInt(this.layerContainerDiv.style.left),
				e = -parseInt(this.layerContainerDiv.style.top),
				f = d.add(f, e);
				if (isNaN(f.x) || isNaN(f.y)) {
					f = null
				}
			}
			return f
		},
		getLonLatFromLayerPx : function (b) {
			b = this.getViewPortPxFromLayerPx(b);
			return this.getLonLatFromViewPortPx(b)
		},
		getLayerPxFromLonLat : function (b) {
			b = this.getPixelFromLonLat(b);
			return this.getLayerPxFromViewPortPx(b)
		},
		CLASS_NAME : "OpenLayers.Map"
	});
OpenLayers.Map.TILE_WIDTH = 256;
OpenLayers.Map.TILE_HEIGHT = 256;
OpenLayers.Layer = OpenLayers.Class({
		id : null,
		name : null,
		div : null,
		opacity : 1,
		alwaysInRange : null,
		RESOLUTION_PROPERTIES : "scales resolutions maxScale minScale maxResolution minResolution numZoomLevels maxZoomLevel".split(" "),
		events : null,
		map : null,
		isBaseLayer : !1,
		alpha : !1,
		displayInLayerSwitcher : !0,
		visibility : !0,
		attribution : null,
		inRange : !1,
		imageSize : null,
		options : null,
		eventListeners : null,
		gutter : 0,
		projection : null,
		units : null,
		scales : null,
		resolutions : null,
		maxExtent : null,
		minExtent : null,
		maxResolution : null,
		minResolution : null,
		numZoomLevels : null,
		minScale : null,
		maxScale : null,
		displayOutsideMaxExtent : !1,
		wrapDateLine : !1,
		metadata : null,
		initialize : function (d, c) {
			this.metadata = {};
			this.addOptions(c);
			this.name = d;
			if (null == this.id && (this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_"), this.div = OpenLayers.Util.createDiv(this.id), this.div.style.width = "100%", this.div.style.height = "100%", this.div.dir = "ltr", this.events = new OpenLayers.Events(this, this.div), this.eventListeners instanceof Object)) {
				this.events.on(this.eventListeners)
			}
		},
		destroy : function (b) {
			null == b && (b = !0);
			null != this.map && this.map.removeLayer(this, b);
			this.options = this.div = this.name = this.map = this.projection = null;
			this.events && (this.eventListeners && this.events.un(this.eventListeners), this.events.destroy());
			this.events = this.eventListeners = null
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer(this.name, this.getOptions()));
			OpenLayers.Util.applyDefaults(b, this);
			b.map = null;
			return b
		},
		getOptions : function () {
			var d = {},
			c;
			for (c in this.options) {
				d[c] = this[c]
			}
			return d
		},
		setName : function (b) {
			b != this.name && (this.name = b, null != this.map && this.map.events.triggerEvent("changelayer", {
					layer : this,
					property : "name"
				}))
		},
		addOptions : function (i, h) {
			null == this.options && (this.options = {});
			i && ("string" == typeof i.projection && (i.projection = new OpenLayers.Projection(i.projection)), i.projection && OpenLayers.Util.applyDefaults(i, OpenLayers.Projection.defaults[i.projection.getCode()]), i.maxExtent && !(i.maxExtent instanceof OpenLayers.Bounds) && (i.maxExtent = new OpenLayers.Bounds(i.maxExtent)), i.minExtent && !(i.minExtent instanceof OpenLayers.Bounds) && (i.minExtent = new OpenLayers.Bounds(i.minExtent)));
			OpenLayers.Util.extend(this.options, i);
			OpenLayers.Util.extend(this, i);
			this.projection && this.projection.getUnits() && (this.units = this.projection.getUnits());
			if (this.map) {
				var g = this.map.getResolution(),
				f = this.RESOLUTION_PROPERTIES.concat(["projection", "units", "minExtent", "maxExtent"]),
				j;
				for (j in i) {
					if (i.hasOwnProperty(j) && 0 <= OpenLayers.Util.indexOf(f, j)) {
						this.initResolutions();
						h && this.map.baseLayer === this && (this.map.setCenter(this.map.getCenter(), this.map.getZoomForResolution(g), !1, !0), this.map.events.triggerEvent("changebaselayer", {
								layer : this
							}));
						break
					}
				}
			}
		},
		onMapResize : function () {},
		redraw : function () {
			var d = !1;
			if (this.map) {
				this.inRange = this.calculateInRange();
				var c = this.getExtent();
				c && (this.inRange && this.visibility) && (this.moveTo(c, !0, !1), this.events.triggerEvent("moveend", {
						zoomChanged : !0
					}), d = !0)
			}
			return d
		},
		moveTo : function () {
			var b = this.visibility;
			this.isBaseLayer || (b = b && this.inRange);
			this.display(b)
		},
		moveByPx : function () {},
		setMap : function (b) {
			null == this.map && (this.map = b, this.maxExtent = this.maxExtent || this.map.maxExtent, this.minExtent = this.minExtent || this.map.minExtent, this.projection = this.projection || this.map.projection, "string" == typeof this.projection && (this.projection = new OpenLayers.Projection(this.projection)), this.units = this.projection.getUnits() || this.units || this.map.units, this.initResolutions(), this.isBaseLayer || (this.inRange = this.calculateInRange(), this.div.style.display = this.visibility && this.inRange ? "" : "none"), this.setTileSize())
		},
		afterAdd : function () {},
		removeMap : function () {},
		getImageSize : function () {
			return this.imageSize || this.tileSize
		},
		setTileSize : function (b) {
			this.tileSize = b = b ? b : this.tileSize ? this.tileSize : this.map.getTileSize();
			this.gutter && (this.imageSize = new OpenLayers.Size(b.w + 2 * this.gutter, b.h + 2 * this.gutter))
		},
		getVisibility : function () {
			return this.visibility
		},
		setVisibility : function (b) {
			b != this.visibility && (this.visibility = b, this.display(b), this.redraw(), null != this.map && this.map.events.triggerEvent("changelayer", {
					layer : this,
					property : "visibility"
				}), this.events.triggerEvent("visibilitychanged"))
		},
		display : function (b) {
			b != ("none" != this.div.style.display) && (this.div.style.display = b && this.calculateInRange() ? "block" : "none")
		},
		calculateInRange : function () {
			var b = !1;
			this.alwaysInRange ? b = !0 : this.map && (b = this.map.getResolution(), b = b >= this.minResolution && b <= this.maxResolution);
			return b
		},
		setIsBaseLayer : function (b) {
			b != this.isBaseLayer && (this.isBaseLayer = b, null != this.map && this.map.events.triggerEvent("changebaselayer", {
					layer : this
				}))
		},
		initResolutions : function () {
			var l,
			k,
			j,
			i = {},
			h = !0;
			l = 0;
			for (k = this.RESOLUTION_PROPERTIES.length; l < k; l++) {
				j = this.RESOLUTION_PROPERTIES[l],
				i[j] = this.options[j],
				h && this.options[j] && (h = !1)
			}
			null == this.alwaysInRange && (this.alwaysInRange = h);
			null == i.resolutions && (i.resolutions = this.resolutionsFromScales(i.scales));
			null == i.resolutions && (i.resolutions = this.calculateResolutions(i));
			if (null == i.resolutions) {
				l = 0;
				for (k = this.RESOLUTION_PROPERTIES.length; l < k; l++) {
					j = this.RESOLUTION_PROPERTIES[l],
					i[j] = null != this.options[j] ? this.options[j] : this.map[j]
				}
				null == i.resolutions && (i.resolutions = this.resolutionsFromScales(i.scales));
				null == i.resolutions && (i.resolutions = this.calculateResolutions(i))
			}
			var n;
			this.options.maxResolution && "auto" !== this.options.maxResolution && (n = this.options.maxResolution);
			this.options.minScale && (n = OpenLayers.Util.getResolutionFromScale(this.options.minScale, this.units));
			var m;
			this.options.minResolution && "auto" !== this.options.minResolution && (m = this.options.minResolution);
			this.options.maxScale && (m = OpenLayers.Util.getResolutionFromScale(this.options.maxScale, this.units));
			i.resolutions && (i.resolutions.sort(function (b, a) {
					return a - b
				}), n || (n = i.resolutions[0]), m || (m = i.resolutions[i.resolutions.length - 1]));
			if (this.resolutions = i.resolutions) {
				k = this.resolutions.length;
				this.scales = Array(k);
				for (l = 0; l < k; l++) {
					this.scales[l] = OpenLayers.Util.getScaleFromResolution(this.resolutions[l], this.units)
				}
				this.numZoomLevels = k
			}
			if (this.minResolution = m) {
				this.maxScale = OpenLayers.Util.getScaleFromResolution(m, this.units)
			}
			if (this.maxResolution = n) {
				this.minScale = OpenLayers.Util.getScaleFromResolution(n, this.units)
			}
		},
		resolutionsFromScales : function (h) {
			if (null != h) {
				var g,
				f,
				e;
				e = h.length;
				g = Array(e);
				for (f = 0; f < e; f++) {
					g[f] = OpenLayers.Util.getResolutionFromScale(h[f], this.units)
				}
				return g
			}
		},
		calculateResolutions : function (j) {
			var i,
			h,
			g = j.maxResolution;
			null != j.minScale ? g = OpenLayers.Util.getResolutionFromScale(j.minScale, this.units) : "auto" == g && null != this.maxExtent && (i = this.map.getSize(), h = this.maxExtent.getWidth() / i.w, i = this.maxExtent.getHeight() / i.h, g = Math.max(h, i));
			h = j.minResolution;
			null != j.maxScale ? h = OpenLayers.Util.getResolutionFromScale(j.maxScale, this.units) : "auto" == j.minResolution && null != this.minExtent && (i = this.map.getSize(), h = this.minExtent.getWidth() / i.w, i = this.minExtent.getHeight() / i.h, h = Math.max(h, i));
			"number" !== typeof g && ("number" !== typeof h && null != this.maxExtent) && (g = this.map.getTileSize(), g = Math.max(this.maxExtent.getWidth() / g.w, this.maxExtent.getHeight() / g.h));
			i = j.maxZoomLevel;
			j = j.numZoomLevels;
			"number" === typeof h && "number" === typeof g && void 0 === j ? j = Math.floor(Math.log(g / h) / Math.log(2)) + 1 : void 0 === j && null != i && (j = i + 1);
			if (!("number" !== typeof j || 0 >= j || "number" !== typeof g && "number" !== typeof h)) {
				i = Array(j);
				var l = 2;
				"number" == typeof h && "number" == typeof g && (l = Math.pow(g / h, 1 / (j - 1)));
				var k;
				if ("number" === typeof g) {
					for (k = 0; k < j; k++) {
						i[k] = g / Math.pow(l, k)
					}
				} else {
					for (k = 0; k < j; k++) {
						i[j - 1 - k] = h * Math.pow(l, k)
					}
				}
				return i
			}
		},
		getResolution : function () {
			var b = this.map.getZoom();
			return this.getResolutionForZoom(b)
		},
		getExtent : function () {
			return this.map.calculateBounds()
		},
		getZoomForExtent : function (d, f) {
			var e = this.map.getSize(),
			e = Math.max(d.getWidth() / e.w, d.getHeight() / e.h);
			return this.getZoomForResolution(e, f)
		},
		getDataExtent : function () {},
		getResolutionForZoom : function (d) {
			d = Math.max(0, Math.min(d, this.resolutions.length - 1));
			if (this.map.fractionalZoom) {
				var f = Math.floor(d),
				e = Math.ceil(d);
				d = this.resolutions[f] - (d - f) * (this.resolutions[f] - this.resolutions[e])
			} else {
				d = this.resolutions[Math.round(d)]
			}
			return d
		},
		getZoomForResolution : function (o, n) {
			var m,
			l;
			if (this.map.fractionalZoom) {
				var k = 0,
				j = this.resolutions[k],
				i = this.resolutions[this.resolutions.length - 1],
				p;
				m = 0;
				for (l = this.resolutions.length; m < l; ++m) {
					if (p = this.resolutions[m], p >= o && (j = p, k = m), p <= o) {
						i = p;
						break
					}
				}
				m = j - i;
				m = 0 < m ? k + (j - o) / m : k
			} else {
				j = Number.POSITIVE_INFINITY;
				m = 0;
				for (l = this.resolutions.length; m < l; m++) {
					if (n) {
						k = Math.abs(this.resolutions[m] - o);
						if (k > j) {
							break
						}
						j = k
					} else {
						if (this.resolutions[m] < o) {
							break
						}
					}
				}
				m = Math.max(0, m - 1)
			}
			return m
		},
		getLonLatFromViewPortPx : function (h) {
			var g = null,
			f = this.map;
			if (null != h && f.minPx) {
				var g = f.getResolution(),
				e = f.getMaxExtent({
						restricted : !0
					}),
				g = new OpenLayers.LonLat((h.x - f.minPx.x) * g + e.left, (f.minPx.y - h.y) * g + e.top);
				this.wrapDateLine && (g = g.wrapDateLine(this.maxExtent))
			}
			return g
		},
		getViewPortPxFromLonLat : function (d, f) {
			var e = null;
			null != d && (f = f || this.map.getResolution(), e = this.map.calculateBounds(null, f), e = new OpenLayers.Pixel(1 / f * (d.lon - e.left), 1 / f * (e.top - d.lat)));
			return e
		},
		setOpacity : function (j) {
			if (j != this.opacity) {
				this.opacity = j;
				for (var i = this.div.childNodes, h = 0, g = i.length; h < g; ++h) {
					var l = i[h].firstChild || i[h],
					k = i[h].lastChild;
					k && "iframe" === k.nodeName.toLowerCase() && (l = k.parentNode);
					OpenLayers.Util.modifyDOMElement(l, null, null, null, null, null, null, j)
				}
				null != this.map && this.map.events.triggerEvent("changelayer", {
					layer : this,
					property : "opacity"
				})
			}
		},
		getZIndex : function () {
			return this.div.style.zIndex
		},
		setZIndex : function (b) {
			this.div.style.zIndex = b
		},
		adjustBounds : function (d) {
			if (this.gutter) {
				var c = this.gutter * this.map.getResolution();
				d = new OpenLayers.Bounds(d.left - c, d.bottom - c, d.right + c, d.top + c)
			}
			this.wrapDateLine && (c = {
					rightTolerance : this.getResolution(),
					leftTolerance : this.getResolution()
				}, d = d.wrapDateLine(this.maxExtent, c));
			return d
		},
		CLASS_NAME : "OpenLayers.Layer"
	});
OpenLayers.Layer.SphericalMercator = {
	getExtent : function () {
		var b = null;
		return b = this.sphericalMercator ? this.map.calculateBounds() : OpenLayers.Layer.FixedZoomLevels.prototype.getExtent.apply(this)
	},
	getLonLatFromViewPortPx : function (b) {
		return OpenLayers.Layer.prototype.getLonLatFromViewPortPx.apply(this, arguments)
	},
	getViewPortPxFromLonLat : function (b) {
		return OpenLayers.Layer.prototype.getViewPortPxFromLonLat.apply(this, arguments)
	},
	initMercatorParameters : function () {
		this.RESOLUTIONS = [];
		for (var b = 0; b <= this.MAX_ZOOM_LEVEL; ++b) {
			this.RESOLUTIONS[b] = 156543.03390625 / Math.pow(2, b)
		}
		this.units = "m";
		this.projection = this.projection || "EPSG:900913"
	},
	forwardMercator : function () {
		var d = new OpenLayers.Projection("EPSG:4326"),
		c = new OpenLayers.Projection("EPSG:900913");
		return function (a, f) {
			var b = OpenLayers.Projection.transform({
					x : a,
					y : f
				}, d, c);
			return new OpenLayers.LonLat(b.x, b.y)
		}
	}
	(),
	inverseMercator : function () {
		var d = new OpenLayers.Projection("EPSG:4326"),
		c = new OpenLayers.Projection("EPSG:900913");
		return function (a, f) {
			var b = OpenLayers.Projection.transform({
					x : a,
					y : f
				}, c, d);
			return new OpenLayers.LonLat(b.x, b.y)
		}
	}
	()
};
OpenLayers.Layer.EventPane = OpenLayers.Class(OpenLayers.Layer, {
		smoothDragPan : !0,
		isBaseLayer : !0,
		isFixed : !0,
		pane : null,
		mapObject : null,
		initialize : function (d, c) {
			OpenLayers.Layer.prototype.initialize.apply(this, arguments);
			null == this.pane && (this.pane = OpenLayers.Util.createDiv(this.div.id + "_EventPane"))
		},
		destroy : function () {
			this.pane = this.mapObject = null;
			OpenLayers.Layer.prototype.destroy.apply(this, arguments)
		},
		setMap : function (b) {
			OpenLayers.Layer.prototype.setMap.apply(this, arguments);
			this.pane.style.zIndex = parseInt(this.div.style.zIndex) + 1;
			this.pane.style.display = this.div.style.display;
			this.pane.style.width = "100%";
			this.pane.style.height = "100%";
			"msie" == OpenLayers.BROWSER_NAME && (this.pane.style.background = "url(" + OpenLayers.Util.getImageLocation("blank.gif") + ")");
			this.isFixed ? this.map.viewPortDiv.appendChild(this.pane) : this.map.layerContainerDiv.appendChild(this.pane);
			this.loadMapObject();
			null == this.mapObject && this.loadWarningMessage()
		},
		removeMap : function (b) {
			this.pane && this.pane.parentNode && this.pane.parentNode.removeChild(this.pane);
			OpenLayers.Layer.prototype.removeMap.apply(this, arguments)
		},
		loadWarningMessage : function () {
			this.div.style.backgroundColor = "darkblue";
			var d = this.map.getSize(),
			f = Math.min(d.w, 300),
			e = Math.min(d.h, 200),
			f = new OpenLayers.Size(f, e),
			d = (new OpenLayers.Pixel(d.w / 2, d.h / 2)).add(-f.w / 2, -f.h / 2),
			d = OpenLayers.Util.createDiv(this.name + "_warning", d, f, null, null, null, "auto");
			d.style.padding = "7px";
			d.style.backgroundColor = "yellow";
			d.innerHTML = this.getWarningHTML();
			this.div.appendChild(d)
		},
		getWarningHTML : function () {
			return ""
		},
		display : function (b) {
			OpenLayers.Layer.prototype.display.apply(this, arguments);
			this.pane.style.display = this.div.style.display
		},
		setZIndex : function (b) {
			OpenLayers.Layer.prototype.setZIndex.apply(this, arguments);
			this.pane.style.zIndex = parseInt(this.div.style.zIndex) + 1
		},
		moveByPx : function (d, c) {
			OpenLayers.Layer.prototype.moveByPx.apply(this, arguments);
			this.dragPanMapObject ? this.dragPanMapObject(d, -c) : this.moveTo(this.map.getCachedCenter())
		},
		moveTo : function (l, k, j) {
			OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
			if (null != this.mapObject) {
				var i = this.map.getCenter(),
				h = this.map.getZoom();
				if (null != i) {
					var n = this.getMapObjectCenter(),
					n = this.getOLLonLatFromMapObjectLonLat(n),
					m = this.getMapObjectZoom(),
					m = this.getOLZoomFromMapObjectZoom(m);
					if (!i.equals(n) || h != m) {
						!k && n && this.dragPanMapObject && this.smoothDragPan ? (h = this.map.getViewPortPxFromLonLat(n), i = this.map.getViewPortPxFromLonLat(i), this.dragPanMapObject(i.x - h.x, h.y - i.y)) : (i = this.getMapObjectLonLatFromOLLonLat(i), h = this.getMapObjectZoomFromOLZoom(h), this.setMapObjectCenter(i, h, j))
					}
				}
			}
		},
		getLonLatFromViewPortPx : function (d) {
			var c = null;
			null != this.mapObject && null != this.getMapObjectCenter() && (d = this.getMapObjectPixelFromOLPixel(d), d = this.getMapObjectLonLatFromMapObjectPixel(d), c = this.getOLLonLatFromMapObjectLonLat(d));
			return c
		},
		getViewPortPxFromLonLat : function (d) {
			var c = null;
			null != this.mapObject && null != this.getMapObjectCenter() && (d = this.getMapObjectLonLatFromOLLonLat(d), d = this.getMapObjectPixelFromMapObjectLonLat(d), c = this.getOLPixelFromMapObjectPixel(d));
			return c
		},
		getOLLonLatFromMapObjectLonLat : function (d) {
			var c = null;
			null != d && (c = this.getLongitudeFromMapObjectLonLat(d), d = this.getLatitudeFromMapObjectLonLat(d), c = new OpenLayers.LonLat(c, d));
			return c
		},
		getMapObjectLonLatFromOLLonLat : function (d) {
			var c = null;
			null != d && (c = this.getMapObjectLonLatFromLonLat(d.lon, d.lat));
			return c
		},
		getOLPixelFromMapObjectPixel : function (d) {
			var c = null;
			null != d && (c = this.getXFromMapObjectPixel(d), d = this.getYFromMapObjectPixel(d), c = new OpenLayers.Pixel(c, d));
			return c
		},
		getMapObjectPixelFromOLPixel : function (d) {
			var c = null;
			null != d && (c = this.getMapObjectPixelFromXY(d.x, d.y));
			return c
		},
		CLASS_NAME : "OpenLayers.Layer.EventPane"
	});
OpenLayers.Layer.FixedZoomLevels = OpenLayers.Class({
		initialize : function () {},
		initResolutions : function () {
			for (var h = ["minZoomLevel", "maxZoomLevel", "numZoomLevels"], g = 0, f = h.length; g < f; g++) {
				var e = h[g];
				this[e] = null != this.options[e] ? this.options[e] : this.map[e]
			}
			if (null == this.minZoomLevel || this.minZoomLevel < this.MIN_ZOOM_LEVEL) {
				this.minZoomLevel = this.MIN_ZOOM_LEVEL
			}
			h = this.MAX_ZOOM_LEVEL - this.minZoomLevel + 1;
			g = null == this.options.numZoomLevels && null != this.options.maxZoomLevel || null == this.numZoomLevels && null != this.maxZoomLevel ? this.maxZoomLevel - this.minZoomLevel + 1 : this.numZoomLevels;
			this.numZoomLevels = null != g ? Math.min(g, h) : h;
			this.maxZoomLevel = this.minZoomLevel + this.numZoomLevels - 1;
			if (null != this.RESOLUTIONS) {
				h = 0;
				this.resolutions = [];
				for (g = this.minZoomLevel; g <= this.maxZoomLevel; g++) {
					this.resolutions[h++] = this.RESOLUTIONS[g]
				}
				this.maxResolution = this.resolutions[0];
				this.minResolution = this.resolutions[this.resolutions.length - 1]
			}
		},
		getResolution : function () {
			if (null != this.resolutions) {
				return OpenLayers.Layer.prototype.getResolution.apply(this, arguments)
			}
			var d = null,
			f = this.map.getSize(),
			e = this.getExtent();
			null != f && null != e && (d = Math.max(e.getWidth() / f.w, e.getHeight() / f.h));
			return d
		},
		getExtent : function () {
			var d = this.map.getSize(),
			c = this.getLonLatFromViewPortPx({
					x : 0,
					y : 0
				}),
			d = this.getLonLatFromViewPortPx({
					x : d.w,
					y : d.h
				});
			return null != c && null != d ? new OpenLayers.Bounds(c.lon, d.lat, d.lon, c.lat) : null
		},
		getZoomForResolution : function (d) {
			if (null != this.resolutions) {
				return OpenLayers.Layer.prototype.getZoomForResolution.apply(this, arguments)
			}
			var c = OpenLayers.Layer.prototype.getExtent.apply(this, []);
			return this.getZoomForExtent(c)
		},
		getOLZoomFromMapObjectZoom : function (d) {
			var c = null;
			null != d && (c = d - this.minZoomLevel, this.map.baseLayer !== this && (c = this.map.baseLayer.getZoomForResolution(this.getResolutionForZoom(c))));
			return c
		},
		getMapObjectZoomFromOLZoom : function (d) {
			var c = null;
			null != d && (c = d + this.minZoomLevel, this.map.baseLayer !== this && (c = this.getZoomForResolution(this.map.baseLayer.getResolutionForZoom(c))));
			return c
		},
		CLASS_NAME : "OpenLayers.Layer.FixedZoomLevels"
	});
OpenLayers.Layer.Google = OpenLayers.Class(OpenLayers.Layer.EventPane, OpenLayers.Layer.FixedZoomLevels, {
		MIN_ZOOM_LEVEL : 0,
		MAX_ZOOM_LEVEL : 21,
		RESOLUTIONS : [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.00002145767211914062, 0.00001072883605957031, 0.00000536441802978515, 0.00000268220901489257, 0.000001341104507446289, 6.705522537231445e-7],
		type : null,
		wrapDateLine : !0,
		sphericalMercator : !1,
		version : null,
		initialize : function (d, f) {
			f = f || {};
			f.version || (f.version = "function" === typeof GMap2 ? "2" : "3");
			var e = OpenLayers.Layer.Google["v" + f.version.replace(/\./g, "_")];
			if (e) {
				OpenLayers.Util.applyDefaults(f, e)
			} else {
				throw "Unsupported Google Maps API version: " + f.version
			}
			OpenLayers.Util.applyDefaults(f, e.DEFAULTS);
			f.maxExtent && (f.maxExtent = f.maxExtent.clone());
			OpenLayers.Layer.EventPane.prototype.initialize.apply(this, [d, f]);
			OpenLayers.Layer.FixedZoomLevels.prototype.initialize.apply(this, [d, f]);
			this.sphericalMercator && (OpenLayers.Util.extend(this, OpenLayers.Layer.SphericalMercator), this.initMercatorParameters())
		},
		clone : function () {
			return new OpenLayers.Layer.Google(this.name, this.getOptions())
		},
		setVisibility : function (d) {
			var c = null == this.opacity ? 1 : this.opacity;
			OpenLayers.Layer.EventPane.prototype.setVisibility.apply(this, arguments);
			this.setOpacity(c)
		},
		display : function (b) {
			this._dragging || this.setGMapVisibility(b);
			OpenLayers.Layer.EventPane.prototype.display.apply(this, arguments)
		},
		moveTo : function (d, f, e) {
			this._dragging = e;
			OpenLayers.Layer.EventPane.prototype.moveTo.apply(this, arguments);
			delete this._dragging
		},
		setOpacity : function (d) {
			d !== this.opacity && (null != this.map && this.map.events.triggerEvent("changelayer", {
					layer : this,
					property : "opacity"
				}), this.opacity = d);
			if (this.getVisibility()) {
				var c = this.getMapContainer();
				OpenLayers.Util.modifyDOMElement(c, null, null, null, null, null, null, d)
			}
		},
		destroy : function () {
			if (this.map) {
				this.setGMapVisibility(!1);
				var b = OpenLayers.Layer.Google.cache[this.map.id];
				b && 1 >= b.count && this.removeGMapElements()
			}
			OpenLayers.Layer.EventPane.prototype.destroy.apply(this, arguments)
		},
		removeGMapElements : function () {
			var d = OpenLayers.Layer.Google.cache[this.map.id];
			if (d) {
				var c = this.mapObject && this.getMapContainer();
				c && c.parentNode && c.parentNode.removeChild(c);
				(c = d.termsOfUse) && c.parentNode && c.parentNode.removeChild(c);
				(d = d.poweredBy) && d.parentNode && d.parentNode.removeChild(d)
			}
		},
		removeMap : function (d) {
			this.visibility && this.mapObject && this.setGMapVisibility(!1);
			var c = OpenLayers.Layer.Google.cache[d.id];
			c && (1 >= c.count ? (this.removeGMapElements(), delete OpenLayers.Layer.Google.cache[d.id]) : --c.count);
			delete this.termsOfUse;
			delete this.poweredBy;
			delete this.mapObject;
			delete this.dragObject;
			OpenLayers.Layer.EventPane.prototype.removeMap.apply(this, arguments)
		},
		getOLBoundsFromMapObjectBounds : function (d) {
			var c = null;
			null != d && (c = d.getSouthWest(), d = d.getNorthEast(), this.sphericalMercator ? (c = this.forwardMercator(c.lng(), c.lat()), d = this.forwardMercator(d.lng(), d.lat())) : (c = new OpenLayers.LonLat(c.lng(), c.lat()), d = new OpenLayers.LonLat(d.lng(), d.lat())), c = new OpenLayers.Bounds(c.lon, c.lat, d.lon, d.lat));
			return c
		},
		getWarningHTML : function () {
			return OpenLayers.i18n("googleWarning")
		},
		getMapObjectCenter : function () {
			return this.mapObject.getCenter()
		},
		getMapObjectZoom : function () {
			return this.mapObject.getZoom()
		},
		getLongitudeFromMapObjectLonLat : function (b) {
			return this.sphericalMercator ? this.forwardMercator(b.lng(), b.lat()).lon : b.lng()
		},
		getLatitudeFromMapObjectLonLat : function (b) {
			return this.sphericalMercator ? this.forwardMercator(b.lng(), b.lat()).lat : b.lat()
		},
		getXFromMapObjectPixel : function (b) {
			return b.x
		},
		getYFromMapObjectPixel : function (b) {
			return b.y
		},
		CLASS_NAME : "OpenLayers.Layer.Google"
	});
OpenLayers.Layer.Google.cache = {};
OpenLayers.Layer.Google.v2 = {
	termsOfUse : null,
	poweredBy : null,
	dragObject : null,
	loadMapObject : function () {
		this.type || (this.type = G_NORMAL_MAP);
		var j,
		i,
		h,
		g = OpenLayers.Layer.Google.cache[this.map.id];
		if (g) {
			j = g.mapObject,
			i = g.termsOfUse,
			h = g.poweredBy,
			++g.count
		} else {
			var g = this.map.viewPortDiv,
			l = document.createElement("div");
			l.id = this.map.id + "_GMap2Container";
			l.style.position = "absolute";
			l.style.width = "100%";
			l.style.height = "100%";
			g.appendChild(l);
			try {
				j = new GMap2(l),
				i = l.lastChild,
				g.appendChild(i),
				i.style.zIndex = "1100",
				i.style.right = "",
				i.style.bottom = "",
				i.className = "olLayerGoogleCopyright",
				h = l.lastChild,
				g.appendChild(h),
				h.style.zIndex = "1100",
				h.style.right = "",
				h.style.bottom = "",
				h.className = "olLayerGooglePoweredBy gmnoprint"
			} catch (k) {
				throw k
			}
			OpenLayers.Layer.Google.cache[this.map.id] = {
				mapObject : j,
				termsOfUse : i,
				poweredBy : h,
				count : 1
			}
		}
		this.mapObject = j;
		this.termsOfUse = i;
		this.poweredBy = h;
		-1 === OpenLayers.Util.indexOf(this.mapObject.getMapTypes(), this.type) && this.mapObject.addMapType(this.type);
		"function" == typeof j.getDragObject ? this.dragObject = j.getDragObject() : this.dragPanMapObject = null;
		!1 === this.isBaseLayer && this.setGMapVisibility("none" !== this.div.style.display)
	},
	onMapResize : function () {
		if (this.visibility && this.mapObject.isLoaded()) {
			this.mapObject.checkResize()
		} else {
			if (!this._resized) {
				var d = this,
				c = GEvent.addListener(this.mapObject, "load", function () {
						GEvent.removeListener(c);
						delete d._resized;
						d.mapObject.checkResize();
						d.moveTo(d.map.getCenter(), d.map.getZoom())
					})
			}
			this._resized = !0
		}
	},
	setGMapVisibility : function (d) {
		var f = OpenLayers.Layer.Google.cache[this.map.id];
		if (f) {
			var e = this.mapObject.getContainer();
			!0 === d ? (this.mapObject.setMapType(this.type), e.style.display = "", this.termsOfUse.style.left = "", this.termsOfUse.style.display = "", this.poweredBy.style.display = "", f.displayed = this.id) : (f.displayed === this.id && delete f.displayed, f.displayed || (e.style.display = "none", this.termsOfUse.style.display = "none", this.termsOfUse.style.left = "-9999px", this.poweredBy.style.display = "none"))
		}
	},
	getMapContainer : function () {
		return this.mapObject.getContainer()
	},
	getMapObjectBoundsFromOLBounds : function (d) {
		var c = null;
		null != d && (c = this.sphericalMercator ? this.inverseMercator(d.bottom, d.left) : new OpenLayers.LonLat(d.bottom, d.left), d = this.sphericalMercator ? this.inverseMercator(d.top, d.right) : new OpenLayers.LonLat(d.top, d.right), c = new GLatLngBounds(new GLatLng(c.lat, c.lon), new GLatLng(d.lat, d.lon)));
		return c
	},
	setMapObjectCenter : function (d, c) {
		this.mapObject.setCenter(d, c)
	},
	dragPanMapObject : function (d, c) {
		this.dragObject.moveBy(new GSize(-d, c))
	},
	getMapObjectLonLatFromMapObjectPixel : function (b) {
		return this.mapObject.fromContainerPixelToLatLng(b)
	},
	getMapObjectPixelFromMapObjectLonLat : function (b) {
		return this.mapObject.fromLatLngToContainerPixel(b)
	},
	getMapObjectZoomFromMapObjectBounds : function (b) {
		return this.mapObject.getBoundsZoomLevel(b)
	},
	getMapObjectLonLatFromLonLat : function (d, f) {
		var e;
		this.sphericalMercator ? (e = this.inverseMercator(d, f), e = new GLatLng(e.lat, e.lon)) : e = new GLatLng(f, d);
		return e
	},
	getMapObjectPixelFromXY : function (d, c) {
		return new GPoint(d, c)
	}
};
OpenLayers.Format.XML = OpenLayers.Class(OpenLayers.Format, {
		namespaces : null,
		namespaceAlias : null,
		defaultPrefix : null,
		readers : {},
		writers : {},
		xmldom : null,
		initialize : function (d) {
			window.ActiveXObject && (this.xmldom = new ActiveXObject("Microsoft.XMLDOM"));
			OpenLayers.Format.prototype.initialize.apply(this, [d]);
			this.namespaces = OpenLayers.Util.extend({}, this.namespaces);
			this.namespaceAlias = {};
			for (var c in this.namespaces) {
				this.namespaceAlias[this.namespaces[c]] = c
			}
		},
		destroy : function () {
			this.xmldom = null;
			OpenLayers.Format.prototype.destroy.apply(this, arguments)
		},
		setNamespace : function (d, c) {
			this.namespaces[d] = c;
			this.namespaceAlias[c] = d
		},
		read : function (d) {
			var c = d.indexOf("<");
			0 < c && (d = d.substring(c));
			c = OpenLayers.Util.Try(OpenLayers.Function.bind(function () {
						var a;
						a = window.ActiveXObject && !this.xmldom ? new ActiveXObject("Microsoft.XMLDOM") : this.xmldom;
						a.loadXML(d);
						return a
					}, this), function () {
					return (new DOMParser).parseFromString(d, "text/xml")
				}, function () {
					var a = new XMLHttpRequest;
					a.open("GET", "data:text/xml;charset=utf-8," + encodeURIComponent(d), !1);
					a.overrideMimeType && a.overrideMimeType("text/xml");
					a.send(null);
					return a.responseXML
				});
			this.keepData && (this.data = c);
			return c
		},
		write : function (d) {
			if (this.xmldom) {
				d = d.xml
			} else {
				var f = new XMLSerializer;
				if (1 == d.nodeType) {
					var e = document.implementation.createDocument("", "", null);
					e.importNode && (d = e.importNode(d, !0));
					e.appendChild(d);
					d = f.serializeToString(e)
				} else {
					d = f.serializeToString(d)
				}
			}
			return d
		},
		createElementNS : function (d, c) {
			return this.xmldom ? "string" == typeof d ? this.xmldom.createNode(1, c, d) : this.xmldom.createNode(1, c, "") : document.createElementNS(d, c)
		},
		createTextNode : function (b) {
			"string" !== typeof b && (b = String(b));
			return this.xmldom ? this.xmldom.createTextNode(b) : document.createTextNode(b)
		},
		getElementsByTagNameNS : function (o, n, m) {
			var l = [];
			if (o.getElementsByTagNameNS) {
				l = o.getElementsByTagNameNS(n, m)
			} else {
				o = o.getElementsByTagName("*");
				for (var k, j, i = 0, p = o.length; i < p; ++i) {
					if (k = o[i], j = k.prefix ? k.prefix + ":" + m : m, "*" == m || j == k.nodeName) {
						("*" == n || n == k.namespaceURI) && l.push(k)
					}
				}
			}
			return l
		},
		getAttributeNodeNS : function (o, n, m) {
			var l = null;
			if (o.getAttributeNodeNS) {
				l = o.getAttributeNodeNS(n, m)
			} else {
				o = o.attributes;
				for (var k, j, i = 0, p = o.length; i < p; ++i) {
					if (k = o[i], k.namespaceURI == n && (j = k.prefix ? k.prefix + ":" + m : m, j == k.nodeName)) {
						l = k;
						break
					}
				}
			}
			return l
		},
		getAttributeNS : function (h, g, f) {
			var e = "";
			if (h.getAttributeNS) {
				e = h.getAttributeNS(g, f) || ""
			} else {
				if (h = this.getAttributeNodeNS(h, g, f)) {
					e = h.nodeValue
				}
			}
			return e
		},
		getChildValue : function (h, g) {
			var f = g || "";
			if (h) {
				for (var e = h.firstChild; e; e = e.nextSibling) {
					switch (e.nodeType) {
					case 3:
					case 4:
						f += e.nodeValue
					}
				}
			}
			return f
		},
		isSimpleContent : function (d) {
			var c = !0;
			for (d = d.firstChild; d; d = d.nextSibling) {
				if (1 === d.nodeType) {
					c = !1;
					break
				}
			}
			return c
		},
		contentType : function (h) {
			var g = !1,
			f = !1,
			e = OpenLayers.Format.XML.CONTENT_TYPE.EMPTY;
			for (h = h.firstChild; h; h = h.nextSibling) {
				switch (h.nodeType) {
				case 1:
					f = !0;
					break;
				case 8:
					break;
				default:
					g = !0
				}
				if (f && g) {
					break
				}
			}
			if (f && g) {
				e = OpenLayers.Format.XML.CONTENT_TYPE.MIXED
			} else {
				if (f) {
					return OpenLayers.Format.XML.CONTENT_TYPE.COMPLEX
				}
				if (g) {
					return OpenLayers.Format.XML.CONTENT_TYPE.SIMPLE
				}
			}
			return e
		},
		hasAttributeNS : function (h, g, f) {
			var e = !1;
			return e = h.hasAttributeNS ? h.hasAttributeNS(g, f) : !!this.getAttributeNodeNS(h, g, f)
		},
		setAttributeNS : function (h, g, f, e) {
			if (h.setAttributeNS) {
				h.setAttributeNS(g, f, e)
			} else {
				if (this.xmldom) {
					g ? (g = h.ownerDocument.createNode(2, f, g), g.nodeValue = e, h.setAttributeNode(g)) : h.setAttribute(f, e)
				} else {
					throw "setAttributeNS not implemented"
				}
			}
		},
		createElementNSPlus : function (h, g) {
			g = g || {};
			var f = g.uri || this.namespaces[g.prefix];
			f || (f = h.indexOf(":"), f = this.namespaces[h.substring(0, f)]);
			f || (f = this.namespaces[this.defaultPrefix]);
			f = this.createElementNS(f, h);
			g.attributes && this.setAttributes(f, g.attributes);
			var e = g.value;
			null != e && f.appendChild(this.createTextNode(e));
			return f
		},
		setAttributes : function (i, h) {
			var g,
			f,
			j;
			for (j in h) {
				null != h[j] && h[j].toString && (g = h[j].toString(), f = this.namespaces[j.substring(0, j.indexOf(":"))] || null, this.setAttributeNS(i, f, j, g))
			}
		},
		readNode : function (h, g) {
			g || (g = {});
			var f = this.readers[h.namespaceURI ? this.namespaceAlias[h.namespaceURI] : this.defaultPrefix];
			if (f) {
				var e = h.localName || h.nodeName.split(":").pop();
				(f = f[e] || f["*"]) && f.apply(this, [h, g])
			}
			return g
		},
		readChildNodes : function (j, i) {
			i || (i = {});
			for (var h = j.childNodes, g, l = 0, k = h.length; l < k; ++l) {
				g = h[l],
				1 == g.nodeType && this.readNode(g, i)
			}
			return i
		},
		writeNode : function (i, h, g) {
			var f,
			j = i.indexOf(":");
			0 < j ? (f = i.substring(0, j), i = i.substring(j + 1)) : f = g ? this.namespaceAlias[g.namespaceURI] : this.defaultPrefix;
			h = this.writers[f][i].apply(this, [h]);
			g && g.appendChild(h);
			return h
		},
		getChildEl : function (d, f, e) {
			return d && this.getThisOrNextEl(d.firstChild, f, e)
		},
		getNextEl : function (d, f, e) {
			return d && this.getThisOrNextEl(d.nextSibling, f, e)
		},
		getThisOrNextEl : function (d, f, e) {
			d : for (; d; d = d.nextSibling) {
				switch (d.nodeType) {
				case 1:
					if ((!f || f === (d.localName || d.nodeName.split(":").pop())) && (!e || e === d.namespaceURI)) {
						break d
					}
					d = null;
					break d;
				case 3:
					if (/^\s*$/.test(d.nodeValue)) {
						break
					}
				case 4:
				case 6:
				case 12:
				case 10:
				case 11:
					d = null;
					break d
				}
			}
			return d || null
		},
		lookupNamespaceURI : function (i, h) {
			var g = null;
			if (i) {
				if (i.lookupNamespaceURI) {
					g = i.lookupNamespaceURI(h)
				} else {
					i : switch (i.nodeType) {
					case 1:
						if (null !== i.namespaceURI && i.prefix === h) {
							g = i.namespaceURI;
							break i
						}
						if (g = i.attributes.length) {
							for (var f, j = 0; j < g; ++j) {
								if (f = i.attributes[j], "xmlns" === f.prefix && f.name === "xmlns:" + h) {
									g = f.value || null;
									break i
								} else {
									if ("xmlns" === f.name && null === h) {
										g = f.value || null;
										break i
									}
								}
							}
						}
						g = this.lookupNamespaceURI(i.parentNode, h);
						break i;
					case 2:
						g = this.lookupNamespaceURI(i.ownerElement, h);
						break i;
					case 9:
						g = this.lookupNamespaceURI(i.documentElement, h);
						break i;
					case 6:
					case 12:
					case 10:
					case 11:
						break i;
					default:
						g = this.lookupNamespaceURI(i.parentNode, h)
					}
				}
			}
			return g
		},
		getXMLDoc : function () {
			!OpenLayers.Format.XML.document && !this.xmldom && (document.implementation && document.implementation.createDocument ? OpenLayers.Format.XML.document = document.implementation.createDocument("", "", null) : !this.xmldom && window.ActiveXObject && (this.xmldom = new ActiveXObject("Microsoft.XMLDOM")));
			return OpenLayers.Format.XML.document || this.xmldom
		},
		CLASS_NAME : "OpenLayers.Format.XML"
	});
OpenLayers.Format.XML.CONTENT_TYPE = {
	EMPTY : 0,
	SIMPLE : 1,
	COMPLEX : 2,
	MIXED : 3
};
OpenLayers.Format.XML.lookupNamespaceURI = OpenLayers.Function.bind(OpenLayers.Format.XML.prototype.lookupNamespaceURI, OpenLayers.Format.XML.prototype);
OpenLayers.Format.XML.document = null;
OpenLayers.Format.WFST = function (d) {
	d = OpenLayers.Util.applyDefaults(d, OpenLayers.Format.WFST.DEFAULTS);
	var c = OpenLayers.Format.WFST["v" + d.version.replace(/\./g, "_")];
	if (!c) {
		throw "Unsupported WFST version: " + d.version
	}
	return new c(d)
};
OpenLayers.Format.WFST.DEFAULTS = {
	version : "1.0.0"
};
OpenLayers.Format.WFST.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance",
			wfs : "http://www.opengis.net/wfs",
			gml : "http://www.opengis.net/gml",
			ogc : "http://www.opengis.net/ogc",
			ows : "http://www.opengis.net/ows"
		},
		defaultPrefix : "wfs",
		version : null,
		schemaLocations : null,
		srsName : null,
		extractAttributes : !0,
		xy : !0,
		stateName : null,
		initialize : function (b) {
			this.stateName = {};
			this.stateName[OpenLayers.State.INSERT] = "wfs:Insert";
			this.stateName[OpenLayers.State.UPDATE] = "wfs:Update";
			this.stateName[OpenLayers.State.DELETE] = "wfs:Delete";
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		getSrsName : function (d, f) {
			var e = f && f.srsName;
			e || (e = d && d.layer ? d.layer.projection.getCode() : this.srsName);
			return e
		},
		read : function (d, f) {
			f = f || {};
			OpenLayers.Util.applyDefaults(f, {
				output : "features"
			});
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var e = {};
			d && this.readNode(d, e, !0);
			e.features && "features" === f.output && (e = e.features);
			return e
		},
		readers : {
			wfs : {
				FeatureCollection : function (d, c) {
					c.features = [];
					this.readChildNodes(d, c)
				}
			}
		},
		write : function (h, g) {
			var f = this.writeNode("wfs:Transaction", {
					features : h,
					options : g
				}),
			e = this.schemaLocationAttr();
			e && this.setAttributeNS(f, this.namespaces.xsi, "xsi:schemaLocation", e);
			return OpenLayers.Format.XML.prototype.write.apply(this, [f])
		},
		writers : {
			wfs : {
				GetFeature : function (h) {
					var g = this.createElementNSPlus("wfs:GetFeature", {
							attributes : {
								service : "WFS",
								version : this.version,
								handle : h && h.handle,
								outputFormat : h && h.outputFormat,
								maxFeatures : h && h.maxFeatures,
								"xsi:schemaLocation" : this.schemaLocationAttr(h)
							}
						});
					if ("string" == typeof this.featureType) {
						this.writeNode("Query", h, g)
					} else {
						for (var f = 0, e = this.featureType.length; f < e; f++) {
							h.featureType = this.featureType[f],
							this.writeNode("Query", h, g)
						}
					}
					return g
				},
				Transaction : function (l) {
					l = l || {};
					var k = l.options || {},
					j = this.createElementNSPlus("wfs:Transaction", {
							attributes : {
								service : "WFS",
								version : this.version,
								handle : k.handle
							}
						}),
					i,
					h = l.features;
					if (h) {
						!0 === k.multi && OpenLayers.Util.extend(this.geometryTypes, {
							"OpenLayers.Geometry.Point" : "MultiPoint",
							"OpenLayers.Geometry.LineString" : !0 === this.multiCurve ? "MultiCurve" : "MultiLineString",
							"OpenLayers.Geometry.Polygon" : !0 === this.multiSurface ? "MultiSurface" : "MultiPolygon"
						});
						var n,
						m;
						l = 0;
						for (i = h.length; l < i; ++l) {
							m = h[l],
							(n = this.stateName[m.state]) && this.writeNode(n, {
								feature : m,
								options : k
							}, j)
						}
						!0 === k.multi && this.setGeometryTypes()
					}
					if (k.nativeElements) {
						l = 0;
						for (i = k.nativeElements.length; l < i; ++l) {
							this.writeNode("wfs:Native", k.nativeElements[l], j)
						}
					}
					return j
				},
				Native : function (b) {
					return this.createElementNSPlus("wfs:Native", {
						attributes : {
							vendorId : b.vendorId,
							safeToIgnore : b.safeToIgnore
						},
						value : b.value
					})
				},
				Insert : function (d) {
					var c = d.feature;
					d = d.options;
					d = this.createElementNSPlus("wfs:Insert", {
							attributes : {
								handle : d && d.handle
							}
						});
					this.srsName = this.getSrsName(c);
					this.writeNode("feature:_typeName", c, d);
					return d
				},
				Update : function (h) {
					var g = h.feature;
					h = h.options;
					h = this.createElementNSPlus("wfs:Update", {
							attributes : {
								handle : h && h.handle,
								typeName : (this.featureNS ? this.featurePrefix + ":" : "") + this.featureType
							}
						});
					this.featureNS && h.setAttribute("xmlns:" + this.featurePrefix, this.featureNS);
					var f = g.modified;
					if (null !== this.geometryName && (!f || void 0 !== f.geometry)) {
						this.srsName = this.getSrsName(g),
						this.writeNode("Property", {
							name : this.geometryName,
							value : g.geometry
						}, h)
					}
					for (var e in g.attributes) {
						void 0 !== g.attributes[e] && (!f || !f.attributes || f.attributes && void 0 !== f.attributes[e]) && this.writeNode("Property", {
							name : e,
							value : g.attributes[e]
						}, h)
					}
					this.writeNode("ogc:Filter", new OpenLayers.Filter.FeatureId({
							fids : [g.fid]
						}), h);
					return h
				},
				Property : function (d) {
					var c = this.createElementNSPlus("wfs:Property");
					this.writeNode("Name", d.name, c);
					null !== d.value && this.writeNode("Value", d.value, c);
					return c
				},
				Name : function (b) {
					return this.createElementNSPlus("wfs:Name", {
						value : b
					})
				},
				Value : function (d) {
					var c;
					d instanceof OpenLayers.Geometry ? (c = this.createElementNSPlus("wfs:Value"), d = this.writeNode("feature:_geometry", d).firstChild, c.appendChild(d)) : c = this.createElementNSPlus("wfs:Value", {
							value : d
						});
					return c
				},
				Delete : function (d) {
					var c = d.feature;
					d = d.options;
					d = this.createElementNSPlus("wfs:Delete", {
							attributes : {
								handle : d && d.handle,
								typeName : (this.featureNS ? this.featurePrefix + ":" : "") + this.featureType
							}
						});
					this.featureNS && d.setAttribute("xmlns:" + this.featurePrefix, this.featureNS);
					this.writeNode("ogc:Filter", new OpenLayers.Filter.FeatureId({
							fids : [c.fid]
						}), d);
					return d
				}
			}
		},
		schemaLocationAttr : function (h) {
			h = OpenLayers.Util.extend({
					featurePrefix : this.featurePrefix,
					schema : this.schema
				}, h);
			var g = OpenLayers.Util.extend({}, this.schemaLocations);
			h.schema && (g[h.featurePrefix] = h.schema);
			h = [];
			var f,
			e;
			for (e in g) {
				(f = this.namespaces[e]) && h.push(f + " " + g[e])
			}
			return h.join(" ") || void 0
		},
		setFilterProperty : function (d) {
			if (d.filters) {
				for (var f = 0, e = d.filters.length; f < e; ++f) {
					OpenLayers.Format.WFST.v1.prototype.setFilterProperty.call(this, d.filters[f])
				}
			} else {
				d instanceof OpenLayers.Filter.Spatial && !d.property && (d.property = this.geometryName)
			}
		},
		CLASS_NAME : "OpenLayers.Format.WFST.v1"
	});
OpenLayers.Format.OGCExceptionReport = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			ogc : "http://www.opengis.net/ogc"
		},
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		defaultPrefix : "ogc",
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			var c = {
				exceptionReport : null
			};
			d.documentElement && (this.readChildNodes(d, c), null === c.exceptionReport && (c = (new OpenLayers.Format.OWSCommon).read(d)));
			return c
		},
		readers : {
			ogc : {
				ServiceExceptionReport : function (d, c) {
					c.exceptionReport = {
						exceptions : []
					};
					this.readChildNodes(d, c.exceptionReport)
				},
				ServiceException : function (d, f) {
					var e = {
						code : d.getAttribute("code"),
						locator : d.getAttribute("locator"),
						text : this.getChildValue(d)
					};
					f.exceptions.push(e)
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.OGCExceptionReport"
	});
OpenLayers.Format.XML.VersionedOGC = OpenLayers.Class(OpenLayers.Format.XML, {
		defaultVersion : null,
		version : null,
		profile : null,
		errorProperty : null,
		name : null,
		stringifyOutput : !1,
		parser : null,
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b]);
			b = this.CLASS_NAME;
			this.name = b.substring(b.lastIndexOf(".") + 1)
		},
		getVersion : function (d, f) {
			var e;
			d ? (e = this.version, e || (e = d.getAttribute("version"), e || (e = this.defaultVersion))) : e = f && f.version || this.version || this.defaultVersion;
			return e
		},
		getParser : function (d) {
			d = d || this.defaultVersion;
			var f = this.profile ? "_" + this.profile : "";
			if (!this.parser || this.parser.VERSION != d) {
				var e = OpenLayers.Format[this.name]["v" + d.replace(/\./g, "_") + f];
				if (!e) {
					throw "Can't find a " + this.name + " parser for version " + d + f
				}
				this.parser = new e(this.options)
			}
			return this.parser
		},
		write : function (d, f) {
			var e = this.getVersion(null, f);
			this.parser = this.getParser(e);
			e = this.parser.write(d, f);
			return !1 === this.stringifyOutput ? e : OpenLayers.Format.XML.prototype.write.apply(this, [e])
		},
		read : function (i, h) {
			"string" == typeof i && (i = OpenLayers.Format.XML.prototype.read.apply(this, [i]));
			var g = this.getVersion(i.documentElement);
			this.parser = this.getParser(g);
			var f = this.parser.read(i, h);
			if (null !== this.errorProperty && void 0 === f[this.errorProperty]) {
				var j = new OpenLayers.Format.OGCExceptionReport;
				f.error = j.read(i)
			}
			f.version = g;
			return f
		},
		CLASS_NAME : "OpenLayers.Format.XML.VersionedOGC"
	});
OpenLayers.Feature = OpenLayers.Class({
		layer : null,
		id : null,
		lonlat : null,
		data : null,
		marker : null,
		popupClass : null,
		popup : null,
		initialize : function (d, f, e) {
			this.layer = d;
			this.lonlat = f;
			this.data = null != e ? e : {};
			this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
		},
		destroy : function () {
			null != this.layer && null != this.layer.map && null != this.popup && this.layer.map.removePopup(this.popup);
			null != this.layer && null != this.marker && this.layer.removeMarker(this.marker);
			this.data = this.lonlat = this.id = this.layer = null;
			null != this.marker && (this.destroyMarker(this.marker), this.marker = null);
			null != this.popup && (this.destroyPopup(this.popup), this.popup = null)
		},
		onScreen : function () {
			var b = !1;
			null != this.layer && null != this.layer.map && (b = this.layer.map.getExtent().containsLonLat(this.lonlat));
			return b
		},
		createMarker : function () {
			null != this.lonlat && (this.marker = new OpenLayers.Marker(this.lonlat, this.data.icon));
			return this.marker
		},
		destroyMarker : function () {
			this.marker.destroy()
		},
		createPopup : function (b) {
			null != this.lonlat && (this.popup || (this.popup = new(this.popupClass ? this.popupClass : OpenLayers.Popup.Anchored)(this.id + "_popup", this.lonlat, this.data.popupSize, this.data.popupContentHTML, this.marker ? this.marker.icon : null, b)), null != this.data.overflow && (this.popup.contentDiv.style.overflow = this.data.overflow), this.popup.feature = this);
			return this.popup
		},
		destroyPopup : function () {
			this.popup && (this.popup.feature = null, this.popup.destroy(), this.popup = null)
		},
		CLASS_NAME : "OpenLayers.Feature"
	});
OpenLayers.State = {
	UNKNOWN : "Unknown",
	INSERT : "Insert",
	UPDATE : "Update",
	DELETE : "Delete"
};
OpenLayers.Feature.Vector = OpenLayers.Class(OpenLayers.Feature, {
		fid : null,
		geometry : null,
		attributes : null,
		bounds : null,
		state : null,
		style : null,
		url : null,
		renderIntent : "default",
		modified : null,
		initialize : function (d, f, e) {
			OpenLayers.Feature.prototype.initialize.apply(this, [null, null, f]);
			this.lonlat = null;
			this.geometry = d ? d : null;
			this.state = null;
			this.attributes = {};
			f && (this.attributes = OpenLayers.Util.extend(this.attributes, f));
			this.style = e ? e : null
		},
		destroy : function () {
			this.layer && (this.layer.removeFeatures(this), this.layer = null);
			this.modified = this.geometry = null;
			OpenLayers.Feature.prototype.destroy.apply(this, arguments)
		},
		clone : function () {
			return new OpenLayers.Feature.Vector(this.geometry ? this.geometry.clone() : null, this.attributes, this.style)
		},
		onScreen : function (d) {
			var c = !1;
			this.layer && this.layer.map && (c = this.layer.map.getExtent(), d ? (d = this.geometry.getBounds(), c = c.intersectsBounds(d)) : c = c.toGeometry().intersects(this.geometry));
			return c
		},
		getVisibility : function () {
			return !(this.style && "none" == this.style.display || !this.layer || this.layer && this.layer.styleMap && "none" == this.layer.styleMap.createSymbolizer(this, this.renderIntent).display || this.layer && !this.layer.getVisibility())
		},
		createMarker : function () {
			return null
		},
		destroyMarker : function () {},
		createPopup : function () {
			return null
		},
		atPoint : function (h, g, f) {
			var e = !1;
			this.geometry && (e = this.geometry.atPoint(h, g, f));
			return e
		},
		destroyPopup : function () {},
		move : function (d) {
			if (this.layer && this.geometry.move) {
				d = "OpenLayers.LonLat" == d.CLASS_NAME ? this.layer.getViewPortPxFromLonLat(d) : d;
				var f = this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat()),
				e = this.layer.map.getResolution();
				this.geometry.move(e * (d.x - f.x), e * (f.y - d.y));
				this.layer.drawFeature(this);
				return f
			}
		},
		toState : function (b) {
			if (b == OpenLayers.State.UPDATE) {
				switch (this.state) {
				case OpenLayers.State.UNKNOWN:
				case OpenLayers.State.DELETE:
					this.state = b
				}
			} else {
				if (b == OpenLayers.State.INSERT) {
					switch (this.state) {
					case OpenLayers.State.UNKNOWN:
						break;
					default:
						this.state = b
					}
				} else {
					if (b == OpenLayers.State.DELETE) {
						switch (this.state) {
						case OpenLayers.State.UNKNOWN:
						case OpenLayers.State.UPDATE:
							this.state = b
						}
					} else {
						b == OpenLayers.State.UNKNOWN && (this.state = b)
					}
				}
			}
		},
		CLASS_NAME : "OpenLayers.Feature.Vector"
	});
OpenLayers.Feature.Vector.style = {
	"default" : {
		fillColor : "#ee9900",
		fillOpacity : 0.4,
		hoverFillColor : "white",
		hoverFillOpacity : 0.8,
		strokeColor : "#ee9900",
		strokeOpacity : 1,
		strokeWidth : 1,
		strokeLinecap : "round",
		strokeDashstyle : "solid",
		hoverStrokeColor : "red",
		hoverStrokeOpacity : 1,
		hoverStrokeWidth : 0.2,
		pointRadius : 6,
		hoverPointRadius : 1,
		hoverPointUnit : "%",
		pointerEvents : "visiblePainted",
		cursor : "inherit",
		fontColor : "#000000",
		labelAlign : "cm",
		labelOutlineColor : "white",
		labelOutlineWidth : 3
	},
	select : {
		fillColor : "blue",
		fillOpacity : 0.4,
		hoverFillColor : "white",
		hoverFillOpacity : 0.8,
		strokeColor : "blue",
		strokeOpacity : 1,
		strokeWidth : 2,
		strokeLinecap : "round",
		strokeDashstyle : "solid",
		hoverStrokeColor : "red",
		hoverStrokeOpacity : 1,
		hoverStrokeWidth : 0.2,
		pointRadius : 6,
		hoverPointRadius : 1,
		hoverPointUnit : "%",
		pointerEvents : "visiblePainted",
		cursor : "pointer",
		fontColor : "#000000",
		labelAlign : "cm",
		labelOutlineColor : "white",
		labelOutlineWidth : 3
	},
	temporary : {
		fillColor : "#66cccc",
		fillOpacity : 0.2,
		hoverFillColor : "white",
		hoverFillOpacity : 0.8,
		strokeColor : "#66cccc",
		strokeOpacity : 1,
		strokeLinecap : "round",
		strokeWidth : 2,
		strokeDashstyle : "solid",
		hoverStrokeColor : "red",
		hoverStrokeOpacity : 1,
		hoverStrokeWidth : 0.2,
		pointRadius : 6,
		hoverPointRadius : 1,
		hoverPointUnit : "%",
		pointerEvents : "visiblePainted",
		cursor : "inherit",
		fontColor : "#000000",
		labelAlign : "cm",
		labelOutlineColor : "white",
		labelOutlineWidth : 3
	},
	"delete" : {
		display : "none"
	}
};
OpenLayers.Style = OpenLayers.Class({
		id : null,
		name : null,
		title : null,
		description : null,
		layerName : null,
		isDefault : !1,
		rules : null,
		context : null,
		defaultStyle : null,
		defaultsPerSymbolizer : !1,
		propertyStyles : null,
		initialize : function (d, c) {
			OpenLayers.Util.extend(this, c);
			this.rules = [];
			c && c.rules && this.addRules(c.rules);
			this.setDefaultStyle(d || OpenLayers.Feature.Vector.style["default"]);
			this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
		},
		destroy : function () {
			for (var d = 0, c = this.rules.length; d < c; d++) {
				this.rules[d].destroy(),
				this.rules[d] = null
			}
			this.defaultStyle = this.rules = null
		},
		createSymbolizer : function (o) {
			for (var n = this.defaultsPerSymbolizer ? {}

				 : this.createLiterals(OpenLayers.Util.extend({}, this.defaultStyle), o), m = this.rules, l, k = [], j = !1, i = 0, p = m.length; i < p; i++) {
				l = m[i],
				l.evaluate(o) && (l instanceof OpenLayers.Rule && l.elseFilter ? k.push(l) : (j = !0, this.applySymbolizer(l, n, o)))
			}
			if (!1 == j && 0 < k.length) {
				j = !0;
				i = 0;
				for (p = k.length; i < p; i++) {
					this.applySymbolizer(k[i], n, o)
				}
			}
			0 < m.length && !1 == j && (n.display = "none");
			null != n.label && "string" !== typeof n.label && (n.label = String(n.label));
			return n
		},
		applySymbolizer : function (h, g, f) {
			var e = f.geometry ? this.getSymbolizerPrefix(f.geometry) : OpenLayers.Style.SYMBOLIZER_PREFIXES[0];
			h = h.symbolizer[e] || h.symbolizer;
			!0 === this.defaultsPerSymbolizer && (e = this.defaultStyle, OpenLayers.Util.applyDefaults(h, {
					pointRadius : e.pointRadius
				}), (!0 === h.stroke || !0 === h.graphic) && OpenLayers.Util.applyDefaults(h, {
					strokeWidth : e.strokeWidth,
					strokeColor : e.strokeColor,
					strokeOpacity : e.strokeOpacity,
					strokeDashstyle : e.strokeDashstyle,
					strokeLinecap : e.strokeLinecap
				}), (!0 === h.fill || !0 === h.graphic) && OpenLayers.Util.applyDefaults(h, {
					fillColor : e.fillColor,
					fillOpacity : e.fillOpacity
				}), !0 === h.graphic && OpenLayers.Util.applyDefaults(h, {
					pointRadius : this.defaultStyle.pointRadius,
					externalGraphic : this.defaultStyle.externalGraphic,
					graphicName : this.defaultStyle.graphicName,
					graphicOpacity : this.defaultStyle.graphicOpacity,
					graphicWidth : this.defaultStyle.graphicWidth,
					graphicHeight : this.defaultStyle.graphicHeight,
					graphicXOffset : this.defaultStyle.graphicXOffset,
					graphicYOffset : this.defaultStyle.graphicYOffset
				}));
			return this.createLiterals(OpenLayers.Util.extend(g, h), f)
		},
		createLiterals : function (h, g) {
			var f = OpenLayers.Util.extend({}, g.attributes || g.data);
			OpenLayers.Util.extend(f, this.context);
			for (var e in this.propertyStyles) {
				h[e] = OpenLayers.Style.createLiteral(h[e], f, g, e)
			}
			return h
		},
		findPropertyStyles : function () {
			var l = {};
			this.addPropertyStyles(l, this.defaultStyle);
			for (var k = this.rules, j, i, h = 0, n = k.length; h < n; h++) {
				j = k[h].symbolizer;
				for (var m in j) {
					if (i = j[m], "object" == typeof i) {
						this.addPropertyStyles(l, i)
					} else {
						this.addPropertyStyles(l, j);
						break
					}
				}
			}
			return l
		},
		addPropertyStyles : function (h, g) {
			var f,
			e;
			for (e in g) {
				f = g[e],
				"string" == typeof f && f.match(/\$\{\w+\}/) && (h[e] = !0)
			}
			return h
		},
		addRules : function (b) {
			Array.prototype.push.apply(this.rules, b);
			this.propertyStyles = this.findPropertyStyles()
		},
		setDefaultStyle : function (b) {
			this.defaultStyle = b;
			this.propertyStyles = this.findPropertyStyles()
		},
		getSymbolizerPrefix : function (h) {
			for (var g = OpenLayers.Style.SYMBOLIZER_PREFIXES, f = 0, e = g.length; f < e; f++) {
				if (-1 != h.CLASS_NAME.indexOf(g[f])) {
					return g[f]
				}
			}
		},
		clone : function () {
			var d = OpenLayers.Util.extend({}, this);
			if (this.rules) {
				d.rules = [];
				for (var f = 0, e = this.rules.length; f < e; ++f) {
					d.rules.push(this.rules[f].clone())
				}
			}
			d.context = this.context && OpenLayers.Util.extend({}, this.context);
			f = OpenLayers.Util.extend({}, this.defaultStyle);
			return new OpenLayers.Style(f, d)
		},
		CLASS_NAME : "OpenLayers.Style"
	});
OpenLayers.Style.createLiteral = function (h, g, f, e) {
	"string" == typeof h && -1 != h.indexOf("${") && (h = OpenLayers.String.format(h, g, [f, e]), h = isNaN(h) || !h ? h : parseFloat(h));
	return h
};
OpenLayers.Style.SYMBOLIZER_PREFIXES = ["Point", "Line", "Polygon", "Text", "Raster"];
OpenLayers.Filter = OpenLayers.Class({
		initialize : function (b) {
			OpenLayers.Util.extend(this, b)
		},
		destroy : function () {},
		evaluate : function () {
			return !0
		},
		clone : function () {
			return null
		},
		toString : function () {
			return OpenLayers.Format && OpenLayers.Format.CQL ? OpenLayers.Format.CQL.prototype.write(this) : Object.prototype.toString.call(this)
		},
		CLASS_NAME : "OpenLayers.Filter"
	});
OpenLayers.Filter.FeatureId = OpenLayers.Class(OpenLayers.Filter, {
		fids : null,
		type : "FID",
		initialize : function (b) {
			this.fids = [];
			OpenLayers.Filter.prototype.initialize.apply(this, [b])
		},
		evaluate : function (d) {
			for (var f = 0, e = this.fids.length; f < e; f++) {
				if ((d.fid || d.id) == this.fids[f]) {
					return !0
				}
			}
			return !1
		},
		clone : function () {
			var b = new OpenLayers.Filter.FeatureId;
			OpenLayers.Util.extend(b, this);
			b.fids = this.fids.slice();
			return b
		},
		CLASS_NAME : "OpenLayers.Filter.FeatureId"
	});
OpenLayers.Filter.Logical = OpenLayers.Class(OpenLayers.Filter, {
		filters : null,
		type : null,
		initialize : function (b) {
			this.filters = [];
			OpenLayers.Filter.prototype.initialize.apply(this, [b])
		},
		destroy : function () {
			this.filters = null;
			OpenLayers.Filter.prototype.destroy.apply(this)
		},
		evaluate : function (d) {
			var f,
			e;
			switch (this.type) {
			case OpenLayers.Filter.Logical.AND:
				f = 0;
				for (e = this.filters.length; f < e; f++) {
					if (!1 == this.filters[f].evaluate(d)) {
						return !1
					}
				}
				return !0;
			case OpenLayers.Filter.Logical.OR:
				f = 0;
				for (e = this.filters.length; f < e; f++) {
					if (!0 == this.filters[f].evaluate(d)) {
						return !0
					}
				}
				return !1;
			case OpenLayers.Filter.Logical.NOT:
				return !this.filters[0].evaluate(d)
			}
		},
		clone : function () {
			for (var d = [], f = 0, e = this.filters.length; f < e; ++f) {
				d.push(this.filters[f].clone())
			}
			return new OpenLayers.Filter.Logical({
				type : this.type,
				filters : d
			})
		},
		CLASS_NAME : "OpenLayers.Filter.Logical"
	});
OpenLayers.Filter.Logical.AND = "&&";
OpenLayers.Filter.Logical.OR = "||";
OpenLayers.Filter.Logical.NOT = "!";
OpenLayers.Filter.Comparison = OpenLayers.Class(OpenLayers.Filter, {
		type : null,
		property : null,
		value : null,
		matchCase : !0,
		lowerBoundary : null,
		upperBoundary : null,
		initialize : function (b) {
			OpenLayers.Filter.prototype.initialize.apply(this, [b]);
			this.type === OpenLayers.Filter.Comparison.LIKE && void 0 === b.matchCase && (this.matchCase = null)
		},
		evaluate : function (d) {
			d instanceof OpenLayers.Feature.Vector && (d = d.attributes);
			var c = !1;
			d = d[this.property];
			switch (this.type) {
			case OpenLayers.Filter.Comparison.EQUAL_TO:
				c = this.value;
				c = !this.matchCase && "string" == typeof d && "string" == typeof c ? d.toUpperCase() == c.toUpperCase() : d == c;
				break;
			case OpenLayers.Filter.Comparison.NOT_EQUAL_TO:
				c = this.value;
				c = !this.matchCase && "string" == typeof d && "string" == typeof c ? d.toUpperCase() != c.toUpperCase() : d != c;
				break;
			case OpenLayers.Filter.Comparison.LESS_THAN:
				c = d < this.value;
				break;
			case OpenLayers.Filter.Comparison.GREATER_THAN:
				c = d > this.value;
				break;
			case OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO:
				c = d <= this.value;
				break;
			case OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO:
				c = d >= this.value;
				break;
			case OpenLayers.Filter.Comparison.BETWEEN:
				c = d >= this.lowerBoundary && d <= this.upperBoundary;
				break;
			case OpenLayers.Filter.Comparison.LIKE:
				c = RegExp(this.value, "gi").test(d)
			}
			return c
		},
		value2regex : function (d, f, e) {
			if ("." == d) {
				throw Error("'.' is an unsupported wildCard character for OpenLayers.Filter.Comparison")
			}
			d = d ? d : "*";
			f = f ? f : ".";
			this.value = this.value.replace(RegExp("\\" + (e ? e : "!") + "(.|$)", "g"), "\\$1");
			this.value = this.value.replace(RegExp("\\" + f, "g"), ".");
			this.value = this.value.replace(RegExp("\\" + d, "g"), ".*");
			this.value = this.value.replace(RegExp("\\\\.\\*", "g"), "\\" + d);
			return this.value = this.value.replace(RegExp("\\\\\\.", "g"), "\\" + f)
		},
		regex2value : function () {
			var b = this.value,
			b = b.replace(/!/g, "!!"),
			b = b.replace(/(\\)?\\\./g, function (d, a) {
					return a ? d : "!."
				}),
			b = b.replace(/(\\)?\\\*/g, function (d, a) {
					return a ? d : "!*"
				}),
			b = b.replace(/\\\\/g, "\\");
			return b = b.replace(/\.\*/g, "*")
		},
		clone : function () {
			return OpenLayers.Util.extend(new OpenLayers.Filter.Comparison, this)
		},
		CLASS_NAME : "OpenLayers.Filter.Comparison"
	});
OpenLayers.Filter.Comparison.EQUAL_TO = "==";
OpenLayers.Filter.Comparison.NOT_EQUAL_TO = "!=";
OpenLayers.Filter.Comparison.LESS_THAN = "<";
OpenLayers.Filter.Comparison.GREATER_THAN = ">";
OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO = "<=";
OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO = ">=";
OpenLayers.Filter.Comparison.BETWEEN = "..";
OpenLayers.Filter.Comparison.LIKE = "~";
OpenLayers.Format.Filter = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.0.0",
		CLASS_NAME : "OpenLayers.Format.Filter"
	});
OpenLayers.Filter.Function = OpenLayers.Class(OpenLayers.Filter, {
		name : null,
		params : null,
		CLASS_NAME : "OpenLayers.Filter.Function"
	});
OpenLayers.Format.Filter.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			ogc : "http://www.opengis.net/ogc",
			gml : "http://www.opengis.net/gml",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		defaultPrefix : "ogc",
		schemaLocation : null,
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		read : function (d) {
			var c = {};
			this.readers.ogc.Filter.apply(this, [d, c]);
			return c.filter
		},
		readers : {
			ogc : {
				_expression : function (d) {
					for (var f = "", e = d.firstChild; e; e = e.nextSibling) {
						switch (e.nodeType) {
						case 1:
							d = this.readNode(e);
							d.property ? f += "${" + d.property + "}" : void 0 !== d.value && (f += d.value);
							break;
						case 3:
						case 4:
							f += e.nodeValue
						}
					}
					return f
				},
				Filter : function (d, f) {
					var e = {
						fids : [],
						filters : []
					};
					this.readChildNodes(d, e);
					0 < e.fids.length ? f.filter = new OpenLayers.Filter.FeatureId({
							fids : e.fids
						}) : 0 < e.filters.length && (f.filter = e.filters[0])
				},
				FeatureId : function (d, f) {
					var e = d.getAttribute("fid");
					e && f.fids.push(e)
				},
				And : function (d, f) {
					var e = new OpenLayers.Filter.Logical({
							type : OpenLayers.Filter.Logical.AND
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				Or : function (d, f) {
					var e = new OpenLayers.Filter.Logical({
							type : OpenLayers.Filter.Logical.OR
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				Not : function (d, f) {
					var e = new OpenLayers.Filter.Logical({
							type : OpenLayers.Filter.Logical.NOT
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsLessThan : function (d, f) {
					var e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.LESS_THAN
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsGreaterThan : function (d, f) {
					var e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.GREATER_THAN
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsLessThanOrEqualTo : function (d, f) {
					var e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsGreaterThanOrEqualTo : function (d, f) {
					var e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsBetween : function (d, f) {
					var e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.BETWEEN
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				Literal : function (d, c) {
					c.value = OpenLayers.String.numericIf(this.getChildValue(d))
				},
				PropertyName : function (d, c) {
					c.property = this.getChildValue(d)
				},
				LowerBoundary : function (d, c) {
					c.lowerBoundary = OpenLayers.String.numericIf(this.readers.ogc._expression.call(this, d))
				},
				UpperBoundary : function (d, c) {
					c.upperBoundary = OpenLayers.String.numericIf(this.readers.ogc._expression.call(this, d))
				},
				Intersects : function (d, c) {
					this.readSpatial(d, c, OpenLayers.Filter.Spatial.INTERSECTS)
				},
				Within : function (d, c) {
					this.readSpatial(d, c, OpenLayers.Filter.Spatial.WITHIN)
				},
				Contains : function (d, c) {
					this.readSpatial(d, c, OpenLayers.Filter.Spatial.CONTAINS)
				},
				DWithin : function (d, c) {
					this.readSpatial(d, c, OpenLayers.Filter.Spatial.DWITHIN)
				},
				Distance : function (d, c) {
					c.distance = parseInt(this.getChildValue(d));
					c.distanceUnits = d.getAttribute("units")
				},
				Function : function () {}

			}
		},
		readSpatial : function (d, f, e) {
			e = new OpenLayers.Filter.Spatial({
					type : e
				});
			this.readChildNodes(d, e);
			e.value = e.components[0];
			delete e.components;
			f.filters.push(e)
		},
		writeOgcExpression : function (d, f) {
			if (d instanceof OpenLayers.Filter.Function) {
				var e = this.writeNode("Function", d, f);
				f.appendChild(e)
			} else {
				this.writeNode("Literal", d, f)
			}
			return f
		},
		write : function (b) {
			return this.writers.ogc.Filter.apply(this, [b])
		},
		writeFeatureIdNodes : function (h, g) {
			for (var f = 0, e = h.fids.length; f < e; ++f) {
				this.writeNode("FeatureId", h.fids[f], g)
			}
		},
		writers : {
			ogc : {
				Filter : function (d) {
					var c = this.createElementNSPlus("ogc:Filter");
					"FID" === d.type ? OpenLayers.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, d, c) : this.writeNode(this.getFilterType(d), d, c);
					return c
				},
				FeatureId : function (b) {
					return this.createElementNSPlus("ogc:FeatureId", {
						attributes : {
							fid : b
						}
					})
				},
				And : function (i) {
					for (var h = this.createElementNSPlus("ogc:And"), g, f = 0, j = i.filters.length; f < j; ++f) {
						g = i.filters[f],
						"FID" === g.type ? OpenLayers.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, g, h) : this.writeNode(this.getFilterType(g), g, h)
					}
					return h
				},
				Or : function (i) {
					for (var h = this.createElementNSPlus("ogc:Or"), g, f = 0, j = i.filters.length; f < j; ++f) {
						g = i.filters[f],
						"FID" === g.type ? OpenLayers.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, g, h) : this.writeNode(this.getFilterType(g), g, h)
					}
					return h
				},
				Not : function (d) {
					var c = this.createElementNSPlus("ogc:Not");
					d = d.filters[0];
					"FID" === d.type ? OpenLayers.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, d, c) : this.writeNode(this.getFilterType(d), d, c);
					return c
				},
				PropertyIsLessThan : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsLessThan");
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsGreaterThan : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsGreaterThan");
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsLessThanOrEqualTo : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsLessThanOrEqualTo");
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsGreaterThanOrEqualTo : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsGreaterThanOrEqualTo");
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsBetween : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsBetween");
					this.writeNode("PropertyName", d, c);
					this.writeNode("LowerBoundary", d, c);
					this.writeNode("UpperBoundary", d, c);
					return c
				},
				PropertyName : function (b) {
					return this.createElementNSPlus("ogc:PropertyName", {
						value : b.property
					})
				},
				Literal : function (b) {
					return this.createElementNSPlus("ogc:Literal", {
						value : b
					})
				},
				LowerBoundary : function (d) {
					var c = this.createElementNSPlus("ogc:LowerBoundary");
					this.writeOgcExpression(d.lowerBoundary, c);
					return c
				},
				UpperBoundary : function (d) {
					var c = this.createElementNSPlus("ogc:UpperBoundary");
					this.writeNode("Literal", d.upperBoundary, c);
					return c
				},
				INTERSECTS : function (b) {
					return this.writeSpatial(b, "Intersects")
				},
				WITHIN : function (b) {
					return this.writeSpatial(b, "Within")
				},
				CONTAINS : function (b) {
					return this.writeSpatial(b, "Contains")
				},
				DWITHIN : function (d) {
					var c = this.writeSpatial(d, "DWithin");
					this.writeNode("Distance", d, c);
					return c
				},
				Distance : function (b) {
					return this.createElementNSPlus("ogc:Distance", {
						attributes : {
							units : b.distanceUnits
						},
						value : b.distance
					})
				},
				Function : function (h) {
					var g = this.createElementNSPlus("ogc:Function", {
							attributes : {
								name : h.name
							}
						});
					h = h.params;
					for (var f = 0, e = h.length; f < e; f++) {
						this.writeOgcExpression(h[f], g)
					}
					return g
				}
			}
		},
		getFilterType : function (d) {
			var c = this.filterMap[d.type];
			if (!c) {
				throw "Filter writing not supported for rule type: " + d.type
			}
			return c
		},
		filterMap : {
			"&&" : "And",
			"||" : "Or",
			"!" : "Not",
			"==" : "PropertyIsEqualTo",
			"!=" : "PropertyIsNotEqualTo",
			"<" : "PropertyIsLessThan",
			">" : "PropertyIsGreaterThan",
			"<=" : "PropertyIsLessThanOrEqualTo",
			">=" : "PropertyIsGreaterThanOrEqualTo",
			".." : "PropertyIsBetween",
			"~" : "PropertyIsLike",
			BBOX : "BBOX",
			DWITHIN : "DWITHIN",
			WITHIN : "WITHIN",
			CONTAINS : "CONTAINS",
			INTERSECTS : "INTERSECTS",
			FID : "FeatureId"
		},
		CLASS_NAME : "OpenLayers.Format.Filter.v1"
	});
OpenLayers.Geometry = OpenLayers.Class({
		id : null,
		parent : null,
		bounds : null,
		initialize : function () {
			this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
		},
		destroy : function () {
			this.bounds = this.id = null
		},
		clone : function () {
			return new OpenLayers.Geometry
		},
		setBounds : function (b) {
			b && (this.bounds = b.clone())
		},
		clearBounds : function () {
			this.bounds = null;
			this.parent && this.parent.clearBounds()
		},
		extendBounds : function (b) {
			this.getBounds() ? this.bounds.extend(b) : this.setBounds(b)
		},
		getBounds : function () {
			null == this.bounds && this.calculateBounds();
			return this.bounds
		},
		calculateBounds : function () {},
		distanceTo : function () {},
		getVertices : function () {},
		atPoint : function (h, g, f) {
			var e = !1;
			null != this.getBounds() && null != h && (g = null != g ? g : 0, f = null != f ? f : 0, e = (new OpenLayers.Bounds(this.bounds.left - g, this.bounds.bottom - f, this.bounds.right + g, this.bounds.top + f)).containsLonLat(h));
			return e
		},
		getLength : function () {
			return 0
		},
		getArea : function () {
			return 0
		},
		getCentroid : function () {
			return null
		},
		toString : function () {
			return OpenLayers.Format && OpenLayers.Format.WKT ? OpenLayers.Format.WKT.prototype.write(new OpenLayers.Feature.Vector(this)) : Object.prototype.toString.call(this)
		},
		CLASS_NAME : "OpenLayers.Geometry"
	});
OpenLayers.Geometry.fromWKT = function (h) {
	var g;
	if (OpenLayers.Format && OpenLayers.Format.WKT) {
		var f = OpenLayers.Geometry.fromWKT.format;
		f || (f = new OpenLayers.Format.WKT, OpenLayers.Geometry.fromWKT.format = f);
		h = f.read(h);
		if (h instanceof OpenLayers.Feature.Vector) {
			g = h.geometry
		} else {
			if (OpenLayers.Util.isArray(h)) {
				g = h.length;
				for (var f = Array(g), e = 0; e < g; ++e) {
					f[e] = h[e].geometry
				}
				g = new OpenLayers.Geometry.Collection(f)
			}
		}
	}
	return g
};
OpenLayers.Geometry.segmentsIntersect = function (r, q, p) {
	var o = p && p.point;
	p = p && p.tolerance;
	var n = !1,
	i = r.x1 - q.x1,
	x = r.y1 - q.y1,
	w = r.x2 - r.x1,
	v = r.y2 - r.y1,
	u = q.y2 - q.y1,
	t = q.x2 - q.x1,
	s = u * w - t * v,
	u = t * x - u * i,
	x = w * x - v * i;
	0 == s ? 0 == u && 0 == x && (n = !0) : (i = u / s, s = x / s, 0 <= i && (1 >= i && 0 <= s && 1 >= s) && (o ? (w = r.x1 + i * w, s = r.y1 + i * v, n = new OpenLayers.Geometry.Point(w, s)) : n = !0));
	if (p) {
		if (n) {
			if (o) {
				r = [r, q];
				q = 0;
				r : for (; 2 > q; ++q) {
					i = r[q];
					for (v = 1; 3 > v; ++v) {
						if (w = i["x" + v], s = i["y" + v], o = Math.sqrt(Math.pow(w - n.x, 2) + Math.pow(s - n.y, 2)), o < p) {
							n.x = w;
							n.y = s;
							break r
						}
					}
				}
			}
		} else {
			r = [r, q];
			q = 0;
			r : for (; 2 > q; ++q) {
				w = r[q];
				s = r[(q + 1) % 2];
				for (v = 1; 3 > v; ++v) {
					if (i = {
							x : w["x" + v],
							y : w["y" + v]
						}, x = OpenLayers.Geometry.distanceToSegment(i, s), x.distance < p) {
						n = o ? new OpenLayers.Geometry.Point(i.x, i.y) : !0;
						break r
					}
				}
			}
		}
	}
	return n
};
OpenLayers.Geometry.distanceToSegment = function (o, n) {
	var m = o.x,
	i = o.y,
	v = n.x1,
	u = n.y1,
	t = n.x2,
	s = n.y2,
	r = t - v,
	q = s - u,
	p = (r * (m - v) + q * (i - u)) / (Math.pow(r, 2) + Math.pow(q, 2));
	0 >= p || (1 <= p ? (v = t, u = s) : (v += p * r, u += p * q));
	return {
		distance : Math.sqrt(Math.pow(v - m, 2) + Math.pow(u - i, 2)),
		x : v,
		y : u
	}
};
OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry, {
		x : null,
		y : null,
		initialize : function (d, c) {
			OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
			this.x = parseFloat(d);
			this.y = parseFloat(c)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Geometry.Point(this.x, this.y));
			OpenLayers.Util.applyDefaults(b, this);
			return b
		},
		calculateBounds : function () {
			this.bounds = new OpenLayers.Bounds(this.x, this.y, this.x, this.y)
		},
		distanceTo : function (o, n) {
			var m = !(n && !1 === n.edge) && n && n.details,
			l,
			k,
			j,
			i,
			p;
			o instanceof OpenLayers.Geometry.Point ? (k = this.x, j = this.y, i = o.x, p = o.y, l = Math.sqrt(Math.pow(k - i, 2) + Math.pow(j - p, 2)), l = !m ? l : {
					x0 : k,
					y0 : j,
					x1 : i,
					y1 : p,
					distance : l
				}) : (l = o.distanceTo(this, n), m && (l = {
						x0 : l.x1,
						y0 : l.y1,
						x1 : l.x0,
						y1 : l.y0,
						distance : l.distance
					}));
			return l
		},
		equals : function (d) {
			var c = !1;
			null != d && (c = this.x == d.x && this.y == d.y || isNaN(this.x) && isNaN(this.y) && isNaN(d.x) && isNaN(d.y));
			return c
		},
		toShortString : function () {
			return this.x + ", " + this.y
		},
		move : function (d, c) {
			this.x += d;
			this.y += c;
			this.clearBounds()
		},
		rotate : function (h, g) {
			h *= Math.PI / 180;
			var f = this.distanceTo(g),
			e = h + Math.atan2(this.y - g.y, this.x - g.x);
			this.x = g.x + f * Math.cos(e);
			this.y = g.y + f * Math.sin(e);
			this.clearBounds()
		},
		getCentroid : function () {
			return new OpenLayers.Geometry.Point(this.x, this.y)
		},
		resize : function (d, f, e) {
			this.x = f.x + d * (void 0 == e ? 1 : e) * (this.x - f.x);
			this.y = f.y + d * (this.y - f.y);
			this.clearBounds();
			return this
		},
		intersects : function (d) {
			var c = !1;
			return c = "OpenLayers.Geometry.Point" == d.CLASS_NAME ? this.equals(d) : d.intersects(this)
		},
		transform : function (d, c) {
			d && c && (OpenLayers.Projection.transform(this, d, c), this.bounds = null);
			return this
		},
		getVertices : function () {
			return [this]
		},
		CLASS_NAME : "OpenLayers.Geometry.Point"
	});
OpenLayers.Geometry.Collection = OpenLayers.Class(OpenLayers.Geometry, {
		components : null,
		componentTypes : null,
		initialize : function (b) {
			OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
			this.components = [];
			null != b && this.addComponents(b)
		},
		destroy : function () {
			this.components.length = 0;
			this.components = null;
			OpenLayers.Geometry.prototype.destroy.apply(this, arguments)
		},
		clone : function () {
			for (var a = eval("new " + this.CLASS_NAME + "()"), b = 0, c = this.components.length; b < c; b++) {
				a.addComponent(this.components[b].clone())
			}
			OpenLayers.Util.applyDefaults(a, this);
			return a
		},
		getComponentsString : function () {
			for (var d = [], f = 0, e = this.components.length; f < e; f++) {
				d.push(this.components[f].toShortString())
			}
			return d.join(",")
		},
		calculateBounds : function () {
			this.bounds = null;
			var h = new OpenLayers.Bounds,
			g = this.components;
			if (g) {
				for (var f = 0, e = g.length; f < e; f++) {
					h.extend(g[f].getBounds())
				}
			}
			null != h.left && (null != h.bottom && null != h.right && null != h.top) && this.setBounds(h)
		},
		addComponents : function (d) {
			OpenLayers.Util.isArray(d) || (d = [d]);
			for (var f = 0, e = d.length; f < e; f++) {
				this.addComponent(d[f])
			}
		},
		addComponent : function (h, g) {
			var f = !1;
			if (h && (null == this.componentTypes || -1 < OpenLayers.Util.indexOf(this.componentTypes, h.CLASS_NAME))) {
				if (null != g && g < this.components.length) {
					var f = this.components.slice(0, g),
					e = this.components.slice(g, this.components.length);
					f.push(h);
					this.components = f.concat(e)
				} else {
					this.components.push(h)
				}
				h.parent = this;
				this.clearBounds();
				f = !0
			}
			return f
		},
		removeComponents : function (d) {
			var f = !1;
			OpenLayers.Util.isArray(d) || (d = [d]);
			for (var e = d.length - 1; 0 <= e; --e) {
				f = this.removeComponent(d[e]) || f
			}
			return f
		},
		removeComponent : function (b) {
			OpenLayers.Util.removeItem(this.components, b);
			this.clearBounds();
			return !0
		},
		getLength : function () {
			for (var d = 0, f = 0, e = this.components.length; f < e; f++) {
				d += this.components[f].getLength()
			}
			return d
		},
		getArea : function () {
			for (var d = 0, f = 0, e = this.components.length; f < e; f++) {
				d += this.components[f].getArea()
			}
			return d
		},
		getGeodesicArea : function (h) {
			for (var g = 0, f = 0, e = this.components.length; f < e; f++) {
				g += this.components[f].getGeodesicArea(h)
			}
			return g
		},
		getCentroid : function (r) {
			if (!r) {
				return this.components.length && this.components[0].getCentroid()
			}
			r = this.components.length;
			if (!r) {
				return !1
			}
			for (var q = [], p = [], o = 0, n = Number.MAX_VALUE, m, l = 0; l < r; ++l) {
				m = this.components[l];
				var k = m.getArea();
				m = m.getCentroid(!0);
				!isNaN(k) && (!isNaN(m.x) && !isNaN(m.y)) && (q.push(k), o += k, n = k < n && 0 < k ? k : n, p.push(m))
			}
			r = q.length;
			if (0 === o) {
				for (l = 0; l < r; ++l) {
					q[l] = 1
				}
				o = q.length
			} else {
				for (l = 0; l < r; ++l) {
					q[l] /= n
				}
				o /= n
			}
			for (var i = n = 0, l = 0; l < r; ++l) {
				m = p[l],
				k = q[l],
				n += m.x * k,
				i += m.y * k
			}
			return new OpenLayers.Geometry.Point(n / o, i / o)
		},
		getGeodesicLength : function (h) {
			for (var g = 0, f = 0, e = this.components.length; f < e; f++) {
				g += this.components[f].getGeodesicLength(h)
			}
			return g
		},
		move : function (h, g) {
			for (var f = 0, e = this.components.length; f < e; f++) {
				this.components[f].move(h, g)
			}
		},
		rotate : function (h, g) {
			for (var f = 0, e = this.components.length; f < e; ++f) {
				this.components[f].rotate(h, g)
			}
		},
		resize : function (h, g, f) {
			for (var e = 0; e < this.components.length; ++e) {
				this.components[e].resize(h, g, f)
			}
			return this
		},
		distanceTo : function (r, q) {
			for (var p = !(q && !1 === q.edge) && q && q.details, o, n, m, l = Number.POSITIVE_INFINITY, k = 0, i = this.components.length; k < i && !(o = this.components[k].distanceTo(r, q), m = p ? o.distance : o, m < l && (l = m, n = o, 0 == l)); ++k) {}

			return n
		},
		equals : function (h) {
			var g = !0;
			if (!h || !h.CLASS_NAME || this.CLASS_NAME != h.CLASS_NAME) {
				g = !1
			} else {
				if (!OpenLayers.Util.isArray(h.components) || h.components.length != this.components.length) {
					g = !1
				} else {
					for (var f = 0, e = this.components.length; f < e; ++f) {
						if (!this.components[f].equals(h.components[f])) {
							g = !1;
							break
						}
					}
				}
			}
			return g
		},
		transform : function (h, g) {
			if (h && g) {
				for (var f = 0, e = this.components.length; f < e; f++) {
					this.components[f].transform(h, g)
				}
				this.bounds = null
			}
			return this
		},
		intersects : function (h) {
			for (var g = !1, f = 0, e = this.components.length; f < e && !(g = h.intersects(this.components[f])); ++f) {}

			return g
		},
		getVertices : function (h) {
			for (var g = [], f = 0, e = this.components.length; f < e; ++f) {
				Array.prototype.push.apply(g, this.components[f].getVertices(h))
			}
			return g
		},
		CLASS_NAME : "OpenLayers.Geometry.Collection"
	});
OpenLayers.Geometry.MultiPoint = OpenLayers.Class(OpenLayers.Geometry.Collection, {
		componentTypes : ["OpenLayers.Geometry.Point"],
		addPoint : function (d, c) {
			this.addComponent(d, c)
		},
		removePoint : function (b) {
			this.removeComponent(b)
		},
		CLASS_NAME : "OpenLayers.Geometry.MultiPoint"
	});
OpenLayers.Geometry.Curve = OpenLayers.Class(OpenLayers.Geometry.MultiPoint, {
		componentTypes : ["OpenLayers.Geometry.Point"],
		getLength : function () {
			var d = 0;
			if (this.components && 1 < this.components.length) {
				for (var f = 1, e = this.components.length; f < e; f++) {
					d += this.components[f - 1].distanceTo(this.components[f])
				}
			}
			return d
		},
		getGeodesicLength : function (j) {
			var i = this;
			if (j) {
				var h = new OpenLayers.Projection("EPSG:4326");
				h.equals(j) || (i = this.clone().transform(j, h))
			}
			j = 0;
			if (i.components && 1 < i.components.length) {
				for (var g, l = 1, k = i.components.length; l < k; l++) {
					h = i.components[l - 1],
					g = i.components[l],
					j += OpenLayers.Util.distVincenty({
						lon : h.x,
						lat : h.y
					}, {
						lon : g.x,
						lat : g.y
					})
				}
			}
			return 1000 * j
		},
		CLASS_NAME : "OpenLayers.Geometry.Curve"
	});
OpenLayers.Geometry.LineString = OpenLayers.Class(OpenLayers.Geometry.Curve, {
		removeComponent : function (d) {
			var c = this.components && 2 < this.components.length;
			c && OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this, arguments);
			return c
		},
		intersects : function (C) {
			var B = !1,
			A = C.CLASS_NAME;
			if ("OpenLayers.Geometry.LineString" == A || "OpenLayers.Geometry.LinearRing" == A || "OpenLayers.Geometry.Point" == A) {
				var y = this.getSortedSegments();
				C = "OpenLayers.Geometry.Point" == A ? [{
							x1 : C.x,
							y1 : C.y,
							x2 : C.x,
							y2 : C.y
						}
					] : C.getSortedSegments();
				var w,
				v,
				u,
				t,
				s,
				r,
				o,
				i = 0,
				D = y.length;
				C : for (; i < D; ++i) {
					A = y[i];
					w = A.x1;
					v = A.x2;
					u = A.y1;
					t = A.y2;
					var z = 0,
					x = C.length;
					for (; z < x; ++z) {
						s = C[z];
						if (s.x1 > v) {
							break
						}
						if (!(s.x2 < w) && (r = s.y1, o = s.y2, !(Math.min(r, o) > Math.max(u, t)) && !(Math.max(r, o) < Math.min(u, t)) && OpenLayers.Geometry.segmentsIntersect(A, s))) {
							B = !0;
							break C
						}
					}
				}
			} else {
				B = C.intersects(this)
			}
			return B
		},
		getSortedSegments : function () {
			for (var i = this.components.length - 1, h = Array(i), g, f, j = 0; j < i; ++j) {
				g = this.components[j],
				f = this.components[j + 1],
				h[j] = g.x < f.x ? {
					x1 : g.x,
					y1 : g.y,
					x2 : f.x,
					y2 : f.y
				}
				 : {
					x1 : f.x,
					y1 : f.y,
					x2 : g.x,
					y2 : g.y
				}
			}
			return h.sort(function (b, a) {
				return b.x1 - a.x1
			})
		},
		splitWithSegment : function (I, G) {
			for (var E = !(G && !1 === G.edge), C = G && G.tolerance, A = [], y = this.getVertices(), x = [], w = [], v = !1, u, J, H, F = {
					point : !0,
					tolerance : C
				}, D = null, B = 0, z = y.length - 2; B <= z; ++B) {
				if (C = y[B], x.push(C.clone()), u = y[B + 1], J = {
						x1 : C.x,
						y1 : C.y,
						x2 : u.x,
						y2 : u.y
					}, J = OpenLayers.Geometry.segmentsIntersect(I, J, F), J instanceof OpenLayers.Geometry.Point && ((H = J.x === I.x1 && J.y === I.y1 || J.x === I.x2 && J.y === I.y2 || J.equals(C) || J.equals(u) ? !0 : !1) || E)) {
					J.equals(w[w.length - 1]) || w.push(J.clone()),
					!(0 === B && J.equals(C)) && !J.equals(u) && (v = !0, J.equals(C) || x.push(J), A.push(new OpenLayers.Geometry.LineString(x)), x = [J.clone()])
				}
			}
			v && (x.push(u.clone()), A.push(new OpenLayers.Geometry.LineString(x)));
			if (0 < w.length) {
				var o = I.x1 < I.x2 ? 1 : -1,
				i = I.y1 < I.y2 ? 1 : -1,
				D = {
					lines : A,
					points : w.sort(function (a, b) {
						return o * a.x - o * b.x || i * a.y - i * b.y
					})
				}
			}
			return D
		},
		split : function (N, M) {
			var L = null,
			K = M && M.mutual,
			I,
			G,
			D,
			C;
			if (N instanceof OpenLayers.Geometry.LineString) {
				var B = this.getVertices(),
				A,
				z,
				y,
				x,
				w,
				J = [];
				D = [];
				for (var H = 0, F = B.length - 2; H <= F; ++H) {
					A = B[H];
					z = B[H + 1];
					y = {
						x1 : A.x,
						y1 : A.y,
						x2 : z.x,
						y2 : z.y
					};
					C = C || [N];
					K && J.push(A.clone());
					for (var E = 0; E < C.length; ++E) {
						if (x = C[E].splitWithSegment(y, M)) {
							if (w = x.lines, 0 < w.length && (w.unshift(E, 1), Array.prototype.splice.apply(C, w), E += w.length - 2), K) {
								for (var o = 0, i = x.points.length; o < i; ++o) {
									w = x.points[o],
									w.equals(A) || (J.push(w), D.push(new OpenLayers.Geometry.LineString(J)), J = w.equals(z) ? [] : [w.clone()])
								}
							}
						}
					}
				}
				K && (0 < D.length && 0 < J.length) && (J.push(z.clone()), D.push(new OpenLayers.Geometry.LineString(J)))
			} else {
				L = N.splitWith(this, M)
			}
			C && 1 < C.length ? G = !0 : C = [];
			D && 1 < D.length ? I = !0 : D = [];
			if (G || I) {
				L = K ? [D, C] : C
			}
			return L
		},
		splitWith : function (d, c) {
			return d.split(this, c)
		},
		getVertices : function (b) {
			return !0 === b ? [this.components[0], this.components[this.components.length - 1]] : !1 === b ? this.components.slice(1, this.components.length - 1) : this.components.slice()
		},
		distanceTo : function (t, i) {
			var H = !(i && !1 === i.edge) && i && i.details,
			G,
			F = {},
			E = Number.POSITIVE_INFINITY;
			if (t instanceof OpenLayers.Geometry.Point) {
				for (var C = this.getSortedSegments(), A = t.x, z = t.y, y, x = 0, v = C.length; x < v; ++x) {
					if (y = C[x], G = OpenLayers.Geometry.distanceToSegment(t, y), G.distance < E) {
						if (E = G.distance, F = G, 0 === E) {
							break
						}
					} else {
						if (y.x2 > A && (z > y.y1 && z < y.y2 || z < y.y1 && z > y.y2)) {
							break
						}
					}
				}
				F = H ? {
					distance : F.distance,
					x0 : F.x,
					y0 : F.y,
					x1 : A,
					y1 : z
				}
				 : F.distance
			} else {
				if (t instanceof OpenLayers.Geometry.LineString) {
					var C = this.getSortedSegments(),
					A = t.getSortedSegments(),
					u,
					o,
					D = A.length,
					B = {
						point : !0
					},
					x = 0,
					v = C.length;
					t : for (; x < v; ++x) {
						z = C[x];
						y = z.x1;
						o = z.y1;
						for (var w = 0; w < D; ++w) {
							if (G = A[w], u = OpenLayers.Geometry.segmentsIntersect(z, G, B)) {
								E = 0;
								F = {
									distance : 0,
									x0 : u.x,
									y0 : u.y,
									x1 : u.x,
									y1 : u.y
								};
								break t
							} else {
								G = OpenLayers.Geometry.distanceToSegment({
										x : y,
										y : o
									}, G),
								G.distance < E && (E = G.distance, F = {
										distance : E,
										x0 : y,
										y0 : o,
										x1 : G.x,
										y1 : G.y
									})
							}
						}
					}
					H || (F = F.distance);
					0 !== E && z && (G = t.distanceTo(new OpenLayers.Geometry.Point(z.x2, z.y2), i), x = H ? G.distance : G, x < E && (F = H ? {
								distance : E,
								x0 : G.x1,
								y0 : G.y1,
								x1 : G.x0,
								y1 : G.y0
							}
							 : x))
				} else {
					F = t.distanceTo(this, i),
					H && (F = {
							distance : F.distance,
							x0 : F.x1,
							y0 : F.y1,
							x1 : F.x0,
							y1 : F.y0
						})
				}
			}
			return F
		},
		simplify : function (i) {
			if (this && null !== this) {
				var h = this.getVertices();
				if (3 > h.length) {
					return this
				}
				var g = function (o, e, d, c) {
					for (var b = 0, a = 0, t = e, s; t < d; t++) {
						s = o[e];
						var r = o[d],
						q = o[t],
						q = Math.abs(0.5 * (s.x * r.y + r.x * q.y + q.x * s.y - r.x * s.y - q.x * r.y - s.x * q.y));
						s = Math.sqrt(Math.pow(s.x - r.x, 2) + Math.pow(s.y - r.y, 2));
						s = 2 * (q / s);
						s > b && (b = s, a = t)
					}
					b > c && a != e && (j.push(a), g(o, e, a, c), g(o, a, d, c))
				},
				f = h.length - 1,
				j = [];
				j.push(0);
				for (j.push(f); h[0].equals(h[f]); ) {
					f--,
					j.push(f)
				}
				g(h, 0, f, i);
				i = [];
				j.sort(function (b, a) {
					return b - a
				});
				for (f = 0; f < j.length; f++) {
					i.push(h[j[f]])
				}
				return new OpenLayers.Geometry.LineString(i)
			}
			return this
		},
		CLASS_NAME : "OpenLayers.Geometry.LineString"
	});
OpenLayers.Geometry.MultiLineString = OpenLayers.Class(OpenLayers.Geometry.Collection, {
		componentTypes : ["OpenLayers.Geometry.LineString"],
		split : function (C, B) {
			for (var A = null, y = B && B.mutual, w, v, u, t, s = [], r = [C], o = 0, i = this.components.length; o < i; ++o) {
				v = this.components[o];
				u = !1;
				for (var D = 0; D < r.length; ++D) {
					if (w = v.split(r[D], B)) {
						if (y) {
							u = w[0];
							for (var z = 0, x = u.length; z < x; ++z) {
								0 === z && s.length ? s[s.length - 1].addComponent(u[z]) : s.push(new OpenLayers.Geometry.MultiLineString([u[z]]))
							}
							u = !0;
							w = w[1]
						}
						if (w.length) {
							w.unshift(D, 1);
							Array.prototype.splice.apply(r, w);
							break
						}
					}
				}
				u || (s.length ? s[s.length - 1].addComponent(v.clone()) : s = [new OpenLayers.Geometry.MultiLineString(v.clone())])
			}
			s && 1 < s.length ? u = !0 : s = [];
			r && 1 < r.length ? t = !0 : r = [];
			if (u || t) {
				A = y ? [s, r] : r
			}
			return A
		},
		splitWith : function (z, x) {
			var v = null,
			u = x && x.mutual,
			t,
			s,
			r,
			q,
			o,
			i;
			if (z instanceof OpenLayers.Geometry.LineString) {
				i = [];
				o = [z];
				for (var B = 0, A = this.components.length; B < A; ++B) {
					r = !1;
					s = this.components[B];
					for (var y = 0; y < o.length; ++y) {
						if (t = o[y].split(s, x)) {
							u && (r = t[0], r.length && (r.unshift(y, 1), Array.prototype.splice.apply(o, r), y += r.length - 2), t = t[1], 0 === t.length && (t = [s.clone()]));
							r = 0;
							for (var w = t.length; r < w; ++r) {
								0 === r && i.length ? i[i.length - 1].addComponent(t[r]) : i.push(new OpenLayers.Geometry.MultiLineString([t[r]]))
							}
							r = !0
						}
					}
					r || (i.length ? i[i.length - 1].addComponent(s.clone()) : i = [new OpenLayers.Geometry.MultiLineString([s.clone()])])
				}
			} else {
				v = z.split(this)
			}
			o && 1 < o.length ? q = !0 : o = [];
			i && 1 < i.length ? r = !0 : i = [];
			if (q || r) {
				v = u ? [o, i] : i
			}
			return v
		},
		CLASS_NAME : "OpenLayers.Geometry.MultiLineString"
	});
OpenLayers.Geometry.LinearRing = OpenLayers.Class(OpenLayers.Geometry.LineString, {
		componentTypes : ["OpenLayers.Geometry.Point"],
		addComponent : function (h, g) {
			var f = !1,
			e = this.components.pop();
			if (null != g || !h.equals(e)) {
				f = OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, arguments)
			}
			OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [this.components[0]]);
			return f
		},
		removeComponent : function (d) {
			var c = this.components && 3 < this.components.length;
			c && (this.components.pop(), OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this, arguments), OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [this.components[0]]));
			return c
		},
		move : function (h, g) {
			for (var f = 0, e = this.components.length; f < e - 1; f++) {
				this.components[f].move(h, g)
			}
		},
		rotate : function (h, g) {
			for (var f = 0, e = this.components.length; f < e - 1; ++f) {
				this.components[f].rotate(h, g)
			}
		},
		resize : function (i, h, g) {
			for (var f = 0, j = this.components.length; f < j - 1; ++f) {
				this.components[f].resize(i, h, g)
			}
			return this
		},
		transform : function (h, g) {
			if (h && g) {
				for (var f = 0, e = this.components.length; f < e - 1; f++) {
					this.components[f].transform(h, g)
				}
				this.bounds = null
			}
			return this
		},
		getCentroid : function () {
			if (this.components && 2 < this.components.length) {
				for (var i = 0, h = 0, g = 0; g < this.components.length - 1; g++) {
					var f = this.components[g],
					j = this.components[g + 1],
					i = i + (f.x + j.x) * (f.x * j.y - j.x * f.y),
					h = h + (f.y + j.y) * (f.x * j.y - j.x * f.y)
				}
				g = -1 * this.getArea();
				return new OpenLayers.Geometry.Point(i / (6 * g), h / (6 * g))
			}
			return null
		},
		getArea : function () {
			var i = 0;
			if (this.components && 2 < this.components.length) {
				for (var h = i = 0, g = this.components.length; h < g - 1; h++) {
					var f = this.components[h],
					j = this.components[h + 1],
					i = i + (f.x + j.x) * (j.y - f.y)
				}
				i = -i / 2
			}
			return i
		},
		getGeodesicArea : function (j) {
			var i = this;
			if (j) {
				var h = new OpenLayers.Projection("EPSG:4326");
				h.equals(j) || (i = this.clone().transform(j, h))
			}
			j = 0;
			h = i.components && i.components.length;
			if (2 < h) {
				for (var g, l, k = 0; k < h - 1; k++) {
					g = i.components[k],
					l = i.components[k + 1],
					j += OpenLayers.Util.rad(l.x - g.x) * (2 + Math.sin(OpenLayers.Util.rad(g.y)) + Math.sin(OpenLayers.Util.rad(l.y)))
				}
				j = 40680631590769 * j / 2
			}
			return j
		},
		containsPoint : function (o) {
			var n = OpenLayers.Number.limitSigDigs,
			m = n(o.x, 14);
			o = n(o.y, 14);
			for (var i = this.components.length - 1, v, u, t, s, r, q = 0, p = 0; p < i; ++p) {
				if (v = this.components[p], t = n(v.x, 14), v = n(v.y, 14), u = this.components[p + 1], s = n(u.x, 14), u = n(u.y, 14), v == u) {
					if (o == v && (t <= s && m >= t && m <= s || t >= s && m <= t && m >= s)) {
						q = -1;
						break
					}
				} else {
					r = n((o - u) * ((s - t) / (u - v)) + s, 14);
					if (r == m && (v < u && o >= v && o <= u || v > u && o <= v && o >= u)) {
						q = -1;
						break
					}
					r <= m || t != s && (r < Math.min(t, s) || r > Math.max(t, s)) || (v < u && o >= v && o < u || v > u && o < v && o >= u) && ++q
				}
			}
			return -1 == q ? 1 : !!(q & 1)
		},
		intersects : function (h) {
			var g = !1;
			if ("OpenLayers.Geometry.Point" == h.CLASS_NAME) {
				g = this.containsPoint(h)
			} else {
				if ("OpenLayers.Geometry.LineString" == h.CLASS_NAME) {
					g = h.intersects(this)
				} else {
					if ("OpenLayers.Geometry.LinearRing" == h.CLASS_NAME) {
						g = OpenLayers.Geometry.LineString.prototype.intersects.apply(this, [h])
					} else {
						for (var f = 0, e = h.components.length; f < e && !(g = h.components[f].intersects(this)); ++f) {}

					}
				}
			}
			return g
		},
		getVertices : function (b) {
			return !0 === b ? [] : this.components.slice(0, this.components.length - 1)
		},
		CLASS_NAME : "OpenLayers.Geometry.LinearRing"
	});
OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Collection, {
		componentTypes : ["OpenLayers.Geometry.LinearRing"],
		getArea : function () {
			var d = 0;
			if (this.components && 0 < this.components.length) {
				for (var d = d + Math.abs(this.components[0].getArea()), f = 1, e = this.components.length; f < e; f++) {
					d -= Math.abs(this.components[f].getArea())
				}
			}
			return d
		},
		getGeodesicArea : function (h) {
			var g = 0;
			if (this.components && 0 < this.components.length) {
				for (var g = g + Math.abs(this.components[0].getGeodesicArea(h)), f = 1, e = this.components.length; f < e; f++) {
					g -= Math.abs(this.components[f].getGeodesicArea(h))
				}
			}
			return g
		},
		containsPoint : function (i) {
			var h = this.components.length,
			g = !1;
			if (0 < h && (g = this.components[0].containsPoint(i), 1 !== g && g && 1 < h)) {
				for (var f, j = 1; j < h; ++j) {
					if (f = this.components[j].containsPoint(i)) {
						g = 1 === f ? 1 : !1;
						break
					}
				}
			}
			return g
		},
		intersects : function (i) {
			var h = !1,
			g,
			f;
			if ("OpenLayers.Geometry.Point" == i.CLASS_NAME) {
				h = this.containsPoint(i)
			} else {
				if ("OpenLayers.Geometry.LineString" == i.CLASS_NAME || "OpenLayers.Geometry.LinearRing" == i.CLASS_NAME) {
					g = 0;
					for (f = this.components.length; g < f && !(h = i.intersects(this.components[g])); ++g) {}

					if (!h) {
						g = 0;
						for (f = i.components.length; g < f && !(h = this.containsPoint(i.components[g])); ++g) {}

					}
				} else {
					g = 0;
					for (f = i.components.length; g < f && !(h = this.intersects(i.components[g])); ++g) {}

				}
			}
			if (!h && "OpenLayers.Geometry.Polygon" == i.CLASS_NAME) {
				var j = this.components[0];
				g = 0;
				for (f = j.components.length; g < f && !(h = i.containsPoint(j.components[g])); ++g) {}

			}
			return h
		},
		distanceTo : function (d, c) {
			return c && !1 === c.edge && this.intersects(d) ? 0 : OpenLayers.Geometry.Collection.prototype.distanceTo.apply(this, [d, c])
		},
		CLASS_NAME : "OpenLayers.Geometry.Polygon"
	});
OpenLayers.Geometry.Polygon.createRegularPolygon = function (o, n, m, l) {
	var k = Math.PI * (1 / m - 0.5);
	l && (k += l / 180 * Math.PI);
	for (var j, i = [], p = 0; p < m; ++p) {
		j = k + 2 * p * Math.PI / m,
		l = o.x + n * Math.cos(j),
		j = o.y + n * Math.sin(j),
		i.push(new OpenLayers.Geometry.Point(l, j))
	}
	o = new OpenLayers.Geometry.LinearRing(i);
	return new OpenLayers.Geometry.Polygon([o])
};
OpenLayers.Geometry.MultiPolygon = OpenLayers.Class(OpenLayers.Geometry.Collection, {
		componentTypes : ["OpenLayers.Geometry.Polygon"],
		CLASS_NAME : "OpenLayers.Geometry.MultiPolygon"
	});
OpenLayers.Format.GML = OpenLayers.Class(OpenLayers.Format.XML, {
		featureNS : "http://mapserver.gis.umn.edu/mapserver",
		featurePrefix : "feature",
		featureName : "featureMember",
		layerName : "features",
		geometryName : "geometry",
		collectionName : "FeatureCollection",
		gmlns : "http://www.opengis.net/gml",
		extractAttributes : !0,
		xy : !0,
		initialize : function (b) {
			this.regExes = {
				trimSpace : /^\s*|\s*$/g,
				removeSpace : /\s*/g,
				splitSpace : /\s+/,
				trimComma : /\s*,\s*/g
			};
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		read : function (h) {
			"string" == typeof h && (h = OpenLayers.Format.XML.prototype.read.apply(this, [h]));
			h = this.getElementsByTagNameNS(h.documentElement, this.gmlns, this.featureName);
			for (var g = [], f = 0; f < h.length; f++) {
				var e = this.parseFeature(h[f]);
				e && g.push(e)
			}
			return g
		},
		parseFeature : function (r) {
			for (var q = "MultiPolygon Polygon MultiLineString LineString MultiPoint Point Envelope".split(" "), p, o, n, m = 0; m < q.length; ++m) {
				if (p = q[m], o = this.getElementsByTagNameNS(r, this.gmlns, p), 0 < o.length) {
					if (n = this.parseGeometry[p.toLowerCase()]) {
						n = n.apply(this, [o[0]]),
						this.internalProjection && this.externalProjection && n.transform(this.externalProjection, this.internalProjection)
					} else {
						throw new TypeError("Unsupported geometry type: " + p)
					}
					break
				}
			}
			var l;
			p = this.getElementsByTagNameNS(r, this.gmlns, "Box");
			for (m = 0; m < p.length; ++m) {
				q = p[m],
				o = this.parseGeometry.box.apply(this, [q]),
				q = q.parentNode,
				"boundedBy" === (q.localName || q.nodeName.split(":").pop()) ? l = o : n = o.toGeometry()
			}
			var k;
			this.extractAttributes && (k = this.parseAttributes(r));
			k = new OpenLayers.Feature.Vector(n, k);
			k.bounds = l;
			k.gml = {
				featureType : r.firstChild.nodeName.split(":")[1],
				featureNS : r.firstChild.namespaceURI,
				featureNSPrefix : r.firstChild.prefix
			};
			r = r.firstChild;
			for (var i; r && !(1 == r.nodeType && (i = r.getAttribute("fid") || r.getAttribute("id"))); ) {
				r = r.nextSibling
			}
			k.fid = i;
			return k
		},
		parseGeometry : {
			point : function (d) {
				var f,
				e;
				e = [];
				f = this.getElementsByTagNameNS(d, this.gmlns, "pos");
				0 < f.length && (e = f[0].firstChild.nodeValue, e = e.replace(this.regExes.trimSpace, ""), e = e.split(this.regExes.splitSpace));
				0 == e.length && (f = this.getElementsByTagNameNS(d, this.gmlns, "coordinates"), 0 < f.length && (e = f[0].firstChild.nodeValue, e = e.replace(this.regExes.removeSpace, ""), e = e.split(",")));
				0 == e.length && (f = this.getElementsByTagNameNS(d, this.gmlns, "coord"), 0 < f.length && (d = this.getElementsByTagNameNS(f[0], this.gmlns, "X"), f = this.getElementsByTagNameNS(f[0], this.gmlns, "Y"), 0 < d.length && 0 < f.length && (e = [d[0].firstChild.nodeValue, f[0].firstChild.nodeValue])));
				2 == e.length && (e[2] = null);
				return this.xy ? new OpenLayers.Geometry.Point(e[0], e[1], e[2]) : new OpenLayers.Geometry.Point(e[1], e[0], e[2])
			},
			multipoint : function (h) {
				h = this.getElementsByTagNameNS(h, this.gmlns, "Point");
				var g = [];
				if (0 < h.length) {
					for (var f, e = 0; e < h.length; ++e) {
						(f = this.parseGeometry.point.apply(this, [h[e]])) && g.push(f)
					}
				}
				return new OpenLayers.Geometry.MultiPoint(g)
			},
			linestring : function (r, q) {
				var p,
				o;
				o = [];
				var n = [];
				p = this.getElementsByTagNameNS(r, this.gmlns, "posList");
				if (0 < p.length) {
					o = this.getChildValue(p[0]);
					o = o.replace(this.regExes.trimSpace, "");
					o = o.split(this.regExes.splitSpace);
					var m = parseInt(p[0].getAttribute("dimension")),
					l,
					k,
					i;
					for (p = 0; p < o.length / m; ++p) {
						l = p * m,
						k = o[l],
						i = o[l + 1],
						l = 2 == m ? null : o[l + 2],
						this.xy ? n.push(new OpenLayers.Geometry.Point(k, i, l)) : n.push(new OpenLayers.Geometry.Point(i, k, l))
					}
				}
				if (0 == o.length && (p = this.getElementsByTagNameNS(r, this.gmlns, "coordinates"), 0 < p.length)) {
					o = this.getChildValue(p[0]);
					o = o.replace(this.regExes.trimSpace, "");
					o = o.replace(this.regExes.trimComma, ",");
					m = o.split(this.regExes.splitSpace);
					for (p = 0; p < m.length; ++p) {
						o = m[p].split(","),
						2 == o.length && (o[2] = null),
						this.xy ? n.push(new OpenLayers.Geometry.Point(o[0], o[1], o[2])) : n.push(new OpenLayers.Geometry.Point(o[1], o[0], o[2]))
					}
				}
				o = null;
				0 != n.length && (o = q ? new OpenLayers.Geometry.LinearRing(n) : new OpenLayers.Geometry.LineString(n));
				return o
			},
			multilinestring : function (h) {
				h = this.getElementsByTagNameNS(h, this.gmlns, "LineString");
				var g = [];
				if (0 < h.length) {
					for (var f, e = 0; e < h.length; ++e) {
						(f = this.parseGeometry.linestring.apply(this, [h[e]])) && g.push(f)
					}
				}
				return new OpenLayers.Geometry.MultiLineString(g)
			},
			polygon : function (h) {
				h = this.getElementsByTagNameNS(h, this.gmlns, "LinearRing");
				var g = [];
				if (0 < h.length) {
					for (var f, e = 0; e < h.length; ++e) {
						(f = this.parseGeometry.linestring.apply(this, [h[e], !0])) && g.push(f)
					}
				}
				return new OpenLayers.Geometry.Polygon(g)
			},
			multipolygon : function (h) {
				h = this.getElementsByTagNameNS(h, this.gmlns, "Polygon");
				var g = [];
				if (0 < h.length) {
					for (var f, e = 0; e < h.length; ++e) {
						(f = this.parseGeometry.polygon.apply(this, [h[e]])) && g.push(f)
					}
				}
				return new OpenLayers.Geometry.MultiPolygon(g)
			},
			envelope : function (l) {
				var k = [],
				j,
				i,
				h = this.getElementsByTagNameNS(l, this.gmlns, "lowerCorner");
				if (0 < h.length) {
					j = [];
					0 < h.length && (j = h[0].firstChild.nodeValue, j = j.replace(this.regExes.trimSpace, ""), j = j.split(this.regExes.splitSpace));
					2 == j.length && (j[2] = null);
					var n = this.xy ? new OpenLayers.Geometry.Point(j[0], j[1], j[2]) : new OpenLayers.Geometry.Point(j[1], j[0], j[2])
				}
				l = this.getElementsByTagNameNS(l, this.gmlns, "upperCorner");
				if (0 < l.length) {
					j = [];
					0 < l.length && (j = l[0].firstChild.nodeValue, j = j.replace(this.regExes.trimSpace, ""), j = j.split(this.regExes.splitSpace));
					2 == j.length && (j[2] = null);
					var m = this.xy ? new OpenLayers.Geometry.Point(j[0], j[1], j[2]) : new OpenLayers.Geometry.Point(j[1], j[0], j[2])
				}
				n && m && (k.push(new OpenLayers.Geometry.Point(n.x, n.y)), k.push(new OpenLayers.Geometry.Point(m.x, n.y)), k.push(new OpenLayers.Geometry.Point(m.x, m.y)), k.push(new OpenLayers.Geometry.Point(n.x, m.y)), k.push(new OpenLayers.Geometry.Point(n.x, n.y)), k = new OpenLayers.Geometry.LinearRing(k), i = new OpenLayers.Geometry.Polygon([k]));
				return i
			},
			box : function (d) {
				var f = this.getElementsByTagNameNS(d, this.gmlns, "coordinates"),
				e = d = null;
				0 < f.length && (f = f[0].firstChild.nodeValue, f = f.split(" "), 2 == f.length && (d = f[0].split(","), e = f[1].split(",")));
				if (null !== d && null !== e) {
					return new OpenLayers.Bounds(parseFloat(d[0]), parseFloat(d[1]), parseFloat(e[0]), parseFloat(e[1]))
				}
			}
		},
		parseAttributes : function (i) {
			var h = {};
			i = i.firstChild;
			for (var g, f, j; i; ) {
				if (1 == i.nodeType) {
					i = i.childNodes;
					for (g = 0; g < i.length; ++g) {
						if (f = i[g], 1 == f.nodeType) {
							if (j = f.childNodes, 1 == j.length) {
								if (j = j[0], 3 == j.nodeType || 4 == j.nodeType) {
									f = f.prefix ? f.nodeName.split(":")[1] : f.nodeName,
									j = j.nodeValue.replace(this.regExes.trimSpace, ""),
									h[f] = j
								}
							} else {
								h[f.nodeName.split(":").pop()] = null
							}
						}
					}
					break
				}
				i = i.nextSibling
			}
			return h
		},
		write : function (d) {
			OpenLayers.Util.isArray(d) || (d = [d]);
			for (var f = this.createElementNS("http://www.opengis.net/wfs", "wfs:" + this.collectionName), e = 0; e < d.length; e++) {
				f.appendChild(this.createFeatureXML(d[e]))
			}
			return OpenLayers.Format.XML.prototype.write.apply(this, [f])
		},
		createFeatureXML : function (j) {
			var i = this.buildGeometryNode(j.geometry),
			h = this.createElementNS(this.featureNS, this.featurePrefix + ":" + this.geometryName);
			h.appendChild(i);
			var i = this.createElementNS(this.gmlns, "gml:" + this.featureName),
			g = this.createElementNS(this.featureNS, this.featurePrefix + ":" + this.layerName);
			g.setAttribute("fid", j.fid || j.id);
			g.appendChild(h);
			for (var l in j.attributes) {
				var h = this.createTextNode(j.attributes[l]),
				k = l.substring(l.lastIndexOf(":") + 1),
				k = this.createElementNS(this.featureNS, this.featurePrefix + ":" + k);
				k.appendChild(h);
				g.appendChild(k)
			}
			i.appendChild(g);
			return i
		},
		buildGeometryNode : function (d) {
			this.externalProjection && this.internalProjection && (d = d.clone(), d.transform(this.internalProjection, this.externalProjection));
			var c = d.CLASS_NAME,
			c = c.substring(c.lastIndexOf(".") + 1);
			return this.buildGeometry[c.toLowerCase()].apply(this, [d])
		},
		buildGeometry : {
			point : function (d) {
				var c = this.createElementNS(this.gmlns, "gml:Point");
				c.appendChild(this.buildCoordinatesNode(d));
				return c
			},
			multipoint : function (i) {
				var h = this.createElementNS(this.gmlns, "gml:MultiPoint");
				i = i.components;
				for (var g, f, j = 0; j < i.length; j++) {
					g = this.createElementNS(this.gmlns, "gml:pointMember"),
					f = this.buildGeometry.point.apply(this, [i[j]]),
					g.appendChild(f),
					h.appendChild(g)
				}
				return h
			},
			linestring : function (d) {
				var c = this.createElementNS(this.gmlns, "gml:LineString");
				c.appendChild(this.buildCoordinatesNode(d));
				return c
			},
			multilinestring : function (i) {
				var h = this.createElementNS(this.gmlns, "gml:MultiLineString");
				i = i.components;
				for (var g, f, j = 0; j < i.length; ++j) {
					g = this.createElementNS(this.gmlns, "gml:lineStringMember"),
					f = this.buildGeometry.linestring.apply(this, [i[j]]),
					g.appendChild(f),
					h.appendChild(g)
				}
				return h
			},
			linearring : function (d) {
				var c = this.createElementNS(this.gmlns, "gml:LinearRing");
				c.appendChild(this.buildCoordinatesNode(d));
				return c
			},
			polygon : function (i) {
				var h = this.createElementNS(this.gmlns, "gml:Polygon");
				i = i.components;
				for (var g, f, j = 0; j < i.length; ++j) {
					g = 0 == j ? "outerBoundaryIs" : "innerBoundaryIs",
					g = this.createElementNS(this.gmlns, "gml:" + g),
					f = this.buildGeometry.linearring.apply(this, [i[j]]),
					g.appendChild(f),
					h.appendChild(g)
				}
				return h
			},
			multipolygon : function (i) {
				var h = this.createElementNS(this.gmlns, "gml:MultiPolygon");
				i = i.components;
				for (var g, f, j = 0; j < i.length; ++j) {
					g = this.createElementNS(this.gmlns, "gml:polygonMember"),
					f = this.buildGeometry.polygon.apply(this, [i[j]]),
					g.appendChild(f),
					h.appendChild(g)
				}
				return h
			},
			bounds : function (d) {
				var c = this.createElementNS(this.gmlns, "gml:Box");
				c.appendChild(this.buildCoordinatesNode(d));
				return c
			}
		},
		buildCoordinatesNode : function (h) {
			var g = this.createElementNS(this.gmlns, "gml:coordinates");
			g.setAttribute("decimal", ".");
			g.setAttribute("cs", ",");
			g.setAttribute("ts", " ");
			var f = [];
			if (h instanceof OpenLayers.Bounds) {
				f.push(h.left + "," + h.bottom),
				f.push(h.right + "," + h.top)
			} else {
				h = h.components ? h.components : [h];
				for (var e = 0; e < h.length; e++) {
					f.push(h[e].x + "," + h[e].y)
				}
			}
			f = this.createTextNode(f.join(" "));
			g.appendChild(f);
			return g
		},
		CLASS_NAME : "OpenLayers.Format.GML"
	});
OpenLayers.Format.GML || (OpenLayers.Format.GML = {});
OpenLayers.Format.GML.Base = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			gml : "http://www.opengis.net/gml",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance",
			wfs : "http://www.opengis.net/wfs"
		},
		defaultPrefix : "gml",
		schemaLocation : null,
		featureType : null,
		featureNS : null,
		geometryName : "geometry",
		extractAttributes : !0,
		srsName : null,
		xy : !0,
		geometryTypes : null,
		singleFeatureType : null,
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g,
			featureMember : /^(.*:)?featureMembers?$/
		},
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b]);
			this.setGeometryTypes();
			b && b.featureNS && this.setNamespace("feature", b.featureNS);
			this.singleFeatureType = !b || "string" === typeof b.featureType
		},
		read : function (h) {
			"string" == typeof h && (h = OpenLayers.Format.XML.prototype.read.apply(this, [h]));
			h && 9 == h.nodeType && (h = h.documentElement);
			var g = [];
			this.readNode(h, {
				features : g
			}, !0);
			if (0 == g.length) {
				var f = this.getElementsByTagNameNS(h, this.namespaces.gml, "featureMember");
				if (f.length) {
					h = 0;
					for (var e = f.length; h < e; ++h) {
						this.readNode(f[h], {
							features : g
						}, !0)
					}
				} else {
					f = this.getElementsByTagNameNS(h, this.namespaces.gml, "featureMembers"),
					f.length && this.readNode(f[0], {
						features : g
					}, !0)
				}
			}
			return g
		},
		readNode : function (d, f, e) {
			!0 === e && !0 === this.autoConfig && (this.featureType = null, delete this.namespaceAlias[this.featureNS], delete this.namespaces.feature, this.featureNS = null);
			!this.featureNS && (!(d.prefix in this.namespaces) && d.parentNode.namespaceURI == this.namespaces.gml && this.regExes.featureMember.test(d.parentNode.nodeName)) && (this.featureType = d.nodeName.split(":").pop(), this.setNamespace("feature", d.namespaceURI), this.featureNS = d.namespaceURI, this.autoConfig = !0);
			return OpenLayers.Format.XML.prototype.readNode.apply(this, [d, f])
		},
		readers : {
			gml : {
				featureMember : function (d, c) {
					this.readChildNodes(d, c)
				},
				featureMembers : function (d, c) {
					this.readChildNodes(d, c)
				},
				name : function (d, c) {
					c.name = this.getChildValue(d)
				},
				boundedBy : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					e.components && 0 < e.components.length && (f.bounds = e.components[0])
				},
				Point : function (d, f) {
					var e = {
						points : []
					};
					this.readChildNodes(d, e);
					f.components || (f.components = []);
					f.components.push(e.points[0])
				},
				coordinates : function (l, k) {
					for (var j = this.getChildValue(l).replace(this.regExes.trimSpace, ""), j = j.replace(this.regExes.trimComma, ","), j = j.split(this.regExes.splitSpace), i, h = j.length, n = Array(h), m = 0; m < h; ++m) {
						i = j[m].split(","),
						n[m] = this.xy ? new OpenLayers.Geometry.Point(i[0], i[1], i[2]) : new OpenLayers.Geometry.Point(i[1], i[0], i[2])
					}
					k.points = n
				},
				coord : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.points || (f.points = []);
					f.points.push(new OpenLayers.Geometry.Point(e.x, e.y, e.z))
				},
				X : function (d, c) {
					c.x = this.getChildValue(d)
				},
				Y : function (d, c) {
					c.y = this.getChildValue(d)
				},
				Z : function (d, c) {
					c.z = this.getChildValue(d)
				},
				MultiPoint : function (d, f) {
					var e = {
						components : []
					};
					this.readChildNodes(d, e);
					f.components = [new OpenLayers.Geometry.MultiPoint(e.components)]
				},
				pointMember : function (d, c) {
					this.readChildNodes(d, c)
				},
				LineString : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.components || (f.components = []);
					f.components.push(new OpenLayers.Geometry.LineString(e.points))
				},
				MultiLineString : function (d, f) {
					var e = {
						components : []
					};
					this.readChildNodes(d, e);
					f.components = [new OpenLayers.Geometry.MultiLineString(e.components)]
				},
				lineStringMember : function (d, c) {
					this.readChildNodes(d, c)
				},
				Polygon : function (d, f) {
					var e = {
						outer : null,
						inner : []
					};
					this.readChildNodes(d, e);
					e.inner.unshift(e.outer);
					f.components || (f.components = []);
					f.components.push(new OpenLayers.Geometry.Polygon(e.inner))
				},
				LinearRing : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.components = [new OpenLayers.Geometry.LinearRing(e.points)]
				},
				MultiPolygon : function (d, f) {
					var e = {
						components : []
					};
					this.readChildNodes(d, e);
					f.components = [new OpenLayers.Geometry.MultiPolygon(e.components)]
				},
				polygonMember : function (d, c) {
					this.readChildNodes(d, c)
				},
				GeometryCollection : function (d, f) {
					var e = {
						components : []
					};
					this.readChildNodes(d, e);
					f.components = [new OpenLayers.Geometry.Collection(e.components)]
				},
				geometryMember : function (d, c) {
					this.readChildNodes(d, c)
				}
			},
			feature : {
				"*" : function (h, g) {
					var f,
					e = h.localName || h.nodeName.split(":").pop();
					g.features ? !this.singleFeatureType && -1 !== OpenLayers.Util.indexOf(this.featureType, e) ? f = "_typeName" : e === this.featureType && (f = "_typeName") : 0 == h.childNodes.length || 1 == h.childNodes.length && 3 == h.firstChild.nodeType ? this.extractAttributes && (f = "_attribute") : f = "_geometry";
					f && this.readers.feature[f].apply(this, [h, g])
				},
				_typeName : function (i, h) {
					var g = {
						components : [],
						attributes : {}

					};
					this.readChildNodes(i, g);
					g.name && (g.attributes.name = g.name);
					var f = new OpenLayers.Feature.Vector(g.components[0], g.attributes);
					this.singleFeatureType || (f.type = i.nodeName.split(":").pop(), f.namespace = i.namespaceURI);
					var j = i.getAttribute("fid") || this.getAttributeNS(i, this.namespaces.gml, "id");
					j && (f.fid = j);
					this.internalProjection && (this.externalProjection && f.geometry) && f.geometry.transform(this.externalProjection, this.internalProjection);
					g.bounds && (f.bounds = g.bounds);
					h.features.push(f)
				},
				_geometry : function (d, c) {
					this.geometryName || (this.geometryName = d.nodeName.split(":").pop());
					this.readChildNodes(d, c)
				},
				_attribute : function (h, g) {
					var f = h.localName || h.nodeName.split(":").pop(),
					e = this.getChildValue(h);
					g.attributes[f] = e
				}
			},
			wfs : {
				FeatureCollection : function (d, c) {
					this.readChildNodes(d, c)
				}
			}
		},
		write : function (d) {
			var c;
			c = OpenLayers.Util.isArray(d) ? "featureMembers" : "featureMember";
			d = this.writeNode("gml:" + c, d);
			this.setAttributeNS(d, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			return OpenLayers.Format.XML.prototype.write.apply(this, [d])
		},
		writers : {
			gml : {
				featureMember : function (d) {
					var c = this.createElementNSPlus("gml:featureMember");
					this.writeNode("feature:_typeName", d, c);
					return c
				},
				MultiPoint : function (h) {
					var g = this.createElementNSPlus("gml:MultiPoint");
					h = h.components || [h];
					for (var f = 0, e = h.length; f < e; ++f) {
						this.writeNode("pointMember", h[f], g)
					}
					return g
				},
				pointMember : function (d) {
					var c = this.createElementNSPlus("gml:pointMember");
					this.writeNode("Point", d, c);
					return c
				},
				MultiLineString : function (h) {
					var g = this.createElementNSPlus("gml:MultiLineString");
					h = h.components || [h];
					for (var f = 0, e = h.length; f < e; ++f) {
						this.writeNode("lineStringMember", h[f], g)
					}
					return g
				},
				lineStringMember : function (d) {
					var c = this.createElementNSPlus("gml:lineStringMember");
					this.writeNode("LineString", d, c);
					return c
				},
				MultiPolygon : function (h) {
					var g = this.createElementNSPlus("gml:MultiPolygon");
					h = h.components || [h];
					for (var f = 0, e = h.length; f < e; ++f) {
						this.writeNode("polygonMember", h[f], g)
					}
					return g
				},
				polygonMember : function (d) {
					var c = this.createElementNSPlus("gml:polygonMember");
					this.writeNode("Polygon", d, c);
					return c
				},
				GeometryCollection : function (h) {
					for (var g = this.createElementNSPlus("gml:GeometryCollection"), f = 0, e = h.components.length; f < e; ++f) {
						this.writeNode("geometryMember", h.components[f], g)
					}
					return g
				},
				geometryMember : function (d) {
					var c = this.createElementNSPlus("gml:geometryMember");
					d = this.writeNode("feature:_geometry", d);
					c.appendChild(d.firstChild);
					return c
				}
			},
			feature : {
				_typeName : function (h) {
					var g = this.createElementNSPlus("feature:" + this.featureType, {
							attributes : {
								fid : h.fid
							}
						});
					h.geometry && this.writeNode("feature:_geometry", h.geometry, g);
					for (var f in h.attributes) {
						var e = h.attributes[f];
						null != e && this.writeNode("feature:_attribute", {
							name : f,
							value : e
						}, g)
					}
					return g
				},
				_geometry : function (d) {
					this.externalProjection && this.internalProjection && (d = d.clone().transform(this.internalProjection, this.externalProjection));
					var c = this.createElementNSPlus("feature:" + this.geometryName);
					d = this.writeNode("gml:" + this.geometryTypes[d.CLASS_NAME], d, c);
					this.srsName && d.setAttribute("srsName", this.srsName);
					return c
				},
				_attribute : function (b) {
					return this.createElementNSPlus("feature:" + b.name, {
						value : b.value
					})
				}
			},
			wfs : {
				FeatureCollection : function (h) {
					for (var g = this.createElementNSPlus("wfs:FeatureCollection"), f = 0, e = h.length; f < e; ++f) {
						this.writeNode("gml:featureMember", h[f], g)
					}
					return g
				}
			}
		},
		setGeometryTypes : function () {
			this.geometryTypes = {
				"OpenLayers.Geometry.Point" : "Point",
				"OpenLayers.Geometry.MultiPoint" : "MultiPoint",
				"OpenLayers.Geometry.LineString" : "LineString",
				"OpenLayers.Geometry.MultiLineString" : "MultiLineString",
				"OpenLayers.Geometry.Polygon" : "Polygon",
				"OpenLayers.Geometry.MultiPolygon" : "MultiPolygon",
				"OpenLayers.Geometry.Collection" : "GeometryCollection"
			}
		},
		CLASS_NAME : "OpenLayers.Format.GML.Base"
	});
OpenLayers.Format.GML.v3 = OpenLayers.Class(OpenLayers.Format.GML.Base, {
		schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd",
		curve : !1,
		multiCurve : !0,
		surface : !1,
		multiSurface : !0,
		initialize : function (b) {
			OpenLayers.Format.GML.Base.prototype.initialize.apply(this, [b])
		},
		readers : {
			gml : OpenLayers.Util.applyDefaults({
				featureMembers : function (d, c) {
					this.readChildNodes(d, c)
				},
				Curve : function (d, f) {
					var e = {
						points : []
					};
					this.readChildNodes(d, e);
					f.components || (f.components = []);
					f.components.push(new OpenLayers.Geometry.LineString(e.points))
				},
				segments : function (d, c) {
					this.readChildNodes(d, c)
				},
				LineStringSegment : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					e.points && Array.prototype.push.apply(f.points, e.points)
				},
				pos : function (d, f) {
					var e = this.getChildValue(d).replace(this.regExes.trimSpace, "").split(this.regExes.splitSpace),
					e = this.xy ? new OpenLayers.Geometry.Point(e[0], e[1], e[2]) : new OpenLayers.Geometry.Point(e[1], e[0], e[2]);
					f.points = [e]
				},
				posList : function (l, i) {
					for (var t = this.getChildValue(l).replace(this.regExes.trimSpace, "").split(this.regExes.splitSpace), s = parseInt(l.getAttribute("dimension")) || 2, r, q, p, o = Array(t.length / s), n = 0, m = t.length; n < m; n += s) {
						r = t[n],
						q = t[n + 1],
						p = 2 == s ? void 0 : t[n + 2],
						o[n / s] = this.xy ? new OpenLayers.Geometry.Point(r, q, p) : new OpenLayers.Geometry.Point(q, r, p)
					}
					i.points = o
				},
				Surface : function (d, c) {
					this.readChildNodes(d, c)
				},
				patches : function (d, c) {
					this.readChildNodes(d, c)
				},
				PolygonPatch : function (d, c) {
					this.readers.gml.Polygon.apply(this, [d, c])
				},
				exterior : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.outer = e.components[0]
				},
				interior : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.inner.push(e.components[0])
				},
				MultiCurve : function (d, f) {
					var e = {
						components : []
					};
					this.readChildNodes(d, e);
					0 < e.components.length && (f.components = [new OpenLayers.Geometry.MultiLineString(e.components)])
				},
				curveMember : function (d, c) {
					this.readChildNodes(d, c)
				},
				MultiSurface : function (d, f) {
					var e = {
						components : []
					};
					this.readChildNodes(d, e);
					0 < e.components.length && (f.components = [new OpenLayers.Geometry.MultiPolygon(e.components)])
				},
				surfaceMember : function (d, c) {
					this.readChildNodes(d, c)
				},
				surfaceMembers : function (d, c) {
					this.readChildNodes(d, c)
				},
				pointMembers : function (d, c) {
					this.readChildNodes(d, c)
				},
				lineStringMembers : function (d, c) {
					this.readChildNodes(d, c)
				},
				polygonMembers : function (d, c) {
					this.readChildNodes(d, c)
				},
				geometryMembers : function (d, c) {
					this.readChildNodes(d, c)
				},
				Envelope : function (h, g) {
					var f = {
						points : Array(2)
					};
					this.readChildNodes(h, f);
					g.components || (g.components = []);
					var e = f.points[0],
					f = f.points[1];
					g.components.push(new OpenLayers.Bounds(e.x, e.y, f.x, f.y))
				},
				lowerCorner : function (d, f) {
					var e = {};
					this.readers.gml.pos.apply(this, [d, e]);
					f.points[0] = e.points[0]
				},
				upperCorner : function (d, f) {
					var e = {};
					this.readers.gml.pos.apply(this, [d, e]);
					f.points[1] = e.points[0]
				}
			}, OpenLayers.Format.GML.Base.prototype.readers.gml),
			feature : OpenLayers.Format.GML.Base.prototype.readers.feature,
			wfs : OpenLayers.Format.GML.Base.prototype.readers.wfs
		},
		write : function (d) {
			var c;
			c = OpenLayers.Util.isArray(d) ? "featureMembers" : "featureMember";
			d = this.writeNode("gml:" + c, d);
			this.setAttributeNS(d, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			return OpenLayers.Format.XML.prototype.write.apply(this, [d])
		},
		writers : {
			gml : OpenLayers.Util.applyDefaults({
				featureMembers : function (h) {
					for (var g = this.createElementNSPlus("gml:featureMembers"), f = 0, e = h.length; f < e; ++f) {
						this.writeNode("feature:_typeName", h[f], g)
					}
					return g
				},
				Point : function (d) {
					var c = this.createElementNSPlus("gml:Point");
					this.writeNode("pos", d, c);
					return c
				},
				pos : function (b) {
					return this.createElementNSPlus("gml:pos", {
						value : this.xy ? b.x + " " + b.y : b.y + " " + b.x
					})
				},
				LineString : function (d) {
					var c = this.createElementNSPlus("gml:LineString");
					this.writeNode("posList", d.components, c);
					return c
				},
				Curve : function (d) {
					var c = this.createElementNSPlus("gml:Curve");
					this.writeNode("segments", d, c);
					return c
				},
				segments : function (d) {
					var c = this.createElementNSPlus("gml:segments");
					this.writeNode("LineStringSegment", d, c);
					return c
				},
				LineStringSegment : function (d) {
					var c = this.createElementNSPlus("gml:LineStringSegment");
					this.writeNode("posList", d.components, c);
					return c
				},
				posList : function (i) {
					for (var h = i.length, g = Array(h), f, j = 0; j < h; ++j) {
						f = i[j],
						g[j] = this.xy ? f.x + " " + f.y : f.y + " " + f.x
					}
					return this.createElementNSPlus("gml:posList", {
						value : g.join(" ")
					})
				},
				Surface : function (d) {
					var c = this.createElementNSPlus("gml:Surface");
					this.writeNode("patches", d, c);
					return c
				},
				patches : function (d) {
					var c = this.createElementNSPlus("gml:patches");
					this.writeNode("PolygonPatch", d, c);
					return c
				},
				PolygonPatch : function (h) {
					var g = this.createElementNSPlus("gml:PolygonPatch", {
							attributes : {
								interpolation : "planar"
							}
						});
					this.writeNode("exterior", h.components[0], g);
					for (var f = 1, e = h.components.length; f < e; ++f) {
						this.writeNode("interior", h.components[f], g)
					}
					return g
				},
				Polygon : function (h) {
					var g = this.createElementNSPlus("gml:Polygon");
					this.writeNode("exterior", h.components[0], g);
					for (var f = 1, e = h.components.length; f < e; ++f) {
						this.writeNode("interior", h.components[f], g)
					}
					return g
				},
				exterior : function (d) {
					var c = this.createElementNSPlus("gml:exterior");
					this.writeNode("LinearRing", d, c);
					return c
				},
				interior : function (d) {
					var c = this.createElementNSPlus("gml:interior");
					this.writeNode("LinearRing", d, c);
					return c
				},
				LinearRing : function (d) {
					var c = this.createElementNSPlus("gml:LinearRing");
					this.writeNode("posList", d.components, c);
					return c
				},
				MultiCurve : function (h) {
					var g = this.createElementNSPlus("gml:MultiCurve");
					h = h.components || [h];
					for (var f = 0, e = h.length; f < e; ++f) {
						this.writeNode("curveMember", h[f], g)
					}
					return g
				},
				curveMember : function (d) {
					var c = this.createElementNSPlus("gml:curveMember");
					this.curve ? this.writeNode("Curve", d, c) : this.writeNode("LineString", d, c);
					return c
				},
				MultiSurface : function (h) {
					var g = this.createElementNSPlus("gml:MultiSurface");
					h = h.components || [h];
					for (var f = 0, e = h.length; f < e; ++f) {
						this.writeNode("surfaceMember", h[f], g)
					}
					return g
				},
				surfaceMember : function (d) {
					var c = this.createElementNSPlus("gml:surfaceMember");
					this.surface ? this.writeNode("Surface", d, c) : this.writeNode("Polygon", d, c);
					return c
				},
				Envelope : function (d) {
					var c = this.createElementNSPlus("gml:Envelope");
					this.writeNode("lowerCorner", d, c);
					this.writeNode("upperCorner", d, c);
					this.srsName && c.setAttribute("srsName", this.srsName);
					return c
				},
				lowerCorner : function (b) {
					return this.createElementNSPlus("gml:lowerCorner", {
						value : this.xy ? b.left + " " + b.bottom : b.bottom + " " + b.left
					})
				},
				upperCorner : function (b) {
					return this.createElementNSPlus("gml:upperCorner", {
						value : this.xy ? b.right + " " + b.top : b.top + " " + b.right
					})
				}
			}, OpenLayers.Format.GML.Base.prototype.writers.gml),
			feature : OpenLayers.Format.GML.Base.prototype.writers.feature,
			wfs : OpenLayers.Format.GML.Base.prototype.writers.wfs
		},
		setGeometryTypes : function () {
			this.geometryTypes = {
				"OpenLayers.Geometry.Point" : "Point",
				"OpenLayers.Geometry.MultiPoint" : "MultiPoint",
				"OpenLayers.Geometry.LineString" : !0 === this.curve ? "Curve" : "LineString",
				"OpenLayers.Geometry.MultiLineString" : !1 === this.multiCurve ? "MultiLineString" : "MultiCurve",
				"OpenLayers.Geometry.Polygon" : !0 === this.surface ? "Surface" : "Polygon",
				"OpenLayers.Geometry.MultiPolygon" : !1 === this.multiSurface ? "MultiPolygon" : "MultiSurface",
				"OpenLayers.Geometry.Collection" : "GeometryCollection"
			}
		},
		CLASS_NAME : "OpenLayers.Format.GML.v3"
	});
OpenLayers.Format.Filter.v1_1_0 = OpenLayers.Class(OpenLayers.Format.GML.v3, OpenLayers.Format.Filter.v1, {
		VERSION : "1.1.0",
		schemaLocation : "http://www.opengis.net/ogc/filter/1.1.0/filter.xsd",
		initialize : function (b) {
			OpenLayers.Format.GML.v3.prototype.initialize.apply(this, [b])
		},
		readers : {
			ogc : OpenLayers.Util.applyDefaults({
				PropertyIsEqualTo : function (d, f) {
					var e = d.getAttribute("matchCase"),
					e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.EQUAL_TO,
							matchCase : !("false" === e || "0" === e)
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsNotEqualTo : function (d, f) {
					var e = d.getAttribute("matchCase"),
					e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
							matchCase : !("false" === e || "0" === e)
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsLike : function (j, i) {
					var h = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.LIKE
						});
					this.readChildNodes(j, h);
					var g = j.getAttribute("wildCard"),
					l = j.getAttribute("singleChar"),
					k = j.getAttribute("escapeChar");
					h.value2regex(g, l, k);
					i.filters.push(h)
				}
			}, OpenLayers.Format.Filter.v1.prototype.readers.ogc),
			gml : OpenLayers.Format.GML.v3.prototype.readers.gml,
			feature : OpenLayers.Format.GML.v3.prototype.readers.feature
		},
		writers : {
			ogc : OpenLayers.Util.applyDefaults({
				PropertyIsEqualTo : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsEqualTo", {
							attributes : {
								matchCase : d.matchCase
							}
						});
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsNotEqualTo : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsNotEqualTo", {
							attributes : {
								matchCase : d.matchCase
							}
						});
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsLike : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsLike", {
							attributes : {
								matchCase : d.matchCase,
								wildCard : "*",
								singleChar : ".",
								escapeChar : "!"
							}
						});
					this.writeNode("PropertyName", d, c);
					this.writeNode("Literal", d.regex2value(), c);
					return c
				},
				BBOX : function (d) {
					var f = this.createElementNSPlus("ogc:BBOX");
					d.property && this.writeNode("PropertyName", d, f);
					var e = this.writeNode("gml:Envelope", d.value);
					d.projection && e.setAttribute("srsName", d.projection);
					f.appendChild(e);
					return f
				},
				SortBy : function (h) {
					for (var g = this.createElementNSPlus("ogc:SortBy"), f = 0, e = h.length; f < e; f++) {
						this.writeNode("ogc:SortProperty", h[f], g)
					}
					return g
				},
				SortProperty : function (d) {
					var c = this.createElementNSPlus("ogc:SortProperty");
					this.writeNode("ogc:PropertyName", d, c);
					this.writeNode("ogc:SortOrder", "DESC" == d.order ? "DESC" : "ASC", c);
					return c
				},
				SortOrder : function (b) {
					return this.createElementNSPlus("ogc:SortOrder", {
						value : b
					})
				}
			}, OpenLayers.Format.Filter.v1.prototype.writers.ogc),
			gml : OpenLayers.Format.GML.v3.prototype.writers.gml,
			feature : OpenLayers.Format.GML.v3.prototype.writers.feature
		},
		writeSpatial : function (h, g) {
			var f = this.createElementNSPlus("ogc:" + g);
			this.writeNode("PropertyName", h, f);
			if (h.value instanceof OpenLayers.Filter.Function) {
				this.writeNode("Function", h.value, f)
			} else {
				var e;
				e = h.value instanceof OpenLayers.Geometry ? this.writeNode("feature:_geometry", h.value).firstChild : this.writeNode("gml:Envelope", h.value);
				h.projection && e.setAttribute("srsName", h.projection);
				f.appendChild(e)
			}
			return f
		},
		CLASS_NAME : "OpenLayers.Format.Filter.v1_1_0"
	});
OpenLayers.Format.OWSCommon = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.0.0",
		getVersion : function (d) {
			var c = this.version;
			c || ((d = d.getAttribute("xmlns:ows")) && "1.1" === d.substring(d.lastIndexOf("/") + 1) && (c = "1.1.0"), c || (c = this.defaultVersion));
			return c
		},
		CLASS_NAME : "OpenLayers.Format.OWSCommon"
	});
OpenLayers.Format.OWSCommon.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		read : function (d, f) {
			OpenLayers.Util.applyDefaults(f, this.options);
			var e = {};
			this.readChildNodes(d, e);
			return e
		},
		readers : {
			ows : {
				Exception : function (d, f) {
					var e = {
						code : d.getAttribute("exceptionCode"),
						locator : d.getAttribute("locator"),
						texts : []
					};
					f.exceptions.push(e);
					this.readChildNodes(d, e)
				},
				ExceptionText : function (d, f) {
					var e = this.getChildValue(d);
					f.texts.push(e)
				},
				ServiceIdentification : function (d, c) {
					c.serviceIdentification = {};
					this.readChildNodes(d, c.serviceIdentification)
				},
				Title : function (d, c) {
					c.title = this.getChildValue(d)
				},
				Abstract : function (d, c) {
					c["abstract"] = this.getChildValue(d)
				},
				Keywords : function (d, c) {
					c.keywords = {};
					this.readChildNodes(d, c.keywords)
				},
				Keyword : function (d, c) {
					c[this.getChildValue(d)] = !0
				},
				ServiceType : function (d, c) {
					c.serviceType = {
						codeSpace : d.getAttribute("codeSpace"),
						value : this.getChildValue(d)
					}
				},
				ServiceTypeVersion : function (d, c) {
					c.serviceTypeVersion = this.getChildValue(d)
				},
				Fees : function (d, c) {
					c.fees = this.getChildValue(d)
				},
				AccessConstraints : function (d, c) {
					c.accessConstraints = this.getChildValue(d)
				},
				ServiceProvider : function (d, c) {
					c.serviceProvider = {};
					this.readChildNodes(d, c.serviceProvider)
				},
				ProviderName : function (d, c) {
					c.providerName = this.getChildValue(d)
				},
				ProviderSite : function (d, c) {
					c.providerSite = this.getAttributeNS(d, this.namespaces.xlink, "href")
				},
				ServiceContact : function (d, c) {
					c.serviceContact = {};
					this.readChildNodes(d, c.serviceContact)
				},
				IndividualName : function (d, c) {
					c.individualName = this.getChildValue(d)
				},
				PositionName : function (d, c) {
					c.positionName = this.getChildValue(d)
				},
				ContactInfo : function (d, c) {
					c.contactInfo = {};
					this.readChildNodes(d, c.contactInfo)
				},
				Phone : function (d, c) {
					c.phone = {};
					this.readChildNodes(d, c.phone)
				},
				Voice : function (d, c) {
					c.voice = this.getChildValue(d)
				},
				Address : function (d, c) {
					c.address = {};
					this.readChildNodes(d, c.address)
				},
				DeliveryPoint : function (d, c) {
					c.deliveryPoint = this.getChildValue(d)
				},
				City : function (d, c) {
					c.city = this.getChildValue(d)
				},
				AdministrativeArea : function (d, c) {
					c.administrativeArea = this.getChildValue(d)
				},
				PostalCode : function (d, c) {
					c.postalCode = this.getChildValue(d)
				},
				Country : function (d, c) {
					c.country = this.getChildValue(d)
				},
				ElectronicMailAddress : function (d, c) {
					c.electronicMailAddress = this.getChildValue(d)
				},
				Role : function (d, c) {
					c.role = this.getChildValue(d)
				},
				OperationsMetadata : function (d, c) {
					c.operationsMetadata = {};
					this.readChildNodes(d, c.operationsMetadata)
				},
				Operation : function (d, f) {
					var e = d.getAttribute("name");
					f[e] = {};
					this.readChildNodes(d, f[e])
				},
				DCP : function (d, c) {
					c.dcp = {};
					this.readChildNodes(d, c.dcp)
				},
				HTTP : function (d, c) {
					c.http = {};
					this.readChildNodes(d, c.http)
				},
				Get : function (d, f) {
					f.get || (f.get = []);
					var e = {
						url : this.getAttributeNS(d, this.namespaces.xlink, "href")
					};
					this.readChildNodes(d, e);
					f.get.push(e)
				},
				Post : function (d, f) {
					f.post || (f.post = []);
					var e = {
						url : this.getAttributeNS(d, this.namespaces.xlink, "href")
					};
					this.readChildNodes(d, e);
					f.post.push(e)
				},
				Parameter : function (d, f) {
					f.parameters || (f.parameters = {});
					var e = d.getAttribute("name");
					f.parameters[e] = {};
					this.readChildNodes(d, f.parameters[e])
				},
				Constraint : function (d, f) {
					f.constraints || (f.constraints = {});
					var e = d.getAttribute("name");
					f.constraints[e] = {};
					this.readChildNodes(d, f.constraints[e])
				},
				Value : function (d, c) {
					c[this.getChildValue(d)] = !0
				},
				OutputFormat : function (d, c) {
					c.formats.push({
						value : this.getChildValue(d)
					});
					this.readChildNodes(d, c)
				},
				WGS84BoundingBox : function (d, f) {
					var e = {};
					e.crs = d.getAttribute("crs");
					f.BoundingBox ? f.BoundingBox.push(e) : (f.projection = e.crs, e = f);
					this.readChildNodes(d, e)
				},
				BoundingBox : function (d, c) {
					this.readers.ows.WGS84BoundingBox.apply(this, [d, c])
				},
				LowerCorner : function (d, f) {
					var e = this.getChildValue(d).replace(this.regExes.trimSpace, ""),
					e = e.replace(this.regExes.trimComma, ","),
					e = e.split(this.regExes.splitSpace);
					f.left = e[0];
					f.bottom = e[1]
				},
				UpperCorner : function (d, f) {
					var e = this.getChildValue(d).replace(this.regExes.trimSpace, ""),
					e = e.replace(this.regExes.trimComma, ","),
					e = e.split(this.regExes.splitSpace);
					f.right = e[0];
					f.top = e[1];
					f.bounds = new OpenLayers.Bounds(f.left, f.bottom, f.right, f.top);
					delete f.left;
					delete f.bottom;
					delete f.right;
					delete f.top
				},
				Language : function (d, c) {
					c.language = this.getChildValue(d)
				}
			}
		},
		writers : {
			ows : {
				BoundingBox : function (d) {
					var c = this.createElementNSPlus("ows:BoundingBox", {
							attributes : {
								crs : d.projection
							}
						});
					this.writeNode("ows:LowerCorner", d, c);
					this.writeNode("ows:UpperCorner", d, c);
					return c
				},
				LowerCorner : function (b) {
					return this.createElementNSPlus("ows:LowerCorner", {
						value : b.bounds.left + " " + b.bounds.bottom
					})
				},
				UpperCorner : function (b) {
					return this.createElementNSPlus("ows:UpperCorner", {
						value : b.bounds.right + " " + b.bounds.top
					})
				},
				Identifier : function (b) {
					return this.createElementNSPlus("ows:Identifier", {
						value : b
					})
				},
				Title : function (b) {
					return this.createElementNSPlus("ows:Title", {
						value : b
					})
				},
				Abstract : function (b) {
					return this.createElementNSPlus("ows:Abstract", {
						value : b
					})
				},
				OutputFormat : function (b) {
					return this.createElementNSPlus("ows:OutputFormat", {
						value : b
					})
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.OWSCommon.v1"
	});
OpenLayers.Format.OWSCommon.v1_0_0 = OpenLayers.Class(OpenLayers.Format.OWSCommon.v1, {
		namespaces : {
			ows : "http://www.opengis.net/ows",
			xlink : "http://www.w3.org/1999/xlink"
		},
		readers : {
			ows : OpenLayers.Util.applyDefaults({
				ExceptionReport : function (d, c) {
					c.success = !1;
					c.exceptionReport = {
						version : d.getAttribute("version"),
						language : d.getAttribute("language"),
						exceptions : []
					};
					this.readChildNodes(d, c.exceptionReport)
				}
			}, OpenLayers.Format.OWSCommon.v1.prototype.readers.ows)
		},
		writers : {
			ows : OpenLayers.Format.OWSCommon.v1.prototype.writers.ows
		},
		CLASS_NAME : "OpenLayers.Format.OWSCommon.v1_0_0"
	});
OpenLayers.Format.WFST.v1_1_0 = OpenLayers.Class(OpenLayers.Format.Filter.v1_1_0, OpenLayers.Format.WFST.v1, {
		version : "1.1.0",
		schemaLocations : {
			wfs : "http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"
		},
		initialize : function (b) {
			OpenLayers.Format.Filter.v1_1_0.prototype.initialize.apply(this, [b]);
			OpenLayers.Format.WFST.v1.prototype.initialize.apply(this, [b])
		},
		readNode : function (d, c) {
			return OpenLayers.Format.GML.v3.prototype.readNode.apply(this, [d, c])
		},
		readers : {
			wfs : OpenLayers.Util.applyDefaults({
				FeatureCollection : function (d, c) {
					c.numberOfFeatures = parseInt(d.getAttribute("numberOfFeatures"));
					OpenLayers.Format.WFST.v1.prototype.readers.wfs.FeatureCollection.apply(this, arguments)
				},
				TransactionResponse : function (d, c) {
					c.insertIds = [];
					c.success = !1;
					this.readChildNodes(d, c)
				},
				TransactionSummary : function (d, c) {
					c.success = !0
				},
				InsertResults : function (d, c) {
					this.readChildNodes(d, c)
				},
				Feature : function (d, f) {
					var e = {
						fids : []
					};
					this.readChildNodes(d, e);
					f.insertIds.push(e.fids[0])
				}
			}, OpenLayers.Format.WFST.v1.prototype.readers.wfs),
			gml : OpenLayers.Format.GML.v3.prototype.readers.gml,
			feature : OpenLayers.Format.GML.v3.prototype.readers.feature,
			ogc : OpenLayers.Format.Filter.v1_1_0.prototype.readers.ogc,
			ows : OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows
		},
		writers : {
			wfs : OpenLayers.Util.applyDefaults({
				GetFeature : function (d) {
					var c = OpenLayers.Format.WFST.v1.prototype.writers.wfs.GetFeature.apply(this, arguments);
					d && this.setAttributes(c, {
						resultType : d.resultType,
						startIndex : d.startIndex,
						count : d.count
					});
					return c
				},
				Query : function (h) {
					h = OpenLayers.Util.extend({
							featureNS : this.featureNS,
							featurePrefix : this.featurePrefix,
							featureType : this.featureType,
							srsName : this.srsName
						}, h);
					var g = h.featurePrefix,
					f = this.createElementNSPlus("wfs:Query", {
							attributes : {
								typeName : (g ? g + ":" : "") + h.featureType,
								srsName : h.srsName
							}
						});
					h.featureNS && f.setAttribute("xmlns:" + g, h.featureNS);
					if (h.propertyNames) {
						for (var g = 0, e = h.propertyNames.length; g < e; g++) {
							this.writeNode("wfs:PropertyName", {
								property : h.propertyNames[g]
							}, f)
						}
					}
					h.filter && (OpenLayers.Format.WFST.v1_1_0.prototype.setFilterProperty.call(this, h.filter), this.writeNode("ogc:Filter", h.filter, f));
					return f
				},
				PropertyName : function (b) {
					return this.createElementNSPlus("wfs:PropertyName", {
						value : b.property
					})
				}
			}, OpenLayers.Format.WFST.v1.prototype.writers.wfs),
			gml : OpenLayers.Format.GML.v3.prototype.writers.gml,
			feature : OpenLayers.Format.GML.v3.prototype.writers.feature,
			ogc : OpenLayers.Format.Filter.v1_1_0.prototype.writers.ogc
		},
		CLASS_NAME : "OpenLayers.Format.WFST.v1_1_0"
	});
OpenLayers.Protocol = OpenLayers.Class({
		format : null,
		options : null,
		autoDestroy : !0,
		defaultFilter : null,
		initialize : function (b) {
			b = b || {};
			OpenLayers.Util.extend(this, b);
			this.options = b
		},
		mergeWithDefaultFilter : function (b) {
			return b && this.defaultFilter ? new OpenLayers.Filter.Logical({
				type : OpenLayers.Filter.Logical.AND,
				filters : [this.defaultFilter, b]
			}) : b || this.defaultFilter || void 0
		},
		destroy : function () {
			this.format = this.options = null
		},
		read : function (b) {
			b = b || {};
			b.filter = this.mergeWithDefaultFilter(b.filter)
		},
		create : function () {},
		update : function () {},
		"delete" : function () {},
		commit : function () {},
		abort : function () {},
		createCallback : function (d, f, e) {
			return OpenLayers.Function.bind(function () {
				d.apply(this, [f, e])
			}, this)
		},
		CLASS_NAME : "OpenLayers.Protocol"
	});
OpenLayers.Protocol.Response = OpenLayers.Class({
		code : null,
		requestType : null,
		last : !0,
		features : null,
		data : null,
		reqFeatures : null,
		priv : null,
		error : null,
		initialize : function (b) {
			OpenLayers.Util.extend(this, b)
		},
		success : function () {
			return 0 < this.code
		},
		CLASS_NAME : "OpenLayers.Protocol.Response"
	});
OpenLayers.Protocol.Response.SUCCESS = 1;
OpenLayers.Protocol.Response.FAILURE = 0;
OpenLayers.Format.JSON = OpenLayers.Class(OpenLayers.Format, {
		indent : "    ",
		space : " ",
		newline : "\n",
		level : 0,
		pretty : !1,
		nativeJSON : function () {
			return !(!window.JSON || !("function" == typeof JSON.parse && "function" == typeof JSON.stringify))
		}
		(),
		read : function (a, b) {
			var c;
			if (this.nativeJSON) {
				c = JSON.parse(a, b)
			} else {
				try {
					if (/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) && (c = eval("(" + a + ")"), "function" === typeof b)) {
						var d = function (a, c) {
							if (c && "object" === typeof c) {
								for (var e in c) {
									c.hasOwnProperty(e) && (c[e] = d(e, c[e]))
								}
							}
							return b(a, c)
						};
						c = d("", c)
					}
				} catch (e) {}

			}
			this.keepData && (this.data = c);
			return c
		},
		write : function (i, h) {
			this.pretty = !!h;
			var g = null,
			f = typeof i;
			if (this.serialize[f]) {
				try {
					g = !this.pretty && this.nativeJSON ? JSON.stringify(i) : this.serialize[f].apply(this, [i])
				} catch (j) {
					OpenLayers.Console.error("Trouble serializing: " + j)
				}
			}
			return g
		},
		writeIndent : function () {
			var d = [];
			if (this.pretty) {
				for (var c = 0; c < this.level; ++c) {
					d.push(this.indent)
				}
			}
			return d.join("")
		},
		writeNewline : function () {
			return this.pretty ? this.newline : ""
		},
		writeSpace : function () {
			return this.pretty ? this.space : ""
		},
		serialize : {
			object : function (j) {
				if (null == j) {
					return "null"
				}
				if (j.constructor == Date) {
					return this.serialize.date.apply(this, [j])
				}
				if (j.constructor == Array) {
					return this.serialize.array.apply(this, [j])
				}
				var i = ["{"];
				this.level += 1;
				var h,
				g,
				l,
				k = !1;
				for (h in j) {
					j.hasOwnProperty(h) && (g = OpenLayers.Format.JSON.prototype.write.apply(this, [h, this.pretty]), l = OpenLayers.Format.JSON.prototype.write.apply(this, [j[h], this.pretty]), null != g && null != l && (k && i.push(","), i.push(this.writeNewline(), this.writeIndent(), g, ":", this.writeSpace(), l), k = !0))
				}
				this.level -= 1;
				i.push(this.writeNewline(), this.writeIndent(), "}");
				return i.join("")
			},
			array : function (i) {
				var h,
				g = ["["];
				this.level += 1;
				for (var f = 0, j = i.length; f < j; ++f) {
					h = OpenLayers.Format.JSON.prototype.write.apply(this, [i[f], this.pretty]),
					null != h && (0 < f && g.push(","), g.push(this.writeNewline(), this.writeIndent(), h))
				}
				this.level -= 1;
				g.push(this.writeNewline(), this.writeIndent(), "]");
				return g.join("")
			},
			string : function (d) {
				var c = {
					"\b" : "\\b",
					"\t" : "\\t",
					"\n" : "\\n",
					"\f" : "\\f",
					"\r" : "\\r",
					'"' : '\\"',
					"\\" : "\\\\"
				};
				return /["\\\x00-\x1f]/.test(d) ? '"' + d.replace(/([\x00-\x1f\\"])/g, function (f, b) {
					var a = c[b];
					if (a) {
						return a
					}
					a = b.charCodeAt();
					return "\\u00" + Math.floor(a / 16).toString(16) + (a % 16).toString(16)
				}) + '"' : '"' + d + '"'
			},
			number : function (b) {
				return isFinite(b) ? String(b) : "null"
			},
			"boolean" : function (b) {
				return String(b)
			},
			date : function (d) {
				function c(a) {
					return 10 > a ? "0" + a : a
				}
				return '"' + d.getFullYear() + "-" + c(d.getMonth() + 1) + "-" + c(d.getDate()) + "T" + c(d.getHours()) + ":" + c(d.getMinutes()) + ":" + c(d.getSeconds()) + '"'
			}
		},
		CLASS_NAME : "OpenLayers.Format.JSON"
	});
OpenLayers.Format.GeoJSON = OpenLayers.Class(OpenLayers.Format.JSON, {
		ignoreExtraDims : !1,
		read : function (o, n, m) {
			n = n ? n : "FeatureCollection";
			var i = null,
			v = null;
			if (v = "string" == typeof o ? OpenLayers.Format.JSON.prototype.read.apply(this, [o, m]) : o) {
				if ("string" != typeof v.type) {
					OpenLayers.Console.error("Bad GeoJSON - no type: " + o)
				} else {
					if (this.isValidType(v, n)) {
						switch (n) {
						case "Geometry":
							try {
								i = this.parseGeometry(v)
							} catch (u) {
								OpenLayers.Console.error(u)
							}
							break;
						case "Feature":
							try {
								i = this.parseFeature(v),
								i.type = "Feature"
							} catch (t) {
								OpenLayers.Console.error(t)
							}
							break;
						case "FeatureCollection":
							switch (i = [], v.type) {
							case "Feature":
								try {
									i.push(this.parseFeature(v))
								} catch (s) {
									i = null,
									OpenLayers.Console.error(s)
								}
								break;
							case "FeatureCollection":
								o = 0;
								for (n = v.features.length; o < n; ++o) {
									try {
										i.push(this.parseFeature(v.features[o]))
									} catch (r) {
										i = null,
										OpenLayers.Console.error(r)
									}
								}
								break;
							default:
								try {
									var q = this.parseGeometry(v);
									i.push(new OpenLayers.Feature.Vector(q))
								} catch (p) {
									i = null,
									OpenLayers.Console.error(p)
								}
							}
						}
					}
				}
			} else {
				OpenLayers.Console.error("Bad JSON: " + o)
			}
			return i
		},
		isValidType : function (d, f) {
			var e = !1;
			switch (f) {
			case "Geometry":
				-1 == OpenLayers.Util.indexOf("Point MultiPoint LineString MultiLineString Polygon MultiPolygon Box GeometryCollection".split(" "), d.type) ? OpenLayers.Console.error("Unsupported geometry type: " + d.type) : e = !0;
				break;
			case "FeatureCollection":
				e = !0;
				break;
			default:
				d.type == f ? e = !0 : OpenLayers.Console.error("Cannot convert types from " + d.type + " to " + f)
			}
			return e
		},
		parseFeature : function (i) {
			var h,
			g,
			f;
			g = i.properties ? i.properties : {};
			f = i.geometry && i.geometry.bbox || i.bbox;
			try {
				h = this.parseGeometry(i.geometry)
			} catch (j) {
				throw j
			}
			h = new OpenLayers.Feature.Vector(h, g);
			f && (h.bounds = OpenLayers.Bounds.fromArray(f));
			i.id && (h.fid = i.id);
			return h
		},
		parseGeometry : function (i) {
			if (null == i) {
				return null
			}
			var h,
			g = !1;
			if ("GeometryCollection" == i.type) {
				if (!OpenLayers.Util.isArray(i.geometries)) {
					throw "GeometryCollection must have geometries array: " + i
				}
				h = i.geometries.length;
				for (var g = Array(h), f = 0; f < h; ++f) {
					g[f] = this.parseGeometry.apply(this, [i.geometries[f]])
				}
				h = new OpenLayers.Geometry.Collection(g);
				g = !0
			} else {
				if (!OpenLayers.Util.isArray(i.coordinates)) {
					throw "Geometry must have coordinates array: " + i
				}
				if (!this.parseCoords[i.type.toLowerCase()]) {
					throw "Unsupported geometry type: " + i.type
				}
				try {
					h = this.parseCoords[i.type.toLowerCase()].apply(this, [i.coordinates])
				} catch (j) {
					throw j
				}
			}
			this.internalProjection && (this.externalProjection && !g) && h.transform(this.externalProjection, this.internalProjection);
			return h
		},
		parseCoords : {
			point : function (b) {
				if (!1 == this.ignoreExtraDims && 2 != b.length) {
					throw "Only 2D points are supported: " + b
				}
				return new OpenLayers.Geometry.Point(b[0], b[1])
			},
			multipoint : function (j) {
				for (var i = [], h = null, g = 0, l = j.length; g < l; ++g) {
					try {
						h = this.parseCoords.point.apply(this, [j[g]])
					} catch (k) {
						throw k
					}
					i.push(h)
				}
				return new OpenLayers.Geometry.MultiPoint(i)
			},
			linestring : function (j) {
				for (var i = [], h = null, g = 0, l = j.length; g < l; ++g) {
					try {
						h = this.parseCoords.point.apply(this, [j[g]])
					} catch (k) {
						throw k
					}
					i.push(h)
				}
				return new OpenLayers.Geometry.LineString(i)
			},
			multilinestring : function (j) {
				for (var i = [], h = null, g = 0, l = j.length; g < l; ++g) {
					try {
						h = this.parseCoords.linestring.apply(this, [j[g]])
					} catch (k) {
						throw k
					}
					i.push(h)
				}
				return new OpenLayers.Geometry.MultiLineString(i)
			},
			polygon : function (l) {
				for (var k = [], j, i, h = 0, n = l.length; h < n; ++h) {
					try {
						i = this.parseCoords.linestring.apply(this, [l[h]])
					} catch (m) {
						throw m
					}
					j = new OpenLayers.Geometry.LinearRing(i.components);
					k.push(j)
				}
				return new OpenLayers.Geometry.Polygon(k)
			},
			multipolygon : function (j) {
				for (var i = [], h = null, g = 0, l = j.length; g < l; ++g) {
					try {
						h = this.parseCoords.polygon.apply(this, [j[g]])
					} catch (k) {
						throw k
					}
					i.push(h)
				}
				return new OpenLayers.Geometry.MultiPolygon(i)
			},
			box : function (b) {
				if (2 != b.length) {
					throw "GeoJSON box coordinates must have 2 elements"
				}
				return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(b[0][0], b[0][1]), new OpenLayers.Geometry.Point(b[1][0], b[0][1]), new OpenLayers.Geometry.Point(b[1][0], b[1][1]), new OpenLayers.Geometry.Point(b[0][0], b[1][1]), new OpenLayers.Geometry.Point(b[0][0], b[0][1])])])
			}
		},
		write : function (j, i) {
			var h = {
				type : null
			};
			if (OpenLayers.Util.isArray(j)) {
				h.type = "FeatureCollection";
				var g = j.length;
				h.features = Array(g);
				for (var l = 0; l < g; ++l) {
					var k = j[l];
					if (!k instanceof OpenLayers.Feature.Vector) {
						throw "FeatureCollection only supports collections of features: " + k
					}
					h.features[l] = this.extract.feature.apply(this, [k])
				}
			} else {
				0 == j.CLASS_NAME.indexOf("OpenLayers.Geometry") ? h = this.extract.geometry.apply(this, [j]) : j instanceof OpenLayers.Feature.Vector && (h = this.extract.feature.apply(this, [j]), j.layer && j.layer.projection && (h.crs = this.createCRSObject(j)))
			}
			return OpenLayers.Format.JSON.prototype.write.apply(this, [h, i])
		},
		createCRSObject : function (d) {
			d = d.layer.projection.toString();
			var c = {};
			d.match(/epsg:/i) && (d = parseInt(d.substring(d.indexOf(":") + 1)), c = 4326 == d ? {
					type : "name",
					properties : {
						name : "urn:ogc:def:crs:OGC:1.3:CRS84"
					}
				}
				 : {
				type : "name",
				properties : {
					name : "EPSG:" + d
				}
			});
			return c
		},
		extract : {
			feature : function (d) {
				var c = this.extract.geometry.apply(this, [d.geometry]),
				c = {
					type : "Feature",
					properties : d.attributes,
					geometry : c
				};
				null != d.fid && (c.id = d.fid);
				return c
			},
			geometry : function (d) {
				if (null == d) {
					return null
				}
				this.internalProjection && this.externalProjection && (d = d.clone(), d.transform(this.internalProjection, this.externalProjection));
				var c = d.CLASS_NAME.split(".")[2];
				d = this.extract[c.toLowerCase()].apply(this, [d]);
				return "Collection" == c ? {
					type : "GeometryCollection",
					geometries : d
				}
				 : {
					type : c,
					coordinates : d
				}
			},
			point : function (b) {
				return [b.x, b.y]
			},
			multipoint : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push(this.extract.point.apply(this, [h.components[f]]))
				}
				return g
			},
			linestring : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push(this.extract.point.apply(this, [h.components[f]]))
				}
				return g
			},
			multilinestring : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push(this.extract.linestring.apply(this, [h.components[f]]))
				}
				return g
			},
			polygon : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push(this.extract.linestring.apply(this, [h.components[f]]))
				}
				return g
			},
			multipolygon : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push(this.extract.polygon.apply(this, [h.components[f]]))
				}
				return g
			},
			collection : function (h) {
				for (var g = h.components.length, f = Array(g), e = 0; e < g; ++e) {
					f[e] = this.extract.geometry.apply(this, [h.components[e]])
				}
				return f
			}
		},
		CLASS_NAME : "OpenLayers.Format.GeoJSON"
	});
OpenLayers.Protocol.Script = OpenLayers.Class(OpenLayers.Protocol, {
		url : null,
		params : null,
		callback : null,
		callbackTemplate : "OpenLayers.Protocol.Script.registry.${id}",
		callbackKey : "callback",
		callbackPrefix : "",
		scope : null,
		format : null,
		pendingRequests : null,
		srsInBBOX : !1,
		initialize : function (d) {
			d = d || {};
			this.params = {};
			this.pendingRequests = {};
			OpenLayers.Protocol.prototype.initialize.apply(this, arguments);
			this.format || (this.format = new OpenLayers.Format.GeoJSON);
			if (!this.filterToParams && OpenLayers.Format.QueryStringFilter) {
				var c = new OpenLayers.Format.QueryStringFilter({
						srsInBBOX : this.srsInBBOX
					});
				this.filterToParams = function (b, a) {
					return c.write(b, a)
				}
			}
		},
		read : function (d) {
			OpenLayers.Protocol.prototype.read.apply(this, arguments);
			d = OpenLayers.Util.applyDefaults(d, this.options);
			d.params = OpenLayers.Util.applyDefaults(d.params, this.options.params);
			d.filter && this.filterToParams && (d.params = this.filterToParams(d.filter, d.params));
			var f = new OpenLayers.Protocol.Response({
					requestType : "read"
				}),
			e = this.createRequest(d.url, d.params, OpenLayers.Function.bind(function (a) {
						f.data = a;
						this.handleRead(f, d)
					}, this));
			f.priv = e;
			return f
		},
		createRequest : function (h, g, f) {
			f = OpenLayers.Protocol.Script.register(f);
			var e = OpenLayers.String.format(this.callbackTemplate, {
					id : f
				});
			g = OpenLayers.Util.extend({}, g);
			g[this.callbackKey] = this.callbackPrefix + e;
			h = OpenLayers.Util.urlAppend(h, OpenLayers.Util.getParameterString(g));
			g = document.createElement("script");
			g.type = "text/javascript";
			g.src = h;
			g.id = "OpenLayers_Protocol_Script_" + f;
			this.pendingRequests[g.id] = g;
			document.getElementsByTagName("head")[0].appendChild(g);
			return g
		},
		destroyRequest : function (b) {
			OpenLayers.Protocol.Script.unregister(b.id.split("_").pop());
			delete this.pendingRequests[b.id];
			b.parentNode && b.parentNode.removeChild(b)
		},
		handleRead : function (d, c) {
			this.handleResponse(d, c)
		},
		handleResponse : function (d, c) {
			c.callback && (d.data ? (d.features = this.parseFeatures(d.data), d.code = OpenLayers.Protocol.Response.SUCCESS) : d.code = OpenLayers.Protocol.Response.FAILURE, this.destroyRequest(d.priv), c.callback.call(c.scope, d))
		},
		parseFeatures : function (b) {
			return this.format.read(b)
		},
		abort : function (d) {
			if (d) {
				this.destroyRequest(d.priv)
			} else {
				for (var c in this.pendingRequests) {
					this.destroyRequest(this.pendingRequests[c])
				}
			}
		},
		destroy : function () {
			this.abort();
			delete this.params;
			delete this.format;
			OpenLayers.Protocol.prototype.destroy.apply(this)
		},
		CLASS_NAME : "OpenLayers.Protocol.Script"
	});
(function () {
	var d = OpenLayers.Protocol.Script,
	c = 0;
	d.registry = {};
	d.register = function (b) {
		var a = "c" + ++c;
		d.registry[a] = function () {
			b.apply(this, arguments)
		};
		return a
	};
	d.unregister = function (a) {
		delete d.registry[a]
	}
})();
OpenLayers.Control.Panel = OpenLayers.Class(OpenLayers.Control, {
		controls : null,
		autoActivate : !0,
		defaultControl : null,
		saveState : !1,
		allowDepress : !1,
		activeState : null,
		initialize : function (b) {
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.controls = [];
			this.activeState = {}

		},
		destroy : function () {
			this.map && this.map.events.unregister("buttonclick", this, this.onButtonClick);
			OpenLayers.Control.prototype.destroy.apply(this, arguments);
			for (var d, c = this.controls.length - 1; 0 <= c; c--) {
				d = this.controls[c],
				d.events && d.events.un({
					activate : this.iconOn,
					deactivate : this.iconOff
				}),
				d.panel_div = null
			}
			this.activeState = null
		},
		activate : function () {
			if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
				for (var d, f = 0, e = this.controls.length; f < e; f++) {
					d = this.controls[f],
					(d === this.defaultControl || this.saveState && this.activeState[d.id]) && d.activate()
				}
				!0 === this.saveState && (this.defaultControl = null);
				this.redraw();
				return !0
			}
			return !1
		},
		deactivate : function () {
			if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
				for (var d, f = 0, e = this.controls.length; f < e; f++) {
					d = this.controls[f],
					this.activeState[d.id] = d.deactivate()
				}
				this.redraw();
				return !0
			}
			return !1
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			this.outsideViewport ? (this.events.attachToElement(this.div), this.events.register("buttonclick", this, this.onButtonClick)) : this.map.events.register("buttonclick", this, this.onButtonClick);
			this.addControlsToMap(this.controls);
			return this.div
		},
		redraw : function () {
			for (var d = this.div.childNodes.length - 1; 0 <= d; d--) {
				this.div.removeChild(this.div.childNodes[d])
			}
			this.div.innerHTML = "";
			if (this.active) {
				for (var d = 0, c = this.controls.length; d < c; d++) {
					this.div.appendChild(this.controls[d].panel_div)
				}
			}
		},
		activateControl : function (h) {
			if (!this.active) {
				return !1
			}
			if (h.type == OpenLayers.Control.TYPE_BUTTON) {
				h.trigger()
			} else {
				if (h.type == OpenLayers.Control.TYPE_TOGGLE) {
					h.active ? h.deactivate() : h.activate()
				} else {
					if (this.allowDepress && h.active) {
						h.deactivate()
					} else {
						for (var g, f = 0, e = this.controls.length; f < e; f++) {
							g = this.controls[f],
							g != h && (g.type === OpenLayers.Control.TYPE_TOOL || null == g.type) && g.deactivate()
						}
						h.activate()
					}
				}
			}
		},
		addControls : function (i) {
			OpenLayers.Util.isArray(i) || (i = [i]);
			this.controls = this.controls.concat(i);
			for (var h = 0, g = i.length; h < g; h++) {
				var f = i[h],
				j = this.createControlMarkup(f);
				OpenLayers.Element.addClass(j, f.displayClass + "ItemInactive");
				OpenLayers.Element.addClass(j, "olButton");
				"" != f.title && !j.title && (j.title = f.title);
				f.panel_div = j
			}
			this.map && (this.addControlsToMap(i), this.redraw())
		},
		createControlMarkup : function () {
			return document.createElement("div")
		},
		addControlsToMap : function (h) {
			for (var g, f = 0, e = h.length; f < e; f++) {
				g = h[f],
				!0 === g.autoActivate ? (g.autoActivate = !1, this.map.addControl(g), g.autoActivate = !0) : (this.map.addControl(g), g.deactivate()),
				g.events.on({
					activate : this.iconOn,
					deactivate : this.iconOff
				})
			}
		},
		iconOn : function () {
			var b = this.panel_div;
			b.className = b.className.replace(RegExp("\\b(" + this.displayClass + "Item)Inactive\\b"), "$1Active")
		},
		iconOff : function () {
			var b = this.panel_div;
			b.className = b.className.replace(RegExp("\\b(" + this.displayClass + "Item)Active\\b"), "$1Inactive")
		},
		onButtonClick : function (d) {
			var f = this.controls;
			d = d.buttonElement;
			for (var e = f.length - 1; 0 <= e; --e) {
				if (f[e].panel_div === d) {
					this.activateControl(f[e]);
					break
				}
			}
		},
		getControlsBy : function (d, f) {
			var e = "function" == typeof f.test;
			return OpenLayers.Array.filter(this.controls, function (a) {
				return a[d] == f || e && f.test(a[d])
			})
		},
		getControlsByName : function (b) {
			return this.getControlsBy("name", b)
		},
		getControlsByClass : function (b) {
			return this.getControlsBy("CLASS_NAME", b)
		},
		CLASS_NAME : "OpenLayers.Control.Panel"
	});
OpenLayers.Control.ZoomIn = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_BUTTON,
		trigger : function () {
			this.map.zoomIn()
		},
		CLASS_NAME : "OpenLayers.Control.ZoomIn"
	});
OpenLayers.Control.ZoomOut = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_BUTTON,
		trigger : function () {
			this.map.zoomOut()
		},
		CLASS_NAME : "OpenLayers.Control.ZoomOut"
	});
OpenLayers.Control.ZoomToMaxExtent = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_BUTTON,
		trigger : function () {
			this.map && this.map.zoomToMaxExtent()
		},
		CLASS_NAME : "OpenLayers.Control.ZoomToMaxExtent"
	});
OpenLayers.Control.ZoomPanel = OpenLayers.Class(OpenLayers.Control.Panel, {
		initialize : function (b) {
			OpenLayers.Control.Panel.prototype.initialize.apply(this, [b]);
			this.addControls([new OpenLayers.Control.ZoomIn, new OpenLayers.Control.ZoomToMaxExtent, new OpenLayers.Control.ZoomOut])
		},
		CLASS_NAME : "OpenLayers.Control.ZoomPanel"
	});
OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {
		URL_HASH_FACTOR : (Math.sqrt(5) - 1) / 2,
		url : null,
		params : null,
		reproject : !1,
		initialize : function (h, g, f, e) {
			OpenLayers.Layer.prototype.initialize.apply(this, [h, e]);
			this.url = g;
			this.params || (this.params = OpenLayers.Util.extend({}, f))
		},
		destroy : function () {
			this.params = this.url = null;
			OpenLayers.Layer.prototype.destroy.apply(this, arguments)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.HTTPRequest(this.name, this.url, this.params, this.getOptions()));
			return b = OpenLayers.Layer.prototype.clone.apply(this, [b])
		},
		setUrl : function (b) {
			this.url = b
		},
		mergeNewParams : function (b) {
			this.params = OpenLayers.Util.extend(this.params, b);
			b = this.redraw();
			null != this.map && this.map.events.triggerEvent("changelayer", {
				layer : this,
				property : "params"
			});
			return b
		},
		redraw : function (b) {
			return b ? this.mergeNewParams({
				_olSalt : Math.random()
			}) : OpenLayers.Layer.prototype.redraw.apply(this, [])
		},
		selectUrl : function (i, h) {
			for (var g = 1, f = 0, j = i.length; f < j; f++) {
				g *= i.charCodeAt(f) * this.URL_HASH_FACTOR,
				g -= Math.floor(g)
			}
			return h[Math.floor(g * h.length)]
		},
		getFullRequestString : function (j, i) {
			var h = i || this.url,
			g = OpenLayers.Util.extend({}, this.params),
			g = OpenLayers.Util.extend(g, j),
			l = OpenLayers.Util.getParameterString(g);
			OpenLayers.Util.isArray(h) && (h = this.selectUrl(l, h));
			var l = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(h)),
			k;
			for (k in g) {
				k.toUpperCase()in l && delete g[k]
			}
			l = OpenLayers.Util.getParameterString(g);
			return OpenLayers.Util.urlAppend(h, l)
		},
		CLASS_NAME : "OpenLayers.Layer.HTTPRequest"
	});
OpenLayers.Tile = OpenLayers.Class({
		events : null,
		eventListeners : null,
		id : null,
		layer : null,
		url : null,
		bounds : null,
		size : null,
		position : null,
		isLoading : !1,
		initialize : function (j, i, h, g, l, k) {
			this.layer = j;
			this.position = i.clone();
			this.setBounds(h);
			this.url = g;
			l && (this.size = l.clone());
			this.id = OpenLayers.Util.createUniqueID("Tile_");
			OpenLayers.Util.extend(this, k);
			this.events = new OpenLayers.Events(this);
			if (this.eventListeners instanceof Object) {
				this.events.on(this.eventListeners)
			}
		},
		unload : function () {
			this.isLoading && (this.isLoading = !1, this.events.triggerEvent("unload"))
		},
		destroy : function () {
			this.position = this.size = this.bounds = this.layer = null;
			this.eventListeners && this.events.un(this.eventListeners);
			this.events.destroy();
			this.events = this.eventListeners = null
		},
		draw : function (d) {
			d || this.clear();
			var c = this.shouldDraw();
			c && !d && (c = !1 !== this.events.triggerEvent("beforedraw"));
			return c
		},
		shouldDraw : function () {
			var d = !1,
			f = this.layer.maxExtent;
			if (f) {
				var e = this.layer.map,
				e = e.baseLayer.wrapDateLine && e.getMaxExtent();
				this.bounds.intersectsBounds(f, {
					inclusive : !1,
					worldBounds : e
				}) && (d = !0)
			}
			return d || this.layer.displayOutsideMaxExtent
		},
		setBounds : function (d) {
			d = d.clone();
			if (this.layer.map.baseLayer.wrapDateLine) {
				var f = this.layer.map.getMaxExtent(),
				e = this.layer.map.getResolution();
				d = d.wrapDateLine(f, {
						leftTolerance : e,
						rightTolerance : e
					})
			}
			this.bounds = d
		},
		moveTo : function (d, f, e) {
			null == e && (e = !0);
			this.setBounds(d);
			this.position = f.clone();
			e && this.draw()
		},
		clear : function () {},
		CLASS_NAME : "OpenLayers.Tile"
	});
OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {
		url : null,
		imgDiv : null,
		frame : null,
		imageReloadAttempts : null,
		layerAlphaHack : null,
		asyncRequestId : null,
		blankImageUrl : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7",
		maxGetUrlLength : null,
		canvasContext : null,
		crossOriginKeyword : null,
		initialize : function (j, i, h, g, l, k) {
			OpenLayers.Tile.prototype.initialize.apply(this, arguments);
			this.url = g;
			this.layerAlphaHack = this.layer.alpha && OpenLayers.Util.alphaHack();
			if (null != this.maxGetUrlLength || this.layer.gutter || this.layerAlphaHack) {
				this.frame = document.createElement("div"),
				this.frame.style.position = "absolute",
				this.frame.style.overflow = "hidden"
			}
			null != this.maxGetUrlLength && OpenLayers.Util.extend(this, OpenLayers.Tile.Image.IFrame)
		},
		destroy : function () {
			this.imgDiv && (this.clear(), this.frame = this.imgDiv = null);
			this.asyncRequestId = null;
			OpenLayers.Tile.prototype.destroy.apply(this, arguments)
		},
		draw : function () {
			var b = OpenLayers.Tile.prototype.draw.apply(this, arguments);
			b ? (this.layer != this.layer.map.baseLayer && this.layer.reproject && (this.bounds = this.getBoundsFromBaseLayer(this.position)), this.isLoading ? this._loadEvent = "reload" : (this.isLoading = !0, this._loadEvent = "loadstart"), this.positionTile(), this.renderTile()) : this.unload();
			return b
		},
		renderTile : function () {
			this.layer.div.appendChild(this.getTile());
			if (this.layer.async) {
				var b = this.asyncRequestId = (this.asyncRequestId || 0) + 1;
				this.layer.getURLasync(this.bounds, function (a) {
					b == this.asyncRequestId && (this.url = a, this.initImage())
				}, this)
			} else {
				this.url = this.layer.getURL(this.bounds),
				this.initImage()
			}
		},
		positionTile : function () {
			var d = this.getTile().style,
			c = this.frame ? this.size : this.layer.getImageSize(this.bounds);
			d.left = this.position.x + "%";
			d.top = this.position.y + "%";
			d.width = c.w + "%";
			d.height = c.h + "%"
		},
		clear : function () {
			OpenLayers.Tile.prototype.clear.apply(this, arguments);
			var d = this.imgDiv;
			if (d) {
				OpenLayers.Event.stopObservingElement(d);
				var c = this.getTile();
				c.parentNode === this.layer.div && this.layer.div.removeChild(c);
				this.setImgSrc();
				!0 === this.layerAlphaHack && (d.style.filter = "");
				OpenLayers.Element.removeClass(d, "olImageLoadError")
			}
			this.canvasContext = null
		},
		getImage : function () {
			if (!this.imgDiv) {
				this.imgDiv = document.createElement("img");
				this.imgDiv.className = "olTileImage";
				this.imgDiv.galleryImg = "no";
				var d = this.imgDiv.style;
				if (this.frame) {
					var f = 0,
					e = 0;
					this.layer.gutter && (f = 100 * (this.layer.gutter / this.layer.tileSize.w), e = 100 * (this.layer.gutter / this.layer.tileSize.h));
					d.left = -f + "%";
					d.top = -e + "%";
					d.width = 2 * f + 100 + "%";
					d.height = 2 * e + 100 + "%"
				}
				d.visibility = "hidden";
				d.opacity = 0;
				1 > this.layer.opacity && (d.filter = "alpha(opacity=" + 100 * this.layer.opacity + ")");
				d.position = "absolute";
				this.layerAlphaHack && (d.paddingTop = d.height, d.height = "0", d.width = "100%");
				this.frame && this.frame.appendChild(this.imgDiv)
			}
			return this.imgDiv
		},
		initImage : function () {
			this.events.triggerEvent(this._loadEvent);
			var d = this.getImage();
			if (this.url && d.getAttribute("src") == this.url) {
				this.onImageLoad()
			} else {
				var c = OpenLayers.Function.bind(function () {
						OpenLayers.Event.stopObservingElement(d);
						OpenLayers.Event.observe(d, "load", OpenLayers.Function.bind(this.onImageLoad, this));
						OpenLayers.Event.observe(d, "error", OpenLayers.Function.bind(this.onImageError, this));
						this.imageReloadAttempts = 0;
						this.setImgSrc(this.url)
					}, this);
				d.getAttribute("src") == this.blankImageUrl ? c() : (OpenLayers.Event.observe(d, "load", c), OpenLayers.Event.observe(d, "error", c), this.crossOriginKeyword && d.removeAttribute("crossorigin"), d.src = this.blankImageUrl)
			}
		},
		setImgSrc : function (d) {
			var c = this.imgDiv;
			c.style.visibility = "hidden";
			c.style.opacity = 0;
			d && (this.crossOriginKeyword && ("data:" !== d.substr(0, 5) ? c.setAttribute("crossorigin", this.crossOriginKeyword) : c.removeAttribute("crossorigin")), c.src = d)
		},
		getTile : function () {
			return this.frame ? this.frame : this.getImage()
		},
		createBackBuffer : function () {
			if (this.imgDiv && !this.isLoading) {
				var b;
				this.frame ? (b = this.frame.cloneNode(!1), b.appendChild(this.imgDiv)) : b = this.imgDiv;
				this.imgDiv = null;
				return b
			}
		},
		onImageLoad : function () {
			var d = this.imgDiv;
			OpenLayers.Event.stopObservingElement(d);
			d.style.visibility = "inherit";
			d.style.opacity = this.layer.opacity;
			this.isLoading = !1;
			this.canvasContext = null;
			this.events.triggerEvent("loadend");
			if (7 > parseFloat(navigator.appVersion.split("MSIE")[1]) && this.layer && this.layer.div) {
				var f = document.createElement("span");
				f.style.display = "none";
				var e = this.layer.div;
				e.appendChild(f);
				window.setTimeout(function () {
					f.parentNode === e && f.parentNode.removeChild(f)
				}, 0)
			}
			!0 === this.layerAlphaHack && (d.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d.src + "', sizingMethod='scale')")
		},
		onImageError : function () {
			var b = this.imgDiv;
			null != b.src && (this.imageReloadAttempts++, this.imageReloadAttempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS ? this.setImgSrc(this.layer.getURL(this.bounds)) : (OpenLayers.Element.addClass(b, "olImageLoadError"), this.events.triggerEvent("loaderror"), this.onImageLoad()))
		},
		getCanvasContext : function () {
			if (OpenLayers.CANVAS_SUPPORTED && this.imgDiv && !this.isLoading) {
				if (!this.canvasContext) {
					var b = document.createElement("canvas");
					b.width = this.size.w;
					b.height = this.size.h;
					this.canvasContext = b.getContext("2d");
					this.canvasContext.drawImage(this.imgDiv, 0, 0)
				}
				return this.canvasContext
			}
		},
		CLASS_NAME : "OpenLayers.Tile.Image"
	});
OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {
		tileSize : null,
		tileOriginCorner : "bl",
		tileOrigin : null,
		tileOptions : null,
		tileClass : OpenLayers.Tile.Image,
		grid : null,
		singleTile : !1,
		ratio : 1.5,
		buffer : 0,
		transitionEffect : null,
		numLoadingTiles : 0,
		tileLoadingDelay : 85,
		serverResolutions : null,
		moveTimerId : null,
		deferMoveGriddedTiles : null,
		tileQueueId : null,
		tileQueue : null,
		loading : !1,
		backBuffer : null,
		gridResolution : null,
		backBufferResolution : null,
		backBufferLonLat : null,
		backBufferTimerId : null,
		removeBackBufferDelay : null,
		className : null,
		initialize : function (h, g, f, e) {
			OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, arguments);
			this.grid = [];
			this.tileQueue = [];
			null === this.removeBackBufferDelay && (this.removeBackBufferDelay = this.singleTile ? 0 : 2500);
			null === this.className && (this.className = this.singleTile ? "olLayerGridSingleTile" : "olLayerGrid");
			OpenLayers.Animation.isNative || (this.deferMoveGriddedTiles = OpenLayers.Function.bind(function () {
						this.moveGriddedTiles(!0);
						this.moveTimerId = null
					}, this))
		},
		setMap : function (b) {
			OpenLayers.Layer.HTTPRequest.prototype.setMap.call(this, b);
			OpenLayers.Element.addClass(this.div, this.className)
		},
		removeMap : function () {
			null !== this.moveTimerId && (window.clearTimeout(this.moveTimerId), this.moveTimerId = null);
			this.clearTileQueue();
			null !== this.backBufferTimerId && (window.clearTimeout(this.backBufferTimerId), this.backBufferTimerId = null)
		},
		destroy : function () {
			this.removeBackBuffer();
			this.clearGrid();
			this.tileSize = this.grid = null;
			OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments)
		},
		clearGrid : function () {
			this.clearTileQueue();
			if (this.grid) {
				for (var i = 0, h = this.grid.length; i < h; i++) {
					for (var g = this.grid[i], f = 0, j = g.length; f < j; f++) {
						this.destroyTile(g[f])
					}
				}
				this.grid = [];
				this.gridResolution = null
			}
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.Grid(this.name, this.url, this.params, this.getOptions()));
			b = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this, [b]);
			null != this.tileSize && (b.tileSize = this.tileSize.clone());
			b.grid = [];
			b.gridResolution = null;
			b.backBuffer = null;
			b.backBufferTimerId = null;
			b.tileQueue = [];
			b.tileQueueId = null;
			b.loading = !1;
			b.moveTimerId = null;
			return b
		},
		moveTo : function (l, k, j) {
			OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
			l = l || this.map.getExtent();
			if (null != l) {
				var i = !this.grid.length || k,
				h = this.getTilesBounds(),
				n = this.map.getResolution(),
				m = this.getServerResolution(n);
				if (this.singleTile) {
					if (i || !j && !h.containsBounds(l)) {
						k && "resize" !== this.transitionEffect && this.removeBackBuffer(),
						(!k || "resize" === this.transitionEffect) && this.applyBackBuffer(m),
						this.initSingleTile(l)
					}
				} else {
					i = i || !h.intersectsBounds(l, {
							worldBounds : this.map.baseLayer.wrapDateLine && this.map.getMaxExtent()
						}),
					n !== m ? (l = this.map.calculateBounds(null, m), i && this.transformDiv(m / n)) : (this.div.style.width = "100%", this.div.style.height = "100%", this.div.style.left = "0%", this.div.style.top = "0%"),
					i ? (k && "resize" === this.transitionEffect && this.applyBackBuffer(m), this.initGriddedTiles(l)) : this.moveGriddedTiles()
				}
			}
		},
		getTileData : function (o) {
			var n = null,
			m = o.lon,
			i = o.lat,
			v = this.grid.length;
			if (this.map && v) {
				var u = this.map.getResolution();
				o = this.tileSize.w;
				var t = this.tileSize.h,
				s = this.grid[0][0].bounds,
				r = s.left,
				s = s.top;
				if (m < r && this.map.baseLayer.wrapDateLine) {
					var q = this.map.getMaxExtent().getWidth(),
					p = Math.ceil((r - m) / q),
					m = m + q * p
				}
				m = (m - r) / (u * o);
				i = (s - i) / (u * t);
				u = Math.floor(m);
				r = Math.floor(i);
				0 <= r && r < v && (v = this.grid[r][u]) && (n = {
						tile : v,
						i : Math.floor((m - u) * o),
						j : Math.floor((i - r) * t)
					})
			}
			return n
		},
		queueTileDraw : function (b) {
			b = b.object;
			~OpenLayers.Util.indexOf(this.tileQueue, b) || this.tileQueue.push(b);
			this.tileQueueId || (this.tileQueueId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.drawTileFromQueue, this), null, this.div));
			return !1
		},
		drawTileFromQueue : function () {
			0 === this.tileQueue.length ? this.clearTileQueue() : this.tileQueue.shift().draw(!0)
		},
		clearTileQueue : function () {
			OpenLayers.Animation.stop(this.tileQueueId);
			this.tileQueueId = null;
			this.tileQueue = []
		},
		destroyTile : function (b) {
			this.removeTileMonitoringHooks(b);
			b.destroy()
		},
		getServerResolution : function (d) {
			d = d || this.map.getResolution();
			if (this.serverResolutions && -1 === OpenLayers.Util.indexOf(this.serverResolutions, d)) {
				var f,
				e;
				for (f = this.serverResolutions.length - 1; 0 <= f; f--) {
					if (e = this.serverResolutions[f], e > d) {
						d = e;
						break
					}
				}
				if (-1 === f) {
					throw "no appropriate resolution in serverResolutions"
				}
			}
			return d
		},
		getServerZoom : function () {
			var b = this.getServerResolution();
			return this.serverResolutions ? OpenLayers.Util.indexOf(this.serverResolutions, b) : this.map.getZoomForResolution(b) + (this.zoomOffset || 0)
		},
		transformDiv : function (h) {
			this.div.style.width = 100 * h + "%";
			this.div.style.height = 100 * h + "%";
			var g = this.map.getSize(),
			f = parseInt(this.map.layerContainerDiv.style.left, 10),
			e = (parseInt(this.map.layerContainerDiv.style.top, 10) - g.h / 2) * (h - 1);
			this.div.style.left = (f - g.w / 2) * (h - 1) + "%";
			this.div.style.top = e + "%"
		},
		getResolutionScale : function () {
			return parseInt(this.div.style.width, 10) / 100
		},
		applyBackBuffer : function (h) {
			null !== this.backBufferTimerId && this.removeBackBuffer();
			var g = this.backBuffer;
			if (!g) {
				g = this.createBackBuffer();
				if (!g) {
					return
				}
				this.div.insertBefore(g, this.div.firstChild);
				this.backBuffer = g;
				var f = this.grid[0][0].bounds;
				this.backBufferLonLat = {
					lon : f.left,
					lat : f.top
				};
				this.backBufferResolution = this.gridResolution
			}
			var f = g.style,
			e = this.backBufferResolution / h;
			f.width = 100 * e + "%";
			f.height = 100 * e + "%";
			h = this.getViewPortPxFromLonLat(this.backBufferLonLat, h);
			f = parseInt(this.map.layerContainerDiv.style.left, 10);
			e = parseInt(this.map.layerContainerDiv.style.top, 10);
			g.style.left = Math.round(h.x - f) + "%";
			g.style.top = Math.round(h.y - e) + "%"
		},
		createBackBuffer : function () {
			var j;
			if (0 < this.grid.length) {
				j = document.createElement("div");
				j.id = this.div.id + "_bb";
				j.className = "olBackBuffer";
				j.style.position = "absolute";
				j.style.width = "100%";
				j.style.height = "100%";
				for (var i = 0, h = this.grid.length; i < h; i++) {
					for (var g = 0, l = this.grid[i].length; g < l; g++) {
						var k = this.grid[i][g].createBackBuffer();
						k && (k.style.top = i * this.tileSize.h + "%", k.style.left = g * this.tileSize.w + "%", j.appendChild(k))
					}
				}
			}
			return j
		},
		removeBackBuffer : function () {
			this.backBuffer && (this.div.removeChild(this.backBuffer), this.backBufferResolution = this.backBuffer = null, null !== this.backBufferTimerId && (window.clearTimeout(this.backBufferTimerId), this.backBufferTimerId = null))
		},
		moveByPx : function () {
			this.singleTile || this.moveGriddedTiles()
		},
		setTileSize : function (b) {
			this.singleTile && (b = this.map.getSize(), b.h = parseInt(b.h * this.ratio), b.w = parseInt(b.w * this.ratio));
			OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [b])
		},
		getTilesBounds : function () {
			var d = null,
			f = this.grid.length;
			if (f) {
				var d = this.grid[f - 1][0].bounds,
				f = this.grid[0].length * d.getWidth(),
				e = this.grid.length * d.getHeight(),
				d = new OpenLayers.Bounds(d.left, d.bottom, d.left + f, d.bottom + e)
			}
			return d
		},
		initSingleTile : function (d) {
			this.clearTileQueue();
			var f = d.getCenterLonLat(),
			e = d.getWidth() * this.ratio;
			d = d.getHeight() * this.ratio;
			f = new OpenLayers.Bounds(f.lon - e / 2, f.lat - d / 2, f.lon + e / 2, f.lat + d / 2);
			e = this.map.getLayerPxFromLonLat({
					lon : f.left,
					lat : f.top
				});
			this.grid.length || (this.grid[0] = []);
			(d = this.grid[0][0]) ? d.moveTo(f, e) : (d = this.addTile(f, e), this.addTileMonitoringHooks(d), d.draw(), this.grid[0][0] = d);
			this.removeExcessTiles(1, 1);
			this.gridResolution = this.getServerResolution()
		},
		calculateGridLayout : function (l, k, j) {
			var i = j * this.tileSize.w;
			j *= this.tileSize.h;
			var h = l.left - k.lon,
			n = Math.floor(h / i) - this.buffer,
			h =  - (h / i - n) * this.tileSize.w,
			n = k.lon + n * i;
			l = l.top - (k.lat + j);
			var m = Math.ceil(l / j) + this.buffer;
			return {
				tilelon : i,
				tilelat : j,
				tileoffsetlon : n,
				tileoffsetlat : k.lat + m * j,
				tileoffsetx : h,
				tileoffsety :  - (m - l / j) * this.tileSize.h
			}
		},
		getTileOrigin : function () {
			var d = this.tileOrigin;
			if (!d) {
				var d = this.getMaxExtent(),
				c = {
					tl : ["left", "top"],
					tr : ["right", "top"],
					bl : ["left", "bottom"],
					br : ["right", "bottom"]
				}
				[this.tileOriginCorner],
				d = new OpenLayers.LonLat(d[c[0]], d[c[1]])
			}
			return d
		},
		initGriddedTiles : function (P) {
			this.clearTileQueue();
			var O = this.map.getSize(),
			N = Math.ceil(O.h / this.tileSize.h) + Math.max(1, 2 * this.buffer),
			O = Math.ceil(O.w / this.tileSize.w) + Math.max(1, 2 * this.buffer),
			M = this.getTileOrigin(),
			L = this.getServerResolution(),
			M = this.calculateGridLayout(P, M, L),
			L = Math.round(M.tileoffsetx),
			K = Math.round(M.tileoffsety),
			H = M.tileoffsetlon,
			F = M.tileoffsetlat,
			E = M.tilelon,
			D = M.tilelat,
			C = L,
			B = H,
			A = 0,
			z = parseInt(this.map.layerContainerDiv.style.left),
			y = parseInt(this.map.layerContainerDiv.style.top),
			M = [],
			x = this.map.getCenter();
			do {
				var J = this.grid[A++];
				J || (J = [], this.grid.push(J));
				var H = B,
				L = C,
				I = 0;
				do {
					H != B && 0 == I && (H = B);
					var G = new OpenLayers.Bounds(H, F, H + E, F + D),
					o = L,
					o = o - z,
					i = K,
					i = i - y,
					i = new OpenLayers.Pixel(o, i);
					(o = J[I++]) ? o.moveTo(G, i, !1) : (o = this.addTile(G, i), this.addTileMonitoringHooks(o), J.push(o));
					G = G.getCenterLonLat();
					M.push({
						tile : o,
						distance : Math.pow(G.lon - x.lon, 2) + Math.pow(G.lat - x.lat, 2)
					});
					H += E;
					L += this.tileSize.w
				} while (H <= P.right + E * this.buffer || I < O);
				F -= D;
				K += this.tileSize.h
			} while (F >= P.bottom - D * this.buffer || A < N);
			this.removeExcessTiles(A, I);
			this.gridResolution = this.getServerResolution();
			M.sort(function (a, b) {
				return a.distance - b.distance
			});
			P = 0;
			for (N = M.length; P < N; ++P) {
				M[P].tile.draw()
			}
		},
		getMaxExtent : function () {
			return this.maxExtent
		},
		addTile : function (d, f) {
			var e = new this.tileClass(this, f, d, null, this.tileSize, this.tileOptions);
			e.events.register("beforedraw", this, this.queueTileDraw);
			return e
		},
		addTileMonitoringHooks : function (b) {
			b.onLoadStart = function () {
				!1 === this.loading && (this.loading = !0, this.events.triggerEvent("loadstart"));
				this.events.triggerEvent("tileloadstart", {
					tile : b
				});
				this.numLoadingTiles++
			};
			b.onLoadEnd = function () {
				this.numLoadingTiles--;
				this.events.triggerEvent("tileloaded", {
					tile : b
				});
				0 === this.tileQueue.length && 0 === this.numLoadingTiles && (this.loading = !1, this.events.triggerEvent("loadend"), this.backBuffer && (this.backBufferTimerId = window.setTimeout(OpenLayers.Function.bind(this.removeBackBuffer, this), this.removeBackBufferDelay)))
			};
			b.onLoadError = function () {
				this.events.triggerEvent("tileerror", {
					tile : b
				})
			};
			b.events.on({
				loadstart : b.onLoadStart,
				loadend : b.onLoadEnd,
				unload : b.onLoadEnd,
				loaderror : b.onLoadError,
				scope : this
			})
		},
		removeTileMonitoringHooks : function (b) {
			b.unload();
			b.events.un({
				loadstart : b.onLoadStart,
				loadend : b.onLoadEnd,
				unload : b.onLoadEnd,
				loaderror : b.onLoadError,
				scope : this
			})
		},
		moveGriddedTiles : function (j) {
			if (!j && !OpenLayers.Animation.isNative) {
				null != this.moveTimerId && window.clearTimeout(this.moveTimerId),
				this.moveTimerId = window.setTimeout(this.deferMoveGriddedTiles, this.tileLoadingDelay)
			} else {
				j = this.buffer || 1;
				for (var i = this.getResolutionScale(); ; ) {
					var h = this.grid[0][0].position.x * i + parseInt(this.div.style.left, 10) + parseInt(this.map.layerContainerDiv.style.left),
					g = this.grid[0][0].position.y * i + parseInt(this.div.style.top, 10) + parseInt(this.map.layerContainerDiv.style.top),
					l = this.tileSize.w * i,
					k = this.tileSize.h * i;
					if (h > -l * (j - 1)) {
						this.shiftColumn(!0)
					} else {
						if (h < -l * j) {
							this.shiftColumn(!1)
						} else {
							if (g > -k * (j - 1)) {
								this.shiftRow(!0)
							} else {
								if (g < -k * j) {
									this.shiftRow(!1)
								} else {
									break
								}
							}
						}
					}
				}
			}
		},
		shiftRow : function (l) {
			for (var i = this.grid, t = i[l ? 0 : this.grid.length - 1], s = this.getServerResolution(), r = l ? -this.tileSize.h : this.tileSize.h, s = s * -r, q = l ? i.pop() : i.shift(), p = 0, o = t.length; p < o; p++) {
				var n = t[p],
				m = n.bounds.clone(),
				n = n.position.clone();
				m.bottom += s;
				m.top += s;
				n.y += r;
				q[p].moveTo(m, n)
			}
			l ? i.unshift(q) : i.push(q)
		},
		shiftColumn : function (r) {
			for (var q = r ? -this.tileSize.w : this.tileSize.w, p = this.getServerResolution() * q, o = 0, n = this.grid.length; o < n; o++) {
				var m = this.grid[o],
				l = m[r ? 0 : m.length - 1],
				k = l.bounds.clone(),
				l = l.position.clone();
				k.left += p;
				k.right += p;
				l.x += q;
				var i = r ? this.grid[o].pop() : this.grid[o].shift();
				i.moveTo(k, l);
				r ? m.unshift(i) : m.push(i)
			}
		},
		removeExcessTiles : function (j, i) {
			for (var h, g; this.grid.length > j; ) {
				var l = this.grid.pop();
				h = 0;
				for (g = l.length; h < g; h++) {
					var k = l[h];
					this.destroyTile(k)
				}
			}
			h = 0;
			for (g = this.grid.length; h < g; h++) {
				for (; this.grid[h].length > i; ) {
					l = this.grid[h],
					k = l.pop(),
					this.destroyTile(k)
				}
			}
		},
		onMapResize : function () {
			this.singleTile && (this.clearGrid(), this.setTileSize())
		},
		getTileBounds : function (i) {
			var h = this.maxExtent,
			g = this.getResolution(),
			f = g * this.tileSize.w,
			g = g * this.tileSize.h,
			j = this.getLonLatFromViewPortPx(i);
			i = h.left + f * Math.floor((j.lon - h.left) / f);
			h = h.bottom + g * Math.floor((j.lat - h.bottom) / g);
			return new OpenLayers.Bounds(i, h, i + f, h + g)
		},
		CLASS_NAME : "OpenLayers.Layer.Grid"
	});
OpenLayers.Format.ArcXML = OpenLayers.Class(OpenLayers.Format.XML, {
		fontStyleKeys : "antialiasing blockout font fontcolor fontsize fontstyle glowing interval outline printmode shadow transparency".split(" "),
		request : null,
		response : null,
		initialize : function (d) {
			this.request = new OpenLayers.Format.ArcXML.Request;
			this.response = new OpenLayers.Format.ArcXML.Response;
			if (d) {
				if ("feature" == d.requesttype) {
					this.request.get_image = null;
					var c = this.request.get_feature.query;
					this.addCoordSys(c.featurecoordsys, d.featureCoordSys);
					this.addCoordSys(c.filtercoordsys, d.filterCoordSys);
					d.polygon ? (c.isspatial = !0, c.spatialfilter.polygon = d.polygon) : d.envelope && (c.isspatial = !0, c.spatialfilter.envelope = {
							minx : 0,
							miny : 0,
							maxx : 0,
							maxy : 0
						}, this.parseEnvelope(c.spatialfilter.envelope, d.envelope))
				} else {
					"image" == d.requesttype ? (this.request.get_feature = null, c = this.request.get_image.properties, this.parseEnvelope(c.envelope, d.envelope), this.addLayers(c.layerlist, d.layers), this.addImageSize(c.imagesize, d.tileSize), this.addCoordSys(c.featurecoordsys, d.featureCoordSys), this.addCoordSys(c.filtercoordsys, d.filterCoordSys)) : this.request = null
				}
			}
			OpenLayers.Format.XML.prototype.initialize.apply(this, [d])
		},
		parseEnvelope : function (d, c) {
			c && 4 == c.length && (d.minx = c[0], d.miny = c[1], d.maxx = c[2], d.maxy = c[3])
		},
		addLayers : function (h, g) {
			for (var f = 0, e = g.length; f < e; f++) {
				h.push(g[f])
			}
		},
		addImageSize : function (d, c) {
			null !== c && (d.width = c.w, d.height = c.h, d.printwidth = c.w, d.printheight = c.h)
		},
		addCoordSys : function (d, c) {
			"string" == typeof c ? (d.id = parseInt(c), d.string = c) : "object" == typeof c && null !== c.proj && (d.id = c.proj.srsProjNumber, d.string = c.proj.srsCode)
		},
		iserror : function (d) {
			var c = null;
			d ? (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]), d = d.documentElement.getElementsByTagName("ERROR"), c = null !== d && 0 < d.length) : c = "" !== this.response.error;
			return c
		},
		read : function (i) {
			"string" == typeof i && (i = OpenLayers.Format.XML.prototype.read.apply(this, [i]));
			var h = null;
			i && i.documentElement && (h = "ARCXML" == i.documentElement.nodeName ? i.documentElement : i.documentElement.getElementsByTagName("ARCXML")[0]);
			if (!h || "parsererror" === h.firstChild.nodeName) {
				var g,
				f;
				try {
					g = i.firstChild.nodeValue,
					f = i.firstChild.childNodes[1].firstChild.nodeValue
				} catch (j) {}

				throw {
					message : "Error parsing the ArcXML request",
					error : g,
					source : f
				}
			}
			return this.parseResponse(h)
		},
		write : function (o) {
			o || (o = this.request);
			var n = this.createElementNS("", "ARCXML");
			n.setAttribute("version", "1.1");
			var m = this.createElementNS("", "REQUEST");
			if (null != o.get_image) {
				var l = this.createElementNS("", "GET_IMAGE");
				m.appendChild(l);
				var k = this.createElementNS("", "PROPERTIES");
				l.appendChild(k);
				o = o.get_image.properties;
				null != o.featurecoordsys && (l = this.createElementNS("", "FEATURECOORDSYS"), k.appendChild(l), 0 === o.featurecoordsys.id ? l.setAttribute("string", o.featurecoordsys.string) : l.setAttribute("id", o.featurecoordsys.id));
				null != o.filtercoordsys && (l = this.createElementNS("", "FILTERCOORDSYS"), k.appendChild(l), 0 === o.filtercoordsys.id ? l.setAttribute("string", o.filtercoordsys.string) : l.setAttribute("id", o.filtercoordsys.id));
				null != o.envelope && (l = this.createElementNS("", "ENVELOPE"), k.appendChild(l), l.setAttribute("minx", o.envelope.minx), l.setAttribute("miny", o.envelope.miny), l.setAttribute("maxx", o.envelope.maxx), l.setAttribute("maxy", o.envelope.maxy));
				l = this.createElementNS("", "IMAGESIZE");
				k.appendChild(l);
				l.setAttribute("height", o.imagesize.height);
				l.setAttribute("width", o.imagesize.width);
				if (o.imagesize.height != o.imagesize.printheight || o.imagesize.width != o.imagesize.printwidth) {
					l.setAttribute("printheight", o.imagesize.printheight),
					l.setArrtibute("printwidth", o.imagesize.printwidth)
				}
				null != o.background && (l = this.createElementNS("", "BACKGROUND"), k.appendChild(l), l.setAttribute("color", o.background.color.r + "," + o.background.color.g + "," + o.background.color.b), null !== o.background.transcolor && l.setAttribute("transcolor", o.background.transcolor.r + "," + o.background.transcolor.g + "," + o.background.transcolor.b));
				if (null != o.layerlist && 0 < o.layerlist.length) {
					l = this.createElementNS("", "LAYERLIST");
					k.appendChild(l);
					for (k = 0; k < o.layerlist.length; k++) {
						var j = this.createElementNS("", "LAYERDEF");
						l.appendChild(j);
						j.setAttribute("id", o.layerlist[k].id);
						j.setAttribute("visible", o.layerlist[k].visible);
						if ("object" == typeof o.layerlist[k].query) {
							var i = o.layerlist[k].query;
							if (0 > i.where.length) {
								continue
							}
							var p = null,
							p = "boolean" == typeof i.spatialfilter && i.spatialfilter ? this.createElementNS("", "SPATIALQUERY") : this.createElementNS("", "QUERY");
							p.setAttribute("where", i.where);
							"number" == typeof i.accuracy && 0 < i.accuracy && p.setAttribute("accuracy", i.accuracy);
							"number" == typeof i.featurelimit && 2000 > i.featurelimit && p.setAttribute("featurelimit", i.featurelimit);
							"string" == typeof i.subfields && "#ALL#" != i.subfields && p.setAttribute("subfields", i.subfields);
							"string" == typeof i.joinexpression && 0 < i.joinexpression.length && p.setAttribute("joinexpression", i.joinexpression);
							"string" == typeof i.jointables && 0 < i.jointables.length && p.setAttribute("jointables", i.jointables);
							j.appendChild(p)
						}
						"object" == typeof o.layerlist[k].renderer && this.addRenderer(j, o.layerlist[k].renderer)
					}
				}
			} else {
				null != o.get_feature && (l = this.createElementNS("", "GET_FEATURES"), l.setAttribute("outputmode", "newxml"), l.setAttribute("checkesc", "true"), o.get_feature.geometry ? l.setAttribute("geometry", o.get_feature.geometry) : l.setAttribute("geometry", "false"), o.get_feature.compact && l.setAttribute("compact", o.get_feature.compact), "number" == o.get_feature.featurelimit && l.setAttribute("featurelimit", o.get_feature.featurelimit), l.setAttribute("globalenvelope", "true"), m.appendChild(l), null != o.get_feature.layer && 0 < o.get_feature.layer.length && (k = this.createElementNS("", "LAYER"), k.setAttribute("id", o.get_feature.layer), l.appendChild(k)), o = o.get_feature.query, null != o && (k = null, k = o.isspatial ? this.createElementNS("", "SPATIALQUERY") : this.createElementNS("", "QUERY"), l.appendChild(k), "number" == typeof o.accuracy && k.setAttribute("accuracy", o.accuracy), null != o.featurecoordsys && (l = this.createElementNS("", "FEATURECOORDSYS"), 0 == o.featurecoordsys.id ? l.setAttribute("string", o.featurecoordsys.string) : l.setAttribute("id", o.featurecoordsys.id), k.appendChild(l)), null != o.filtercoordsys && (l = this.createElementNS("", "FILTERCOORDSYS"), 0 === o.filtercoordsys.id ? l.setAttribute("string", o.filtercoordsys.string) : l.setAttribute("id", o.filtercoordsys.id), k.appendChild(l)), 0 < o.buffer && (l = this.createElementNS("", "BUFFER"), l.setAttribute("distance", o.buffer), k.appendChild(l)), o.isspatial && (l = this.createElementNS("", "SPATIALFILTER"), l.setAttribute("relation", o.spatialfilter.relation), k.appendChild(l), o.spatialfilter.envelope ? (j = this.createElementNS("", "ENVELOPE"), j.setAttribute("minx", o.spatialfilter.envelope.minx), j.setAttribute("miny", o.spatialfilter.envelope.miny), j.setAttribute("maxx", o.spatialfilter.envelope.maxx), j.setAttribute("maxy", o.spatialfilter.envelope.maxy), l.appendChild(j)) : "object" == typeof o.spatialfilter.polygon && l.appendChild(this.writePolygonGeometry(o.spatialfilter.polygon))), null != o.where && 0 < o.where.length && k.setAttribute("where", o.where)))
			}
			n.appendChild(m);
			return OpenLayers.Format.XML.prototype.write.apply(this, [n])
		},
		addGroupRenderer : function (h, g) {
			var f = this.createElementNS("", "GROUPRENDERER");
			h.appendChild(f);
			for (var e = 0; e < g.length; e++) {
				this.addRenderer(f, g[e])
			}
		},
		addRenderer : function (d, f) {
			if (OpenLayers.Util.isArray(f)) {
				this.addGroupRenderer(d, f)
			} else {
				var e = this.createElementNS("", f.type.toUpperCase() + "RENDERER");
				d.appendChild(e);
				"VALUEMAPRENDERER" == e.tagName ? this.addValueMapRenderer(e, f) : "VALUEMAPLABELRENDERER" == e.tagName ? this.addValueMapLabelRenderer(e, f) : "SIMPLELABELRENDERER" == e.tagName ? this.addSimpleLabelRenderer(e, f) : "SCALEDEPENDENTRENDERER" == e.tagName && this.addScaleDependentRenderer(e, f)
			}
		},
		addScaleDependentRenderer : function (d, c) {
			("string" == typeof c.lower || "number" == typeof c.lower) && d.setAttribute("lower", c.lower);
			("string" == typeof c.upper || "number" == typeof c.upper) && d.setAttribute("upper", c.upper);
			this.addRenderer(d, c.renderer)
		},
		addValueMapLabelRenderer : function (o, n) {
			o.setAttribute("lookupfield", n.lookupfield);
			o.setAttribute("labelfield", n.labelfield);
			if ("object" == typeof n.exacts) {
				for (var m = 0, i = n.exacts.length; m < i; m++) {
					var v = n.exacts[m],
					u = this.createElementNS("", "EXACT");
					"string" == typeof v.value && u.setAttribute("value", v.value);
					"string" == typeof v.label && u.setAttribute("label", v.label);
					"string" == typeof v.method && u.setAttribute("method", v.method);
					o.appendChild(u);
					if ("object" == typeof v.symbol) {
						var t = null;
						"text" == v.symbol.type && (t = this.createElementNS("", "TEXTSYMBOL"));
						if (null != t) {
							for (var s = this.fontStyleKeys, r = 0, q = s.length; r < q; r++) {
								var p = s[r];
								v.symbol[p] && t.setAttribute(p, v.symbol[p])
							}
							u.appendChild(t)
						}
					}
				}
			}
		},
		addValueMapRenderer : function (l, k) {
			l.setAttribute("lookupfield", k.lookupfield);
			if ("object" == typeof k.ranges) {
				for (var j = 0, i = k.ranges.length; j < i; j++) {
					var h = k.ranges[j],
					n = this.createElementNS("", "RANGE");
					n.setAttribute("lower", h.lower);
					n.setAttribute("upper", h.upper);
					l.appendChild(n);
					if ("object" == typeof h.symbol) {
						var m = null;
						"simplepolygon" == h.symbol.type && (m = this.createElementNS("", "SIMPLEPOLYGONSYMBOL"));
						null != m && ("string" == typeof h.symbol.boundarycolor && m.setAttribute("boundarycolor", h.symbol.boundarycolor), "string" == typeof h.symbol.fillcolor && m.setAttribute("fillcolor", h.symbol.fillcolor), "number" == typeof h.symbol.filltransparency && m.setAttribute("filltransparency", h.symbol.filltransparency), n.appendChild(m))
					}
				}
			} else {
				if ("object" == typeof k.exacts) {
					j = 0;
					for (i = k.exacts.length; j < i; j++) {
						h = k.exacts[j],
						n = this.createElementNS("", "EXACT"),
						"string" == typeof h.value && n.setAttribute("value", h.value),
						"string" == typeof h.label && n.setAttribute("label", h.label),
						"string" == typeof h.method && n.setAttribute("method", h.method),
						l.appendChild(n),
						"object" == typeof h.symbol && (m = null, "simplemarker" == h.symbol.type && (m = this.createElementNS("", "SIMPLEMARKERSYMBOL")), null != m && ("string" == typeof h.symbol.antialiasing && m.setAttribute("antialiasing", h.symbol.antialiasing), "string" == typeof h.symbol.color && m.setAttribute("color", h.symbol.color), "string" == typeof h.symbol.outline && m.setAttribute("outline", h.symbol.outline), "string" == typeof h.symbol.overlap && m.setAttribute("overlap", h.symbol.overlap), "string" == typeof h.symbol.shadow && m.setAttribute("shadow", h.symbol.shadow), "number" == typeof h.symbol.transparency && m.setAttribute("transparency", h.symbol.transparency), "string" == typeof h.symbol.usecentroid && m.setAttribute("usecentroid", h.symbol.usecentroid), "number" == typeof h.symbol.width && m.setAttribute("width", h.symbol.width), n.appendChild(m)))
					}
				}
			}
		},
		addSimpleLabelRenderer : function (o, n) {
			o.setAttribute("field", n.field);
			for (var m = "featureweight howmanylabels labelbufferratio labelpriorities labelweight linelabelposition rotationalangles".split(" "), l = 0, k = m.length; l < k; l++) {
				var j = m[l];
				n[j] && o.setAttribute(j, n[j])
			}
			if ("text" == n.symbol.type) {
				var i = n.symbol,
				p = this.createElementNS("", "TEXTSYMBOL");
				o.appendChild(p);
				m = this.fontStyleKeys;
				l = 0;
				for (k = m.length; l < k; l++) {
					j = m[l],
					i[j] && p.setAttribute(j, n[j])
				}
			}
		},
		writePolygonGeometry : function (l) {
			if (!(l instanceof OpenLayers.Geometry.Polygon)) {
				throw {
					message : "Cannot write polygon geometry to ArcXML with an " + l.CLASS_NAME + " object.",
					geometry : l
				}
			}
			for (var i = this.createElementNS("", "POLYGON"), t = 0, s = l.components.length; t < s; t++) {
				for (var r = l.components[t], q = this.createElementNS("", "RING"), p = 0, o = r.components.length; p < o; p++) {
					var n = r.components[p],
					m = this.createElementNS("", "POINT");
					m.setAttribute("x", n.x);
					m.setAttribute("y", n.y);
					q.appendChild(m)
				}
				i.appendChild(q)
			}
			return i
		},
		parseResponse : function (l) {
			"string" == typeof l && (l = (new OpenLayers.Format.XML).read(l));
			var i = new OpenLayers.Format.ArcXML.Response,
			t = l.getElementsByTagName("ERROR");
			if (null != t && 0 < t.length) {
				i.error = this.getChildValue(t, "Unknown error.")
			} else {
				t = l.getElementsByTagName("RESPONSE");
				if (null == t || 0 == t.length) {
					return i.error = "No RESPONSE tag found in ArcXML response.",
					i
				}
				var s = t[0].firstChild.nodeName;
				"#text" == s && (s = t[0].firstChild.nextSibling.nodeName);
				if ("IMAGE" == s) {
					t = l.getElementsByTagName("ENVELOPE"),
					l = l.getElementsByTagName("OUTPUT"),
					null == t || 0 == t.length ? i.error = "No ENVELOPE tag found in ArcXML response." : null == l || 0 == l.length ? i.error = "No OUTPUT tag found in ArcXML response." : (t = this.parseAttributes(t[0]), s = this.parseAttributes(l[0]), i.image = "string" == typeof s.type ? {
								envelope : t,
								output : {
									type : s.type,
									data : this.getChildValue(l[0])
								}
							}
							 : {
							envelope : t,
							output : s
						})
				} else {
					if ("FEATURES" == s) {
						if (l = t[0].getElementsByTagName("FEATURES"), t = l[0].getElementsByTagName("FEATURECOUNT"), i.features.featurecount = t[0].getAttribute("count"), 0 < i.features.featurecount) {
							t = l[0].getElementsByTagName("ENVELOPE");
							i.features.envelope = this.parseAttributes(t[0], "number");
							l = l[0].getElementsByTagName("FEATURE");
							for (t = 0; t < l.length; t++) {
								for (var s = new OpenLayers.Feature.Vector, r = l[t].getElementsByTagName("FIELD"), q = 0; q < r.length; q++) {
									var p = r[q].getAttribute("name"),
									o = r[q].getAttribute("value");
									s.attributes[p] = o
								}
								r = l[t].getElementsByTagName("POLYGON");
								if (0 < r.length) {
									r = r[0].getElementsByTagName("RING");
									q = [];
									for (p = 0; p < r.length; p++) {
										o = [];
										o.push(this.parsePointGeometry(r[p]));
										for (var n = r[p].getElementsByTagName("HOLE"), m = 0; m < n.length; m++) {
											o.push(this.parsePointGeometry(n[m]))
										}
										q.push(new OpenLayers.Geometry.Polygon(o))
									}
									s.geometry = 1 == q.length ? q[0] : new OpenLayers.Geometry.MultiPolygon(q)
								}
								i.features.feature.push(s)
							}
						}
					} else {
						i.error = "Unidentified response type."
					}
				}
			}
			return i
		},
		parseAttributes : function (h, g) {
			for (var f = {}, e = 0; e < h.attributes.length; e++) {
				f[h.attributes[e].nodeName] = "number" == g ? parseFloat(h.attributes[e].nodeValue) : h.attributes[e].nodeValue
			}
			return f
		},
		parsePointGeometry : function (h) {
			var g = [],
			f = h.getElementsByTagName("COORDS");
			if (0 < f.length) {
				h = this.getChildValue(f[0]);
				h = h.split(/;/);
				for (f = 0; f < h.length; f++) {
					var e = h[f].split(/ /);
					g.push(new OpenLayers.Geometry.Point(e[0], e[1]))
				}
			} else {
				if (h = h.getElementsByTagName("POINT"), 0 < h.length) {
					for (f = 0; f < h.length; f++) {
						g.push(new OpenLayers.Geometry.Point(parseFloat(h[f].getAttribute("x")), parseFloat(h[f].getAttribute("y"))))
					}
				}
			}
			return new OpenLayers.Geometry.LinearRing(g)
		},
		CLASS_NAME : "OpenLayers.Format.ArcXML"
	});
OpenLayers.Format.ArcXML.Request = OpenLayers.Class({
		initialize : function () {
			return OpenLayers.Util.extend(this, {
				get_image : {
					properties : {
						background : null,
						draw : !0,
						envelope : {
							minx : 0,
							miny : 0,
							maxx : 0,
							maxy : 0
						},
						featurecoordsys : {
							id : 0,
							string : "",
							datumtransformid : 0,
							datumtransformstring : ""
						},
						filtercoordsys : {
							id : 0,
							string : "",
							datumtransformid : 0,
							datumtransformstring : ""
						},
						imagesize : {
							height : 0,
							width : 0,
							dpi : 96,
							printheight : 0,
							printwidth : 0,
							scalesymbols : !1
						},
						layerlist : [],
						output : {
							baseurl : "",
							legendbaseurl : "",
							legendname : "",
							legendpath : "",
							legendurl : "",
							name : "",
							path : "",
							type : "jpg",
							url : ""
						}
					}
				},
				get_feature : {
					layer : "",
					query : {
						isspatial : !1,
						featurecoordsys : {
							id : 0,
							string : "",
							datumtransformid : 0,
							datumtransformstring : ""
						},
						filtercoordsys : {
							id : 0,
							string : "",
							datumtransformid : 0,
							datumtransformstring : ""
						},
						buffer : 0,
						where : "",
						spatialfilter : {
							relation : "envelope_intersection",
							envelope : null
						}
					}
				},
				environment : {
					separators : {
						cs : " ",
						ts : ";"
					}
				},
				layer : [],
				workspaces : []
			})
		},
		CLASS_NAME : "OpenLayers.Format.ArcXML.Request"
	});
OpenLayers.Format.ArcXML.Response = OpenLayers.Class({
		initialize : function () {
			return OpenLayers.Util.extend(this, {
				image : {
					envelope : null,
					output : ""
				},
				features : {
					featurecount : 0,
					envelope : null,
					feature : []
				},
				error : ""
			})
		},
		CLASS_NAME : "OpenLayers.Format.ArcXML.Response"
	});
OpenLayers.ProxyHost = "";
OpenLayers.Request = {
	DEFAULT_CONFIG : {
		method : "GET",
		url : window.location.href,
		async : !0,
		user : void 0,
		password : void 0,
		params : null,
		proxy : OpenLayers.ProxyHost,
		headers : {},
		data : null,
		callback : function () {},
		success : null,
		failure : null,
		scope : null
	},
	URL_SPLIT_REGEX : /([^:]*:)\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/,
	events : new OpenLayers.Events(this),
	makeSameOrigin : function (i, h) {
		var g = 0 !== i.indexOf("http"),
		f = !g && i.match(this.URL_SPLIT_REGEX);
		if (f) {
			var j = window.location,
			g = f[1] == j.protocol && f[3] == j.hostname,
			f = f[4],
			j = j.port;
			if (80 != f && "" != f || "80" != j && "" != j) {
				g = g && f == j
			}
		}
		g || (h ? i = "function" == typeof h ? h(i) : h + encodeURIComponent(i) : OpenLayers.Console.warn(OpenLayers.i18n("proxyNeeded"), {
					url : i
				}));
		return i
	},
	issue : function (o) {
		var n = OpenLayers.Util.extend(this.DEFAULT_CONFIG, {
				proxy : OpenLayers.ProxyHost
			});
		o = OpenLayers.Util.applyDefaults(o, n);
		var n = !1,
		m;
		for (m in o.headers) {
			o.headers.hasOwnProperty(m) && "x-requested-with" === m.toLowerCase() && (n = !0)
		}
		!1 === n && (o.headers["X-Requested-With"] = "XMLHttpRequest");
		var l = new OpenLayers.Request.XMLHttpRequest,
		k = OpenLayers.Util.urlAppend(o.url, OpenLayers.Util.getParameterString(o.params || {})),
		k = OpenLayers.Request.makeSameOrigin(k, o.proxy);
		l.open(o.method, k, o.async, o.user, o.password);
		for (var j in o.headers) {
			l.setRequestHeader(j, o.headers[j])
		}
		var i = this.events,
		p = this;
		l.onreadystatechange = function () {
			l.readyState == OpenLayers.Request.XMLHttpRequest.DONE && !1 !== i.triggerEvent("complete", {
				request : l,
				config : o,
				requestUrl : k
			}) && p.runCallbacks({
				request : l,
				config : o,
				requestUrl : k
			})
		};
		!1 === o.async ? l.send(o.data) : window.setTimeout(function () {
			0 !== l.readyState && l.send(o.data)
		}, 0);
		return l
	},
	runCallbacks : function (j) {
		var i = j.request,
		h = j.config,
		g = h.scope ? OpenLayers.Function.bind(h.callback, h.scope) : h.callback,
		l;
		h.success && (l = h.scope ? OpenLayers.Function.bind(h.success, h.scope) : h.success);
		var k;
		h.failure && (k = h.scope ? OpenLayers.Function.bind(h.failure, h.scope) : h.failure);
		"file:" == OpenLayers.Util.createUrlObject(h.url).protocol && i.responseText && (i.status = 200);
		g(i);
		if (!i.status || 200 <= i.status && 300 > i.status) {
			this.events.triggerEvent("success", j),
			l && l(i)
		}
		if (i.status && (200 > i.status || 300 <= i.status)) {
			this.events.triggerEvent("failure", j),
			k && k(i)
		}
	},
	GET : function (b) {
		b = OpenLayers.Util.extend(b, {
				method : "GET"
			});
		return OpenLayers.Request.issue(b)
	},
	POST : function (b) {
		b = OpenLayers.Util.extend(b, {
				method : "POST"
			});
		b.headers = b.headers ? b.headers : {};
		"CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(b.headers) || (b.headers["Content-Type"] = "application/xml");
		return OpenLayers.Request.issue(b)
	},
	PUT : function (b) {
		b = OpenLayers.Util.extend(b, {
				method : "PUT"
			});
		b.headers = b.headers ? b.headers : {};
		"CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(b.headers) || (b.headers["Content-Type"] = "application/xml");
		return OpenLayers.Request.issue(b)
	},
	DELETE : function (b) {
		b = OpenLayers.Util.extend(b, {
				method : "DELETE"
			});
		return OpenLayers.Request.issue(b)
	},
	HEAD : function (b) {
		b = OpenLayers.Util.extend(b, {
				method : "HEAD"
			});
		return OpenLayers.Request.issue(b)
	},
	OPTIONS : function (b) {
		b = OpenLayers.Util.extend(b, {
				method : "OPTIONS"
			});
		return OpenLayers.Request.issue(b)
	}
};
OpenLayers.Layer.ArcIMS = OpenLayers.Class(OpenLayers.Layer.Grid, {
		DEFAULT_PARAMS : {
			ClientVersion : "9.2",
			ServiceName : ""
		},
		featureCoordSys : "4326",
		filterCoordSys : "4326",
		layers : null,
		async : !0,
		name : "ArcIMS",
		isBaseLayer : !0,
		DEFAULT_OPTIONS : {
			tileSize : new OpenLayers.Size(512, 512),
			featureCoordSys : "4326",
			filterCoordSys : "4326",
			layers : null,
			isBaseLayer : !0,
			async : !0,
			name : "ArcIMS"
		},
		initialize : function (d, f, e) {
			this.tileSize = new OpenLayers.Size(512, 512);
			this.params = OpenLayers.Util.applyDefaults({
					ServiceName : e.serviceName
				}, this.DEFAULT_PARAMS);
			this.options = OpenLayers.Util.applyDefaults(e, this.DEFAULT_OPTIONS);
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, [d, f, this.params, e]);
			this.transparent && (this.isBaseLayer || (this.isBaseLayer = !1), "image/jpeg" == this.format && (this.format = OpenLayers.Util.alphaHack() ? "image/gif" : "image/png"));
			null === this.options.layers && (this.options.layers = [])
		},
		getURL : function (d) {
			var c = "";
			d = this.adjustBounds(d);
			d = new OpenLayers.Format.ArcXML(OpenLayers.Util.extend(this.options, {
						requesttype : "image",
						envelope : d.toArray(),
						tileSize : this.tileSize
					}));
			d = new OpenLayers.Request.POST({
					url : this.getFullRequestString(),
					data : d.write(),
					async : !1
				});
			if (null != d) {
				c = d.responseXML;
				if (!c || !c.documentElement) {
					c = d.responseText
				}
				c = (new OpenLayers.Format.ArcXML).read(c);
				c = this.getUrlOrImage(c.image.output)
			}
			return c
		},
		getURLasync : function (d, f, e) {
			d = this.adjustBounds(d);
			d = new OpenLayers.Format.ArcXML(OpenLayers.Util.extend(this.options, {
						requesttype : "image",
						envelope : d.toArray(),
						tileSize : this.tileSize
					}));
			OpenLayers.Request.POST({
				url : this.getFullRequestString(),
				async : !0,
				data : d.write(),
				callback : function (b) {
					var a = b.responseXML;
					if (!a || !a.documentElement) {
						a = b.responseText
					}
					b = (new OpenLayers.Format.ArcXML).read(a);
					f.call(e, this.getUrlOrImage(b.image.output))
				},
				scope : this
			})
		},
		getUrlOrImage : function (d) {
			var c = "";
			d.url ? c = d.url : d.data && (c = "data:image/" + d.type + ";base64," + d.data);
			return c
		},
		setLayerQuery : function (d, f) {
			for (var e = 0; e < this.options.layers.length; e++) {
				if (d == this.options.layers[e].id) {
					this.options.layers[e].query = f;
					return
				}
			}
			this.options.layers.push({
				id : d,
				visible : !0,
				query : f
			})
		},
		getFeatureInfo : function (o, n, m) {
			var l = m.buffer || 1,
			k = m.callback || function () {},
			j = m.scope || window,
			i = {};
			OpenLayers.Util.extend(i, this.options);
			i.requesttype = "feature";
			o instanceof OpenLayers.LonLat ? (i.polygon = null, i.envelope = [o.lon - l, o.lat - l, o.lon + l, o.lat + l]) : o instanceof OpenLayers.Geometry.Polygon && (i.envelope = null, i.polygon = o);
			var p = new OpenLayers.Format.ArcXML(i);
			OpenLayers.Util.extend(p.request.get_feature, m);
			p.request.get_feature.layer = n.id;
			"number" == typeof n.query.accuracy ? p.request.get_feature.query.accuracy = n.query.accuracy : (o = this.map.getCenter(), m = this.map.getViewPortPxFromLonLat(o), m.x++, m = this.map.getLonLatFromPixel(m), p.request.get_feature.query.accuracy = m.lon - o.lon);
			p.request.get_feature.query.where = n.query.where;
			p.request.get_feature.query.spatialfilter.relation = "area_intersection";
			OpenLayers.Request.POST({
				url : this.getFullRequestString({
					CustomService : "Query"
				}),
				data : p.write(),
				callback : function (a) {
					a = p.parseResponse(a.responseText);
					p.iserror() ? k.call(j, null) : k.call(j, a.features)
				}
			})
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.ArcIMS(this.name, this.url, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		CLASS_NAME : "OpenLayers.Layer.ArcIMS"
	});
OpenLayers.Format.OWSCommon.v1_1_0 = OpenLayers.Class(OpenLayers.Format.OWSCommon.v1, {
		namespaces : {
			ows : "http://www.opengis.net/ows/1.1",
			xlink : "http://www.w3.org/1999/xlink"
		},
		readers : {
			ows : OpenLayers.Util.applyDefaults({
				ExceptionReport : function (d, c) {
					c.exceptionReport = {
						version : d.getAttribute("version"),
						language : d.getAttribute("xml:lang"),
						exceptions : []
					};
					this.readChildNodes(d, c.exceptionReport)
				},
				AllowedValues : function (d, c) {
					c.allowedValues = {};
					this.readChildNodes(d, c.allowedValues)
				},
				AnyValue : function (d, c) {
					c.anyValue = !0
				},
				DataType : function (d, c) {
					c.dataType = this.getChildValue(d)
				},
				Range : function (d, c) {
					c.range = {};
					this.readChildNodes(d, c.range)
				},
				MinimumValue : function (d, c) {
					c.minValue = this.getChildValue(d)
				},
				MaximumValue : function (d, c) {
					c.maxValue = this.getChildValue(d)
				},
				Identifier : function (d, c) {
					c.identifier = this.getChildValue(d)
				},
				SupportedCRS : function (d, c) {
					c.supportedCRS = this.getChildValue(d)
				}
			}, OpenLayers.Format.OWSCommon.v1.prototype.readers.ows)
		},
		writers : {
			ows : OpenLayers.Util.applyDefaults({
				Range : function (d) {
					var c = this.createElementNSPlus("ows:Range", {
							attributes : {
								"ows:rangeClosure" : d.closure
							}
						});
					this.writeNode("ows:MinimumValue", d.minValue, c);
					this.writeNode("ows:MaximumValue", d.maxValue, c);
					return c
				},
				MinimumValue : function (b) {
					return this.createElementNSPlus("ows:MinimumValue", {
						value : b
					})
				},
				MaximumValue : function (b) {
					return this.createElementNSPlus("ows:MaximumValue", {
						value : b
					})
				},
				Value : function (b) {
					return this.createElementNSPlus("ows:Value", {
						value : b
					})
				}
			}, OpenLayers.Format.OWSCommon.v1.prototype.writers.ows)
		},
		CLASS_NAME : "OpenLayers.Format.OWSCommon.v1_1_0"
	});
OpenLayers.Format.WCSGetCoverage = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			ows : "http://www.opengis.net/ows/1.1",
			wcs : "http://www.opengis.net/wcs/1.1",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		VERSION : "1.1.2",
		schemaLocation : "http://www.opengis.net/wcs/1.1 http://schemas.opengis.net/wcs/1.1/wcsGetCoverage.xsd",
		write : function (b) {
			b = this.writeNode("wcs:GetCoverage", b);
			this.setAttributeNS(b, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			return OpenLayers.Format.XML.prototype.write.apply(this, [b])
		},
		writers : {
			wcs : {
				GetCoverage : function (d) {
					var c = this.createElementNSPlus("wcs:GetCoverage", {
							attributes : {
								version : d.version || this.VERSION,
								service : "WCS"
							}
						});
					this.writeNode("ows:Identifier", d.identifier, c);
					this.writeNode("wcs:DomainSubset", d.domainSubset, c);
					this.writeNode("wcs:Output", d.output, c);
					return c
				},
				DomainSubset : function (d) {
					var c = this.createElementNSPlus("wcs:DomainSubset", {});
					this.writeNode("ows:BoundingBox", d.boundingBox, c);
					d.temporalSubset && this.writeNode("wcs:TemporalSubset", d.temporalSubset, c);
					return c
				},
				TemporalSubset : function (h) {
					for (var g = this.createElementNSPlus("wcs:TemporalSubset", {}), f = 0, e = h.timePeriods.length; f < e; ++f) {
						this.writeNode("wcs:TimePeriod", h.timePeriods[f], g)
					}
					return g
				},
				TimePeriod : function (d) {
					var c = this.createElementNSPlus("wcs:TimePeriod", {});
					this.writeNode("wcs:BeginPosition", d.begin, c);
					this.writeNode("wcs:EndPosition", d.end, c);
					d.resolution && this.writeNode("wcs:TimeResolution", d.resolution, c);
					return c
				},
				BeginPosition : function (b) {
					return this.createElementNSPlus("wcs:BeginPosition", {
						value : b
					})
				},
				EndPosition : function (b) {
					return this.createElementNSPlus("wcs:EndPosition", {
						value : b
					})
				},
				TimeResolution : function (b) {
					return this.createElementNSPlus("wcs:TimeResolution", {
						value : b
					})
				},
				Output : function (d) {
					var c = this.createElementNSPlus("wcs:Output", {
							attributes : {
								format : d.format,
								store : d.store
							}
						});
					d.gridCRS && this.writeNode("wcs:GridCRS", d.gridCRS, c);
					return c
				},
				GridCRS : function (d) {
					var c = this.createElementNSPlus("wcs:GridCRS", {});
					this.writeNode("wcs:GridBaseCRS", d.baseCRS, c);
					d.type && this.writeNode("wcs:GridType", d.type, c);
					d.origin && this.writeNode("wcs:GridOrigin", d.origin, c);
					this.writeNode("wcs:GridOffsets", d.offsets, c);
					d.CS && this.writeNode("wcs:GridCS", d.CS, c);
					return c
				},
				GridBaseCRS : function (b) {
					return this.createElementNSPlus("wcs:GridBaseCRS", {
						value : b
					})
				},
				GridOrigin : function (b) {
					return this.createElementNSPlus("wcs:GridOrigin", {
						value : b
					})
				},
				GridType : function (b) {
					return this.createElementNSPlus("wcs:GridType", {
						value : b
					})
				},
				GridOffsets : function (b) {
					return this.createElementNSPlus("wcs:GridOffsets", {
						value : b
					})
				},
				GridCS : function (b) {
					return this.createElementNSPlus("wcs:GridCS", {
						value : b
					})
				}
			},
			ows : OpenLayers.Format.OWSCommon.v1_1_0.prototype.writers.ows
		},
		CLASS_NAME : "OpenLayers.Format.WCSGetCoverage"
	});
OpenLayers.Format.WPSExecute = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			ows : "http://www.opengis.net/ows/1.1",
			gml : "http://www.opengis.net/gml",
			wps : "http://www.opengis.net/wps/1.0.0",
			wfs : "http://www.opengis.net/wfs",
			ogc : "http://www.opengis.net/ogc",
			wcs : "http://www.opengis.net/wcs",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		VERSION : "1.0.0",
		schemaLocation : "http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd",
		schemaLocationAttr : function () {},
		write : function (d) {
			var c;
			window.ActiveXObject ? this.xmldom = c = new ActiveXObject("Microsoft.XMLDOM") : c = document.implementation.createDocument("", "", null);
			d = this.writeNode("wps:Execute", d, c);
			this.setAttributeNS(d, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			return OpenLayers.Format.XML.prototype.write.apply(this, [d])
		},
		writers : {
			wps : {
				Execute : function (d) {
					var c = this.createElementNSPlus("wps:Execute", {
							attributes : {
								version : this.VERSION,
								service : "WPS"
							}
						});
					this.writeNode("ows:Identifier", d.identifier, c);
					this.writeNode("wps:DataInputs", d.dataInputs, c);
					this.writeNode("wps:ResponseForm", d.responseForm, c);
					return c
				},
				ResponseForm : function (d) {
					var c = this.createElementNSPlus("wps:ResponseForm", {});
					d.rawDataOutput && this.writeNode("wps:RawDataOutput", d.rawDataOutput, c);
					d.responseDocument && this.writeNode("wps:ResponseDocument", d.responseDocument, c);
					return c
				},
				ResponseDocument : function (d) {
					var c = this.createElementNSPlus("wps:ResponseDocument", {
							attributes : {
								storeExecuteResponse : d.storeExecuteResponse,
								lineage : d.lineage,
								status : d.status
							}
						});
					d.output && this.writeNode("wps:Output", d.output, c);
					return c
				},
				Output : function (d) {
					var c = this.createElementNSPlus("wps:Output", {
							attributes : {
								asReference : d.asReference
							}
						});
					this.writeNode("ows:Identifier", d.identifier, c);
					this.writeNode("ows:Title", d.title, c);
					this.writeNode("ows:Abstract", d["abstract"], c);
					return c
				},
				RawDataOutput : function (d) {
					var c = this.createElementNSPlus("wps:RawDataOutput", {
							attributes : {
								mimeType : d.mimeType
							}
						});
					this.writeNode("ows:Identifier", d.identifier, c);
					return c
				},
				DataInputs : function (h) {
					for (var g = this.createElementNSPlus("wps:DataInputs", {}), f = 0, e = h.length; f < e; ++f) {
						this.writeNode("wps:Input", h[f], g)
					}
					return g
				},
				Input : function (d) {
					var c = this.createElementNSPlus("wps:Input", {});
					this.writeNode("ows:Identifier", d.identifier, c);
					d.title && this.writeNode("ows:Title", d.title, c);
					d.data && this.writeNode("wps:Data", d.data, c);
					d.reference && this.writeNode("wps:Reference", d.reference, c);
					return c
				},
				Data : function (d) {
					var c = this.createElementNSPlus("wps:Data", {});
					d.literalData ? this.writeNode("wps:LiteralData", d.literalData, c) : d.complexData && this.writeNode("wps:ComplexData", d.complexData, c);
					return c
				},
				LiteralData : function (b) {
					return this.createElementNSPlus("wps:LiteralData", {
						attributes : {
							uom : b.uom
						},
						value : b.value
					})
				},
				ComplexData : function (d) {
					var f = this.createElementNSPlus("wps:ComplexData", {
							attributes : {
								mimeType : d.mimeType,
								encoding : d.encoding,
								schema : d.schema
							}
						}),
					e = d.value;
					"string" === typeof e ? f.appendChild(this.getXMLDoc().createCDATASection(d.value)) : f.appendChild(e);
					return f
				},
				Reference : function (d) {
					var c = this.createElementNSPlus("wps:Reference", {
							attributes : {
								mimeType : d.mimeType,
								"xlink:href" : d.href,
								method : d.method,
								encoding : d.encoding,
								schema : d.schema
							}
						});
					d.body && this.writeNode("wps:Body", d.body, c);
					return c
				},
				Body : function (d) {
					var c = this.createElementNSPlus("wps:Body", {});
					d.wcs ? this.writeNode("wcs:GetCoverage", d.wcs, c) : d.wfs ? (this.featureType = d.wfs.featureType, this.version = d.wfs.version, this.writeNode("wfs:GetFeature", d.wfs, c)) : this.writeNode("wps:Execute", d, c);
					return c
				}
			},
			wcs : OpenLayers.Format.WCSGetCoverage.prototype.writers.wcs,
			wfs : OpenLayers.Format.WFST.v1_1_0.prototype.writers.wfs,
			ogc : OpenLayers.Format.Filter.v1_1_0.prototype.writers.ogc,
			ows : OpenLayers.Format.OWSCommon.v1_1_0.prototype.writers.ows
		},
		CLASS_NAME : "OpenLayers.Format.WPSExecute"
	});
OpenLayers.Control.PanZoom = OpenLayers.Class(OpenLayers.Control, {
		slideFactor : 50,
		slideRatio : null,
		buttons : null,
		position : null,
		initialize : function (b) {
			this.position = new OpenLayers.Pixel(OpenLayers.Control.PanZoom.X, OpenLayers.Control.PanZoom.Y);
			OpenLayers.Control.prototype.initialize.apply(this, arguments)
		},
		destroy : function () {
			this.map && this.map.events.unregister("buttonclick", this, this.onButtonClick);
			this.removeButtons();
			this.position = this.buttons = null;
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		setMap : function (b) {
			OpenLayers.Control.prototype.setMap.apply(this, arguments);
			this.map.events.register("buttonclick", this, this.onButtonClick)
		},
		draw : function (d) {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			d = this.position;
			this.buttons = [];
			var f = {
				w : 18,
				h : 18
			},
			e = new OpenLayers.Pixel(d.x + f.w / 2, d.y);
			this._addButton("panup", "north-mini.png", e, f);
			d.y = e.y + f.h;
			this._addButton("panleft", "west-mini.png", d, f);
			this._addButton("panright", "east-mini.png", d.add(f.w, 0), f);
			this._addButton("pandown", "south-mini.png", e.add(0, 2 * f.h), f);
			this._addButton("zoomin", "zoom-plus-mini.png", e.add(0, 3 * f.h + 5), f);
			this._addButton("zoomworld", "zoom-world-mini.png", e.add(0, 4 * f.h + 5), f);
			this._addButton("zoomout", "zoom-minus-mini.png", e.add(0, 5 * f.h + 5), f);
			return this.div
		},
		_addButton : function (h, g, f, e) {
			g = OpenLayers.Util.getImageLocation(g);
			f = OpenLayers.Util.createAlphaImageDiv(this.id + "_" + h, f, e, g, "absolute");
			f.style.cursor = "pointer";
			this.div.appendChild(f);
			f.action = h;
			f.className = "olButton";
			this.buttons.push(f);
			return f
		},
		_removeButton : function (b) {
			this.div.removeChild(b);
			OpenLayers.Util.removeItem(this.buttons, b)
		},
		removeButtons : function () {
			for (var b = this.buttons.length - 1; 0 <= b; --b) {
				this._removeButton(this.buttons[b])
			}
		},
		onButtonClick : function (b) {
			switch (b.buttonElement.action) {
			case "panup":
				this.map.pan(0, -this.getSlideFactor("h"));
				break;
			case "pandown":
				this.map.pan(0, this.getSlideFactor("h"));
				break;
			case "panleft":
				this.map.pan(-this.getSlideFactor("w"), 0);
				break;
			case "panright":
				this.map.pan(this.getSlideFactor("w"), 0);
				break;
			case "zoomin":
				this.map.zoomIn();
				break;
			case "zoomout":
				this.map.zoomOut();
				break;
			case "zoomworld":
				this.map.zoomToMaxExtent()
			}
		},
		getSlideFactor : function (b) {
			return this.slideRatio ? this.map.getSize()[b] * this.slideRatio : this.slideFactor
		},
		CLASS_NAME : "OpenLayers.Control.PanZoom"
	});
OpenLayers.Control.PanZoom.X = 4;
OpenLayers.Control.PanZoom.Y = 4;
OpenLayers.Control.PanZoomBar = OpenLayers.Class(OpenLayers.Control.PanZoom, {
		zoomStopWidth : 18,
		zoomStopHeight : 11,
		slider : null,
		sliderEvents : null,
		zoombarDiv : null,
		zoomWorldIcon : !1,
		panIcons : !0,
		forceFixedZoomLevel : !1,
		mouseDragStart : null,
		deltaY : null,
		zoomStart : null,
		destroy : function () {
			this._removeZoomBar();
			this.map.events.un({
				changebaselayer : this.redraw,
				scope : this
			});
			OpenLayers.Control.PanZoom.prototype.destroy.apply(this, arguments);
			delete this.mouseDragStart;
			delete this.zoomStart
		},
		setMap : function (b) {
			OpenLayers.Control.PanZoom.prototype.setMap.apply(this, arguments);
			this.map.events.register("changebaselayer", this, this.redraw)
		},
		redraw : function () {
			null != this.div && (this.removeButtons(), this._removeZoomBar());
			this.draw()
		},
		draw : function (h) {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			h = this.position.clone();
			this.buttons = [];
			var g = {
				w : 18,
				h : 18
			};
			if (this.panIcons) {
				var f = new OpenLayers.Pixel(h.x + g.w / 2, h.y),
				e = g.w;
				this.zoomWorldIcon && (f = new OpenLayers.Pixel(h.x + g.w, h.y));
				this._addButton("panup", "north-mini.png", f, g);
				h.y = f.y + g.h;
				this._addButton("panleft", "west-mini.png", h, g);
				this.zoomWorldIcon && (this._addButton("zoomworld", "zoom-world-mini.png", h.add(g.w, 0), g), e *= 2);
				this._addButton("panright", "east-mini.png", h.add(e, 0), g);
				this._addButton("pandown", "south-mini.png", f.add(0, 2 * g.h), g);
				this._addButton("zoomin", "zoom-plus-mini.png", f.add(0, 3 * g.h + 5), g);
				f = this._addZoomBar(f.add(0, 4 * g.h + 5));
				this._addButton("zoomout", "zoom-minus-mini.png", f, g)
			} else {
				this._addButton("zoomin", "zoom-plus-mini.png", h, g),
				f = this._addZoomBar(h.add(0, g.h)),
				this._addButton("zoomout", "zoom-minus-mini.png", f, g),
				this.zoomWorldIcon && (f = f.add(0, g.h + 3), this._addButton("zoomworld", "zoom-world-mini.png", f, g))
			}
			return this.div
		},
		_addZoomBar : function (i) {
			var h = OpenLayers.Util.getImageLocation("slider.png"),
			g = this.id + "_" + this.map.id,
			f = this.map.getNumZoomLevels() - 1 - this.map.getZoom(),
			f = OpenLayers.Util.createAlphaImageDiv(g, i.add(-1, f * this.zoomStopHeight), {
					w : 20,
					h : 9
				}, h, "absolute");
			f.style.cursor = "move";
			this.slider = f;
			this.sliderEvents = new OpenLayers.Events(this, f, null, !0, {
					includeXY : !0
				});
			this.sliderEvents.on({
				touchstart : this.zoomBarDown,
				touchmove : this.zoomBarDrag,
				touchend : this.zoomBarUp,
				mousedown : this.zoomBarDown,
				mousemove : this.zoomBarDrag,
				mouseup : this.zoomBarUp
			});
			var j = {
				w : this.zoomStopWidth,
				h : this.zoomStopHeight * this.map.getNumZoomLevels()
			},
			h = OpenLayers.Util.getImageLocation("zoombar.png"),
			g = null;
			OpenLayers.Util.alphaHack() ? (g = this.id + "_" + this.map.id, g = OpenLayers.Util.createAlphaImageDiv(g, i, {
						w : j.w,
						h : this.zoomStopHeight
					}, h, "absolute", null, "crop"), g.style.height = j.h + "px") : g = OpenLayers.Util.createDiv("OpenLayers_Control_PanZoomBar_Zoombar" + this.map.id, i, j, h);
			g.style.cursor = "pointer";
			g.className = "olButton";
			this.zoombarDiv = g;
			this.div.appendChild(g);
			this.startTop = parseInt(g.style.top);
			this.div.appendChild(f);
			this.map.events.register("zoomend", this, this.moveZoomBar);
			return i = i.add(0, this.zoomStopHeight * this.map.getNumZoomLevels())
		},
		_removeZoomBar : function () {
			this.sliderEvents.un({
				touchstart : this.zoomBarDown,
				touchmove : this.zoomBarDrag,
				touchend : this.zoomBarUp,
				mousedown : this.zoomBarDown,
				mousemove : this.zoomBarDrag,
				mouseup : this.zoomBarUp
			});
			this.sliderEvents.destroy();
			this.div.removeChild(this.zoombarDiv);
			this.zoombarDiv = null;
			this.div.removeChild(this.slider);
			this.slider = null;
			this.map.events.unregister("zoomend", this, this.moveZoomBar)
		},
		onButtonClick : function (d) {
			OpenLayers.Control.PanZoom.prototype.onButtonClick.apply(this, arguments);
			if (d.buttonElement === this.zoombarDiv) {
				var c = d.buttonXY.y / this.zoomStopHeight;
				if (this.forceFixedZoomLevel || !this.map.fractionalZoom) {
					c = Math.floor(c)
				}
				c = this.map.getNumZoomLevels() - 1 - c;
				c = Math.min(Math.max(c, 0), this.map.getNumZoomLevels() - 1);
				this.map.zoomTo(c)
			}
		},
		passEventToSlider : function (b) {
			this.sliderEvents.handleBrowserEvent(b)
		},
		zoomBarDown : function (b) {
			if (OpenLayers.Event.isLeftClick(b) || OpenLayers.Event.isSingleTouch(b)) {
				this.map.events.on({
					touchmove : this.passEventToSlider,
					mousemove : this.passEventToSlider,
					mouseup : this.passEventToSlider,
					scope : this
				}),
				this.mouseDragStart = b.xy.clone(),
				this.zoomStart = b.xy.clone(),
				this.div.style.cursor = "move",
				this.zoombarDiv.offsets = null,
				OpenLayers.Event.stop(b)
			}
		},
		zoomBarDrag : function (d) {
			if (null != this.mouseDragStart) {
				var f = this.mouseDragStart.y - d.xy.y,
				e = OpenLayers.Util.pagePosition(this.zoombarDiv);
				0 < d.clientY - e[1] && d.clientY - e[1] < parseInt(this.zoombarDiv.style.height) - 2 && (f = parseInt(this.slider.style.top) - f, this.slider.style.top = f + "px", this.mouseDragStart = d.xy.clone());
				this.deltaY = this.zoomStart.y - d.xy.y;
				OpenLayers.Event.stop(d)
			}
		},
		zoomBarUp : function (d) {
			if ((OpenLayers.Event.isLeftClick(d) || "touchend" === d.type) && this.mouseDragStart) {
				this.div.style.cursor = "";
				this.map.events.un({
					touchmove : this.passEventToSlider,
					mouseup : this.passEventToSlider,
					mousemove : this.passEventToSlider,
					scope : this
				});
				var c = this.map.zoom;
				!this.forceFixedZoomLevel && this.map.fractionalZoom ? (c += this.deltaY / this.zoomStopHeight, c = Math.min(Math.max(c, 0), this.map.getNumZoomLevels() - 1)) : (c += this.deltaY / this.zoomStopHeight, c = Math.max(Math.round(c), 0));
				this.map.zoomTo(c);
				this.zoomStart = this.mouseDragStart = null;
				this.deltaY = 0;
				OpenLayers.Event.stop(d)
			}
		},
		moveZoomBar : function () {
			var b = (this.map.getNumZoomLevels() - 1 - this.map.getZoom()) * this.zoomStopHeight + this.startTop + 1;
			this.slider.style.top = b + "px"
		},
		CLASS_NAME : "OpenLayers.Control.PanZoomBar"
	});
OpenLayers.Format.WFSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.1.0",
		errorProperty : "service",
		CLASS_NAME : "OpenLayers.Format.WFSCapabilities"
	});
OpenLayers.Format.WFSCapabilities.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			wfs : "http://www.opengis.net/wfs",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance",
			ows : "http://www.opengis.net/ows"
		},
		defaultPrefix : "wfs",
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			return c
		},
		readers : {
			wfs : {
				WFS_Capabilities : function (d, c) {
					this.readChildNodes(d, c)
				},
				FeatureTypeList : function (d, c) {
					c.featureTypeList = {
						featureTypes : []
					};
					this.readChildNodes(d, c.featureTypeList)
				},
				FeatureType : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.featureTypes.push(e)
				},
				Name : function (d, f) {
					var e = this.getChildValue(d);
					e && (e = e.split(":"), f.name = e.pop(), 0 < e.length && (f.featureNS = this.lookupNamespaceURI(d, e[0])))
				},
				Title : function (d, f) {
					var e = this.getChildValue(d);
					e && (f.title = e)
				},
				Abstract : function (d, f) {
					var e = this.getChildValue(d);
					e && (f["abstract"] = e)
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.WFSCapabilities.v1"
	});
OpenLayers.Format.WFSCapabilities.v1_1_0 = OpenLayers.Class(OpenLayers.Format.WFSCapabilities.v1, {
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		readers : {
			wfs : OpenLayers.Util.applyDefaults({
				DefaultSRS : function (d, f) {
					var e = this.getChildValue(d);
					e && (f.srs = e)
				}
			}, OpenLayers.Format.WFSCapabilities.v1.prototype.readers.wfs),
			ows : OpenLayers.Format.OWSCommon.v1.prototype.readers.ows
		},
		CLASS_NAME : "OpenLayers.Format.WFSCapabilities.v1_1_0"
	});
OpenLayers.Layer.Image = OpenLayers.Class(OpenLayers.Layer, {
		isBaseLayer : !0,
		url : null,
		extent : null,
		size : null,
		tile : null,
		aspectRatio : null,
		initialize : function (i, h, g, f, j) {
			this.url = h;
			this.maxExtent = this.extent = g;
			this.size = f;
			OpenLayers.Layer.prototype.initialize.apply(this, [i, j]);
			this.aspectRatio = this.extent.getHeight() / this.size.h / (this.extent.getWidth() / this.size.w)
		},
		destroy : function () {
			this.tile && (this.removeTileMonitoringHooks(this.tile), this.tile.destroy(), this.tile = null);
			OpenLayers.Layer.prototype.destroy.apply(this, arguments)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.Image(this.name, this.url, this.extent, this.size, this.getOptions()));
			return b = OpenLayers.Layer.prototype.clone.apply(this, [b])
		},
		setMap : function (b) {
			null == this.options.maxResolution && (this.options.maxResolution = this.aspectRatio * this.extent.getWidth() / this.size.w);
			OpenLayers.Layer.prototype.setMap.apply(this, arguments)
		},
		moveTo : function (i, h, g) {
			OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
			var f = null == this.tile;
			if (h || f) {
				this.setTileSize();
				var j = this.map.getLayerPxFromLonLat({
						lon : this.extent.left,
						lat : this.extent.top
					});
				f ? (this.tile = new OpenLayers.Tile.Image(this, j, this.extent, null, this.tileSize), this.addTileMonitoringHooks(this.tile)) : (this.tile.size = this.tileSize.clone(), this.tile.position = j.clone());
				this.tile.draw()
			}
		},
		setTileSize : function () {
			var d = this.extent.getWidth() / this.map.getResolution(),
			c = this.extent.getHeight() / this.map.getResolution();
			this.tileSize = new OpenLayers.Size(d, c)
		},
		addTileMonitoringHooks : function (b) {
			b.onLoadStart = function () {
				this.events.triggerEvent("loadstart")
			};
			b.events.register("loadstart", this, b.onLoadStart);
			b.onLoadEnd = function () {
				this.events.triggerEvent("loadend")
			};
			b.events.register("loadend", this, b.onLoadEnd);
			b.events.register("unload", this, b.onLoadEnd)
		},
		removeTileMonitoringHooks : function (b) {
			b.unload();
			b.events.un({
				loadstart : b.onLoadStart,
				loadend : b.onLoadEnd,
				unload : b.onLoadEnd,
				scope : this
			})
		},
		setUrl : function (b) {
			this.url = b;
			this.tile.draw()
		},
		getURL : function () {
			return this.url
		},
		CLASS_NAME : "OpenLayers.Layer.Image"
	});
OpenLayers.Strategy = OpenLayers.Class({
		layer : null,
		options : null,
		active : null,
		autoActivate : !0,
		autoDestroy : !0,
		initialize : function (b) {
			OpenLayers.Util.extend(this, b);
			this.options = b;
			this.active = !1
		},
		destroy : function () {
			this.deactivate();
			this.options = this.layer = null
		},
		setLayer : function (b) {
			this.layer = b
		},
		activate : function () {
			return !this.active ? this.active = !0 : !1
		},
		deactivate : function () {
			return this.active ? (this.active = !1, !0) : !1
		},
		CLASS_NAME : "OpenLayers.Strategy"
	});
OpenLayers.Strategy.Save = OpenLayers.Class(OpenLayers.Strategy, {
		events : null,
		auto : !1,
		timer : null,
		initialize : function (b) {
			OpenLayers.Strategy.prototype.initialize.apply(this, [b]);
			this.events = new OpenLayers.Events(this)
		},
		activate : function () {
			var b = OpenLayers.Strategy.prototype.activate.call(this);
			if (b && this.auto) {
				if ("number" === typeof this.auto) {
					this.timer = window.setInterval(OpenLayers.Function.bind(this.save, this), 1000 * this.auto)
				} else {
					this.layer.events.on({
						featureadded : this.triggerSave,
						afterfeaturemodified : this.triggerSave,
						scope : this
					})
				}
			}
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Strategy.prototype.deactivate.call(this);
			b && this.auto && ("number" === typeof this.auto ? window.clearInterval(this.timer) : this.layer.events.un({
					featureadded : this.triggerSave,
					afterfeaturemodified : this.triggerSave,
					scope : this
				}));
			return b
		},
		triggerSave : function (d) {
			var c = d.feature;
			(c.state === OpenLayers.State.INSERT || c.state === OpenLayers.State.UPDATE || c.state === OpenLayers.State.DELETE) && this.save([d.feature])
		},
		save : function (o) {
			o || (o = this.layer.features);
			this.events.triggerEvent("start", {
				features : o
			});
			var n = this.layer.projection,
			m = this.layer.map.getProjectionObject();
			if (!m.equals(n)) {
				for (var l = o.length, k = Array(l), j, i, p = 0; p < l; ++p) {
					j = o[p],
					i = j.clone(),
					i.fid = j.fid,
					i.state = j.state,
					j.url && (i.url = j.url),
					i._original = j,
					i.geometry.transform(m, n),
					k[p] = i
				}
				o = k
			}
			this.layer.protocol.commit(o, {
				callback : this.onCommit,
				scope : this
			})
		},
		onCommit : function (r) {
			var q = {
				response : r
			};
			if (r.success()) {
				for (var p = r.reqFeatures, o, n = [], m = r.insertIds || [], l = 0, k = 0, i = p.length; k < i; ++k) {
					if (o = p[k], o = o._original || o, r = o.state) {
						r == OpenLayers.State.DELETE ? n.push(o) : r == OpenLayers.State.INSERT && (o.fid = m[l], ++l),
						o.state = null
					}
				}
				0 < n.length && this.layer.destroyFeatures(n);
				this.events.triggerEvent("success", q)
			} else {
				this.events.triggerEvent("fail", q)
			}
		},
		CLASS_NAME : "OpenLayers.Strategy.Save"
	});
OpenLayers.Format.GPX = OpenLayers.Class(OpenLayers.Format.XML, {
		defaultDesc : "No description available",
		extractWaypoints : !0,
		extractTracks : !0,
		extractRoutes : !0,
		extractAttributes : !0,
		namespaces : {
			gpx : "http://www.topografix.com/GPX/1/1",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		schemaLocation : "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
		creator : "OpenLayers",
		initialize : function (b) {
			this.externalProjection = new OpenLayers.Projection("EPSG:4326");
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		read : function (l) {
			"string" == typeof l && (l = OpenLayers.Format.XML.prototype.read.apply(this, [l]));
			var i = [];
			if (this.extractTracks) {
				for (var t = l.getElementsByTagName("trk"), s = 0, r = t.length; s < r; s++) {
					var q = {};
					this.extractAttributes && (q = this.parseAttributes(t[s]));
					for (var p = this.getElementsByTagNameNS(t[s], t[s].namespaceURI, "trkseg"), o = 0, n = p.length; o < n; o++) {
						var m = this.extractSegment(p[o], "trkpt");
						i.push(new OpenLayers.Feature.Vector(m, q))
					}
				}
			}
			if (this.extractRoutes) {
				r = l.getElementsByTagName("rte");
				t = 0;
				for (s = r.length; t < s; t++) {
					q = {},
					this.extractAttributes && (q = this.parseAttributes(r[t])),
					p = this.extractSegment(r[t], "rtept"),
					i.push(new OpenLayers.Feature.Vector(p, q))
				}
			}
			if (this.extractWaypoints) {
				l = l.getElementsByTagName("wpt");
				t = 0;
				for (r = l.length; t < r; t++) {
					q = {},
					this.extractAttributes && (q = this.parseAttributes(l[t])),
					s = new OpenLayers.Geometry.Point(l[t].getAttribute("lon"), l[t].getAttribute("lat")),
					i.push(new OpenLayers.Feature.Vector(s, q))
				}
			}
			if (this.internalProjection && this.externalProjection) {
				q = 0;
				for (l = i.length; q < l; q++) {
					i[q].geometry.transform(this.externalProjection, this.internalProjection)
				}
			}
			return i
		},
		extractSegment : function (j, i) {
			for (var h = this.getElementsByTagNameNS(j, j.namespaceURI, i), g = [], l = 0, k = h.length; l < k; l++) {
				g.push(new OpenLayers.Geometry.Point(h[l].getAttribute("lon"), h[l].getAttribute("lat")))
			}
			return new OpenLayers.Geometry.LineString(g)
		},
		parseAttributes : function (h) {
			var g = {};
			h = h.firstChild;
			for (var f, e; h; ) {
				if (1 == h.nodeType && h.firstChild && (f = h.firstChild, 3 == f.nodeType || 4 == f.nodeType)) {
					e = h.prefix ? h.nodeName.split(":")[1] : h.nodeName,
					"trkseg" != e && "rtept" != e && (g[e] = f.nodeValue)
				}
				h = h.nextSibling
			}
			return g
		},
		write : function (i, h) {
			i = OpenLayers.Util.isArray(i) ? i : [i];
			var g = this.createElementNS(this.namespaces.gpx, "gpx");
			g.setAttribute("version", "1.1");
			g.setAttribute("creator", this.creator);
			this.setAttributes(g, {
				"xsi:schemaLocation" : this.schemaLocation
			});
			h && "object" == typeof h && g.appendChild(this.buildMetadataNode(h));
			for (var f = 0, j = i.length; f < j; f++) {
				g.appendChild(this.buildFeatureNode(i[f]))
			}
			return OpenLayers.Format.XML.prototype.write.apply(this, [g])
		},
		buildMetadataNode : function (j) {
			for (var i = ["name", "desc", "author"], h = this.createElementNSPlus("gpx:metadata"), g = 0; g < i.length; g++) {
				var l = i[g];
				if (j[l]) {
					var k = this.createElementNSPlus("gpx:" + l);
					k.appendChild(this.createTextNode(j[l]));
					h.appendChild(k)
				}
			}
			return h
		},
		buildFeatureNode : function (h) {
			var g = h.geometry,
			g = g.clone();
			this.internalProjection && this.externalProjection && g.transform(this.internalProjection, this.externalProjection);
			if ("OpenLayers.Geometry.Point" == g.CLASS_NAME) {
				var f = this.buildWptNode(g);
				this.appendAttributesNode(f, h);
				return f
			}
			f = this.createElementNSPlus("gpx:trk");
			this.appendAttributesNode(f, h);
			h = this.buildTrkSegNode(g);
			h = OpenLayers.Util.isArray(h) ? h : [h];
			for (var g = 0, e = h.length; g < e; g++) {
				f.appendChild(h[g])
			}
			return f
		},
		buildTrkSegNode : function (i) {
			var h,
			g,
			f,
			j;
			if ("OpenLayers.Geometry.LineString" == i.CLASS_NAME || "OpenLayers.Geometry.LinearRing" == i.CLASS_NAME) {
				h = this.createElementNSPlus("gpx:trkseg");
				g = 0;
				for (f = i.components.length; g < f; g++) {
					j = i.components[g],
					h.appendChild(this.buildTrkPtNode(j))
				}
				return h
			}
			h = [];
			g = 0;
			for (f = i.components.length; g < f; g++) {
				h.push(this.buildTrkSegNode(i.components[g]))
			}
			return h
		},
		buildTrkPtNode : function (d) {
			var c = this.createElementNSPlus("gpx:trkpt");
			c.setAttribute("lon", d.x);
			c.setAttribute("lat", d.y);
			return c
		},
		buildWptNode : function (d) {
			var c = this.createElementNSPlus("gpx:wpt");
			c.setAttribute("lon", d.x);
			c.setAttribute("lat", d.y);
			return c
		},
		appendAttributesNode : function (d, f) {
			var e = this.createElementNSPlus("gpx:name");
			e.appendChild(this.createTextNode(f.attributes.name || f.id));
			d.appendChild(e);
			e = this.createElementNSPlus("gpx:desc");
			e.appendChild(this.createTextNode(f.attributes.description || this.defaultDesc));
			d.appendChild(e)
		},
		CLASS_NAME : "OpenLayers.Format.GPX"
	});
OpenLayers.Format.WMSDescribeLayer = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.1.1",
		getVersion : function (d, f) {
			var e = OpenLayers.Format.XML.VersionedOGC.prototype.getVersion.apply(this, arguments);
			if ("1.1.1" == e || "1.1.0" == e) {
				e = "1.1"
			}
			return e
		},
		CLASS_NAME : "OpenLayers.Format.WMSDescribeLayer"
	});
OpenLayers.Format.WMSDescribeLayer.v1_1 = OpenLayers.Class(OpenLayers.Format.WMSDescribeLayer, {
		initialize : function (b) {
			OpenLayers.Format.WMSDescribeLayer.prototype.initialize.apply(this, [b])
		},
		read : function (o) {
			"string" == typeof o && (o = OpenLayers.Format.XML.prototype.read.apply(this, [o]));
			o = o.documentElement.childNodes;
			for (var n = [], m, l, k = 0; k < o.length; ++k) {
				if (m = o[k], l = m.nodeName, "LayerDescription" == l) {
					l = m.getAttribute("name");
					var j = "",
					i = "",
					p = "";
					m.getAttribute("owsType") ? (j = m.getAttribute("owsType"), i = m.getAttribute("owsURL")) : "" != m.getAttribute("wfs") ? (j = "WFS", i = m.getAttribute("wfs")) : "" != m.getAttribute("wcs") && (j = "WCS", i = m.getAttribute("wcs"));
					m = m.getElementsByTagName("Query");
					0 < m.length && ((p = m[0].getAttribute("typeName")) || (p = m[0].getAttribute("typename")));
					n.push({
						layerName : l,
						owsType : j,
						owsURL : i,
						typeName : p
					})
				}
			}
			return n
		},
		CLASS_NAME : "OpenLayers.Format.WMSDescribeLayer.v1_1"
	});
OpenLayers.Layer.XYZ = OpenLayers.Class(OpenLayers.Layer.Grid, {
		isBaseLayer : !0,
		sphericalMercator : !1,
		zoomOffset : 0,
		serverResolutions : null,
		initialize : function (d, f, e) {
			if (e && e.sphericalMercator || this.sphericalMercator) {
				e = OpenLayers.Util.extend({
						projection : "EPSG:900913",
						numZoomLevels : 19
					}, e)
			}
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, [d || this.name, f || this.url, {}, e])
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.XYZ(this.name, this.url, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getURL : function (d) {
			d = this.getXYZ(d);
			var c = this.url;
			OpenLayers.Util.isArray(c) && (c = this.selectUrl("" + d.x + d.y + d.z, c));
			return OpenLayers.String.format(c, d)
		},
		getXYZ : function (h) {
			var g = this.getServerResolution(),
			f = Math.round((h.left - this.maxExtent.left) / (g * this.tileSize.w));
			h = Math.round((this.maxExtent.top - h.top) / (g * this.tileSize.h));
			g = this.getServerZoom();
			if (this.wrapDateLine) {
				var e = Math.pow(2, g),
				f = (f % e + e) % e
			}
			return {
				x : f,
				y : h,
				z : g
			}
		},
		setMap : function (b) {
			OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
			this.tileOrigin || (this.tileOrigin = new OpenLayers.LonLat(this.maxExtent.left, this.maxExtent.bottom))
		},
		CLASS_NAME : "OpenLayers.Layer.XYZ"
	});
OpenLayers.Layer.OSM = OpenLayers.Class(OpenLayers.Layer.XYZ, {
		name : "OpenStreetMap",
		url : ["http://a.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png"],
		attribution : "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
		sphericalMercator : !0,
		wrapDateLine : !0,
		tileOptions : null,
		initialize : function (d, f, e) {
			OpenLayers.Layer.XYZ.prototype.initialize.apply(this, arguments);
			this.tileOptions = OpenLayers.Util.extend({
					crossOriginKeyword : "anonymous"
				}, this.options && this.options.tileOptions)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.OSM(this.name, this.url, this.getOptions()));
			return b = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [b])
		},
		CLASS_NAME : "OpenLayers.Layer.OSM"
	});
OpenLayers.Renderer = OpenLayers.Class({
		container : null,
		root : null,
		extent : null,
		locked : !1,
		size : null,
		resolution : null,
		map : null,
		featureDx : 0,
		initialize : function (d, c) {
			this.container = OpenLayers.Util.getElement(d);
			OpenLayers.Util.extend(this, c)
		},
		destroy : function () {
			this.map = this.resolution = this.size = this.extent = this.container = null
		},
		supported : function () {
			return !1
		},
		setExtent : function (d, f) {
			this.extent = d.clone();
			if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
				var e = d.getWidth() / this.map.getExtent().getWidth();
				d = d.scale(1 / e);
				this.extent = d.wrapDateLine(this.map.getMaxExtent()).scale(e)
			}
			f && (this.resolution = null);
			return !0
		},
		setSize : function (b) {
			this.size = b.clone();
			this.resolution = null
		},
		getResolution : function () {
			return this.resolution = this.resolution || this.map.getResolution()
		},
		drawFeature : function (l, k) {
			null == k && (k = l.style);
			if (l.geometry) {
				var j = l.geometry.getBounds();
				if (j) {
					var i;
					this.map.baseLayer && this.map.baseLayer.wrapDateLine && (i = this.map.getMaxExtent());
					j.intersectsBounds(this.extent, {
						worldBounds : i
					}) ? this.calculateFeatureDx(j, i) : k = {
						display : "none"
					};
					j = this.drawGeometry(l.geometry, k, l.id);
					if ("none" != k.display && k.label && !1 !== j) {
						i = l.geometry.getCentroid();
						if (k.labelXOffset || k.labelYOffset) {
							var h = isNaN(k.labelXOffset) ? 0 : k.labelXOffset,
							n = isNaN(k.labelYOffset) ? 0 : k.labelYOffset,
							m = this.getResolution();
							i.move(h * m, n * m)
						}
						this.drawText(l.id, k, i)
					} else {
						this.removeText(l.id)
					}
					return j
				}
			}
		},
		calculateFeatureDx : function (d, f) {
			this.featureDx = 0;
			if (f) {
				var e = f.getWidth();
				this.featureDx = Math.round(((d.left + d.right) / 2 - (this.extent.left + this.extent.right) / 2) / e) * e
			}
		},
		drawGeometry : function () {},
		drawText : function () {},
		removeText : function () {},
		clear : function () {},
		getFeatureIdFromEvent : function () {},
		eraseFeatures : function (h) {
			OpenLayers.Util.isArray(h) || (h = [h]);
			for (var g = 0, f = h.length; g < f; ++g) {
				var e = h[g];
				this.eraseGeometry(e.geometry, e.id);
				this.removeText(e.id)
			}
		},
		eraseGeometry : function () {},
		moveRoot : function () {},
		getRenderLayerId : function () {
			return this.container.id
		},
		applyDefaultSymbolizer : function (d) {
			var c = OpenLayers.Util.extend({}, OpenLayers.Renderer.defaultSymbolizer);
			!1 === d.stroke && (delete c.strokeWidth, delete c.strokeColor);
			!1 === d.fill && delete c.fillColor;
			OpenLayers.Util.extend(c, d);
			return c
		},
		CLASS_NAME : "OpenLayers.Renderer"
	});
OpenLayers.Renderer.defaultSymbolizer = {
	fillColor : "#000000",
	strokeColor : "#000000",
	strokeWidth : 2,
	fillOpacity : 1,
	strokeOpacity : 1,
	pointRadius : 0,
	labelAlign : "cm"
};
OpenLayers.Renderer.symbol = {
	star : [350, 75, 379, 161, 469, 161, 397, 215, 423, 301, 350, 250, 277, 301, 303, 215, 231, 161, 321, 161, 350, 75],
	cross : [4, 0, 6, 0, 6, 4, 10, 4, 10, 6, 6, 6, 6, 10, 4, 10, 4, 6, 0, 6, 0, 4, 4, 4, 4, 0],
	x : [0, 0, 25, 0, 50, 35, 75, 0, 100, 0, 65, 50, 100, 100, 75, 100, 50, 65, 25, 100, 0, 100, 35, 50, 0, 0],
	square : [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
	triangle : [0, 10, 10, 10, 5, 0, 0, 10]
};
OpenLayers.Renderer.Canvas = OpenLayers.Class(OpenLayers.Renderer, {
		hitDetection : !0,
		hitOverflow : 0,
		canvas : null,
		features : null,
		pendingRedraw : !1,
		cachedSymbolBounds : {},
		initialize : function (d, c) {
			OpenLayers.Renderer.prototype.initialize.apply(this, arguments);
			this.root = document.createElement("canvas");
			this.container.appendChild(this.root);
			this.canvas = this.root.getContext("2d");
			this.features = {};
			this.hitDetection && (this.hitCanvas = document.createElement("canvas"), this.hitContext = this.hitCanvas.getContext("2d"))
		},
		setExtent : function () {
			OpenLayers.Renderer.prototype.setExtent.apply(this, arguments);
			return !1
		},
		eraseGeometry : function (d, c) {
			this.eraseFeatures(this.features[c][0])
		},
		supported : function () {
			return OpenLayers.CANVAS_SUPPORTED
		},
		setSize : function (d) {
			this.size = d.clone();
			var c = this.root;
			c.style.width = d.w + "px";
			c.style.height = d.h + "px";
			c.width = d.w;
			c.height = d.h;
			this.resolution = null;
			this.hitDetection && (c = this.hitCanvas, c.style.width = d.w + "px", c.style.height = d.h + "px", c.width = d.w, c.height = d.h)
		},
		drawFeature : function (h, g) {
			var f;
			if (h.geometry) {
				g = this.applyDefaultSymbolizer(g || h.style);
				f = h.geometry.getBounds();
				var e;
				this.map.baseLayer && this.map.baseLayer.wrapDateLine && (e = this.map.getMaxExtent());
				e = f && f.intersectsBounds(this.extent, {
						worldBounds : e
					});
				(f = "none" !== g.display && !!f && e) ? this.features[h.id] = [h, g] : delete this.features[h.id];
				this.pendingRedraw = !0
			}
			this.pendingRedraw && !this.locked && (this.redraw(), this.pendingRedraw = !1);
			return f
		},
		drawGeometry : function (h, g, f) {
			var e = h.CLASS_NAME;
			if ("OpenLayers.Geometry.Collection" == e || "OpenLayers.Geometry.MultiPoint" == e || "OpenLayers.Geometry.MultiLineString" == e || "OpenLayers.Geometry.MultiPolygon" == e) {
				for (e = 0; e < h.components.length; e++) {
					this.drawGeometry(h.components[e], g, f)
				}
			} else {
				switch (h.CLASS_NAME) {
				case "OpenLayers.Geometry.Point":
					this.drawPoint(h, g, f);
					break;
				case "OpenLayers.Geometry.LineString":
					this.drawLineString(h, g, f);
					break;
				case "OpenLayers.Geometry.LinearRing":
					this.drawLinearRing(h, g, f);
					break;
				case "OpenLayers.Geometry.Polygon":
					this.drawPolygon(h, g, f)
				}
			}
		},
		drawExternalGraphic : function (r, q, p) {
			var o = new Image;
			q.graphicTitle && (o.title = q.graphicTitle);
			var n = q.graphicWidth || q.graphicHeight,
			m = q.graphicHeight || q.graphicWidth,
			n = n ? n : 2 * q.pointRadius,
			m = m ? m : 2 * q.pointRadius,
			l = void 0 != q.graphicXOffset ? q.graphicXOffset :  - (0.5 * n),
			k = void 0 != q.graphicYOffset ? q.graphicYOffset :  - (0.5 * m),
			i = q.graphicOpacity || q.fillOpacity;
			o.onload = OpenLayers.Function.bind(function () {
					if (this.features[p]) {
						var a = this.getLocalXY(r),
						b = a[0],
						a = a[1];
						if (!isNaN(b) && !isNaN(a)) {
							var b = b + l | 0,
							a = a + k | 0,
							d = this.canvas;
							d.globalAlpha = i;
							var c = OpenLayers.Renderer.Canvas.drawImageScaleFactor || (OpenLayers.Renderer.Canvas.drawImageScaleFactor = /android 2.1/.test(navigator.userAgent.toLowerCase()) ? 320 / window.screen.width : 1);
							d.drawImage(o, b * c, a * c, n * c, m * c);
							this.hitDetection && (this.setHitContextStyle("fill", p), this.hitContext.fillRect(b, a, n, m))
						}
					}
				}, this);
			o.src = q.externalGraphic
		},
		drawNamedSymbol : function (o, n, m) {
			var l,
			k,
			j,
			i;
			j = Math.PI / 180;
			var p = OpenLayers.Renderer.symbol[n.graphicName];
			if (!p) {
				throw Error(n.graphicName + " is not a valid symbol name")
			}
			if (p.length && !(2 > p.length) && (o = this.getLocalXY(o), k = o[0], i = o[1], !isNaN(k) && !isNaN(i))) {
				this.canvas.lineCap = "round";
				this.canvas.lineJoin = "round";
				this.hitDetection && (this.hitContext.lineCap = "round", this.hitContext.lineJoin = "round");
				if (n.graphicName in this.cachedSymbolBounds) {
					l = this.cachedSymbolBounds[n.graphicName]
				} else {
					l = new OpenLayers.Bounds;
					for (o = 0; o < p.length; o += 2) {
						l.extend(new OpenLayers.LonLat(p[o], p[o + 1]))
					}
					this.cachedSymbolBounds[n.graphicName] = l
				}
				this.canvas.save();
				this.hitDetection && this.hitContext.save();
				this.canvas.translate(k, i);
				this.hitDetection && this.hitContext.translate(k, i);
				o = j * n.rotation;
				isNaN(o) || (this.canvas.rotate(o), this.hitDetection && this.hitContext.rotate(o));
				j = 2 * n.pointRadius / Math.max(l.getWidth(), l.getHeight());
				this.canvas.scale(j, j);
				this.hitDetection && this.hitContext.scale(j, j);
				o = l.getCenterLonLat().lon;
				l = l.getCenterLonLat().lat;
				this.canvas.translate(-o, -l);
				this.hitDetection && this.hitContext.translate(-o, -l);
				i = n.strokeWidth;
				n.strokeWidth = i / j;
				if (!1 !== n.fill) {
					this.setCanvasStyle("fill", n);
					this.canvas.beginPath();
					for (o = 0; o < p.length; o += 2) {
						l = p[o],
						k = p[o + 1],
						0 == o && this.canvas.moveTo(l, k),
						this.canvas.lineTo(l, k)
					}
					this.canvas.closePath();
					this.canvas.fill();
					if (this.hitDetection) {
						this.setHitContextStyle("fill", m, n);
						this.hitContext.beginPath();
						for (o = 0; o < p.length; o += 2) {
							l = p[o],
							k = p[o + 1],
							0 == o && this.canvas.moveTo(l, k),
							this.hitContext.lineTo(l, k)
						}
						this.hitContext.closePath();
						this.hitContext.fill()
					}
				}
				if (!1 !== n.stroke) {
					this.setCanvasStyle("stroke", n);
					this.canvas.beginPath();
					for (o = 0; o < p.length; o += 2) {
						l = p[o],
						k = p[o + 1],
						0 == o && this.canvas.moveTo(l, k),
						this.canvas.lineTo(l, k)
					}
					this.canvas.closePath();
					this.canvas.stroke();
					if (this.hitDetection) {
						this.setHitContextStyle("stroke", m, n, j);
						this.hitContext.beginPath();
						for (o = 0; o < p.length; o += 2) {
							l = p[o],
							k = p[o + 1],
							0 == o && this.hitContext.moveTo(l, k),
							this.hitContext.lineTo(l, k)
						}
						this.hitContext.closePath();
						this.hitContext.stroke()
					}
				}
				n.strokeWidth = i;
				this.canvas.restore();
				this.hitDetection && this.hitContext.restore();
				this.setCanvasStyle("reset")
			}
		},
		setCanvasStyle : function (d, c) {
			"fill" === d ? (this.canvas.globalAlpha = c.fillOpacity, this.canvas.fillStyle = c.fillColor) : "stroke" === d ? (this.canvas.globalAlpha = c.strokeOpacity, this.canvas.strokeStyle = c.strokeColor, this.canvas.lineWidth = c.strokeWidth) : (this.canvas.globalAlpha = 0, this.canvas.lineWidth = 1)
		},
		featureIdToHex : function (d) {
			d = Number(d.split("_").pop()) + 1;
			16777216 <= d && (this.hitOverflow = d - 16777215, d = d % 16777216 + 1);
			d = "000000" + d.toString(16);
			var c = d.length;
			return d = "#" + d.substring(c - 6, c)
		},
		setHitContextStyle : function (h, g, f, e) {
			g = this.featureIdToHex(g);
			"fill" == h ? (this.hitContext.globalAlpha = 1, this.hitContext.fillStyle = g) : "stroke" == h ? (this.hitContext.globalAlpha = 1, this.hitContext.strokeStyle = g, "undefined" === typeof e ? this.hitContext.lineWidth = f.strokeWidth + 2 : isNaN(e) || (this.hitContext.lineWidth = f.strokeWidth + 2 / e)) : (this.hitContext.globalAlpha = 0, this.hitContext.lineWidth = 1)
		},
		drawPoint : function (j, i, h) {
			if (!1 !== i.graphic) {
				if (i.externalGraphic) {
					this.drawExternalGraphic(j, i, h)
				} else {
					if (i.graphicName && "circle" != i.graphicName) {
						this.drawNamedSymbol(j, i, h)
					} else {
						var g = this.getLocalXY(j);
						j = g[0];
						g = g[1];
						if (!isNaN(j) && !isNaN(g)) {
							var l = 2 * Math.PI,
							k = i.pointRadius;
							!1 !== i.fill && (this.setCanvasStyle("fill", i), this.canvas.beginPath(), this.canvas.arc(j, g, k, 0, l, !0), this.canvas.fill(), this.hitDetection && (this.setHitContextStyle("fill", h, i), this.hitContext.beginPath(), this.hitContext.arc(j, g, k, 0, l, !0), this.hitContext.fill()));
							!1 !== i.stroke && (this.setCanvasStyle("stroke", i), this.canvas.beginPath(), this.canvas.arc(j, g, k, 0, l, !0), this.canvas.stroke(), this.hitDetection && (this.setHitContextStyle("stroke", h, i), this.hitContext.beginPath(), this.hitContext.arc(j, g, k, 0, l, !0), this.hitContext.stroke()), this.setCanvasStyle("reset"))
						}
					}
				}
			}
		},
		drawLineString : function (d, f, e) {
			f = OpenLayers.Util.applyDefaults({
					fill : !1
				}, f);
			this.drawLinearRing(d, f, e)
		},
		drawLinearRing : function (d, f, e) {
			!1 !== f.fill && (this.setCanvasStyle("fill", f), this.renderPath(this.canvas, d, f, e, "fill"), this.hitDetection && (this.setHitContextStyle("fill", e, f), this.renderPath(this.hitContext, d, f, e, "fill")));
			!1 !== f.stroke && (this.setCanvasStyle("stroke", f), this.renderPath(this.canvas, d, f, e, "stroke"), this.hitDetection && (this.setHitContextStyle("stroke", e, f), this.renderPath(this.hitContext, d, f, e, "stroke")));
			this.setCanvasStyle("reset")
		},
		renderPath : function (j, i, h, g, l) {
			i = i.components;
			h = i.length;
			j.beginPath();
			g = this.getLocalXY(i[0]);
			var k = g[1];
			if (!isNaN(g[0]) && !isNaN(k)) {
				j.moveTo(g[0], g[1]);
				for (g = 1; g < h; ++g) {
					k = this.getLocalXY(i[g]),
					j.lineTo(k[0], k[1])
				}
				"fill" === l ? j.fill() : j.stroke()
			}
		},
		drawPolygon : function (i, h, g) {
			i = i.components;
			var f = i.length;
			this.drawLinearRing(i[0], h, g);
			for (var j = 1; j < f; ++j) {
				this.canvas.globalCompositeOperation = "destination-out",
				this.hitDetection && (this.hitContext.globalCompositeOperation = "destination-out"),
				this.drawLinearRing(i[j], OpenLayers.Util.applyDefaults({
						stroke : !1,
						fillOpacity : 1
					}, h), g),
				this.canvas.globalCompositeOperation = "source-over",
				this.hitDetection && (this.hitContext.globalCompositeOperation = "source-over"),
				this.drawLinearRing(i[j], OpenLayers.Util.applyDefaults({
						fill : !1
					}, h), g)
			}
		},
		drawText : function (l, i) {
			var t = this.getLocalXY(l);
			this.setCanvasStyle("reset");
			this.canvas.fillStyle = i.fontColor;
			this.canvas.globalAlpha = i.fontOpacity || 1;
			var s = [i.fontStyle ? i.fontStyle : "normal", "normal", i.fontWeight ? i.fontWeight : "normal", i.fontSize ? i.fontSize : "1em", i.fontFamily ? i.fontFamily : "sans-serif"].join(" "),
			r = i.label.split("\n"),
			q = r.length;
			if (this.canvas.fillText) {
				this.canvas.font = s;
				this.canvas.textAlign = OpenLayers.Renderer.Canvas.LABEL_ALIGN[i.labelAlign[0]] || "center";
				this.canvas.textBaseline = OpenLayers.Renderer.Canvas.LABEL_ALIGN[i.labelAlign[1]] || "middle";
				var p = OpenLayers.Renderer.Canvas.LABEL_FACTOR[i.labelAlign[1]];
				null == p && (p = -0.5);
				s = this.canvas.measureText("Mg").height || this.canvas.measureText("xx").width;
				t[1] += s * p * (q - 1);
				for (p = 0; p < q; p++) {
					i.labelOutlineWidth && (this.canvas.save(), this.canvas.strokeStyle = i.labelOutlineColor, this.canvas.lineWidth = i.labelOutlineWidth, this.canvas.strokeText(r[p], t[0], t[1] + s * p + 1), this.canvas.restore()),
					this.canvas.fillText(r[p], t[0], t[1] + s * p)
				}
			} else {
				if (this.canvas.mozDrawText) {
					this.canvas.mozTextStyle = s;
					var o = OpenLayers.Renderer.Canvas.LABEL_FACTOR[i.labelAlign[0]];
					null == o && (o = -0.5);
					p = OpenLayers.Renderer.Canvas.LABEL_FACTOR[i.labelAlign[1]];
					null == p && (p = -0.5);
					s = this.canvas.mozMeasureText("xx");
					t[1] += s * (1 + p * q);
					for (p = 0; p < q; p++) {
						var n = t[0] + o * this.canvas.mozMeasureText(r[p]),
						m = t[1] + p * s;
						this.canvas.translate(n, m);
						this.canvas.mozDrawText(r[p]);
						this.canvas.translate(-n, -m)
					}
				}
			}
			this.setCanvasStyle("reset")
		},
		getLocalXY : function (d) {
			var f = this.getResolution(),
			e = this.extent;
			return [(d.x - this.featureDx) / f + -e.left / f, e.top / f - d.y / f]
		},
		clear : function () {
			var d = this.root.height,
			c = this.root.width;
			this.canvas.clearRect(0, 0, c, d);
			this.features = {};
			this.hitDetection && this.hitContext.clearRect(0, 0, c, d)
		},
		getFeatureIdFromEvent : function (d) {
			var f;
			if (this.hitDetection && "none" !== this.root.style.display && !this.map.dragging && (d = d.xy, d = this.hitContext.getImageData(d.x | 0, d.y | 0, 1, 1).data, 255 === d[3] && (d = d[2] + 256 * (d[1] + 256 * d[0])))) {
				d = "OpenLayers.Feature.Vector_" + (d - 1 + this.hitOverflow);
				try {
					f = this.features[d][0]
				} catch (e) {}

			}
			return f
		},
		eraseFeatures : function (d) {
			OpenLayers.Util.isArray(d) || (d = [d]);
			for (var c = 0; c < d.length; ++c) {
				delete this.features[d[c].id]
			}
			this.redraw()
		},
		redraw : function () {
			if (!this.locked) {
				var j = this.root.height,
				i = this.root.width;
				this.canvas.clearRect(0, 0, i, j);
				this.hitDetection && this.hitContext.clearRect(0, 0, i, j);
				var j = [],
				h,
				g,
				l = this.map.baseLayer && this.map.baseLayer.wrapDateLine && this.map.getMaxExtent(),
				k;
				for (k in this.features) {
					this.features.hasOwnProperty(k) && (i = this.features[k][0], h = i.geometry, this.calculateFeatureDx(h.getBounds(), l), g = this.features[k][1], this.drawGeometry(h, g, i.id), g.label && j.push([i, g]))
				}
				i = 0;
				for (h = j.length; i < h; ++i) {
					k = j[i],
					this.drawText(k[0].geometry.getCentroid(), k[1])
				}
			}
		},
		CLASS_NAME : "OpenLayers.Renderer.Canvas"
	});
OpenLayers.Renderer.Canvas.LABEL_ALIGN = {
	l : "left",
	r : "right",
	t : "top",
	b : "bottom"
};
OpenLayers.Renderer.Canvas.LABEL_FACTOR = {
	l : 0,
	r : -1,
	t : 0,
	b : -1
};
OpenLayers.Renderer.Canvas.drawImageScaleFactor = null;
OpenLayers.Format.OSM = OpenLayers.Class(OpenLayers.Format.XML, {
		checkTags : !1,
		interestingTagsExclude : null,
		areaTags : null,
		initialize : function (d) {
			var f = {
				interestingTagsExclude : "source source_ref source:ref history attribution created_by".split(" "),
				areaTags : "area building leisure tourism ruins historic landuse military natural sport".split(" ")
			},
			f = OpenLayers.Util.extend(f, d),
			e = {};
			for (d = 0; d < f.interestingTagsExclude.length; d++) {
				e[f.interestingTagsExclude[d]] = !0
			}
			f.interestingTagsExclude = e;
			e = {};
			for (d = 0; d < f.areaTags.length; d++) {
				e[f.areaTags[d]] = !0
			}
			f.areaTags = e;
			this.externalProjection = new OpenLayers.Projection("EPSG:4326");
			OpenLayers.Format.XML.prototype.initialize.apply(this, [f])
		},
		read : function (l) {
			"string" == typeof l && (l = OpenLayers.Format.XML.prototype.read.apply(this, [l]));
			var i = this.getNodes(l),
			t = this.getWays(l);
			l = Array(t.length);
			for (var s = 0; s < t.length; s++) {
				for (var r = Array(t[s].nodes.length), q = this.isWayArea(t[s]) ? 1 : 0, p = 0; p < t[s].nodes.length; p++) {
					var o = i[t[s].nodes[p]],
					n = new OpenLayers.Geometry.Point(o.lon, o.lat);
					n.osm_id = parseInt(t[s].nodes[p]);
					r[p] = n;
					o.used = !0
				}
				o = null;
				o = q ? new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(r)) : new OpenLayers.Geometry.LineString(r);
				this.internalProjection && this.externalProjection && o.transform(this.externalProjection, this.internalProjection);
				r = new OpenLayers.Feature.Vector(o, t[s].tags);
				r.osm_id = parseInt(t[s].id);
				r.fid = "way." + r.osm_id;
				l[s] = r
			}
			for (var m in i) {
				o = i[m];
				if (!o.used || this.checkTags) {
					t = null;
					if (this.checkTags) {
						t = this.getTags(o.node, !0);
						if (o.used && !t[1]) {
							continue
						}
						t = t[0]
					} else {
						t = this.getTags(o.node)
					}
					r = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(o.lon, o.lat), t);
					this.internalProjection && this.externalProjection && r.geometry.transform(this.externalProjection, this.internalProjection);
					r.osm_id = parseInt(m);
					r.fid = "node." + r.osm_id;
					l.push(r)
				}
				o.node = null
			}
			return l
		},
		getNodes : function (i) {
			i = i.getElementsByTagName("node");
			for (var h = {}, g = 0; g < i.length; g++) {
				var f = i[g],
				j = f.getAttribute("id");
				h[j] = {
					lat : f.getAttribute("lat"),
					lon : f.getAttribute("lon"),
					node : f
				}
			}
			return h
		},
		getWays : function (j) {
			j = j.getElementsByTagName("way");
			for (var i = [], h = 0; h < j.length; h++) {
				var g = j[h],
				l = {
					id : g.getAttribute("id")
				};
				l.tags = this.getTags(g);
				g = g.getElementsByTagName("nd");
				l.nodes = Array(g.length);
				for (var k = 0; k < g.length; k++) {
					l.nodes[k] = g[k].getAttribute("ref")
				}
				i.push(l)
			}
			return i
		},
		getTags : function (l, k) {
			for (var j = l.getElementsByTagName("tag"), i = {}, h = !1, n = 0; n < j.length; n++) {
				var m = j[n].getAttribute("k");
				i[m] = j[n].getAttribute("v");
				k && (this.interestingTagsExclude[m] || (h = !0))
			}
			return k ? [i, h] : i
		},
		isWayArea : function (h) {
			var g = !1,
			f = !1;
			h.nodes[0] == h.nodes[h.nodes.length - 1] && (g = !0);
			if (this.checkTags) {
				for (var e in h.tags) {
					if (this.areaTags[e]) {
						f = !0;
						break
					}
				}
			}
			return g && (this.checkTags ? f : !0)
		},
		write : function (i) {
			OpenLayers.Util.isArray(i) || (i = [i]);
			this.osm_id = 1;
			this.created_nodes = {};
			var h = this.createElementNS(null, "osm");
			h.setAttribute("version", "0.5");
			h.setAttribute("generator", "OpenLayers " + OpenLayers.VERSION_NUMBER);
			for (var g = i.length - 1; 0 <= g; g--) {
				for (var f = this.createFeatureNodes(i[g]), j = 0; j < f.length; j++) {
					h.appendChild(f[j])
				}
			}
			return OpenLayers.Format.XML.prototype.write.apply(this, [h])
		},
		createFeatureNodes : function (d) {
			var f = [],
			e = d.geometry.CLASS_NAME,
			e = e.substring(e.lastIndexOf(".") + 1),
			e = e.toLowerCase();
			(e = this.createXML[e]) && (f = e.apply(this, [d]));
			return f
		},
		createXML : {
			point : function (i) {
				var h = null,
				g = i.geometry ? i.geometry : i;
				this.internalProjection && this.externalProjection && (g = g.clone(), g.transform(this.internalProjection, this.externalProjection));
				var f = !1;
				i.osm_id ? (h = i.osm_id, this.created_nodes[h] && (f = !0)) : (h = -this.osm_id, this.osm_id++);
				var j = f ? this.created_nodes[h] : this.createElementNS(null, "node");
				this.created_nodes[h] = j;
				j.setAttribute("id", h);
				j.setAttribute("lon", g.x);
				j.setAttribute("lat", g.y);
				i.attributes && this.serializeTags(i, j);
				this.setState(i, j);
				return f ? [] : [j]
			},
			linestring : function (l) {
				var k,
				j = [],
				i = l.geometry;
				l.osm_id ? k = l.osm_id : (k = -this.osm_id, this.osm_id++);
				var h = this.createElementNS(null, "way");
				h.setAttribute("id", k);
				for (k = 0; k < i.components.length; k++) {
					var n = this.createXML.point.apply(this, [i.components[k]]);
					if (n.length) {
						var n = n[0],
						m = n.getAttribute("id");
						j.push(n)
					} else {
						m = i.components[k].osm_id,
						n = this.created_nodes[m]
					}
					this.setState(l, n);
					n = this.createElementNS(null, "nd");
					n.setAttribute("ref", m);
					h.appendChild(n)
				}
				this.serializeTags(l, h);
				j.push(h);
				return j
			},
			polygon : function (d) {
				var c = OpenLayers.Util.extend({
						area : "yes"
					}, d.attributes),
				c = new OpenLayers.Feature.Vector(d.geometry.components[0], c);
				c.osm_id = d.osm_id;
				return this.createXML.linestring.apply(this, [c])
			}
		},
		serializeTags : function (h, g) {
			for (var f in h.attributes) {
				var e = this.createElementNS(null, "tag");
				e.setAttribute("k", f);
				e.setAttribute("v", h.attributes[f]);
				g.appendChild(e)
			}
		},
		setState : function (d, f) {
			if (d.state) {
				var e = null;
				switch (d.state) {
				case OpenLayers.State.UPDATE:
				case OpenLayers.State.DELETE:
					e = "delete"
				}
				e && f.setAttribute("action", e)
			}
		},
		CLASS_NAME : "OpenLayers.Format.OSM"
	});
OpenLayers.Handler = OpenLayers.Class({
		id : null,
		control : null,
		map : null,
		keyMask : null,
		active : !1,
		evt : null,
		initialize : function (d, f, e) {
			OpenLayers.Util.extend(this, e);
			this.control = d;
			this.callbacks = f;
			(d = this.map || d.map) && this.setMap(d);
			this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
		},
		setMap : function (b) {
			this.map = b
		},
		checkModifiers : function (b) {
			return null == this.keyMask ? !0 : ((b.shiftKey ? OpenLayers.Handler.MOD_SHIFT : 0) | (b.ctrlKey ? OpenLayers.Handler.MOD_CTRL : 0) | (b.altKey ? OpenLayers.Handler.MOD_ALT : 0)) == this.keyMask
		},
		activate : function () {
			if (this.active) {
				return !1
			}
			for (var d = OpenLayers.Events.prototype.BROWSER_EVENTS, f = 0, e = d.length; f < e; f++) {
				this[d[f]] && this.register(d[f], this[d[f]])
			}
			return this.active = !0
		},
		deactivate : function () {
			if (!this.active) {
				return !1
			}
			for (var d = OpenLayers.Events.prototype.BROWSER_EVENTS, f = 0, e = d.length; f < e; f++) {
				this[d[f]] && this.unregister(d[f], this[d[f]])
			}
			this.active = !1;
			return !0
		},
		callback : function (d, c) {
			d && this.callbacks[d] && this.callbacks[d].apply(this.control, c)
		},
		register : function (d, c) {
			this.map.events.registerPriority(d, this, c);
			this.map.events.registerPriority(d, this, this.setEvent)
		},
		unregister : function (d, c) {
			this.map.events.unregister(d, this, c);
			this.map.events.unregister(d, this, this.setEvent)
		},
		setEvent : function (b) {
			this.evt = b;
			return !0
		},
		destroy : function () {
			this.deactivate();
			this.control = this.map = null
		},
		CLASS_NAME : "OpenLayers.Handler"
	});
OpenLayers.Handler.MOD_NONE = 0;
OpenLayers.Handler.MOD_SHIFT = 1;
OpenLayers.Handler.MOD_CTRL = 2;
OpenLayers.Handler.MOD_ALT = 4;
OpenLayers.Handler.Drag = OpenLayers.Class(OpenLayers.Handler, {
		started : !1,
		stopDown : !0,
		dragging : !1,
		touch : !1,
		last : null,
		start : null,
		lastMoveEvt : null,
		oldOnselectstart : null,
		interval : 0,
		timeoutId : null,
		documentDrag : !1,
		documentEvents : null,
		initialize : function (h, g, f) {
			OpenLayers.Handler.prototype.initialize.apply(this, arguments);
			if (!0 === this.documentDrag) {
				var e = this;
				this._docMove = function (a) {
					e.mousemove({
						xy : {
							x : a.clientX,
							y : a.clientY
						},
						element : document
					})
				};
				this._docUp = function (a) {
					e.mouseup({
						xy : {
							x : a.clientX,
							y : a.clientY
						}
					})
				}
			}
		},
		dragstart : function (d) {
			var c = !0;
			this.dragging = !1;
			this.checkModifiers(d) && (OpenLayers.Event.isLeftClick(d) || OpenLayers.Event.isSingleTouch(d)) ? (this.started = !0, this.last = this.start = d.xy, OpenLayers.Element.addClass(this.map.viewPortDiv, "olDragDown"), this.down(d), this.callback("down", [d.xy]), OpenLayers.Event.stop(d), this.oldOnselectstart || (this.oldOnselectstart = document.onselectstart ? document.onselectstart : OpenLayers.Function.True), document.onselectstart = OpenLayers.Function.False, c = !this.stopDown) : (this.started = !1, this.last = this.start = null);
			return c
		},
		dragmove : function (b) {
			this.lastMoveEvt = b;
			if (this.started && !this.timeoutId && (b.xy.x != this.last.x || b.xy.y != this.last.y)) {
				!0 === this.documentDrag && this.documentEvents && (b.element === document ? (this.adjustXY(b), this.setEvent(b)) : this.removeDocumentEvents()),
				0 < this.interval && (this.timeoutId = setTimeout(OpenLayers.Function.bind(this.removeTimeout, this), this.interval)),
				this.dragging = !0,
				this.move(b),
				this.callback("move", [b.xy]),
				this.oldOnselectstart || (this.oldOnselectstart = document.onselectstart, document.onselectstart = OpenLayers.Function.False),
				this.last = b.xy
			}
			return !0
		},
		dragend : function (d) {
			if (this.started) {
				!0 === this.documentDrag && this.documentEvents && (this.adjustXY(d), this.removeDocumentEvents());
				var c = this.start != this.last;
				this.dragging = this.started = !1;
				OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
				this.up(d);
				this.callback("up", [d.xy]);
				c && this.callback("done", [d.xy]);
				document.onselectstart = this.oldOnselectstart
			}
			return !0
		},
		down : function () {},
		move : function () {},
		up : function () {},
		out : function () {},
		mousedown : function (b) {
			return this.dragstart(b)
		},
		touchstart : function (b) {
			this.touch || (this.touch = !0, this.map.events.un({
					mousedown : this.mousedown,
					mouseup : this.mouseup,
					mousemove : this.mousemove,
					click : this.click,
					scope : this
				}));
			return this.dragstart(b)
		},
		mousemove : function (b) {
			return this.dragmove(b)
		},
		touchmove : function (b) {
			return this.dragmove(b)
		},
		removeTimeout : function () {
			this.timeoutId = null;
			this.dragging && this.mousemove(this.lastMoveEvt)
		},
		mouseup : function (b) {
			return this.dragend(b)
		},
		touchend : function (b) {
			b.xy = this.last;
			return this.dragend(b)
		},
		mouseout : function (d) {
			if (this.started && OpenLayers.Util.mouseLeft(d, this.map.viewPortDiv)) {
				if (!0 === this.documentDrag) {
					this.addDocumentEvents()
				} else {
					var c = this.start != this.last;
					this.dragging = this.started = !1;
					OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
					this.out(d);
					this.callback("out", []);
					c && this.callback("done", [d.xy]);
					document.onselectstart && (document.onselectstart = this.oldOnselectstart)
				}
			}
			return !0
		},
		click : function () {
			return this.start == this.last
		},
		activate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.dragging = !1, b = !0);
			return b
		},
		deactivate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.dragging = this.started = this.touch = !1, this.last = this.start = null, b = !0, OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown"));
			return b
		},
		adjustXY : function (d) {
			var c = OpenLayers.Util.pagePosition(this.map.viewPortDiv);
			d.xy.x -= c[0];
			d.xy.y -= c[1]
		},
		addDocumentEvents : function () {
			OpenLayers.Element.addClass(document.body, "olDragDown");
			this.documentEvents = !0;
			OpenLayers.Event.observe(document, "mousemove", this._docMove);
			OpenLayers.Event.observe(document, "mouseup", this._docUp)
		},
		removeDocumentEvents : function () {
			OpenLayers.Element.removeClass(document.body, "olDragDown");
			this.documentEvents = !1;
			OpenLayers.Event.stopObserving(document, "mousemove", this._docMove);
			OpenLayers.Event.stopObserving(document, "mouseup", this._docUp)
		},
		CLASS_NAME : "OpenLayers.Handler.Drag"
	});
OpenLayers.Handler.Feature = OpenLayers.Class(OpenLayers.Handler, {
		EVENTMAP : {
			click : {
				"in" : "click",
				out : "clickout"
			},
			mousemove : {
				"in" : "over",
				out : "out"
			},
			dblclick : {
				"in" : "dblclick",
				out : null
			},
			mousedown : {
				"in" : null,
				out : null
			},
			mouseup : {
				"in" : null,
				out : null
			},
			touchstart : {
				"in" : "click",
				out : "clickout"
			}
		},
		feature : null,
		lastFeature : null,
		down : null,
		up : null,
		touch : !1,
		clickTolerance : 4,
		geometryTypes : null,
		stopClick : !0,
		stopDown : !0,
		stopUp : !1,
		initialize : function (h, g, f, e) {
			OpenLayers.Handler.prototype.initialize.apply(this, [h, f, e]);
			this.layer = g
		},
		touchstart : function (b) {
			this.touch || (this.touch = !0, this.map.events.un({
					mousedown : this.mousedown,
					mouseup : this.mouseup,
					mousemove : this.mousemove,
					click : this.click,
					dblclick : this.dblclick,
					scope : this
				}));
			return OpenLayers.Event.isMultiTouch(b) ? !0 : this.mousedown(b)
		},
		touchmove : function (b) {
			OpenLayers.Event.stop(b)
		},
		mousedown : function (b) {
			if (OpenLayers.Event.isLeftClick(b) || OpenLayers.Event.isSingleTouch(b)) {
				this.down = b.xy
			}
			return this.handle(b) ? !this.stopDown : !0
		},
		mouseup : function (b) {
			this.up = b.xy;
			return this.handle(b) ? !this.stopUp : !0
		},
		click : function (b) {
			return this.handle(b) ? !this.stopClick : !0
		},
		mousemove : function (b) {
			if (!this.callbacks.over && !this.callbacks.out) {
				return !0
			}
			this.handle(b);
			return !0
		},
		dblclick : function (b) {
			return !this.handle(b)
		},
		geometryTypeMatches : function (b) {
			return null == this.geometryTypes || -1 < OpenLayers.Util.indexOf(this.geometryTypes, b.geometry.CLASS_NAME)
		},
		handle : function (i) {
			this.feature && !this.feature.layer && (this.feature = null);
			var h = i.type,
			g = !1,
			f = !!this.feature,
			j = "click" == h || "dblclick" == h || "touchstart" == h;
			if ((this.feature = this.layer.getFeatureFromEvent(i)) && !this.feature.layer) {
				this.feature = null
			}
			this.lastFeature && !this.lastFeature.layer && (this.lastFeature = null);
			this.feature ? ("touchstart" === h && OpenLayers.Event.stop(i), i = this.feature != this.lastFeature, this.geometryTypeMatches(this.feature) ? (f && i ? (this.lastFeature && this.triggerCallback(h, "out", [this.lastFeature]), this.triggerCallback(h, "in", [this.feature])) : (!f || j) && this.triggerCallback(h, "in", [this.feature]), this.lastFeature = this.feature, g = !0) : (this.lastFeature && (f && i || j) && this.triggerCallback(h, "out", [this.lastFeature]), this.feature = null)) : this.lastFeature && (f || j) && this.triggerCallback(h, "out", [this.lastFeature]);
			return g
		},
		triggerCallback : function (d, f, e) {
			(f = this.EVENTMAP[d][f]) && ("click" == d && this.up && this.down ? Math.sqrt(Math.pow(this.up.x - this.down.x, 2) + Math.pow(this.up.y - this.down.y, 2)) <= this.clickTolerance && this.callback(f, e) : this.callback(f, e))
		},
		activate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.moveLayerToTop(), this.map.events.on({
					removelayer : this.handleMapEvents,
					changelayer : this.handleMapEvents,
					scope : this
				}), b = !0);
			return b
		},
		deactivate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.moveLayerBack(), this.up = this.down = this.lastFeature = this.feature = null, this.touch = !1, this.map.events.un({
					removelayer : this.handleMapEvents,
					changelayer : this.handleMapEvents,
					scope : this
				}), b = !0);
			return b
		},
		handleMapEvents : function (b) {
			("removelayer" == b.type || "order" == b.property) && this.moveLayerToTop()
		},
		moveLayerToTop : function () {
			var b = Math.max(this.map.Z_INDEX_BASE.Feature - 1, this.layer.getZIndex()) + 1;
			this.layer.setZIndex(b)
		},
		moveLayerBack : function () {
			var b = this.layer.getZIndex() - 1;
			b >= this.map.Z_INDEX_BASE.Feature ? this.layer.setZIndex(b) : this.map.setLayerZIndex(this.layer, this.map.getLayerIndex(this.layer))
		},
		CLASS_NAME : "OpenLayers.Handler.Feature"
	});
OpenLayers.Control.DragFeature = OpenLayers.Class(OpenLayers.Control, {
		geometryTypes : null,
		onStart : function () {},
		onDrag : function () {},
		onComplete : function () {},
		onEnter : function () {},
		onLeave : function () {},
		documentDrag : !1,
		layer : null,
		feature : null,
		dragCallbacks : {},
		featureCallbacks : {},
		lastPixel : null,
		initialize : function (d, c) {
			OpenLayers.Control.prototype.initialize.apply(this, [c]);
			this.layer = d;
			this.handlers = {
				drag : new OpenLayers.Handler.Drag(this, OpenLayers.Util.extend({
						down : this.downFeature,
						move : this.moveFeature,
						up : this.upFeature,
						out : this.cancel,
						done : this.doneDragging
					}, this.dragCallbacks), {
					documentDrag : this.documentDrag
				}),
				feature : new OpenLayers.Handler.Feature(this, this.layer, OpenLayers.Util.extend({
						click : this.clickFeature,
						clickout : this.clickoutFeature,
						over : this.overFeature,
						out : this.outFeature
					}, this.featureCallbacks), {
					geometryTypes : this.geometryTypes
				})
			}
		},
		clickFeature : function (b) {
			this.handlers.feature.touch && (!this.over && this.overFeature(b)) && (this.handlers.drag.dragstart(this.handlers.feature.evt), this.handlers.drag.stopDown = !1)
		},
		clickoutFeature : function (b) {
			this.handlers.feature.touch && this.over && (this.outFeature(b), this.handlers.drag.stopDown = !0)
		},
		destroy : function () {
			this.layer = null;
			OpenLayers.Control.prototype.destroy.apply(this, [])
		},
		activate : function () {
			return this.handlers.feature.activate() && OpenLayers.Control.prototype.activate.apply(this, arguments)
		},
		deactivate : function () {
			this.handlers.drag.deactivate();
			this.handlers.feature.deactivate();
			this.feature = null;
			this.dragging = !1;
			this.lastPixel = null;
			OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass + "Over");
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
		},
		overFeature : function (d) {
			var c = !1;
			this.handlers.drag.dragging ? this.over = this.feature.id == d.id ? !0 : !1 : (this.feature = d, this.handlers.drag.activate(), this.over = c = !0, OpenLayers.Element.addClass(this.map.viewPortDiv, this.displayClass + "Over"), this.onEnter(d));
			return c
		},
		downFeature : function (b) {
			this.lastPixel = b;
			this.onStart(this.feature, b)
		},
		moveFeature : function (d) {
			var c = this.map.getResolution();
			this.feature.geometry.move(c * (d.x - this.lastPixel.x), c * (this.lastPixel.y - d.y));
			this.layer.drawFeature(this.feature);
			this.lastPixel = d;
			this.onDrag(this.feature, d)
		},
		upFeature : function () {
			this.over || this.handlers.drag.deactivate()
		},
		doneDragging : function (b) {
			this.onComplete(this.feature, b)
		},
		outFeature : function (b) {
			this.handlers.drag.dragging ? this.feature.id == b.id && (this.over = !1) : (this.over = !1, this.handlers.drag.deactivate(), OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass + "Over"), this.onLeave(b), this.feature = null)
		},
		cancel : function () {
			this.handlers.drag.deactivate();
			this.over = !1
		},
		setMap : function (b) {
			this.handlers.drag.setMap(b);
			this.handlers.feature.setMap(b);
			OpenLayers.Control.prototype.setMap.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Control.DragFeature"
	});
OpenLayers.StyleMap = OpenLayers.Class({
		styles : null,
		extendDefault : !0,
		initialize : function (d, f) {
			this.styles = {
				"default" : new OpenLayers.Style(OpenLayers.Feature.Vector.style["default"]),
				select : new OpenLayers.Style(OpenLayers.Feature.Vector.style.select),
				temporary : new OpenLayers.Style(OpenLayers.Feature.Vector.style.temporary),
				"delete" : new OpenLayers.Style(OpenLayers.Feature.Vector.style["delete"])
			};
			if (d instanceof OpenLayers.Style) {
				this.styles["default"] = d,
				this.styles.select = d,
				this.styles.temporary = d,
				this.styles["delete"] = d
			} else {
				if ("object" == typeof d) {
					for (var e in d) {
						if (d[e]instanceof OpenLayers.Style) {
							this.styles[e] = d[e]
						} else {
							if ("object" == typeof d[e]) {
								this.styles[e] = new OpenLayers.Style(d[e])
							} else {
								this.styles["default"] = new OpenLayers.Style(d);
								this.styles.select = new OpenLayers.Style(d);
								this.styles.temporary = new OpenLayers.Style(d);
								this.styles["delete"] = new OpenLayers.Style(d);
								break
							}
						}
					}
				}
			}
			OpenLayers.Util.extend(this, f)
		},
		destroy : function () {
			for (var b in this.styles) {
				this.styles[b].destroy()
			}
			this.styles = null
		},
		createSymbolizer : function (d, f) {
			d || (d = new OpenLayers.Feature.Vector);
			this.styles[f] || (f = "default");
			d.renderIntent = f;
			var e = {};
			this.extendDefault && "default" != f && (e = this.styles["default"].createSymbolizer(d));
			return OpenLayers.Util.extend(e, this.styles[f].createSymbolizer(d))
		},
		addUniqueValueRules : function (j, i, h, g) {
			var l = [],
			k;
			for (k in h) {
				l.push(new OpenLayers.Rule({
						symbolizer : h[k],
						context : g,
						filter : new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.EQUAL_TO,
							property : i,
							value : k
						})
					}))
			}
			this.styles[j].addRules(l)
		},
		CLASS_NAME : "OpenLayers.StyleMap"
	});
OpenLayers.Layer.Vector = OpenLayers.Class(OpenLayers.Layer, {
		isBaseLayer : !1,
		isFixed : !1,
		features : null,
		filter : null,
		selectedFeatures : null,
		unrenderedFeatures : null,
		reportError : !0,
		style : null,
		styleMap : null,
		strategies : null,
		protocol : null,
		renderers : ["SVG", "VML", "Canvas"],
		renderer : null,
		rendererOptions : null,
		geometryType : null,
		drawn : !1,
		ratio : 1,
		initialize : function (h, g) {
			OpenLayers.Layer.prototype.initialize.apply(this, arguments);
			(!this.renderer || !this.renderer.supported()) && this.assignRenderer();
			if (!this.renderer || !this.renderer.supported()) {
				this.renderer = null,
				this.displayError()
			}
			this.styleMap || (this.styleMap = new OpenLayers.StyleMap);
			this.features = [];
			this.selectedFeatures = [];
			this.unrenderedFeatures = {};
			if (this.strategies) {
				for (var f = 0, e = this.strategies.length; f < e; f++) {
					this.strategies[f].setLayer(this)
				}
			}
		},
		destroy : function () {
			if (this.strategies) {
				var d,
				f,
				e;
				f = 0;
				for (e = this.strategies.length; f < e; f++) {
					d = this.strategies[f],
					d.autoDestroy && d.destroy()
				}
				this.strategies = null
			}
			this.protocol && (this.protocol.autoDestroy && this.protocol.destroy(), this.protocol = null);
			this.destroyFeatures();
			this.unrenderedFeatures = this.selectedFeatures = this.features = null;
			this.renderer && this.renderer.destroy();
			this.drawn = this.geometryType = this.renderer = null;
			OpenLayers.Layer.prototype.destroy.apply(this, arguments)
		},
		clone : function (i) {
			null == i && (i = new OpenLayers.Layer.Vector(this.name, this.getOptions()));
			i = OpenLayers.Layer.prototype.clone.apply(this, [i]);
			for (var h = this.features, g = h.length, f = Array(g), j = 0; j < g; ++j) {
				f[j] = h[j].clone()
			}
			i.features = f;
			return i
		},
		refresh : function (b) {
			this.calculateInRange() && this.visibility && this.events.triggerEvent("refresh", b)
		},
		assignRenderer : function () {
			for (var d = 0, f = this.renderers.length; d < f; d++) {
				var e = this.renderers[d];
				if ((e = "function" == typeof e ? e : OpenLayers.Renderer[e]) && e.prototype.supported()) {
					this.renderer = new e(this.div, this.rendererOptions);
					break
				}
			}
		},
		displayError : function () {
			this.reportError && OpenLayers.Console.userError(OpenLayers.i18n("browserNotSupported", {
					renderers : this.renderers.join("\n")
				}))
		},
		setMap : function (d) {
			OpenLayers.Layer.prototype.setMap.apply(this, arguments);
			if (this.renderer) {
				this.renderer.map = this.map;
				var c = this.map.getSize();
				c.w *= this.ratio;
				c.h *= this.ratio;
				this.renderer.setSize(c)
			} else {
				this.map.removeLayer(this)
			}
		},
		afterAdd : function () {
			if (this.strategies) {
				var d,
				f,
				e;
				f = 0;
				for (e = this.strategies.length; f < e; f++) {
					d = this.strategies[f],
					d.autoActivate && d.activate()
				}
			}
		},
		removeMap : function () {
			this.drawn = !1;
			if (this.strategies) {
				var d,
				f,
				e;
				f = 0;
				for (e = this.strategies.length; f < e; f++) {
					d = this.strategies[f],
					d.autoActivate && d.deactivate()
				}
			}
		},
		onMapResize : function () {
			OpenLayers.Layer.prototype.onMapResize.apply(this, arguments);
			var b = this.map.getSize();
			b.w *= this.ratio;
			b.h *= this.ratio;
			this.renderer.setSize(b)
		},
		moveTo : function (j, i, h) {
			OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
			var g = !0;
			if (!h) {
				this.renderer.root.style.visibility = "hidden";
				var g = this.map.getSize(),
				l = g.w,
				g = g.h,
				l = l / 2 * this.ratio - l / 2,
				g = g / 2 * this.ratio - g / 2,
				l = l + parseInt(this.map.layerContainerDiv.style.left, 10),
				l = -Math.round(l),
				g = g + parseInt(this.map.layerContainerDiv.style.top, 10),
				g = -Math.round(g);
				this.div.style.left = l + "px";
				this.div.style.top = g + "px";
				l = this.map.getExtent().scale(this.ratio);
				g = this.renderer.setExtent(l, i);
				this.renderer.root.style.visibility = "visible";
				!0 === OpenLayers.IS_GECKO && (this.div.scrollLeft = this.div.scrollLeft);
				if (!i && g) {
					for (var k in this.unrenderedFeatures) {
						l = this.unrenderedFeatures[k],
						this.drawFeature(l)
					}
				}
			}
			if (!this.drawn || i || !g) {
				this.drawn = !0;
				k = 0;
				for (g = this.features.length; k < g; k++) {
					this.renderer.locked = k !== g - 1,
					l = this.features[k],
					this.drawFeature(l)
				}
			}
		},
		display : function (d) {
			OpenLayers.Layer.prototype.display.apply(this, arguments);
			var c = this.div.style.display;
			c != this.renderer.root.style.display && (this.renderer.root.style.display = c)
		},
		addFeatures : function (l, k) {
			OpenLayers.Util.isArray(l) || (l = [l]);
			var j = !k || !k.silent;
			if (j) {
				var i = {
					features : l
				};
				if (!1 === this.events.triggerEvent("beforefeaturesadded", i)) {
					return
				}
				l = i.features
			}
			for (var i = [], h = 0, n = l.length; h < n; h++) {
				this.renderer.locked = h != l.length - 1 ? !0 : !1;
				var m = l[h];
				if (this.geometryType && !(m.geometry instanceof this.geometryType)) {
					throw new TypeError("addFeatures: component should be an " + this.geometryType.prototype.CLASS_NAME)
				}
				m.layer = this;
				!m.style && this.style && (m.style = OpenLayers.Util.extend({}, this.style));
				if (j) {
					if (!1 === this.events.triggerEvent("beforefeatureadded", {
							feature : m
						})) {
						continue
					}
					this.preFeatureInsert(m)
				}
				i.push(m);
				this.features.push(m);
				this.drawFeature(m);
				j && (this.events.triggerEvent("featureadded", {
						feature : m
					}), this.onFeatureInsert(m))
			}
			j && this.events.triggerEvent("featuresadded", {
				features : i
			})
		},
		removeFeatures : function (i, h) {
			if (i && 0 !== i.length) {
				if (i === this.features) {
					return this.removeAllFeatures(h)
				}
				OpenLayers.Util.isArray(i) || (i = [i]);
				i === this.selectedFeatures && (i = i.slice());
				var g = !h || !h.silent;
				g && this.events.triggerEvent("beforefeaturesremoved", {
					features : i
				});
				for (var f = i.length - 1; 0 <= f; f--) {
					this.renderer.locked = 0 != f && i[f - 1].geometry ? !0 : !1;
					var j = i[f];
					delete this.unrenderedFeatures[j.id];
					g && this.events.triggerEvent("beforefeatureremoved", {
						feature : j
					});
					this.features = OpenLayers.Util.removeItem(this.features, j);
					j.layer = null;
					j.geometry && this.renderer.eraseFeatures(j);
					-1 != OpenLayers.Util.indexOf(this.selectedFeatures, j) && OpenLayers.Util.removeItem(this.selectedFeatures, j);
					g && this.events.triggerEvent("featureremoved", {
						feature : j
					})
				}
				g && this.events.triggerEvent("featuresremoved", {
					features : i
				})
			}
		},
		removeAllFeatures : function (h) {
			h = !h || !h.silent;
			var g = this.features;
			h && this.events.triggerEvent("beforefeaturesremoved", {
				features : g
			});
			for (var f, e = g.length - 1; 0 <= e; e--) {
				f = g[e],
				h && this.events.triggerEvent("beforefeatureremoved", {
					feature : f
				}),
				f.layer = null,
				h && this.events.triggerEvent("featureremoved", {
					feature : f
				})
			}
			this.renderer.clear();
			this.features = [];
			this.unrenderedFeatures = {};
			this.selectedFeatures = [];
			h && this.events.triggerEvent("featuresremoved", {
				features : g
			})
		},
		destroyFeatures : function (d, f) {
			void 0 == d && (d = this.features);
			if (d) {
				this.removeFeatures(d, f);
				for (var e = d.length - 1; 0 <= e; e--) {
					d[e].destroy()
				}
			}
		},
		drawFeature : function (d, f) {
			if (this.drawn) {
				if ("object" != typeof f) {
					!f && d.state === OpenLayers.State.DELETE && (f = "delete");
					var e = f || d.renderIntent;
					(f = d.style || this.style) || (f = this.styleMap.createSymbolizer(d, e))
				}
				e = this.renderer.drawFeature(d, f);
				!1 === e || null === e ? this.unrenderedFeatures[d.id] = d : delete this.unrenderedFeatures[d.id]
			}
		},
		eraseFeatures : function (b) {
			this.renderer.eraseFeatures(b)
		},
		getFeatureFromEvent : function (d) {
			if (!this.renderer) {
				throw Error("getFeatureFromEvent called on layer with no renderer. This usually means you destroyed a layer, but not some handler which is associated with it.")
			}
			var c = null;
			(d = this.renderer.getFeatureIdFromEvent(d)) && (c = "string" === typeof d ? this.getFeatureById(d) : d);
			return c
		},
		getFeatureBy : function (i, h) {
			for (var g = null, f = 0, j = this.features.length; f < j; ++f) {
				if (this.features[f][i] == h) {
					g = this.features[f];
					break
				}
			}
			return g
		},
		getFeatureById : function (b) {
			return this.getFeatureBy("id", b)
		},
		getFeatureByFid : function (b) {
			return this.getFeatureBy("fid", b)
		},
		getFeaturesByAttribute : function (j, i) {
			var h,
			g,
			l = this.features.length,
			k = [];
			for (h = 0; h < l; h++) {
				(g = this.features[h]) && g.attributes && g.attributes[j] === i && k.push(g)
			}
			return k
		},
		onFeatureInsert : function () {},
		preFeatureInsert : function () {},
		getDataExtent : function () {
			var i = null,
			h = this.features;
			if (h && 0 < h.length) {
				for (var g = null, f = 0, j = h.length; f < j; f++) {
					if (g = h[f].geometry) {
						null === i && (i = new OpenLayers.Bounds),
						i.extend(g.getBounds())
					}
				}
			}
			return i
		},
		CLASS_NAME : "OpenLayers.Layer.Vector"
	});
OpenLayers.Layer.Vector.RootContainer = OpenLayers.Class(OpenLayers.Layer.Vector, {
		displayInLayerSwitcher : !1,
		layers : null,
		display : function () {},
		getFeatureFromEvent : function (h) {
			for (var g = this.layers, f, e = 0; e < g.length; e++) {
				if (f = g[e].getFeatureFromEvent(h)) {
					return f
				}
			}
		},
		setMap : function (b) {
			OpenLayers.Layer.Vector.prototype.setMap.apply(this, arguments);
			this.collectRoots();
			b.events.register("changelayer", this, this.handleChangeLayer)
		},
		removeMap : function (b) {
			b.events.unregister("changelayer", this, this.handleChangeLayer);
			this.resetRoots();
			OpenLayers.Layer.Vector.prototype.removeMap.apply(this, arguments)
		},
		collectRoots : function () {
			for (var d, c = 0; c < this.map.layers.length; ++c) {
				d = this.map.layers[c],
				-1 != OpenLayers.Util.indexOf(this.layers, d) && d.renderer.moveRoot(this.renderer)
			}
		},
		resetRoots : function () {
			for (var d, c = 0; c < this.layers.length; ++c) {
				d = this.layers[c],
				this.renderer && d.renderer.getRenderLayerId() == this.id && this.renderer.moveRoot(d.renderer)
			}
		},
		handleChangeLayer : function (d) {
			var c = d.layer;
			"order" == d.property && -1 != OpenLayers.Util.indexOf(this.layers, c) && (this.resetRoots(), this.collectRoots())
		},
		CLASS_NAME : "OpenLayers.Layer.Vector.RootContainer"
	});
OpenLayers.Control.SelectFeature = OpenLayers.Class(OpenLayers.Control, {
		multipleKey : null,
		toggleKey : null,
		multiple : !1,
		clickout : !0,
		toggle : !1,
		hover : !1,
		highlightOnly : !1,
		box : !1,
		onBeforeSelect : function () {},
		onSelect : function () {},
		onUnselect : function () {},
		scope : null,
		geometryTypes : null,
		layer : null,
		layers : null,
		callbacks : null,
		selectStyle : null,
		renderIntent : "select",
		handlers : null,
		initialize : function (d, f) {
			OpenLayers.Control.prototype.initialize.apply(this, [f]);
			null === this.scope && (this.scope = this);
			this.initLayer(d);
			var e = {
				click : this.clickFeature,
				clickout : this.clickoutFeature
			};
			this.hover && (e.over = this.overFeature, e.out = this.outFeature);
			this.callbacks = OpenLayers.Util.extend(e, this.callbacks);
			this.handlers = {
				feature : new OpenLayers.Handler.Feature(this, this.layer, this.callbacks, {
					geometryTypes : this.geometryTypes
				})
			};
			this.box && (this.handlers.box = new OpenLayers.Handler.Box(this, {
						done : this.selectBox
					}, {
						boxDivClassName : "olHandlerBoxSelectFeature"
					}))
		},
		initLayer : function (b) {
			OpenLayers.Util.isArray(b) ? (this.layers = b, this.layer = new OpenLayers.Layer.Vector.RootContainer(this.id + "_container", {
						layers : b
					})) : this.layer = b
		},
		destroy : function () {
			this.active && this.layers && this.map.removeLayer(this.layer);
			OpenLayers.Control.prototype.destroy.apply(this, arguments);
			this.layers && this.layer.destroy()
		},
		activate : function () {
			this.active || (this.layers && this.map.addLayer(this.layer), this.handlers.feature.activate(), this.box && this.handlers.box && this.handlers.box.activate());
			return OpenLayers.Control.prototype.activate.apply(this, arguments)
		},
		deactivate : function () {
			this.active && (this.handlers.feature.deactivate(), this.handlers.box && this.handlers.box.deactivate(), this.layers && this.map.removeLayer(this.layer));
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
		},
		unselectAll : function (j) {
			for (var i = this.layers || [this.layer], h, g, l = 0; l < i.length; ++l) {
				h = i[l];
				for (var k = h.selectedFeatures.length - 1; 0 <= k; --k) {
					g = h.selectedFeatures[k],
					(!j || j.except != g) && this.unselect(g)
				}
			}
		},
		clickFeature : function (b) {
			this.hover || (-1 < OpenLayers.Util.indexOf(b.layer.selectedFeatures, b) ? this.toggleSelect() ? this.unselect(b) : this.multipleSelect() || this.unselectAll({
					except : b
				}) : (this.multipleSelect() || this.unselectAll({
						except : b
					}), this.select(b)))
		},
		multipleSelect : function () {
			return this.multiple || this.handlers.feature.evt && this.handlers.feature.evt[this.multipleKey]
		},
		toggleSelect : function () {
			return this.toggle || this.handlers.feature.evt && this.handlers.feature.evt[this.toggleKey]
		},
		clickoutFeature : function () {
			!this.hover && this.clickout && this.unselectAll()
		},
		overFeature : function (d) {
			var c = d.layer;
			this.hover && (this.highlightOnly ? this.highlight(d) : -1 == OpenLayers.Util.indexOf(c.selectedFeatures, d) && this.select(d))
		},
		outFeature : function (d) {
			if (this.hover) {
				if (this.highlightOnly) {
					if (d._lastHighlighter == this.id) {
						if (d._prevHighlighter && d._prevHighlighter != this.id) {
							delete d._lastHighlighter;
							var c = this.map.getControl(d._prevHighlighter);
							c && c.highlight(d)
						} else {
							this.unhighlight(d)
						}
					}
				} else {
					this.unselect(d)
				}
			}
		},
		highlight : function (d) {
			var c = d.layer;
			!1 !== this.events.triggerEvent("beforefeaturehighlighted", {
				feature : d
			}) && (d._prevHighlighter = d._lastHighlighter, d._lastHighlighter = this.id, c.drawFeature(d, this.selectStyle || this.renderIntent), this.events.triggerEvent("featurehighlighted", {
					feature : d
				}))
		},
		unhighlight : function (d) {
			var c = d.layer;
			void 0 == d._prevHighlighter ? delete d._lastHighlighter : (d._prevHighlighter != this.id && (d._lastHighlighter = d._prevHighlighter), delete d._prevHighlighter);
			c.drawFeature(d, d.style || d.layer.style || "default");
			this.events.triggerEvent("featureunhighlighted", {
				feature : d
			})
		},
		select : function (d) {
			var f = this.onBeforeSelect.call(this.scope, d),
			e = d.layer;
			!1 !== f && (f = e.events.triggerEvent("beforefeatureselected", {
						feature : d
					}), !1 !== f && (e.selectedFeatures.push(d), this.highlight(d), this.handlers.feature.lastFeature || (this.handlers.feature.lastFeature = e.selectedFeatures[0]), e.events.triggerEvent("featureselected", {
						feature : d
					}), this.onSelect.call(this.scope, d)))
		},
		unselect : function (d) {
			var c = d.layer;
			this.unhighlight(d);
			OpenLayers.Util.removeItem(c.selectedFeatures, d);
			c.events.triggerEvent("featureunselected", {
				feature : d
			});
			this.onUnselect.call(this.scope, d)
		},
		selectBox : function (o) {
			if (o instanceof OpenLayers.Bounds) {
				var n = this.map.getLonLatFromPixel({
						x : o.left,
						y : o.bottom
					});
				o = this.map.getLonLatFromPixel({
						x : o.right,
						y : o.top
					});
				n = new OpenLayers.Bounds(n.lon, n.lat, o.lon, o.lat);
				this.multipleSelect() || this.unselectAll();
				o = this.multiple;
				this.multiple = !0;
				var m = this.layers || [this.layer];
				this.events.triggerEvent("boxselectionstart", {
					layers : m
				});
				for (var l, k = 0; k < m.length; ++k) {
					l = m[k];
					for (var j = 0, i = l.features.length; j < i; ++j) {
						var p = l.features[j];
						p.getVisibility() && (null == this.geometryTypes || -1 < OpenLayers.Util.indexOf(this.geometryTypes, p.geometry.CLASS_NAME)) && n.toGeometry().intersects(p.geometry) && -1 == OpenLayers.Util.indexOf(l.selectedFeatures, p) && this.select(p)
					}
				}
				this.multiple = o;
				this.events.triggerEvent("boxselectionend", {
					layers : m
				})
			}
		},
		setMap : function (b) {
			this.handlers.feature.setMap(b);
			this.box && this.handlers.box.setMap(b);
			OpenLayers.Control.prototype.setMap.apply(this, arguments)
		},
		setLayer : function (d) {
			var c = this.active;
			this.unselectAll();
			this.deactivate();
			this.layers && (this.layer.destroy(), this.layers = null);
			this.initLayer(d);
			this.handlers.feature.layer = this.layer;
			c && this.activate()
		},
		CLASS_NAME : "OpenLayers.Control.SelectFeature"
	});
OpenLayers.Handler.Keyboard = OpenLayers.Class(OpenLayers.Handler, {
		KEY_EVENTS : ["keydown", "keyup"],
		eventListener : null,
		observeElement : null,
		initialize : function (d, f, e) {
			OpenLayers.Handler.prototype.initialize.apply(this, arguments);
			this.eventListener = OpenLayers.Function.bindAsEventListener(this.handleKeyEvent, this)
		},
		destroy : function () {
			this.deactivate();
			this.eventListener = null;
			OpenLayers.Handler.prototype.destroy.apply(this, arguments)
		},
		activate : function () {
			if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
				this.observeElement = this.observeElement || document;
				for (var d = 0, c = this.KEY_EVENTS.length; d < c; d++) {
					OpenLayers.Event.observe(this.observeElement, this.KEY_EVENTS[d], this.eventListener)
				}
				return !0
			}
			return !1
		},
		deactivate : function () {
			var d = !1;
			if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
				for (var d = 0, c = this.KEY_EVENTS.length; d < c; d++) {
					OpenLayers.Event.stopObserving(this.observeElement, this.KEY_EVENTS[d], this.eventListener)
				}
				d = !0
			}
			return d
		},
		handleKeyEvent : function (b) {
			this.checkModifiers(b) && this.callback(b.type, [b])
		},
		CLASS_NAME : "OpenLayers.Handler.Keyboard"
	});
OpenLayers.Control.ModifyFeature = OpenLayers.Class(OpenLayers.Control, {
		geometryTypes : null,
		clickout : !0,
		toggle : !0,
		standalone : !1,
		layer : null,
		feature : null,
		vertices : null,
		virtualVertices : null,
		selectControl : null,
		dragControl : null,
		handlers : null,
		deleteCodes : null,
		virtualStyle : null,
		vertexRenderIntent : null,
		mode : null,
		createVertices : !0,
		modified : !1,
		radiusHandle : null,
		dragHandle : null,
		onModificationStart : function () {},
		onModification : function () {},
		onModificationEnd : function () {},
		initialize : function (h, g) {
			g = g || {};
			this.layer = h;
			this.vertices = [];
			this.virtualVertices = [];
			this.virtualStyle = OpenLayers.Util.extend({}, this.layer.style || this.layer.styleMap.createSymbolizer(null, g.vertexRenderIntent));
			this.virtualStyle.fillOpacity = 0.3;
			this.virtualStyle.strokeOpacity = 0.3;
			this.deleteCodes = [46, 68];
			this.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
			OpenLayers.Control.prototype.initialize.apply(this, [g]);
			OpenLayers.Util.isArray(this.deleteCodes) || (this.deleteCodes = [this.deleteCodes]);
			var f = this,
			e = {
				geometryTypes : this.geometryTypes,
				clickout : this.clickout,
				toggle : this.toggle,
				onBeforeSelect : this.beforeSelectFeature,
				onSelect : this.selectFeature,
				onUnselect : this.unselectFeature,
				scope : this
			};
			!1 === this.standalone && (this.selectControl = new OpenLayers.Control.SelectFeature(h, e));
			this.dragControl = new OpenLayers.Control.DragFeature(h, {
					geometryTypes : ["OpenLayers.Geometry.Point"],
					onStart : function (b, a) {
						f.dragStart.apply(f, [b, a])
					},
					onDrag : function (b, a) {
						f.dragVertex.apply(f, [b, a])
					},
					onComplete : function (a) {
						f.dragComplete.apply(f, [a])
					},
					featureCallbacks : {
						over : function (a) {
							(!0 !== f.standalone || a._sketch || f.feature === a) && f.dragControl.overFeature.apply(f.dragControl, [a])
						}
					}
				});
			this.handlers = {
				keyboard : new OpenLayers.Handler.Keyboard(this, {
					keydown : this.handleKeypress
				})
			}
		},
		destroy : function () {
			this.layer = null;
			this.standalone || this.selectControl.destroy();
			this.dragControl.destroy();
			OpenLayers.Control.prototype.destroy.apply(this, [])
		},
		activate : function () {
			return (this.standalone || this.selectControl.activate()) && this.handlers.keyboard.activate() && OpenLayers.Control.prototype.activate.apply(this, arguments)
		},
		deactivate : function () {
			var d = !1;
			if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
				this.layer.removeFeatures(this.vertices, {
					silent : !0
				});
				this.layer.removeFeatures(this.virtualVertices, {
					silent : !0
				});
				this.vertices = [];
				this.dragControl.deactivate();
				var c = (d = this.feature) && d.geometry && d.layer;
				!1 === this.standalone ? (c && this.selectControl.unselect.apply(this.selectControl, [d]), this.selectControl.deactivate()) : c && this.unselectFeature(d);
				this.handlers.keyboard.deactivate();
				d = !0
			}
			return d
		},
		beforeSelectFeature : function (b) {
			return this.layer.events.triggerEvent("beforefeaturemodified", {
				feature : b
			})
		},
		selectFeature : function (d) {
			if (!this.standalone || !1 !== this.beforeSelectFeature(d)) {
				this.feature = d,
				this.modified = !1,
				this.resetVertices(),
				this.dragControl.activate(),
				this.onModificationStart(this.feature)
			}
			var c = d.modified;
			if (d.geometry && (!c || !c.geometry)) {
				this._originalGeometry = d.geometry.clone()
			}
		},
		unselectFeature : function (b) {
			this.layer.removeFeatures(this.vertices, {
				silent : !0
			});
			this.vertices = [];
			this.layer.destroyFeatures(this.virtualVertices, {
				silent : !0
			});
			this.virtualVertices = [];
			this.dragHandle && (this.layer.destroyFeatures([this.dragHandle], {
					silent : !0
				}), delete this.dragHandle);
			this.radiusHandle && (this.layer.destroyFeatures([this.radiusHandle], {
					silent : !0
				}), delete this.radiusHandle);
			this.feature = null;
			this.dragControl.deactivate();
			this.onModificationEnd(b);
			this.layer.events.triggerEvent("afterfeaturemodified", {
				feature : b,
				modified : this.modified
			});
			this.modified = !1
		},
		dragStart : function (d, c) {
			if (d != this.feature && (!d.geometry.parent && d != this.dragHandle && d != this.radiusHandle) && (!1 === this.standalone && this.feature && this.selectControl.clickFeature.apply(this.selectControl, [this.feature]), null == this.geometryTypes || -1 != OpenLayers.Util.indexOf(this.geometryTypes, d.geometry.CLASS_NAME))) {
				this.standalone || this.selectControl.clickFeature.apply(this.selectControl, [d]),
				this.dragControl.overFeature.apply(this.dragControl, [d]),
				this.dragControl.lastPixel = c,
				this.dragControl.handlers.drag.started = !0,
				this.dragControl.handlers.drag.start = c,
				this.dragControl.handlers.drag.last = c
			}
		},
		dragVertex : function (d, c) {
			this.modified = !0;
			"OpenLayers.Geometry.Point" == this.feature.geometry.CLASS_NAME ? (this.feature != d && (this.feature = d), this.layer.events.triggerEvent("vertexmodified", {
					vertex : d.geometry,
					feature : this.feature,
					pixel : c
				})) : (d._index ? (d.geometry.parent.addComponent(d.geometry, d._index), delete d._index, OpenLayers.Util.removeItem(this.virtualVertices, d), this.vertices.push(d)) : d == this.dragHandle ? (this.layer.removeFeatures(this.vertices, {
						silent : !0
					}), this.vertices = [], this.radiusHandle && (this.layer.destroyFeatures([this.radiusHandle], {
							silent : !0
						}), this.radiusHandle = null)) : d !== this.radiusHandle && this.layer.events.triggerEvent("vertexmodified", {
					vertex : d.geometry,
					feature : this.feature,
					pixel : c
				}), 0 < this.virtualVertices.length && (this.layer.destroyFeatures(this.virtualVertices, {
						silent : !0
					}), this.virtualVertices = []), this.layer.drawFeature(this.feature, this.standalone ? void 0 : this.selectControl.renderIntent));
			this.layer.drawFeature(d)
		},
		dragComplete : function () {
			this.resetVertices();
			this.setFeatureState();
			this.onModification(this.feature);
			this.layer.events.triggerEvent("featuremodified", {
				feature : this.feature
			})
		},
		setFeatureState : function () {
			if (this.feature.state != OpenLayers.State.INSERT && this.feature.state != OpenLayers.State.DELETE && (this.feature.state = OpenLayers.State.UPDATE, this.modified && this._originalGeometry)) {
				var b = this.feature;
				b.modified = OpenLayers.Util.extend(b.modified, {
						geometry : this._originalGeometry
					});
				delete this._originalGeometry
			}
		},
		resetVertices : function () {
			this.dragControl.feature && this.dragControl.outFeature(this.dragControl.feature);
			0 < this.vertices.length && (this.layer.removeFeatures(this.vertices, {
					silent : !0
				}), this.vertices = []);
			0 < this.virtualVertices.length && (this.layer.removeFeatures(this.virtualVertices, {
					silent : !0
				}), this.virtualVertices = []);
			this.dragHandle && (this.layer.destroyFeatures([this.dragHandle], {
					silent : !0
				}), this.dragHandle = null);
			this.radiusHandle && (this.layer.destroyFeatures([this.radiusHandle], {
					silent : !0
				}), this.radiusHandle = null);
			this.feature && "OpenLayers.Geometry.Point" != this.feature.geometry.CLASS_NAME && (this.mode & OpenLayers.Control.ModifyFeature.DRAG && this.collectDragHandle(), this.mode & (OpenLayers.Control.ModifyFeature.ROTATE | OpenLayers.Control.ModifyFeature.RESIZE) && this.collectRadiusHandle(), this.mode & OpenLayers.Control.ModifyFeature.RESHAPE && (this.mode & OpenLayers.Control.ModifyFeature.RESIZE || this.collectVertices()))
		},
		handleKeypress : function (d) {
			var c = d.keyCode;
			if (this.feature && -1 != OpenLayers.Util.indexOf(this.deleteCodes, c) && (c = this.dragControl.feature) && -1 != OpenLayers.Util.indexOf(this.vertices, c) && !this.dragControl.handlers.drag.dragging && c.geometry.parent) {
				c.geometry.parent.removeComponent(c.geometry),
				this.layer.events.triggerEvent("vertexremoved", {
					vertex : c.geometry,
					feature : this.feature,
					pixel : d.xy
				}),
				this.layer.drawFeature(this.feature, this.standalone ? void 0 : this.selectControl.renderIntent),
				this.modified = !0,
				this.resetVertices(),
				this.setFeatureState(),
				this.onModification(this.feature),
				this.layer.events.triggerEvent("featuremodified", {
					feature : this.feature
				})
			}
		},
		collectVertices : function () {
			function d(h) {
				var b,
				a,
				j;
				if ("OpenLayers.Geometry.Point" == h.CLASS_NAME) {
					a = new OpenLayers.Feature.Vector(h),
					a._sketch = !0,
					a.renderIntent = c.vertexRenderIntent,
					c.vertices.push(a)
				} else {
					j = h.components.length;
					"OpenLayers.Geometry.LinearRing" == h.CLASS_NAME && (j -= 1);
					for (b = 0; b < j; ++b) {
						a = h.components[b],
						"OpenLayers.Geometry.Point" == a.CLASS_NAME ? (a = new OpenLayers.Feature.Vector(a), a._sketch = !0, a.renderIntent = c.vertexRenderIntent, c.vertices.push(a)) : d(a)
					}
					if (c.createVertices && "OpenLayers.Geometry.MultiPoint" != h.CLASS_NAME) {
						b = 0;
						for (j = h.components.length; b < j - 1; ++b) {
							a = h.components[b];
							var i = h.components[b + 1];
							"OpenLayers.Geometry.Point" == a.CLASS_NAME && "OpenLayers.Geometry.Point" == i.CLASS_NAME && (a = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point((a.x + i.x) / 2, (a.y + i.y) / 2), null, c.virtualStyle), a.geometry.parent = h, a._index = b + 1, a._sketch = !0, c.virtualVertices.push(a))
						}
					}
				}
			}
			this.vertices = [];
			this.virtualVertices = [];
			var c = this;
			d.call(this, this.feature.geometry);
			this.layer.addFeatures(this.virtualVertices, {
				silent : !0
			});
			this.layer.addFeatures(this.vertices, {
				silent : !0
			})
		},
		collectDragHandle : function () {
			var d = this.feature.geometry,
			f = d.getBounds().getCenterLonLat(),
			f = new OpenLayers.Geometry.Point(f.lon, f.lat),
			e = new OpenLayers.Feature.Vector(f);
			f.move = function (b, a) {
				OpenLayers.Geometry.Point.prototype.move.call(this, b, a);
				d.move(b, a)
			};
			e._sketch = !0;
			this.dragHandle = e;
			this.dragHandle.renderIntent = this.vertexRenderIntent;
			this.layer.addFeatures([this.dragHandle], {
				silent : !0
			})
		},
		collectRadiusHandle : function () {
			var l = this.feature.geometry,
			k = l.getBounds(),
			j = k.getCenterLonLat(),
			i = new OpenLayers.Geometry.Point(j.lon, j.lat),
			k = new OpenLayers.Geometry.Point(k.right, k.bottom),
			j = new OpenLayers.Feature.Vector(k),
			h = this.mode & OpenLayers.Control.ModifyFeature.RESIZE,
			n = this.mode & OpenLayers.Control.ModifyFeature.RESHAPE,
			m = this.mode & OpenLayers.Control.ModifyFeature.ROTATE;
			k.move = function (g, e) {
				OpenLayers.Geometry.Point.prototype.move.call(this, g, e);
				var b = this.x - i.x,
				a = this.y - i.y,
				f = b - g,
				c = a - e;
				if (m) {
					var o = Math.atan2(c, f),
					o = Math.atan2(a, b) - o,
					o = o * (180 / Math.PI);
					l.rotate(o, i)
				}
				if (h) {
					var d;
					n ? (a /= c, d = b / f / a) : (f = Math.sqrt(f * f + c * c), a = Math.sqrt(b * b + a * a) / f);
					l.resize(a, i, d)
				}
			};
			j._sketch = !0;
			this.radiusHandle = j;
			this.radiusHandle.renderIntent = this.vertexRenderIntent;
			this.layer.addFeatures([this.radiusHandle], {
				silent : !0
			})
		},
		setMap : function (b) {
			this.standalone || this.selectControl.setMap(b);
			this.dragControl.setMap(b);
			OpenLayers.Control.prototype.setMap.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Control.ModifyFeature"
	});
OpenLayers.Control.ModifyFeature.RESHAPE = 1;
OpenLayers.Control.ModifyFeature.RESIZE = 2;
OpenLayers.Control.ModifyFeature.ROTATE = 4;
OpenLayers.Control.ModifyFeature.DRAG = 8;
OpenLayers.Layer.Bing = OpenLayers.Class(OpenLayers.Layer.XYZ, {
		key : null,
		serverResolutions : [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169],
		attributionTemplate : '<span class="olBingAttribution ${type}"><div><a target="_blank" href="http://www.bing.com/maps/"><img src="${logo}" /></a></div>${copyrights}<a style="white-space: nowrap" target="_blank" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a></span>',
		metadata : null,
		type : "Road",
		culture : "en-US",
		metadataParams : null,
		tileOptions : null,
		initialize : function (b) {
			b = OpenLayers.Util.applyDefaults({
					sphericalMercator : !0
				}, b);
			OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [b.name || "Bing " + (b.type || this.type), null, b]);
			this.tileOptions = OpenLayers.Util.extend({
					crossOriginKeyword : "anonymous"
				}, this.options.tileOptions);
			this.loadMetadata()
		},
		loadMetadata : function () {
			this._callbackId = "_callback_" + this.id.replace(/\./g, "_");
			window[this._callbackId] = OpenLayers.Function.bind(OpenLayers.Layer.Bing.processMetadata, this);
			var d = OpenLayers.Util.applyDefaults({
					key : this.key,
					jsonp : this._callbackId,
					include : "ImageryProviders"
				}, this.metadataParams),
			d = "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.type + "?" + OpenLayers.Util.getParameterString(d),
			c = document.createElement("script");
			c.type = "text/javascript";
			c.src = d;
			c.id = this._callbackId;
			document.getElementsByTagName("head")[0].appendChild(c)
		},
		initLayer : function () {
			var d = this.metadata.resourceSets[0].resources[0],
			f = d.imageUrl.replace("{quadkey}", "${quadkey}"),
			f = f.replace("{culture}", this.culture);
			this.url = [];
			for (var e = 0; e < d.imageUrlSubdomains.length; ++e) {
				this.url.push(f.replace("{subdomain}", d.imageUrlSubdomains[e]))
			}
			this.addOptions({
				maxResolution : Math.min(this.serverResolutions[d.zoomMin], this.maxResolution || Number.POSITIVE_INFINITY),
				numZoomLevels : Math.min(d.zoomMax + 1 - d.zoomMin, this.numZoomLevels)
			}, !0)
		},
		getURL : function (l) {
			if (this.url) {
				var k = this.getXYZ(l);
				l = k.x;
				for (var j = k.y, k = k.z, i = [], h = k; 0 < h; --h) {
					var n = "0",
					m = 1 << h - 1;
					0 != (l & m) && n++;
					0 != (j & m) && (n++, n++);
					i.push(n)
				}
				i = i.join("");
				l = this.selectUrl("" + l + j + k, this.url);
				return OpenLayers.String.format(l, {
					quadkey : i
				})
			}
		},
		updateAttribution : function () {
			var r = this.metadata;
			if (r.resourceSets && this.map && this.map.center) {
				var q = r.resourceSets[0].resources[0],
				p = this.map.getExtent().transform(this.map.getProjectionObject(), new OpenLayers.Projection("EPSG:4326")),
				q = q.imageryProviders,
				o = OpenLayers.Util.indexOf(this.serverResolutions, this.getServerResolution()),
				n = "",
				i,
				x,
				w,
				v,
				u,
				t,
				s;
				x = 0;
				for (w = q.length; x < w; ++x) {
					i = q[x];
					v = 0;
					for (u = i.coverageAreas.length; v < u; ++v) {
						s = i.coverageAreas[v],
						t = OpenLayers.Bounds.fromArray(s.bbox, !0),
						p.intersectsBounds(t) && (o <= s.zoomMax && o >= s.zoomMin) && (n += i.attribution + " ")
					}
				}
				this.attribution = OpenLayers.String.format(this.attributionTemplate, {
						type : this.type.toLowerCase(),
						logo : r.brandLogoUri,
						copyrights : n
					});
				this.map && this.map.events.triggerEvent("changelayer", {
					layer : this,
					property : "attribution"
				})
			}
		},
		setMap : function () {
			OpenLayers.Layer.XYZ.prototype.setMap.apply(this, arguments);
			this.updateAttribution();
			this.map.events.register("moveend", this, this.updateAttribution)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.Bing(this.options));
			return b = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [b])
		},
		destroy : function () {
			this.map && this.map.events.unregister("moveend", this, this.updateAttribution);
			OpenLayers.Layer.XYZ.prototype.destroy.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Layer.Bing"
	});
OpenLayers.Layer.Bing.processMetadata = function (b) {
	this.metadata = b;
	this.initLayer();
	b = document.getElementById(this._callbackId);
	b.parentNode.removeChild(b);
	window[this._callbackId] = void 0;
	delete this._callbackId
};
OpenLayers.Layer.PointGrid = OpenLayers.Class(OpenLayers.Layer.Vector, {
		dx : null,
		dy : null,
		ratio : 1.5,
		maxFeatures : 250,
		rotation : 0,
		origin : null,
		gridBounds : null,
		initialize : function (b) {
			b = b || {};
			OpenLayers.Layer.Vector.prototype.initialize.apply(this, [b.name, b])
		},
		setMap : function (b) {
			OpenLayers.Layer.Vector.prototype.setMap.apply(this, arguments);
			b.events.register("moveend", this, this.onMoveEnd)
		},
		removeMap : function (b) {
			b.events.unregister("moveend", this, this.onMoveEnd);
			OpenLayers.Layer.Vector.prototype.removeMap.apply(this, arguments)
		},
		setRatio : function (b) {
			this.ratio = b;
			this.updateGrid(!0)
		},
		setMaxFeatures : function (b) {
			this.maxFeatures = b;
			this.updateGrid(!0)
		},
		setSpacing : function (d, c) {
			this.dx = d;
			this.dy = c || d;
			this.updateGrid(!0)
		},
		setOrigin : function (b) {
			this.origin = b;
			this.updateGrid(!0)
		},
		getOrigin : function () {
			this.origin || (this.origin = this.map.getExtent().getCenterLonLat());
			return this.origin
		},
		setRotation : function (b) {
			this.rotation = b;
			this.updateGrid(!0)
		},
		onMoveEnd : function () {
			this.updateGrid()
		},
		getViewBounds : function () {
			var d = this.map.getExtent();
			if (this.rotation) {
				var c = this.getOrigin(),
				c = new OpenLayers.Geometry.Point(c.lon, c.lat),
				d = d.toGeometry();
				d.rotate(-this.rotation, c);
				d = d.getBounds()
			}
			return d
		},
		updateGrid : function (l) {
			if (l || this.invalidBounds()) {
				var i = this.getViewBounds(),
				t = this.getOrigin();
				l = new OpenLayers.Geometry.Point(t.lon, t.lat);
				var s = i.getWidth(),
				r = i.getHeight(),
				q = s / r,
				p = Math.sqrt(this.dx * this.dy * this.maxFeatures / q),
				s = Math.min(s * this.ratio, p * q),
				r = Math.min(r * this.ratio, p),
				i = i.getCenterLonLat();
				this.gridBounds = new OpenLayers.Bounds(i.lon - s / 2, i.lat - r / 2, i.lon + s / 2, i.lat + r / 2);
				for (var i = Math.floor(r / this.dy), s = Math.floor(s / this.dx), r = t.lon + this.dx * Math.ceil((this.gridBounds.left - t.lon) / this.dx), t = t.lat + this.dy * Math.ceil((this.gridBounds.bottom - t.lat) / this.dy), p = Array(i * s), o, n = 0; n < s; ++n) {
					for (var q = r + n * this.dx, m = 0; m < i; ++m) {
						o = t + m * this.dy,
						o = new OpenLayers.Geometry.Point(q, o),
						this.rotation && o.rotate(this.rotation, l),
						p[n * i + m] = new OpenLayers.Feature.Vector(o)
					}
				}
				this.destroyFeatures(this.features, {
					silent : !0
				});
				this.addFeatures(p, {
					silent : !0
				})
			}
		},
		invalidBounds : function () {
			return !this.gridBounds || !this.gridBounds.containsBounds(this.getViewBounds())
		},
		CLASS_NAME : "OpenLayers.Layer.PointGrid"
	});
OpenLayers.Handler.MouseWheel = OpenLayers.Class(OpenLayers.Handler, {
		wheelListener : null,
		mousePosition : null,
		interval : 0,
		delta : 0,
		cumulative : !0,
		initialize : function (d, f, e) {
			OpenLayers.Handler.prototype.initialize.apply(this, arguments);
			this.wheelListener = OpenLayers.Function.bindAsEventListener(this.onWheelEvent, this)
		},
		destroy : function () {
			OpenLayers.Handler.prototype.destroy.apply(this, arguments);
			this.wheelListener = null
		},
		onWheelEvent : function (o) {
			if (this.map && this.checkModifiers(o)) {
				for (var n = !1, m = !1, l = !1, k = OpenLayers.Event.element(o); null != k && !l && !n; ) {
					if (!n) {
						try {
							var j = k.currentStyle ? k.currentStyle.overflow : document.defaultView.getComputedStyle(k, null).getPropertyValue("overflow"),
							n = j && "auto" == j || "scroll" == j
						} catch (i) {}

					}
					if (!m) {
						for (var l = 0, p = this.map.layers.length; l < p; l++) {
							if (k == this.map.layers[l].div || k == this.map.layers[l].pane) {
								m = !0;
								break
							}
						}
					}
					l = k == this.map.div;
					k = k.parentNode
				}
				!n && l && (m && (n = 0, o || (o = window.event), o.wheelDelta ? (n = o.wheelDelta / 120, window.opera && 9.2 > window.opera.version() && (n = -n)) : o.detail && (n = -o.detail / 3), this.delta += n, this.interval ? (window.clearTimeout(this._timeoutId), this._timeoutId = window.setTimeout(OpenLayers.Function.bind(function () {
										this.wheelZoom(o)
									}, this), this.interval)) : this.wheelZoom(o)), OpenLayers.Event.stop(o))
			}
		},
		wheelZoom : function (d) {
			var c = this.delta;
			this.delta = 0;
			c && (this.mousePosition && (d.xy = this.mousePosition), d.xy || (d.xy = this.map.getPixelFromLonLat(this.map.getCenter())), 0 > c ? this.callback("down", [d, this.cumulative ? c : -1]) : this.callback("up", [d, this.cumulative ? c : 1]))
		},
		mousemove : function (b) {
			this.mousePosition = b.xy
		},
		activate : function (d) {
			if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
				var c = this.wheelListener;
				OpenLayers.Event.observe(window, "DOMMouseScroll", c);
				OpenLayers.Event.observe(window, "mousewheel", c);
				OpenLayers.Event.observe(document, "mousewheel", c);
				return !0
			}
			return !1
		},
		deactivate : function (d) {
			if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
				var c = this.wheelListener;
				OpenLayers.Event.stopObserving(window, "DOMMouseScroll", c);
				OpenLayers.Event.stopObserving(window, "mousewheel", c);
				OpenLayers.Event.stopObserving(document, "mousewheel", c);
				return !0
			}
			return !1
		},
		CLASS_NAME : "OpenLayers.Handler.MouseWheel"
	});
OpenLayers.Symbolizer = OpenLayers.Class({
		zIndex : 0,
		initialize : function (b) {
			OpenLayers.Util.extend(this, b)
		},
		clone : function () {
			return new(eval(this.CLASS_NAME))(OpenLayers.Util.extend({}, this))
		},
		CLASS_NAME : "OpenLayers.Symbolizer"
	});
OpenLayers.Symbolizer.Raster = OpenLayers.Class(OpenLayers.Symbolizer, {
		initialize : function (b) {
			OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Symbolizer.Raster"
	});
OpenLayers.Rule = OpenLayers.Class({
		id : null,
		name : null,
		title : null,
		description : null,
		context : null,
		filter : null,
		elseFilter : !1,
		symbolizer : null,
		symbolizers : null,
		minScaleDenominator : null,
		maxScaleDenominator : null,
		initialize : function (b) {
			this.symbolizer = {};
			OpenLayers.Util.extend(this, b);
			this.symbolizers && delete this.symbolizer;
			this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
		},
		destroy : function () {
			for (var b in this.symbolizer) {
				this.symbolizer[b] = null
			}
			this.symbolizer = null;
			delete this.symbolizers
		},
		evaluate : function (h) {
			var g = this.getContext(h),
			f = !0;
			if (this.minScaleDenominator || this.maxScaleDenominator) {
				var e = h.layer.map.getScale()
			}
			this.minScaleDenominator && (f = e >= OpenLayers.Style.createLiteral(this.minScaleDenominator, g));
			f && this.maxScaleDenominator && (f = e < OpenLayers.Style.createLiteral(this.maxScaleDenominator, g));
			f && this.filter && (f = "OpenLayers.Filter.FeatureId" == this.filter.CLASS_NAME ? this.filter.evaluate(h) : this.filter.evaluate(g));
			return f
		},
		getContext : function (d) {
			var c = this.context;
			c || (c = d.attributes || d.data);
			"function" == typeof this.context && (c = this.context(d));
			return c
		},
		clone : function () {
			var h = OpenLayers.Util.extend({}, this);
			if (this.symbolizers) {
				var g = this.symbolizers.length;
				h.symbolizers = Array(g);
				for (var f = 0; f < g; ++f) {
					h.symbolizers[f] = this.symbolizers[f].clone()
				}
			} else {
				h.symbolizer = {};
				for (var e in this.symbolizer) {
					g = this.symbolizer[e],
					f = typeof g,
					"object" === f ? h.symbolizer[e] = OpenLayers.Util.extend({}, g) : "string" === f && (h.symbolizer[e] = g)
				}
			}
			h.filter = this.filter && this.filter.clone();
			h.context = this.context && OpenLayers.Util.extend({}, this.context);
			return new OpenLayers.Rule(h)
		},
		CLASS_NAME : "OpenLayers.Rule"
	});
OpenLayers.Filter.Spatial = OpenLayers.Class(OpenLayers.Filter, {
		type : null,
		property : null,
		value : null,
		distance : null,
		distanceUnits : null,
		evaluate : function (d) {
			var f = !1;
			switch (this.type) {
			case OpenLayers.Filter.Spatial.BBOX:
			case OpenLayers.Filter.Spatial.INTERSECTS:
				if (d.geometry) {
					var e = this.value;
					"OpenLayers.Bounds" == this.value.CLASS_NAME && (e = this.value.toGeometry());
					d.geometry.intersects(e) && (f = !0)
				}
				break;
			default:
				throw Error("evaluate is not implemented for this filter type.")
			}
			return f
		},
		clone : function () {
			var b = OpenLayers.Util.applyDefaults({
					value : this.value && this.value.clone && this.value.clone()
				}, this);
			return new OpenLayers.Filter.Spatial(b)
		},
		CLASS_NAME : "OpenLayers.Filter.Spatial"
	});
OpenLayers.Filter.Spatial.BBOX = "BBOX";
OpenLayers.Filter.Spatial.INTERSECTS = "INTERSECTS";
OpenLayers.Filter.Spatial.DWITHIN = "DWITHIN";
OpenLayers.Filter.Spatial.WITHIN = "WITHIN";
OpenLayers.Filter.Spatial.CONTAINS = "CONTAINS";
OpenLayers.Format.SLD = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		profile : null,
		defaultVersion : "1.0.0",
		stringifyOutput : !0,
		namedLayersAsArray : !1,
		CLASS_NAME : "OpenLayers.Format.SLD"
	});
OpenLayers.Symbolizer.Polygon = OpenLayers.Class(OpenLayers.Symbolizer, {
		initialize : function (b) {
			OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Symbolizer.Polygon"
	});
OpenLayers.Format.GML.v2 = OpenLayers.Class(OpenLayers.Format.GML.Base, {
		schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd",
		initialize : function (b) {
			OpenLayers.Format.GML.Base.prototype.initialize.apply(this, [b])
		},
		readers : {
			gml : OpenLayers.Util.applyDefaults({
				outerBoundaryIs : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.outer = e.components[0]
				},
				innerBoundaryIs : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.inner.push(e.components[0])
				},
				Box : function (h, g) {
					var f = {};
					this.readChildNodes(h, f);
					g.components || (g.components = []);
					var e = f.points[0],
					f = f.points[1];
					g.components.push(new OpenLayers.Bounds(e.x, e.y, f.x, f.y))
				}
			}, OpenLayers.Format.GML.Base.prototype.readers.gml),
			feature : OpenLayers.Format.GML.Base.prototype.readers.feature,
			wfs : OpenLayers.Format.GML.Base.prototype.readers.wfs
		},
		write : function (d) {
			var c;
			c = OpenLayers.Util.isArray(d) ? "wfs:FeatureCollection" : "gml:featureMember";
			d = this.writeNode(c, d);
			this.setAttributeNS(d, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			return OpenLayers.Format.XML.prototype.write.apply(this, [d])
		},
		writers : {
			gml : OpenLayers.Util.applyDefaults({
				Point : function (d) {
					var c = this.createElementNSPlus("gml:Point");
					this.writeNode("coordinates", [d], c);
					return c
				},
				coordinates : function (i) {
					for (var h = i.length, g = Array(h), f, j = 0; j < h; ++j) {
						f = i[j],
						g[j] = this.xy ? f.x + "," + f.y : f.y + "," + f.x,
						void 0 != f.z && (g[j] += "," + f.z)
					}
					return this.createElementNSPlus("gml:coordinates", {
						attributes : {
							decimal : ".",
							cs : ",",
							ts : " "
						},
						value : 1 == h ? g[0] : g.join(" ")
					})
				},
				LineString : function (d) {
					var c = this.createElementNSPlus("gml:LineString");
					this.writeNode("coordinates", d.components, c);
					return c
				},
				Polygon : function (d) {
					var f = this.createElementNSPlus("gml:Polygon");
					this.writeNode("outerBoundaryIs", d.components[0], f);
					for (var e = 1; e < d.components.length; ++e) {
						this.writeNode("innerBoundaryIs", d.components[e], f)
					}
					return f
				},
				outerBoundaryIs : function (d) {
					var c = this.createElementNSPlus("gml:outerBoundaryIs");
					this.writeNode("LinearRing", d, c);
					return c
				},
				innerBoundaryIs : function (d) {
					var c = this.createElementNSPlus("gml:innerBoundaryIs");
					this.writeNode("LinearRing", d, c);
					return c
				},
				LinearRing : function (d) {
					var c = this.createElementNSPlus("gml:LinearRing");
					this.writeNode("coordinates", d.components, c);
					return c
				},
				Box : function (d) {
					var c = this.createElementNSPlus("gml:Box");
					this.writeNode("coordinates", [{
								x : d.left,
								y : d.bottom
							}, {
								x : d.right,
								y : d.top
							}
						], c);
					this.srsName && c.setAttribute("srsName", this.srsName);
					return c
				}
			}, OpenLayers.Format.GML.Base.prototype.writers.gml),
			feature : OpenLayers.Format.GML.Base.prototype.writers.feature,
			wfs : OpenLayers.Format.GML.Base.prototype.writers.wfs
		},
		CLASS_NAME : "OpenLayers.Format.GML.v2"
	});
OpenLayers.Format.Filter.v1_0_0 = OpenLayers.Class(OpenLayers.Format.GML.v2, OpenLayers.Format.Filter.v1, {
		VERSION : "1.0.0",
		schemaLocation : "http://www.opengis.net/ogc/filter/1.0.0/filter.xsd",
		initialize : function (b) {
			OpenLayers.Format.GML.v2.prototype.initialize.apply(this, [b])
		},
		readers : {
			ogc : OpenLayers.Util.applyDefaults({
				PropertyIsEqualTo : function (d, f) {
					var e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.EQUAL_TO
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsNotEqualTo : function (d, f) {
					var e = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.NOT_EQUAL_TO
						});
					this.readChildNodes(d, e);
					f.filters.push(e)
				},
				PropertyIsLike : function (j, i) {
					var h = new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.LIKE
						});
					this.readChildNodes(j, h);
					var g = j.getAttribute("wildCard"),
					l = j.getAttribute("singleChar"),
					k = j.getAttribute("escape");
					h.value2regex(g, l, k);
					i.filters.push(h)
				}
			}, OpenLayers.Format.Filter.v1.prototype.readers.ogc),
			gml : OpenLayers.Format.GML.v2.prototype.readers.gml,
			feature : OpenLayers.Format.GML.v2.prototype.readers.feature
		},
		writers : {
			ogc : OpenLayers.Util.applyDefaults({
				PropertyIsEqualTo : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsEqualTo");
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsNotEqualTo : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsNotEqualTo");
					this.writeNode("PropertyName", d, c);
					this.writeOgcExpression(d.value, c);
					return c
				},
				PropertyIsLike : function (d) {
					var c = this.createElementNSPlus("ogc:PropertyIsLike", {
							attributes : {
								wildCard : "*",
								singleChar : ".",
								escape : "!"
							}
						});
					this.writeNode("PropertyName", d, c);
					this.writeNode("Literal", d.regex2value(), c);
					return c
				},
				BBOX : function (d) {
					var f = this.createElementNSPlus("ogc:BBOX");
					d.property && this.writeNode("PropertyName", d, f);
					var e = this.writeNode("gml:Box", d.value, f);
					d.projection && e.setAttribute("srsName", d.projection);
					return f
				}
			}, OpenLayers.Format.Filter.v1.prototype.writers.ogc),
			gml : OpenLayers.Format.GML.v2.prototype.writers.gml,
			feature : OpenLayers.Format.GML.v2.prototype.writers.feature
		},
		writeSpatial : function (h, g) {
			var f = this.createElementNSPlus("ogc:" + g);
			this.writeNode("PropertyName", h, f);
			if (h.value instanceof OpenLayers.Filter.Function) {
				this.writeNode("Function", h.value, f)
			} else {
				var e;
				e = h.value instanceof OpenLayers.Geometry ? this.writeNode("feature:_geometry", h.value).firstChild : this.writeNode("gml:Box", h.value);
				h.projection && e.setAttribute("srsName", h.projection);
				f.appendChild(e)
			}
			return f
		},
		CLASS_NAME : "OpenLayers.Format.Filter.v1_0_0"
	});
OpenLayers.Format.WFST.v1_0_0 = OpenLayers.Class(OpenLayers.Format.Filter.v1_0_0, OpenLayers.Format.WFST.v1, {
		version : "1.0.0",
		srsNameInQuery : !1,
		schemaLocations : {
			wfs : "http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd"
		},
		initialize : function (b) {
			OpenLayers.Format.Filter.v1_0_0.prototype.initialize.apply(this, [b]);
			OpenLayers.Format.WFST.v1.prototype.initialize.apply(this, [b])
		},
		readNode : function (d, c) {
			return OpenLayers.Format.GML.v2.prototype.readNode.apply(this, [d, c])
		},
		readers : {
			wfs : OpenLayers.Util.applyDefaults({
				WFS_TransactionResponse : function (d, c) {
					c.insertIds = [];
					c.success = !1;
					this.readChildNodes(d, c)
				},
				InsertResult : function (d, f) {
					var e = {
						fids : []
					};
					this.readChildNodes(d, e);
					f.insertIds.push(e.fids[0])
				},
				TransactionResult : function (d, c) {
					this.readChildNodes(d, c)
				},
				Status : function (d, c) {
					this.readChildNodes(d, c)
				},
				SUCCESS : function (d, c) {
					c.success = !0
				}
			}, OpenLayers.Format.WFST.v1.prototype.readers.wfs),
			gml : OpenLayers.Format.GML.v2.prototype.readers.gml,
			feature : OpenLayers.Format.GML.v2.prototype.readers.feature,
			ogc : OpenLayers.Format.Filter.v1_0_0.prototype.readers.ogc
		},
		writers : {
			wfs : OpenLayers.Util.applyDefaults({
				Query : function (h) {
					h = OpenLayers.Util.extend({
							featureNS : this.featureNS,
							featurePrefix : this.featurePrefix,
							featureType : this.featureType,
							srsName : this.srsName,
							srsNameInQuery : this.srsNameInQuery
						}, h);
					var g = h.featurePrefix,
					f = this.createElementNSPlus("wfs:Query", {
							attributes : {
								typeName : (g ? g + ":" : "") + h.featureType
							}
						});
					h.srsNameInQuery && h.srsName && f.setAttribute("srsName", h.srsName);
					h.featureNS && f.setAttribute("xmlns:" + g, h.featureNS);
					if (h.propertyNames) {
						for (var g = 0, e = h.propertyNames.length; g < e; g++) {
							this.writeNode("ogc:PropertyName", {
								property : h.propertyNames[g]
							}, f)
						}
					}
					h.filter && (this.setFilterProperty(h.filter), this.writeNode("ogc:Filter", h.filter, f));
					return f
				}
			}, OpenLayers.Format.WFST.v1.prototype.writers.wfs),
			gml : OpenLayers.Format.GML.v2.prototype.writers.gml,
			feature : OpenLayers.Format.GML.v2.prototype.writers.feature,
			ogc : OpenLayers.Format.Filter.v1_0_0.prototype.writers.ogc
		},
		CLASS_NAME : "OpenLayers.Format.WFST.v1_0_0"
	});
OpenLayers.ElementsIndexer = OpenLayers.Class({
		maxZIndex : null,
		order : null,
		indices : null,
		compare : null,
		initialize : function (b) {
			this.compare = b ? OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_Y_ORDER : OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_DRAWING_ORDER;
			this.clear()
		},
		insert : function (i) {
			this.exists(i) && this.remove(i);
			var h = i.id;
			this.determineZIndex(i);
			for (var g = -1, f = this.order.length, j; 1 < f - g; ) {
				j = parseInt((g + f) / 2),
				0 < this.compare(this, i, OpenLayers.Util.getElement(this.order[j])) ? g = j : f = j
			}
			this.order.splice(f, 0, h);
			this.indices[h] = this.getZIndex(i);
			return this.getNextElement(f)
		},
		remove : function (d) {
			d = d.id;
			var c = OpenLayers.Util.indexOf(this.order, d);
			0 <= c && (this.order.splice(c, 1), delete this.indices[d], this.maxZIndex = 0 < this.order.length ? this.indices[this.order[this.order.length - 1]] : 0)
		},
		clear : function () {
			this.order = [];
			this.indices = {};
			this.maxZIndex = 0
		},
		exists : function (b) {
			return null != this.indices[b.id]
		},
		getZIndex : function (b) {
			return b._style.graphicZIndex
		},
		determineZIndex : function (d) {
			var c = d._style.graphicZIndex;
			null == c ? (c = this.maxZIndex, d._style.graphicZIndex = c) : c > this.maxZIndex && (this.maxZIndex = c)
		},
		getNextElement : function (d) {
			d += 1;
			if (d < this.order.length) {
				var c = OpenLayers.Util.getElement(this.order[d]);
				void 0 == c && (c = this.getNextElement(d));
				return c
			}
			return null
		},
		CLASS_NAME : "OpenLayers.ElementsIndexer"
	});
OpenLayers.ElementsIndexer.IndexingMethods = {
	Z_ORDER : function (h, g, f) {
		g = h.getZIndex(g);
		var e = 0;
		f && (h = h.getZIndex(f), e = g - h);
		return e
	},
	Z_ORDER_DRAWING_ORDER : function (d, f, e) {
		d = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(d, f, e);
		e && 0 == d && (d = 1);
		return d
	},
	Z_ORDER_Y_ORDER : function (d, f, e) {
		d = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(d, f, e);
		e && 0 === d && (f = e._boundsBottom - f._boundsBottom, d = 0 === f ? 1 : f);
		return d
	}
};
OpenLayers.Renderer.Elements = OpenLayers.Class(OpenLayers.Renderer, {
		rendererRoot : null,
		root : null,
		vectorRoot : null,
		textRoot : null,
		xmlns : null,
		xOffset : 0,
		indexer : null,
		BACKGROUND_ID_SUFFIX : "_background",
		LABEL_ID_SUFFIX : "_label",
		LABEL_OUTLINE_SUFFIX : "_outline",
		initialize : function (d, c) {
			OpenLayers.Renderer.prototype.initialize.apply(this, arguments);
			this.rendererRoot = this.createRenderRoot();
			this.root = this.createRoot("_root");
			this.vectorRoot = this.createRoot("_vroot");
			this.textRoot = this.createRoot("_troot");
			this.root.appendChild(this.vectorRoot);
			this.root.appendChild(this.textRoot);
			this.rendererRoot.appendChild(this.root);
			this.container.appendChild(this.rendererRoot);
			if (c && (c.zIndexing || c.yOrdering)) {
				this.indexer = new OpenLayers.ElementsIndexer(c.yOrdering)
			}
		},
		destroy : function () {
			this.clear();
			this.xmlns = this.root = this.rendererRoot = null;
			OpenLayers.Renderer.prototype.destroy.apply(this, arguments)
		},
		clear : function () {
			var d,
			c = this.vectorRoot;
			if (c) {
				for (; d = c.firstChild; ) {
					c.removeChild(d)
				}
			}
			if (c = this.textRoot) {
				for (; d = c.firstChild; ) {
					c.removeChild(d)
				}
			}
			this.indexer && this.indexer.clear()
		},
		setExtent : function (j, i) {
			var h = OpenLayers.Renderer.prototype.setExtent.apply(this, arguments),
			g = this.getResolution();
			if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
				var l,
				k = j.getWidth() / this.map.getExtent().getWidth();
				j = j.scale(1 / k);
				k = this.map.getMaxExtent();
				k.right > j.left && k.right < j.right ? l = !0 : k.left > j.left && k.left < j.right && (l = !1);
				if (l !== this.rightOfDateLine || i) {
					h = !1,
					this.xOffset = !0 === l ? k.getWidth() / g : 0
				}
				this.rightOfDateLine = l
			}
			return h
		},
		getNodeType : function () {},
		drawGeometry : function (j, i, h) {
			var g = j.CLASS_NAME,
			l = !0;
			if ("OpenLayers.Geometry.Collection" == g || "OpenLayers.Geometry.MultiPoint" == g || "OpenLayers.Geometry.MultiLineString" == g || "OpenLayers.Geometry.MultiPolygon" == g) {
				for (var g = 0, k = j.components.length; g < k; g++) {
					l = this.drawGeometry(j.components[g], i, h) && l
				}
				return l
			}
			g = l = !1;
			"none" != i.display && (i.backgroundGraphic ? this.redrawBackgroundNode(j.id, j, i, h) : g = !0, l = this.redrawNode(j.id, j, i, h));
			if (!1 == l && (i = document.getElementById(j.id))) {
				i._style.backgroundGraphic && (g = !0),
				i.parentNode.removeChild(i)
			}
			g && (i = document.getElementById(j.id + this.BACKGROUND_ID_SUFFIX)) && i.parentNode.removeChild(i);
			return l
		},
		redrawNode : function (h, g, f, e) {
			f = this.applyDefaultSymbolizer(f);
			h = this.nodeFactory(h, this.getNodeType(g, f));
			h._featureId = e;
			h._boundsBottom = g.getBounds().bottom;
			h._geometryClass = g.CLASS_NAME;
			h._style = f;
			g = this.drawGeometryNode(h, g, f);
			if (!1 === g) {
				return !1
			}
			h = g.node;
			this.indexer ? (f = this.indexer.insert(h)) ? this.vectorRoot.insertBefore(h, f) : this.vectorRoot.appendChild(h) : h.parentNode !== this.vectorRoot && this.vectorRoot.appendChild(h);
			this.postDraw(h);
			return g.complete
		},
		redrawBackgroundNode : function (d, f, e) {
			e = OpenLayers.Util.extend({}, e);
			e.externalGraphic = e.backgroundGraphic;
			e.graphicXOffset = e.backgroundXOffset;
			e.graphicYOffset = e.backgroundYOffset;
			e.graphicZIndex = e.backgroundGraphicZIndex;
			e.graphicWidth = e.backgroundWidth || e.graphicWidth;
			e.graphicHeight = e.backgroundHeight || e.graphicHeight;
			e.backgroundGraphic = null;
			e.backgroundXOffset = null;
			e.backgroundYOffset = null;
			e.backgroundGraphicZIndex = null;
			return this.redrawNode(d + this.BACKGROUND_ID_SUFFIX, f, e, null)
		},
		drawGeometryNode : function (i, h, g) {
			g = g || i._style;
			var f = {
				isFilled : void 0 === g.fill ? !0 : g.fill,
				isStroked : void 0 === g.stroke ? !!g.strokeWidth : g.stroke
			},
			j;
			switch (h.CLASS_NAME) {
			case "OpenLayers.Geometry.Point":
				!1 === g.graphic && (f.isFilled = !1, f.isStroked = !1);
				j = this.drawPoint(i, h);
				break;
			case "OpenLayers.Geometry.LineString":
				f.isFilled = !1;
				j = this.drawLineString(i, h);
				break;
			case "OpenLayers.Geometry.LinearRing":
				j = this.drawLinearRing(i, h);
				break;
			case "OpenLayers.Geometry.Polygon":
				j = this.drawPolygon(i, h);
				break;
			case "OpenLayers.Geometry.Rectangle":
				j = this.drawRectangle(i, h)
			}
			i._options = f;
			return !1 != j ? {
				node : this.setStyle(i, g, f, h),
				complete : j
			}
			 : !1
		},
		postDraw : function () {},
		drawPoint : function () {},
		drawLineString : function () {},
		drawLinearRing : function () {},
		drawPolygon : function () {},
		drawRectangle : function () {},
		drawCircle : function () {},
		removeText : function (d) {
			var c = document.getElementById(d + this.LABEL_ID_SUFFIX);
			c && this.textRoot.removeChild(c);
			(d = document.getElementById(d + this.LABEL_OUTLINE_SUFFIX)) && this.textRoot.removeChild(d)
		},
		getFeatureIdFromEvent : function (d) {
			var f = d.target,
			e = f && f.correspondingUseElement;
			return (e ? e : f || d.srcElement)._featureId
		},
		eraseGeometry : function (h, g) {
			if ("OpenLayers.Geometry.MultiPoint" == h.CLASS_NAME || "OpenLayers.Geometry.MultiLineString" == h.CLASS_NAME || "OpenLayers.Geometry.MultiPolygon" == h.CLASS_NAME || "OpenLayers.Geometry.Collection" == h.CLASS_NAME) {
				for (var f = 0, e = h.components.length; f < e; f++) {
					this.eraseGeometry(h.components[f], g)
				}
			} else {
				if ((f = OpenLayers.Util.getElement(h.id)) && f.parentNode) {
					f.geometry && (f.geometry.destroy(), f.geometry = null),
					f.parentNode.removeChild(f),
					this.indexer && this.indexer.remove(f),
					f._style.backgroundGraphic && (f = OpenLayers.Util.getElement(h.id + this.BACKGROUND_ID_SUFFIX)) && f.parentNode && f.parentNode.removeChild(f)
				}
			}
		},
		nodeFactory : function (d, f) {
			var e = OpenLayers.Util.getElement(d);
			e ? this.nodeTypeCompare(e, f) || (e.parentNode.removeChild(e), e = this.nodeFactory(d, f)) : e = this.createNode(f, d);
			return e
		},
		nodeTypeCompare : function () {},
		createNode : function () {},
		moveRoot : function (d) {
			var c = this.root;
			d.root.parentNode == this.rendererRoot && (c = d.root);
			c.parentNode.removeChild(c);
			d.rendererRoot.appendChild(c)
		},
		getRenderLayerId : function () {
			return this.root.parentNode.parentNode.id
		},
		isComplexSymbol : function (b) {
			return "circle" != b && !!b
		},
		CLASS_NAME : "OpenLayers.Renderer.Elements"
	});
OpenLayers.Control.ArgParser = OpenLayers.Class(OpenLayers.Control, {
		center : null,
		zoom : null,
		layers : null,
		displayProjection : null,
		getParameters : function (d) {
			d = d || window.location.href;
			var f = OpenLayers.Util.getParameters(d),
			e = d.indexOf("#");
			0 < e && (d = "?" + d.substring(e + 1, d.length), OpenLayers.Util.extend(f, OpenLayers.Util.getParameters(d)));
			return f
		},
		setMap : function (h) {
			OpenLayers.Control.prototype.setMap.apply(this, arguments);
			for (var g = 0, f = this.map.controls.length; g < f; g++) {
				var e = this.map.controls[g];
				if (e != this && "OpenLayers.Control.ArgParser" == e.CLASS_NAME) {
					e.displayProjection != this.displayProjection && (this.displayProjection = e.displayProjection);
					break
				}
			}
			g == this.map.controls.length && (g = this.getParameters(), g.layers && (this.layers = g.layers, this.map.events.register("addlayer", this, this.configureLayers), this.configureLayers()), g.lat && g.lon && (this.center = new OpenLayers.LonLat(parseFloat(g.lon), parseFloat(g.lat)), g.zoom && (this.zoom = parseFloat(g.zoom)), this.map.events.register("changebaselayer", this, this.setCenter), this.setCenter()))
		},
		setCenter : function () {
			this.map.baseLayer && (this.map.events.unregister("changebaselayer", this, this.setCenter), this.displayProjection && this.center.transform(this.displayProjection, this.map.getProjectionObject()), this.map.setCenter(this.center, this.zoom))
		},
		configureLayers : function () {
			if (this.layers.length == this.map.layers.length) {
				this.map.events.unregister("addlayer", this, this.configureLayers);
				for (var h = 0, g = this.layers.length; h < g; h++) {
					var f = this.map.layers[h],
					e = this.layers.charAt(h);
					"B" == e ? this.map.setBaseLayer(f) : ("T" == e || "F" == e) && f.setVisibility("T" == e)
				}
			}
		},
		CLASS_NAME : "OpenLayers.Control.ArgParser"
	});
OpenLayers.Control.Permalink = OpenLayers.Class(OpenLayers.Control, {
		argParserClass : OpenLayers.Control.ArgParser,
		element : null,
		anchor : !1,
		base : "",
		displayProjection : null,
		initialize : function (d, f, e) {
			null !== d && "object" == typeof d && !OpenLayers.Util.isElement(d) ? (this.base = document.location.href, OpenLayers.Control.prototype.initialize.apply(this, [d]), null != this.element && (this.element = OpenLayers.Util.getElement(this.element))) : (OpenLayers.Control.prototype.initialize.apply(this, [e]), this.element = OpenLayers.Util.getElement(d), this.base = f || document.location.href)
		},
		destroy : function () {
			this.element && this.element.parentNode == this.div && (this.div.removeChild(this.element), this.element = null);
			this.map && this.map.events.unregister("moveend", this, this.updateLink);
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		setMap : function (h) {
			OpenLayers.Control.prototype.setMap.apply(this, arguments);
			for (var g = 0, f = this.map.controls.length; g < f; g++) {
				var e = this.map.controls[g];
				if (e.CLASS_NAME == this.argParserClass.CLASS_NAME) {
					e.displayProjection != this.displayProjection && (this.displayProjection = e.displayProjection);
					break
				}
			}
			g == this.map.controls.length && this.map.addControl(new this.argParserClass({
					displayProjection : this.displayProjection
				}))
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			!this.element && !this.anchor && (this.element = document.createElement("a"), this.element.innerHTML = OpenLayers.i18n("Permalink"), this.element.href = "", this.div.appendChild(this.element));
			this.map.events.on({
				moveend : this.updateLink,
				changelayer : this.updateLink,
				changebaselayer : this.updateLink,
				scope : this
			});
			this.updateLink();
			return this.div
		},
		updateLink : function () {
			var d = this.anchor ? "#" : "?",
			c = this.base;
			-1 != c.indexOf(d) && (c = c.substring(0, c.indexOf(d)));
			c += d + OpenLayers.Util.getParameterString(this.createParams());
			this.anchor && !this.element ? window.location.href = c : this.element.href = c
		},
		createParams : function (i, h, g) {
			i = i || this.map.getCenter();
			var f = OpenLayers.Util.getParameters(this.base);
			if (i) {
				f.zoom = h || this.map.getZoom();
				h = i.lat;
				i = i.lon;
				this.displayProjection && (h = OpenLayers.Projection.transform({
							x : i,
							y : h
						}, this.map.getProjectionObject(), this.displayProjection), i = h.x, h = h.y);
				f.lat = Math.round(100000 * h) / 100000;
				f.lon = Math.round(100000 * i) / 100000;
				g = g || this.map.layers;
				f.layers = "";
				i = 0;
				for (h = g.length; i < h; i++) {
					var j = g[i];
					f.layers = j.isBaseLayer ? f.layers + (j == this.map.baseLayer ? "B" : "0") : f.layers + (j.getVisibility() ? "T" : "F")
				}
			}
			return f
		},
		CLASS_NAME : "OpenLayers.Control.Permalink"
	});
OpenLayers.Layer.TMS = OpenLayers.Class(OpenLayers.Layer.Grid, {
		serviceVersion : "1.0.0",
		layername : null,
		type : null,
		isBaseLayer : !0,
		tileOrigin : null,
		serverResolutions : null,
		zoomOffset : 0,
		initialize : function (h, g, f) {
			var e = [];
			e.push(h, g, {}, f);
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, e)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.TMS(this.name, this.url, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getURL : function (d) {
			d = this.adjustBounds(d);
			var f = this.getServerResolution(),
			e = Math.round((d.left - this.tileOrigin.lon) / (f * this.tileSize.w));
			d = Math.round((d.bottom - this.tileOrigin.lat) / (f * this.tileSize.h));
			f = this.getServerZoom();
			e = this.serviceVersion + "/" + this.layername + "/" + f + "/" + e + "/" + d + "." + this.type;
			d = this.url;
			OpenLayers.Util.isArray(d) && (d = this.selectUrl(e, d));
			return d + e
		},
		setMap : function (b) {
			OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
			this.tileOrigin || (this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left, this.map.maxExtent.bottom))
		},
		CLASS_NAME : "OpenLayers.Layer.TMS"
	});
OpenLayers.Strategy.Fixed = OpenLayers.Class(OpenLayers.Strategy, {
		preload : !1,
		activate : function () {
			if (OpenLayers.Strategy.prototype.activate.apply(this, arguments)) {
				this.layer.events.on({
					refresh : this.load,
					scope : this
				});
				if (!0 == this.layer.visibility || this.preload) {
					this.load()
				} else {
					this.layer.events.on({
						visibilitychanged : this.load,
						scope : this
					})
				}
				return !0
			}
			return !1
		},
		deactivate : function () {
			var b = OpenLayers.Strategy.prototype.deactivate.call(this);
			b && this.layer.events.un({
				refresh : this.load,
				visibilitychanged : this.load,
				scope : this
			});
			return b
		},
		load : function (d) {
			var c = this.layer;
			c.events.triggerEvent("loadstart");
			c.protocol.read(OpenLayers.Util.applyDefaults({
					callback : OpenLayers.Function.bind(this.merge, this, c.map.getProjectionObject()),
					filter : c.filter
				}, d));
			c.events.un({
				visibilitychanged : this.load,
				scope : this
			})
		},
		merge : function (l, k) {
			var j = this.layer;
			j.destroyFeatures();
			var i = k.features;
			if (i && 0 < i.length) {
				if (!l.equals(j.projection)) {
					for (var h, n = 0, m = i.length; n < m; ++n) {
						(h = i[n].geometry) && h.transform(j.projection, l)
					}
				}
				j.addFeatures(i)
			}
			j.events.triggerEvent("loadend")
		},
		CLASS_NAME : "OpenLayers.Strategy.Fixed"
	});
OpenLayers.Control.Zoom = OpenLayers.Class(OpenLayers.Control, {
		zoomInText : "+",
		zoomInId : "olZoomInLink",
		zoomOutText : "-",
		zoomOutId : "olZoomOutLink",
		draw : function () {
			var h = OpenLayers.Control.prototype.draw.apply(this),
			g = this.getOrCreateLinks(h),
			f = g.zoomIn,
			g = g.zoomOut,
			e = this.map.events;
			g.parentNode !== h && (e = this.events, e.attachToElement(g.parentNode));
			e.register("buttonclick", this, this.onZoomClick);
			this.zoomInLink = f;
			this.zoomOutLink = g;
			return h
		},
		getOrCreateLinks : function (d) {
			var f = document.getElementById(this.zoomInId),
			e = document.getElementById(this.zoomOutId);
			f || (f = document.createElement("a"), f.href = "#zoomIn", f.appendChild(document.createTextNode(this.zoomInText)), f.className = "olControlZoomIn", d.appendChild(f));
			OpenLayers.Element.addClass(f, "olButton");
			e || (e = document.createElement("a"), e.href = "#zoomOut", e.appendChild(document.createTextNode(this.zoomOutText)), e.className = "olControlZoomOut", d.appendChild(e));
			OpenLayers.Element.addClass(e, "olButton");
			return {
				zoomIn : f,
				zoomOut : e
			}
		},
		onZoomClick : function (b) {
			b = b.buttonElement;
			b === this.zoomInLink ? this.map.zoomIn() : b === this.zoomOutLink && this.map.zoomOut()
		},
		destroy : function () {
			this.map && this.map.events.unregister("buttonclick", this, this.onZoomClick);
			delete this.zoomInLink;
			delete this.zoomOutLink;
			OpenLayers.Control.prototype.destroy.apply(this)
		},
		CLASS_NAME : "OpenLayers.Control.Zoom"
	});
OpenLayers.Layer.PointTrack = OpenLayers.Class(OpenLayers.Layer.Vector, {
		dataFrom : null,
		styleFrom : null,
		addNodes : function (r, q) {
			if (2 > r.length) {
				throw Error("At least two point features have to be added to create a line from")
			}
			for (var p = Array(r.length - 1), o, n, m, l = 0, k = r.length; l < k; l++) {
				o = r[l];
				if (m = o.geometry) {
					if ("OpenLayers.Geometry.Point" != m.CLASS_NAME) {
						throw new TypeError("Only features with point geometries are supported.")
					}
				} else {
					m = o.lonlat,
					m = new OpenLayers.Geometry.Point(m.lon, m.lat)
				}
				if (0 < l) {
					o = null != this.dataFrom ? r[l + this.dataFrom].data || r[l + this.dataFrom].attributes : null;
					var i = null != this.styleFrom ? r[l + this.styleFrom].style : null;
					n = new OpenLayers.Geometry.LineString([n, m]);
					p[l - 1] = new OpenLayers.Feature.Vector(n, o, i)
				}
				n = m
			}
			this.addFeatures(p, q)
		},
		CLASS_NAME : "OpenLayers.Layer.PointTrack"
	});
OpenLayers.Layer.PointTrack.SOURCE_NODE = -1;
OpenLayers.Layer.PointTrack.TARGET_NODE = 0;
OpenLayers.Layer.PointTrack.dataFrom = {
	SOURCE_NODE : -1,
	TARGET_NODE : 0
};
OpenLayers.Protocol.WFS = function (d) {
	d = OpenLayers.Util.applyDefaults(d, OpenLayers.Protocol.WFS.DEFAULTS);
	var c = OpenLayers.Protocol.WFS["v" + d.version.replace(/\./g, "_")];
	if (!c) {
		throw "Unsupported WFS version: " + d.version
	}
	return new c(d)
};
OpenLayers.Protocol.WFS.fromWMSLayer = function (h, g) {
	var f,
	e;
	f = h.params.LAYERS;
	f = (OpenLayers.Util.isArray(f) ? f[0] : f).split(":");
	1 < f.length && (e = f[0]);
	f = f.pop();
	e = {
		url : h.url,
		featureType : f,
		featurePrefix : e,
		srsName : h.projection && h.projection.getCode() || h.map && h.map.getProjectionObject().getCode(),
		version : "1.1.0"
	};
	return new OpenLayers.Protocol.WFS(OpenLayers.Util.applyDefaults(g, e))
};
OpenLayers.Protocol.WFS.DEFAULTS = {
	version : "1.0.0"
};
OpenLayers.Layer.Markers = OpenLayers.Class(OpenLayers.Layer, {
		isBaseLayer : !1,
		markers : null,
		drawn : !1,
		initialize : function (d, c) {
			OpenLayers.Layer.prototype.initialize.apply(this, arguments);
			this.markers = []
		},
		destroy : function () {
			this.clearMarkers();
			this.markers = null;
			OpenLayers.Layer.prototype.destroy.apply(this, arguments)
		},
		setOpacity : function (d) {
			if (d != this.opacity) {
				this.opacity = d;
				d = 0;
				for (var c = this.markers.length; d < c; d++) {
					this.markers[d].setOpacity(this.opacity)
				}
			}
		},
		moveTo : function (i, h, g) {
			OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
			if (h || !this.drawn) {
				for (var f = 0, j = this.markers.length; f < j; f++) {
					this.drawMarker(this.markers[f])
				}
				this.drawn = !0
			}
		},
		addMarker : function (b) {
			this.markers.push(b);
			1 > this.opacity && b.setOpacity(this.opacity);
			this.map && this.map.getExtent() && (b.map = this.map, this.drawMarker(b))
		},
		removeMarker : function (b) {
			this.markers && this.markers.length && (OpenLayers.Util.removeItem(this.markers, b), b.erase())
		},
		clearMarkers : function () {
			if (null != this.markers) {
				for (; 0 < this.markers.length; ) {
					this.removeMarker(this.markers[0])
				}
			}
		},
		drawMarker : function (d) {
			var c = this.map.getLayerPxFromLonLat(d.lonlat);
			null == c ? d.display(!1) : d.isDrawn() ? d.icon && d.icon.moveTo(c) : (d = d.draw(c), this.div.appendChild(d))
		},
		getDataExtent : function () {
			var d = null;
			if (this.markers && 0 < this.markers.length) {
				for (var d = new OpenLayers.Bounds, f = 0, e = this.markers.length; f < e; f++) {
					d.extend(this.markers[f].lonlat)
				}
			}
			return d
		},
		CLASS_NAME : "OpenLayers.Layer.Markers"
	});
OpenLayers.Control.Pan = OpenLayers.Class(OpenLayers.Control, {
		slideFactor : 50,
		slideRatio : null,
		direction : null,
		type : OpenLayers.Control.TYPE_BUTTON,
		initialize : function (d, c) {
			this.direction = d;
			this.CLASS_NAME += this.direction;
			OpenLayers.Control.prototype.initialize.apply(this, [c])
		},
		trigger : function () {
			var b = OpenLayers.Function.bind(function (a) {
					return this.slideRatio ? this.map.getSize()[a] * this.slideRatio : this.slideFactor
				}, this);
			switch (this.direction) {
			case OpenLayers.Control.Pan.NORTH:
				this.map.pan(0, -b("h"));
				break;
			case OpenLayers.Control.Pan.SOUTH:
				this.map.pan(0, b("h"));
				break;
			case OpenLayers.Control.Pan.WEST:
				this.map.pan(-b("w"), 0);
				break;
			case OpenLayers.Control.Pan.EAST:
				this.map.pan(b("w"), 0)
			}
		},
		CLASS_NAME : "OpenLayers.Control.Pan"
	});
OpenLayers.Control.Pan.NORTH = "North";
OpenLayers.Control.Pan.SOUTH = "South";
OpenLayers.Control.Pan.EAST = "East";
OpenLayers.Control.Pan.WEST = "West";
OpenLayers.Format.CSWGetDomain = function (d) {
	d = OpenLayers.Util.applyDefaults(d, OpenLayers.Format.CSWGetDomain.DEFAULTS);
	var c = OpenLayers.Format.CSWGetDomain["v" + d.version.replace(/\./g, "_")];
	if (!c) {
		throw "Unsupported CSWGetDomain version: " + d.version
	}
	return new c(d)
};
OpenLayers.Format.CSWGetDomain.DEFAULTS = {
	version : "2.0.2"
};
OpenLayers.Format.CSWGetDomain.v2_0_2 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance",
			csw : "http://www.opengis.net/cat/csw/2.0.2"
		},
		defaultPrefix : "csw",
		version : "2.0.2",
		schemaLocation : "http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd",
		PropertyName : null,
		ParameterName : null,
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			return c
		},
		readers : {
			csw : {
				GetDomainResponse : function (d, c) {
					this.readChildNodes(d, c)
				},
				DomainValues : function (j, i) {
					OpenLayers.Util.isArray(i.DomainValues) || (i.DomainValues = []);
					for (var h = j.attributes, g = {}, l = 0, k = h.length; l < k; ++l) {
						g[h[l].name] = h[l].nodeValue
					}
					this.readChildNodes(j, g);
					i.DomainValues.push(g)
				},
				PropertyName : function (d, c) {
					c.PropertyName = this.getChildValue(d)
				},
				ParameterName : function (d, c) {
					c.ParameterName = this.getChildValue(d)
				},
				ListOfValues : function (d, c) {
					OpenLayers.Util.isArray(c.ListOfValues) || (c.ListOfValues = []);
					this.readChildNodes(d, c.ListOfValues)
				},
				Value : function (j, i) {
					for (var h = j.attributes, g = {}, l = 0, k = h.length; l < k; ++l) {
						g[h[l].name] = h[l].nodeValue
					}
					g.value = this.getChildValue(j);
					i.push({
						Value : g
					})
				},
				ConceptualScheme : function (d, c) {
					c.ConceptualScheme = {};
					this.readChildNodes(d, c.ConceptualScheme)
				},
				Name : function (d, c) {
					c.Name = this.getChildValue(d)
				},
				Document : function (d, c) {
					c.Document = this.getChildValue(d)
				},
				Authority : function (d, c) {
					c.Authority = this.getChildValue(d)
				},
				RangeOfValues : function (d, c) {
					c.RangeOfValues = {};
					this.readChildNodes(d, c.RangeOfValues)
				},
				MinValue : function (j, i) {
					for (var h = j.attributes, g = {}, l = 0, k = h.length; l < k; ++l) {
						g[h[l].name] = h[l].nodeValue
					}
					g.value = this.getChildValue(j);
					i.MinValue = g
				},
				MaxValue : function (j, i) {
					for (var h = j.attributes, g = {}, l = 0, k = h.length; l < k; ++l) {
						g[h[l].name] = h[l].nodeValue
					}
					g.value = this.getChildValue(j);
					i.MaxValue = g
				}
			}
		},
		write : function (b) {
			b = this.writeNode("csw:GetDomain", b);
			return OpenLayers.Format.XML.prototype.write.apply(this, [b])
		},
		writers : {
			csw : {
				GetDomain : function (d) {
					var c = this.createElementNSPlus("csw:GetDomain", {
							attributes : {
								service : "CSW",
								version : this.version
							}
						});
					if (d.PropertyName || this.PropertyName) {
						this.writeNode("csw:PropertyName", d.PropertyName || this.PropertyName, c)
					} else {
						if (d.ParameterName || this.ParameterName) {
							this.writeNode("csw:ParameterName", d.ParameterName || this.ParameterName, c)
						}
					}
					this.readChildNodes(c, d);
					return c
				},
				PropertyName : function (b) {
					return this.createElementNSPlus("csw:PropertyName", {
						value : b
					})
				},
				ParameterName : function (b) {
					return this.createElementNSPlus("csw:ParameterName", {
						value : b
					})
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.CSWGetDomain.v2_0_2"
	});
OpenLayers.Format.ArcXML.Features = OpenLayers.Class(OpenLayers.Format.XML, {
		read : function (b) {
			return (new OpenLayers.Format.ArcXML).read(b).features.feature
		}
	});
OpenLayers.Control.Snapping = OpenLayers.Class(OpenLayers.Control, {
		DEFAULTS : {
			tolerance : 10,
			node : !0,
			edge : !0,
			vertex : !0
		},
		greedy : !0,
		precedence : ["node", "vertex", "edge"],
		resolution : null,
		geoToleranceCache : null,
		layer : null,
		feature : null,
		point : null,
		initialize : function (b) {
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.options = b || {};
			this.options.layer && this.setLayer(this.options.layer);
			b = OpenLayers.Util.extend({}, this.options.defaults);
			this.defaults = OpenLayers.Util.applyDefaults(b, this.DEFAULTS);
			this.setTargets(this.options.targets);
			0 === this.targets.length && this.layer && this.addTargetLayer(this.layer);
			this.geoToleranceCache = {}

		},
		setLayer : function (b) {
			this.active ? (this.deactivate(), this.layer = b, this.activate()) : this.layer = b
		},
		setTargets : function (h) {
			this.targets = [];
			if (h && h.length) {
				for (var g, f = 0, e = h.length; f < e; ++f) {
					g = h[f],
					g instanceof OpenLayers.Layer.Vector ? this.addTargetLayer(g) : this.addTarget(g)
				}
			}
		},
		addTargetLayer : function (b) {
			this.addTarget({
				layer : b
			})
		},
		addTarget : function (b) {
			b = OpenLayers.Util.applyDefaults(b, this.defaults);
			b.nodeTolerance = b.nodeTolerance || b.tolerance;
			b.vertexTolerance = b.vertexTolerance || b.tolerance;
			b.edgeTolerance = b.edgeTolerance || b.tolerance;
			this.targets.push(b)
		},
		removeTargetLayer : function (d) {
			for (var f, e = this.targets.length - 1; 0 <= e; --e) {
				f = this.targets[e],
				f.layer === d && this.removeTarget(f)
			}
		},
		removeTarget : function (b) {
			return OpenLayers.Util.removeItem(this.targets, b)
		},
		activate : function () {
			var b = OpenLayers.Control.prototype.activate.call(this);
			if (b && this.layer && this.layer.events) {
				this.layer.events.on({
					sketchstarted : this.onSketchModified,
					sketchmodified : this.onSketchModified,
					vertexmodified : this.onVertexModified,
					scope : this
				})
			}
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Control.prototype.deactivate.call(this);
			b && this.layer && this.layer.events && this.layer.events.un({
				sketchstarted : this.onSketchModified,
				sketchmodified : this.onSketchModified,
				vertexmodified : this.onVertexModified,
				scope : this
			});
			this.point = this.feature = null;
			return b
		},
		onSketchModified : function (b) {
			this.feature = b.feature;
			this.considerSnapping(b.vertex, b.vertex)
		},
		onVertexModified : function (d) {
			this.feature = d.feature;
			var c = this.layer.map.getLonLatFromViewPortPx(d.pixel);
			this.considerSnapping(d.vertex, new OpenLayers.Geometry.Point(c.lon, c.lat))
		},
		considerSnapping : function (o, n) {
			for (var m = {
					rank : Number.POSITIVE_INFINITY,
					dist : Number.POSITIVE_INFINITY,
					x : null,
					y : null
				}, l = !1, k, j, i = 0, p = this.targets.length; i < p; ++i) {
				if (j = this.targets[i], k = this.testTarget(j, n)) {
					if (this.greedy) {
						m = k;
						m.target = j;
						l = !0;
						break
					} else {
						if (k.rank < m.rank || k.rank === m.rank && k.dist < m.dist) {
							m = k,
							m.target = j,
							l = !0
						}
					}
				}
			}
			l && (!1 !== this.events.triggerEvent("beforesnap", {
					point : o,
					x : m.x,
					y : m.y,
					distance : m.dist,
					layer : m.target.layer,
					snapType : this.precedence[m.rank]
				}) ? (o.x = m.x, o.y = m.y, this.point = o, this.events.triggerEvent("snap", {
						point : o,
						snapType : this.precedence[m.rank],
						layer : m.target.layer,
						distance : m.dist
					})) : l = !1);
			this.point && !l && (o.x = n.x, o.y = n.y, this.point = null, this.events.triggerEvent("unsnap", {
					point : o
				}))
		},
		testTarget : function (P, O) {
			var N = this.layer.map.getResolution();
			if ("minResolution" in P && N < P.minResolution || "maxResolution" in P && N >= P.maxResolution) {
				return null
			}
			for (var N = {
					node : this.getGeoTolerance(P.nodeTolerance, N),
					vertex : this.getGeoTolerance(P.vertexTolerance, N),
					edge : this.getGeoTolerance(P.edgeTolerance, N)
				}, M = Math.max(N.node, N.vertex, N.edge), L = {
					rank : Number.POSITIVE_INFINITY,
					dist : Number.POSITIVE_INFINITY
				}, K = !1, H = P.layer.features, F, E, D, C, B, A, z = this.precedence.length, y = new OpenLayers.LonLat(O.x, O.y), x = 0, J = H.length; x < J; ++x) {
				if (F = H[x], F !== this.feature && (!F._sketch && F.state !== OpenLayers.State.DELETE && (!P.filter || P.filter.evaluate(F))) && F.atPoint(y, M, M)) {
					for (var I = 0, G = Math.min(L.rank + 1, z); I < G; ++I) {
						if (E = this.precedence[I], P[E]) {
							if ("edge" === E) {
								if (D = F.geometry.distanceTo(O, {
											details : !0
										}), B = D.distance, B <= N[E] && B < L.dist) {
									L = {
										rank : I,
										dist : B,
										x : D.x0,
										y : D.y0
									};
									K = !0;
									break
								}
							} else {
								D = F.geometry.getVertices("node" === E);
								A = !1;
								for (var o = 0, i = D.length; o < i; ++o) {
									if (C = D[o], B = C.distanceTo(O), B <= N[E] && (I < L.rank || I === L.rank && B < L.dist)) {
										L = {
											rank : I,
											dist : B,
											x : C.x,
											y : C.y
										},
										A = K = !0
									}
								}
								if (A) {
									break
								}
							}
						}
					}
				}
			}
			return K ? L : null
		},
		getGeoTolerance : function (d, f) {
			f !== this.resolution && (this.resolution = f, this.geoToleranceCache = {});
			var e = this.geoToleranceCache[d];
			void 0 === e && (e = d * f, this.geoToleranceCache[d] = e);
			return e
		},
		destroy : function () {
			this.active && this.deactivate();
			delete this.layer;
			delete this.targets;
			OpenLayers.Control.prototype.destroy.call(this)
		},
		CLASS_NAME : "OpenLayers.Control.Snapping"
	});
OpenLayers.Date = {
	toISOString : function () {
		if ("toISOString" in Date.prototype) {
			return function (a) {
				return a.toISOString()
			}
		}
		var b = function (e, a) {
			for (var f = e + ""; f.length < a; ) {
				f = "0" + f
			}
			return f
		};
		return function (a) {
			return isNaN(a.getTime()) ? "Invalid Date" : a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1, 2) + "-" + b(a.getUTCDate(), 2) + "T" + b(a.getUTCHours(), 2) + ":" + b(a.getUTCMinutes(), 2) + ":" + b(a.getUTCSeconds(), 2) + "." + b(a.getUTCMilliseconds(), 3) + "Z"
		}
	}
	(),
	parse : function (l) {
		var k;
		if ((l = l.match(/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:(?:T(\d{1,2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|(?:[+-]\d{1,2}(?::(\d{2}))?)))|Z)?$/)) && (l[1] || l[7])) {
			k = parseInt(l[1], 10) || 0;
			var j = parseInt(l[2], 10) - 1 || 0,
			i = parseInt(l[3], 10) || 1;
			k = new Date(Date.UTC(k, j, i));
			if (j = l[7]) {
				var i = parseInt(l[4], 10),
				h = parseInt(l[5], 10),
				n = parseFloat(l[6]),
				m = n | 0,
				n = Math.round(1000 * (n - m));
				k.setUTCHours(i, h, m, n);
				"Z" !== j && (j = parseInt(j, 10), l = parseInt(l[8], 10) || 0, k = new Date(k.getTime() + -1000 * (60 * 60 * j + 60 * l)))
			}
		} else {
			k = new Date("invalid")
		}
		return k
	}
};
(function () {
	function r() {
		this._object = m && !i ? new m : new window.ActiveXObject("Microsoft.XMLHTTP");
		this._listeners = []
	}
	function q() {
		return new r
	}
	function p(a) {
		q.onreadystatechange && q.onreadystatechange.apply(a);
		a.dispatchEvent({
			type : "readystatechange",
			bubbles : !1,
			cancelable : !1,
			timeStamp : new Date + 0
		})
	}
	function o(g) {
		try {
			g.responseText = g._object.responseText
		} catch (f) {}

		try {
			var e;
			var d = g._object,
			c = d.responseXML,
			b = d.responseText;
			k && (b && c && !c.documentElement && d.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) && (c = new window.ActiveXObject("Microsoft.XMLDOM"), c.async = !1, c.validateOnParse = !1, c.loadXML(b));
			e = c && (k && 0 != c.parseError || !c.documentElement || c.documentElement && "parsererror" == c.documentElement.tagName) ? null : c;
			g.responseXML = e
		} catch (a) {}

		try {
			g.status = g._object.status
		} catch (h) {}

		try {
			g.statusText = g._object.statusText
		} catch (j) {}

	}
	function n(a) {
		a._object.onreadystatechange = new window.Function
	}
	var m = window.XMLHttpRequest,
	l = !!window.controllers,
	k = window.document.all && !window.opera,
	i = k && window.navigator.userAgent.match(/MSIE 7.0/);
	q.prototype = r.prototype;
	l && m.wrapped && (q.wrapped = m.wrapped);
	q.UNSENT = 0;
	q.OPENED = 1;
	q.HEADERS_RECEIVED = 2;
	q.LOADING = 3;
	q.DONE = 4;
	q.prototype.readyState = q.UNSENT;
	q.prototype.responseText = "";
	q.prototype.responseXML = null;
	q.prototype.status = 0;
	q.prototype.statusText = "";
	q.prototype.priority = "NORMAL";
	q.prototype.onreadystatechange = null;
	q.onreadystatechange = null;
	q.onopen = null;
	q.onsend = null;
	q.onabort = null;
	q.prototype.open = function (d, a, e, c, b) {
		delete this._headers;
		3 > arguments.length && (e = !0);
		this._async = e;
		var h = this,
		g = this.readyState,
		f;
		k && e && (f = function () {
			g != q.DONE && (n(h), h.abort())
		}, window.attachEvent("onunload", f));
		q.onopen && q.onopen.apply(this, arguments);
		4 < arguments.length ? this._object.open(d, a, e, c, b) : 3 < arguments.length ? this._object.open(d, a, e, c) : this._object.open(d, a, e);
		this.readyState = q.OPENED;
		p(this);
		this._object.onreadystatechange = function () {
			if (!l || e) {
				h.readyState = h._object.readyState,
				o(h),
				h._aborted ? h.readyState = q.UNSENT : (h.readyState == q.DONE && (delete h._data, n(h), k && e && window.detachEvent("onunload", f)), g != h.readyState && p(h), g = h.readyState)
			}
		}
	};
	q.prototype.send = function (a) {
		q.onsend && q.onsend.apply(this, arguments);
		arguments.length || (a = null);
		a && a.nodeType && (a = window.XMLSerializer ? (new window.XMLSerializer).serializeToString(a) : a.xml, this._headers["Content-Type"] || this._object.setRequestHeader("Content-Type", "application/xml"));
		this._data = a;
		a : if (this._object.send(this._data), l && !this._async) {
			this.readyState = q.OPENED;
			for (o(this); this.readyState < q.DONE; ) {
				if (this.readyState++, p(this), this._aborted) {
					break a
				}
			}
		}
	};
	q.prototype.abort = function () {
		q.onabort && q.onabort.apply(this, arguments);
		this.readyState > q.UNSENT && (this._aborted = !0);
		this._object.abort();
		n(this);
		this.readyState = q.UNSENT;
		delete this._data
	};
	q.prototype.getAllResponseHeaders = function () {
		return this._object.getAllResponseHeaders()
	};
	q.prototype.getResponseHeader = function (a) {
		return this._object.getResponseHeader(a)
	};
	q.prototype.setRequestHeader = function (b, a) {
		this._headers || (this._headers = {});
		this._headers[b] = a;
		return this._object.setRequestHeader(b, a)
	};
	q.prototype.addEventListener = function (a, e, b) {
		for (var d = 0, c; c = this._listeners[d]; d++) {
			if (c[0] == a && c[1] == e && c[2] == b) {
				return
			}
		}
		this._listeners.push([a, e, b])
	};
	q.prototype.removeEventListener = function (a, e, b) {
		for (var d = 0, c; (c = this._listeners[d]) && !(c[0] == a && c[1] == e && c[2] == b); d++) {}

		c && this._listeners.splice(d, 1)
	};
	q.prototype.dispatchEvent = function (b) {
		b = {
			type : b.type,
			target : this,
			currentTarget : this,
			eventPhase : 2,
			bubbles : b.bubbles,
			cancelable : b.cancelable,
			timeStamp : b.timeStamp,
			stopPropagation : function () {},
			preventDefault : function () {},
			initEvent : function () {}

		};
		"readystatechange" == b.type && this.onreadystatechange && (this.onreadystatechange.handleEvent || this.onreadystatechange).apply(this, [b]);
		for (var a = 0, c; c = this._listeners[a]; a++) {
			c[0] == b.type && !c[2] && (c[1].handleEvent || c[1]).apply(this, [b])
		}
	};
	q.prototype.toString = function () {
		return "[object XMLHttpRequest]"
	};
	q.toString = function () {
		return "[XMLHttpRequest]"
	};
	window.Function.prototype.apply || (window.Function.prototype.apply = function (b, a) {
		a || (a = []);
		b.__func = this;
		b.__func(a[0], a[1], a[2], a[3], a[4]);
		delete b.__func
	});
	OpenLayers.Request.XMLHttpRequest = q
})();
OpenLayers.Format.KML = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			kml : "http://www.opengis.net/kml/2.2",
			gx : "http://www.google.com/kml/ext/2.2"
		},
		kmlns : "http://earth.google.com/kml/2.0",
		placemarksDesc : "No description available",
		foldersName : "OpenLayers export",
		foldersDesc : "Exported on " + new Date,
		extractAttributes : !0,
		kvpAttributes : !1,
		extractStyles : !1,
		extractTracks : !1,
		trackAttributes : null,
		internalns : null,
		features : null,
		styles : null,
		styleBaseUrl : "",
		fetched : null,
		maxDepth : 0,
		initialize : function (b) {
			this.regExes = {
				trimSpace : /^\s*|\s*$/g,
				removeSpace : /\s*/g,
				splitSpace : /\s+/,
				trimComma : /\s*,\s*/g,
				kmlColor : /(\w{2})(\w{2})(\w{2})(\w{2})/,
				kmlIconPalette : /root:\/\/icons\/palette-(\d+)(\.\w+)/,
				straightBracket : /\$\[(.*?)\]/g
			};
			this.externalProjection = new OpenLayers.Projection("EPSG:4326");
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		read : function (b) {
			this.features = [];
			this.styles = {};
			this.fetched = {};
			return this.parseData(b, {
				depth : 0,
				styleBaseUrl : this.styleBaseUrl
			})
		},
		parseData : function (l, k) {
			"string" == typeof l && (l = OpenLayers.Format.XML.prototype.read.apply(this, [l]));
			for (var j = ["Link", "NetworkLink", "Style", "StyleMap", "Placemark"], i = 0, h = j.length; i < h; ++i) {
				var n = j[i],
				m = this.getElementsByTagNameNS(l, "*", n);
				if (0 != m.length) {
					switch (n.toLowerCase()) {
					case "link":
					case "networklink":
						this.parseLinks(m, k);
						break;
					case "style":
						this.extractStyles && this.parseStyles(m, k);
						break;
					case "stylemap":
						this.extractStyles && this.parseStyleMaps(m, k);
						break;
					case "placemark":
						this.parseFeatures(m, k)
					}
				}
			}
			return this.features
		},
		parseLinks : function (j, i) {
			if (i.depth >= this.maxDepth) {
				return !1
			}
			var h = OpenLayers.Util.extend({}, i);
			h.depth++;
			for (var g = 0, l = j.length; g < l; g++) {
				var k = this.parseProperty(j[g], "*", "href");
				k && !this.fetched[k] && (this.fetched[k] = !0, (k = this.fetchLink(k)) && this.parseData(k, h))
			}
		},
		fetchLink : function (b) {
			if (b = OpenLayers.Request.GET({
						url : b,
						async : !1
					})) {
				return b.responseText
			}
		},
		parseStyles : function (i, h) {
			for (var g = 0, f = i.length; g < f; g++) {
				var j = this.parseStyle(i[g]);
				j && (this.styles[(h.styleBaseUrl || "") + "#" + j.id] = j)
			}
		},
		parseKmlColor : function (d) {
			var c = null;
			d && (d = d.match(this.regExes.kmlColor)) && (c = {
					color : "#" + d[4] + d[3] + d[2],
					opacity : parseInt(d[1], 16) / 255
				});
			return c
		},
		parseStyle : function (u) {
			for (var t = {}, s = ["LineStyle", "PolyStyle", "IconStyle", "BalloonStyle", "LabelStyle"], r, q, p = 0, o = s.length; p < o; ++p) {
				if (r = s[p], q = this.getElementsByTagNameNS(u, "*", r)[0]) {
					switch (r.toLowerCase()) {
					case "linestyle":
						r = this.parseProperty(q, "*", "color");
						if (r = this.parseKmlColor(r)) {
							t.strokeColor = r.color,
							t.strokeOpacity = r.opacity
						}
						(r = this.parseProperty(q, "*", "width")) && (t.strokeWidth = r);
						break;
					case "polystyle":
						r = this.parseProperty(q, "*", "color");
						if (r = this.parseKmlColor(r)) {
							t.fillOpacity = r.opacity,
							t.fillColor = r.color
						}
						"0" == this.parseProperty(q, "*", "fill") && (t.fillColor = "none");
						"0" == this.parseProperty(q, "*", "outline") && (t.strokeWidth = "0");
						break;
					case "iconstyle":
						var i = parseFloat(this.parseProperty(q, "*", "scale") || 1);
						r = 32 * i;
						var z = 32 * i,
						y = this.getElementsByTagNameNS(q, "*", "Icon")[0];
						if (y) {
							var x = this.parseProperty(y, "*", "href");
							if (x) {
								var w = this.parseProperty(y, "*", "w"),
								v = this.parseProperty(y, "*", "h");
								OpenLayers.String.startsWith(x, "http://maps.google.com/mapfiles/kml") && (!w && !v) && (v = w = 64, i /= 2);
								w = w || v;
								v = v || w;
								w && (r = parseInt(w) * i);
								v && (z = parseInt(v) * i);
								if (v = x.match(this.regExes.kmlIconPalette)) {
									w = v[1],
									v = v[2],
									x = this.parseProperty(y, "*", "x"),
									y = this.parseProperty(y, "*", "y"),
									x = "http://maps.google.com/mapfiles/kml/pal" + w + "/icon" + (8 * (y ? 7 - y / 32 : 7) + (x ? x / 32 : 0)) + v
								}
								t.graphicOpacity = 1;
								t.externalGraphic = x
							}
						}
						if (q = this.getElementsByTagNameNS(q, "*", "hotSpot")[0]) {
							x = parseFloat(q.getAttribute("x")),
							y = parseFloat(q.getAttribute("y")),
							w = q.getAttribute("xunits"),
							"pixels" == w ? t.graphicXOffset = -x * i : "insetPixels" == w ? t.graphicXOffset = -r + x * i : "fraction" == w && (t.graphicXOffset = -r * x),
							q = q.getAttribute("yunits"),
							"pixels" == q ? t.graphicYOffset = -z + y * i + 1 : "insetPixels" == q ? t.graphicYOffset =  - (y * i) + 1 : "fraction" == q && (t.graphicYOffset = -z * (1 - y) + 1)
						}
						t.graphicWidth = r;
						t.graphicHeight = z;
						break;
					case "balloonstyle":
						(q = OpenLayers.Util.getXmlNodeValue(q)) && (t.balloonStyle = q.replace(this.regExes.straightBracket, "${$1}"));
						break;
					case "labelstyle":
						if (r = this.parseProperty(q, "*", "color"), r = this.parseKmlColor(r)) {
							t.fontColor = r.color,
							t.fontOpacity = r.opacity
						}
					}
				}
			}
			!t.strokeColor && t.fillColor && (t.strokeColor = t.fillColor);
			if ((u = u.getAttribute("id")) && t) {
				t.id = u
			}
			return t
		},
		parseStyleMaps : function (l, i) {
			for (var t = 0, s = l.length; t < s; t++) {
				for (var r = l[t], q = this.getElementsByTagNameNS(r, "*", "Pair"), r = r.getAttribute("id"), p = 0, o = q.length; p < o; p++) {
					var n = q[p],
					m = this.parseProperty(n, "*", "key");
					(n = this.parseProperty(n, "*", "styleUrl")) && "normal" == m && (this.styles[(i.styleBaseUrl || "") + "#" + r] = this.styles[(i.styleBaseUrl || "") + n])
				}
			}
		},
		parseFeatures : function (o, n) {
			for (var m = [], l = 0, k = o.length; l < k; l++) {
				var j = o[l],
				i = this.parseFeature.apply(this, [j]);
				if (i) {
					this.extractStyles && (i.attributes && i.attributes.styleUrl) && (i.style = this.getStyle(i.attributes.styleUrl, n));
					if (this.extractStyles) {
						var p = this.getElementsByTagNameNS(j, "*", "Style")[0];
						if (p && (p = this.parseStyle(p))) {
							i.style = OpenLayers.Util.extend(i.style, p)
						}
					}
					if (this.extractTracks) {
						if ((j = this.getElementsByTagNameNS(j, this.namespaces.gx, "Track")) && 0 < j.length) {
							i = {
								features : [],
								feature : i
							},
							this.readNode(j[0], i),
							0 < i.features.length && m.push.apply(m, i.features)
						}
					} else {
						m.push(i)
					}
				} else {
					throw "Bad Placemark: " + l
				}
			}
			this.features = this.features.concat(m)
		},
		readers : {
			kml : {
				when : function (d, c) {
					c.whens.push(OpenLayers.Date.parse(this.getChildValue(d)))
				},
				_trackPointAttribute : function (d, f) {
					var e = d.nodeName.split(":").pop();
					f.attributes[e].push(this.getChildValue(d))
				}
			},
			gx : {
				Track : function (l, i) {
					var t = {
						whens : [],
						points : [],
						angles : []
					};
					if (this.trackAttributes) {
						var s;
						t.attributes = {};
						for (var r = 0, q = this.trackAttributes.length; r < q; ++r) {
							s = this.trackAttributes[r],
							t.attributes[s] = [],
							s in this.readers.kml || (this.readers.kml[s] = this.readers.kml._trackPointAttribute)
						}
					}
					this.readChildNodes(l, t);
					if (t.whens.length !== t.points.length) {
						throw Error("gx:Track with unequal number of when (" + t.whens.length + ") and gx:coord (" + t.points.length + ") elements.")
					}
					var p = 0 < t.angles.length;
					if (p && t.whens.length !== t.angles.length) {
						throw Error("gx:Track with unequal number of when (" + t.whens.length + ") and gx:angles (" + t.angles.length + ") elements.")
					}
					for (var o, n, r = 0, q = t.whens.length; r < q; ++r) {
						o = i.feature.clone();
						o.fid = i.feature.fid || i.feature.id;
						n = t.points[r];
						o.geometry = n;
						"z" in n && (o.attributes.altitude = n.z);
						this.internalProjection && this.externalProjection && o.geometry.transform(this.externalProjection, this.internalProjection);
						if (this.trackAttributes) {
							n = 0;
							for (var m = this.trackAttributes.length; n < m; ++n) {
								o.attributes[s] = t.attributes[this.trackAttributes[n]][r]
							}
						}
						o.attributes.when = t.whens[r];
						o.attributes.trackId = i.feature.id;
						p && (n = t.angles[r], o.attributes.heading = parseFloat(n[0]), o.attributes.tilt = parseFloat(n[1]), o.attributes.roll = parseFloat(n[2]));
						i.features.push(o)
					}
				},
				coord : function (h, g) {
					var f = this.getChildValue(h).replace(this.regExes.trimSpace, "").split(/\s+/),
					e = new OpenLayers.Geometry.Point(f[0], f[1]);
					2 < f.length && (e.z = parseFloat(f[2]));
					g.points.push(e)
				},
				angles : function (d, f) {
					var e = this.getChildValue(d).replace(this.regExes.trimSpace, "").split(/\s+/);
					f.angles.push(e)
				}
			}
		},
		parseFeature : function (o) {
			for (var n = ["MultiGeometry", "Polygon", "LineString", "Point"], m, l, k, j = 0, i = n.length; j < i; ++j) {
				if (m = n[j], this.internalns = o.namespaceURI ? o.namespaceURI : this.kmlns, l = this.getElementsByTagNameNS(o, this.internalns, m), 0 < l.length) {
					if (n = this.parseGeometry[m.toLowerCase()]) {
						k = n.apply(this, [l[0]]),
						this.internalProjection && this.externalProjection && k.transform(this.externalProjection, this.internalProjection)
					} else {
						throw new TypeError("Unsupported geometry type: " + m)
					}
					break
				}
			}
			var p;
			this.extractAttributes && (p = this.parseAttributes(o));
			m = new OpenLayers.Feature.Vector(k, p);
			o = o.getAttribute("id") || o.getAttribute("name");
			null != o && (m.fid = o);
			return m
		},
		getStyle : function (h, g) {
			var f = OpenLayers.Util.removeTail(h),
			e = OpenLayers.Util.extend({}, g);
			e.depth++;
			e.styleBaseUrl = f;
			!this.styles[h] && !OpenLayers.String.startsWith(h, "#") && e.depth <= this.maxDepth && !this.fetched[f] && (f = this.fetchLink(f)) && this.parseData(f, e);
			return OpenLayers.Util.extend({}, this.styles[h])
		},
		parseGeometry : {
			point : function (d) {
				var f = this.getElementsByTagNameNS(d, this.internalns, "coordinates");
				d = [];
				if (0 < f.length) {
					var e = f[0].firstChild.nodeValue,
					e = e.replace(this.regExes.removeSpace, "");
					d = e.split(",")
				}
				f = null;
				if (1 < d.length) {
					2 == d.length && (d[2] = null),
					f = new OpenLayers.Geometry.Point(d[0], d[1], d[2])
				} else {
					throw "Bad coordinate string: " + e
				}
				return f
			},
			linestring : function (r, q) {
				var p = this.getElementsByTagNameNS(r, this.internalns, "coordinates"),
				o = null;
				if (0 < p.length) {
					for (var p = this.getChildValue(p[0]), p = p.replace(this.regExes.trimSpace, ""), p = p.replace(this.regExes.trimComma, ","), o = p.split(this.regExes.splitSpace), n = o.length, m = Array(n), l, k, i = 0; i < n; ++i) {
						if (l = o[i].split(","), k = l.length, 1 < k) {
							2 == l.length && (l[2] = null),
							m[i] = new OpenLayers.Geometry.Point(l[0], l[1], l[2])
						} else {
							throw "Bad LineString point coordinates: " + o[i]
						}
					}
					if (n) {
						o = q ? new OpenLayers.Geometry.LinearRing(m) : new OpenLayers.Geometry.LineString(m)
					} else {
						throw "Bad LineString coordinates: " + p
					}
				}
				return o
			},
			polygon : function (i) {
				i = this.getElementsByTagNameNS(i, this.internalns, "LinearRing");
				var h = i.length,
				g = Array(h);
				if (0 < h) {
					for (var f = 0, j = i.length; f < j; ++f) {
						if (h = this.parseGeometry.linestring.apply(this, [i[f], !0])) {
							g[f] = h
						} else {
							throw "Bad LinearRing geometry: " + f
						}
					}
				}
				return new OpenLayers.Geometry.Polygon(g)
			},
			multigeometry : function (j) {
				for (var i, h = [], g = j.childNodes, l = 0, k = g.length; l < k; ++l) {
					j = g[l],
					1 == j.nodeType && (i = j.prefix ? j.nodeName.split(":")[1] : j.nodeName, (i = this.parseGeometry[i.toLowerCase()]) && h.push(i.apply(this, [j])))
				}
				return new OpenLayers.Geometry.Collection(h)
			}
		},
		parseAttributes : function (l) {
			var k = {},
			j = l.getElementsByTagName("ExtendedData");
			j.length && (k = this.parseExtendedData(j[0]));
			var i,
			h,
			n;
			l = l.childNodes;
			for (var j = 0, m = l.length; j < m; ++j) {
				if (i = l[j], 1 == i.nodeType && (h = i.childNodes, 1 <= h.length && 3 >= h.length)) {
					switch (h.length) {
					case 1:
						n = h[0];
						break;
					case 2:
						n = h[0];
						h = h[1];
						n = 3 == n.nodeType || 4 == n.nodeType ? n : h;
						break;
					default:
						n = h[1]
					}
					if (3 == n.nodeType || 4 == n.nodeType) {
						if (i = i.prefix ? i.nodeName.split(":")[1] : i.nodeName, n = OpenLayers.Util.getXmlNodeValue(n)) {
							n = n.replace(this.regExes.trimSpace, ""),
							k[i] = n
						}
					}
				}
			}
			return k
		},
		parseExtendedData : function (r) {
			var q = {},
			p,
			o,
			n,
			m,
			l = r.getElementsByTagName("Data");
			p = 0;
			for (o = l.length; p < o; p++) {
				n = l[p];
				m = n.getAttribute("name");
				var k = {},
				i = n.getElementsByTagName("value");
				i.length && (k.value = this.getChildValue(i[0]));
				this.kvpAttributes ? q[m] = k.value : (n = n.getElementsByTagName("displayName"), n.length && (k.displayName = this.getChildValue(n[0])), q[m] = k)
			}
			r = r.getElementsByTagName("SimpleData");
			p = 0;
			for (o = r.length; p < o; p++) {
				k = {},
				n = r[p],
				m = n.getAttribute("name"),
				k.value = this.getChildValue(n),
				this.kvpAttributes ? q[m] = k.value : (k.displayName = m, q[m] = k)
			}
			return q
		},
		parseProperty : function (i, h, g) {
			var f;
			i = this.getElementsByTagNameNS(i, h, g);
			try {
				f = OpenLayers.Util.getXmlNodeValue(i[0])
			} catch (j) {
				f = null
			}
			return f
		},
		write : function (i) {
			OpenLayers.Util.isArray(i) || (i = [i]);
			for (var h = this.createElementNS(this.kmlns, "kml"), g = this.createFolderXML(), f = 0, j = i.length; f < j; ++f) {
				g.appendChild(this.createPlacemarkXML(i[f]))
			}
			h.appendChild(g);
			return OpenLayers.Format.XML.prototype.write.apply(this, [h])
		},
		createFolderXML : function () {
			var d = this.createElementNS(this.kmlns, "Folder");
			if (this.foldersName) {
				var f = this.createElementNS(this.kmlns, "name"),
				e = this.createTextNode(this.foldersName);
				f.appendChild(e);
				d.appendChild(f)
			}
			this.foldersDesc && (f = this.createElementNS(this.kmlns, "description"), e = this.createTextNode(this.foldersDesc), f.appendChild(e), d.appendChild(f));
			return d
		},
		createPlacemarkXML : function (h) {
			var g = this.createElementNS(this.kmlns, "name");
			g.appendChild(this.createTextNode(h.style && h.style.label ? h.style.label : h.attributes.name || h.id));
			var f = this.createElementNS(this.kmlns, "description");
			f.appendChild(this.createTextNode(h.attributes.description || this.placemarksDesc));
			var e = this.createElementNS(this.kmlns, "Placemark");
			null != h.fid && e.setAttribute("id", h.fid);
			e.appendChild(g);
			e.appendChild(f);
			g = this.buildGeometryNode(h.geometry);
			e.appendChild(g);
			h.attributes && (h = this.buildExtendedData(h.attributes)) && e.appendChild(h);
			return e
		},
		buildGeometryNode : function (d) {
			var f = d.CLASS_NAME,
			f = f.substring(f.lastIndexOf(".") + 1),
			f = this.buildGeometry[f.toLowerCase()],
			e = null;
			f && (e = f.apply(this, [d]));
			return e
		},
		buildGeometry : {
			point : function (d) {
				var c = this.createElementNS(this.kmlns, "Point");
				c.appendChild(this.buildCoordinatesNode(d));
				return c
			},
			multipoint : function (b) {
				return this.buildGeometry.collection.apply(this, [b])
			},
			linestring : function (d) {
				var c = this.createElementNS(this.kmlns, "LineString");
				c.appendChild(this.buildCoordinatesNode(d));
				return c
			},
			multilinestring : function (b) {
				return this.buildGeometry.collection.apply(this, [b])
			},
			linearring : function (d) {
				var c = this.createElementNS(this.kmlns, "LinearRing");
				c.appendChild(this.buildCoordinatesNode(d));
				return c
			},
			polygon : function (j) {
				var i = this.createElementNS(this.kmlns, "Polygon");
				j = j.components;
				for (var h, g, l = 0, k = j.length; l < k; ++l) {
					h = 0 == l ? "outerBoundaryIs" : "innerBoundaryIs",
					h = this.createElementNS(this.kmlns, h),
					g = this.buildGeometry.linearring.apply(this, [j[l]]),
					h.appendChild(g),
					i.appendChild(h)
				}
				return i
			},
			multipolygon : function (b) {
				return this.buildGeometry.collection.apply(this, [b])
			},
			collection : function (i) {
				for (var h = this.createElementNS(this.kmlns, "MultiGeometry"), g, f = 0, j = i.components.length; f < j; ++f) {
					(g = this.buildGeometryNode.apply(this, [i.components[f]])) && h.appendChild(g)
				}
				return h
			}
		},
		buildCoordinatesNode : function (j) {
			var i = this.createElementNS(this.kmlns, "coordinates"),
			h;
			if (h = j.components) {
				for (var g = h.length, l = Array(g), k = 0; k < g; ++k) {
					j = h[k],
					l[k] = this.buildCoordinates(j)
				}
				h = l.join(" ")
			} else {
				h = this.buildCoordinates(j)
			}
			h = this.createTextNode(h);
			i.appendChild(h);
			return i
		},
		buildCoordinates : function (b) {
			this.internalProjection && this.externalProjection && (b = b.clone(), b.transform(this.internalProjection, this.externalProjection));
			return b.x + "," + b.y
		},
		buildExtendedData : function (j) {
			var i = this.createElementNS(this.kmlns, "ExtendedData"),
			h;
			for (h in j) {
				if (j[h] && "name" != h && "description" != h && "styleUrl" != h) {
					var g = this.createElementNS(this.kmlns, "Data");
					g.setAttribute("name", h);
					var l = this.createElementNS(this.kmlns, "value");
					if ("object" == typeof j[h]) {
						if (j[h].value && l.appendChild(this.createTextNode(j[h].value)), j[h].displayName) {
							var k = this.createElementNS(this.kmlns, "displayName");
							k.appendChild(this.getXMLDoc().createCDATASection(j[h].displayName));
							g.appendChild(k)
						}
					} else {
						l.appendChild(this.createTextNode(j[h]))
					}
					g.appendChild(l);
					i.appendChild(g)
				}
			}
			return this.isSimpleContent(i) ? null : i
		},
		CLASS_NAME : "OpenLayers.Format.KML"
	});
OpenLayers.Popup = OpenLayers.Class({
		events : null,
		id : "",
		lonlat : null,
		div : null,
		contentSize : null,
		size : null,
		contentHTML : null,
		backgroundColor : "",
		opacity : "",
		border : "",
		contentDiv : null,
		groupDiv : null,
		closeDiv : null,
		autoSize : !1,
		minSize : null,
		maxSize : null,
		displayClass : "olPopup",
		contentDisplayClass : "olPopupContent",
		padding : 0,
		disableFirefoxOverflowHack : !1,
		fixPadding : function () {
			"number" == typeof this.padding && (this.padding = new OpenLayers.Bounds(this.padding, this.padding, this.padding, this.padding))
		},
		panMapIfOutOfView : !1,
		keepInMap : !1,
		closeOnMove : !1,
		map : null,
		initialize : function (j, i, h, g, l, k) {
			null == j && (j = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_"));
			this.id = j;
			this.lonlat = i;
			this.contentSize = null != h ? h : new OpenLayers.Size(OpenLayers.Popup.WIDTH, OpenLayers.Popup.HEIGHT);
			null != g && (this.contentHTML = g);
			this.backgroundColor = OpenLayers.Popup.COLOR;
			this.opacity = OpenLayers.Popup.OPACITY;
			this.border = OpenLayers.Popup.BORDER;
			this.div = OpenLayers.Util.createDiv(this.id, null, null, null, null, null, "hidden");
			this.div.className = this.displayClass;
			this.groupDiv = OpenLayers.Util.createDiv(this.id + "_GroupDiv", null, null, null, "relative", null, "hidden");
			j = this.div.id + "_contentDiv";
			this.contentDiv = OpenLayers.Util.createDiv(j, null, this.contentSize.clone(), null, "relative");
			this.contentDiv.className = this.contentDisplayClass;
			this.groupDiv.appendChild(this.contentDiv);
			this.div.appendChild(this.groupDiv);
			l && this.addCloseBox(k);
			this.registerEvents()
		},
		destroy : function () {
			this.border = this.opacity = this.backgroundColor = this.contentHTML = this.size = this.lonlat = this.id = null;
			this.closeOnMove && this.map && this.map.events.unregister("movestart", this, this.hide);
			this.events.destroy();
			this.events = null;
			this.closeDiv && (OpenLayers.Event.stopObservingElement(this.closeDiv), this.groupDiv.removeChild(this.closeDiv));
			this.closeDiv = null;
			this.div.removeChild(this.groupDiv);
			this.groupDiv = null;
			null != this.map && this.map.removePopup(this);
			this.panMapIfOutOfView = this.padding = this.maxSize = this.minSize = this.autoSize = this.div = this.map = null
		},
		draw : function (b) {
			null == b && null != this.lonlat && null != this.map && (b = this.map.getLayerPxFromLonLat(this.lonlat));
			this.closeOnMove && this.map.events.register("movestart", this, this.hide);
			!this.disableFirefoxOverflowHack && "firefox" == OpenLayers.BROWSER_NAME && (this.map.events.register("movestart", this, function () {
					var a = document.defaultView.getComputedStyle(this.contentDiv, null).getPropertyValue("overflow");
					"hidden" != a && (this.contentDiv._oldOverflow = a, this.contentDiv.style.overflow = "hidden")
				}), this.map.events.register("moveend", this, function () {
					var a = this.contentDiv._oldOverflow;
					a && (this.contentDiv.style.overflow = a, this.contentDiv._oldOverflow = null)
				}));
			this.moveTo(b);
			!this.autoSize && !this.size && this.setSize(this.contentSize);
			this.setBackgroundColor();
			this.setOpacity();
			this.setBorder();
			this.setContentHTML();
			this.panMapIfOutOfView && this.panIntoView();
			return this.div
		},
		updatePosition : function () {
			if (this.lonlat && this.map) {
				var b = this.map.getLayerPxFromLonLat(this.lonlat);
				b && this.moveTo(b)
			}
		},
		moveTo : function (b) {
			null != b && null != this.div && (this.div.style.left = b.x + "px", this.div.style.top = b.y + "px")
		},
		visible : function () {
			return OpenLayers.Element.visible(this.div)
		},
		toggle : function () {
			this.visible() ? this.hide() : this.show()
		},
		show : function () {
			this.div.style.display = "";
			this.panMapIfOutOfView && this.panIntoView()
		},
		hide : function () {
			this.div.style.display = "none"
		},
		setSize : function (i) {
			this.size = i.clone();
			var h = this.getContentDivPadding(),
			g = h.left + h.right,
			f = h.top + h.bottom;
			this.fixPadding();
			g += this.padding.left + this.padding.right;
			f += this.padding.top + this.padding.bottom;
			if (this.closeDiv) {
				var j = parseInt(this.closeDiv.style.width),
				g = g + (j + h.right)
			}
			this.size.w += g;
			this.size.h += f;
			"msie" == OpenLayers.BROWSER_NAME && (this.contentSize.w += h.left + h.right, this.contentSize.h += h.bottom + h.top);
			null != this.div && (this.div.style.width = this.size.w + "px", this.div.style.height = this.size.h + "px");
			null != this.contentDiv && (this.contentDiv.style.width = i.w + "px", this.contentDiv.style.height = i.h + "px")
		},
		updateSize : function () {
			var i = "<div class='" + this.contentDisplayClass + "'>" + this.contentDiv.innerHTML + "</div>",
			h = this.map ? this.map.div : document.body,
			g = OpenLayers.Util.getRenderedDimensions(i, null, {
					displayClass : this.displayClass,
					containerElement : h
				}),
			f = this.getSafeContentSize(g),
			j = null;
			f.equals(g) ? j = g : (g = {
						w : f.w < g.w ? f.w : null,
						h : f.h < g.h ? f.h : null
					}, g.w && g.h ? j = f : (i = OpenLayers.Util.getRenderedDimensions(i, g, {
									displayClass : this.contentDisplayClass,
									containerElement : h
								}), "hidden" != OpenLayers.Element.getStyle(this.contentDiv, "overflow") && i.equals(f) && (f = OpenLayers.Util.getScrollbarWidth(), g.w ? i.h += f : i.w += f), j = this.getSafeContentSize(i)));
			this.setSize(j)
		},
		setBackgroundColor : function (b) {
			void 0 != b && (this.backgroundColor = b);
			null != this.div && (this.div.style.backgroundColor = this.backgroundColor)
		},
		setOpacity : function (b) {
			void 0 != b && (this.opacity = b);
			null != this.div && (this.div.style.opacity = this.opacity, this.div.style.filter = "alpha(opacity=" + 100 * this.opacity + ")")
		},
		setBorder : function (b) {
			void 0 != b && (this.border = b);
			null != this.div && (this.div.style.border = this.border)
		},
		setContentHTML : function (b) {
			null != b && (this.contentHTML = b);
			null != this.contentDiv && (null != this.contentHTML && this.contentHTML != this.contentDiv.innerHTML) && (this.contentDiv.innerHTML = this.contentHTML, this.autoSize && (this.registerImageListeners(), this.updateSize()))
		},
		registerImageListeners : function () {
			for (var i = function () {
				null !== this.popup.id && (this.popup.updateSize(), this.popup.visible() && this.popup.panMapIfOutOfView && this.popup.panIntoView(), OpenLayers.Event.stopObserving(this.img, "load", this.img._onImageLoad))
			}, h = this.contentDiv.getElementsByTagName("img"), g = 0, f = h.length; g < f; g++) {
				var j = h[g];
				if (0 == j.width || 0 == j.height) {
					j._onImgLoad = OpenLayers.Function.bind(i, {
							popup : this,
							img : j
						}),
					OpenLayers.Event.observe(j, "load", j._onImgLoad)
				}
			}
		},
		getSafeContentSize : function (i) {
			i = i.clone();
			var h = this.getContentDivPadding(),
			g = h.left + h.right,
			f = h.top + h.bottom;
			this.fixPadding();
			g += this.padding.left + this.padding.right;
			f += this.padding.top + this.padding.bottom;
			if (this.closeDiv) {
				var j = parseInt(this.closeDiv.style.width),
				g = g + (j + h.right)
			}
			this.minSize && (i.w = Math.max(i.w, this.minSize.w - g), i.h = Math.max(i.h, this.minSize.h - f));
			this.maxSize && (i.w = Math.min(i.w, this.maxSize.w - g), i.h = Math.min(i.h, this.maxSize.h - f));
			if (this.map && this.map.size) {
				j = h = 0;
				if (this.keepInMap && !this.panMapIfOutOfView) {
					switch (j = this.map.getPixelFromLonLat(this.lonlat), this.relativePosition) {
					case "tr":
						h = j.x;
						j = this.map.size.h - j.y;
						break;
					case "tl":
						h = this.map.size.w - j.x;
						j = this.map.size.h - j.y;
						break;
					case "bl":
						h = this.map.size.w - j.x;
						j = j.y;
						break;
					case "br":
						h = j.x;
						j = j.y;
						break;
					default:
						h = j.x,
						j = this.map.size.h - j.y
					}
				}
				f = this.map.size.h - this.map.paddingForPopups.top - this.map.paddingForPopups.bottom - f - j;
				i.w = Math.min(i.w, this.map.size.w - this.map.paddingForPopups.left - this.map.paddingForPopups.right - g - h);
				i.h = Math.min(i.h, f)
			}
			return i
		},
		getContentDivPadding : function () {
			var b = this._contentDivPadding;
			b || (null == this.div.parentNode && (this.div.style.display = "none", document.body.appendChild(this.div)), this._contentDivPadding = b = new OpenLayers.Bounds(OpenLayers.Element.getStyle(this.contentDiv, "padding-left"), OpenLayers.Element.getStyle(this.contentDiv, "padding-bottom"), OpenLayers.Element.getStyle(this.contentDiv, "padding-right"), OpenLayers.Element.getStyle(this.contentDiv, "padding-top")), this.div.parentNode == document.body && (document.body.removeChild(this.div), this.div.style.display = ""));
			return b
		},
		addCloseBox : function (d) {
			this.closeDiv = OpenLayers.Util.createDiv(this.id + "_close", null, {
					w : 17,
					h : 17
				});
			this.closeDiv.className = "olPopupCloseBox";
			var c = this.getContentDivPadding();
			this.closeDiv.style.right = c.right + "px";
			this.closeDiv.style.top = c.top + "px";
			this.groupDiv.appendChild(this.closeDiv);
			d = d || function (a) {
				this.hide();
				OpenLayers.Event.stop(a)
			};
			OpenLayers.Event.observe(this.closeDiv, "touchend", OpenLayers.Function.bindAsEventListener(d, this));
			OpenLayers.Event.observe(this.closeDiv, "click", OpenLayers.Function.bindAsEventListener(d, this))
		},
		panIntoView : function () {
			var d = this.map.getSize(),
			f = this.map.getViewPortPxFromLayerPx(new OpenLayers.Pixel(parseInt(this.div.style.left), parseInt(this.div.style.top))),
			e = f.clone();
			f.x < this.map.paddingForPopups.left ? e.x = this.map.paddingForPopups.left : f.x + this.size.w > d.w - this.map.paddingForPopups.right && (e.x = d.w - this.map.paddingForPopups.right - this.size.w);
			f.y < this.map.paddingForPopups.top ? e.y = this.map.paddingForPopups.top : f.y + this.size.h > d.h - this.map.paddingForPopups.bottom && (e.y = d.h - this.map.paddingForPopups.bottom - this.size.h);
			this.map.pan(f.x - e.x, f.y - e.y)
		},
		registerEvents : function () {
			this.events = new OpenLayers.Events(this, this.div, null, !0);
			this.events.on({
				mousedown : this.onmousedown,
				mousemove : this.onmousemove,
				mouseup : this.onmouseup,
				click : this.onclick,
				mouseout : this.onmouseout,
				dblclick : this.ondblclick,
				touchstart : function (b) {
					OpenLayers.Event.stop(b, !0)
				},
				scope : this
			})
		},
		onmousedown : function (b) {
			this.mousedown = !0;
			OpenLayers.Event.stop(b, !0)
		},
		onmousemove : function (b) {
			this.mousedown && OpenLayers.Event.stop(b, !0)
		},
		onmouseup : function (b) {
			this.mousedown && (this.mousedown = !1, OpenLayers.Event.stop(b, !0))
		},
		onclick : function (b) {
			OpenLayers.Event.stop(b, !0)
		},
		onmouseout : function () {
			this.mousedown = !1
		},
		ondblclick : function (b) {
			OpenLayers.Event.stop(b, !0)
		},
		CLASS_NAME : "OpenLayers.Popup"
	});
OpenLayers.Popup.WIDTH = 200;
OpenLayers.Popup.HEIGHT = 200;
OpenLayers.Popup.COLOR = "white";
OpenLayers.Popup.OPACITY = 1;
OpenLayers.Popup.BORDER = "0px";
OpenLayers.Popup.Anchored = OpenLayers.Class(OpenLayers.Popup, {
		relativePosition : null,
		keepInMap : !0,
		anchor : null,
		initialize : function (l, k, j, i, h, n, m) {
			OpenLayers.Popup.prototype.initialize.apply(this, [l, k, j, i, n, m]);
			this.anchor = null != h ? h : {
				size : new OpenLayers.Size(0, 0),
				offset : new OpenLayers.Pixel(0, 0)
			}
		},
		destroy : function () {
			this.relativePosition = this.anchor = null;
			OpenLayers.Popup.prototype.destroy.apply(this, arguments)
		},
		show : function () {
			this.updatePosition();
			OpenLayers.Popup.prototype.show.apply(this, arguments)
		},
		moveTo : function (d) {
			var c = this.relativePosition;
			this.relativePosition = this.calculateRelativePosition(d);
			d = this.calculateNewPx(d);
			OpenLayers.Popup.prototype.moveTo.apply(this, Array(d));
			this.relativePosition != c && this.updateRelativePosition()
		},
		setSize : function (d) {
			OpenLayers.Popup.prototype.setSize.apply(this, arguments);
			if (this.lonlat && this.map) {
				var c = this.map.getLayerPxFromLonLat(this.lonlat);
				this.moveTo(c)
			}
		},
		calculateRelativePosition : function (b) {
			b = this.map.getLonLatFromLayerPx(b);
			b = this.map.getExtent().determineQuadrant(b);
			return OpenLayers.Bounds.oppositeQuadrant(b)
		},
		updateRelativePosition : function () {},
		calculateNewPx : function (d) {
			d = d.offset(this.anchor.offset);
			var f = this.size || this.contentSize,
			e = "t" == this.relativePosition.charAt(0);
			d.y += e ? -f.h : this.anchor.size.h;
			e = "l" == this.relativePosition.charAt(1);
			d.x += e ? -f.w : this.anchor.size.w;
			return d
		},
		CLASS_NAME : "OpenLayers.Popup.Anchored"
	});
OpenLayers.Console.warn("OpenLayers.Rico is deprecated");
OpenLayers.Rico = OpenLayers.Rico || {};
OpenLayers.Rico.Color = OpenLayers.Class({
		initialize : function (d, f, e) {
			this.rgb = {
				r : d,
				g : f,
				b : e
			}
		},
		setRed : function (b) {
			this.rgb.r = b
		},
		setGreen : function (b) {
			this.rgb.g = b
		},
		setBlue : function (b) {
			this.rgb.b = b
		},
		setHue : function (d) {
			var c = this.asHSB();
			c.h = d;
			this.rgb = OpenLayers.Rico.Color.HSBtoRGB(c.h, c.s, c.b)
		},
		setSaturation : function (d) {
			var c = this.asHSB();
			c.s = d;
			this.rgb = OpenLayers.Rico.Color.HSBtoRGB(c.h, c.s, c.b)
		},
		setBrightness : function (d) {
			var c = this.asHSB();
			c.b = d;
			this.rgb = OpenLayers.Rico.Color.HSBtoRGB(c.h, c.s, c.b)
		},
		darken : function (d) {
			var c = this.asHSB();
			this.rgb = OpenLayers.Rico.Color.HSBtoRGB(c.h, c.s, Math.max(c.b - d, 0))
		},
		brighten : function (d) {
			var c = this.asHSB();
			this.rgb = OpenLayers.Rico.Color.HSBtoRGB(c.h, c.s, Math.min(c.b + d, 1))
		},
		blend : function (b) {
			this.rgb.r = Math.floor((this.rgb.r + b.rgb.r) / 2);
			this.rgb.g = Math.floor((this.rgb.g + b.rgb.g) / 2);
			this.rgb.b = Math.floor((this.rgb.b + b.rgb.b) / 2)
		},
		isBright : function () {
			this.asHSB();
			return 0.5 < this.asHSB().b
		},
		isDark : function () {
			return !this.isBright()
		},
		asRGB : function () {
			return "rgb(" + this.rgb.r + "," + this.rgb.g + "," + this.rgb.b + ")"
		},
		asHex : function () {
			return "#" + this.rgb.r.toColorPart() + this.rgb.g.toColorPart() + this.rgb.b.toColorPart()
		},
		asHSB : function () {
			return OpenLayers.Rico.Color.RGBtoHSB(this.rgb.r, this.rgb.g, this.rgb.b)
		},
		toString : function () {
			return this.asHex()
		}
	});
OpenLayers.Rico.Color.createFromHex = function (d) {
	if (4 == d.length) {
		var f = d;
		d = "#";
		for (var e = 1; 4 > e; e++) {
			d += f.charAt(e) + f.charAt(e)
		}
	}
	0 == d.indexOf("#") && (d = d.substring(1));
	f = d.substring(0, 2);
	e = d.substring(2, 4);
	d = d.substring(4, 6);
	return new OpenLayers.Rico.Color(parseInt(f, 16), parseInt(e, 16), parseInt(d, 16))
};
OpenLayers.Rico.Color.createColorFromBackground = function (d) {
	var c = OpenLayers.Element.getStyle(OpenLayers.Util.getElement(d), "backgroundColor");
	return "transparent" == c && d.parentNode ? OpenLayers.Rico.Color.createColorFromBackground(d.parentNode) : null == c ? new OpenLayers.Rico.Color(255, 255, 255) : 0 == c.indexOf("rgb(") ? (d = c.substring(4, c.length - 1).split(","), new OpenLayers.Rico.Color(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]))) : 0 == c.indexOf("#") ? OpenLayers.Rico.Color.createFromHex(c) : new OpenLayers.Rico.Color(255, 255, 255)
};
OpenLayers.Rico.Color.HSBtoRGB = function (r, q, p) {
	var o = 0,
	n = 0,
	m = 0;
	if (0 == q) {
		m = n = o = parseInt(255 * p + 0.5)
	} else {
		r = 6 * (r - Math.floor(r));
		var l = r - Math.floor(r),
		k = p * (1 - q),
		i = p * (1 - q * l);
		q = p * (1 - q * (1 - l));
		switch (parseInt(r)) {
		case 0:
			o = 255 * p + 0.5;
			n = 255 * q + 0.5;
			m = 255 * k + 0.5;
			break;
		case 1:
			o = 255 * i + 0.5;
			n = 255 * p + 0.5;
			m = 255 * k + 0.5;
			break;
		case 2:
			o = 255 * k + 0.5;
			n = 255 * p + 0.5;
			m = 255 * q + 0.5;
			break;
		case 3:
			o = 255 * k + 0.5;
			n = 255 * i + 0.5;
			m = 255 * p + 0.5;
			break;
		case 4:
			o = 255 * q + 0.5;
			n = 255 * k + 0.5;
			m = 255 * p + 0.5;
			break;
		case 5:
			o = 255 * p + 0.5,
			n = 255 * k + 0.5,
			m = 255 * i + 0.5
		}
	}
	return {
		r : parseInt(o),
		g : parseInt(n),
		b : parseInt(m)
	}
};
OpenLayers.Rico.Color.RGBtoHSB = function (o, n, m) {
	var l,
	k = o > n ? o : n;
	m > k && (k = m);
	var j = o < n ? o : n;
	m < j && (j = m);
	l = 0 != k ? (k - j) / k : 0;
	if (0 == l) {
		o = 0
	} else {
		var i = (k - o) / (k - j),
		p = (k - n) / (k - j);
		m = (k - m) / (k - j);
		o = (o == k ? m - p : n == k ? 2 + i - m : 4 + p - i) / 6;
		0 > o && (o += 1)
	}
	return {
		h : o,
		s : l,
		b : k / 255
	}
};
OpenLayers.Console.warn("OpenLayers.Rico is deprecated");
OpenLayers.Rico = OpenLayers.Rico || {};
OpenLayers.Rico.Corner = {
	round : function (h, g) {
		h = OpenLayers.Util.getElement(h);
		this._setOptions(g);
		var f = this.options.color;
		"fromElement" == this.options.color && (f = this._background(h));
		var e = this.options.bgColor;
		"fromParent" == this.options.bgColor && (e = this._background(h.offsetParent));
		this._roundCornersImpl(h, f, e)
	},
	changeColor : function (h, g) {
		h.style.backgroundColor = g;
		for (var f = h.parentNode.getElementsByTagName("span"), e = 0; e < f.length; e++) {
			f[e].style.backgroundColor = g
		}
	},
	changeOpacity : function (i, h) {
		var g = "alpha(opacity=" + 100 * h + ")";
		i.style.opacity = h;
		i.style.filter = g;
		for (var f = i.parentNode.getElementsByTagName("span"), j = 0; j < f.length; j++) {
			f[j].style.opacity = h,
			f[j].style.filter = g
		}
	},
	reRound : function (d, f) {
		var e = d.parentNode.childNodes[2];
		d.parentNode.removeChild(d.parentNode.childNodes[0]);
		d.parentNode.removeChild(e);
		this.round(d.parentNode, f)
	},
	_roundCornersImpl : function (d, f, e) {
		this.options.border && this._renderBorder(d, e);
		this._isTopRounded() && this._roundTopCorners(d, f, e);
		this._isBottomRounded() && this._roundBottomCorners(d, f, e)
	},
	_renderBorder : function (d, f) {
		var e = "1px solid " + this._borderColor(f);
		d.innerHTML = "<div " + ("style='border-left: " + e + ";" + ("border-right: " + e) + "'") + ">" + d.innerHTML + "</div>"
	},
	_roundTopCorners : function (i, h, g) {
		for (var f = this._createCorner(g), j = 0; j < this.options.numSlices; j++) {
			f.appendChild(this._createCornerSlice(h, g, j, "top"))
		}
		i.style.paddingTop = 0;
		i.insertBefore(f, i.firstChild)
	},
	_roundBottomCorners : function (i, h, g) {
		for (var f = this._createCorner(g), j = this.options.numSlices - 1; 0 <= j; j--) {
			f.appendChild(this._createCornerSlice(h, g, j, "bottom"))
		}
		i.style.paddingBottom = 0;
		i.appendChild(f)
	},
	_createCorner : function (d) {
		var c = document.createElement("div");
		c.style.backgroundColor = this._isTransparent() ? "transparent" : d;
		return c
	},
	_createCornerSlice : function (j, i, h, g) {
		var l = document.createElement("span"),
		k = l.style;
		k.backgroundColor = j;
		k.display = "block";
		k.height = "1px";
		k.overflow = "hidden";
		k.fontSize = "1px";
		j = this._borderColor(j, i);
		this.options.border && 0 == h ? (k.borderTopStyle = "solid", k.borderTopWidth = "1px", k.borderLeftWidth = "0px", k.borderRightWidth = "0px", k.borderBottomWidth = "0px", k.height = "0px", k.borderColor = j) : j && (k.borderColor = j, k.borderStyle = "solid", k.borderWidth = "0px 1px");
		!this.options.compact && h == this.options.numSlices - 1 && (k.height = "2px");
		this._setMargin(l, h, g);
		this._setBorder(l, h, g);
		return l
	},
	_setOptions : function (b) {
		this.options = {
			corners : "all",
			color : "fromElement",
			bgColor : "fromParent",
			blend : !0,
			border : !1,
			compact : !1
		};
		OpenLayers.Util.extend(this.options, b || {});
		this.options.numSlices = this.options.compact ? 2 : 4;
		this._isTransparent() && (this.options.blend = !1)
	},
	_whichSideTop : function () {
		return this._hasString(this.options.corners, "all", "top") || 0 <= this.options.corners.indexOf("tl") && 0 <= this.options.corners.indexOf("tr") ? "" : 0 <= this.options.corners.indexOf("tl") ? "left" : 0 <= this.options.corners.indexOf("tr") ? "right" : ""
	},
	_whichSideBottom : function () {
		return this._hasString(this.options.corners, "all", "bottom") || 0 <= this.options.corners.indexOf("bl") && 0 <= this.options.corners.indexOf("br") ? "" : 0 <= this.options.corners.indexOf("bl") ? "left" : 0 <= this.options.corners.indexOf("br") ? "right" : ""
	},
	_borderColor : function (d, c) {
		return "transparent" == d ? c : this.options.border ? this.options.border : this.options.blend ? this._blend(c, d) : ""
	},
	_setMargin : function (d, f, e) {
		f = this._marginSize(f);
		e = "top" == e ? this._whichSideTop() : this._whichSideBottom();
		"left" == e ? (d.style.marginLeft = f + "px", d.style.marginRight = "0px") : "right" == e ? (d.style.marginRight = f + "px", d.style.marginLeft = "0px") : (d.style.marginLeft = f + "px", d.style.marginRight = f + "px")
	},
	_setBorder : function (d, f, e) {
		f = this._borderSize(f);
		e = "top" == e ? this._whichSideTop() : this._whichSideBottom();
		"left" == e ? (d.style.borderLeftWidth = f + "px", d.style.borderRightWidth = "0px") : "right" == e ? (d.style.borderRightWidth = f + "px", d.style.borderLeftWidth = "0px") : (d.style.borderLeftWidth = f + "px", d.style.borderRightWidth = f + "px");
		!1 != this.options.border && (d.style.borderLeftWidth = f + "px", d.style.borderRightWidth = f + "px")
	},
	_marginSize : function (i) {
		if (this._isTransparent()) {
			return 0
		}
		var h = [5, 3, 2, 1],
		g = [3, 2, 1, 0],
		f = [2, 1],
		j = [1, 0];
		return this.options.compact && this.options.blend ? j[i] : this.options.compact ? f[i] : this.options.blend ? g[i] : h[i]
	},
	_borderSize : function (i) {
		var h = [5, 3, 2, 1],
		g = [2, 1, 1, 1],
		f = [1, 0],
		j = [0, 2, 0, 0];
		return this.options.compact && (this.options.blend || this._isTransparent()) ? 1 : this.options.compact ? f[i] : this.options.blend ? g[i] : this.options.border ? j[i] : this._isTransparent() ? h[i] : 0
	},
	_hasString : function (d) {
		for (var c = 1; c < arguments.length; c++) {
			if (0 <= d.indexOf(arguments[c])) {
				return !0
			}
		}
		return !1
	},
	_blend : function (d, f) {
		var e = OpenLayers.Rico.Color.createFromHex(d);
		e.blend(OpenLayers.Rico.Color.createFromHex(f));
		return e
	},
	_background : function (d) {
		try {
			return OpenLayers.Rico.Color.createColorFromBackground(d).asHex()
		} catch (c) {
			return "#ffffff"
		}
	},
	_isTransparent : function () {
		return "transparent" == this.options.color
	},
	_isTopRounded : function () {
		return this._hasString(this.options.corners, "all", "top", "tl", "tr")
	},
	_isBottomRounded : function () {
		return this._hasString(this.options.corners, "all", "bottom", "bl", "br")
	},
	_hasSingleTextChild : function (b) {
		return 1 == b.childNodes.length && 3 == b.childNodes[0].nodeType
	}
};
OpenLayers.Popup.AnchoredBubble = OpenLayers.Class(OpenLayers.Popup.Anchored, {
		rounded : !1,
		initialize : function (l, k, j, i, h, n, m) {
			OpenLayers.Console.warn("AnchoredBubble is deprecated");
			this.padding = new OpenLayers.Bounds(0, OpenLayers.Popup.AnchoredBubble.CORNER_SIZE, 0, OpenLayers.Popup.AnchoredBubble.CORNER_SIZE);
			OpenLayers.Popup.Anchored.prototype.initialize.apply(this, arguments)
		},
		draw : function (b) {
			OpenLayers.Popup.Anchored.prototype.draw.apply(this, arguments);
			this.setContentHTML();
			this.setBackgroundColor();
			this.setOpacity();
			return this.div
		},
		updateRelativePosition : function () {
			this.setRicoCorners()
		},
		setSize : function (b) {
			OpenLayers.Popup.Anchored.prototype.setSize.apply(this, arguments);
			this.setRicoCorners()
		},
		setBackgroundColor : function (b) {
			void 0 != b && (this.backgroundColor = b);
			null != this.div && null != this.contentDiv && (this.div.style.background = "transparent", OpenLayers.Rico.Corner.changeColor(this.groupDiv, this.backgroundColor))
		},
		setOpacity : function (b) {
			OpenLayers.Popup.Anchored.prototype.setOpacity.call(this, b);
			null != this.div && null != this.groupDiv && OpenLayers.Rico.Corner.changeOpacity(this.groupDiv, this.opacity)
		},
		setBorder : function () {
			this.border = 0
		},
		setRicoCorners : function () {
			var b = {
				corners : this.getCornersToRound(this.relativePosition),
				color : this.backgroundColor,
				bgColor : "transparent",
				blend : !1
			};
			this.rounded ? (OpenLayers.Rico.Corner.reRound(this.groupDiv, b), this.setBackgroundColor(), this.setOpacity()) : (OpenLayers.Rico.Corner.round(this.div, b), this.rounded = !0)
		},
		getCornersToRound : function () {
			var d = ["tl", "tr", "bl", "br"],
			c = OpenLayers.Bounds.oppositeQuadrant(this.relativePosition);
			OpenLayers.Util.removeItem(d, c);
			return d.join(" ")
		},
		CLASS_NAME : "OpenLayers.Popup.AnchoredBubble"
	});
OpenLayers.Popup.AnchoredBubble.CORNER_SIZE = 5;
OpenLayers.Protocol.WFS.v1 = OpenLayers.Class(OpenLayers.Protocol, {
		version : null,
		srsName : "EPSG:4326",
		featureType : null,
		featureNS : null,
		geometryName : "the_geom",
		schema : null,
		featurePrefix : "feature",
		formatOptions : null,
		readFormat : null,
		readOptions : null,
		initialize : function (b) {
			OpenLayers.Protocol.prototype.initialize.apply(this, [b]);
			b.format || (this.format = OpenLayers.Format.WFST(OpenLayers.Util.extend({
							version : this.version,
							featureType : this.featureType,
							featureNS : this.featureNS,
							featurePrefix : this.featurePrefix,
							geometryName : this.geometryName,
							srsName : this.srsName,
							schema : this.schema
						}, this.formatOptions)));
			!b.geometryName && 1 < parseFloat(this.format.version) && this.setGeometryName(null)
		},
		destroy : function () {
			this.options && !this.options.format && this.format.destroy();
			this.format = null;
			OpenLayers.Protocol.prototype.destroy.apply(this)
		},
		read : function (d) {
			OpenLayers.Protocol.prototype.read.apply(this, arguments);
			d = OpenLayers.Util.extend({}, d);
			OpenLayers.Util.applyDefaults(d, this.options || {});
			var f = new OpenLayers.Protocol.Response({
					requestType : "read"
				}),
			e = OpenLayers.Format.XML.prototype.write.apply(this.format, [this.format.writeNode("wfs:GetFeature", d)]);
			f.priv = OpenLayers.Request.POST({
					url : d.url,
					callback : this.createCallback(this.handleRead, f, d),
					params : d.params,
					headers : d.headers,
					data : e
				});
			return f
		},
		setFeatureType : function (b) {
			this.featureType = b;
			this.format.featureType = b
		},
		setGeometryName : function (b) {
			this.geometryName = b;
			this.format.geometryName = b
		},
		handleRead : function (d, f) {
			f = OpenLayers.Util.extend({}, f);
			OpenLayers.Util.applyDefaults(f, this.options);
			if (f.callback) {
				var e = d.priv;
				200 <= e.status && 300 > e.status ? (e = this.parseResponse(e, f.readOptions)) && !1 !== e.success ? (f.readOptions && "object" == f.readOptions.output ? OpenLayers.Util.extend(d, e) : d.features = e, d.code = OpenLayers.Protocol.Response.SUCCESS) : (d.code = OpenLayers.Protocol.Response.FAILURE, d.error = e) : d.code = OpenLayers.Protocol.Response.FAILURE;
				f.callback.call(f.scope, d)
			}
		},
		parseResponse : function (h, g) {
			var f = h.responseXML;
			if (!f || !f.documentElement) {
				f = h.responseText
			}
			if (!f || 0 >= f.length) {
				return null
			}
			f = null !== this.readFormat ? this.readFormat.read(f) : this.format.read(f, g);
			if (!this.featureNS) {
				var e = this.readFormat || this.format;
				this.featureNS = e.featureNS;
				e.autoConfig = !1;
				this.geometryName || this.setGeometryName(e.geometryName)
			}
			return f
		},
		commit : function (d, f) {
			f = OpenLayers.Util.extend({}, f);
			OpenLayers.Util.applyDefaults(f, this.options);
			var e = new OpenLayers.Protocol.Response({
					requestType : "commit",
					reqFeatures : d
				});
			e.priv = OpenLayers.Request.POST({
					url : f.url,
					headers : f.headers,
					data : this.format.write(d, f),
					callback : this.createCallback(this.handleCommit, e, f)
				});
			return e
		},
		handleCommit : function (h, g) {
			if (g.callback) {
				var f = h.priv,
				e = f.responseXML;
				if (!e || !e.documentElement) {
					e = f.responseText
				}
				f = this.format.read(e) || {};
				h.insertIds = f.insertIds || [];
				f.success ? h.code = OpenLayers.Protocol.Response.SUCCESS : (h.code = OpenLayers.Protocol.Response.FAILURE, h.error = f);
				g.callback.call(g.scope, h)
			}
		},
		filterDelete : function (i, h) {
			h = OpenLayers.Util.extend({}, h);
			OpenLayers.Util.applyDefaults(h, this.options);
			new OpenLayers.Protocol.Response({
				requestType : "commit"
			});
			var g = this.format.createElementNSPlus("wfs:Transaction", {
					attributes : {
						service : "WFS",
						version : this.version
					}
				}),
			f = this.format.createElementNSPlus("wfs:Delete", {
					attributes : {
						typeName : (h.featureNS ? this.featurePrefix + ":" : "") + h.featureType
					}
				});
			h.featureNS && f.setAttribute("xmlns:" + this.featurePrefix, h.featureNS);
			var j = this.format.writeNode("ogc:Filter", i);
			f.appendChild(j);
			g.appendChild(f);
			g = OpenLayers.Format.XML.prototype.write.apply(this.format, [g]);
			return OpenLayers.Request.POST({
				url : this.url,
				callback : h.callback || function () {},
				data : g
			})
		},
		abort : function (b) {
			b && b.priv.abort()
		},
		CLASS_NAME : "OpenLayers.Protocol.WFS.v1"
	});
OpenLayers.Handler.Point = OpenLayers.Class(OpenLayers.Handler, {
		point : null,
		layer : null,
		multi : !1,
		citeCompliant : !1,
		mouseDown : !1,
		stoppedDown : null,
		lastDown : null,
		lastUp : null,
		persist : !1,
		stopDown : !1,
		stopUp : !1,
		layerOptions : null,
		pixelTolerance : 5,
		touch : !1,
		lastTouchPx : null,
		initialize : function (d, f, e) {
			if (!e || !e.layerOptions || !e.layerOptions.styleMap) {
				this.style = OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"], {})
			}
			OpenLayers.Handler.prototype.initialize.apply(this, arguments)
		},
		activate : function () {
			if (!OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
				return !1
			}
			var b = OpenLayers.Util.extend({
					displayInLayerSwitcher : !1,
					calculateInRange : OpenLayers.Function.True,
					wrapDateLine : this.citeCompliant
				}, this.layerOptions);
			this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, b);
			this.map.addLayer(this.layer);
			return !0
		},
		createFeature : function (b) {
			b = this.layer.getLonLatFromViewPortPx(b);
			b = new OpenLayers.Geometry.Point(b.lon, b.lat);
			this.point = new OpenLayers.Feature.Vector(b);
			this.callback("create", [this.point.geometry, this.point]);
			this.point.geometry.clearBounds();
			this.layer.addFeatures([this.point], {
				silent : !0
			})
		},
		deactivate : function () {
			if (!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
				return !1
			}
			this.cancel();
			null != this.layer.map && (this.destroyFeature(!0), this.layer.destroy(!1));
			this.layer = null;
			this.touch = !1;
			return !0
		},
		destroyFeature : function (b) {
			this.layer && (b || !this.persist) && this.layer.destroyFeatures();
			this.point = null
		},
		destroyPersistedFeature : function () {
			var b = this.layer;
			b && 1 < b.features.length && this.layer.features[0].destroy()
		},
		finalize : function (b) {
			this.mouseDown = !1;
			this.lastTouchPx = this.lastUp = this.lastDown = null;
			this.callback(b ? "cancel" : "done", [this.geometryClone()]);
			this.destroyFeature(b)
		},
		cancel : function () {
			this.finalize(!0)
		},
		click : function (b) {
			OpenLayers.Event.stop(b);
			return !1
		},
		dblclick : function (b) {
			OpenLayers.Event.stop(b);
			return !1
		},
		modifyFeature : function (b) {
			this.point || this.createFeature(b);
			b = this.layer.getLonLatFromViewPortPx(b);
			this.point.geometry.x = b.lon;
			this.point.geometry.y = b.lat;
			this.callback("modify", [this.point.geometry, this.point, !1]);
			this.point.geometry.clearBounds();
			this.drawFeature()
		},
		drawFeature : function () {
			this.layer.drawFeature(this.point, this.style)
		},
		getGeometry : function () {
			var b = this.point && this.point.geometry;
			b && this.multi && (b = new OpenLayers.Geometry.MultiPoint([b]));
			return b
		},
		geometryClone : function () {
			var b = this.getGeometry();
			return b && b.clone()
		},
		mousedown : function (b) {
			return this.down(b)
		},
		touchstart : function (b) {
			this.touch || (this.touch = !0, this.map.events.un({
					mousedown : this.mousedown,
					mouseup : this.mouseup,
					mousemove : this.mousemove,
					click : this.click,
					dblclick : this.dblclick,
					scope : this
				}));
			this.lastTouchPx = b.xy;
			return this.down(b)
		},
		mousemove : function (b) {
			return this.move(b)
		},
		touchmove : function (b) {
			this.lastTouchPx = b.xy;
			return this.move(b)
		},
		mouseup : function (b) {
			return this.up(b)
		},
		touchend : function (b) {
			b.xy = this.lastTouchPx;
			return this.up(b)
		},
		down : function (b) {
			this.mouseDown = !0;
			this.lastDown = b.xy;
			this.touch || this.modifyFeature(b.xy);
			this.stoppedDown = this.stopDown;
			return !this.stopDown
		},
		move : function (b) {
			!this.touch && (!this.mouseDown || this.stoppedDown) && this.modifyFeature(b.xy);
			return !0
		},
		up : function (b) {
			this.mouseDown = !1;
			this.stoppedDown = this.stopDown;
			return this.checkModifiers(b) && (!this.lastUp || !this.lastUp.equals(b.xy)) && this.lastDown && this.passesTolerance(this.lastDown, b.xy, this.pixelTolerance) ? (this.touch && this.modifyFeature(b.xy), this.persist && this.destroyPersistedFeature(), this.lastUp = b.xy, this.finalize(), !this.stopUp) : !0
		},
		mouseout : function (b) {
			OpenLayers.Util.mouseLeft(b, this.map.viewPortDiv) && (this.stoppedDown = this.stopDown, this.mouseDown = !1)
		},
		passesTolerance : function (h, g, f) {
			var e = !0;
			null != f && h && g && h.distanceTo(g) > f && (e = !1);
			return e
		},
		CLASS_NAME : "OpenLayers.Handler.Point"
	});
OpenLayers.Handler.Path = OpenLayers.Class(OpenLayers.Handler.Point, {
		line : null,
		maxVertices : null,
		doubleTouchTolerance : 20,
		freehand : !1,
		freehandToggle : "shiftKey",
		timerId : null,
		redoStack : null,
		createFeature : function (b) {
			b = this.layer.getLonLatFromViewPortPx(b);
			b = new OpenLayers.Geometry.Point(b.lon, b.lat);
			this.point = new OpenLayers.Feature.Vector(b);
			this.line = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([this.point.geometry]));
			this.callback("create", [this.point.geometry, this.getSketch()]);
			this.point.geometry.clearBounds();
			this.layer.addFeatures([this.line, this.point], {
				silent : !0
			})
		},
		destroyFeature : function (b) {
			OpenLayers.Handler.Point.prototype.destroyFeature.call(this, b);
			this.line = null
		},
		destroyPersistedFeature : function () {
			var b = this.layer;
			b && 2 < b.features.length && this.layer.features[0].destroy()
		},
		removePoint : function () {
			this.point && this.layer.removeFeatures([this.point])
		},
		addPoint : function (b) {
			this.layer.removeFeatures([this.point]);
			b = this.layer.getLonLatFromViewPortPx(b);
			this.point = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(b.lon, b.lat));
			this.line.geometry.addComponent(this.point.geometry, this.line.geometry.components.length);
			this.layer.addFeatures([this.point]);
			this.callback("point", [this.point.geometry, this.getGeometry()]);
			this.callback("modify", [this.point.geometry, this.getSketch()]);
			this.drawFeature();
			delete this.redoStack
		},
		insertXY : function (d, c) {
			this.line.geometry.addComponent(new OpenLayers.Geometry.Point(d, c), this.getCurrentPointIndex());
			this.drawFeature();
			delete this.redoStack
		},
		insertDeltaXY : function (d, f) {
			var e = this.getCurrentPointIndex() - 1;
			(e = this.line.geometry.components[e]) && (!isNaN(e.x) && !isNaN(e.y)) && this.insertXY(e.x + d, e.y + f)
		},
		insertDirectionLength : function (h, g) {
			h *= Math.PI / 180;
			var f = g * Math.cos(h),
			e = g * Math.sin(h);
			this.insertDeltaXY(f, e)
		},
		insertDeflectionLength : function (h, g) {
			var f = this.getCurrentPointIndex() - 1;
			if (0 < f) {
				var e = this.line.geometry.components[f],
				f = this.line.geometry.components[f - 1],
				e = Math.atan2(e.y - f.y, e.x - f.x);
				this.insertDirectionLength(180 * e / Math.PI + h, g)
			}
		},
		getCurrentPointIndex : function () {
			return this.line.geometry.components.length - 1
		},
		undo : function () {
			var d = this.line.geometry,
			f = d.components,
			e = this.getCurrentPointIndex() - 1,
			f = f[e];
			if (d = d.removeComponent(f)) {
				this.redoStack || (this.redoStack = []),
				this.redoStack.push(f),
				this.drawFeature()
			}
			return d
		},
		redo : function () {
			var b = this.redoStack && this.redoStack.pop();
			b && (this.line.geometry.addComponent(b, this.getCurrentPointIndex()), this.drawFeature());
			return !!b
		},
		freehandMode : function (b) {
			return this.freehandToggle && b[this.freehandToggle] ? !this.freehand : this.freehand
		},
		modifyFeature : function (d, f) {
			this.line || this.createFeature(d);
			var e = this.layer.getLonLatFromViewPortPx(d);
			this.point.geometry.x = e.lon;
			this.point.geometry.y = e.lat;
			this.callback("modify", [this.point.geometry, this.getSketch(), f]);
			this.point.geometry.clearBounds();
			this.drawFeature()
		},
		drawFeature : function () {
			this.layer.drawFeature(this.line, this.style);
			this.layer.drawFeature(this.point, this.style)
		},
		getSketch : function () {
			return this.line
		},
		getGeometry : function () {
			var b = this.line && this.line.geometry;
			b && this.multi && (b = new OpenLayers.Geometry.MultiLineString([b]));
			return b
		},
		touchstart : function (b) {
			if (this.timerId && this.passesTolerance(this.lastTouchPx, b.xy, this.doubleTouchTolerance)) {
				return this.finishGeometry(),
				window.clearTimeout(this.timerId),
				this.timerId = null,
				!1
			}
			this.timerId && (window.clearTimeout(this.timerId), this.timerId = null);
			this.timerId = window.setTimeout(OpenLayers.Function.bind(function () {
						this.timerId = null
					}, this), 300);
			return OpenLayers.Handler.Point.prototype.touchstart.call(this, b)
		},
		down : function (d) {
			var c = this.stopDown;
			this.freehandMode(d) && (c = !0, this.touch && (this.modifyFeature(d.xy, !!this.lastUp), OpenLayers.Event.stop(d)));
			!this.touch && (!this.lastDown || !this.passesTolerance(this.lastDown, d.xy, this.pixelTolerance)) && this.modifyFeature(d.xy, !!this.lastUp);
			this.mouseDown = !0;
			this.lastDown = d.xy;
			this.stoppedDown = c;
			return !c
		},
		move : function (b) {
			if (this.stoppedDown && this.freehandMode(b)) {
				return this.persist && this.destroyPersistedFeature(),
				this.maxVertices && this.line && this.line.geometry.components.length === this.maxVertices ? (this.removePoint(), this.finalize()) : this.addPoint(b.xy),
				!1
			}
			!this.touch && (!this.mouseDown || this.stoppedDown) && this.modifyFeature(b.xy, !!this.lastUp);
			return !0
		},
		up : function (b) {
			if (this.mouseDown && (!this.lastUp || !this.lastUp.equals(b.xy))) {
				this.stoppedDown && this.freehandMode(b) ? (this.persist && this.destroyPersistedFeature(), this.removePoint(), this.finalize()) : this.passesTolerance(this.lastDown, b.xy, this.pixelTolerance) && (this.touch && this.modifyFeature(b.xy), null == this.lastUp && this.persist && this.destroyPersistedFeature(), this.addPoint(b.xy), this.lastUp = b.xy, this.line.geometry.components.length === this.maxVertices + 1 && this.finishGeometry())
			}
			this.stoppedDown = this.stopDown;
			this.mouseDown = !1;
			return !this.stopUp
		},
		finishGeometry : function () {
			this.line.geometry.removeComponent(this.line.geometry.components[this.line.geometry.components.length - 1]);
			this.removePoint();
			this.finalize()
		},
		dblclick : function (b) {
			this.freehandMode(b) || this.finishGeometry();
			return !1
		},
		CLASS_NAME : "OpenLayers.Handler.Path"
	});
OpenLayers.Spherical = OpenLayers.Spherical || {};
OpenLayers.Spherical.DEFAULT_RADIUS = 6378137;
OpenLayers.Spherical.computeDistanceBetween = function (i, h, g) {
	g = g || OpenLayers.Spherical.DEFAULT_RADIUS;
	var f = Math.sin(Math.PI * (h.lon - i.lon) / 360),
	j = Math.sin(Math.PI * (h.lat - i.lat) / 360);
	i = j * j + f * f * Math.cos(Math.PI * i.lat / 180) * Math.cos(Math.PI * h.lat / 180);
	return 2 * g * Math.atan2(Math.sqrt(i), Math.sqrt(1 - i))
};
OpenLayers.Spherical.computeHeading = function (h, g) {
	var f = Math.sin(Math.PI * (h.lon - g.lon) / 180) * Math.cos(Math.PI * g.lat / 180),
	e = Math.cos(Math.PI * h.lat / 180) * Math.sin(Math.PI * g.lat / 180) - Math.sin(Math.PI * h.lat / 180) * Math.cos(Math.PI * g.lat / 180) * Math.cos(Math.PI * (h.lon - g.lon) / 180);
	return 180 * Math.atan2(f, e) / Math.PI
};
OpenLayers.Control.CacheWrite = OpenLayers.Class(OpenLayers.Control, {
		layers : null,
		imageFormat : "image/png",
		quotaRegEx : /quota/i,
		setMap : function (d) {
			OpenLayers.Control.prototype.setMap.apply(this, arguments);
			var f,
			e = this.layers || d.layers;
			for (f = e.length - 1; 0 <= f; --f) {
				this.addLayer({
					layer : e[f]
				})
			}
			if (!this.layers) {
				d.events.on({
					addlayer : this.addLayer,
					removeLayer : this.removeLayer,
					scope : this
				})
			}
		},
		addLayer : function (b) {
			b.layer.events.on({
				tileloadstart : this.makeSameOrigin,
				tileloaded : this.cache,
				scope : this
			})
		},
		removeLayer : function (b) {
			b.layer.events.un({
				tileloadstart : this.makeSameOrigin,
				tileloaded : this.cache,
				scope : this
			})
		},
		makeSameOrigin : function (d) {
			if (this.active && (d = d.tile, d instanceof OpenLayers.Tile.Image && !d.crossOriginKeyword && "data:" !== d.url.substr(0, 5))) {
				var c = OpenLayers.Request.makeSameOrigin(d.url, OpenLayers.ProxyHost);
				OpenLayers.Control.CacheWrite.urlMap[c] = d.url;
				d.url = c
			}
		},
		cache : function (h) {
			if (this.active && window.localStorage && (h = h.tile, h instanceof OpenLayers.Tile.Image && "data:" !== h.url.substr(0, 5))) {
				try {
					var g = h.getCanvasContext();
					if (g) {
						var f = OpenLayers.Control.CacheWrite.urlMap;
						window.localStorage.setItem("olCache_" + (f[h.url] || h.url), g.canvas.toDataURL(this.imageFormat));
						delete f[h.url]
					}
				} catch (e) {
					(g = e.name || e.message) && this.quotaRegEx.test(g) ? this.events.triggerEvent("cachefull", {
						tile : h
					}) : OpenLayers.Console.error(e.toString())
				}
			}
		},
		destroy : function () {
			if (this.layers || this.map) {
				var d,
				c = this.layers || this.map.layers;
				for (d = c.length - 1; 0 <= d; --d) {
					this.removeLayer({
						layer : c[d]
					})
				}
			}
			this.map && this.map.events.un({
				addlayer : this.addLayer,
				removeLayer : this.removeLayer,
				scope : this
			});
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Control.CacheWrite"
	});
OpenLayers.Control.CacheWrite.clearCache = function () {
	if (window.localStorage) {
		var d,
		c;
		for (d = window.localStorage.length - 1; 0 <= d; --d) {
			c = window.localStorage.key(d),
			"olCache_" === c.substr(0, 8) && window.localStorage.removeItem(c)
		}
	}
};
OpenLayers.Control.CacheWrite.urlMap = {};
OpenLayers.Format.Context = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		layerOptions : null,
		layerParams : null,
		read : function (h, g) {
			var f = OpenLayers.Format.XML.VersionedOGC.prototype.read.apply(this, arguments);
			if (g && g.map) {
				if (this.context = f, g.map instanceof OpenLayers.Map) {
					f = this.mergeContextToMap(f, g.map)
				} else {
					var e = g.map;
					if (OpenLayers.Util.isElement(e) || "string" == typeof e) {
						e = {
							div : e
						}
					}
					f = this.contextToMap(f, e)
				}
			}
			return f
		},
		getLayerFromContext : function (j) {
			var i,
			h,
			g = {
				queryable : j.queryable,
				visibility : j.visibility,
				maxExtent : j.maxExtent,
				metadata : OpenLayers.Util.applyDefaults(j.metadata, {
					styles : j.styles,
					formats : j.formats,
					"abstract" : j["abstract"],
					dataURL : j.dataURL
				}),
				numZoomLevels : j.numZoomLevels,
				units : j.units,
				isBaseLayer : j.isBaseLayer,
				opacity : j.opacity,
				displayInLayerSwitcher : j.displayInLayerSwitcher,
				singleTile : j.singleTile,
				tileSize : j.tileSize ? new OpenLayers.Size(j.tileSize.width, j.tileSize.height) : void 0,
				minScale : j.minScale || j.maxScaleDenominator,
				maxScale : j.maxScale || j.minScaleDenominator,
				srs : j.srs,
				dimensions : j.dimensions,
				metadataURL : j.metadataURL
			};
			this.layerOptions && OpenLayers.Util.applyDefaults(g, this.layerOptions);
			var l = {
				layers : j.name,
				transparent : j.transparent,
				version : j.version
			};
			if (j.formats && 0 < j.formats.length) {
				l.format = j.formats[0].value;
				i = 0;
				for (h = j.formats.length; i < h; i++) {
					var k = j.formats[i];
					if (!0 == k.current) {
						l.format = k.value;
						break
					}
				}
			}
			if (j.styles && 0 < j.styles.length) {
				i = 0;
				for (h = j.styles.length; i < h; i++) {
					if (k = j.styles[i], !0 == k.current) {
						k.href ? l.sld = k.href : k.body ? l.sld_body = k.body : l.styles = k.name;
						break
					}
				}
			}
			this.layerParams && OpenLayers.Util.applyDefaults(l, this.layerParams);
			i = null;
			h = j.service;
			h == OpenLayers.Format.Context.serviceTypes.WFS ? (g.strategies = [new OpenLayers.Strategy.BBOX], g.protocol = new OpenLayers.Protocol.WFS({
						url : j.url,
						featurePrefix : j.name.split(":")[0],
						featureType : j.name.split(":").pop()
					}), i = new OpenLayers.Layer.Vector(j.title || j.name, g)) : h == OpenLayers.Format.Context.serviceTypes.KML ? (g.strategies = [new OpenLayers.Strategy.Fixed], g.protocol = new OpenLayers.Protocol.HTTP({
						url : j.url,
						format : new OpenLayers.Format.KML
					}), i = new OpenLayers.Layer.Vector(j.title || j.name, g)) : h == OpenLayers.Format.Context.serviceTypes.GML ? (g.strategies = [new OpenLayers.Strategy.Fixed], g.protocol = new OpenLayers.Protocol.HTTP({
						url : j.url,
						format : new OpenLayers.Format.GML
					}), i = new OpenLayers.Layer.Vector(j.title || j.name, g)) : j.features ? (i = new OpenLayers.Layer.Vector(j.title || j.name, g), i.addFeatures(j.features)) : !0 !== j.categoryLayer && (i = new OpenLayers.Layer.WMS(j.title || j.name, j.url, l, g));
			return i
		},
		getLayersFromContext : function (i) {
			for (var h = [], g = 0, f = i.length; g < f; g++) {
				var j = this.getLayerFromContext(i[g]);
				null !== j && h.push(j)
			}
			return h
		},
		contextToMap : function (d, f) {
			f = OpenLayers.Util.applyDefaults({
					maxExtent : d.maxExtent,
					projection : d.projection,
					units : d.units
				}, f);
			f.maxExtent && (f.maxResolution = f.maxExtent.getWidth() / OpenLayers.Map.TILE_WIDTH);
			f.metadata = {
				contactInformation : d.contactInformation,
				"abstract" : d["abstract"],
				keywords : d.keywords,
				logo : d.logo,
				descriptionURL : d.descriptionURL
			};
			var e = new OpenLayers.Map(f);
			e.addLayers(this.getLayersFromContext(d.layersContext));
			e.setCenter(d.bounds.getCenterLonLat(), e.getZoomForExtent(d.bounds, !0));
			return e
		},
		mergeContextToMap : function (d, c) {
			c.addLayers(this.getLayersFromContext(d.layersContext));
			return c
		},
		write : function (d, c) {
			d = this.toContext(d);
			return OpenLayers.Format.XML.VersionedOGC.prototype.write.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Format.Context"
	});
OpenLayers.Format.Context.serviceTypes = {
	WMS : "urn:ogc:serviceType:WMS",
	WFS : "urn:ogc:serviceType:WFS",
	WCS : "urn:ogc:serviceType:WCS",
	GML : "urn:ogc:serviceType:GML",
	SLD : "urn:ogc:serviceType:SLD",
	FES : "urn:ogc:serviceType:FES",
	KML : "urn:ogc:serviceType:KML"
};
OpenLayers.Format.WMC = OpenLayers.Class(OpenLayers.Format.Context, {
		defaultVersion : "1.1.0",
		layerToContext : function (j) {
			var i = this.getParser(),
			h = {
				queryable : j.queryable,
				visibility : j.visibility,
				name : j.params.LAYERS,
				title : j.name,
				"abstract" : j.metadata["abstract"],
				dataURL : j.metadata.dataURL,
				metadataURL : j.metadataURL,
				server : {
					version : j.params.VERSION,
					url : j.url
				},
				maxExtent : j.maxExtent,
				transparent : j.params.TRANSPARENT,
				numZoomLevels : j.numZoomLevels,
				units : j.units,
				isBaseLayer : j.isBaseLayer,
				opacity : 1 == j.opacity ? void 0 : j.opacity,
				displayInLayerSwitcher : j.displayInLayerSwitcher,
				singleTile : j.singleTile,
				tileSize : j.singleTile || !j.tileSize ? void 0 : {
					width : j.tileSize.w,
					height : j.tileSize.h
				},
				minScale : j.options.resolutions || j.options.scales || j.options.maxResolution || j.options.minScale ? j.minScale : void 0,
				maxScale : j.options.resolutions || j.options.scales || j.options.minResolution || j.options.maxScale ? j.maxScale : void 0,
				formats : [],
				styles : [],
				srs : j.srs,
				dimensions : j.dimensions
			};
			j.metadata.servertitle && (h.server.title = j.metadata.servertitle);
			if (j.metadata.formats && 0 < j.metadata.formats.length) {
				for (var g = 0, l = j.metadata.formats.length; g < l; g++) {
					var k = j.metadata.formats[g];
					h.formats.push({
						value : k.value,
						current : k.value == j.params.FORMAT
					})
				}
			} else {
				h.formats.push({
					value : j.params.FORMAT,
					current : !0
				})
			}
			if (j.metadata.styles && 0 < j.metadata.styles.length) {
				g = 0;
				for (l = j.metadata.styles.length; g < l; g++) {
					i = j.metadata.styles[g],
					i.current = i.href == j.params.SLD || i.body == j.params.SLD_BODY || i.name == j.params.STYLES ? !0 : !1,
					h.styles.push(i)
				}
			} else {
				h.styles.push({
					href : j.params.SLD,
					body : j.params.SLD_BODY,
					name : j.params.STYLES || i.defaultStyleName,
					title : i.defaultStyleTitle,
					current : !0
				})
			}
			return h
		},
		toContext : function (i) {
			var h = {},
			g = i.layers;
			if ("OpenLayers.Map" == i.CLASS_NAME) {
				var f = i.metadata || {};
				h.size = i.getSize();
				h.bounds = i.getExtent();
				h.projection = i.projection;
				h.title = i.title;
				h.keywords = f.keywords;
				h["abstract"] = f["abstract"];
				h.logo = f.logo;
				h.descriptionURL = f.descriptionURL;
				h.contactInformation = f.contactInformation;
				h.maxExtent = i.maxExtent
			} else {
				OpenLayers.Util.applyDefaults(h, i),
				void 0 != h.layers && delete h.layers
			}
			void 0 == h.layersContext && (h.layersContext = []);
			if (void 0 != g && OpenLayers.Util.isArray(g)) {
				i = 0;
				for (f = g.length; i < f; i++) {
					var j = g[i];
					j instanceof OpenLayers.Layer.WMS && h.layersContext.push(this.layerToContext(j))
				}
			}
			return h
		},
		CLASS_NAME : "OpenLayers.Format.WMC"
	});
OpenLayers.Format.WMC.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			ol : "http://openlayers.org/context",
			wmc : "http://www.opengis.net/context",
			sld : "http://www.opengis.net/sld",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		schemaLocation : "",
		getNamespacePrefix : function (d) {
			var c = null;
			if (null == d) {
				c = this.namespaces[this.defaultPrefix]
			} else {
				for (c in this.namespaces) {
					if (this.namespaces[c] == d) {
						break
					}
				}
			}
			return c
		},
		defaultPrefix : "wmc",
		rootPrefix : null,
		defaultStyleName : "",
		defaultStyleTitle : "Default",
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d = d.documentElement;
			this.rootPrefix = d.prefix;
			var c = {
				version : d.getAttribute("version")
			};
			this.runChildNodes(c, d);
			return c
		},
		runChildNodes : function (o, n) {
			for (var m = n.childNodes, l, k, j, i = 0, p = m.length; i < p; ++i) {
				l = m[i],
				1 == l.nodeType && (k = this.getNamespacePrefix(l.namespaceURI), j = l.nodeName.split(":").pop(), (k = this["read_" + k + "_" + j]) && k.apply(this, [o, l]))
			}
		},
		read_wmc_General : function (d, c) {
			this.runChildNodes(d, c)
		},
		read_wmc_BoundingBox : function (d, c) {
			d.projection = c.getAttribute("SRS");
			d.bounds = new OpenLayers.Bounds(c.getAttribute("minx"), c.getAttribute("miny"), c.getAttribute("maxx"), c.getAttribute("maxy"))
		},
		read_wmc_LayerList : function (d, c) {
			d.layersContext = [];
			this.runChildNodes(d, c)
		},
		read_wmc_Layer : function (d, f) {
			var e = {
				visibility : "1" != f.getAttribute("hidden"),
				queryable : "1" == f.getAttribute("queryable"),
				formats : [],
				styles : [],
				metadata : {}

			};
			this.runChildNodes(e, f);
			d.layersContext.push(e)
		},
		read_wmc_Extension : function (d, c) {
			this.runChildNodes(d, c)
		},
		read_ol_units : function (d, c) {
			d.units = this.getChildValue(c)
		},
		read_ol_maxExtent : function (d, f) {
			var e = new OpenLayers.Bounds(f.getAttribute("minx"), f.getAttribute("miny"), f.getAttribute("maxx"), f.getAttribute("maxy"));
			d.maxExtent = e
		},
		read_ol_transparent : function (d, c) {
			d.transparent = this.getChildValue(c)
		},
		read_ol_numZoomLevels : function (d, c) {
			d.numZoomLevels = parseInt(this.getChildValue(c))
		},
		read_ol_opacity : function (d, c) {
			d.opacity = parseFloat(this.getChildValue(c))
		},
		read_ol_singleTile : function (d, c) {
			d.singleTile = "true" == this.getChildValue(c)
		},
		read_ol_tileSize : function (d, f) {
			var e = {
				width : f.getAttribute("width"),
				height : f.getAttribute("height")
			};
			d.tileSize = e
		},
		read_ol_isBaseLayer : function (d, c) {
			d.isBaseLayer = "true" == this.getChildValue(c)
		},
		read_ol_displayInLayerSwitcher : function (d, c) {
			d.displayInLayerSwitcher = "true" == this.getChildValue(c)
		},
		read_wmc_Server : function (d, c) {
			d.version = c.getAttribute("version");
			d.url = this.getOnlineResource_href(c);
			d.metadata.servertitle = c.getAttribute("title")
		},
		read_wmc_FormatList : function (d, c) {
			this.runChildNodes(d, c)
		},
		read_wmc_Format : function (d, f) {
			var e = {
				value : this.getChildValue(f)
			};
			"1" == f.getAttribute("current") && (e.current = !0);
			d.formats.push(e)
		},
		read_wmc_StyleList : function (d, c) {
			this.runChildNodes(d, c)
		},
		read_wmc_Style : function (d, f) {
			var e = {};
			this.runChildNodes(e, f);
			"1" == f.getAttribute("current") && (e.current = !0);
			d.styles.push(e)
		},
		read_wmc_SLD : function (d, c) {
			this.runChildNodes(d, c)
		},
		read_sld_StyledLayerDescriptor : function (d, f) {
			var e = OpenLayers.Format.XML.prototype.write.apply(this, [f]);
			d.body = e
		},
		read_sld_FeatureTypeStyle : function (d, f) {
			var e = OpenLayers.Format.XML.prototype.write.apply(this, [f]);
			d.body = e
		},
		read_wmc_OnlineResource : function (d, c) {
			d.href = this.getAttributeNS(c, this.namespaces.xlink, "href")
		},
		read_wmc_Name : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.name = e)
		},
		read_wmc_Title : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.title = e)
		},
		read_wmc_MetadataURL : function (d, c) {
			d.metadataURL = this.getOnlineResource_href(c)
		},
		read_wmc_KeywordList : function (d, c) {
			d.keywords = [];
			this.runChildNodes(d.keywords, c)
		},
		read_wmc_Keyword : function (d, c) {
			d.push(this.getChildValue(c))
		},
		read_wmc_Abstract : function (d, f) {
			var e = this.getChildValue(f);
			e && (d["abstract"] = e)
		},
		read_wmc_LogoURL : function (d, c) {
			d.logo = {
				width : c.getAttribute("width"),
				height : c.getAttribute("height"),
				format : c.getAttribute("format"),
				href : this.getOnlineResource_href(c)
			}
		},
		read_wmc_DescriptionURL : function (d, c) {
			d.descriptionURL = this.getOnlineResource_href(c)
		},
		read_wmc_ContactInformation : function (d, f) {
			var e = {};
			this.runChildNodes(e, f);
			d.contactInformation = e
		},
		read_wmc_ContactPersonPrimary : function (d, f) {
			var e = {};
			this.runChildNodes(e, f);
			d.personPrimary = e
		},
		read_wmc_ContactPerson : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.person = e)
		},
		read_wmc_ContactOrganization : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.organization = e)
		},
		read_wmc_ContactPosition : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.position = e)
		},
		read_wmc_ContactAddress : function (d, f) {
			var e = {};
			this.runChildNodes(e, f);
			d.contactAddress = e
		},
		read_wmc_AddressType : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.type = e)
		},
		read_wmc_Address : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.address = e)
		},
		read_wmc_City : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.city = e)
		},
		read_wmc_StateOrProvince : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.stateOrProvince = e)
		},
		read_wmc_PostCode : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.postcode = e)
		},
		read_wmc_Country : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.country = e)
		},
		read_wmc_ContactVoiceTelephone : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.phone = e)
		},
		read_wmc_ContactFacsimileTelephone : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.fax = e)
		},
		read_wmc_ContactElectronicMailAddress : function (d, f) {
			var e = this.getChildValue(f);
			e && (d.email = e)
		},
		read_wmc_DataURL : function (d, c) {
			d.dataURL = this.getOnlineResource_href(c)
		},
		read_wmc_LegendURL : function (d, f) {
			var e = {
				width : f.getAttribute("width"),
				height : f.getAttribute("height"),
				format : f.getAttribute("format"),
				href : this.getOnlineResource_href(f)
			};
			d.legend = e
		},
		read_wmc_DimensionList : function (d, c) {
			d.dimensions = {};
			this.runChildNodes(d.dimensions, c)
		},
		read_wmc_Dimension : function (h, g) {
			var f = {
				name : g.getAttribute("name").toLowerCase(),
				units : g.getAttribute("units") || "",
				unitSymbol : g.getAttribute("unitSymbol") || "",
				userValue : g.getAttribute("userValue") || "",
				nearestValue : "1" === g.getAttribute("nearestValue"),
				multipleValues : "1" === g.getAttribute("multipleValues"),
				current : "1" === g.getAttribute("current"),
				"default" : g.getAttribute("default") || ""
			},
			e = this.getChildValue(g);
			f.values = e.split(",");
			h[f.name] = f
		},
		write : function (d, f) {
			var e = this.createElementDefaultNS("ViewContext");
			this.setAttributes(e, {
				version : this.VERSION,
				id : f && "string" == typeof f.id ? f.id : OpenLayers.Util.createUniqueID("OpenLayers_Context_")
			});
			this.setAttributeNS(e, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			e.appendChild(this.write_wmc_General(d));
			e.appendChild(this.write_wmc_LayerList(d));
			return OpenLayers.Format.XML.prototype.write.apply(this, [e])
		},
		createElementDefaultNS : function (d, f, e) {
			d = this.createElementNS(this.namespaces[this.defaultPrefix], d);
			f && d.appendChild(this.createTextNode(f));
			e && this.setAttributes(d, e);
			return d
		},
		setAttributes : function (h, g) {
			var f,
			e;
			for (e in g) {
				f = g[e].toString(),
				f.match(/[A-Z]/) ? this.setAttributeNS(h, null, e, f) : h.setAttribute(e, f)
			}
		},
		write_wmc_General : function (d) {
			var f = this.createElementDefaultNS("General");
			d.size && f.appendChild(this.createElementDefaultNS("Window", null, {
					width : d.size.w,
					height : d.size.h
				}));
			var e = d.bounds;
			f.appendChild(this.createElementDefaultNS("BoundingBox", null, {
					minx : e.left.toPrecision(18),
					miny : e.bottom.toPrecision(18),
					maxx : e.right.toPrecision(18),
					maxy : e.top.toPrecision(18),
					SRS : d.projection
				}));
			f.appendChild(this.createElementDefaultNS("Title", d.title));
			d.keywords && f.appendChild(this.write_wmc_KeywordList(d.keywords));
			d["abstract"] && f.appendChild(this.createElementDefaultNS("Abstract", d["abstract"]));
			d.logo && f.appendChild(this.write_wmc_URLType("LogoURL", d.logo.href, d.logo));
			d.descriptionURL && f.appendChild(this.write_wmc_URLType("DescriptionURL", d.descriptionURL));
			d.contactInformation && f.appendChild(this.write_wmc_ContactInformation(d.contactInformation));
			f.appendChild(this.write_ol_MapExtension(d));
			return f
		},
		write_wmc_KeywordList : function (h) {
			for (var g = this.createElementDefaultNS("KeywordList"), f = 0, e = h.length; f < e; f++) {
				g.appendChild(this.createElementDefaultNS("Keyword", h[f]))
			}
			return g
		},
		write_wmc_ContactInformation : function (d) {
			var c = this.createElementDefaultNS("ContactInformation");
			d.personPrimary && c.appendChild(this.write_wmc_ContactPersonPrimary(d.personPrimary));
			d.position && c.appendChild(this.createElementDefaultNS("ContactPosition", d.position));
			d.contactAddress && c.appendChild(this.write_wmc_ContactAddress(d.contactAddress));
			d.phone && c.appendChild(this.createElementDefaultNS("ContactVoiceTelephone", d.phone));
			d.fax && c.appendChild(this.createElementDefaultNS("ContactFacsimileTelephone", d.fax));
			d.email && c.appendChild(this.createElementDefaultNS("ContactElectronicMailAddress", d.email));
			return c
		},
		write_wmc_ContactPersonPrimary : function (d) {
			var c = this.createElementDefaultNS("ContactPersonPrimary");
			d.person && c.appendChild(this.createElementDefaultNS("ContactPerson", d.person));
			d.organization && c.appendChild(this.createElementDefaultNS("ContactOrganization", d.organization));
			return c
		},
		write_wmc_ContactAddress : function (d) {
			var c = this.createElementDefaultNS("ContactAddress");
			d.type && c.appendChild(this.createElementDefaultNS("AddressType", d.type));
			d.address && c.appendChild(this.createElementDefaultNS("Address", d.address));
			d.city && c.appendChild(this.createElementDefaultNS("City", d.city));
			d.stateOrProvince && c.appendChild(this.createElementDefaultNS("StateOrProvince", d.stateOrProvince));
			d.postcode && c.appendChild(this.createElementDefaultNS("PostCode", d.postcode));
			d.country && c.appendChild(this.createElementDefaultNS("Country", d.country));
			return c
		},
		write_ol_MapExtension : function (d) {
			var f = this.createElementDefaultNS("Extension");
			if (d = d.maxExtent) {
				var e = this.createElementNS(this.namespaces.ol, "ol:maxExtent");
				this.setAttributes(e, {
					minx : d.left.toPrecision(18),
					miny : d.bottom.toPrecision(18),
					maxx : d.right.toPrecision(18),
					maxy : d.top.toPrecision(18)
				});
				f.appendChild(e)
			}
			return f
		},
		write_wmc_LayerList : function (h) {
			for (var g = this.createElementDefaultNS("LayerList"), f = 0, e = h.layersContext.length; f < e; ++f) {
				g.appendChild(this.write_wmc_Layer(h.layersContext[f]))
			}
			return g
		},
		write_wmc_Layer : function (d) {
			var c = this.createElementDefaultNS("Layer", null, {
					queryable : d.queryable ? "1" : "0",
					hidden : d.visibility ? "0" : "1"
				});
			c.appendChild(this.write_wmc_Server(d));
			c.appendChild(this.createElementDefaultNS("Name", d.name));
			c.appendChild(this.createElementDefaultNS("Title", d.title));
			d["abstract"] && c.appendChild(this.createElementDefaultNS("Abstract", d["abstract"]));
			d.dataURL && c.appendChild(this.write_wmc_URLType("DataURL", d.dataURL));
			d.metadataURL && c.appendChild(this.write_wmc_URLType("MetadataURL", d.metadataURL));
			return c
		},
		write_wmc_LayerExtension : function (j) {
			var i = this.createElementDefaultNS("Extension"),
			h = j.maxExtent,
			g = this.createElementNS(this.namespaces.ol, "ol:maxExtent");
			this.setAttributes(g, {
				minx : h.left.toPrecision(18),
				miny : h.bottom.toPrecision(18),
				maxx : h.right.toPrecision(18),
				maxy : h.top.toPrecision(18)
			});
			i.appendChild(g);
			j.tileSize && !j.singleTile && (h = this.createElementNS(this.namespaces.ol, "ol:tileSize"), this.setAttributes(h, j.tileSize), i.appendChild(h));
			for (var h = "transparent numZoomLevels units isBaseLayer opacity displayInLayerSwitcher singleTile".split(" "), l = 0, k = h.length; l < k; ++l) {
				(g = this.createOLPropertyNode(j, h[l])) && i.appendChild(g)
			}
			return i
		},
		createOLPropertyNode : function (d, f) {
			var e = null;
			null != d[f] && (e = this.createElementNS(this.namespaces.ol, "ol:" + f), e.appendChild(this.createTextNode(d[f].toString())));
			return e
		},
		write_wmc_Server : function (d) {
			d = d.server;
			var f = this.createElementDefaultNS("Server"),
			e = {
				service : "OGC:WMS",
				version : d.version
			};
			d.title && (e.title = d.title);
			this.setAttributes(f, e);
			f.appendChild(this.write_wmc_OnlineResource(d.url));
			return f
		},
		write_wmc_URLType : function (h, g, f) {
			h = this.createElementDefaultNS(h);
			h.appendChild(this.write_wmc_OnlineResource(g));
			if (f) {
				g = ["width", "height", "format"];
				for (var e = 0; e < g.length; e++) {
					g[e]in f && h.setAttribute(g[e], f[g[e]])
				}
			}
			return h
		},
		write_wmc_DimensionList : function (j) {
			var i = this.createElementDefaultNS("DimensionList"),
			h;
			for (h in j.dimensions) {
				var g = {},
				l = j.dimensions[h],
				k;
				for (k in l) {
					g[k] = "boolean" == typeof l[k] ? Number(l[k]) : l[k]
				}
				l = "";
				g.values && (l = g.values.join(","), delete g.values);
				i.appendChild(this.createElementDefaultNS("Dimension", l, g))
			}
			return i
		},
		write_wmc_FormatList : function (i) {
			for (var h = this.createElementDefaultNS("FormatList"), g = 0, f = i.formats.length; g < f; g++) {
				var j = i.formats[g];
				h.appendChild(this.createElementDefaultNS("Format", j.value, j.current && !0 == j.current ? {
						current : "1"
					}
						 : null))
			}
			return h
		},
		write_wmc_StyleList : function (l) {
			var k = this.createElementDefaultNS("StyleList");
			if ((l = l.styles) && OpenLayers.Util.isArray(l)) {
				for (var j, i = 0, h = l.length; i < h; i++) {
					var n = l[i],
					m = this.createElementDefaultNS("Style", null, n.current && !0 == n.current ? {
							current : "1"
						}
							 : null);
					n.href ? (j = this.createElementDefaultNS("SLD"), n.name && j.appendChild(this.createElementDefaultNS("Name", n.name)), n.title && j.appendChild(this.createElementDefaultNS("Title", n.title)), n.legend && j.appendChild(this.write_wmc_URLType("LegendURL", n.legend.href, n.legend)), n = this.write_wmc_OnlineResource(n.href), j.appendChild(n), m.appendChild(j)) : n.body ? (j = this.createElementDefaultNS("SLD"), n.name && j.appendChild(this.createElementDefaultNS("Name", n.name)), n.title && j.appendChild(this.createElementDefaultNS("Title", n.title)), n.legend && j.appendChild(this.write_wmc_URLType("LegendURL", n.legend.href, n.legend)), n = OpenLayers.Format.XML.prototype.read.apply(this, [n.body]).documentElement, j.ownerDocument && j.ownerDocument.importNode && (n = j.ownerDocument.importNode(n, !0)), j.appendChild(n), m.appendChild(j)) : (m.appendChild(this.createElementDefaultNS("Name", n.name)), m.appendChild(this.createElementDefaultNS("Title", n.title)), n["abstract"] && m.appendChild(this.createElementDefaultNS("Abstract", n["abstract"])), n.legend && m.appendChild(this.write_wmc_URLType("LegendURL", n.legend.href, n.legend)));
					k.appendChild(m)
				}
			}
			return k
		},
		write_wmc_OnlineResource : function (d) {
			var c = this.createElementDefaultNS("OnlineResource");
			this.setAttributeNS(c, this.namespaces.xlink, "xlink:type", "simple");
			this.setAttributeNS(c, this.namespaces.xlink, "xlink:href", d);
			return c
		},
		getOnlineResource_href : function (d) {
			var c = {};
			d = d.getElementsByTagName("OnlineResource");
			0 < d.length && this.read_wmc_OnlineResource(c, d[0]);
			return c.href
		},
		CLASS_NAME : "OpenLayers.Format.WMC.v1"
	});
OpenLayers.Control.PanPanel = OpenLayers.Class(OpenLayers.Control.Panel, {
		slideFactor : 50,
		slideRatio : null,
		initialize : function (b) {
			OpenLayers.Control.Panel.prototype.initialize.apply(this, [b]);
			b = {
				slideFactor : this.slideFactor,
				slideRatio : this.slideRatio
			};
			this.addControls([new OpenLayers.Control.Pan(OpenLayers.Control.Pan.NORTH, b), new OpenLayers.Control.Pan(OpenLayers.Control.Pan.SOUTH, b), new OpenLayers.Control.Pan(OpenLayers.Control.Pan.EAST, b), new OpenLayers.Control.Pan(OpenLayers.Control.Pan.WEST, b)])
		},
		CLASS_NAME : "OpenLayers.Control.PanPanel"
	});
OpenLayers.Control.Attribution = OpenLayers.Class(OpenLayers.Control, {
		separator : ", ",
		template : "${layers}",
		destroy : function () {
			this.map.events.un({
				removelayer : this.updateAttribution,
				addlayer : this.updateAttribution,
				changelayer : this.updateAttribution,
				changebaselayer : this.updateAttribution,
				scope : this
			});
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			this.map.events.on({
				changebaselayer : this.updateAttribution,
				changelayer : this.updateAttribution,
				addlayer : this.updateAttribution,
				removelayer : this.updateAttribution,
				scope : this
			});
			this.updateAttribution();
			return this.div
		},
		updateAttribution : function () {
			var h = [];
			if (this.map && this.map.layers) {
				for (var g = 0, f = this.map.layers.length; g < f; g++) {
					var e = this.map.layers[g];
					e.attribution && e.getVisibility() && -1 === OpenLayers.Util.indexOf(h, e.attribution) && h.push(e.attribution)
				}
				this.div.innerHTML = OpenLayers.String.format(this.template, {
						layers : h.join(this.separator)
					})
			}
		},
		CLASS_NAME : "OpenLayers.Control.Attribution"
	});
OpenLayers.Kinetic = OpenLayers.Class({
		threshold : 0,
		deceleration : 0.0035,
		nbPoints : 100,
		delay : 200,
		points : void 0,
		timerId : void 0,
		initialize : function (b) {
			OpenLayers.Util.extend(this, b)
		},
		begin : function () {
			OpenLayers.Animation.stop(this.timerId);
			this.timerId = void 0;
			this.points = []
		},
		update : function (b) {
			this.points.unshift({
				xy : b,
				tick : (new Date).getTime()
			});
			this.points.length > this.nbPoints && this.points.pop()
		},
		end : function (j) {
			for (var i, h = (new Date).getTime(), g = 0, l = this.points.length, k; g < l; g++) {
				k = this.points[g];
				if (h - k.tick > this.delay) {
					break
				}
				i = k
			}
			if (i && (g = (new Date).getTime() - i.tick, h = Math.sqrt(Math.pow(j.x - i.xy.x, 2) + Math.pow(j.y - i.xy.y, 2)), g = h / g, !(0 == g || g < this.threshold))) {
				return h = Math.asin((j.y - i.xy.y) / h),
				i.xy.x <= j.x && (h = Math.PI - h), {
					speed : g,
					theta : h
				}
			}
		},
		move : function (o, n) {
			var m = o.speed,
			l = Math.cos(o.theta),
			k = -Math.sin(o.theta),
			j = (new Date).getTime(),
			i = 0,
			p = 0;
			this.timerId = OpenLayers.Animation.start(OpenLayers.Function.bind(function () {
						if (null != this.timerId) {
							var b = (new Date).getTime() - j,
							c = -this.deceleration * Math.pow(b, 2) / 2 + m * b,
							a = c * l,
							c = c * k,
							e,
							d;
							e = !1;
							0 >= -this.deceleration * b + m && (OpenLayers.Animation.stop(this.timerId), this.timerId = null, e = !0);
							b = a - i;
							d = c - p;
							i = a;
							p = c;
							n(b, d, e)
						}
					}, this))
		},
		CLASS_NAME : "OpenLayers.Kinetic"
	});
OpenLayers.Layer.GeoRSS = OpenLayers.Class(OpenLayers.Layer.Markers, {
		location : null,
		features : null,
		formatOptions : null,
		selectedFeature : null,
		icon : null,
		popupSize : null,
		useFeedTitle : !0,
		initialize : function (d, f, e) {
			OpenLayers.Layer.Markers.prototype.initialize.apply(this, [d, e]);
			this.location = f;
			this.features = []
		},
		destroy : function () {
			OpenLayers.Layer.Markers.prototype.destroy.apply(this, arguments);
			this.clearFeatures();
			this.features = null
		},
		loadRSS : function () {
			this.loaded || (this.events.triggerEvent("loadstart"), OpenLayers.Request.GET({
					url : this.location,
					success : this.parseData,
					scope : this
				}), this.loaded = !0)
		},
		moveTo : function (d, f, e) {
			OpenLayers.Layer.Markers.prototype.moveTo.apply(this, arguments);
			this.visibility && !this.loaded && this.loadRSS()
		},
		parseData : function (l) {
			var i = l.responseXML;
			if (!i || !i.documentElement) {
				i = OpenLayers.Format.XML.prototype.read(l.responseText)
			}
			if (this.useFeedTitle) {
				l = null;
				try {
					l = i.getElementsByTagNameNS("*", "title")[0].firstChild.nodeValue
				} catch (t) {
					l = i.getElementsByTagName("title")[0].firstChild.nodeValue
				}
				l && this.setName(l)
			}
			l = {};
			OpenLayers.Util.extend(l, this.formatOptions);
			this.map && !this.projection.equals(this.map.getProjectionObject()) && (l.externalProjection = this.projection, l.internalProjection = this.map.getProjectionObject());
			i = (new OpenLayers.Format.GeoRSS(l)).read(i);
			l = 0;
			for (var s = i.length; l < s; l++) {
				var r = {},
				q = i[l];
				if (q.geometry) {
					var p = q.attributes.title ? q.attributes.title : "Untitled",
					o = q.attributes.description ? q.attributes.description : "No description.",
					n = q.attributes.link ? q.attributes.link : "",
					q = q.geometry.getBounds().getCenterLonLat();
					r.icon = null == this.icon ? OpenLayers.Marker.defaultIcon() : this.icon.clone();
					r.popupSize = this.popupSize ? this.popupSize.clone() : new OpenLayers.Size(250, 120);
					if (p || o) {
						r.title = p;
						r.description = o;
						var m = '<div class="olLayerGeoRSSClose">[x]</div>',
						m = m + '<div class="olLayerGeoRSSTitle">';
						n && (m += '<a class="link" href="' + n + '" target="_blank">');
						m += p;
						n && (m += "</a>");
						m += "</div>";
						m += '<div style="" class="olLayerGeoRSSDescription">';
						m += o;
						m += "</div>";
						r.popupContentHTML = m
					}
					q = new OpenLayers.Feature(this, q, r);
					this.features.push(q);
					r = q.createMarker();
					r.events.register("click", q, this.markerClick);
					this.addMarker(r)
				}
			}
			this.events.triggerEvent("loadend")
		},
		markerClick : function (h) {
			var g = this == this.layer.selectedFeature;
			this.layer.selectedFeature = !g ? this : null;
			for (var f = 0, e = this.layer.map.popups.length; f < e; f++) {
				this.layer.map.removePopup(this.layer.map.popups[f])
			}
			g || (g = this.createPopup(), OpenLayers.Event.observe(g.div, "click", OpenLayers.Function.bind(function () {
						for (var b = 0, a = this.layer.map.popups.length; b < a; b++) {
							this.layer.map.removePopup(this.layer.map.popups[b])
						}
					}, this)), this.layer.map.addPopup(g));
			OpenLayers.Event.stop(h)
		},
		clearFeatures : function () {
			if (null != this.features) {
				for (; 0 < this.features.length; ) {
					var b = this.features[0];
					OpenLayers.Util.removeItem(this.features, b);
					b.destroy()
				}
			}
		},
		CLASS_NAME : "OpenLayers.Layer.GeoRSS"
	});
OpenLayers.Symbolizer.Point = OpenLayers.Class(OpenLayers.Symbolizer, {
		initialize : function (b) {
			OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Symbolizer.Point"
	});
OpenLayers.Symbolizer.Line = OpenLayers.Class(OpenLayers.Symbolizer, {
		initialize : function (b) {
			OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Symbolizer.Line"
	});
OpenLayers.Symbolizer.Text = OpenLayers.Class(OpenLayers.Symbolizer, {
		initialize : function (b) {
			OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Symbolizer.Text"
	});
OpenLayers.Format.SLD.v1 = OpenLayers.Class(OpenLayers.Format.Filter.v1_0_0, {
		namespaces : {
			sld : "http://www.opengis.net/sld",
			ogc : "http://www.opengis.net/ogc",
			gml : "http://www.opengis.net/gml",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		defaultPrefix : "sld",
		schemaLocation : null,
		multipleSymbolizers : !1,
		featureTypeCounter : null,
		defaultSymbolizer : {
			fillColor : "#808080",
			fillOpacity : 1,
			strokeColor : "#000000",
			strokeOpacity : 1,
			strokeWidth : 1,
			strokeDashstyle : "solid",
			pointRadius : 3,
			graphicName : "square"
		},
		read : function (d, f) {
			f = OpenLayers.Util.applyDefaults(f, this.options);
			var e = {
				namedLayers : !0 === f.namedLayersAsArray ? [] : {}

			};
			this.readChildNodes(d, e);
			return e
		},
		readers : OpenLayers.Util.applyDefaults({
			sld : {
				StyledLayerDescriptor : function (d, c) {
					c.version = d.getAttribute("version");
					this.readChildNodes(d, c)
				},
				Name : function (d, c) {
					c.name = this.getChildValue(d)
				},
				Title : function (d, c) {
					c.title = this.getChildValue(d)
				},
				Abstract : function (d, c) {
					c.description = this.getChildValue(d)
				},
				NamedLayer : function (i, h) {
					var g = {
						userStyles : [],
						namedStyles : []
					};
					this.readChildNodes(i, g);
					for (var f = 0, j = g.userStyles.length; f < j; ++f) {
						g.userStyles[f].layerName = g.name
					}
					OpenLayers.Util.isArray(h.namedLayers) ? h.namedLayers.push(g) : h.namedLayers[g.name] = g
				},
				NamedStyle : function (d, c) {
					c.namedStyles.push(this.getChildName(d.firstChild))
				},
				UserStyle : function (d, f) {
					var e = {
						defaultsPerSymbolizer : !0,
						rules : []
					};
					this.featureTypeCounter = -1;
					this.readChildNodes(d, e);
					this.multipleSymbolizers ? (delete e.defaultsPerSymbolizer, e = new OpenLayers.Style2(e)) : e = new OpenLayers.Style(this.defaultSymbolizer, e);
					f.userStyles.push(e)
				},
				IsDefault : function (d, c) {
					"1" == this.getChildValue(d) && (c.isDefault = !0)
				},
				FeatureTypeStyle : function (d, f) {
					++this.featureTypeCounter;
					var e = {
						rules : this.multipleSymbolizers ? f.rules : []
					};
					this.readChildNodes(d, e);
					this.multipleSymbolizers || (f.rules = e.rules)
				},
				Rule : function (d, f) {
					var e;
					this.multipleSymbolizers && (e = {
							symbolizers : []
						});
					e = new OpenLayers.Rule(e);
					this.readChildNodes(d, e);
					f.rules.push(e)
				},
				ElseFilter : function (d, c) {
					c.elseFilter = !0
				},
				MinScaleDenominator : function (d, c) {
					c.minScaleDenominator = parseFloat(this.getChildValue(d))
				},
				MaxScaleDenominator : function (d, c) {
					c.maxScaleDenominator = parseFloat(this.getChildValue(d))
				},
				TextSymbolizer : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					this.multipleSymbolizers ? (e.zIndex = this.featureTypeCounter, f.symbolizers.push(new OpenLayers.Symbolizer.Text(e))) : f.symbolizer.Text = OpenLayers.Util.applyDefaults(e, f.symbolizer.Text)
				},
				LabelPlacement : function (d, c) {
					this.readChildNodes(d, c)
				},
				PointPlacement : function (j, i) {
					var h = {};
					this.readChildNodes(j, h);
					h.labelRotation = h.rotation;
					delete h.rotation;
					var g,
					l = i.labelAnchorPointX,
					k = i.labelAnchorPointY;
					l <= 1 / 3 ? g = "l" : l > 1 / 3 && l < 2 / 3 ? g = "c" : l >= 2 / 3 && (g = "r");
					k <= 1 / 3 ? g += "b" : k > 1 / 3 && k < 2 / 3 ? g += "m" : k >= 2 / 3 && (g += "t");
					h.labelAlign = g;
					OpenLayers.Util.applyDefaults(i, h)
				},
				AnchorPoint : function (d, c) {
					this.readChildNodes(d, c)
				},
				AnchorPointX : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.labelAnchorPointX = e)
				},
				AnchorPointY : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.labelAnchorPointY = e)
				},
				Displacement : function (d, c) {
					this.readChildNodes(d, c)
				},
				DisplacementX : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.labelXOffset = e)
				},
				DisplacementY : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.labelYOffset = e)
				},
				LinePlacement : function (d, c) {
					this.readChildNodes(d, c)
				},
				PerpendicularOffset : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.labelPerpendicularOffset = e)
				},
				Label : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.label = e)
				},
				Font : function (d, c) {
					this.readChildNodes(d, c)
				},
				Halo : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.haloRadius = e.haloRadius;
					f.haloColor = e.fillColor;
					f.haloOpacity = e.fillOpacity
				},
				Radius : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					null != e && (f.haloRadius = e)
				},
				RasterSymbolizer : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					this.multipleSymbolizers ? (e.zIndex = this.featureTypeCounter, f.symbolizers.push(new OpenLayers.Symbolizer.Raster(e))) : f.symbolizer.Raster = OpenLayers.Util.applyDefaults(e, f.symbolizer.Raster)
				},
				Geometry : function (d, c) {
					c.geometry = {};
					this.readChildNodes(d, c.geometry)
				},
				ColorMap : function (d, c) {
					c.colorMap = [];
					this.readChildNodes(d, c.colorMap)
				},
				ColorMapEntry : function (h, g) {
					var f = h.getAttribute("quantity"),
					e = h.getAttribute("opacity");
					g.push({
						color : h.getAttribute("color"),
						quantity : null !== f ? parseFloat(f) : void 0,
						label : h.getAttribute("label") || void 0,
						opacity : null !== e ? parseFloat(e) : void 0
					})
				},
				LineSymbolizer : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					this.multipleSymbolizers ? (e.zIndex = this.featureTypeCounter, f.symbolizers.push(new OpenLayers.Symbolizer.Line(e))) : f.symbolizer.Line = OpenLayers.Util.applyDefaults(e, f.symbolizer.Line)
				},
				PolygonSymbolizer : function (d, f) {
					var e = {
						fill : !1,
						stroke : !1
					};
					this.multipleSymbolizers || (e = f.symbolizer.Polygon || e);
					this.readChildNodes(d, e);
					this.multipleSymbolizers ? (e.zIndex = this.featureTypeCounter, f.symbolizers.push(new OpenLayers.Symbolizer.Polygon(e))) : f.symbolizer.Polygon = e
				},
				PointSymbolizer : function (d, f) {
					var e = {
						fill : !1,
						stroke : !1,
						graphic : !1
					};
					this.multipleSymbolizers || (e = f.symbolizer.Point || e);
					this.readChildNodes(d, e);
					this.multipleSymbolizers ? (e.zIndex = this.featureTypeCounter, f.symbolizers.push(new OpenLayers.Symbolizer.Point(e))) : f.symbolizer.Point = e
				},
				Stroke : function (d, c) {
					c.stroke = !0;
					this.readChildNodes(d, c)
				},
				Fill : function (d, c) {
					c.fill = !0;
					this.readChildNodes(d, c)
				},
				CssParameter : function (h, g) {
					var f = h.getAttribute("name"),
					e = this.cssMap[f];
					g.label && ("fill" === f ? e = "fontColor" : "fill-opacity" === f && (e = "fontOpacity"));
					e && (f = this.readers.ogc._expression.call(this, h)) && (g[e] = f)
				},
				Graphic : function (o, n) {
					n.graphic = !0;
					var m = {};
					this.readChildNodes(o, m);
					for (var l = "stroke strokeColor strokeWidth strokeOpacity strokeLinecap fill fillColor fillOpacity graphicName rotation graphicFormat".split(" "), k, j, i = 0, p = l.length; i < p; ++i) {
						k = l[i],
						j = m[k],
						void 0 != j && (n[k] = j)
					}
					void 0 != m.opacity && (n.graphicOpacity = m.opacity);
					void 0 != m.size && (isNaN(m.size / 2) ? n.graphicWidth = m.size : n.pointRadius = m.size / 2);
					void 0 != m.href && (n.externalGraphic = m.href);
					void 0 != m.rotation && (n.rotation = m.rotation)
				},
				ExternalGraphic : function (d, c) {
					this.readChildNodes(d, c)
				},
				Mark : function (d, c) {
					this.readChildNodes(d, c)
				},
				WellKnownName : function (d, c) {
					c.graphicName = this.getChildValue(d)
				},
				Opacity : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.opacity = e)
				},
				Size : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.size = e)
				},
				Rotation : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.rotation = e)
				},
				OnlineResource : function (d, c) {
					c.href = this.getAttributeNS(d, this.namespaces.xlink, "href")
				},
				Format : function (d, c) {
					c.graphicFormat = this.getChildValue(d)
				}
			}
		}, OpenLayers.Format.Filter.v1_0_0.prototype.readers),
		cssMap : {
			stroke : "strokeColor",
			"stroke-opacity" : "strokeOpacity",
			"stroke-width" : "strokeWidth",
			"stroke-linecap" : "strokeLinecap",
			"stroke-dasharray" : "strokeDashstyle",
			fill : "fillColor",
			"fill-opacity" : "fillOpacity",
			"font-family" : "fontFamily",
			"font-size" : "fontSize",
			"font-weight" : "fontWeight",
			"font-style" : "fontStyle"
		},
		getCssProperty : function (d) {
			var f = null,
			e;
			for (e in this.cssMap) {
				if (this.cssMap[e] == d) {
					f = e;
					break
				}
			}
			return f
		},
		getGraphicFormat : function (d) {
			var f,
			e;
			for (e in this.graphicFormats) {
				if (this.graphicFormats[e].test(d)) {
					f = e;
					break
				}
			}
			return f || this.defaultGraphicFormat
		},
		defaultGraphicFormat : "image/png",
		graphicFormats : {
			"image/jpeg" : /\.jpe?g$/i,
			"image/gif" : /\.gif$/i,
			"image/png" : /\.png$/i
		},
		write : function (b) {
			return this.writers.sld.StyledLayerDescriptor.apply(this, [b])
		},
		writers : OpenLayers.Util.applyDefaults({
			sld : {
				_OGCExpression : function (o, n) {
					var m = this.createElementNSPlus(o),
					l = "string" == typeof n ? n.split("${") : [n];
					m.appendChild(this.createTextNode(l[0]));
					for (var k, j, i = 1, p = l.length; i < p; i++) {
						k = l[i],
						j = k.indexOf("}"),
						0 < j ? (this.writeNode("ogc:PropertyName", {
								property : k.substring(0, j)
							}, m), m.appendChild(this.createTextNode(k.substring(++j)))) : m.appendChild(this.createTextNode("${" + k))
					}
					return m
				},
				StyledLayerDescriptor : function (h) {
					var g = this.createElementNSPlus("sld:StyledLayerDescriptor", {
							attributes : {
								version : this.VERSION,
								"xsi:schemaLocation" : this.schemaLocation
							}
						});
					g.setAttribute("xmlns:ogc", this.namespaces.ogc);
					g.setAttribute("xmlns:gml", this.namespaces.gml);
					h.name && this.writeNode("Name", h.name, g);
					h.title && this.writeNode("Title", h.title, g);
					h.description && this.writeNode("Abstract", h.description, g);
					if (OpenLayers.Util.isArray(h.namedLayers)) {
						for (var f = 0, e = h.namedLayers.length; f < e; ++f) {
							this.writeNode("NamedLayer", h.namedLayers[f], g)
						}
					} else {
						for (f in h.namedLayers) {
							this.writeNode("NamedLayer", h.namedLayers[f], g)
						}
					}
					return g
				},
				Name : function (b) {
					return this.createElementNSPlus("sld:Name", {
						value : b
					})
				},
				Title : function (b) {
					return this.createElementNSPlus("sld:Title", {
						value : b
					})
				},
				Abstract : function (b) {
					return this.createElementNSPlus("sld:Abstract", {
						value : b
					})
				},
				NamedLayer : function (h) {
					var g = this.createElementNSPlus("sld:NamedLayer");
					this.writeNode("Name", h.name, g);
					if (h.namedStyles) {
						for (var f = 0, e = h.namedStyles.length; f < e; ++f) {
							this.writeNode("NamedStyle", h.namedStyles[f], g)
						}
					}
					if (h.userStyles) {
						f = 0;
						for (e = h.userStyles.length; f < e; ++f) {
							this.writeNode("UserStyle", h.userStyles[f], g)
						}
					}
					return g
				},
				NamedStyle : function (d) {
					var c = this.createElementNSPlus("sld:NamedStyle");
					this.writeNode("Name", d, c);
					return c
				},
				UserStyle : function (u) {
					var t = this.createElementNSPlus("sld:UserStyle");
					u.name && this.writeNode("Name", u.name, t);
					u.title && this.writeNode("Title", u.title, t);
					u.description && this.writeNode("Abstract", u.description, t);
					u.isDefault && this.writeNode("IsDefault", u.isDefault, t);
					if (this.multipleSymbolizers && u.rules) {
						for (var s = {
								"0" : []
							}, r = [0], q, p, o, i, z, y = 0, x = u.rules.length; y < x; ++y) {
							if (q = u.rules[y], q.symbolizers) {
								p = {};
								for (var w = 0, v = q.symbolizers.length; w < v; ++w) {
									o = q.symbolizers[w],
									i = o.zIndex,
									i in p || (z = q.clone(), z.symbolizers = [], p[i] = z),
									p[i].symbolizers.push(o.clone())
								}
								for (i in p) {
									i in s || (r.push(i), s[i] = []),
									s[i].push(p[i])
								}
							} else {
								s[0].push(q.clone())
							}
						}
						r.sort();
						y = 0;
						for (x = r.length; y < x; ++y) {
							q = s[r[y]],
							0 < q.length && (z = u.clone(), z.rules = s[r[y]], this.writeNode("FeatureTypeStyle", z, t))
						}
					} else {
						this.writeNode("FeatureTypeStyle", u, t)
					}
					return t
				},
				IsDefault : function (b) {
					return this.createElementNSPlus("sld:IsDefault", {
						value : b ? "1" : "0"
					})
				},
				FeatureTypeStyle : function (h) {
					for (var g = this.createElementNSPlus("sld:FeatureTypeStyle"), f = 0, e = h.rules.length; f < e; ++f) {
						this.writeNode("Rule", h.rules[f], g)
					}
					return g
				},
				Rule : function (l) {
					var k = this.createElementNSPlus("sld:Rule");
					l.name && this.writeNode("Name", l.name, k);
					l.title && this.writeNode("Title", l.title, k);
					l.description && this.writeNode("Abstract", l.description, k);
					l.elseFilter ? this.writeNode("ElseFilter", null, k) : l.filter && this.writeNode("ogc:Filter", l.filter, k);
					void 0 != l.minScaleDenominator && this.writeNode("MinScaleDenominator", l.minScaleDenominator, k);
					void 0 != l.maxScaleDenominator && this.writeNode("MaxScaleDenominator", l.maxScaleDenominator, k);
					var j,
					i;
					if (this.multipleSymbolizers && l.symbolizers) {
						for (var h = 0, n = l.symbolizers.length; h < n; ++h) {
							i = l.symbolizers[h],
							j = i.CLASS_NAME.split(".").pop(),
							this.writeNode(j + "Symbolizer", i, k)
						}
					} else {
						for (var n = OpenLayers.Style.SYMBOLIZER_PREFIXES, h = 0, m = n.length; h < m; ++h) {
							j = n[h],
							(i = l.symbolizer[j]) && this.writeNode(j + "Symbolizer", i, k)
						}
					}
					return k
				},
				ElseFilter : function () {
					return this.createElementNSPlus("sld:ElseFilter")
				},
				MinScaleDenominator : function (b) {
					return this.createElementNSPlus("sld:MinScaleDenominator", {
						value : b
					})
				},
				MaxScaleDenominator : function (b) {
					return this.createElementNSPlus("sld:MaxScaleDenominator", {
						value : b
					})
				},
				LineSymbolizer : function (d) {
					var c = this.createElementNSPlus("sld:LineSymbolizer");
					this.writeNode("Stroke", d, c);
					return c
				},
				Stroke : function (d) {
					var c = this.createElementNSPlus("sld:Stroke");
					void 0 != d.strokeColor && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "strokeColor"
					}, c);
					void 0 != d.strokeOpacity && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "strokeOpacity"
					}, c);
					void 0 != d.strokeWidth && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "strokeWidth"
					}, c);
					void 0 != d.strokeDashstyle && "solid" !== d.strokeDashstyle && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "strokeDashstyle"
					}, c);
					void 0 != d.strokeLinecap && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "strokeLinecap"
					}, c);
					return c
				},
				CssParameter : function (b) {
					return this.createElementNSPlus("sld:CssParameter", {
						attributes : {
							name : this.getCssProperty(b.key)
						},
						value : b.symbolizer[b.key]
					})
				},
				TextSymbolizer : function (d) {
					var c = this.createElementNSPlus("sld:TextSymbolizer");
					null != d.label && this.writeNode("Label", d.label, c);
					(null != d.fontFamily || null != d.fontSize || null != d.fontWeight || null != d.fontStyle) && this.writeNode("Font", d, c);
					(null != d.labelAnchorPointX || null != d.labelAnchorPointY || null != d.labelAlign || null != d.labelXOffset || null != d.labelYOffset || null != d.labelRotation || null != d.labelPerpendicularOffset) && this.writeNode("LabelPlacement", d, c);
					(null != d.haloRadius || null != d.haloColor || null != d.haloOpacity) && this.writeNode("Halo", d, c);
					(null != d.fontColor || null != d.fontOpacity) && this.writeNode("Fill", {
						fillColor : d.fontColor,
						fillOpacity : d.fontOpacity
					}, c);
					return c
				},
				LabelPlacement : function (d) {
					var c = this.createElementNSPlus("sld:LabelPlacement");
					(null != d.labelAnchorPointX || null != d.labelAnchorPointY || null != d.labelAlign || null != d.labelXOffset || null != d.labelYOffset || null != d.labelRotation) && null == d.labelPerpendicularOffset && this.writeNode("PointPlacement", d, c);
					null != d.labelPerpendicularOffset && this.writeNode("LinePlacement", d, c);
					return c
				},
				LinePlacement : function (d) {
					var c = this.createElementNSPlus("sld:LinePlacement");
					this.writeNode("PerpendicularOffset", d.labelPerpendicularOffset, c);
					return c
				},
				PerpendicularOffset : function (b) {
					return this.createElementNSPlus("sld:PerpendicularOffset", {
						value : b
					})
				},
				PointPlacement : function (d) {
					var c = this.createElementNSPlus("sld:PointPlacement");
					(null != d.labelAnchorPointX || null != d.labelAnchorPointY || null != d.labelAlign) && this.writeNode("AnchorPoint", d, c);
					(null != d.labelXOffset || null != d.labelYOffset) && this.writeNode("Displacement", d, c);
					null != d.labelRotation && this.writeNode("Rotation", d.labelRotation, c);
					return c
				},
				AnchorPoint : function (i) {
					var h = this.createElementNSPlus("sld:AnchorPoint"),
					g = i.labelAnchorPointX,
					f = i.labelAnchorPointY;
					null != g && this.writeNode("AnchorPointX", g, h);
					null != f && this.writeNode("AnchorPointY", f, h);
					if (null == g && null == f) {
						var j = i.labelAlign.substr(0, 1);
						i = i.labelAlign.substr(1, 1);
						"l" === j ? g = 0 : "c" === j ? g = 0.5 : "r" === j && (g = 1);
						"b" === i ? f = 0 : "m" === i ? f = 0.5 : "t" === i && (f = 1);
						this.writeNode("AnchorPointX", g, h);
						this.writeNode("AnchorPointY", f, h)
					}
					return h
				},
				AnchorPointX : function (b) {
					return this.createElementNSPlus("sld:AnchorPointX", {
						value : b
					})
				},
				AnchorPointY : function (b) {
					return this.createElementNSPlus("sld:AnchorPointY", {
						value : b
					})
				},
				Displacement : function (d) {
					var c = this.createElementNSPlus("sld:Displacement");
					null != d.labelXOffset && this.writeNode("DisplacementX", d.labelXOffset, c);
					null != d.labelYOffset && this.writeNode("DisplacementY", d.labelYOffset, c);
					return c
				},
				DisplacementX : function (b) {
					return this.createElementNSPlus("sld:DisplacementX", {
						value : b
					})
				},
				DisplacementY : function (b) {
					return this.createElementNSPlus("sld:DisplacementY", {
						value : b
					})
				},
				Font : function (d) {
					var c = this.createElementNSPlus("sld:Font");
					d.fontFamily && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "fontFamily"
					}, c);
					d.fontSize && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "fontSize"
					}, c);
					d.fontWeight && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "fontWeight"
					}, c);
					d.fontStyle && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "fontStyle"
					}, c);
					return c
				},
				Label : function (b) {
					return this.writers.sld._OGCExpression.call(this, "sld:Label", b)
				},
				Halo : function (d) {
					var c = this.createElementNSPlus("sld:Halo");
					d.haloRadius && this.writeNode("Radius", d.haloRadius, c);
					(d.haloColor || d.haloOpacity) && this.writeNode("Fill", {
						fillColor : d.haloColor,
						fillOpacity : d.haloOpacity
					}, c);
					return c
				},
				Radius : function (b) {
					return this.createElementNSPlus("sld:Radius", {
						value : b
					})
				},
				RasterSymbolizer : function (d) {
					var c = this.createElementNSPlus("sld:RasterSymbolizer");
					d.geometry && this.writeNode("Geometry", d.geometry, c);
					d.opacity && this.writeNode("Opacity", d.opacity, c);
					d.colorMap && this.writeNode("ColorMap", d.colorMap, c);
					return c
				},
				Geometry : function (d) {
					var c = this.createElementNSPlus("sld:Geometry");
					d.property && this.writeNode("ogc:PropertyName", d, c);
					return c
				},
				ColorMap : function (h) {
					for (var g = this.createElementNSPlus("sld:ColorMap"), f = 0, e = h.length; f < e; ++f) {
						this.writeNode("ColorMapEntry", h[f], g)
					}
					return g
				},
				ColorMapEntry : function (d) {
					var c = this.createElementNSPlus("sld:ColorMapEntry");
					c.setAttribute("color", d.color);
					void 0 !== d.opacity && c.setAttribute("opacity", parseFloat(d.opacity));
					void 0 !== d.quantity && c.setAttribute("quantity", parseFloat(d.quantity));
					void 0 !== d.label && c.setAttribute("label", d.label);
					return c
				},
				PolygonSymbolizer : function (d) {
					var c = this.createElementNSPlus("sld:PolygonSymbolizer");
					!1 !== d.fill && this.writeNode("Fill", d, c);
					!1 !== d.stroke && this.writeNode("Stroke", d, c);
					return c
				},
				Fill : function (d) {
					var c = this.createElementNSPlus("sld:Fill");
					d.fillColor && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "fillColor"
					}, c);
					null != d.fillOpacity && this.writeNode("CssParameter", {
						symbolizer : d,
						key : "fillOpacity"
					}, c);
					return c
				},
				PointSymbolizer : function (d) {
					var c = this.createElementNSPlus("sld:PointSymbolizer");
					this.writeNode("Graphic", d, c);
					return c
				},
				Graphic : function (d) {
					var c = this.createElementNSPlus("sld:Graphic");
					void 0 != d.externalGraphic ? this.writeNode("ExternalGraphic", d, c) : this.writeNode("Mark", d, c);
					void 0 != d.graphicOpacity && this.writeNode("Opacity", d.graphicOpacity, c);
					void 0 != d.pointRadius ? this.writeNode("Size", 2 * d.pointRadius, c) : void 0 != d.graphicWidth && this.writeNode("Size", d.graphicWidth, c);
					void 0 != d.rotation && this.writeNode("Rotation", d.rotation, c);
					return c
				},
				ExternalGraphic : function (d) {
					var c = this.createElementNSPlus("sld:ExternalGraphic");
					this.writeNode("OnlineResource", d.externalGraphic, c);
					d = d.graphicFormat || this.getGraphicFormat(d.externalGraphic);
					this.writeNode("Format", d, c);
					return c
				},
				Mark : function (d) {
					var c = this.createElementNSPlus("sld:Mark");
					d.graphicName && this.writeNode("WellKnownName", d.graphicName, c);
					!1 !== d.fill && this.writeNode("Fill", d, c);
					!1 !== d.stroke && this.writeNode("Stroke", d, c);
					return c
				},
				WellKnownName : function (b) {
					return this.createElementNSPlus("sld:WellKnownName", {
						value : b
					})
				},
				Opacity : function (b) {
					return this.createElementNSPlus("sld:Opacity", {
						value : b
					})
				},
				Size : function (b) {
					return this.writers.sld._OGCExpression.call(this, "sld:Size", b)
				},
				Rotation : function (b) {
					return this.createElementNSPlus("sld:Rotation", {
						value : b
					})
				},
				OnlineResource : function (b) {
					return this.createElementNSPlus("sld:OnlineResource", {
						attributes : {
							"xlink:type" : "simple",
							"xlink:href" : b
						}
					})
				},
				Format : function (b) {
					return this.createElementNSPlus("sld:Format", {
						value : b
					})
				}
			}
		}, OpenLayers.Format.Filter.v1_0_0.prototype.writers),
		CLASS_NAME : "OpenLayers.Format.SLD.v1"
	});
OpenLayers.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.Grid, {
		DEFAULT_PARAMS : {
			service : "WMS",
			version : "1.1.1",
			request : "GetMap",
			styles : "",
			format : "image/jpeg"
		},
		isBaseLayer : !0,
		encodeBBOX : !1,
		noMagic : !1,
		yx : {},
		initialize : function (i, h, g, f) {
			var j = [];
			g = OpenLayers.Util.upperCaseObject(g);
			1.3 <= parseFloat(g.VERSION) && !g.EXCEPTIONS && (g.EXCEPTIONS = "INIMAGE");
			j.push(i, h, g, f);
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, j);
			OpenLayers.Util.applyDefaults(this.params, OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS));
			if (!this.noMagic && this.params.TRANSPARENT && "true" == this.params.TRANSPARENT.toString().toLowerCase()) {
				if (null == f || !f.isBaseLayer) {
					this.isBaseLayer = !1
				}
				"image/jpeg" == this.params.FORMAT && (this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif" : "image/png")
			}
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.WMS(this.name, this.url, this.params, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		reverseAxisOrder : function () {
			var b = this.projection.getCode();
			return 1.3 <= parseFloat(this.params.VERSION) && !(!this.yx[b] && !OpenLayers.Projection.defaults[b].yx)
		},
		getURL : function (h) {
			h = this.adjustBounds(h);
			var g = this.getImageSize(),
			f = {},
			e = this.reverseAxisOrder();
			f.BBOX = this.encodeBBOX ? h.toBBOX(null, e) : h.toArray(e);
			f.WIDTH = g.w;
			f.HEIGHT = g.h;
			return this.getFullRequestString(f)
		},
		mergeNewParams : function (b) {
			b = [OpenLayers.Util.upperCaseObject(b)];
			return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, b)
		},
		getFullRequestString : function (d, f) {
			var e = this.map.getProjectionObject(),
			e = this.projection && this.projection.equals(e) ? this.projection.getCode() : e.getCode(),
			e = "none" == e ? null : e;
			1.3 <= parseFloat(this.params.VERSION) ? this.params.CRS = e : this.params.SRS = e;
			"boolean" == typeof this.params.TRANSPARENT && (d.TRANSPARENT = this.params.TRANSPARENT ? "TRUE" : "FALSE");
			return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Layer.WMS"
	});
OpenLayers.Format.WMC.v1_1_0 = OpenLayers.Class(OpenLayers.Format.WMC.v1, {
		VERSION : "1.1.0",
		schemaLocation : "http://www.opengis.net/context http://schemas.opengis.net/context/1.1.0/context.xsd",
		initialize : function (b) {
			OpenLayers.Format.WMC.v1.prototype.initialize.apply(this, [b])
		},
		read_sld_MinScaleDenominator : function (d, f) {
			var e = parseFloat(this.getChildValue(f));
			0 < e && (d.maxScale = e)
		},
		read_sld_MaxScaleDenominator : function (d, c) {
			d.minScale = parseFloat(this.getChildValue(c))
		},
		read_wmc_SRS : function (d, c) {
			"srs" in d || (d.srs = {});
			d.srs[this.getChildValue(c)] = !0
		},
		write_wmc_Layer : function (h) {
			var g = OpenLayers.Format.WMC.v1.prototype.write_wmc_Layer.apply(this, [h]);
			if (h.maxScale) {
				var f = this.createElementNS(this.namespaces.sld, "sld:MinScaleDenominator");
				f.appendChild(this.createTextNode(h.maxScale.toPrecision(16)));
				g.appendChild(f)
			}
			h.minScale && (f = this.createElementNS(this.namespaces.sld, "sld:MaxScaleDenominator"), f.appendChild(this.createTextNode(h.minScale.toPrecision(16))), g.appendChild(f));
			if (h.srs) {
				for (var e in h.srs) {
					g.appendChild(this.createElementDefaultNS("SRS", e))
				}
			}
			g.appendChild(this.write_wmc_FormatList(h));
			g.appendChild(this.write_wmc_StyleList(h));
			h.dimensions && g.appendChild(this.write_wmc_DimensionList(h));
			g.appendChild(this.write_wmc_LayerExtension(h));
			return g
		},
		CLASS_NAME : "OpenLayers.Format.WMC.v1_1_0"
	});
OpenLayers.Format.XLS = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.1.0",
		stringifyOutput : !0,
		CLASS_NAME : "OpenLayers.Format.XLS"
	});
OpenLayers.Format.XLS.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			xls : "http://www.opengis.net/xls",
			gml : "http://www.opengis.net/gml",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		xy : !0,
		defaultPrefix : "xls",
		schemaLocation : null,
		read : function (d, f) {
			OpenLayers.Util.applyDefaults(f, this.options);
			var e = {};
			this.readChildNodes(d, e);
			return e
		},
		readers : {
			xls : {
				XLS : function (d, c) {
					c.version = d.getAttribute("version");
					this.readChildNodes(d, c)
				},
				Response : function (d, c) {
					this.readChildNodes(d, c)
				},
				GeocodeResponse : function (d, c) {
					c.responseLists = [];
					this.readChildNodes(d, c)
				},
				GeocodeResponseList : function (d, f) {
					var e = {
						features : [],
						numberOfGeocodedAddresses : parseInt(d.getAttribute("numberOfGeocodedAddresses"))
					};
					f.responseLists.push(e);
					this.readChildNodes(d, e)
				},
				GeocodedAddress : function (d, f) {
					var e = new OpenLayers.Feature.Vector;
					f.features.push(e);
					this.readChildNodes(d, e);
					e.geometry = e.components[0]
				},
				GeocodeMatchCode : function (d, c) {
					c.attributes.matchCode = {
						accuracy : parseFloat(d.getAttribute("accuracy")),
						matchType : d.getAttribute("matchType")
					}
				},
				Address : function (d, f) {
					var e = {
						countryCode : d.getAttribute("countryCode"),
						addressee : d.getAttribute("addressee"),
						street : [],
						place : []
					};
					f.attributes.address = e;
					this.readChildNodes(d, e)
				},
				freeFormAddress : function (d, c) {
					c.freeFormAddress = this.getChildValue(d)
				},
				StreetAddress : function (d, c) {
					this.readChildNodes(d, c)
				},
				Building : function (d, c) {
					c.building = {
						number : d.getAttribute("number"),
						subdivision : d.getAttribute("subdivision"),
						buildingName : d.getAttribute("buildingName")
					}
				},
				Street : function (d, c) {
					c.street.push(this.getChildValue(d))
				},
				Place : function (d, c) {
					c.place[d.getAttribute("type")] = this.getChildValue(d)
				},
				PostalCode : function (d, c) {
					c.postalCode = this.getChildValue(d)
				}
			},
			gml : OpenLayers.Format.GML.v3.prototype.readers.gml
		},
		write : function (b) {
			return this.writers.xls.XLS.apply(this, [b])
		},
		writers : {
			xls : {
				XLS : function (d) {
					var c = this.createElementNSPlus("xls:XLS", {
							attributes : {
								version : this.VERSION,
								"xsi:schemaLocation" : this.schemaLocation
							}
						});
					this.writeNode("RequestHeader", d.header, c);
					this.writeNode("Request", d, c);
					return c
				},
				RequestHeader : function () {
					return this.createElementNSPlus("xls:RequestHeader")
				},
				Request : function (d) {
					var c = this.createElementNSPlus("xls:Request", {
							attributes : {
								methodName : "GeocodeRequest",
								requestID : d.requestID || "",
								version : this.VERSION
							}
						});
					this.writeNode("GeocodeRequest", d.addresses, c);
					return c
				},
				GeocodeRequest : function (h) {
					for (var g = this.createElementNSPlus("xls:GeocodeRequest"), f = 0, e = h.length; f < e; f++) {
						this.writeNode("Address", h[f], g)
					}
					return g
				},
				Address : function (d) {
					var c = this.createElementNSPlus("xls:Address", {
							attributes : {
								countryCode : d.countryCode
							}
						});
					d.freeFormAddress ? this.writeNode("freeFormAddress", d.freeFormAddress, c) : (d.street && this.writeNode("StreetAddress", d, c), d.municipality && this.writeNode("Municipality", d.municipality, c), d.countrySubdivision && this.writeNode("CountrySubdivision", d.countrySubdivision, c), d.postalCode && this.writeNode("PostalCode", d.postalCode, c));
					return c
				},
				freeFormAddress : function (b) {
					return this.createElementNSPlus("freeFormAddress", {
						value : b
					})
				},
				StreetAddress : function (h) {
					var g = this.createElementNSPlus("xls:StreetAddress");
					h.building && this.writeNode(g, "Building", h.building);
					h = h.street;
					OpenLayers.Util.isArray(h) || (h = [h]);
					for (var f = 0, e = h.length; f < e; f++) {
						this.writeNode("Street", h[f], g)
					}
					return g
				},
				Building : function (b) {
					return this.createElementNSPlus("xls:Building", {
						attributes : {
							number : b.number,
							subdivision : b.subdivision,
							buildingName : b.buildingName
						}
					})
				},
				Street : function (b) {
					return this.createElementNSPlus("xls:Street", {
						value : b
					})
				},
				Municipality : function (b) {
					return this.createElementNSPlus("xls:Place", {
						attributes : {
							type : "Municipality"
						},
						value : b
					})
				},
				CountrySubdivision : function (b) {
					return this.createElementNSPlus("xls:Place", {
						attributes : {
							type : "CountrySubdivision"
						},
						value : b
					})
				},
				PostalCode : function (b) {
					return this.createElementNSPlus("xls:PostalCode", {
						value : b
					})
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.XLS.v1"
	});
OpenLayers.Format.XLS.v1_1_0 = OpenLayers.Class(OpenLayers.Format.XLS.v1, {
		VERSION : "1.1",
		schemaLocation : "http://www.opengis.net/xls http://schemas.opengis.net/ols/1.1.0/LocationUtilityService.xsd",
		CLASS_NAME : "OpenLayers.Format.XLS.v1_1_0"
	});
OpenLayers.Format.XLS.v1_1 = OpenLayers.Format.XLS.v1_1_0;
OpenLayers.Renderer.SVG = OpenLayers.Class(OpenLayers.Renderer.Elements, {
		xmlns : "http://www.w3.org/2000/svg",
		xlinkns : "http://www.w3.org/1999/xlink",
		MAX_PIXEL : 15000,
		translationParameters : null,
		symbolMetrics : null,
		initialize : function (b) {
			this.supported() && (OpenLayers.Renderer.Elements.prototype.initialize.apply(this, arguments), this.translationParameters = {
					x : 0,
					y : 0
				}, this.symbolMetrics = {})
		},
		supported : function () {
			return document.implementation && (document.implementation.hasFeature("org.w3c.svg", "1.0") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#SVG", "1.1") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))
		},
		inValidRange : function (d, f, e) {
			d += e ? 0 : this.translationParameters.x;
			f += e ? 0 : this.translationParameters.y;
			return d >= -this.MAX_PIXEL && d <= this.MAX_PIXEL && f >= -this.MAX_PIXEL && f <= this.MAX_PIXEL
		},
		setExtent : function (i, h) {
			var g = OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments),
			f = this.getResolution(),
			j = -i.left / f,
			f = i.top / f;
			if (h) {
				return this.left = j,
				this.top = f,
				this.rendererRoot.setAttributeNS(null, "viewBox", "0 0 " + this.size.w + " " + this.size.h),
				this.translate(this.xOffset, 0),
				!0
			}
			(j = this.translate(j - this.left + this.xOffset, f - this.top)) || this.setExtent(i, !0);
			return g && j
		},
		translate : function (d, f) {
			if (this.inValidRange(d, f, !0)) {
				var e = "";
				if (d || f) {
					e = "translate(" + d + "," + f + ")"
				}
				this.root.setAttributeNS(null, "transform", e);
				this.translationParameters = {
					x : d,
					y : f
				};
				return !0
			}
			return !1
		},
		setSize : function (b) {
			OpenLayers.Renderer.prototype.setSize.apply(this, arguments);
			this.rendererRoot.setAttributeNS(null, "width", this.size.w);
			this.rendererRoot.setAttributeNS(null, "height", this.size.h)
		},
		getNodeType : function (d, f) {
			var e = null;
			switch (d.CLASS_NAME) {
			case "OpenLayers.Geometry.Point":
				e = f.externalGraphic ? "image" : this.isComplexSymbol(f.graphicName) ? "svg" : "circle";
				break;
			case "OpenLayers.Geometry.Rectangle":
				e = "rect";
				break;
			case "OpenLayers.Geometry.LineString":
				e = "polyline";
				break;
			case "OpenLayers.Geometry.LinearRing":
				e = "polygon";
				break;
			case "OpenLayers.Geometry.Polygon":
			case "OpenLayers.Geometry.Curve":
				e = "path"
			}
			return e
		},
		setStyle : function (l, i, t) {
			i = i || l._style;
			t = t || l._options;
			var s = parseFloat(l.getAttributeNS(null, "r")),
			r = 1,
			q;
			if ("OpenLayers.Geometry.Point" == l._geometryClass && s) {
				l.style.visibility = "";
				if (!1 === i.graphic) {
					l.style.visibility = "hidden"
				} else {
					if (i.externalGraphic) {
						q = this.getPosition(l);
						i.graphicTitle && (l.setAttributeNS(null, "title", i.graphicTitle), s = l.getElementsByTagName("title"), 0 < s.length ? s[0].firstChild.textContent = i.graphicTitle : (s = this.nodeFactory(null, "title"), s.textContent = i.graphicTitle, l.appendChild(s)));
						i.graphicWidth && i.graphicHeight && l.setAttributeNS(null, "preserveAspectRatio", "none");
						var s = i.graphicWidth || i.graphicHeight,
						p = i.graphicHeight || i.graphicWidth,
						s = s ? s : 2 * i.pointRadius,
						p = p ? p : 2 * i.pointRadius,
						o = void 0 != i.graphicYOffset ? i.graphicYOffset :  - (0.5 * p),
						n = i.graphicOpacity || i.fillOpacity;
						l.setAttributeNS(null, "x", (q.x + (void 0 != i.graphicXOffset ? i.graphicXOffset :  - (0.5 * s))).toFixed());
						l.setAttributeNS(null, "y", (q.y + o).toFixed());
						l.setAttributeNS(null, "width", s);
						l.setAttributeNS(null, "height", p);
						l.setAttributeNS(this.xlinkns, "href", i.externalGraphic);
						l.setAttributeNS(null, "style", "opacity: " + n);
						l.onclick = OpenLayers.Renderer.SVG.preventDefault
					} else {
						if (this.isComplexSymbol(i.graphicName)) {
							var s = 3 * i.pointRadius,
							p = 2 * s,
							m = this.importSymbol(i.graphicName);
							q = this.getPosition(l);
							r = 3 * this.symbolMetrics[m.id][0] / p;
							o = l.parentNode;
							n = l.nextSibling;
							o && o.removeChild(l);
							l.firstChild && l.removeChild(l.firstChild);
							l.appendChild(m.firstChild.cloneNode(!0));
							l.setAttributeNS(null, "viewBox", m.getAttributeNS(null, "viewBox"));
							l.setAttributeNS(null, "width", p);
							l.setAttributeNS(null, "height", p);
							l.setAttributeNS(null, "x", q.x - s);
							l.setAttributeNS(null, "y", q.y - s);
							n ? o.insertBefore(l, n) : o && o.appendChild(l)
						} else {
							l.setAttributeNS(null, "r", i.pointRadius)
						}
					}
				}
				s = i.rotation;
				if ((void 0 !== s || void 0 !== l._rotation) && q) {
					l._rotation = s,
					s |= 0,
					"svg" !== l.nodeName ? l.setAttributeNS(null, "transform", "rotate(" + s + " " + q.x + " " + q.y + ")") : (q = this.symbolMetrics[m.id], l.firstChild.setAttributeNS(null, "transform", "rotate(" + s + " " + q[1] + " " + q[2] + ")"))
				}
			}
			t.isFilled ? (l.setAttributeNS(null, "fill", i.fillColor), l.setAttributeNS(null, "fill-opacity", i.fillOpacity)) : l.setAttributeNS(null, "fill", "none");
			t.isStroked ? (l.setAttributeNS(null, "stroke", i.strokeColor), l.setAttributeNS(null, "stroke-opacity", i.strokeOpacity), l.setAttributeNS(null, "stroke-width", i.strokeWidth * r), l.setAttributeNS(null, "stroke-linecap", i.strokeLinecap || "round"), l.setAttributeNS(null, "stroke-linejoin", "round"), i.strokeDashstyle && l.setAttributeNS(null, "stroke-dasharray", this.dashStyle(i, r))) : l.setAttributeNS(null, "stroke", "none");
			i.pointerEvents && l.setAttributeNS(null, "pointer-events", i.pointerEvents);
			null != i.cursor && l.setAttributeNS(null, "cursor", i.cursor);
			return l
		},
		dashStyle : function (h, g) {
			var f = h.strokeWidth * g,
			e = h.strokeDashstyle;
			switch (e) {
			case "solid":
				return "none";
			case "dot":
				return [1, 4 * f].join();
			case "dash":
				return [4 * f, 4 * f].join();
			case "dashdot":
				return [4 * f, 4 * f, 1, 4 * f].join();
			case "longdash":
				return [8 * f, 4 * f].join();
			case "longdashdot":
				return [8 * f, 4 * f, 1, 4 * f].join();
			default:
				return OpenLayers.String.trim(e).replace(/\s+/g, ",")
			}
		},
		createNode : function (d, f) {
			var e = document.createElementNS(this.xmlns, d);
			f && e.setAttributeNS(null, "id", f);
			return e
		},
		nodeTypeCompare : function (d, c) {
			return c == d.nodeName
		},
		createRenderRoot : function () {
			var b = this.nodeFactory(this.container.id + "_svgRoot", "svg");
			b.style.display = "block";
			return b
		},
		createRoot : function (b) {
			return this.nodeFactory(this.container.id + b, "g")
		},
		createDefs : function () {
			var b = this.nodeFactory(this.container.id + "_defs", "defs");
			this.rendererRoot.appendChild(b);
			return b
		},
		drawPoint : function (d, c) {
			return this.drawCircle(d, c, 1)
		},
		drawCircle : function (i, h, g) {
			var f = this.getResolution(),
			j = (h.x - this.featureDx) / f + this.left;
			h = this.top - h.y / f;
			return this.inValidRange(j, h) ? (i.setAttributeNS(null, "cx", j), i.setAttributeNS(null, "cy", h), i.setAttributeNS(null, "r", g), i) : !1
		},
		drawLineString : function (d, f) {
			var e = this.getComponentsString(f.components);
			return e.path ? (d.setAttributeNS(null, "points", e.path), e.complete ? d : null) : !1
		},
		drawLinearRing : function (d, f) {
			var e = this.getComponentsString(f.components);
			return e.path ? (d.setAttributeNS(null, "points", e.path), e.complete ? d : null) : !1
		},
		drawPolygon : function (r, q) {
			for (var p = "", o = !0, n = !0, m, l, k = 0, i = q.components.length; k < i; k++) {
				p += " M",
				m = this.getComponentsString(q.components[k].components, " "),
				(l = m.path) ? (p += " " + l, n = m.complete && n) : o = !1
			}
			return o ? (r.setAttributeNS(null, "d", p + " z"), r.setAttributeNS(null, "fill-rule", "evenodd"), n ? r : null) : !1
		},
		drawRectangle : function (i, h) {
			var g = this.getResolution(),
			f = (h.x - this.featureDx) / g + this.left,
			j = this.top - h.y / g;
			return this.inValidRange(f, j) ? (i.setAttributeNS(null, "x", f), i.setAttributeNS(null, "y", j), i.setAttributeNS(null, "width", h.width / g), i.setAttributeNS(null, "height", h.height / g), i) : !1
		},
		drawText : function (r, q, p) {
			var o = !!q.labelOutlineWidth;
			if (o) {
				var n = OpenLayers.Util.extend({}, q);
				n.fontColor = n.labelOutlineColor;
				n.fontStrokeColor = n.labelOutlineColor;
				n.fontStrokeWidth = q.labelOutlineWidth;
				delete n.labelOutlineWidth;
				this.drawText(r, n, p)
			}
			var i = this.getResolution(),
			n = (p.x - this.featureDx) / i + this.left,
			x = p.y / i - this.top,
			o = o ? this.LABEL_OUTLINE_SUFFIX : this.LABEL_ID_SUFFIX,
			i = this.nodeFactory(r + o, "text");
			i.setAttributeNS(null, "x", n);
			i.setAttributeNS(null, "y", -x);
			q.fontColor && i.setAttributeNS(null, "fill", q.fontColor);
			q.fontStrokeColor && i.setAttributeNS(null, "stroke", q.fontStrokeColor);
			q.fontStrokeWidth && i.setAttributeNS(null, "stroke-width", q.fontStrokeWidth);
			q.fontOpacity && i.setAttributeNS(null, "opacity", q.fontOpacity);
			q.fontFamily && i.setAttributeNS(null, "font-family", q.fontFamily);
			q.fontSize && i.setAttributeNS(null, "font-size", q.fontSize);
			q.fontWeight && i.setAttributeNS(null, "font-weight", q.fontWeight);
			q.fontStyle && i.setAttributeNS(null, "font-style", q.fontStyle);
			!0 === q.labelSelect ? (i.setAttributeNS(null, "pointer-events", "visible"), i._featureId = r) : i.setAttributeNS(null, "pointer-events", "none");
			x = q.labelAlign || OpenLayers.Renderer.defaultSymbolizer.labelAlign;
			i.setAttributeNS(null, "text-anchor", OpenLayers.Renderer.SVG.LABEL_ALIGN[x[0]] || "middle");
			!0 === OpenLayers.IS_GECKO && i.setAttributeNS(null, "dominant-baseline", OpenLayers.Renderer.SVG.LABEL_ALIGN[x[1]] || "central");
			for (var w = q.label.split("\n"), v = w.length; i.childNodes.length > v; ) {
				i.removeChild(i.lastChild)
			}
			for (var u = 0; u < v; u++) {
				var t = this.nodeFactory(r + o + "_tspan_" + u, "tspan");
				!0 === q.labelSelect && (t._featureId = r, t._geometry = p, t._geometryClass = p.CLASS_NAME);
				!1 === OpenLayers.IS_GECKO && t.setAttributeNS(null, "baseline-shift", OpenLayers.Renderer.SVG.LABEL_VSHIFT[x[1]] || "-35%");
				t.setAttribute("x", n);
				if (0 == u) {
					var s = OpenLayers.Renderer.SVG.LABEL_VFACTOR[x[1]];
					null == s && (s = -0.5);
					t.setAttribute("dy", s * (v - 1) + "em")
				} else {
					t.setAttribute("dy", "1em")
				}
				t.textContent = "" === w[u] ? " " : w[u];
				t.parentNode || i.appendChild(t)
			}
			i.parentNode || this.textRoot.appendChild(i)
		},
		getComponentsString : function (o, n) {
			for (var m = [], l = !0, k = o.length, j = [], i, p = 0; p < k; p++) {
				i = o[p],
				m.push(i),
				(i = this.getShortString(i)) ? j.push(i) : (0 < p && this.getShortString(o[p - 1]) && j.push(this.clipLine(o[p], o[p - 1])), p < k - 1 && this.getShortString(o[p + 1]) && j.push(this.clipLine(o[p], o[p + 1])), l = !1)
			}
			return {
				path : j.join(n || ","),
				complete : l
			}
		},
		clipLine : function (r, q) {
			if (q.equals(r)) {
				return ""
			}
			var p = this.getResolution(),
			o = this.MAX_PIXEL - this.translationParameters.x,
			n = this.MAX_PIXEL - this.translationParameters.y,
			m = (q.x - this.featureDx) / p + this.left,
			l = this.top - q.y / p,
			k = (r.x - this.featureDx) / p + this.left,
			p = this.top - r.y / p,
			i;
			if (k < -o || k > o) {
				i = (p - l) / (k - m),
				k = 0 > k ? -o : o,
				p = l + (k - m) * i
			}
			if (p < -n || p > n) {
				i = (k - m) / (p - l),
				p = 0 > p ? -n : n,
				k = m + (p - l) * i
			}
			return k + "," + p
		},
		getShortString : function (d) {
			var f = this.getResolution(),
			e = (d.x - this.featureDx) / f + this.left;
			d = this.top - d.y / f;
			return this.inValidRange(e, d) ? e + "," + d : !1
		},
		getPosition : function (b) {
			return {
				x : parseFloat(b.getAttributeNS(null, "cx")),
				y : parseFloat(b.getAttributeNS(null, "cy"))
			}
		},
		importSymbol : function (r) {
			this.defs || (this.defs = this.createDefs());
			var q = this.container.id + "-" + r,
			p = document.getElementById(q);
			if (null != p) {
				return p
			}
			var o = OpenLayers.Renderer.symbol[r];
			if (!o) {
				throw Error(r + " is not a valid symbol name")
			}
			r = this.nodeFactory(q, "symbol");
			var n = this.nodeFactory(null, "polygon");
			r.appendChild(n);
			for (var p = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0), m = [], l, k, i = 0; i < o.length; i += 2) {
				l = o[i],
				k = o[i + 1],
				p.left = Math.min(p.left, l),
				p.bottom = Math.min(p.bottom, k),
				p.right = Math.max(p.right, l),
				p.top = Math.max(p.top, k),
				m.push(l, ",", k)
			}
			n.setAttributeNS(null, "points", m.join(" "));
			o = p.getWidth();
			n = p.getHeight();
			r.setAttributeNS(null, "viewBox", [p.left - o, p.bottom - n, 3 * o, 3 * n].join(" "));
			this.symbolMetrics[q] = [Math.max(o, n), p.getCenterLonLat().lon, p.getCenterLonLat().lat];
			this.defs.appendChild(r);
			return r
		},
		getFeatureIdFromEvent : function (d) {
			var c = OpenLayers.Renderer.Elements.prototype.getFeatureIdFromEvent.apply(this, arguments);
			c || (c = d.target, c = c.parentNode && c != this.rendererRoot ? c.parentNode._featureId : void 0);
			return c
		},
		CLASS_NAME : "OpenLayers.Renderer.SVG"
	});
OpenLayers.Renderer.SVG.LABEL_ALIGN = {
	l : "start",
	r : "end",
	b : "bottom",
	t : "hanging"
};
OpenLayers.Renderer.SVG.LABEL_VSHIFT = {
	t : "-70%",
	b : "0"
};
OpenLayers.Renderer.SVG.LABEL_VFACTOR = {
	t : 0,
	b : -1
};
OpenLayers.Renderer.SVG.preventDefault = function (b) {
	b.preventDefault && b.preventDefault()
};
OpenLayers.Format.SLD.v1_0_0 = OpenLayers.Class(OpenLayers.Format.SLD.v1, {
		VERSION : "1.0.0",
		schemaLocation : "http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd",
		CLASS_NAME : "OpenLayers.Format.SLD.v1_0_0"
	});
OpenLayers.Format.OWSContext = OpenLayers.Class(OpenLayers.Format.Context, {
		defaultVersion : "0.3.1",
		getVersion : function (d, f) {
			var e = OpenLayers.Format.XML.VersionedOGC.prototype.getVersion.apply(this, arguments);
			"0.3.0" === e && (e = this.defaultVersion);
			return e
		},
		toContext : function (d) {
			var c = {};
			"OpenLayers.Map" == d.CLASS_NAME && (c.bounds = d.getExtent(), c.maxExtent = d.maxExtent, c.projection = d.projection, c.size = d.getSize(), c.layers = d.layers);
			return c
		},
		CLASS_NAME : "OpenLayers.Format.OWSContext"
	});
OpenLayers.Format.OWSContext.v0_3_1 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			owc : "http://www.opengis.net/ows-context",
			gml : "http://www.opengis.net/gml",
			kml : "http://www.opengis.net/kml/2.2",
			ogc : "http://www.opengis.net/ogc",
			ows : "http://www.opengis.net/ows",
			sld : "http://www.opengis.net/sld",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		VERSION : "0.3.1",
		schemaLocation : "http://www.opengis.net/ows-context http://www.ogcnetwork.net/schemas/owc/0.3.1/owsContext.xsd",
		defaultPrefix : "owc",
		extractAttributes : !0,
		xy : !0,
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		featureNS : "http://mapserver.gis.umn.edu/mapserver",
		featureType : "vector",
		geometryName : "geometry",
		nestingLayerLookup : null,
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b]);
			OpenLayers.Format.GML.v2.prototype.setGeometryTypes.call(this)
		},
		setNestingPath : function (j) {
			if (j.layersContext) {
				for (var i = 0, h = j.layersContext.length; i < h; i++) {
					var g = j.layersContext[i],
					l = [],
					k = j.title || "";
					j.metadata && j.metadata.nestingPath && (l = j.metadata.nestingPath.slice());
					"" != k && l.push(k);
					g.metadata.nestingPath = l;
					g.layersContext && this.setNestingPath(g)
				}
			}
		},
		decomposeNestingPath : function (d) {
			var c = [];
			if (OpenLayers.Util.isArray(d)) {
				for (d = d.slice(); 0 < d.length; ) {
					c.push(d.slice()),
					d.pop()
				}
				c.reverse()
			}
			return c
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			this.setNestingPath({
				layersContext : c.layersContext
			});
			d = [];
			this.processLayer(d, c);
			delete c.layersContext;
			c.layersContext = d;
			return c
		},
		processLayer : function (i, h) {
			if (h.layersContext) {
				for (var g = 0, f = h.layersContext.length; g < f; g++) {
					var j = h.layersContext[g];
					i.push(j);
					j.layersContext && this.processLayer(i, j)
				}
			}
		},
		write : function (d, f) {
			this.nestingLayerLookup = {};
			f = f || {};
			OpenLayers.Util.applyDefaults(f, d);
			var e = this.writeNode("OWSContext", f);
			this.nestingLayerLookup = null;
			this.setAttributeNS(e, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			return OpenLayers.Format.XML.prototype.write.apply(this, [e])
		},
		readers : {
			kml : {
				Document : function (d, c) {
					c.features = (new OpenLayers.Format.KML({
							kmlns : this.namespaces.kml,
							extractStyles : !0
						})).read(d)
				}
			},
			owc : {
				OWSContext : function (d, c) {
					this.readChildNodes(d, c)
				},
				General : function (d, c) {
					this.readChildNodes(d, c)
				},
				ResourceList : function (d, c) {
					this.readChildNodes(d, c)
				},
				Layer : function (d, f) {
					var e = {
						metadata : {},
						visibility : "1" != d.getAttribute("hidden"),
						queryable : "1" == d.getAttribute("queryable"),
						opacity : null != d.getAttribute("opacity") ? parseFloat(d.getAttribute("opacity")) : null,
						name : d.getAttribute("name"),
						categoryLayer : null == d.getAttribute("name"),
						formats : [],
						styles : []
					};
					f.layersContext || (f.layersContext = []);
					f.layersContext.push(e);
					this.readChildNodes(d, e)
				},
				InlineGeometry : function (h, g) {
					g.features = [];
					var f = this.getElementsByTagNameNS(h, this.namespaces.gml, "featureMember"),
					e;
					1 <= f.length && (e = f[0]);
					e && e.firstChild && (f = e.firstChild.nextSibling ? e.firstChild.nextSibling : e.firstChild, this.setNamespace("feature", f.namespaceURI), this.featureType = f.localName || f.nodeName.split(":").pop(), this.readChildNodes(h, g))
				},
				Server : function (d, c) {
					if (!c.service && !c.version || c.service != OpenLayers.Format.Context.serviceTypes.WMS) {
						c.service = d.getAttribute("service"),
						c.version = d.getAttribute("version"),
						this.readChildNodes(d, c)
					}
				},
				Name : function (d, c) {
					c.name = this.getChildValue(d);
					this.readChildNodes(d, c)
				},
				Title : function (d, c) {
					c.title = this.getChildValue(d);
					this.readChildNodes(d, c)
				},
				StyleList : function (d, c) {
					this.readChildNodes(d, c.styles)
				},
				Style : function (d, f) {
					var e = {};
					f.push(e);
					this.readChildNodes(d, e)
				},
				LegendURL : function (d, f) {
					var e = {};
					f.legend = e;
					this.readChildNodes(d, e)
				},
				OnlineResource : function (d, c) {
					c.url = this.getAttributeNS(d, this.namespaces.xlink, "href");
					this.readChildNodes(d, c)
				}
			},
			ows : OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows,
			gml : OpenLayers.Format.GML.v2.prototype.readers.gml,
			sld : OpenLayers.Format.SLD.v1_0_0.prototype.readers.sld,
			feature : OpenLayers.Format.GML.v2.prototype.readers.feature
		},
		writers : {
			owc : {
				OWSContext : function (d) {
					var c = this.createElementNSPlus("OWSContext", {
							attributes : {
								version : this.VERSION,
								id : d.id || OpenLayers.Util.createUniqueID("OpenLayers_OWSContext_")
							}
						});
					this.writeNode("General", d, c);
					this.writeNode("ResourceList", d, c);
					return c
				},
				General : function (d) {
					var c = this.createElementNSPlus("General");
					this.writeNode("ows:BoundingBox", d, c);
					this.writeNode("ows:Title", d.title || "OpenLayers OWSContext", c);
					return c
				},
				ResourceList : function (j) {
					for (var i = this.createElementNSPlus("ResourceList"), h = 0, g = j.layers.length; h < g; h++) {
						var l = j.layers[h],
						k = this.decomposeNestingPath(l.metadata.nestingPath);
						this.writeNode("_Layer", {
							layer : l,
							subPaths : k
						}, i)
					}
					return i
				},
				Server : function (d) {
					var c = this.createElementNSPlus("Server", {
							attributes : {
								version : d.version,
								service : d.service
							}
						});
					this.writeNode("OnlineResource", d, c);
					return c
				},
				OnlineResource : function (b) {
					return this.createElementNSPlus("OnlineResource", {
						attributes : {
							"xlink:href" : b.url
						}
					})
				},
				InlineGeometry : function (h) {
					var g = this.createElementNSPlus("InlineGeometry");
					this.writeNode("gml:boundedBy", h.getDataExtent(), g);
					for (var f = 0, e = h.features.length; f < e; f++) {
						this.writeNode("gml:featureMember", h.features[f], g)
					}
					return g
				},
				StyleList : function (h) {
					for (var g = this.createElementNSPlus("StyleList"), f = 0, e = h.length; f < e; f++) {
						this.writeNode("Style", h[f], g)
					}
					return g
				},
				Style : function (d) {
					var c = this.createElementNSPlus("Style");
					this.writeNode("Name", d, c);
					this.writeNode("Title", d, c);
					d.legend && this.writeNode("LegendURL", d, c);
					return c
				},
				Name : function (b) {
					return this.createElementNSPlus("Name", {
						value : b.name
					})
				},
				Title : function (b) {
					return this.createElementNSPlus("Title", {
						value : b.title
					})
				},
				LegendURL : function (d) {
					var c = this.createElementNSPlus("LegendURL");
					this.writeNode("OnlineResource", d.legend, c);
					return c
				},
				_WMS : function (d) {
					var c = this.createElementNSPlus("Layer", {
							attributes : {
								name : d.params.LAYERS,
								queryable : d.queryable ? "1" : "0",
								hidden : d.visibility ? "0" : "1",
								opacity : d.hasOwnProperty("opacity") ? d.opacity : null
							}
						});
					this.writeNode("ows:Title", d.name, c);
					this.writeNode("ows:OutputFormat", d.params.FORMAT, c);
					this.writeNode("Server", {
						service : OpenLayers.Format.Context.serviceTypes.WMS,
						version : d.params.VERSION,
						url : d.url
					}, c);
					d.metadata.styles && 0 < d.metadata.styles.length && this.writeNode("StyleList", d.metadata.styles, c);
					return c
				},
				_Layer : function (h) {
					var g,
					f,
					e;
					g = h.layer;
					f = h.subPaths;
					e = null;
					0 < f.length ? (g = f[0].join("/"), f = g.lastIndexOf("/"), e = this.nestingLayerLookup[g], f = 0 < f ? g.substring(f + 1, g.length) : g, e || (e = this.createElementNSPlus("Layer"), this.writeNode("ows:Title", f, e), this.nestingLayerLookup[g] = e), h.subPaths.shift(), this.writeNode("_Layer", h, e)) : (g instanceof OpenLayers.Layer.WMS ? e = this.writeNode("_WMS", g) : g instanceof OpenLayers.Layer.Vector && (g.protocol instanceof OpenLayers.Protocol.WFS.v1 ? e = this.writeNode("_WFS", g) : g.protocol instanceof OpenLayers.Protocol.HTTP ? g.protocol.format instanceof OpenLayers.Format.GML ? (g.protocol.format.version = "2.1.2", e = this.writeNode("_GML", g)) : g.protocol.format instanceof OpenLayers.Format.KML && (g.protocol.format.version = "2.2", e = this.writeNode("_KML", g)) : (this.setNamespace("feature", this.featureNS), e = this.writeNode("_InlineGeometry", g))), g.options.maxScale && this.writeNode("sld:MinScaleDenominator", g.options.maxScale, e), g.options.minScale && this.writeNode("sld:MaxScaleDenominator", g.options.minScale, e), this.nestingLayerLookup[g.name] = e);
					return e
				},
				_WFS : function (d) {
					var c = this.createElementNSPlus("Layer", {
							attributes : {
								name : d.protocol.featurePrefix + ":" + d.protocol.featureType,
								hidden : d.visibility ? "0" : "1"
							}
						});
					this.writeNode("ows:Title", d.name, c);
					this.writeNode("Server", {
						service : OpenLayers.Format.Context.serviceTypes.WFS,
						version : d.protocol.version,
						url : d.protocol.url
					}, c);
					return c
				},
				_InlineGeometry : function (d) {
					var c = this.createElementNSPlus("Layer", {
							attributes : {
								name : this.featureType,
								hidden : d.visibility ? "0" : "1"
							}
						});
					this.writeNode("ows:Title", d.name, c);
					this.writeNode("InlineGeometry", d, c);
					return c
				},
				_GML : function (d) {
					var c = this.createElementNSPlus("Layer");
					this.writeNode("ows:Title", d.name, c);
					this.writeNode("Server", {
						service : OpenLayers.Format.Context.serviceTypes.GML,
						url : d.protocol.url,
						version : d.protocol.format.version
					}, c);
					return c
				},
				_KML : function (d) {
					var c = this.createElementNSPlus("Layer");
					this.writeNode("ows:Title", d.name, c);
					this.writeNode("Server", {
						service : OpenLayers.Format.Context.serviceTypes.KML,
						version : d.protocol.format.version,
						url : d.protocol.url
					}, c);
					return c
				}
			},
			gml : OpenLayers.Util.applyDefaults({
				boundedBy : function (d) {
					var c = this.createElementNSPlus("gml:boundedBy");
					this.writeNode("gml:Box", d, c);
					return c
				}
			}, OpenLayers.Format.GML.v2.prototype.writers.gml),
			ows : OpenLayers.Format.OWSCommon.v1_0_0.prototype.writers.ows,
			sld : OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld,
			feature : OpenLayers.Format.GML.v2.prototype.writers.feature
		},
		CLASS_NAME : "OpenLayers.Format.OWSContext.v0_3_1"
	});
OpenLayers.Control.ScaleLine = OpenLayers.Class(OpenLayers.Control, {
		maxWidth : 100,
		topOutUnits : "km",
		topInUnits : "m",
		bottomOutUnits : "mi",
		bottomInUnits : "ft",
		eTop : null,
		eBottom : null,
		geodesic : !1,
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			this.eTop || (this.eTop = document.createElement("div"), this.eTop.className = this.displayClass + "Top", this.div.appendChild(this.eTop), this.eTop.style.visibility = "" == this.topOutUnits || "" == this.topInUnits ? "hidden" : "visible", this.eBottom = document.createElement("div"), this.eBottom.className = this.displayClass + "Bottom", this.div.appendChild(this.eBottom), this.eBottom.style.visibility = "" == this.bottomOutUnits || "" == this.bottomInUnits ? "hidden" : "visible");
			this.map.events.register("moveend", this, this.update);
			this.update();
			return this.div
		},
		getBarLen : function (d) {
			var c = parseInt(Math.log(d) / Math.log(10)),
			c = Math.pow(10, c);
			d = parseInt(d / c);
			return (5 < d ? 5 : 2 < d ? 2 : 1) * c
		},
		update : function () {
			var l = this.map.getResolution();
			if (l) {
				var i = this.map.getUnits(),
				t = OpenLayers.INCHES_PER_UNIT,
				s = this.maxWidth * l * t[i],
				r = 1;
				!0 === this.geodesic && (r = (this.map.getGeodesicPixelSize().w || 0.000001) * this.maxWidth / (s / t.km), s *= r);
				var q,
				p;
				100000 < s ? (q = this.topOutUnits, p = this.bottomOutUnits) : (q = this.topInUnits, p = this.bottomInUnits);
				var o = s / t[q],
				n = s / t[p],
				s = this.getBarLen(o),
				m = this.getBarLen(n),
				o = s / t[i] * t[q],
				n = m / t[i] * t[p],
				i = o / l / r,
				l = n / l / r;
				"visible" == this.eBottom.style.visibility && (this.eBottom.style.width = Math.round(l) + "px", this.eBottom.innerHTML = m + " " + p);
				"visible" == this.eTop.style.visibility && (this.eTop.style.width = Math.round(i) + "px", this.eTop.innerHTML = s + " " + q)
			}
		},
		CLASS_NAME : "OpenLayers.Control.ScaleLine"
	});
OpenLayers.Icon = OpenLayers.Class({
		url : null,
		size : null,
		offset : null,
		calculateOffset : null,
		imageDiv : null,
		px : null,
		initialize : function (h, g, f, e) {
			this.url = h;
			this.size = g || {
				w : 20,
				h : 20
			};
			this.offset = f || {
				x :  - (this.size.w / 2),
				y :  - (this.size.h / 2)
			};
			this.calculateOffset = e;
			h = OpenLayers.Util.createUniqueID("OL_Icon_");
			this.imageDiv = OpenLayers.Util.createAlphaImageDiv(h)
		},
		destroy : function () {
			this.erase();
			OpenLayers.Event.stopObservingElement(this.imageDiv.firstChild);
			this.imageDiv.innerHTML = "";
			this.imageDiv = null
		},
		clone : function () {
			return new OpenLayers.Icon(this.url, this.size, this.offset, this.calculateOffset)
		},
		setSize : function (b) {
			null != b && (this.size = b);
			this.draw()
		},
		setUrl : function (b) {
			null != b && (this.url = b);
			this.draw()
		},
		draw : function (b) {
			OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, null, this.size, this.url, "absolute");
			this.moveTo(b);
			return this.imageDiv
		},
		erase : function () {
			null != this.imageDiv && null != this.imageDiv.parentNode && OpenLayers.Element.remove(this.imageDiv)
		},
		setOpacity : function (b) {
			OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, null, null, null, null, null, null, b)
		},
		moveTo : function (b) {
			null != b && (this.px = b);
			null != this.imageDiv && (null == this.px ? this.display(!1) : (this.calculateOffset && (this.offset = this.calculateOffset(this.size)), OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, {
						x : this.px.x + this.offset.x,
						y : this.px.y + this.offset.y
					})))
		},
		display : function (b) {
			this.imageDiv.style.display = b ? "" : "none"
		},
		isDrawn : function () {
			return this.imageDiv && this.imageDiv.parentNode && 11 != this.imageDiv.parentNode.nodeType
		},
		CLASS_NAME : "OpenLayers.Icon"
	});
OpenLayers.Marker = OpenLayers.Class({
		icon : null,
		lonlat : null,
		events : null,
		map : null,
		initialize : function (d, f) {
			this.lonlat = d;
			var e = f ? f : OpenLayers.Marker.defaultIcon();
			null == this.icon ? this.icon = e : (this.icon.url = e.url, this.icon.size = e.size, this.icon.offset = e.offset, this.icon.calculateOffset = e.calculateOffset);
			this.events = new OpenLayers.Events(this, this.icon.imageDiv)
		},
		destroy : function () {
			this.erase();
			this.map = null;
			this.events.destroy();
			this.events = null;
			null != this.icon && (this.icon.destroy(), this.icon = null)
		},
		draw : function (b) {
			return this.icon.draw(b)
		},
		erase : function () {
			null != this.icon && this.icon.erase()
		},
		moveTo : function (b) {
			null != b && null != this.icon && this.icon.moveTo(b);
			this.lonlat = this.map.getLonLatFromLayerPx(b)
		},
		isDrawn : function () {
			return this.icon && this.icon.isDrawn()
		},
		onScreen : function () {
			var b = !1;
			this.map && (b = this.map.getExtent().containsLonLat(this.lonlat));
			return b
		},
		inflate : function (b) {
			this.icon && this.icon.setSize({
				w : this.icon.size.w * b,
				h : this.icon.size.h * b
			})
		},
		setOpacity : function (b) {
			this.icon.setOpacity(b)
		},
		setUrl : function (b) {
			this.icon.setUrl(b)
		},
		display : function (b) {
			this.icon.display(b)
		},
		CLASS_NAME : "OpenLayers.Marker"
	});
OpenLayers.Marker.defaultIcon = function () {
	return new OpenLayers.Icon(OpenLayers.Util.getImageLocation("marker.png"), {
		w : 21,
		h : 25
	}, {
		x : -10.5,
		y : -25
	})
};
OpenLayers.Layer.TileCache = OpenLayers.Class(OpenLayers.Layer.Grid, {
		isBaseLayer : !0,
		format : "image/png",
		serverResolutions : null,
		initialize : function (h, g, f, e) {
			this.layername = f;
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, [h, g, {}, e]);
			this.extension = this.format.split("/")[1].toLowerCase();
			this.extension = "jpg" == this.extension ? "jpeg" : this.extension
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.TileCache(this.name, this.url, this.layername, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getURL : function (j) {
			function i(c, b) {
				c = String(c);
				for (var a = [], d = 0; d < b; ++d) {
					a.push("0")
				}
				return a.join("").substring(0, b - c.length) + c
			}
			var h = this.getServerResolution(),
			g = this.maxExtent,
			l = this.tileSize,
			k = Math.round((j.left - g.left) / (h * l.w));
			j = Math.round((j.bottom - g.bottom) / (h * l.h));
			h = null != this.serverResolutions ? OpenLayers.Util.indexOf(this.serverResolutions, h) : this.map.getZoom();
			k = [this.layername, i(h, 2), i(parseInt(k / 1000000), 3), i(parseInt(k / 1000) % 1000, 3), i(parseInt(k) % 1000, 3), i(parseInt(j / 1000000), 3), i(parseInt(j / 1000) % 1000, 3), i(parseInt(j) % 1000, 3) + "." + this.extension].join("/");
			h = this.url;
			OpenLayers.Util.isArray(h) && (h = this.selectUrl(k, h));
			h = "/" == h.charAt(h.length - 1) ? h : h + "/";
			return h + k
		},
		CLASS_NAME : "OpenLayers.Layer.TileCache"
	});
OpenLayers.Layer.KaMap = OpenLayers.Class(OpenLayers.Layer.Grid, {
		isBaseLayer : !0,
		DEFAULT_PARAMS : {
			i : "jpeg",
			map : ""
		},
		initialize : function (h, g, f, e) {
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, arguments);
			this.params = OpenLayers.Util.applyDefaults(this.params, this.DEFAULT_PARAMS)
		},
		getURL : function (h) {
			h = this.adjustBounds(h);
			var g = this.map.getResolution(),
			f = Math.round(10000 * this.map.getScale()) / 10000,
			e = Math.round(h.left / g);
			h = -Math.round(h.top / g);
			return this.getFullRequestString({
				t : h,
				l : e,
				s : f
			})
		},
		calculateGridLayout : function (j, i, h) {
			i = h * this.tileSize.w;
			h *= this.tileSize.h;
			var g = j.left,
			l = Math.floor(g / i) - this.buffer,
			g =  - (g / i - l) * this.tileSize.w,
			l = l * i;
			j = j.top;
			var k = Math.ceil(j / h) + this.buffer;
			return {
				tilelon : i,
				tilelat : h,
				tileoffsetlon : l,
				tileoffsetlat : k * h,
				tileoffsetx : g,
				tileoffsety :  - (k - j / h + 1) * this.tileSize.h
			}
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.KaMap(this.name, this.url, this.params, this.getOptions()));
			b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b]);
			null != this.tileSize && (b.tileSize = this.tileSize.clone());
			b.grid = [];
			return b
		},
		getTileBounds : function (h) {
			var g = this.getResolution(),
			f = g * this.tileSize.w,
			g = g * this.tileSize.h,
			e = this.getLonLatFromViewPortPx(h);
			h = f * Math.floor(e.lon / f);
			e = g * Math.floor(e.lat / g);
			return new OpenLayers.Bounds(h, e, h + f, e + g)
		},
		CLASS_NAME : "OpenLayers.Layer.KaMap"
	});
OpenLayers.Control.TransformFeature = OpenLayers.Class(OpenLayers.Control, {
		geometryTypes : null,
		layer : null,
		preserveAspectRatio : !1,
		rotate : !0,
		feature : null,
		renderIntent : "temporary",
		rotationHandleSymbolizer : null,
		box : null,
		center : null,
		scale : 1,
		ratio : 1,
		rotation : 0,
		handles : null,
		rotationHandles : null,
		dragControl : null,
		irregular : !1,
		initialize : function (d, c) {
			OpenLayers.Control.prototype.initialize.apply(this, [c]);
			this.layer = d;
			this.rotationHandleSymbolizer || (this.rotationHandleSymbolizer = {
					stroke : !1,
					pointRadius : 10,
					fillOpacity : 0,
					cursor : "pointer"
				});
			this.createBox();
			this.createControl()
		},
		activate : function () {
			var b = !1;
			OpenLayers.Control.prototype.activate.apply(this, arguments) && (this.dragControl.activate(), this.layer.addFeatures([this.box]), this.rotate && this.layer.addFeatures(this.rotationHandles), this.layer.addFeatures(this.handles), b = !0);
			return b
		},
		deactivate : function () {
			var b = !1;
			OpenLayers.Control.prototype.deactivate.apply(this, arguments) && (this.layer.removeFeatures(this.handles), this.rotate && this.layer.removeFeatures(this.rotationHandles), this.layer.removeFeatures([this.box]), this.dragControl.deactivate(), b = !0);
			return b
		},
		setMap : function (b) {
			this.dragControl.setMap(b);
			OpenLayers.Control.prototype.setMap.apply(this, arguments)
		},
		setFeature : function (i, h) {
			h = OpenLayers.Util.applyDefaults(h, {
					rotation : 0,
					scale : 1,
					ratio : 1
				});
			var g = this.rotation,
			f = this.center;
			OpenLayers.Util.extend(this, h);
			if (!1 !== this.events.triggerEvent("beforesetfeature", {
					feature : i
				})) {
				this.feature = i;
				this.activate();
				this._setfeature = !0;
				var j = this.feature.geometry.getBounds();
				this.box.move(j.getCenterLonLat());
				this.box.geometry.rotate(-g, f);
				this._angle = 0;
				this.rotation ? (g = i.geometry.clone(), g.rotate(-this.rotation, this.center), g = new OpenLayers.Feature.Vector(g.getBounds().toGeometry()), g.geometry.rotate(this.rotation, this.center), this.box.geometry.rotate(this.rotation, this.center), this.box.move(g.geometry.getBounds().getCenterLonLat()), g = g.geometry.components[0].components[0].getBounds().getCenterLonLat()) : g = new OpenLayers.LonLat(j.left, j.bottom);
				this.handles[0].move(g);
				delete this._setfeature;
				this.events.triggerEvent("setfeature", {
					feature : i
				})
			}
		},
		unsetFeature : function () {
			this.active ? this.deactivate() : (this.feature = null, this.rotation = 0, this.ratio = this.scale = 1)
		},
		createBox : function () {
			var u = this;
			this.center = new OpenLayers.Geometry.Point(0, 0);
			this.box = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(-1, -1), new OpenLayers.Geometry.Point(0, -1), new OpenLayers.Geometry.Point(1, -1), new OpenLayers.Geometry.Point(1, 0), new OpenLayers.Geometry.Point(1, 1), new OpenLayers.Geometry.Point(0, 1), new OpenLayers.Geometry.Point(-1, 1), new OpenLayers.Geometry.Point(-1, 0), new OpenLayers.Geometry.Point(-1, -1)]), null, "string" == typeof this.renderIntent ? null : this.renderIntent);
			this.box.geometry.move = function (a, b) {
				u._moving = !0;
				OpenLayers.Geometry.LineString.prototype.move.apply(this, arguments);
				u.center.move(a, b);
				delete u._moving
			};
			for (var t = function (a, b) {
				OpenLayers.Geometry.Point.prototype.move.apply(this, arguments);
				this._rotationHandle && this._rotationHandle.geometry.move(a, b);
				this._handle.geometry.move(a, b)
			}, s = function (c, b, a) {
				OpenLayers.Geometry.Point.prototype.resize.apply(this, arguments);
				this._rotationHandle && this._rotationHandle.geometry.resize(c, b, a);
				this._handle.geometry.resize(c, b, a)
			}, r = function (a, b) {
				OpenLayers.Geometry.Point.prototype.rotate.apply(this, arguments);
				this._rotationHandle && this._rotationHandle.geometry.rotate(a, b);
				this._handle.geometry.rotate(a, b)
			}, q = function (k, j) {
				var h = this.x,
				g = this.y;
				OpenLayers.Geometry.Point.prototype.move.call(this, k, j);
				if (!u._moving) {
					var f = u.dragControl.handlers.drag.evt,
					e = !(!u._setfeature && u.preserveAspectRatio) && !(f && f.shiftKey),
					d = new OpenLayers.Geometry.Point(h, g),
					f = u.center;
					this.rotate(-u.rotation, f);
					d.rotate(-u.rotation, f);
					var c = this.x - f.x,
					b = this.y - f.y,
					a = c - (this.x - d.x),
					l = b - (this.y - d.y);
					u.irregular && !u._setfeature && (c -= (this.x - d.x) / 2, b -= (this.y - d.y) / 2);
					this.x = h;
					this.y = g;
					d = 1;
					e ? (b = 0.00001 > Math.abs(l) ? 1 : b / l, d = (0.00001 > Math.abs(a) ? 1 : c / a) / b) : (a = Math.sqrt(a * a + l * l), b = Math.sqrt(c * c + b * b) / a);
					u._moving = !0;
					u.box.geometry.rotate(-u.rotation, f);
					delete u._moving;
					u.box.geometry.resize(b, f, d);
					u.box.geometry.rotate(u.rotation, f);
					u.transformFeature({
						scale : b,
						ratio : d
					});
					u.irregular && !u._setfeature && (c = f.clone(), c.x += 0.00001 > Math.abs(h - f.x) ? 0 : this.x - h, c.y += 0.00001 > Math.abs(g - f.y) ? 0 : this.y - g, u.box.geometry.move(this.x - h, this.y - g), u.transformFeature({
							center : c
						}))
				}
			}, p = function (f, d) {
				var a = this.x,
				h = this.y;
				OpenLayers.Geometry.Point.prototype.move.call(this, f, d);
				if (!u._moving) {
					var c = u.dragControl.handlers.drag.evt,
					c = c && c.shiftKey ? 45 : 1,
					b = u.center,
					g = this.x - b.x,
					e = this.y - b.y;
					this.x = a;
					this.y = h;
					a = Math.atan2(e - d, g - f);
					a = Math.atan2(e, g) - a;
					a *= 180 / Math.PI;
					u._angle = (u._angle + a) % 360;
					a = u.rotation % c;
					if (Math.abs(u._angle) >= c || 0 !== a) {
						a = Math.round(u._angle / c) * c - a,
						u._angle = 0,
						u.box.geometry.rotate(a, b),
						u.transformFeature({
							rotation : a
						})
					}
				}
			}, o = Array(8), i = Array(4), z, y, x, w = "sw s se e ne n nw w".split(" "), v = 0; 8 > v; ++v) {
				z = this.box.geometry.components[v],
				y = new OpenLayers.Feature.Vector(z.clone(), {
						role : w[v] + "-resize"
					}, "string" == typeof this.renderIntent ? null : this.renderIntent),
				0 == v % 2 && (x = new OpenLayers.Feature.Vector(z.clone(), {
							role : w[v] + "-rotate"
						}, "string" == typeof this.rotationHandleSymbolizer ? null : this.rotationHandleSymbolizer), x.geometry.move = p, z._rotationHandle = x, i[v / 2] = x),
				z.move = t,
				z.resize = s,
				z.rotate = r,
				y.geometry.move = q,
				z._handle = y,
				o[v] = y
			}
			this.rotationHandles = i;
			this.handles = o
		},
		createControl : function () {
			var b = this;
			this.dragControl = new OpenLayers.Control.DragFeature(this.layer, {
					documentDrag : !0,
					moveFeature : function (a) {
						this.feature === b.feature && (this.feature = b.box);
						OpenLayers.Control.DragFeature.prototype.moveFeature.apply(this, arguments)
					},
					onDrag : function (a) {
						a === b.box && b.transformFeature({
							center : b.center
						})
					},
					onStart : function (a) {
						var f = !b.geometryTypes || -1 !== OpenLayers.Util.indexOf(b.geometryTypes, a.geometry.CLASS_NAME),
						e = OpenLayers.Util.indexOf(b.handles, a),
						e = e + OpenLayers.Util.indexOf(b.rotationHandles, a);
						a !== b.feature && (a !== b.box && -2 == e && f) && b.setFeature(a)
					},
					onComplete : function () {
						b.events.triggerEvent("transformcomplete", {
							feature : b.feature
						})
					}
				})
		},
		drawHandles : function () {
			for (var d = this.layer, c = 0; 8 > c; ++c) {
				this.rotate && 0 === c % 2 && d.drawFeature(this.rotationHandles[c / 2], this.rotationHandleSymbolizer),
				d.drawFeature(this.handles[c], this.renderIntent)
			}
		},
		transformFeature : function (i) {
			if (!this._setfeature) {
				this.scale *= i.scale || 1;
				this.ratio *= i.ratio || 1;
				var h = this.rotation;
				this.rotation = (this.rotation + (i.rotation || 0)) % 360;
				if (!1 !== this.events.triggerEvent("beforetransform", i)) {
					var g = this.feature,
					f = g.geometry,
					j = this.center;
					f.rotate(-h, j);
					i.scale || i.ratio ? f.resize(i.scale, j, i.ratio) : i.center && g.move(i.center.getBounds().getCenterLonLat());
					f.rotate(this.rotation, j);
					this.layer.drawFeature(g);
					g.toState(OpenLayers.State.UPDATE);
					this.events.triggerEvent("transform", i)
				}
			}
			this.layer.drawFeature(this.box, this.renderIntent);
			this.drawHandles()
		},
		destroy : function () {
			for (var d, c = 0; 8 > c; ++c) {
				d = this.box.geometry.components[c],
				d._handle.destroy(),
				d._handle = null,
				d._rotationHandle && d._rotationHandle.destroy(),
				d._rotationHandle = null
			}
			this.rotationHandles = this.rotationHandleSymbolizer = this.handles = this.feature = this.center = null;
			this.box.destroy();
			this.layer = this.box = null;
			this.dragControl.destroy();
			this.dragControl = null;
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Control.TransformFeature"
	});
OpenLayers.Handler.Box = OpenLayers.Class(OpenLayers.Handler, {
		dragHandler : null,
		boxDivClassName : "olHandlerBoxZoomBox",
		boxOffsets : null,
		initialize : function (d, f, e) {
			OpenLayers.Handler.prototype.initialize.apply(this, arguments);
			this.dragHandler = new OpenLayers.Handler.Drag(this, {
					down : this.startBox,
					move : this.moveBox,
					out : this.removeBox,
					up : this.endBox
				}, {
					keyMask : this.keyMask
				})
		},
		destroy : function () {
			OpenLayers.Handler.prototype.destroy.apply(this, arguments);
			this.dragHandler && (this.dragHandler.destroy(), this.dragHandler = null)
		},
		setMap : function (b) {
			OpenLayers.Handler.prototype.setMap.apply(this, arguments);
			this.dragHandler && this.dragHandler.setMap(b)
		},
		startBox : function () {
			this.callback("start", []);
			this.zoomBox = OpenLayers.Util.createDiv("zoomBox", {
					x : -9999,
					y : -9999
				});
			this.zoomBox.className = this.boxDivClassName;
			this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE.Popup - 1;
			this.map.viewPortDiv.appendChild(this.zoomBox);
			OpenLayers.Element.addClass(this.map.viewPortDiv, "olDrawBox")
		},
		moveBox : function (j) {
			var i = this.dragHandler.start.x,
			h = this.dragHandler.start.y,
			g = Math.abs(i - j.x),
			l = Math.abs(h - j.y),
			k = this.getBoxOffsets();
			this.zoomBox.style.width = g + k.width + 1 + "px";
			this.zoomBox.style.height = l + k.height + 1 + "px";
			this.zoomBox.style.left = (j.x < i ? i - g - k.left : i - k.left) + "px";
			this.zoomBox.style.top = (j.y < h ? h - l - k.top : h - k.top) + "px"
		},
		endBox : function (i) {
			var h;
			if (5 < Math.abs(this.dragHandler.start.x - i.x) || 5 < Math.abs(this.dragHandler.start.y - i.y)) {
				var g = this.dragHandler.start;
				h = Math.min(g.y, i.y);
				var f = Math.max(g.y, i.y),
				j = Math.min(g.x, i.x);
				i = Math.max(g.x, i.x);
				h = new OpenLayers.Bounds(j, f, i, h)
			} else {
				h = this.dragHandler.start.clone()
			}
			this.removeBox();
			this.callback("done", [h])
		},
		removeBox : function () {
			this.map.viewPortDiv.removeChild(this.zoomBox);
			this.boxOffsets = this.zoomBox = null;
			OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDrawBox")
		},
		activate : function () {
			return OpenLayers.Handler.prototype.activate.apply(this, arguments) ? (this.dragHandler.activate(), !0) : !1
		},
		deactivate : function () {
			return OpenLayers.Handler.prototype.deactivate.apply(this, arguments) ? (this.dragHandler.deactivate() && this.zoomBox && this.removeBox(), !0) : !1
		},
		getBoxOffsets : function () {
			if (!this.boxOffsets) {
				var i = document.createElement("div");
				i.style.position = "absolute";
				i.style.border = "1px solid black";
				i.style.width = "3px";
				document.body.appendChild(i);
				var h = 3 == i.clientWidth;
				document.body.removeChild(i);
				var i = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-left-width")),
				g = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-right-width")),
				f = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-top-width")),
				j = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-bottom-width"));
				this.boxOffsets = {
					left : i,
					right : g,
					top : f,
					bottom : j,
					width : !1 === h ? i + g : 0,
					height : !1 === h ? f + j : 0
				}
			}
			return this.boxOffsets
		},
		CLASS_NAME : "OpenLayers.Handler.Box"
	});
OpenLayers.Control.ZoomBox = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_TOOL,
		out : !1,
		keyMask : null,
		alwaysZoom : !1,
		draw : function () {
			this.handler = new OpenLayers.Handler.Box(this, {
					done : this.zoomBox
				}, {
					keyMask : this.keyMask
				})
		},
		zoomBox : function (j) {
			if (j instanceof OpenLayers.Bounds) {
				var i;
				if (this.out) {
					i = Math.abs(j.right - j.left);
					var h = Math.abs(j.top - j.bottom);
					i = Math.min(this.map.size.h / h, this.map.size.w / i);
					var h = this.map.getExtent(),
					g = this.map.getLonLatFromPixel(j.getCenterPixel());
					j = g.lon - h.getWidth() / 2 * i;
					var l = g.lon + h.getWidth() / 2 * i,
					k = g.lat - h.getHeight() / 2 * i;
					i = g.lat + h.getHeight() / 2 * i;
					i = new OpenLayers.Bounds(j, k, l, i)
				} else {
					i = this.map.getLonLatFromPixel({
							x : j.left,
							y : j.bottom
						}),
					h = this.map.getLonLatFromPixel({
							x : j.right,
							y : j.top
						}),
					i = new OpenLayers.Bounds(i.lon, i.lat, h.lon, h.lat)
				}
				h = this.map.getZoom();
				this.map.zoomToExtent(i);
				h == this.map.getZoom() && !0 == this.alwaysZoom && this.map.zoomTo(h + (this.out ? -1 : 1))
			} else {
				this.out ? this.map.setCenter(this.map.getLonLatFromPixel(j), this.map.getZoom() - 1) : this.map.setCenter(this.map.getLonLatFromPixel(j), this.map.getZoom() + 1)
			}
		},
		CLASS_NAME : "OpenLayers.Control.ZoomBox"
	});
OpenLayers.Control.DragPan = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_TOOL,
		panned : !1,
		interval : 1,
		documentDrag : !1,
		kinetic : null,
		enableKinetic : !1,
		kineticInterval : 10,
		draw : function () {
			if (this.enableKinetic) {
				var b = {
					interval : this.kineticInterval
				};
				"object" === typeof this.enableKinetic && (b = OpenLayers.Util.extend(b, this.enableKinetic));
				this.kinetic = new OpenLayers.Kinetic(b)
			}
			this.handler = new OpenLayers.Handler.Drag(this, {
					move : this.panMap,
					done : this.panMapDone,
					down : this.panMapStart
				}, {
					interval : this.interval,
					documentDrag : this.documentDrag
				})
		},
		panMapStart : function () {
			this.kinetic && this.kinetic.begin()
		},
		panMap : function (b) {
			this.kinetic && this.kinetic.update(b);
			this.panned = !0;
			this.map.pan(this.handler.last.x - b.x, this.handler.last.y - b.y, {
				dragging : !0,
				animate : !1
			})
		},
		panMapDone : function (d) {
			if (this.panned) {
				var f = null;
				this.kinetic && (f = this.kinetic.end(d));
				this.map.pan(this.handler.last.x - d.x, this.handler.last.y - d.y, {
					dragging : !!f,
					animate : !1
				});
				if (f) {
					var e = this;
					this.kinetic.move(f, function (b, a, c) {
						e.map.pan(b, a, {
							dragging : !c,
							animate : !1
						})
					})
				}
				this.panned = !1
			}
		},
		CLASS_NAME : "OpenLayers.Control.DragPan"
	});
OpenLayers.Handler.Click = OpenLayers.Class(OpenLayers.Handler, {
		delay : 300,
		single : !0,
		"double" : !1,
		pixelTolerance : 0,
		dblclickTolerance : 13,
		stopSingle : !1,
		stopDouble : !1,
		timerId : null,
		touch : !1,
		down : null,
		last : null,
		first : null,
		rightclickTimerId : null,
		touchstart : function (b) {
			this.touch || (this.unregisterMouseListeners(), this.touch = !0);
			this.down = this.getEventInfo(b);
			this.last = this.getEventInfo(b);
			return !0
		},
		touchmove : function (b) {
			this.last = this.getEventInfo(b);
			return !0
		},
		touchend : function (b) {
			this.down && (b.xy = this.last.xy, b.lastTouches = this.last.touches, this.handleSingle(b), this.down = null);
			return !0
		},
		unregisterMouseListeners : function () {
			this.map.events.un({
				mousedown : this.mousedown,
				mouseup : this.mouseup,
				click : this.click,
				dblclick : this.dblclick,
				scope : this
			})
		},
		mousedown : function (b) {
			this.down = this.getEventInfo(b);
			this.last = this.getEventInfo(b);
			return !0
		},
		mouseup : function (d) {
			var c = !0;
			this.checkModifiers(d) && (this.control.handleRightClicks && OpenLayers.Event.isRightClick(d)) && (c = this.rightclick(d));
			return c
		},
		rightclick : function (b) {
			if (this.passesTolerance(b)) {
				if (null != this.rightclickTimerId) {
					return this.clearTimer(),
					this.callback("dblrightclick", [b]),
					!this.stopDouble
				}
				b = this["double"] ? OpenLayers.Util.extend({}, b) : this.callback("rightclick", [b]);
				b = OpenLayers.Function.bind(this.delayedRightCall, this, b);
				this.rightclickTimerId = window.setTimeout(b, this.delay)
			}
			return !this.stopSingle
		},
		delayedRightCall : function (b) {
			this.rightclickTimerId = null;
			b && this.callback("rightclick", [b])
		},
		click : function (b) {
			this.last || (this.last = this.getEventInfo(b));
			this.handleSingle(b);
			return !this.stopSingle
		},
		dblclick : function (b) {
			this.handleDouble(b);
			return !this.stopDouble
		},
		handleDouble : function (b) {
			this.passesDblclickTolerance(b) && (this["double"] && this.callback("dblclick", [b]), this.clearTimer())
		},
		handleSingle : function (b) {
			this.passesTolerance(b) && (null != this.timerId ? (this.last.touches && 1 === this.last.touches.length && (this["double"] && OpenLayers.Event.stop(b), this.handleDouble(b)), (!this.last.touches || 2 !== this.last.touches.length) && this.clearTimer()) : (this.first = this.getEventInfo(b), b = this.single ? OpenLayers.Util.extend({}, b) : null, this.queuePotentialClick(b)))
		},
		queuePotentialClick : function (b) {
			this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall, this, b), this.delay)
		},
		passesTolerance : function (d) {
			var f = !0;
			if (null != this.pixelTolerance && this.down && this.down.xy && (f = this.pixelTolerance >= this.down.xy.distanceTo(d.xy)) && this.touch && this.down.touches.length === this.last.touches.length) {
				d = 0;
				for (var e = this.down.touches.length; d < e; ++d) {
					if (this.getTouchDistance(this.down.touches[d], this.last.touches[d]) > this.pixelTolerance) {
						f = !1;
						break
					}
				}
			}
			return f
		},
		getTouchDistance : function (d, c) {
			return Math.sqrt(Math.pow(d.clientX - c.clientX, 2) + Math.pow(d.clientY - c.clientY, 2))
		},
		passesDblclickTolerance : function () {
			var b = !0;
			this.down && this.first && (b = this.down.xy.distanceTo(this.first.xy) <= this.dblclickTolerance);
			return b
		},
		clearTimer : function () {
			null != this.timerId && (window.clearTimeout(this.timerId), this.timerId = null);
			null != this.rightclickTimerId && (window.clearTimeout(this.rightclickTimerId), this.rightclickTimerId = null)
		},
		delayedCall : function (b) {
			this.timerId = null;
			b && this.callback("click", [b])
		},
		getEventInfo : function (i) {
			var h;
			if (i.touches) {
				var g = i.touches.length;
				h = Array(g);
				for (var f, j = 0; j < g; j++) {
					f = i.touches[j],
					h[j] = {
						clientX : f.clientX,
						clientY : f.clientY
					}
				}
			}
			return {
				xy : i.xy,
				touches : h
			}
		},
		deactivate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.clearTimer(), this.last = this.first = this.down = null, this.touch = !1, b = !0);
			return b
		},
		CLASS_NAME : "OpenLayers.Handler.Click"
	});
OpenLayers.Control.Navigation = OpenLayers.Class(OpenLayers.Control, {
		dragPan : null,
		dragPanOptions : null,
		pinchZoom : null,
		pinchZoomOptions : null,
		documentDrag : !1,
		zoomBox : null,
		zoomBoxEnabled : !0,
		zoomWheelEnabled : !0,
		mouseWheelOptions : null,
		handleRightClicks : !1,
		zoomBoxKeyMask : OpenLayers.Handler.MOD_SHIFT,
		autoActivate : !0,
		initialize : function (b) {
			this.handlers = {};
			OpenLayers.Control.prototype.initialize.apply(this, arguments)
		},
		destroy : function () {
			this.deactivate();
			this.dragPan && this.dragPan.destroy();
			this.dragPan = null;
			this.zoomBox && this.zoomBox.destroy();
			this.zoomBox = null;
			this.pinchZoom && this.pinchZoom.destroy();
			this.pinchZoom = null;
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		activate : function () {
			this.dragPan.activate();
			this.zoomWheelEnabled && this.handlers.wheel.activate();
			this.handlers.click.activate();
			this.zoomBoxEnabled && this.zoomBox.activate();
			this.pinchZoom && this.pinchZoom.activate();
			return OpenLayers.Control.prototype.activate.apply(this, arguments)
		},
		deactivate : function () {
			this.pinchZoom && this.pinchZoom.deactivate();
			this.zoomBox.deactivate();
			this.dragPan.deactivate();
			this.handlers.click.deactivate();
			this.handlers.wheel.deactivate();
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
		},
		draw : function () {
			this.handleRightClicks && (this.map.viewPortDiv.oncontextmenu = OpenLayers.Function.False);
			this.handlers.click = new OpenLayers.Handler.Click(this, {
					click : this.defaultClick,
					dblclick : this.defaultDblClick,
					dblrightclick : this.defaultDblRightClick
				}, {
					"double" : !0,
					stopDouble : !0
				});
			this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
						map : this.map,
						documentDrag : this.documentDrag
					}, this.dragPanOptions));
			this.zoomBox = new OpenLayers.Control.ZoomBox({
					map : this.map,
					keyMask : this.zoomBoxKeyMask
				});
			this.dragPan.draw();
			this.zoomBox.draw();
			this.handlers.wheel = new OpenLayers.Handler.MouseWheel(this, {
					up : this.wheelUp,
					down : this.wheelDown
				}, this.mouseWheelOptions);
			OpenLayers.Control.PinchZoom && (this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({
							map : this.map
						}, this.pinchZoomOptions)))
		},
		defaultClick : function (b) {
			b.lastTouches && 2 == b.lastTouches.length && this.map.zoomOut()
		},
		defaultDblClick : function (b) {
			b = this.map.getLonLatFromViewPortPx(b.xy);
			this.map.setCenter(b, this.map.zoom + 1)
		},
		defaultDblRightClick : function (b) {
			b = this.map.getLonLatFromViewPortPx(b.xy);
			this.map.setCenter(b, this.map.zoom - 1)
		},
		wheelChange : function (l, k) {
			var j = this.map.getZoom(),
			i = this.map.getZoom() + Math.round(k),
			i = Math.max(i, 0),
			i = Math.min(i, this.map.getNumZoomLevels());
			if (i !== j) {
				var h = this.map.getSize(),
				j = h.w / 2 - l.xy.x,
				h = l.xy.y - h.h / 2,
				n = this.map.baseLayer.getResolutionForZoom(i),
				m = this.map.getLonLatFromPixel(l.xy),
				j = new OpenLayers.LonLat(m.lon + j * n, m.lat + h * n);
				this.map.setCenter(j, i)
			}
		},
		wheelUp : function (d, c) {
			this.wheelChange(d, c || 1)
		},
		wheelDown : function (d, c) {
			this.wheelChange(d, c || -1)
		},
		disableZoomBox : function () {
			this.zoomBoxEnabled = !1;
			this.zoomBox.deactivate()
		},
		enableZoomBox : function () {
			this.zoomBoxEnabled = !0;
			this.active && this.zoomBox.activate()
		},
		disableZoomWheel : function () {
			this.zoomWheelEnabled = !1;
			this.handlers.wheel.deactivate()
		},
		enableZoomWheel : function () {
			this.zoomWheelEnabled = !0;
			this.active && this.handlers.wheel.activate()
		},
		CLASS_NAME : "OpenLayers.Control.Navigation"
	});
OpenLayers.Control.DrawFeature = OpenLayers.Class(OpenLayers.Control, {
		layer : null,
		callbacks : null,
		multi : !1,
		featureAdded : function () {},
		handlerOptions : null,
		initialize : function (d, f, e) {
			OpenLayers.Control.prototype.initialize.apply(this, [e]);
			this.callbacks = OpenLayers.Util.extend({
					done : this.drawFeature,
					modify : function (b, a) {
						this.layer.events.triggerEvent("sketchmodified", {
							vertex : b,
							feature : a
						})
					},
					create : function (b, a) {
						this.layer.events.triggerEvent("sketchstarted", {
							vertex : b,
							feature : a
						})
					}
				}, this.callbacks);
			this.layer = d;
			this.handlerOptions = this.handlerOptions || {};
			this.handlerOptions.layerOptions = OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions, {
					renderers : d.renderers,
					rendererOptions : d.rendererOptions
				});
			"multi" in this.handlerOptions || (this.handlerOptions.multi = this.multi);
			if (d = this.layer.styleMap && this.layer.styleMap.styles.temporary) {
				this.handlerOptions.layerOptions = OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions, {
						styleMap : new OpenLayers.StyleMap({
							"default" : d
						})
					})
			}
			this.handler = new f(this, this.callbacks, this.handlerOptions)
		},
		drawFeature : function (b) {
			b = new OpenLayers.Feature.Vector(b);
			!1 !== this.layer.events.triggerEvent("sketchcomplete", {
				feature : b
			}) && (b.state = OpenLayers.State.INSERT, this.layer.addFeatures([b]), this.featureAdded(b), this.events.triggerEvent("featureadded", {
					feature : b
				}))
		},
		insertXY : function (d, c) {
			this.handler && this.handler.line && this.handler.insertXY(d, c)
		},
		insertDeltaXY : function (d, c) {
			this.handler && this.handler.line && this.handler.insertDeltaXY(d, c)
		},
		insertDirectionLength : function (d, c) {
			this.handler && this.handler.line && this.handler.insertDirectionLength(d, c)
		},
		insertDeflectionLength : function (d, c) {
			this.handler && this.handler.line && this.handler.insertDeflectionLength(d, c)
		},
		undo : function () {
			return this.handler.undo && this.handler.undo()
		},
		redo : function () {
			return this.handler.redo && this.handler.redo()
		},
		finishSketch : function () {
			this.handler.finishGeometry()
		},
		cancel : function () {
			this.handler.cancel()
		},
		CLASS_NAME : "OpenLayers.Control.DrawFeature"
	});
OpenLayers.Handler.Polygon = OpenLayers.Class(OpenLayers.Handler.Path, {
		holeModifier : null,
		drawingHole : !1,
		polygon : null,
		createFeature : function (b) {
			b = this.layer.getLonLatFromViewPortPx(b);
			b = new OpenLayers.Geometry.Point(b.lon, b.lat);
			this.point = new OpenLayers.Feature.Vector(b);
			this.line = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LinearRing([this.point.geometry]));
			this.polygon = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([this.line.geometry]));
			this.callback("create", [this.point.geometry, this.getSketch()]);
			this.point.geometry.clearBounds();
			this.layer.addFeatures([this.polygon, this.point], {
				silent : !0
			})
		},
		addPoint : function (i) {
			if (!this.drawingHole && this.holeModifier && this.evt && this.evt[this.holeModifier]) {
				for (var h = this.point.geometry, g = this.control.layer.features, f, j = g.length - 1; 0 <= j; --j) {
					if (f = g[j].geometry, (f instanceof OpenLayers.Geometry.Polygon || f instanceof OpenLayers.Geometry.MultiPolygon) && f.intersects(h)) {
						h = g[j];
						this.control.layer.removeFeatures([h], {
							silent : !0
						});
						this.control.layer.events.registerPriority("sketchcomplete", this, this.finalizeInteriorRing);
						this.control.layer.events.registerPriority("sketchmodified", this, this.enforceTopology);
						h.geometry.addComponent(this.line.geometry);
						this.polygon = h;
						this.drawingHole = !0;
						break
					}
				}
			}
			OpenLayers.Handler.Path.prototype.addPoint.apply(this, arguments)
		},
		getCurrentPointIndex : function () {
			return this.line.geometry.components.length - 2
		},
		enforceTopology : function (d) {
			d = d.vertex;
			var c = this.line.geometry.components;
			this.polygon.geometry.intersects(d) || (c = c[c.length - 3], d.x = c.x, d.y = c.y)
		},
		finishGeometry : function () {
			this.line.geometry.removeComponent(this.line.geometry.components[this.line.geometry.components.length - 2]);
			this.removePoint();
			this.finalize()
		},
		finalizeInteriorRing : function () {
			var l = this.line.geometry,
			k = 0 !== l.getArea();
			if (k) {
				for (var j = this.polygon.geometry.components, i = j.length - 2; 0 <= i; --i) {
					if (l.intersects(j[i])) {
						k = !1;
						break
					}
				}
				if (k) {
					i = j.length - 2;
					l : for (; 0 < i; --i) {
						for (var h = j[i].components, n = 0, m = h.length; n < m; ++n) {
							if (l.containsPoint(h[n])) {
								k = !1;
								break l
							}
						}
					}
				}
			}
			k ? this.polygon.state !== OpenLayers.State.INSERT && (this.polygon.state = OpenLayers.State.UPDATE) : this.polygon.geometry.removeComponent(l);
			this.restoreFeature();
			return !1
		},
		cancel : function () {
			this.drawingHole && (this.polygon.geometry.removeComponent(this.line.geometry), this.restoreFeature(!0));
			return OpenLayers.Handler.Path.prototype.cancel.apply(this, arguments)
		},
		restoreFeature : function (b) {
			this.control.layer.events.unregister("sketchcomplete", this, this.finalizeInteriorRing);
			this.control.layer.events.unregister("sketchmodified", this, this.enforceTopology);
			this.layer.removeFeatures([this.polygon], {
				silent : !0
			});
			this.control.layer.addFeatures([this.polygon], {
				silent : !0
			});
			this.drawingHole = !1;
			b || this.control.layer.events.triggerEvent("sketchcomplete", {
				feature : this.polygon
			})
		},
		destroyFeature : function (b) {
			OpenLayers.Handler.Path.prototype.destroyFeature.call(this, b);
			this.polygon = null
		},
		drawFeature : function () {
			this.layer.drawFeature(this.polygon, this.style);
			this.layer.drawFeature(this.point, this.style)
		},
		getSketch : function () {
			return this.polygon
		},
		getGeometry : function () {
			var b = this.polygon && this.polygon.geometry;
			b && this.multi && (b = new OpenLayers.Geometry.MultiPolygon([b]));
			return b
		},
		CLASS_NAME : "OpenLayers.Handler.Polygon"
	});
OpenLayers.Control.EditingToolbar = OpenLayers.Class(OpenLayers.Control.Panel, {
		citeCompliant : !1,
		initialize : function (d, f) {
			OpenLayers.Control.Panel.prototype.initialize.apply(this, [f]);
			this.addControls([new OpenLayers.Control.Navigation]);
			var e = [new OpenLayers.Control.DrawFeature(d, OpenLayers.Handler.Point, {
					displayClass : "olControlDrawFeaturePoint",
					handlerOptions : {
						citeCompliant : this.citeCompliant
					}
				}), new OpenLayers.Control.DrawFeature(d, OpenLayers.Handler.Path, {
					displayClass : "olControlDrawFeaturePath",
					handlerOptions : {
						citeCompliant : this.citeCompliant
					}
				}), new OpenLayers.Control.DrawFeature(d, OpenLayers.Handler.Polygon, {
					displayClass : "olControlDrawFeaturePolygon",
					handlerOptions : {
						citeCompliant : this.citeCompliant
					}
				})];
			this.addControls(e)
		},
		draw : function () {
			var b = OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
			null === this.defaultControl && (this.defaultControl = this.controls[0]);
			return b
		},
		CLASS_NAME : "OpenLayers.Control.EditingToolbar"
	});
OpenLayers.Strategy.BBOX = OpenLayers.Class(OpenLayers.Strategy, {
		bounds : null,
		resolution : null,
		ratio : 2,
		resFactor : null,
		response : null,
		activate : function () {
			var b = OpenLayers.Strategy.prototype.activate.call(this);
			b && (this.layer.events.on({
					moveend : this.update,
					refresh : this.update,
					visibilitychanged : this.update,
					scope : this
				}), this.update());
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Strategy.prototype.deactivate.call(this);
			b && this.layer.events.un({
				moveend : this.update,
				refresh : this.update,
				visibilitychanged : this.update,
				scope : this
			});
			return b
		},
		update : function (d) {
			var c = this.getMapBounds();
			if (null !== c && (d && d.force || this.layer.visibility && this.layer.calculateInRange() && this.invalidBounds(c))) {
				this.calculateBounds(c),
				this.resolution = this.layer.map.getResolution(),
				this.triggerRead(d)
			}
		},
		getMapBounds : function () {
			if (null === this.layer.map) {
				return null
			}
			var b = this.layer.map.getExtent();
			b && !this.layer.projection.equals(this.layer.map.getProjectionObject()) && (b = b.clone().transform(this.layer.map.getProjectionObject(), this.layer.projection));
			return b
		},
		invalidBounds : function (b) {
			b || (b = this.getMapBounds());
			b = !this.bounds || !this.bounds.containsBounds(b);
			!b && this.resFactor && (b = this.resolution / this.layer.map.getResolution(), b = b >= this.resFactor || b <= 1 / this.resFactor);
			return b
		},
		calculateBounds : function (d) {
			d || (d = this.getMapBounds());
			var f = d.getCenterLonLat(),
			e = d.getWidth() * this.ratio;
			d = d.getHeight() * this.ratio;
			this.bounds = new OpenLayers.Bounds(f.lon - e / 2, f.lat - d / 2, f.lon + e / 2, f.lat + d / 2)
		},
		triggerRead : function (b) {
			this.response && !(b && !0 === b.noAbort) && (this.layer.protocol.abort(this.response), this.layer.events.triggerEvent("loadend"));
			this.layer.events.triggerEvent("loadstart");
			this.response = this.layer.protocol.read(OpenLayers.Util.applyDefaults({
						filter : this.createFilter(),
						callback : this.merge,
						scope : this
					}, b))
		},
		createFilter : function () {
			var b = new OpenLayers.Filter.Spatial({
					type : OpenLayers.Filter.Spatial.BBOX,
					value : this.bounds,
					projection : this.layer.projection
				});
			this.layer.filter && (b = new OpenLayers.Filter.Logical({
						type : OpenLayers.Filter.Logical.AND,
						filters : [this.layer.filter, b]
					}));
			return b
		},
		merge : function (j) {
			this.layer.destroyFeatures();
			if ((j = j.features) && 0 < j.length) {
				var i = this.layer.projection,
				h = this.layer.map.getProjectionObject();
				if (!h.equals(i)) {
					for (var g, l = 0, k = j.length; l < k; ++l) {
						(g = j[l].geometry) && g.transform(i, h)
					}
				}
				this.layer.addFeatures(j)
			}
			this.response = null;
			this.layer.events.triggerEvent("loadend")
		},
		CLASS_NAME : "OpenLayers.Strategy.BBOX"
	});
OpenLayers.Layer.WorldWind = OpenLayers.Class(OpenLayers.Layer.Grid, {
		DEFAULT_PARAMS : {},
		isBaseLayer : !0,
		lzd : null,
		zoomLevels : null,
		initialize : function (j, i, h, g, l, k) {
			this.lzd = h;
			this.zoomLevels = g;
			h = [];
			h.push(j, i, l, k);
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, h);
			this.params = OpenLayers.Util.applyDefaults(this.params, this.DEFAULT_PARAMS)
		},
		getZoom : function () {
			var b = this.map.getZoom();
			this.map.getMaxExtent();
			return b -= Math.log(this.maxResolution / (this.lzd / 512)) / Math.log(2)
		},
		getURL : function (i) {
			i = this.adjustBounds(i);
			var h = this.getZoom(),
			g = this.map.getMaxExtent(),
			f = this.lzd / Math.pow(2, this.getZoom()),
			j = Math.floor((i.left - g.left) / f);
			i = Math.floor((i.bottom - g.bottom) / f);
			return this.map.getResolution() <= this.lzd / 512 && this.getZoom() <= this.zoomLevels ? this.getFullRequestString({
				L : h,
				X : j,
				Y : i
			}) : OpenLayers.Util.getImageLocation("blank.gif")
		},
		CLASS_NAME : "OpenLayers.Layer.WorldWind"
	});
OpenLayers.Protocol.CSW = function (d) {
	d = OpenLayers.Util.applyDefaults(d, OpenLayers.Protocol.CSW.DEFAULTS);
	var c = OpenLayers.Protocol.CSW["v" + d.version.replace(/\./g, "_")];
	if (!c) {
		throw "Unsupported CSW version: " + d.version
	}
	return new c(d)
};
OpenLayers.Protocol.CSW.DEFAULTS = {
	version : "2.0.2"
};
OpenLayers.Format.WMTSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.0.0",
		yx : {
			"urn:ogc:def:crs:EPSG::4326" : !0
		},
		createLayer : function (r, q) {
			var p,
			o = {
				layer : !0,
				matrixSet : !0
			},
			n;
			for (n in o) {
				if (!(n in q)) {
					throw Error("Missing property '" + n + "' in layer configuration.")
				}
			}
			o = r.contents;
			n = o.tileMatrixSets[q.matrixSet];
			for (var m, l = 0, k = o.layers.length; l < k; ++l) {
				if (o.layers[l].identifier === q.layer) {
					m = o.layers[l];
					break
				}
			}
			if (m && n) {
				for (var i, l = 0, k = m.styles.length; l < k && !(i = m.styles[l], i.isDefault); ++l) {}

				p = new OpenLayers.Layer.WMTS(OpenLayers.Util.applyDefaults(q, {
							url : "REST" === q.requestEncoding && m.resourceUrl ? m.resourceUrl.tile.template : r.operationsMetadata.GetTile.dcp.http.get[0].url,
							name : m.title,
							style : i.identifier,
							matrixIds : n.matrixIds,
							tileFullExtent : n.bounds
						}))
			}
			return p
		},
		CLASS_NAME : "OpenLayers.Format.WMTSCapabilities"
	});
OpenLayers.Layer.Google.v3 = {
	DEFAULTS : {
		sphericalMercator : !0,
		projection : "EPSG:900913"
	},
	animationEnabled : !0,
	loadMapObject : function () {
		this.type || (this.type = google.maps.MapTypeId.ROADMAP);
		var d,
		c = OpenLayers.Layer.Google.cache[this.map.id];
		c ? (d = c.mapObject, ++c.count) : (c = this.map.viewPortDiv, d = document.createElement("div"), d.id = this.map.id + "_GMapContainer", d.style.position = "absolute", d.style.width = "100%", d.style.height = "100%", c.appendChild(d), c = this.map.getCenter(), d = new google.maps.Map(d, {
					center : c ? new google.maps.LatLng(c.lat, c.lon) : new google.maps.LatLng(0, 0),
					zoom : this.map.getZoom() || 0,
					mapTypeId : this.type,
					disableDefaultUI : !0,
					keyboardShortcuts : !1,
					draggable : !1,
					disableDoubleClickZoom : !0,
					scrollwheel : !1,
					streetViewControl : !1
				}), c = {
				mapObject : d,
				count : 1
			}, OpenLayers.Layer.Google.cache[this.map.id] = c, this.repositionListener = google.maps.event.addListenerOnce(d, "center_changed", OpenLayers.Function.bind(this.repositionMapElements, this)));
		this.mapObject = d;
		this.setGMapVisibility(this.visibility)
	},
	repositionMapElements : function () {
		google.maps.event.trigger(this.mapObject, "resize");
		var i = this.mapObject.getDiv().firstChild;
		if (!i || 3 > i.childNodes.length) {
			return this.repositionTimer = window.setTimeout(OpenLayers.Function.bind(this.repositionMapElements, this), 250),
			!1
		}
		for (var h = OpenLayers.Layer.Google.cache[this.map.id], g = this.map.viewPortDiv, f = i.children.length - 1; 0 <= f; --f) {
			if (1000001 == i.children[f].style.zIndex) {
				var j = i.children[f];
				g.appendChild(j);
				j.style.zIndex = "1100";
				j.style.bottom = "";
				j.className = "olLayerGoogleCopyright olLayerGoogleV3";
				j.style.display = "";
				h.termsOfUse = j
			}
			1000000 == i.children[f].style.zIndex && (j = i.children[f], g.appendChild(j), j.style.zIndex = "1100", j.style.bottom = "", j.className = "olLayerGooglePoweredBy olLayerGoogleV3 gmnoprint", j.style.display = "", h.poweredBy = j);
			10000002 == i.children[f].style.zIndex && g.appendChild(i.children[f])
		}
		this.setGMapVisibility(this.visibility)
	},
	onMapResize : function () {
		if (this.visibility) {
			google.maps.event.trigger(this.mapObject, "resize")
		} else {
			var d = OpenLayers.Layer.Google.cache[this.map.id];
			if (!d.resized) {
				var c = this;
				google.maps.event.addListenerOnce(this.mapObject, "tilesloaded", function () {
					google.maps.event.trigger(c.mapObject, "resize");
					c.moveTo(c.map.getCenter(), c.map.getZoom());
					delete d.resized
				})
			}
			d.resized = !0
		}
	},
	setGMapVisibility : function (j) {
		var i = OpenLayers.Layer.Google.cache[this.map.id];
		if (i) {
			for (var h = this.type, g = this.map.layers, l, k = g.length - 1; 0 <= k; --k) {
				if (l = g[k], l instanceof OpenLayers.Layer.Google && !0 === l.visibility && !0 === l.inRange) {
					h = l.type;
					j = !0;
					break
				}
			}
			g = this.mapObject.getDiv();
			!0 === j ? (this.mapObject.setMapTypeId(h), g.style.left = "", i.termsOfUse && i.termsOfUse.style && (i.termsOfUse.style.left = "", i.termsOfUse.style.display = "", i.poweredBy.style.display = ""), i.displayed = this.id) : (delete i.displayed, g.style.left = "-9999px", i.termsOfUse && i.termsOfUse.style && (i.termsOfUse.style.display = "none", i.termsOfUse.style.left = "-9999px", i.poweredBy.style.display = "none"))
		}
	},
	getMapContainer : function () {
		return this.mapObject.getDiv()
	},
	getMapObjectBoundsFromOLBounds : function (d) {
		var c = null;
		null != d && (c = this.sphericalMercator ? this.inverseMercator(d.bottom, d.left) : new OpenLayers.LonLat(d.bottom, d.left), d = this.sphericalMercator ? this.inverseMercator(d.top, d.right) : new OpenLayers.LonLat(d.top, d.right), c = new google.maps.LatLngBounds(new google.maps.LatLng(c.lat, c.lon), new google.maps.LatLng(d.lat, d.lon)));
		return c
	},
	getMapObjectLonLatFromMapObjectPixel : function (i) {
		var h = this.map.getSize(),
		g = this.getLongitudeFromMapObjectLonLat(this.mapObject.center),
		f = this.getLatitudeFromMapObjectLonLat(this.mapObject.center),
		j = this.map.getResolution();
		i = new OpenLayers.LonLat(g + (i.x - h.w / 2) * j, f - (i.y - h.h / 2) * j);
		this.wrapDateLine && (i = i.wrapDateLine(this.maxExtent));
		return this.getMapObjectLonLatFromLonLat(i.lon, i.lat)
	},
	getMapObjectPixelFromMapObjectLonLat : function (h) {
		var g = this.getLongitudeFromMapObjectLonLat(h);
		h = this.getLatitudeFromMapObjectLonLat(h);
		var f = this.map.getResolution(),
		e = this.map.getExtent();
		return this.getMapObjectPixelFromXY(1 / f * (g - e.left), 1 / f * (e.top - h))
	},
	setMapObjectCenter : function (d, f) {
		if (!1 === this.animationEnabled && f != this.mapObject.zoom) {
			var e = this.getMapContainer();
			google.maps.event.addListenerOnce(this.mapObject, "idle", function () {
				e.style.visibility = ""
			});
			e.style.visibility = "hidden"
		}
		this.mapObject.setOptions({
			center : d,
			zoom : f
		})
	},
	getMapObjectZoomFromMapObjectBounds : function (b) {
		return this.mapObject.getBoundsZoomLevel(b)
	},
	getMapObjectLonLatFromLonLat : function (d, f) {
		var e;
		this.sphericalMercator ? (e = this.inverseMercator(d, f), e = new google.maps.LatLng(e.lat, e.lon)) : e = new google.maps.LatLng(f, d);
		return e
	},
	getMapObjectPixelFromXY : function (d, c) {
		return new google.maps.Point(d, c)
	},
	destroy : function () {
		this.repositionListener && google.maps.event.removeListener(this.repositionListener);
		this.repositionTimer && window.clearTimeout(this.repositionTimer);
		OpenLayers.Layer.Google.prototype.destroy.apply(this, arguments)
	}
};
OpenLayers.Format.WPSDescribeProcess = OpenLayers.Class(OpenLayers.Format.XML, {
		VERSION : "1.0.0",
		namespaces : {
			wps : "http://www.opengis.net/wps/1.0.0",
			ows : "http://www.opengis.net/ows/1.1",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		schemaLocation : "http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd",
		defaultPrefix : "wps",
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			return c
		},
		readers : {
			wps : {
				ProcessDescriptions : function (d, c) {
					c.processDescriptions = {};
					this.readChildNodes(d, c.processDescriptions)
				},
				ProcessDescription : function (d, f) {
					var e = {
						processVersion : this.getAttributeNS(d, this.namespaces.wps, "processVersion"),
						statusSupported : "true" === d.getAttribute("statusSupported"),
						storeSupported : "true" === d.getAttribute("storeSupported")
					};
					this.readChildNodes(d, e);
					f[e.identifier] = e
				},
				DataInputs : function (d, c) {
					c.dataInputs = [];
					this.readChildNodes(d, c.dataInputs)
				},
				ProcessOutputs : function (d, c) {
					c.processOutputs = [];
					this.readChildNodes(d, c.processOutputs)
				},
				Output : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.push(e)
				},
				ComplexOutput : function (d, c) {
					c.complexOutput = {};
					this.readChildNodes(d, c.complexOutput)
				},
				Input : function (d, f) {
					var e = {
						maxOccurs : parseInt(d.getAttribute("maxOccurs")),
						minOccurs : parseInt(d.getAttribute("minOccurs"))
					};
					this.readChildNodes(d, e);
					f.push(e)
				},
				BoundingBoxData : function (d, c) {
					c.boundingBoxData = {};
					this.readChildNodes(d, c.boundingBoxData)
				},
				CRS : function (d, c) {
					c.CRSs || (c.CRSs = {});
					c.CRSs[this.getChildValue(d)] = !0
				},
				LiteralData : function (d, c) {
					c.literalData = {};
					this.readChildNodes(d, c.literalData)
				},
				ComplexData : function (d, c) {
					c.complexData = {};
					this.readChildNodes(d, c.complexData)
				},
				Default : function (d, c) {
					c["default"] = {};
					this.readChildNodes(d, c["default"])
				},
				Supported : function (d, c) {
					c.supported = {};
					this.readChildNodes(d, c.supported)
				},
				Format : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.formats || (f.formats = {});
					f.formats[e.mimeType] = !0
				},
				MimeType : function (d, c) {
					c.mimeType = this.getChildValue(d)
				}
			},
			ows : OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
		},
		CLASS_NAME : "OpenLayers.Format.WPSDescribeProcess"
	});
OpenLayers.Format.CSWGetRecords.v2_0_2 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			csw : "http://www.opengis.net/cat/csw/2.0.2",
			dc : "http://purl.org/dc/elements/1.1/",
			dct : "http://purl.org/dc/terms/",
			gmd : "http://www.isotc211.org/2005/gmd",
			geonet : "http://www.fao.org/geonetwork",
			ogc : "http://www.opengis.net/ogc",
			ows : "http://www.opengis.net/ows",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		defaultPrefix : "csw",
		version : "2.0.2",
		schemaLocation : "http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd",
		requestId : null,
		resultType : null,
		outputFormat : null,
		outputSchema : null,
		startPosition : null,
		maxRecords : null,
		DistributedSearch : null,
		ResponseHandler : null,
		Query : null,
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			return c
		},
		readers : {
			csw : {
				GetRecordsResponse : function (d, f) {
					f.records = [];
					this.readChildNodes(d, f);
					var e = this.getAttributeNS(d, "", "version");
					"" != e && (f.version = e)
				},
				RequestId : function (d, c) {
					c.RequestId = this.getChildValue(d)
				},
				SearchStatus : function (d, f) {
					f.SearchStatus = {};
					var e = this.getAttributeNS(d, "", "timestamp");
					"" != e && (f.SearchStatus.timestamp = e)
				},
				SearchResults : function (j, i) {
					this.readChildNodes(j, i);
					for (var h = j.attributes, g = {}, l = 0, k = h.length; l < k; ++l) {
						g[h[l].name] = "numberOfRecordsMatched" == h[l].name || "numberOfRecordsReturned" == h[l].name || "nextRecord" == h[l].name ? parseInt(h[l].nodeValue) : h[l].nodeValue
					}
					i.SearchResults = g
				},
				SummaryRecord : function (d, f) {
					var e = {
						type : "SummaryRecord"
					};
					this.readChildNodes(d, e);
					f.records.push(e)
				},
				BriefRecord : function (d, f) {
					var e = {
						type : "BriefRecord"
					};
					this.readChildNodes(d, e);
					f.records.push(e)
				},
				DCMIRecord : function (d, f) {
					var e = {
						type : "DCMIRecord"
					};
					this.readChildNodes(d, e);
					f.records.push(e)
				},
				Record : function (d, f) {
					var e = {
						type : "Record"
					};
					this.readChildNodes(d, e);
					f.records.push(e)
				},
				"*" : function (d, f) {
					var e = d.localName || d.nodeName.split(":").pop();
					f[e] = this.getChildValue(d)
				}
			},
			geonet : {
				info : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.gninfo = e
				}
			},
			dc : {
				"*" : function (l, k) {
					var j = l.localName || l.nodeName.split(":").pop();
					OpenLayers.Util.isArray(k[j]) || (k[j] = []);
					for (var i = {}, h = l.attributes, n = 0, m = h.length; n < m; ++n) {
						i[h[n].name] = h[n].nodeValue
					}
					i.value = this.getChildValue(l);
					"" != i.value && k[j].push(i)
				}
			},
			dct : {
				"*" : function (d, f) {
					var e = d.localName || d.nodeName.split(":").pop();
					OpenLayers.Util.isArray(f[e]) || (f[e] = []);
					f[e].push(this.getChildValue(d))
				}
			},
			ows : OpenLayers.Util.applyDefaults({
				BoundingBox : function (d, c) {
					c.bounds && (c.BoundingBox = [{
								crs : c.projection,
								value : [c.bounds.left, c.bounds.bottom, c.bounds.right, c.bounds.top]
							}
						], delete c.projection, delete c.bounds);
					OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows.BoundingBox.apply(this, arguments)
				}
			}, OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows)
		},
		write : function (b) {
			b = this.writeNode("csw:GetRecords", b);
			b.setAttribute("xmlns:gmd", this.namespaces.gmd);
			return OpenLayers.Format.XML.prototype.write.apply(this, [b])
		},
		writers : {
			csw : {
				GetRecords : function (i) {
					i || (i = {});
					var h = this.createElementNSPlus("csw:GetRecords", {
							attributes : {
								service : "CSW",
								version : this.version,
								requestId : i.requestId || this.requestId,
								resultType : i.resultType || this.resultType,
								outputFormat : i.outputFormat || this.outputFormat,
								outputSchema : i.outputSchema || this.outputSchema,
								startPosition : i.startPosition || this.startPosition,
								maxRecords : i.maxRecords || this.maxRecords
							}
						});
					if (i.DistributedSearch || this.DistributedSearch) {
						this.writeNode("csw:DistributedSearch", i.DistributedSearch || this.DistributedSearch, h)
					}
					var g = i.ResponseHandler || this.ResponseHandler;
					if (OpenLayers.Util.isArray(g) && 0 < g.length) {
						for (var f = 0, j = g.length; f < j; f++) {
							this.writeNode("csw:ResponseHandler", g[f], h)
						}
					}
					this.writeNode("Query", i.Query || this.Query, h);
					return h
				},
				DistributedSearch : function (b) {
					return this.createElementNSPlus("csw:DistributedSearch", {
						attributes : {
							hopCount : b.hopCount
						}
					})
				},
				ResponseHandler : function (b) {
					return this.createElementNSPlus("csw:ResponseHandler", {
						value : b.value
					})
				},
				Query : function (i) {
					i || (i = {});
					var h = this.createElementNSPlus("csw:Query", {
							attributes : {
								typeNames : i.typeNames || "csw:Record"
							}
						}),
					g = i.ElementName;
					if (OpenLayers.Util.isArray(g) && 0 < g.length) {
						for (var f = 0, j = g.length; f < j; f++) {
							this.writeNode("csw:ElementName", g[f], h)
						}
					} else {
						this.writeNode("csw:ElementSetName", i.ElementSetName || {
							value : "summary"
						}, h)
					}
					i.Constraint && this.writeNode("csw:Constraint", i.Constraint, h);
					i.SortBy && this.writeNode("ogc:SortBy", i.SortBy, h);
					return h
				},
				ElementName : function (b) {
					return this.createElementNSPlus("csw:ElementName", {
						value : b.value
					})
				},
				ElementSetName : function (b) {
					return this.createElementNSPlus("csw:ElementSetName", {
						attributes : {
							typeNames : b.typeNames
						},
						value : b.value
					})
				},
				Constraint : function (d) {
					var f = this.createElementNSPlus("csw:Constraint", {
							attributes : {
								version : d.version
							}
						});
					if (d.Filter) {
						var e = new OpenLayers.Format.Filter({
								version : d.version
							});
						f.appendChild(e.write(d.Filter))
					} else {
						d.CqlText && (d = this.createElementNSPlus("CqlText", {
									value : d.CqlText.value
								}), f.appendChild(d))
					}
					return f
				}
			},
			ogc : OpenLayers.Format.Filter.v1_1_0.prototype.writers.ogc
		},
		CLASS_NAME : "OpenLayers.Format.CSWGetRecords.v2_0_2"
	});
OpenLayers.Marker.Box = OpenLayers.Class(OpenLayers.Marker, {
		bounds : null,
		div : null,
		initialize : function (d, f, e) {
			this.bounds = d;
			this.div = OpenLayers.Util.createDiv();
			this.div.style.overflow = "hidden";
			this.events = new OpenLayers.Events(this, this.div);
			this.setBorder(f, e)
		},
		destroy : function () {
			this.div = this.bounds = null;
			OpenLayers.Marker.prototype.destroy.apply(this, arguments)
		},
		setBorder : function (d, c) {
			d || (d = "red");
			c || (c = 2);
			this.div.style.border = c + "px solid " + d
		},
		draw : function (d, c) {
			OpenLayers.Util.modifyDOMElement(this.div, null, d, c);
			return this.div
		},
		onScreen : function () {
			var b = !1;
			this.map && (b = this.map.getExtent().containsBounds(this.bounds, !0, !0));
			return b
		},
		display : function (b) {
			this.div.style.display = b ? "" : "none"
		},
		CLASS_NAME : "OpenLayers.Marker.Box"
	});
OpenLayers.Format.Text = OpenLayers.Class(OpenLayers.Format, {
		defaultStyle : null,
		extractStyles : !0,
		initialize : function (b) {
			b = b || {};
			!1 !== b.extractStyles && (b.defaultStyle = {
					externalGraphic : OpenLayers.Util.getImageLocation("marker.png"),
					graphicWidth : 21,
					graphicHeight : 25,
					graphicXOffset : -10.5,
					graphicYOffset : -12.5
				});
			OpenLayers.Format.prototype.initialize.apply(this, [b])
		},
		read : function (o) {
			o = o.split("\n");
			for (var n, m = [], i = 0; i < o.length - 1; i++) {
				var v = o[i].replace(/^\s*/, "").replace(/\s*$/, "");
				if ("#" != v.charAt(0)) {
					if (n) {
						for (var v = v.split("\t"), u = new OpenLayers.Geometry.Point(0, 0), t = {}, s = this.defaultStyle ? OpenLayers.Util.applyDefaults({}, this.defaultStyle) : null, r = !1, q = 0; q < v.length; q++) {
							if (v[q]) {
								if ("point" == n[q]) {
									r = v[q].split(","),
									u.y = parseFloat(r[0]),
									u.x = parseFloat(r[1]),
									r = !0
								} else {
									if ("lat" == n[q]) {
										u.y = parseFloat(v[q]),
										r = !0
									} else {
										if ("lon" == n[q]) {
											u.x = parseFloat(v[q]),
											r = !0
										} else {
											if ("title" == n[q]) {
												t.title = v[q]
											} else {
												if ("image" == n[q] || "icon" == n[q] && s) {
													s.externalGraphic = v[q]
												} else {
													if ("iconSize" == n[q] && s) {
														var p = v[q].split(",");
														s.graphicWidth = parseFloat(p[0]);
														s.graphicHeight = parseFloat(p[1])
													} else {
														"iconOffset" == n[q] && s ? (p = v[q].split(","), s.graphicXOffset = parseFloat(p[0]), s.graphicYOffset = parseFloat(p[1])) : "description" == n[q] ? t.description = v[q] : "overflow" == n[q] ? t.overflow = v[q] : t[n[q]] = v[q]
													}
												}
											}
										}
									}
								}
							}
						}
						r && (this.internalProjection && this.externalProjection && u.transform(this.externalProjection, this.internalProjection), v = new OpenLayers.Feature.Vector(u, t, s), m.push(v))
					} else {
						n = v.split("\t")
					}
				}
			}
			return m
		},
		CLASS_NAME : "OpenLayers.Format.Text"
	});
OpenLayers.Layer.Text = OpenLayers.Class(OpenLayers.Layer.Markers, {
		location : null,
		features : null,
		formatOptions : null,
		selectedFeature : null,
		initialize : function (d, c) {
			OpenLayers.Layer.Markers.prototype.initialize.apply(this, arguments);
			this.features = []
		},
		destroy : function () {
			OpenLayers.Layer.Markers.prototype.destroy.apply(this, arguments);
			this.clearFeatures();
			this.features = null
		},
		loadText : function () {
			!this.loaded && null != this.location && (this.events.triggerEvent("loadstart"), OpenLayers.Request.GET({
					url : this.location,
					success : this.parseData,
					failure : function () {
						this.events.triggerEvent("loadend")
					},
					scope : this
				}), this.loaded = !0)
		},
		moveTo : function (d, f, e) {
			OpenLayers.Layer.Markers.prototype.moveTo.apply(this, arguments);
			this.visibility && !this.loaded && this.loadText()
		},
		parseData : function (o) {
			o = o.responseText;
			var n = {};
			OpenLayers.Util.extend(n, this.formatOptions);
			this.map && !this.projection.equals(this.map.getProjectionObject()) && (n.externalProjection = this.projection, n.internalProjection = this.map.getProjectionObject());
			o = (new OpenLayers.Format.Text(n)).read(o);
			for (var n = 0, m = o.length; n < m; n++) {
				var l = {},
				k = o[n],
				j,
				i,
				p;
				j = new OpenLayers.LonLat(k.geometry.x, k.geometry.y);
				k.style.graphicWidth && k.style.graphicHeight && (i = new OpenLayers.Size(k.style.graphicWidth, k.style.graphicHeight));
				void 0 !== k.style.graphicXOffset && void 0 !== k.style.graphicYOffset && (p = new OpenLayers.Pixel(k.style.graphicXOffset, k.style.graphicYOffset));
				null != k.style.externalGraphic ? l.icon = new OpenLayers.Icon(k.style.externalGraphic, i, p) : (l.icon = OpenLayers.Marker.defaultIcon(), null != i && l.icon.setSize(i));
				null != k.attributes.title && null != k.attributes.description && (l.popupContentHTML = "<h2>" + k.attributes.title + "</h2><p>" + k.attributes.description + "</p>");
				l.overflow = k.attributes.overflow || "auto";
				l = new OpenLayers.Feature(this, j, l);
				this.features.push(l);
				j = l.createMarker();
				null != k.attributes.title && null != k.attributes.description && j.events.register("click", l, this.markerClick);
				this.addMarker(j)
			}
			this.events.triggerEvent("loadend")
		},
		markerClick : function (h) {
			var g = this == this.layer.selectedFeature;
			this.layer.selectedFeature = !g ? this : null;
			for (var f = 0, e = this.layer.map.popups.length; f < e; f++) {
				this.layer.map.removePopup(this.layer.map.popups[f])
			}
			g || this.layer.map.addPopup(this.createPopup());
			OpenLayers.Event.stop(h)
		},
		clearFeatures : function () {
			if (null != this.features) {
				for (; 0 < this.features.length; ) {
					var b = this.features[0];
					OpenLayers.Util.removeItem(this.features, b);
					b.destroy()
				}
			}
		},
		CLASS_NAME : "OpenLayers.Layer.Text"
	});
OpenLayers.Handler.RegularPolygon = OpenLayers.Class(OpenLayers.Handler.Drag, {
		sides : 4,
		radius : null,
		snapAngle : null,
		snapToggle : "shiftKey",
		layerOptions : null,
		persist : !1,
		irregular : !1,
		citeCompliant : !1,
		angle : null,
		fixedRadius : !1,
		feature : null,
		layer : null,
		origin : null,
		initialize : function (d, f, e) {
			if (!e || !e.layerOptions || !e.layerOptions.styleMap) {
				this.style = OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"], {})
			}
			OpenLayers.Handler.Drag.prototype.initialize.apply(this, [d, f, e]);
			this.options = e ? e : {}

		},
		setOptions : function (b) {
			OpenLayers.Util.extend(this.options, b);
			OpenLayers.Util.extend(this, b)
		},
		activate : function () {
			var b = !1;
			OpenLayers.Handler.Drag.prototype.activate.apply(this, arguments) && (b = OpenLayers.Util.extend({
						displayInLayerSwitcher : !1,
						calculateInRange : OpenLayers.Function.True,
						wrapDateLine : this.citeCompliant
					}, this.layerOptions), this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, b), this.map.addLayer(this.layer), b = !0);
			return b
		},
		deactivate : function () {
			var b = !1;
			OpenLayers.Handler.Drag.prototype.deactivate.apply(this, arguments) && (this.dragging && this.cancel(), null != this.layer.map && (this.layer.destroy(!1), this.feature && this.feature.destroy()), this.feature = this.layer = null, b = !0);
			return b
		},
		down : function (b) {
			this.fixedRadius = !!this.radius;
			b = this.layer.getLonLatFromViewPortPx(b.xy);
			this.origin = new OpenLayers.Geometry.Point(b.lon, b.lat);
			if (!this.fixedRadius || this.irregular) {
				this.radius = this.map.getResolution()
			}
			this.persist && this.clear();
			this.feature = new OpenLayers.Feature.Vector;
			this.createGeometry();
			this.callback("create", [this.origin, this.feature]);
			this.layer.addFeatures([this.feature], {
				silent : !0
			});
			this.layer.drawFeature(this.feature, this.style)
		},
		move : function (d) {
			var f = this.layer.getLonLatFromViewPortPx(d.xy),
			f = new OpenLayers.Geometry.Point(f.lon, f.lat);
			this.irregular ? (d = Math.sqrt(2) * Math.abs(f.y - this.origin.y) / 2, this.radius = Math.max(this.map.getResolution() / 2, d)) : this.fixedRadius ? this.origin = f : (this.calculateAngle(f, d), this.radius = Math.max(this.map.getResolution() / 2, f.distanceTo(this.origin)));
			this.modifyGeometry();
			if (this.irregular) {
				d = f.x - this.origin.x;
				var f = f.y - this.origin.y,
				e;
				e = 0 == f ? d / (this.radius * Math.sqrt(2)) : d / f;
				this.feature.geometry.resize(1, this.origin, e);
				this.feature.geometry.move(d / 2, f / 2)
			}
			this.layer.drawFeature(this.feature, this.style)
		},
		up : function (b) {
			this.finalize();
			this.start == this.last && this.callback("done", [b.xy])
		},
		out : function () {
			this.finalize()
		},
		createGeometry : function () {
			this.angle = Math.PI * (1 / this.sides - 0.5);
			this.snapAngle && (this.angle += this.snapAngle * (Math.PI / 180));
			this.feature.geometry = OpenLayers.Geometry.Polygon.createRegularPolygon(this.origin, this.radius, this.sides, this.snapAngle)
		},
		modifyGeometry : function () {
			var h,
			g,
			f = this.feature.geometry.components[0];
			f.components.length != this.sides + 1 && (this.createGeometry(), f = this.feature.geometry.components[0]);
			for (var e = 0; e < this.sides; ++e) {
				g = f.components[e],
				h = this.angle + 2 * e * Math.PI / this.sides,
				g.x = this.origin.x + this.radius * Math.cos(h),
				g.y = this.origin.y + this.radius * Math.sin(h),
				g.clearBounds()
			}
		},
		calculateAngle : function (h, g) {
			var f = Math.atan2(h.y - this.origin.y, h.x - this.origin.x);
			if (this.snapAngle && this.snapToggle && !g[this.snapToggle]) {
				var e = Math.PI / 180 * this.snapAngle;
				this.angle = Math.round(f / e) * e
			} else {
				this.angle = f
			}
		},
		cancel : function () {
			this.callback("cancel", null);
			this.finalize()
		},
		finalize : function () {
			this.origin = null;
			this.radius = this.options.radius
		},
		clear : function () {
			this.layer && (this.layer.renderer.clear(), this.layer.destroyFeatures())
		},
		callback : function (b) {
			this.callbacks[b] && this.callbacks[b].apply(this.control, [this.feature.geometry.clone()]);
			!this.persist && ("done" == b || "cancel" == b) && this.clear()
		},
		CLASS_NAME : "OpenLayers.Handler.RegularPolygon"
	});
OpenLayers.Control.SLDSelect = OpenLayers.Class(OpenLayers.Control, {
		clearOnDeactivate : !1,
		layers : null,
		callbacks : null,
		selectionSymbolizer : {
			Polygon : {
				fillColor : "#FF0000",
				stroke : !1
			},
			Line : {
				strokeColor : "#FF0000",
				strokeWidth : 2
			},
			Point : {
				graphicName : "square",
				fillColor : "#FF0000",
				pointRadius : 5
			}
		},
		layerOptions : null,
		handlerOptions : null,
		sketchStyle : null,
		wfsCache : {},
		layerCache : {},
		initialize : function (d, c) {
			OpenLayers.Control.prototype.initialize.apply(this, [c]);
			this.callbacks = OpenLayers.Util.extend({
					done : this.select,
					click : this.select
				}, this.callbacks);
			this.handlerOptions = this.handlerOptions || {};
			this.layerOptions = OpenLayers.Util.applyDefaults(this.layerOptions, {
					displayInLayerSwitcher : !1,
					tileOptions : {
						maxGetUrlLength : 2048
					}
				});
			this.sketchStyle && (this.handlerOptions.layerOptions = OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions, {
						styleMap : new OpenLayers.StyleMap({
							"default" : this.sketchStyle
						})
					}));
			this.handler = new d(this, this.callbacks, this.handlerOptions)
		},
		destroy : function () {
			for (var b in this.layerCache) {
				delete this.layerCache[b]
			}
			for (b in this.wfsCache) {
				delete this.wfsCache[b]
			}
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		coupleLayerVisiblity : function (b) {
			this.setVisibility(b.object.getVisibility())
		},
		createSelectionLayer : function (d) {
			var c;
			if (this.layerCache[d.id]) {
				c = this.layerCache[d.id]
			} else {
				c = new OpenLayers.Layer.WMS(d.name, d.url, d.params, OpenLayers.Util.applyDefaults(this.layerOptions, d.getOptions()));
				this.layerCache[d.id] = c;
				if (!1 === this.layerOptions.displayInLayerSwitcher) {
					d.events.on({
						visibilitychanged : this.coupleLayerVisiblity,
						scope : c
					})
				}
				this.map.addLayer(c)
			}
			return c
		},
		createSLD : function (l, i, t) {
			for (var s = {
					version : "1.0.0",
					namedLayers : {}

				}, r = ("" + l.params.LAYERS).split(","), q = 0, p = r.length; q < p; q++) {
				var o = r[q];
				s.namedLayers[o] = {
					name : o,
					userStyles : []
				};
				var n = this.selectionSymbolizer,
				m = t[q];
				0 <= m.type.indexOf("Polygon") ? n = {
					Polygon : this.selectionSymbolizer.Polygon
				}
				 : 0 <= m.type.indexOf("LineString") ? n = {
					Line : this.selectionSymbolizer.Line
				}
				 : 0 <= m.type.indexOf("Point") && (n = {
						Point : this.selectionSymbolizer.Point
					});
				s.namedLayers[o].userStyles.push({
					name : "default",
					rules : [new OpenLayers.Rule({
							symbolizer : n,
							filter : i[q],
							maxScaleDenominator : l.options.minScale
						})]
				})
			}
			return (new OpenLayers.Format.SLD({
					srsName : this.map.getProjection()
				})).write(s)
		},
		parseDescribeLayer : function (i) {
			var h = new OpenLayers.Format.WMSDescribeLayer,
			g = i.responseXML;
			if (!g || !g.documentElement) {
				g = i.responseText
			}
			i = h.read(g);
			for (var h = [], g = null, f = 0, j = i.length; f < j; f++) {
				"WFS" == i[f].owsType && (h.push(i[f].typeName), g = i[f].owsURL)
			}
			OpenLayers.Request.GET({
				url : g,
				params : {
					SERVICE : "WFS",
					TYPENAME : h.toString(),
					REQUEST : "DescribeFeatureType",
					VERSION : "1.0.0"
				},
				callback : function (b) {
					var a = new OpenLayers.Format.WFSDescribeFeatureType,
					c = b.responseXML;
					if (!c || !c.documentElement) {
						c = b.responseText
					}
					b = a.read(c);
					this.control.wfsCache[this.layer.id] = b;
					this.control._queue && this.control.applySelection()
				},
				scope : this
			})
		},
		getGeometryAttributes : function (r) {
			var q = [];
			r = this.wfsCache[r.id];
			for (var p = 0, o = r.featureTypes.length; p < o; p++) {
				for (var n = r.featureTypes[p].properties, m = 0, l = n.length; m < l; m++) {
					var k = n[m],
					i = k.type;
					(0 <= i.indexOf("LineString") || 0 <= i.indexOf("GeometryAssociationType") || 0 <= i.indexOf("GeometryPropertyType") || 0 <= i.indexOf("Point") || 0 <= i.indexOf("Polygon")) && q.push(k)
				}
			}
			return q
		},
		activate : function () {
			var h = OpenLayers.Control.prototype.activate.call(this);
			if (h) {
				for (var g = 0, f = this.layers.length; g < f; g++) {
					var e = this.layers[g];
					e && !this.wfsCache[e.id] && OpenLayers.Request.GET({
						url : e.url,
						params : {
							SERVICE : "WMS",
							VERSION : e.params.VERSION,
							LAYERS : e.params.LAYERS,
							REQUEST : "DescribeLayer"
						},
						callback : this.parseDescribeLayer,
						scope : {
							layer : e,
							control : this
						}
					})
				}
			}
			return h
		},
		deactivate : function () {
			var j = OpenLayers.Control.prototype.deactivate.call(this);
			if (j) {
				for (var i = 0, h = this.layers.length; i < h; i++) {
					var g = this.layers[i];
					if (g && !0 === this.clearOnDeactivate) {
						var l = this.layerCache,
						k = l[g.id];
						k && (g.events.un({
								visibilitychanged : this.coupleLayerVisiblity,
								scope : k
							}), k.destroy(), delete l[g.id])
					}
				}
			}
			return j
		},
		setLayers : function (b) {
			this.active ? (this.deactivate(), this.layers = b, this.activate()) : this.layers = b
		},
		createFilter : function (d, f) {
			var e = null;
			this.handler instanceof OpenLayers.Handler.RegularPolygon ? e = !0 === this.handler.irregular ? new OpenLayers.Filter.Spatial({
					type : OpenLayers.Filter.Spatial.BBOX,
					property : d.name,
					value : f.getBounds()
				}) : new OpenLayers.Filter.Spatial({
					type : OpenLayers.Filter.Spatial.INTERSECTS,
					property : d.name,
					value : f
				}) : this.handler instanceof OpenLayers.Handler.Polygon ? e = new OpenLayers.Filter.Spatial({
					type : OpenLayers.Filter.Spatial.INTERSECTS,
					property : d.name,
					value : f
				}) : this.handler instanceof OpenLayers.Handler.Path ? e = 0 <= d.type.indexOf("Point") ? new OpenLayers.Filter.Spatial({
					type : OpenLayers.Filter.Spatial.DWITHIN,
					property : d.name,
					distance : 0.01 * this.map.getExtent().getWidth(),
					distanceUnits : this.map.getUnits(),
					value : f
				}) : new OpenLayers.Filter.Spatial({
					type : OpenLayers.Filter.Spatial.INTERSECTS,
					property : d.name,
					value : f
				}) : this.handler instanceof OpenLayers.Handler.Click && (e = 0 <= d.type.indexOf("Polygon") ? new OpenLayers.Filter.Spatial({
							type : OpenLayers.Filter.Spatial.INTERSECTS,
							property : d.name,
							value : f
						}) : new OpenLayers.Filter.Spatial({
							type : OpenLayers.Filter.Spatial.DWITHIN,
							property : d.name,
							distance : 0.01 * this.map.getExtent().getWidth(),
							distanceUnits : this.map.getUnits(),
							value : f
						}));
			return e
		},
		select : function (b) {
			this._queue = function () {
				for (var r = 0, q = this.layers.length; r < q; r++) {
					for (var p = this.layers[r], o = this.getGeometryAttributes(p), n = [], m = 0, l = o.length; m < l; m++) {
						var i = o[m];
						if (null !== i) {
							if (!(b instanceof OpenLayers.Geometry)) {
								var a = this.map.getLonLatFromPixel(b.xy);
								b = new OpenLayers.Geometry.Point(a.lon, a.lat)
							}
							i = this.createFilter(i, b);
							null !== i && n.push(i)
						}
					}
					m = this.createSelectionLayer(p);
					o = this.createSLD(p, n, o);
					this.events.triggerEvent("selected", {
						layer : p,
						filters : n
					});
					m.mergeNewParams({
						SLD_BODY : o
					});
					delete this._queue
				}
			};
			this.applySelection()
		},
		applySelection : function () {
			for (var d = !0, f = 0, e = this.layers.length; f < e; f++) {
				if (!this.wfsCache[this.layers[f].id]) {
					d = !1;
					break
				}
			}
			d && this._queue.call(this)
		},
		CLASS_NAME : "OpenLayers.Control.SLDSelect"
	});
OpenLayers.Control.Scale = OpenLayers.Class(OpenLayers.Control, {
		element : null,
		geodesic : !1,
		initialize : function (d, c) {
			OpenLayers.Control.prototype.initialize.apply(this, [c]);
			this.element = OpenLayers.Util.getElement(d)
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			this.element || (this.element = document.createElement("div"), this.div.appendChild(this.element));
			this.map.events.register("moveend", this, this.updateScale);
			this.updateScale();
			return this.div
		},
		updateScale : function () {
			var b;
			if (!0 === this.geodesic) {
				if (!this.map.getUnits()) {
					return
				}
				b = OpenLayers.INCHES_PER_UNIT;
				b = (this.map.getGeodesicPixelSize().w || 0.000001) * b.km * OpenLayers.DOTS_PER_INCH
			} else {
				b = this.map.getScale()
			}
			b && (b = 9500 <= b && 950000 >= b ? Math.round(b / 1000) + "K" : 950000 <= b ? Math.round(b / 1000000) + "M" : Math.round(b), this.element.innerHTML = OpenLayers.i18n("Scale = 1 : ${scaleDenom}", {
						scaleDenom : b
					}))
		},
		CLASS_NAME : "OpenLayers.Control.Scale"
	});
OpenLayers.Control.Button = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_BUTTON,
		trigger : function () {},
		CLASS_NAME : "OpenLayers.Control.Button"
	});
OpenLayers.Layer.MapGuide = OpenLayers.Class(OpenLayers.Layer.Grid, {
		isBaseLayer : !0,
		useHttpTile : !1,
		singleTile : !1,
		useOverlay : !1,
		useAsyncOverlay : !0,
		TILE_PARAMS : {
			operation : "GETTILEIMAGE",
			version : "1.2.0"
		},
		SINGLE_TILE_PARAMS : {
			operation : "GETMAPIMAGE",
			format : "PNG",
			locale : "en",
			clip : "1",
			version : "1.0.0"
		},
		OVERLAY_PARAMS : {
			operation : "GETDYNAMICMAPOVERLAYIMAGE",
			format : "PNG",
			locale : "en",
			clip : "1",
			version : "2.0.0"
		},
		FOLDER_PARAMS : {
			tileColumnsPerFolder : 30,
			tileRowsPerFolder : 30,
			format : "png",
			querystring : null
		},
		defaultSize : new OpenLayers.Size(300, 300),
		tileOriginCorner : "tl",
		initialize : function (h, g, f, e) {
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, arguments);
			if (null == e || null == e.isBaseLayer) {
				this.isBaseLayer = "true" != this.transparent && !0 != this.transparent
			}
			e && null != e.useOverlay && (this.useOverlay = e.useOverlay);
			this.singleTile ? this.useOverlay ? (OpenLayers.Util.applyDefaults(this.params, this.OVERLAY_PARAMS), this.useAsyncOverlay || (this.params.version = "1.0.0")) : OpenLayers.Util.applyDefaults(this.params, this.SINGLE_TILE_PARAMS) : (this.useHttpTile ? OpenLayers.Util.applyDefaults(this.params, this.FOLDER_PARAMS) : OpenLayers.Util.applyDefaults(this.params, this.TILE_PARAMS), this.setTileSize(this.defaultSize))
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.MapGuide(this.name, this.url, this.params, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getURL : function (d) {
			var f;
			f = d.getCenterLonLat();
			var e = this.map.getSize();
			this.singleTile ? (d = {
					setdisplaydpi : OpenLayers.DOTS_PER_INCH,
					setdisplayheight : e.h * this.ratio,
					setdisplaywidth : e.w * this.ratio,
					setviewcenterx : f.lon,
					setviewcentery : f.lat,
					setviewscale : this.map.getScale()
				}, this.useOverlay && !this.useAsyncOverlay && (f = {}, f = OpenLayers.Util.extend(f, d), f.operation = "GETVISIBLEMAPEXTENT", f.version = "1.0.0", f.session = this.params.session, f.mapName = this.params.mapName, f.format = "text/xml", f = this.getFullRequestString(f), OpenLayers.Request.GET({
						url : f,
						async : !1
					})), f = this.getFullRequestString(d)) : (e = this.map.getResolution(), f = Math.floor((d.left - this.maxExtent.left) / e), f = Math.round(f / this.tileSize.w), d = Math.floor((this.maxExtent.top - d.top) / e), d = Math.round(d / this.tileSize.h), f = this.useHttpTile ? this.getImageFilePath({
						tilecol : f,
						tilerow : d,
						scaleindex : this.resolutions.length - this.map.zoom - 1
					}) : this.getFullRequestString({
						tilecol : f,
						tilerow : d,
						scaleindex : this.resolutions.length - this.map.zoom - 1
					}));
			return f
		},
		getFullRequestString : function (l, k) {
			var j = null == k ? this.url : k;
			"object" == typeof j && (j = j[Math.floor(Math.random() * j.length)]);
			var i = j,
			h = OpenLayers.Util.extend({}, this.params),
			h = OpenLayers.Util.extend(h, l),
			n = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(j)),
			m;
			for (m in h) {
				m.toUpperCase()in n && delete h[m]
			}
			h = OpenLayers.Util.getParameterString(h);
			h = h.replace(/,/g, "+");
			"" != h && (n = j.charAt(j.length - 1), i = "&" == n || "?" == n ? i + h : -1 == j.indexOf("?") ? i + ("?" + h) : i + ("&" + h));
			return i
		},
		getImageFilePath : function (i, h) {
			var g = null == h ? this.url : h;
			"object" == typeof g && (g = g[Math.floor(Math.random() * g.length)]);
			var f = "",
			j = "";
			0 > i.tilerow && (f = "-");
			f = 0 == i.tilerow ? f + "0" : f + Math.floor(Math.abs(i.tilerow / this.params.tileRowsPerFolder)) * this.params.tileRowsPerFolder;
			0 > i.tilecol && (j = "-");
			j = 0 == i.tilecol ? j + "0" : j + Math.floor(Math.abs(i.tilecol / this.params.tileColumnsPerFolder)) * this.params.tileColumnsPerFolder;
			f = "/S" + Math.floor(i.scaleindex) + "/" + this.params.basemaplayergroupname + "/R" + f + "/C" + j + "/" + i.tilerow % this.params.tileRowsPerFolder + "_" + i.tilecol % this.params.tileColumnsPerFolder + "." + this.params.format;
			this.params.querystring && (f += "?" + this.params.querystring);
			return g + f
		},
		calculateGridLayout : function (l, k, j) {
			var i = j * this.tileSize.w;
			j *= this.tileSize.h;
			var h = l.left - k.lon,
			n = Math.floor(h / i) - this.buffer;
			l = k.lat - l.top + j;
			var m = Math.floor(l / j) - this.buffer;
			return {
				tilelon : i,
				tilelat : j,
				tileoffsetlon : k.lon + n * i,
				tileoffsetlat : k.lat - j * m,
				tileoffsetx :  - (h / i - n) * this.tileSize.w,
				tileoffsety : (m - l / j) * this.tileSize.h
			}
		},
		CLASS_NAME : "OpenLayers.Layer.MapGuide"
	});
OpenLayers.Control.Measure = OpenLayers.Class(OpenLayers.Control, {
		handlerOptions : null,
		callbacks : null,
		displaySystem : "metric",
		geodesic : !1,
		displaySystemUnits : {
			geographic : ["dd"],
			english : ["mi", "ft", "in"],
			metric : ["km", "m"]
		},
		partialDelay : 300,
		delayedTrigger : null,
		persist : !1,
		immediate : !1,
		initialize : function (d, f) {
			OpenLayers.Control.prototype.initialize.apply(this, [f]);
			var e = {
				done : this.measureComplete,
				point : this.measurePartial
			};
			this.immediate && (e.modify = this.measureImmediate);
			this.callbacks = OpenLayers.Util.extend(e, this.callbacks);
			this.handlerOptions = OpenLayers.Util.extend({
					persist : this.persist
				}, this.handlerOptions);
			this.handler = new d(this, this.callbacks, this.handlerOptions)
		},
		deactivate : function () {
			this.cancelDelay();
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
		},
		cancel : function () {
			this.cancelDelay();
			this.handler.cancel()
		},
		setImmediate : function (b) {
			(this.immediate = b) ? this.callbacks.modify = this.measureImmediate : delete this.callbacks.modify
		},
		updateHandler : function (d, f) {
			var e = this.active;
			e && this.deactivate();
			this.handler = new d(this, this.callbacks, f);
			e && this.activate()
		},
		measureComplete : function (b) {
			this.cancelDelay();
			this.measure(b, "measure")
		},
		measurePartial : function (d, c) {
			this.cancelDelay();
			c = c.clone();
			this.handler.freehandMode(this.handler.evt) ? this.measure(c, "measurepartial") : this.delayedTrigger = window.setTimeout(OpenLayers.Function.bind(function () {
						this.delayedTrigger = null;
						this.measure(c, "measurepartial")
					}, this), this.partialDelay)
		},
		measureImmediate : function (d, f, e) {
			e && !this.handler.freehandMode(this.handler.evt) && (this.cancelDelay(), this.measure(f.geometry, "measurepartial"))
		},
		cancelDelay : function () {
			null !== this.delayedTrigger && (window.clearTimeout(this.delayedTrigger), this.delayedTrigger = null)
		},
		measure : function (h, g) {
			var f,
			e;
			-1 < h.CLASS_NAME.indexOf("LineString") ? (f = this.getBestLength(h), e = 1) : (f = this.getBestArea(h), e = 2);
			this.events.triggerEvent(g, {
				measure : f[0],
				units : f[1],
				order : e,
				geometry : h
			})
		},
		getBestArea : function (j) {
			for (var i = this.displaySystemUnits[this.displaySystem], h, g, l = 0, k = i.length; l < k && !(h = i[l], g = this.getArea(j, h), 1 < g); ++l) {}

			return [g, h]
		},
		getArea : function (i, h) {
			var g,
			f;
			this.geodesic ? (g = i.getGeodesicArea(this.map.getProjectionObject()), f = "m") : (g = i.getArea(), f = this.map.getUnits());
			var j = OpenLayers.INCHES_PER_UNIT[h];
			j && (g *= Math.pow(OpenLayers.INCHES_PER_UNIT[f] / j, 2));
			return g
		},
		getBestLength : function (j) {
			for (var i = this.displaySystemUnits[this.displaySystem], h, g, l = 0, k = i.length; l < k && !(h = i[l], g = this.getLength(j, h), 1 < g); ++l) {}

			return [g, h]
		},
		getLength : function (i, h) {
			var g,
			f;
			this.geodesic ? (g = i.getGeodesicLength(this.map.getProjectionObject()), f = "m") : (g = i.getLength(), f = this.map.getUnits());
			var j = OpenLayers.INCHES_PER_UNIT[h];
			j && (g *= OpenLayers.INCHES_PER_UNIT[f] / j);
			return g
		},
		CLASS_NAME : "OpenLayers.Control.Measure"
	});
OpenLayers.Format.WMC.v1_0_0 = OpenLayers.Class(OpenLayers.Format.WMC.v1, {
		VERSION : "1.0.0",
		schemaLocation : "http://www.opengis.net/context http://schemas.opengis.net/context/1.0.0/context.xsd",
		initialize : function (b) {
			OpenLayers.Format.WMC.v1.prototype.initialize.apply(this, [b])
		},
		read_wmc_SRS : function (i, h) {
			var g = this.getChildValue(h);
			"object" != typeof i.projections && (i.projections = {});
			for (var g = g.split(/ +/), f = 0, j = g.length; f < j; f++) {
				i.projections[g[f]] = !0
			}
		},
		write_wmc_Layer : function (h) {
			var g = OpenLayers.Format.WMC.v1.prototype.write_wmc_Layer.apply(this, [h]);
			if (h.srs) {
				var f = [],
				e;
				for (e in h.srs) {
					f.push(e)
				}
				g.appendChild(this.createElementDefaultNS("SRS", f.join(" ")))
			}
			g.appendChild(this.write_wmc_FormatList(h));
			g.appendChild(this.write_wmc_StyleList(h));
			h.dimensions && g.appendChild(this.write_wmc_DimensionList(h));
			g.appendChild(this.write_wmc_LayerExtension(h))
		},
		CLASS_NAME : "OpenLayers.Format.WMC.v1_0_0"
	});
OpenLayers.Popup.Framed = OpenLayers.Class(OpenLayers.Popup.Anchored, {
		imageSrc : null,
		imageSize : null,
		isAlphaImage : !1,
		positionBlocks : null,
		blocks : null,
		fixedRelativePosition : !1,
		initialize : function (l, k, j, i, h, n, m) {
			OpenLayers.Popup.Anchored.prototype.initialize.apply(this, arguments);
			this.fixedRelativePosition && (this.updateRelativePosition(), this.calculateRelativePosition = function () {
				return this.relativePosition
			});
			this.contentDiv.style.position = "absolute";
			this.contentDiv.style.zIndex = 1;
			n && (this.closeDiv.style.zIndex = 1);
			this.groupDiv.style.position = "absolute";
			this.groupDiv.style.top = "0px";
			this.groupDiv.style.left = "0px";
			this.groupDiv.style.height = "100%";
			this.groupDiv.style.width = "100%"
		},
		destroy : function () {
			this.isAlphaImage = this.imageSize = this.imageSrc = null;
			this.fixedRelativePosition = !1;
			this.positionBlocks = null;
			for (var d = 0; d < this.blocks.length; d++) {
				var c = this.blocks[d];
				c.image && c.div.removeChild(c.image);
				c.image = null;
				c.div && this.groupDiv.removeChild(c.div);
				c.div = null
			}
			this.blocks = null;
			OpenLayers.Popup.Anchored.prototype.destroy.apply(this, arguments)
		},
		setBackgroundColor : function () {},
		setBorder : function () {},
		setOpacity : function () {},
		setSize : function (b) {
			OpenLayers.Popup.Anchored.prototype.setSize.apply(this, arguments);
			this.updateBlocks()
		},
		updateRelativePosition : function () {
			this.padding = this.positionBlocks[this.relativePosition].padding;
			if (this.closeDiv) {
				var b = this.getContentDivPadding();
				this.closeDiv.style.right = b.right + this.padding.right + "px";
				this.closeDiv.style.top = b.top + this.padding.top + "px"
			}
			this.updateBlocks()
		},
		calculateNewPx : function (d) {
			var c = OpenLayers.Popup.Anchored.prototype.calculateNewPx.apply(this, arguments);
			return c = c.offset(this.positionBlocks[this.relativePosition].offset)
		},
		createBlocks : function () {
			this.blocks = [];
			var d = null,
			f;
			for (f in this.positionBlocks) {
				d = f;
				break
			}
			d = this.positionBlocks[d];
			for (f = 0; f < d.blocks.length; f++) {
				var e = {};
				this.blocks.push(e);
				e.div = OpenLayers.Util.createDiv(this.id + "_FrameDecorationDiv_" + f, null, null, null, "absolute", null, "hidden", null);
				e.image = (this.isAlphaImage ? OpenLayers.Util.createAlphaImageDiv : OpenLayers.Util.createImage)(this.id + "_FrameDecorationImg_" + f, null, this.imageSize, this.imageSrc, "absolute", null, null, null);
				e.div.appendChild(e.image);
				this.groupDiv.appendChild(e.div)
			}
		},
		updateBlocks : function () {
			this.blocks || this.createBlocks();
			if (this.size && this.relativePosition) {
				for (var l = this.positionBlocks[this.relativePosition], i = 0; i < l.blocks.length; i++) {
					var t = l.blocks[i],
					s = this.blocks[i],
					r = t.anchor.left,
					q = t.anchor.bottom,
					p = t.anchor.right,
					o = t.anchor.top,
					n = isNaN(t.size.w) ? this.size.w - (p + r) : t.size.w,
					m = isNaN(t.size.h) ? this.size.h - (q + o) : t.size.h;
					s.div.style.width = (0 > n ? 0 : n) + "px";
					s.div.style.height = (0 > m ? 0 : m) + "px";
					s.div.style.left = null != r ? r + "px" : "";
					s.div.style.bottom = null != q ? q + "px" : "";
					s.div.style.right = null != p ? p + "px" : "";
					s.div.style.top = null != o ? o + "px" : "";
					s.image.style.left = t.position.x + "px";
					s.image.style.top = t.position.y + "px"
				}
				this.contentDiv.style.left = this.padding.left + "px";
				this.contentDiv.style.top = this.padding.top + "px"
			}
		},
		CLASS_NAME : "OpenLayers.Popup.Framed"
	});
OpenLayers.Popup.FramedCloud = OpenLayers.Class(OpenLayers.Popup.Framed, {
		contentDisplayClass : "olFramedCloudPopupContent",
		autoSize : !0,
		panMapIfOutOfView : !0,
		imageSize : new OpenLayers.Size(1276, 736),
		isAlphaImage : !1,
		fixedRelativePosition : !1,
		positionBlocks : {
			tl : {
				offset : new OpenLayers.Pixel(44, 0),
				padding : new OpenLayers.Bounds(8, 40, 8, 9),
				blocks : [{
						size : new OpenLayers.Size("auto", "auto"),
						anchor : new OpenLayers.Bounds(0, 51, 22, 0),
						position : new OpenLayers.Pixel(0, 0)
					}, {
						size : new OpenLayers.Size(22, "auto"),
						anchor : new OpenLayers.Bounds(null, 50, 0, 0),
						position : new OpenLayers.Pixel(-1238, 0)
					}, {
						size : new OpenLayers.Size("auto", 19),
						anchor : new OpenLayers.Bounds(0, 32, 22, null),
						position : new OpenLayers.Pixel(0, -631)
					}, {
						size : new OpenLayers.Size(22, 18),
						anchor : new OpenLayers.Bounds(null, 32, 0, null),
						position : new OpenLayers.Pixel(-1238, -632)
					}, {
						size : new OpenLayers.Size(81, 35),
						anchor : new OpenLayers.Bounds(null, 0, 0, null),
						position : new OpenLayers.Pixel(0, -688)
					}
				]
			},
			tr : {
				offset : new OpenLayers.Pixel(-45, 0),
				padding : new OpenLayers.Bounds(8, 40, 8, 9),
				blocks : [{
						size : new OpenLayers.Size("auto", "auto"),
						anchor : new OpenLayers.Bounds(0, 51, 22, 0),
						position : new OpenLayers.Pixel(0, 0)
					}, {
						size : new OpenLayers.Size(22, "auto"),
						anchor : new OpenLayers.Bounds(null, 50, 0, 0),
						position : new OpenLayers.Pixel(-1238, 0)
					}, {
						size : new OpenLayers.Size("auto", 19),
						anchor : new OpenLayers.Bounds(0, 32, 22, null),
						position : new OpenLayers.Pixel(0, -631)
					}, {
						size : new OpenLayers.Size(22, 19),
						anchor : new OpenLayers.Bounds(null, 32, 0, null),
						position : new OpenLayers.Pixel(-1238, -631)
					}, {
						size : new OpenLayers.Size(81, 35),
						anchor : new OpenLayers.Bounds(0, 0, null, null),
						position : new OpenLayers.Pixel(-215, -687)
					}
				]
			},
			bl : {
				offset : new OpenLayers.Pixel(45, 0),
				padding : new OpenLayers.Bounds(8, 9, 8, 40),
				blocks : [{
						size : new OpenLayers.Size("auto", "auto"),
						anchor : new OpenLayers.Bounds(0, 21, 22, 32),
						position : new OpenLayers.Pixel(0, 0)
					}, {
						size : new OpenLayers.Size(22, "auto"),
						anchor : new OpenLayers.Bounds(null, 21, 0, 32),
						position : new OpenLayers.Pixel(-1238, 0)
					}, {
						size : new OpenLayers.Size("auto", 21),
						anchor : new OpenLayers.Bounds(0, 0, 22, null),
						position : new OpenLayers.Pixel(0, -629)
					}, {
						size : new OpenLayers.Size(22, 21),
						anchor : new OpenLayers.Bounds(null, 0, 0, null),
						position : new OpenLayers.Pixel(-1238, -629)
					}, {
						size : new OpenLayers.Size(81, 33),
						anchor : new OpenLayers.Bounds(null, null, 0, 0),
						position : new OpenLayers.Pixel(-101, -674)
					}
				]
			},
			br : {
				offset : new OpenLayers.Pixel(-44, 0),
				padding : new OpenLayers.Bounds(8, 9, 8, 40),
				blocks : [{
						size : new OpenLayers.Size("auto", "auto"),
						anchor : new OpenLayers.Bounds(0, 21, 22, 32),
						position : new OpenLayers.Pixel(0, 0)
					}, {
						size : new OpenLayers.Size(22, "auto"),
						anchor : new OpenLayers.Bounds(null, 21, 0, 32),
						position : new OpenLayers.Pixel(-1238, 0)
					}, {
						size : new OpenLayers.Size("auto", 21),
						anchor : new OpenLayers.Bounds(0, 0, 22, null),
						position : new OpenLayers.Pixel(0, -629)
					}, {
						size : new OpenLayers.Size(22, 21),
						anchor : new OpenLayers.Bounds(null, 0, 0, null),
						position : new OpenLayers.Pixel(-1238, -629)
					}, {
						size : new OpenLayers.Size(81, 33),
						anchor : new OpenLayers.Bounds(0, null, null, 0),
						position : new OpenLayers.Pixel(-311, -674)
					}
				]
			}
		},
		minSize : new OpenLayers.Size(105, 10),
		maxSize : new OpenLayers.Size(1200, 660),
		initialize : function (l, k, j, i, h, n, m) {
			this.imageSrc = OpenLayers.Util.getImageLocation("cloud-popup-relative.png");
			OpenLayers.Popup.Framed.prototype.initialize.apply(this, arguments);
			this.contentDiv.className = this.contentDisplayClass
		},
		CLASS_NAME : "OpenLayers.Popup.FramedCloud"
	});
OpenLayers.Tile.Image.IFrame = {
	useIFrame : null,
	draw : function () {
		if (OpenLayers.Tile.Image.prototype.shouldDraw.call(this)) {
			var d = this.layer.getURL(this.bounds),
			c = this.useIFrame;
			this.useIFrame = null !== this.maxGetUrlLength && !this.layer.async && d.length > this.maxGetUrlLength;
			d = c && !this.useIFrame;
			c = !c && this.useIFrame;
			if (d || c) {
				this.imgDiv && this.imgDiv.parentNode === this.frame && this.frame.removeChild(this.imgDiv),
				this.imgDiv = null,
				d ? (this.blankImageUrl = this._blankImageUrl, this.frame.removeChild(this.frame.firstChild)) : (this._blankImageUrl = this.blankImageUrl, this.blankImageUrl = "about:blank")
			}
		}
		return OpenLayers.Tile.Image.prototype.draw.apply(this, arguments)
	},
	getImage : function () {
		if (!0 === this.useIFrame) {
			if (!this.frame.childNodes.length) {
				var d = document.createElement("div"),
				c = d.style;
				c.position = "absolute";
				c.width = "100%";
				c.height = "100%";
				c.zIndex = 1;
				c.backgroundImage = "url(" + this._blankImageUrl + ")";
				this.frame.appendChild(d)
			}
			d = this.id + "_iFrame";
			9 > parseFloat(navigator.appVersion.split("MSIE")[1]) ? (c = document.createElement('<iframe name="' + d + '">'), c.style.backgroundColor = "#FFFFFF", c.style.filter = "chroma(color=#FFFFFF)") : (c = document.createElement("iframe"), c.style.backgroundColor = "transparent", c.name = d);
			c.scrolling = "no";
			c.marginWidth = "0px";
			c.marginHeight = "0px";
			c.frameBorder = "0";
			c.style.position = "absolute";
			c.style.width = "100%";
			c.style.height = "100%";
			1 > this.layer.opacity && OpenLayers.Util.modifyDOMElement(c, null, null, null, null, null, null, this.layer.opacity);
			this.frame.appendChild(c);
			return this.imgDiv = c
		}
		return OpenLayers.Tile.Image.prototype.getImage.apply(this, arguments)
	},
	createRequestForm : function () {
		var h = document.createElement("form");
		h.method = "POST";
		var g = this.layer.params._OLSALT,
		g = (g ? g + "_" : "") + this.bounds.toBBOX();
		h.action = OpenLayers.Util.urlAppend(this.layer.url, g);
		h.target = this.id + "_iFrame";
		this.layer.getImageSize();
		var g = OpenLayers.Util.getParameters(this.url),
		f,
		e;
		for (e in g) {
			f = document.createElement("input"),
			f.type = "hidden",
			f.name = e,
			f.value = g[e],
			h.appendChild(f)
		}
		return h
	},
	setImgSrc : function (d) {
		if (!0 === this.useIFrame) {
			if (d) {
				var c = this.createRequestForm();
				this.frame.appendChild(c);
				c.submit();
				this.frame.removeChild(c)
			} else {
				this.imgDiv.parentNode === this.frame && (this.frame.removeChild(this.imgDiv), this.imgDiv = null)
			}
		} else {
			OpenLayers.Tile.Image.prototype.setImgSrc.apply(this, arguments)
		}
	},
	onImageLoad : function () {
		OpenLayers.Tile.Image.prototype.onImageLoad.apply(this, arguments);
		!0 === this.useIFrame && (this.imgDiv.style.opacity = 1, this.frame.style.opacity = this.layer.opacity)
	},
	createBackBuffer : function () {
		var b;
		!1 === this.useIFrame && (b = OpenLayers.Tile.Image.prototype.createBackBuffer.call(this));
		return b
	}
};
OpenLayers.Format.SOSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.0.0",
		CLASS_NAME : "OpenLayers.Format.SOSCapabilities"
	});
OpenLayers.Format.SOSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.SOSCapabilities, {
		namespaces : {
			ows : "http://www.opengis.net/ows/1.1",
			sos : "http://www.opengis.net/sos/1.0",
			gml : "http://www.opengis.net/gml",
			xlink : "http://www.w3.org/1999/xlink"
		},
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b]);
			this.options = b
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			return c
		},
		readers : {
			gml : OpenLayers.Util.applyDefaults({
				name : function (d, c) {
					c.name = this.getChildValue(d)
				},
				TimePeriod : function (d, c) {
					c.timePeriod = {};
					this.readChildNodes(d, c.timePeriod)
				},
				beginPosition : function (d, c) {
					c.beginPosition = this.getChildValue(d)
				},
				endPosition : function (d, c) {
					c.endPosition = this.getChildValue(d)
				}
			}, OpenLayers.Format.GML.v3.prototype.readers.gml),
			sos : {
				Capabilities : function (d, c) {
					this.readChildNodes(d, c)
				},
				Contents : function (d, c) {
					c.contents = {};
					this.readChildNodes(d, c.contents)
				},
				ObservationOfferingList : function (d, c) {
					c.offeringList = {};
					this.readChildNodes(d, c.offeringList)
				},
				ObservationOffering : function (d, f) {
					var e = this.getAttributeNS(d, this.namespaces.gml, "id");
					f[e] = {
						procedures : [],
						observedProperties : [],
						featureOfInterestIds : [],
						responseFormats : [],
						resultModels : [],
						responseModes : []
					};
					this.readChildNodes(d, f[e])
				},
				time : function (d, c) {
					c.time = {};
					this.readChildNodes(d, c.time)
				},
				procedure : function (d, c) {
					c.procedures.push(this.getAttributeNS(d, this.namespaces.xlink, "href"))
				},
				observedProperty : function (d, c) {
					c.observedProperties.push(this.getAttributeNS(d, this.namespaces.xlink, "href"))
				},
				featureOfInterest : function (d, c) {
					c.featureOfInterestIds.push(this.getAttributeNS(d, this.namespaces.xlink, "href"))
				},
				responseFormat : function (d, c) {
					c.responseFormats.push(this.getChildValue(d))
				},
				resultModel : function (d, c) {
					c.resultModels.push(this.getChildValue(d))
				},
				responseMode : function (d, c) {
					c.responseModes.push(this.getChildValue(d))
				}
			},
			ows : OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
		},
		CLASS_NAME : "OpenLayers.Format.SOSCapabilities.v1_0_0"
	});
OpenLayers.Handler.Pinch = OpenLayers.Class(OpenLayers.Handler, {
		started : !1,
		stopDown : !1,
		pinching : !1,
		last : null,
		start : null,
		touchstart : function (d) {
			var c = !0;
			this.pinching = !1;
			OpenLayers.Event.isMultiTouch(d) ? (this.started = !0, this.last = this.start = {
					distance : this.getDistance(d.touches),
					delta : 0,
					scale : 1
				}, this.callback("start", [d, this.start]), c = !this.stopDown) : (this.started = !1, this.last = this.start = null);
			OpenLayers.Event.stop(d);
			return c
		},
		touchmove : function (d) {
			if (this.started && OpenLayers.Event.isMultiTouch(d)) {
				this.pinching = !0;
				var c = this.getPinchData(d);
				this.callback("move", [d, c]);
				this.last = c;
				OpenLayers.Event.stop(d)
			}
			return !0
		},
		touchend : function (b) {
			this.started && (this.pinching = this.started = !1, this.callback("done", [b, this.start, this.last]), this.last = this.start = null);
			return !0
		},
		activate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.pinching = !1, b = !0);
			return b
		},
		deactivate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.pinching = this.started = !1, this.last = this.start = null, b = !0);
			return b
		},
		getDistance : function (d) {
			var c = d[0];
			d = d[1];
			return Math.sqrt(Math.pow(c.clientX - d.clientX, 2) + Math.pow(c.clientY - d.clientY, 2))
		},
		getPinchData : function (b) {
			b = this.getDistance(b.touches);
			return {
				distance : b,
				delta : this.last.distance - b,
				scale : b / this.start.distance
			}
		},
		CLASS_NAME : "OpenLayers.Handler.Pinch"
	});
OpenLayers.Control.NavToolbar = OpenLayers.Class(OpenLayers.Control.Panel, {
		initialize : function (b) {
			OpenLayers.Control.Panel.prototype.initialize.apply(this, [b]);
			this.addControls([new OpenLayers.Control.Navigation, new OpenLayers.Control.ZoomBox])
		},
		draw : function () {
			var b = OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
			null === this.defaultControl && (this.defaultControl = this.controls[0]);
			return b
		},
		CLASS_NAME : "OpenLayers.Control.NavToolbar"
	});
OpenLayers.Strategy.Refresh = OpenLayers.Class(OpenLayers.Strategy, {
		force : !1,
		interval : 0,
		timer : null,
		activate : function () {
			var b = OpenLayers.Strategy.prototype.activate.call(this);
			b && (!0 === this.layer.visibility && this.start(), this.layer.events.on({
					visibilitychanged : this.reset,
					scope : this
				}));
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Strategy.prototype.deactivate.call(this);
			b && this.stop();
			return b
		},
		reset : function () {
			!0 === this.layer.visibility ? this.start() : this.stop()
		},
		start : function () {
			this.interval && ("number" === typeof this.interval && 0 < this.interval) && (this.timer = window.setInterval(OpenLayers.Function.bind(this.refresh, this), this.interval))
		},
		refresh : function () {
			this.layer && (this.layer.refresh && "function" == typeof this.layer.refresh) && this.layer.refresh({
				force : this.force
			})
		},
		stop : function () {
			null !== this.timer && (window.clearInterval(this.timer), this.timer = null)
		},
		CLASS_NAME : "OpenLayers.Strategy.Refresh"
	});
OpenLayers.Layer.ArcGIS93Rest = OpenLayers.Class(OpenLayers.Layer.Grid, {
		DEFAULT_PARAMS : {
			format : "png"
		},
		isBaseLayer : !0,
		initialize : function (i, h, g, f) {
			var j = [];
			g = OpenLayers.Util.upperCaseObject(g);
			j.push(i, h, g, f);
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, j);
			OpenLayers.Util.applyDefaults(this.params, OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS));
			if (this.params.TRANSPARENT && "true" == this.params.TRANSPARENT.toString().toLowerCase()) {
				if (null == f || !f.isBaseLayer) {
					this.isBaseLayer = !1
				}
				"jpg" == this.params.FORMAT && (this.params.FORMAT = OpenLayers.Util.alphaHack() ? "gif" : "png")
			}
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.ArcGIS93Rest(this.name, this.url, this.params, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getURL : function (h) {
			h = this.adjustBounds(h);
			var g = this.projection.getCode().split(":"),
			g = g[g.length - 1],
			f = this.getImageSize();
			h = {
				BBOX : h.toBBOX(),
				SIZE : f.w + "," + f.h,
				F : "image",
				BBOXSR : g,
				IMAGESR : g
			};
			if (this.layerDefs) {
				var g = [],
				e;
				for (e in this.layerDefs) {
					this.layerDefs.hasOwnProperty(e) && this.layerDefs[e] && (g.push(e), g.push(":"), g.push(this.layerDefs[e]), g.push(";"))
				}
				0 < g.length && (h.LAYERDEFS = g.join(""))
			}
			return this.getFullRequestString(h)
		},
		setLayerFilter : function (d, c) {
			this.layerDefs || (this.layerDefs = {});
			c ? this.layerDefs[d] = c : delete this.layerDefs[d]
		},
		clearLayerFilter : function (b) {
			b ? delete this.layerDefs[b] : delete this.layerDefs
		},
		mergeNewParams : function (b) {
			b = [OpenLayers.Util.upperCaseObject(b)];
			return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, b)
		},
		CLASS_NAME : "OpenLayers.Layer.ArcGIS93Rest"
	});
OpenLayers.Format.WKT = OpenLayers.Class(OpenLayers.Format, {
		initialize : function (b) {
			this.regExes = {
				typeStr : /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
				spaces : /\s+/,
				parenComma : /\)\s*,\s*\(/,
				doubleParenComma : /\)\s*\)\s*,\s*\(\s*\(/,
				trimParens : /^\s*\(?(.*?)\)?\s*$/
			};
			OpenLayers.Format.prototype.initialize.apply(this, [b])
		},
		read : function (d) {
			var f,
			e;
			d = d.replace(/[\n\r]/g, " ");
			if (e = this.regExes.typeStr.exec(d)) {
				if (d = e[1].toLowerCase(), e = e[2], this.parse[d] && (f = this.parse[d].apply(this, [e])), this.internalProjection && this.externalProjection) {
					if (f && "OpenLayers.Feature.Vector" == f.CLASS_NAME) {
						f.geometry.transform(this.externalProjection, this.internalProjection)
					} else {
						if (f && "geometrycollection" != d && "object" == typeof f) {
							d = 0;
							for (e = f.length; d < e; d++) {
								f[d].geometry.transform(this.externalProjection, this.internalProjection)
							}
						}
					}
				}
			}
			return f
		},
		write : function (j) {
			var i,
			h;
			j.constructor == Array ? h = !0 : (j = [j], h = !1);
			var g = [];
			h && g.push("GEOMETRYCOLLECTION(");
			for (var l = 0, k = j.length; l < k; ++l) {
				h && 0 < l && g.push(","),
				i = j[l].geometry,
				g.push(this.extractGeometry(i))
			}
			h && g.push(")");
			return g.join("")
		},
		extractGeometry : function (d) {
			var c = d.CLASS_NAME.split(".")[2].toLowerCase();
			if (!this.extract[c]) {
				return null
			}
			this.internalProjection && this.externalProjection && (d = d.clone(), d.transform(this.internalProjection, this.externalProjection));
			return ("collection" == c ? "GEOMETRYCOLLECTION" : c.toUpperCase()) + "(" + this.extract[c].apply(this, [d]) + ")"
		},
		extract : {
			point : function (b) {
				return b.x + " " + b.y
			},
			multipoint : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push("(" + this.extract.point.apply(this, [h.components[f]]) + ")")
				}
				return g.join(",")
			},
			linestring : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push(this.extract.point.apply(this, [h.components[f]]))
				}
				return g.join(",")
			},
			multilinestring : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push("(" + this.extract.linestring.apply(this, [h.components[f]]) + ")")
				}
				return g.join(",")
			},
			polygon : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push("(" + this.extract.linestring.apply(this, [h.components[f]]) + ")")
				}
				return g.join(",")
			},
			multipolygon : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push("(" + this.extract.polygon.apply(this, [h.components[f]]) + ")")
				}
				return g.join(",")
			},
			collection : function (h) {
				for (var g = [], f = 0, e = h.components.length; f < e; ++f) {
					g.push(this.extractGeometry.apply(this, [h.components[f]]))
				}
				return g.join(",")
			}
		},
		parse : {
			point : function (b) {
				b = OpenLayers.String.trim(b).split(this.regExes.spaces);
				return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(b[0], b[1]))
			},
			multipoint : function (i) {
				for (var h = OpenLayers.String.trim(i).split(","), g = [], f = 0, j = h.length; f < j; ++f) {
					i = h[f].replace(this.regExes.trimParens, "$1"),
					g.push(this.parse.point.apply(this, [i]).geometry)
				}
				return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiPoint(g))
			},
			linestring : function (h) {
				h = OpenLayers.String.trim(h).split(",");
				for (var g = [], f = 0, e = h.length; f < e; ++f) {
					g.push(this.parse.point.apply(this, [h[f]]).geometry)
				}
				return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(g))
			},
			multilinestring : function (i) {
				for (var h = OpenLayers.String.trim(i).split(this.regExes.parenComma), g = [], f = 0, j = h.length; f < j; ++f) {
					i = h[f].replace(this.regExes.trimParens, "$1"),
					g.push(this.parse.linestring.apply(this, [i]).geometry)
				}
				return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiLineString(g))
			},
			polygon : function (i) {
				var h;
				i = OpenLayers.String.trim(i).split(this.regExes.parenComma);
				for (var g = [], f = 0, j = i.length; f < j; ++f) {
					h = i[f].replace(this.regExes.trimParens, "$1"),
					h = this.parse.linestring.apply(this, [h]).geometry,
					h = new OpenLayers.Geometry.LinearRing(h.components),
					g.push(h)
				}
				return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon(g))
			},
			multipolygon : function (i) {
				for (var h = OpenLayers.String.trim(i).split(this.regExes.doubleParenComma), g = [], f = 0, j = h.length; f < j; ++f) {
					i = h[f].replace(this.regExes.trimParens, "$1"),
					g.push(this.parse.polygon.apply(this, [i]).geometry)
				}
				return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiPolygon(g))
			},
			geometrycollection : function (h) {
				h = h.replace(/,\s*([A-Za-z])/g, "|$1");
				h = OpenLayers.String.trim(h).split("|");
				for (var g = [], f = 0, e = h.length; f < e; ++f) {
					g.push(OpenLayers.Format.WKT.prototype.read.apply(this, [h[f]]))
				}
				return g
			}
		},
		CLASS_NAME : "OpenLayers.Format.WKT"
	});
OpenLayers.Handler.Hover = OpenLayers.Class(OpenLayers.Handler, {
		delay : 500,
		pixelTolerance : null,
		stopMove : !1,
		px : null,
		timerId : null,
		mousemove : function (b) {
			this.passesTolerance(b.xy) && (this.clearTimer(), this.callback("move", [b]), this.px = b.xy, b = OpenLayers.Util.extend({}, b), this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall, this, b), this.delay));
			return !this.stopMove
		},
		mouseout : function (b) {
			OpenLayers.Util.mouseLeft(b, this.map.viewPortDiv) && (this.clearTimer(), this.callback("move", [b]));
			return !0
		},
		passesTolerance : function (d) {
			var c = !0;
			this.pixelTolerance && this.px && Math.sqrt(Math.pow(this.px.x - d.x, 2) + Math.pow(this.px.y - d.y, 2)) < this.pixelTolerance && (c = !1);
			return c
		},
		clearTimer : function () {
			null != this.timerId && (window.clearTimeout(this.timerId), this.timerId = null)
		},
		delayedCall : function (b) {
			this.callback("pause", [b])
		},
		deactivate : function () {
			var b = !1;
			OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.clearTimer(), b = !0);
			return b
		},
		CLASS_NAME : "OpenLayers.Handler.Hover"
	});
OpenLayers.Control.GetFeature = OpenLayers.Class(OpenLayers.Control, {
		protocol : null,
		multipleKey : null,
		toggleKey : null,
		modifiers : null,
		multiple : !1,
		click : !0,
		single : !0,
		clickout : !0,
		toggle : !1,
		clickTolerance : 5,
		hover : !1,
		box : !1,
		maxFeatures : 10,
		features : null,
		hoverFeature : null,
		handlerOptions : null,
		handlers : null,
		hoverResponse : null,
		filterType : OpenLayers.Filter.Spatial.BBOX,
		initialize : function (b) {
			b.handlerOptions = b.handlerOptions || {};
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.features = {};
			this.handlers = {};
			this.click && (this.handlers.click = new OpenLayers.Handler.Click(this, {
						click : this.selectClick
					}, this.handlerOptions.click || {}));
			this.box && (this.handlers.box = new OpenLayers.Handler.Box(this, {
						done : this.selectBox
					}, OpenLayers.Util.extend(this.handlerOptions.box, {
							boxDivClassName : "olHandlerBoxSelectFeature"
						})));
			this.hover && (this.handlers.hover = new OpenLayers.Handler.Hover(this, {
						move : this.cancelHover,
						pause : this.selectHover
					}, OpenLayers.Util.extend(this.handlerOptions.hover, {
							delay : 250,
							pixelTolerance : 2
						})))
		},
		activate : function () {
			if (!this.active) {
				for (var b in this.handlers) {
					this.handlers[b].activate()
				}
			}
			return OpenLayers.Control.prototype.activate.apply(this, arguments)
		},
		deactivate : function () {
			if (this.active) {
				for (var b in this.handlers) {
					this.handlers[b].deactivate()
				}
			}
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
		},
		selectClick : function (d) {
			var c = this.pixelToBounds(d.xy);
			this.setModifiers(d);
			this.request(c, {
				single : this.single
			})
		},
		selectBox : function (d) {
			var c;
			if (d instanceof OpenLayers.Bounds) {
				c = this.map.getLonLatFromPixel({
						x : d.left,
						y : d.bottom
					}),
				d = this.map.getLonLatFromPixel({
						x : d.right,
						y : d.top
					}),
				c = new OpenLayers.Bounds(c.lon, c.lat, d.lon, d.lat)
			} else {
				if (this.click) {
					return
				}
				c = this.pixelToBounds(d)
			}
			this.setModifiers(this.handlers.box.dragHandler.evt);
			this.request(c)
		},
		selectHover : function (b) {
			b = this.pixelToBounds(b.xy);
			this.request(b, {
				single : !0,
				hover : !0
			})
		},
		cancelHover : function () {
			this.hoverResponse && (this.protocol.abort(this.hoverResponse), this.hoverResponse = null, OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait"))
		},
		request : function (d, f) {
			f = f || {};
			var e = new OpenLayers.Filter.Spatial({
					type : this.filterType,
					value : d
				});
			OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
			e = this.protocol.read({
					maxFeatures : !0 == f.single ? this.maxFeatures : void 0,
					filter : e,
					callback : function (a) {
						a.success() && (a.features.length ? !0 == f.single ? this.selectBestFeature(a.features, d.getCenterLonLat(), f) : this.select(a.features) : f.hover ? this.hoverSelect() : (this.events.triggerEvent("clickout"), this.clickout && this.unselectAll()));
						OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait")
					},
					scope : this
				});
			!0 == f.hover && (this.hoverResponse = e)
		},
		selectBestFeature : function (o, n, m) {
			m = m || {};
			if (o.length) {
				n = new OpenLayers.Geometry.Point(n.lon, n.lat);
				for (var l, k, j, i = Number.MAX_VALUE, p = 0; p < o.length && !(l = o[p], l.geometry && (j = n.distanceTo(l.geometry, {
									edge : !1
								}), j < i && (i = j, k = l, 0 == i))); ++p) {}

				!0 == m.hover ? this.hoverSelect(k) : this.select(k || o)
			}
		},
		setModifiers : function (b) {
			this.modifiers = {
				multiple : this.multiple || this.multipleKey && b[this.multipleKey],
				toggle : this.toggle || this.toggleKey && b[this.toggleKey]
			}
		},
		select : function (j) {
			!this.modifiers.multiple && !this.modifiers.toggle && this.unselectAll();
			OpenLayers.Util.isArray(j) || (j = [j]);
			var i = this.events.triggerEvent("beforefeaturesselected", {
					features : j
				});
			if (!1 !== i) {
				for (var h = [], g, l = 0, k = j.length; l < k; ++l) {
					g = j[l],
					this.features[g.fid || g.id] ? this.modifiers.toggle && this.unselect(this.features[g.fid || g.id]) : (i = this.events.triggerEvent("beforefeatureselected", {
								feature : g
							}), !1 !== i && (this.features[g.fid || g.id] = g, h.push(g), this.events.triggerEvent("featureselected", {
								feature : g
							})))
				}
				this.events.triggerEvent("featuresselected", {
					features : h
				})
			}
		},
		hoverSelect : function (d) {
			var f = d ? d.fid || d.id : null,
			e = this.hoverFeature ? this.hoverFeature.fid || this.hoverFeature.id : null;
			e && e != f && (this.events.triggerEvent("outfeature", {
					feature : this.hoverFeature
				}), this.hoverFeature = null);
			f && f != e && (this.events.triggerEvent("hoverfeature", {
					feature : d
				}), this.hoverFeature = d)
		},
		unselect : function (b) {
			delete this.features[b.fid || b.id];
			this.events.triggerEvent("featureunselected", {
				feature : b
			})
		},
		unselectAll : function () {
			for (var b in this.features) {
				this.unselect(this.features[b])
			}
		},
		setMap : function (d) {
			for (var c in this.handlers) {
				this.handlers[c].setMap(d)
			}
			OpenLayers.Control.prototype.setMap.apply(this, arguments)
		},
		pixelToBounds : function (d) {
			var c = d.add(-this.clickTolerance / 2, this.clickTolerance / 2);
			d = d.add(this.clickTolerance / 2, -this.clickTolerance / 2);
			c = this.map.getLonLatFromPixel(c);
			d = this.map.getLonLatFromPixel(d);
			return new OpenLayers.Bounds(c.lon, c.lat, d.lon, d.lat)
		},
		CLASS_NAME : "OpenLayers.Control.GetFeature"
	});
OpenLayers.Format.QueryStringFilter = function () {
	var b = {};
	b[OpenLayers.Filter.Comparison.EQUAL_TO] = "eq";
	b[OpenLayers.Filter.Comparison.NOT_EQUAL_TO] = "ne";
	b[OpenLayers.Filter.Comparison.LESS_THAN] = "lt";
	b[OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO] = "lte";
	b[OpenLayers.Filter.Comparison.GREATER_THAN] = "gt";
	b[OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO] = "gte";
	b[OpenLayers.Filter.Comparison.LIKE] = "ilike";
	return OpenLayers.Class(OpenLayers.Format, {
		wildcarded : !1,
		srsInBBOX : !1,
		write : function (a, h) {
			h = h || {};
			var g = a.CLASS_NAME,
			g = g.substring(g.lastIndexOf(".") + 1);
			switch (g) {
			case "Spatial":
				switch (a.type) {
				case OpenLayers.Filter.Spatial.BBOX:
					h.bbox = a.value.toArray();
					this.srsInBBOX && a.projection && h.bbox.push(a.projection.getCode());
					break;
				case OpenLayers.Filter.Spatial.DWITHIN:
					h.tolerance = a.distance;
				case OpenLayers.Filter.Spatial.WITHIN:
					h.lon = a.value.x;
					h.lat = a.value.y;
					break;
				default:
					OpenLayers.Console.warn("Unknown spatial filter type " + a.type)
				}
				break;
			case "Comparison":
				g = b[a.type];
				if (void 0 !== g) {
					var f = a.value;
					a.type == OpenLayers.Filter.Comparison.LIKE && (f = f.replace(/%/g, "\\%"), f = f.replace(/\\\\\.(\*)?/g, function (d, c) {
								return c ? d : "\\\\_"
							}), f = f.replace(/\\\\\.\*/g, "\\\\%"), f = f.replace(/(\\)?\.(\*)?/g, function (d, c, e) {
								return c || e ? d : "_"
							}), f = f.replace(/(\\)?\.\*/g, function (d, c) {
								return c ? d : "%"
							}), f = f.replace(/\\\./g, "."), f = f.replace(/(\\)?\\\*/g, function (d, c) {
								return c ? d : "*"
							}), this.wildcarded && (f = "%" + f + "%"));
					h[a.property + "__" + g] = f;
					h.queryable = h.queryable || [];
					h.queryable.push(a.property)
				} else {
					OpenLayers.Console.warn("Unknown comparison filter type " + a.type)
				}
				break;
			case "Logical":
				if (a.type === OpenLayers.Filter.Logical.AND) {
					g = 0;
					for (f = a.filters.length; g < f; g++) {
						h = this.write(a.filters[g], h)
					}
				} else {
					OpenLayers.Console.warn("Unsupported logical filter type " + a.type)
				}
				break;
			default:
				OpenLayers.Console.warn("Unknown filter type " + g)
			}
			return h
		},
		CLASS_NAME : "OpenLayers.Format.QueryStringFilter"
	})
}
();
OpenLayers.Control.MousePosition = OpenLayers.Class(OpenLayers.Control, {
		autoActivate : !0,
		element : null,
		prefix : "",
		separator : ", ",
		suffix : "",
		numDigits : 5,
		granularity : 10,
		emptyString : null,
		lastXy : null,
		displayProjection : null,
		destroy : function () {
			this.deactivate();
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		activate : function () {
			return OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.map.events.register("mousemove", this, this.redraw), this.map.events.register("mouseout", this, this.reset), this.redraw(), !0) : !1
		},
		deactivate : function () {
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments) ? (this.map.events.unregister("mousemove", this, this.redraw), this.map.events.unregister("mouseout", this, this.reset), this.element.innerHTML = "", !0) : !1
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			this.element || (this.div.left = "", this.div.top = "", this.element = this.div);
			return this.div
		},
		redraw : function (d) {
			var c;
			if (null == d) {
				this.reset()
			} else {
				if (null == this.lastXy || Math.abs(d.xy.x - this.lastXy.x) > this.granularity || Math.abs(d.xy.y - this.lastXy.y) > this.granularity) {
					this.lastXy = d.xy
				} else {
					if (c = this.map.getLonLatFromPixel(d.xy)) {
						this.displayProjection && c.transform(this.map.getProjectionObject(), this.displayProjection),
						this.lastXy = d.xy,
						d = this.formatOutput(c),
						d != this.element.innerHTML && (this.element.innerHTML = d)
					}
				}
			}
		},
		reset : function () {
			null != this.emptyString && (this.element.innerHTML = this.emptyString)
		},
		formatOutput : function (d) {
			var c = parseInt(this.numDigits);
			return this.prefix + d.lon.toFixed(c) + this.separator + d.lat.toFixed(c) + this.suffix
		},
		CLASS_NAME : "OpenLayers.Control.MousePosition"
	});
OpenLayers.Control.Geolocate = OpenLayers.Class(OpenLayers.Control, {
		geolocation : navigator.geolocation,
		bind : !0,
		watch : !1,
		geolocationOptions : null,
		destroy : function () {
			this.deactivate();
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		activate : function () {
			return !this.geolocation ? (this.events.triggerEvent("locationuncapable"), !1) : OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.watch ? this.watchId = this.geolocation.watchPosition(OpenLayers.Function.bind(this.geolocate, this), OpenLayers.Function.bind(this.failure, this), this.geolocationOptions) : this.getCurrentLocation(), !0) : !1
		},
		deactivate : function () {
			this.active && null !== this.watchId && this.geolocation.clearWatch(this.watchId);
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
		},
		geolocate : function (d) {
			var c = (new OpenLayers.LonLat(d.coords.longitude, d.coords.latitude)).transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject());
			this.bind && this.map.setCenter(c);
			this.events.triggerEvent("locationupdated", {
				position : d,
				point : new OpenLayers.Geometry.Point(c.lon, c.lat)
			})
		},
		getCurrentLocation : function () {
			if (!this.active || this.watch) {
				return !1
			}
			this.geolocation.getCurrentPosition(OpenLayers.Function.bind(this.geolocate, this), OpenLayers.Function.bind(this.failure, this), this.geolocationOptions);
			return !0
		},
		failure : function (b) {
			this.events.triggerEvent("locationfailed", {
				error : b
			})
		},
		CLASS_NAME : "OpenLayers.Control.Geolocate"
	});
OpenLayers.Tile.UTFGrid = OpenLayers.Class(OpenLayers.Tile, {
		url : null,
		utfgridResolution : 2,
		json : null,
		format : null,
		destroy : function () {
			this.clear();
			OpenLayers.Tile.prototype.destroy.apply(this, arguments)
		},
		draw : function () {
			var d = OpenLayers.Tile.prototype.draw.apply(this, arguments);
			if (d) {
				if (this.isLoading ? (this.abortLoading(), this.events.triggerEvent("reload")) : (this.isLoading = !0, this.events.triggerEvent("loadstart")), this.url = this.layer.getURL(this.bounds), this.layer.useJSONP) {
					var c = new OpenLayers.Protocol.Script({
							url : this.url,
							callback : function (a) {
								this.isLoading = !1;
								this.events.triggerEvent("loadend");
								this.json = a.data
							},
							scope : this
						});
					c.read();
					this.request = c
				} else {
					this.request = OpenLayers.Request.GET({
							url : this.url,
							callback : function (a) {
								this.isLoading = !1;
								this.events.triggerEvent("loadend");
								200 === a.status && this.parseData(a.responseText)
							},
							scope : this
						})
				}
			} else {
				this.unload()
			}
			return d
		},
		abortLoading : function () {
			this.request && (this.request.abort(), delete this.request);
			this.isLoading = !1
		},
		getFeatureInfo : function (h, g) {
			var f = null;
			if (this.json) {
				var e = this.getFeatureId(h, g);
				null !== e && (f = {
						id : e,
						data : this.json.data[e]
					})
			}
			return f
		},
		getFeatureId : function (i, h) {
			var g = null;
			if (this.json) {
				var f = this.utfgridResolution,
				f = this.json.grid[Math.floor(h / f)].charCodeAt(Math.floor(i / f)),
				f = this.indexFromCharCode(f),
				j = this.json.keys;
				!isNaN(f) && f in j && (g = j[f])
			}
			return g
		},
		indexFromCharCode : function (b) {
			93 <= b && b--;
			35 <= b && b--;
			return b - 32
		},
		parseData : function (b) {
			this.format || (this.format = new OpenLayers.Format.JSON);
			this.json = this.format.read(b)
		},
		clear : function () {
			this.json = null
		},
		CLASS_NAME : "OpenLayers.Tile.UTFGrid"
	});
OpenLayers.Control.NavigationHistory = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_TOGGLE,
		previous : null,
		previousOptions : null,
		next : null,
		nextOptions : null,
		limit : 50,
		autoActivate : !0,
		clearOnDeactivate : !1,
		registry : null,
		nextStack : null,
		previousStack : null,
		listeners : null,
		restoring : !1,
		initialize : function (b) {
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.registry = OpenLayers.Util.extend({
					moveend : this.getState
				}, this.registry);
			b = {
				trigger : OpenLayers.Function.bind(this.previousTrigger, this),
				displayClass : this.displayClass + " " + this.displayClass + "Previous"
			};
			OpenLayers.Util.extend(b, this.previousOptions);
			this.previous = new OpenLayers.Control.Button(b);
			b = {
				trigger : OpenLayers.Function.bind(this.nextTrigger, this),
				displayClass : this.displayClass + " " + this.displayClass + "Next"
			};
			OpenLayers.Util.extend(b, this.nextOptions);
			this.next = new OpenLayers.Control.Button(b);
			this.clear()
		},
		onPreviousChange : function (b) {
			b && !this.previous.active ? this.previous.activate() : !b && this.previous.active && this.previous.deactivate()
		},
		onNextChange : function (b) {
			b && !this.next.active ? this.next.activate() : !b && this.next.active && this.next.deactivate()
		},
		destroy : function () {
			OpenLayers.Control.prototype.destroy.apply(this);
			this.previous.destroy();
			this.next.destroy();
			this.deactivate();
			for (var b in this) {
				this[b] = null
			}
		},
		setMap : function (b) {
			this.map = b;
			this.next.setMap(b);
			this.previous.setMap(b)
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			this.next.draw();
			this.previous.draw()
		},
		previousTrigger : function () {
			var d = this.previousStack.shift(),
			c = this.previousStack.shift();
			void 0 != c ? (this.nextStack.unshift(d), this.previousStack.unshift(c), this.restoring = !0, this.restore(c), this.restoring = !1, this.onNextChange(this.nextStack[0], this.nextStack.length), this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1)) : this.previousStack.unshift(d);
			return c
		},
		nextTrigger : function () {
			var b = this.nextStack.shift();
			void 0 != b && (this.previousStack.unshift(b), this.restoring = !0, this.restore(b), this.restoring = !1, this.onNextChange(this.nextStack[0], this.nextStack.length), this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1));
			return b
		},
		clear : function () {
			this.previousStack = [];
			this.previous.deactivate();
			this.nextStack = [];
			this.next.deactivate()
		},
		getState : function () {
			return {
				center : this.map.getCenter(),
				resolution : this.map.getResolution(),
				projection : this.map.getProjectionObject(),
				units : this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units
			}
		},
		restore : function (h) {
			var g,
			f;
			if (this.map.getProjectionObject() == h.projection) {
				f = this.map.getZoomForResolution(h.resolution),
				g = h.center
			} else {
				g = h.center.clone();
				g.transform(h.projection, this.map.getProjectionObject());
				f = h.units;
				var e = this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units;
				f = this.map.getZoomForResolution((f && e ? OpenLayers.INCHES_PER_UNIT[f] / OpenLayers.INCHES_PER_UNIT[e] : 1) * h.resolution)
			}
			this.map.setCenter(g, f)
		},
		setListeners : function () {
			this.listeners = {};
			for (var b in this.registry) {
				this.listeners[b] = OpenLayers.Function.bind(function () {
						if (!this.restoring) {
							var a = this.registry[b].apply(this, arguments);
							this.previousStack.unshift(a);
							if (1 < this.previousStack.length) {
								this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1)
							}
							this.previousStack.length > this.limit + 1 && this.previousStack.pop();
							0 < this.nextStack.length && (this.nextStack = [], this.onNextChange(null, 0))
						}
						return !0
					}, this)
			}
		},
		activate : function () {
			var d = !1;
			if (this.map && OpenLayers.Control.prototype.activate.apply(this)) {
				null == this.listeners && this.setListeners();
				for (var c in this.listeners) {
					this.map.events.register(c, this, this.listeners[c])
				}
				d = !0;
				0 == this.previousStack.length && this.initStack()
			}
			return d
		},
		initStack : function () {
			this.map.getCenter() && this.listeners.moveend()
		},
		deactivate : function () {
			var d = !1;
			if (this.map && OpenLayers.Control.prototype.deactivate.apply(this)) {
				for (var c in this.listeners) {
					this.map.events.unregister(c, this, this.listeners[c])
				}
				this.clearOnDeactivate && this.clear();
				d = !0
			}
			return d
		},
		CLASS_NAME : "OpenLayers.Control.NavigationHistory"
	});
OpenLayers.Protocol.HTTP = OpenLayers.Class(OpenLayers.Protocol, {
		url : null,
		headers : null,
		params : null,
		callback : null,
		scope : null,
		readWithPOST : !1,
		updateWithPOST : !1,
		deleteWithPOST : !1,
		wildcarded : !1,
		srsInBBOX : !1,
		initialize : function (d) {
			d = d || {};
			this.params = {};
			this.headers = {};
			OpenLayers.Protocol.prototype.initialize.apply(this, arguments);
			if (!this.filterToParams && OpenLayers.Format.QueryStringFilter) {
				var c = new OpenLayers.Format.QueryStringFilter({
						wildcarded : this.wildcarded,
						srsInBBOX : this.srsInBBOX
					});
				this.filterToParams = function (b, a) {
					return c.write(b, a)
				}
			}
		},
		destroy : function () {
			this.headers = this.params = null;
			OpenLayers.Protocol.prototype.destroy.apply(this)
		},
		read : function (d) {
			OpenLayers.Protocol.prototype.read.apply(this, arguments);
			d = d || {};
			d.params = OpenLayers.Util.applyDefaults(d.params, this.options.params);
			d = OpenLayers.Util.applyDefaults(d, this.options);
			d.filter && this.filterToParams && (d.params = this.filterToParams(d.filter, d.params));
			var f = void 0 !== d.readWithPOST ? d.readWithPOST : this.readWithPOST,
			e = new OpenLayers.Protocol.Response({
					requestType : "read"
				});
			f ? (f = d.headers || {}, f["Content-Type"] = "application/x-www-form-urlencoded", e.priv = OpenLayers.Request.POST({
						url : d.url,
						callback : this.createCallback(this.handleRead, e, d),
						data : OpenLayers.Util.getParameterString(d.params),
						headers : f
					})) : e.priv = OpenLayers.Request.GET({
					url : d.url,
					callback : this.createCallback(this.handleRead, e, d),
					params : d.params,
					headers : d.headers
				});
			return e
		},
		handleRead : function (d, c) {
			this.handleResponse(d, c)
		},
		create : function (d, f) {
			f = OpenLayers.Util.applyDefaults(f, this.options);
			var e = new OpenLayers.Protocol.Response({
					reqFeatures : d,
					requestType : "create"
				});
			e.priv = OpenLayers.Request.POST({
					url : f.url,
					callback : this.createCallback(this.handleCreate, e, f),
					headers : f.headers,
					data : this.format.write(d)
				});
			return e
		},
		handleCreate : function (d, c) {
			this.handleResponse(d, c)
		},
		update : function (h, g) {
			g = g || {};
			var f = g.url || h.url || this.options.url + "/" + h.fid;
			g = OpenLayers.Util.applyDefaults(g, this.options);
			var e = new OpenLayers.Protocol.Response({
					reqFeatures : h,
					requestType : "update"
				});
			e.priv = OpenLayers.Request[this.updateWithPOST ? "POST" : "PUT"]({
					url : f,
					callback : this.createCallback(this.handleUpdate, e, g),
					headers : g.headers,
					data : this.format.write(h)
				});
			return e
		},
		handleUpdate : function (d, c) {
			this.handleResponse(d, c)
		},
		"delete" : function (i, h) {
			h = h || {};
			var g = h.url || i.url || this.options.url + "/" + i.fid;
			h = OpenLayers.Util.applyDefaults(h, this.options);
			var f = new OpenLayers.Protocol.Response({
					reqFeatures : i,
					requestType : "delete"
				}),
			j = this.deleteWithPOST ? "POST" : "DELETE",
			g = {
				url : g,
				callback : this.createCallback(this.handleDelete, f, h),
				headers : h.headers
			};
			this.deleteWithPOST && (g.data = this.format.write(i));
			f.priv = OpenLayers.Request[j](g);
			return f
		},
		handleDelete : function (d, c) {
			this.handleResponse(d, c)
		},
		handleResponse : function (d, f) {
			var e = d.priv;
			f.callback && (200 <= e.status && 300 > e.status ? ("delete" != d.requestType && (d.features = this.parseFeatures(e)), d.code = OpenLayers.Protocol.Response.SUCCESS) : d.code = OpenLayers.Protocol.Response.FAILURE, f.callback.call(f.scope, d))
		},
		parseFeatures : function (d) {
			var c = d.responseXML;
			if (!c || !c.documentElement) {
				c = d.responseText
			}
			return !c || 0 >= c.length ? null : this.format.read(c)
		},
		commit : function (C, B) {
			function A(c) {
				for (var b = c.features ? c.features.length : 0, a = Array(b), d = 0; d < b; ++d) {
					a[d] = c.features[d].fid
				}
				x.insertIds = a;
				y.apply(this, [c])
			}
			function y(a) {
				this.callUserCallback(a, B);
				z = z && a.success();
				v++;
				v >= D && B.callback && (x.code = z ? OpenLayers.Protocol.Response.SUCCESS : OpenLayers.Protocol.Response.FAILURE, B.callback.apply(B.scope, [x]))
			}
			B = OpenLayers.Util.applyDefaults(B, this.options);
			var w = [],
			v = 0,
			u = {};
			u[OpenLayers.State.INSERT] = [];
			u[OpenLayers.State.UPDATE] = [];
			u[OpenLayers.State.DELETE] = [];
			for (var t, s, r = [], o = 0, i = C.length; o < i; ++o) {
				if (t = C[o], s = u[t.state]) {
					s.push(t),
					r.push(t)
				}
			}
			var D = (0 < u[OpenLayers.State.INSERT].length ? 1 : 0) + u[OpenLayers.State.UPDATE].length + u[OpenLayers.State.DELETE].length,
			z = !0,
			x = new OpenLayers.Protocol.Response({
					reqFeatures : r
				});
			t = u[OpenLayers.State.INSERT];
			0 < t.length && w.push(this.create(t, OpenLayers.Util.applyDefaults({
						callback : A,
						scope : this
					}, B.create)));
			t = u[OpenLayers.State.UPDATE];
			for (o = t.length - 1; 0 <= o; --o) {
				w.push(this.update(t[o], OpenLayers.Util.applyDefaults({
							callback : y,
							scope : this
						}, B.update)))
			}
			t = u[OpenLayers.State.DELETE];
			for (o = t.length - 1; 0 <= o; --o) {
				w.push(this["delete"](t[o], OpenLayers.Util.applyDefaults({
							callback : y,
							scope : this
						}, B["delete"])))
			}
			return w
		},
		abort : function (b) {
			b && b.priv.abort()
		},
		callUserCallback : function (d, f) {
			var e = f[d.requestType];
			e && e.callback && e.callback.call(e.scope, d)
		},
		CLASS_NAME : "OpenLayers.Protocol.HTTP"
	});
OpenLayers.Strategy.Cluster = OpenLayers.Class(OpenLayers.Strategy, {
		distance : 20,
		threshold : null,
		features : null,
		clusters : null,
		clustering : !1,
		resolution : null,
		activate : function () {
			var b = OpenLayers.Strategy.prototype.activate.call(this);
			if (b) {
				this.layer.events.on({
					beforefeaturesadded : this.cacheFeatures,
					moveend : this.cluster,
					scope : this
				})
			}
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Strategy.prototype.deactivate.call(this);
			b && (this.clearCache(), this.layer.events.un({
					beforefeaturesadded : this.cacheFeatures,
					moveend : this.cluster,
					scope : this
				}));
			return b
		},
		cacheFeatures : function (d) {
			var c = !0;
			this.clustering || (this.clearCache(), this.features = d.features, this.cluster(), c = !1);
			return c
		},
		clearCache : function () {
			this.features = null
		},
		cluster : function (j) {
			if ((!j || j.zoomChanged) && this.features) {
				if (j = this.layer.map.getResolution(), j != this.resolution || !this.clustersExist()) {
					this.resolution = j;
					j = [];
					for (var i, h, g, l = 0; l < this.features.length; ++l) {
						if (i = this.features[l], i.geometry) {
							h = !1;
							for (var k = j.length - 1; 0 <= k; --k) {
								if (g = j[k], this.shouldCluster(g, i)) {
									this.addToCluster(g, i);
									h = !0;
									break
								}
							}
							h || j.push(this.createCluster(this.features[l]))
						}
					}
					this.layer.removeAllFeatures();
					if (0 < j.length) {
						if (1 < this.threshold) {
							i = j.slice();
							j = [];
							l = 0;
							for (g = i.length; l < g; ++l) {
								h = i[l],
								h.attributes.count < this.threshold ? Array.prototype.push.apply(j, h.cluster) : j.push(h)
							}
						}
						this.clustering = !0;
						this.layer.addFeatures(j);
						this.clustering = !1
					}
					this.clusters = j
				}
			}
		},
		clustersExist : function () {
			var d = !1;
			if (this.clusters && 0 < this.clusters.length && this.clusters.length == this.layer.features.length) {
				for (var d = !0, c = 0; c < this.clusters.length; ++c) {
					if (this.clusters[c] != this.layer.features[c]) {
						d = !1;
						break
					}
				}
			}
			return d
		},
		shouldCluster : function (h, g) {
			var f = h.geometry.getBounds().getCenterLonLat(),
			e = g.geometry.getBounds().getCenterLonLat();
			return Math.sqrt(Math.pow(f.lon - e.lon, 2) + Math.pow(f.lat - e.lat, 2)) / this.resolution <= this.distance
		},
		addToCluster : function (d, c) {
			d.cluster.push(c);
			d.attributes.count += 1
		},
		createCluster : function (d) {
			var c = d.geometry.getBounds().getCenterLonLat(),
			c = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(c.lon, c.lat), {
					count : 1
				});
			c.cluster = [d];
			return c
		},
		CLASS_NAME : "OpenLayers.Strategy.Cluster"
	});
OpenLayers.Strategy.Filter = OpenLayers.Class(OpenLayers.Strategy, {
		filter : null,
		cache : null,
		caching : !1,
		activate : function () {
			var b = OpenLayers.Strategy.prototype.activate.apply(this, arguments);
			b && (this.cache = [], this.layer.events.on({
					beforefeaturesadded : this.handleAdd,
					beforefeaturesremoved : this.handleRemove,
					scope : this
				}));
			return b
		},
		deactivate : function () {
			this.cache = null;
			this.layer && this.layer.events && this.layer.events.un({
				beforefeaturesadded : this.handleAdd,
				beforefeaturesremoved : this.handleRemove,
				scope : this
			});
			return OpenLayers.Strategy.prototype.deactivate.apply(this, arguments)
		},
		handleAdd : function (i) {
			if (!this.caching && this.filter) {
				var h = i.features;
				i.features = [];
				for (var g, f = 0, j = h.length; f < j; ++f) {
					g = h[f],
					this.filter.evaluate(g) ? i.features.push(g) : this.cache.push(g)
				}
			}
		},
		handleRemove : function () {
			this.caching || (this.cache = [])
		},
		setFilter : function (b) {
			this.filter = b;
			b = this.cache;
			this.cache = [];
			this.handleAdd({
				features : this.layer.features
			});
			0 < this.cache.length && (this.caching = !0, this.layer.removeFeatures(this.cache.slice()), this.caching = !1);
			0 < b.length && (b = {
					features : b
				}, this.handleAdd(b), 0 < b.features.length && (this.caching = !0, this.layer.addFeatures(b.features), this.caching = !1))
		},
		CLASS_NAME : "OpenLayers.Strategy.Filter"
	});
OpenLayers.Protocol.SOS = function (d) {
	d = OpenLayers.Util.applyDefaults(d, OpenLayers.Protocol.SOS.DEFAULTS);
	var c = OpenLayers.Protocol.SOS["v" + d.version.replace(/\./g, "_")];
	if (!c) {
		throw "Unsupported SOS version: " + d.version
	}
	return new c(d)
};
OpenLayers.Protocol.SOS.DEFAULTS = {
	version : "1.0.0"
};
OpenLayers.Format.WFSDescribeFeatureType = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			xsd : "http://www.w3.org/2001/XMLSchema"
		},
		readers : {
			xsd : {
				schema : function (r, q) {
					var p = [],
					o = {};
					this.readChildNodes(r, {
						complexTypes : p,
						customTypes : o
					});
					for (var n = r.attributes, m, l, k = 0, i = n.length; k < i; ++k) {
						m = n[k],
						l = m.name,
						0 == l.indexOf("xmlns") ? this.setNamespace(l.split(":")[1] || "", m.value) : q[l] = m.value
					}
					q.featureTypes = p;
					q.targetPrefix = this.namespaceAlias[q.targetNamespace];
					k = 0;
					for (i = p.length; k < i; ++k) {
						n = p[k],
						m = o[n.typeName],
						o[n.typeName] && (n.typeName = m.name)
					}
				},
				complexType : function (d, f) {
					var e = {
						typeName : d.getAttribute("name")
					};
					this.readChildNodes(d, e);
					f.complexTypes.push(e)
				},
				complexContent : function (d, c) {
					this.readChildNodes(d, c)
				},
				extension : function (d, c) {
					this.readChildNodes(d, c)
				},
				sequence : function (d, f) {
					var e = {
						elements : []
					};
					this.readChildNodes(d, e);
					f.properties = e.elements
				},
				element : function (l, k) {
					if (k.elements) {
						for (var j = {}, i = l.attributes, h, n = 0, m = i.length; n < m; ++n) {
							h = i[n],
							j[h.name] = h.value
						}
						i = j.type;
						i || (i = {}, this.readChildNodes(l, i), j.restriction = i, j.type = i.base);
						j.localType = (i.base || i).split(":").pop();
						k.elements.push(j)
					}
					k.complexTypes && (i = l.getAttribute("type"), j = i.split(":").pop(), k.customTypes[j] = {
							name : l.getAttribute("name"),
							type : i
						})
				},
				simpleType : function (d, c) {
					this.readChildNodes(d, c)
				},
				restriction : function (d, c) {
					c.base = d.getAttribute("base");
					this.readRestriction(d, c)
				}
			}
		},
		readRestriction : function (l, k) {
			for (var j = l.childNodes, i, h, n = 0, m = j.length; n < m; ++n) {
				i = j[n],
				1 == i.nodeType && (h = i.nodeName.split(":").pop(), i = i.getAttribute("value"), k[h] ? ("string" == typeof k[h] && (k[h] = [k[h]]), k[h].push(i)) : k[h] = i)
			}
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			return c
		},
		CLASS_NAME : "OpenLayers.Format.WFSDescribeFeatureType"
	});
OpenLayers.Format.GeoRSS = OpenLayers.Class(OpenLayers.Format.XML, {
		rssns : "http://backend.userland.com/rss2",
		featureNS : "http://mapserver.gis.umn.edu/mapserver",
		georssns : "http://www.georss.org/georss",
		geons : "http://www.w3.org/2003/01/geo/wgs84_pos#",
		featureTitle : "Untitled",
		featureDescription : "No Description",
		gmlParser : null,
		xy : !1,
		createGeometryFromItem : function (o) {
			var n = this.getElementsByTagNameNS(o, this.georssns, "point"),
			m = this.getElementsByTagNameNS(o, this.geons, "lat"),
			l = this.getElementsByTagNameNS(o, this.geons, "long"),
			k = this.getElementsByTagNameNS(o, this.georssns, "line"),
			j = this.getElementsByTagNameNS(o, this.georssns, "polygon"),
			i = this.getElementsByTagNameNS(o, this.georssns, "where");
			o = this.getElementsByTagNameNS(o, this.georssns, "box");
			if (0 < n.length || 0 < m.length && 0 < l.length) {
				0 < n.length ? (m = OpenLayers.String.trim(n[0].firstChild.nodeValue).split(/\s+/), 2 != m.length && (m = OpenLayers.String.trim(n[0].firstChild.nodeValue).split(/\s*,\s*/))) : m = [parseFloat(m[0].firstChild.nodeValue), parseFloat(l[0].firstChild.nodeValue)];
				var p = new OpenLayers.Geometry.Point(m[1], m[0])
			} else {
				if (0 < k.length) {
					m = OpenLayers.String.trim(this.getChildValue(k[0])).split(/\s+/);
					l = [];
					k = 0;
					for (j = m.length; k < j; k += 2) {
						n = new OpenLayers.Geometry.Point(m[k + 1], m[k]),
						l.push(n)
					}
					p = new OpenLayers.Geometry.LineString(l)
				} else {
					if (0 < j.length) {
						m = OpenLayers.String.trim(this.getChildValue(j[0])).split(/\s+/);
						l = [];
						k = 0;
						for (j = m.length; k < j; k += 2) {
							n = new OpenLayers.Geometry.Point(m[k + 1], m[k]),
							l.push(n)
						}
						p = new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(l)])
					} else {
						0 < i.length ? (this.gmlParser || (this.gmlParser = new OpenLayers.Format.GML({
										xy : this.xy
									})), p = this.gmlParser.parseFeature(i[0]).geometry) : 0 < o.length && (m = OpenLayers.String.trim(o[0].firstChild.nodeValue).split(/\s+/), l = [], 3 < m.length && (n = new OpenLayers.Geometry.Point(m[1], m[0]), l.push(n), n = new OpenLayers.Geometry.Point(m[1], m[2]), l.push(n), n = new OpenLayers.Geometry.Point(m[3], m[2]), l.push(n), n = new OpenLayers.Geometry.Point(m[3], m[0]), l.push(n), n = new OpenLayers.Geometry.Point(m[1], m[0]), l.push(n)), p = new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(l)]))
					}
				}
			}
			p && (this.internalProjection && this.externalProjection) && p.transform(this.externalProjection, this.internalProjection);
			return p
		},
		createFeatureFromItem : function (j) {
			var i = this.createGeometryFromItem(j),
			h = this._getChildValue(j, "*", "title", this.featureTitle),
			g = this._getChildValue(j, "*", "description", this._getChildValue(j, "*", "content", this._getChildValue(j, "*", "summary", this.featureDescription))),
			l = this._getChildValue(j, "*", "link");
			if (!l) {
				try {
					l = this.getElementsByTagNameNS(j, "*", "link")[0].getAttribute("href")
				} catch (k) {
					l = null
				}
			}
			j = this._getChildValue(j, "*", "id", null);
			i = new OpenLayers.Feature.Vector(i, {
					title : h,
					description : g,
					link : l
				});
			i.fid = j;
			return i
		},
		_getChildValue : function (h, g, f, e) {
			return (h = this.getElementsByTagNameNS(h, g, f)) && h[0] && h[0].firstChild && h[0].firstChild.nodeValue ? this.getChildValue(h[0]) : void 0 == e ? "" : e
		},
		read : function (h) {
			"string" == typeof h && (h = OpenLayers.Format.XML.prototype.read.apply(this, [h]));
			var g = null,
			g = this.getElementsByTagNameNS(h, "*", "item");
			0 == g.length && (g = this.getElementsByTagNameNS(h, "*", "entry"));
			h = g.length;
			for (var f = Array(h), e = 0; e < h; e++) {
				f[e] = this.createFeatureFromItem(g[e])
			}
			return f
		},
		write : function (h) {
			var g;
			if (OpenLayers.Util.isArray(h)) {
				g = this.createElementNS(this.rssns, "rss");
				for (var f = 0, e = h.length; f < e; f++) {
					g.appendChild(this.createFeatureXML(h[f]))
				}
			} else {
				g = this.createFeatureXML(h)
			}
			return OpenLayers.Format.XML.prototype.write.apply(this, [g])
		},
		createFeatureXML : function (j) {
			var i = this.buildGeometryNode(j.geometry),
			h = this.createElementNS(this.rssns, "item"),
			g = this.createElementNS(this.rssns, "title");
			g.appendChild(this.createTextNode(j.attributes.title ? j.attributes.title : ""));
			var l = this.createElementNS(this.rssns, "description");
			l.appendChild(this.createTextNode(j.attributes.description ? j.attributes.description : ""));
			h.appendChild(g);
			h.appendChild(l);
			j.attributes.link && (g = this.createElementNS(this.rssns, "link"), g.appendChild(this.createTextNode(j.attributes.link)), h.appendChild(g));
			for (var k in j.attributes) {
				"link" == k || ("title" == k || "description" == k) || (g = this.createTextNode(j.attributes[k]), l = k, -1 != k.search(":") && (l = k.split(":")[1]), l = this.createElementNS(this.featureNS, "feature:" + l), l.appendChild(g), h.appendChild(l))
			}
			h.appendChild(i);
			return h
		},
		buildGeometryNode : function (d) {
			this.internalProjection && this.externalProjection && (d = d.clone(), d.transform(this.internalProjection, this.externalProjection));
			var c;
			if ("OpenLayers.Geometry.Polygon" == d.CLASS_NAME) {
				c = this.createElementNS(this.georssns, "georss:polygon"),
				c.appendChild(this.buildCoordinatesNode(d.components[0]))
			} else {
				if ("OpenLayers.Geometry.LineString" == d.CLASS_NAME) {
					c = this.createElementNS(this.georssns, "georss:line"),
					c.appendChild(this.buildCoordinatesNode(d))
				} else {
					if ("OpenLayers.Geometry.Point" == d.CLASS_NAME) {
						c = this.createElementNS(this.georssns, "georss:point"),
						c.appendChild(this.buildCoordinatesNode(d))
					} else {
						throw "Couldn't parse " + d.CLASS_NAME
					}
				}
			}
			return c
		},
		buildCoordinatesNode : function (h) {
			var g = null;
			h.components && (g = h.components);
			if (g) {
				h = g.length;
				for (var f = Array(h), e = 0; e < h; e++) {
					f[e] = g[e].y + " " + g[e].x
				}
				g = f.join(" ")
			} else {
				g = h.y + " " + h.x
			}
			return this.createTextNode(g)
		},
		CLASS_NAME : "OpenLayers.Format.GeoRSS"
	});
OpenLayers.Format.WPSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.0.0",
		CLASS_NAME : "OpenLayers.Format.WPSCapabilities"
	});
OpenLayers.Format.WPSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			ows : "http://www.opengis.net/ows/1.1",
			wps : "http://www.opengis.net/wps/1.0.0",
			xlink : "http://www.w3.org/1999/xlink"
		},
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			return c
		},
		readers : {
			wps : {
				Capabilities : function (d, c) {
					this.readChildNodes(d, c)
				},
				ProcessOfferings : function (d, c) {
					c.processOfferings = {};
					this.readChildNodes(d, c.processOfferings)
				},
				Process : function (d, f) {
					var e = {
						processVersion : this.getAttributeNS(d, this.namespaces.wps, "processVersion")
					};
					this.readChildNodes(d, e);
					f[e.identifier] = e
				},
				Languages : function (d, c) {
					c.languages = [];
					this.readChildNodes(d, c.languages)
				},
				Default : function (d, f) {
					var e = {
						isDefault : !0
					};
					this.readChildNodes(d, e);
					f.push(e)
				},
				Supported : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.push(e)
				}
			},
			ows : OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
		},
		CLASS_NAME : "OpenLayers.Format.WPSCapabilities.v1_0_0"
	});
OpenLayers.Control.PinchZoom = OpenLayers.Class(OpenLayers.Control, {
		type : OpenLayers.Control.TYPE_TOOL,
		containerCenter : null,
		pinchOrigin : null,
		currentCenter : null,
		autoActivate : !0,
		initialize : function (b) {
			OpenLayers.Control.prototype.initialize.apply(this, arguments);
			this.handler = new OpenLayers.Handler.Pinch(this, {
					start : this.pinchStart,
					move : this.pinchMove,
					done : this.pinchDone
				}, this.handlerOptions)
		},
		activate : function () {
			var b = OpenLayers.Control.prototype.activate.apply(this, arguments);
			b && (this.map.events.on({
					moveend : this.updateContainerCenter,
					scope : this
				}), this.updateContainerCenter());
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Control.prototype.deactivate.apply(this, arguments);
			this.map && this.map.events && this.map.events.un({
				moveend : this.updateContainerCenter,
				scope : this
			});
			return b
		},
		updateContainerCenter : function () {
			var b = this.map.layerContainerDiv;
			this.containerCenter = {
				x : parseInt(b.style.left, 10) + 50,
				y : parseInt(b.style.top, 10) + 50
			}
		},
		pinchStart : function (b) {
			this.currentCenter = this.pinchOrigin = b.xy
		},
		pinchMove : function (l, k) {
			var j = k.scale,
			i = this.containerCenter,
			h = this.pinchOrigin,
			n = l.xy,
			m = Math.round(n.x - h.x + (j - 1) * (i.x - h.x)),
			i = Math.round(n.y - h.y + (j - 1) * (i.y - h.y));
			this.applyTransform("translate(" + m + "px, " + i + "px) scale(" + j + ")");
			this.currentCenter = n
		},
		applyTransform : function (d) {
			var c = this.map.layerContainerDiv.style;
			c["-webkit-transform"] = d;
			c["-moz-transform"] = d
		},
		pinchDone : function (i, h, g) {
			this.applyTransform("");
			i = this.map.getZoomForResolution(this.map.getResolution() / g.scale, !0);
			if (i !== this.map.getZoom() || !this.currentCenter.equals(this.pinchOrigin)) {
				h = this.map.getResolutionForZoom(i);
				g = this.map.getLonLatFromPixel(this.pinchOrigin);
				var f = this.currentCenter,
				j = this.map.getSize();
				g.lon += h * (j.w / 2 - f.x);
				g.lat -= h * (j.h / 2 - f.y);
				this.map.div.clientWidth = this.map.div.clientWidth;
				this.map.setCenter(g, i)
			}
		},
		CLASS_NAME : "OpenLayers.Control.PinchZoom"
	});
OpenLayers.Control.TouchNavigation = OpenLayers.Class(OpenLayers.Control, {
		dragPan : null,
		dragPanOptions : null,
		pinchZoom : null,
		pinchZoomOptions : null,
		clickHandlerOptions : null,
		documentDrag : !1,
		autoActivate : !0,
		initialize : function (b) {
			this.handlers = {};
			OpenLayers.Control.prototype.initialize.apply(this, arguments)
		},
		destroy : function () {
			this.deactivate();
			this.dragPan && this.dragPan.destroy();
			this.dragPan = null;
			this.pinchZoom && (this.pinchZoom.destroy(), delete this.pinchZoom);
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		activate : function () {
			return OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.dragPan.activate(), this.handlers.click.activate(), this.pinchZoom.activate(), !0) : !1
		},
		deactivate : function () {
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments) ? (this.dragPan.deactivate(), this.handlers.click.deactivate(), this.pinchZoom.deactivate(), !0) : !1
		},
		draw : function () {
			var d = {
				click : this.defaultClick,
				dblclick : this.defaultDblClick
			},
			c = OpenLayers.Util.extend({
					"double" : !0,
					stopDouble : !0,
					pixelTolerance : 2
				}, this.clickHandlerOptions);
			this.handlers.click = new OpenLayers.Handler.Click(this, d, c);
			this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
						map : this.map,
						documentDrag : this.documentDrag
					}, this.dragPanOptions));
			this.dragPan.draw();
			this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({
						map : this.map
					}, this.pinchZoomOptions))
		},
		defaultClick : function (b) {
			b.lastTouches && 2 == b.lastTouches.length && this.map.zoomOut()
		},
		defaultDblClick : function (b) {
			b = this.map.getLonLatFromViewPortPx(b.xy);
			this.map.setCenter(b, this.map.zoom + 1)
		},
		CLASS_NAME : "OpenLayers.Control.TouchNavigation"
	});
OpenLayers.Style2 = OpenLayers.Class({
		id : null,
		name : null,
		title : null,
		description : null,
		layerName : null,
		isDefault : !1,
		rules : null,
		initialize : function (b) {
			OpenLayers.Util.extend(this, b);
			this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
		},
		destroy : function () {
			for (var d = 0, c = this.rules.length; d < c; d++) {
				this.rules[d].destroy()
			}
			delete this.rules
		},
		clone : function () {
			var d = OpenLayers.Util.extend({}, this);
			if (this.rules) {
				d.rules = [];
				for (var f = 0, e = this.rules.length; f < e; ++f) {
					d.rules.push(this.rules[f].clone())
				}
			}
			return new OpenLayers.Style2(d)
		},
		CLASS_NAME : "OpenLayers.Style2"
	});
OpenLayers.Format.WFS = OpenLayers.Class(OpenLayers.Format.GML, {
		layer : null,
		wfsns : "http://www.opengis.net/wfs",
		ogcns : "http://www.opengis.net/ogc",
		initialize : function (d, c) {
			OpenLayers.Format.GML.prototype.initialize.apply(this, [d]);
			this.layer = c;
			this.layer.featureNS && (this.featureNS = this.layer.featureNS);
			this.layer.options.geometry_column && (this.geometryName = this.layer.options.geometry_column);
			this.layer.options.typename && (this.featureName = this.layer.options.typename)
		},
		write : function (d) {
			var f = this.createElementNS(this.wfsns, "wfs:Transaction");
			f.setAttribute("version", "1.0.0");
			f.setAttribute("service", "WFS");
			for (var e = 0; e < d.length; e++) {
				switch (d[e].state) {
				case OpenLayers.State.INSERT:
					f.appendChild(this.insert(d[e]));
					break;
				case OpenLayers.State.UPDATE:
					f.appendChild(this.update(d[e]));
					break;
				case OpenLayers.State.DELETE:
					f.appendChild(this.remove(d[e]))
				}
			}
			return OpenLayers.Format.XML.prototype.write.apply(this, [f])
		},
		createFeatureXML : function (i) {
			var h = this.buildGeometryNode(i.geometry),
			g = this.createElementNS(this.featureNS, "feature:" + this.geometryName);
			g.appendChild(h);
			h = this.createElementNS(this.featureNS, "feature:" + this.featureName);
			h.appendChild(g);
			for (var f in i.attributes) {
				var g = this.createTextNode(i.attributes[f]),
				j = f;
				-1 != f.search(":") && (j = f.split(":")[1]);
				j = this.createElementNS(this.featureNS, "feature:" + j);
				j.appendChild(g);
				h.appendChild(j)
			}
			return h
		},
		insert : function (d) {
			var c = this.createElementNS(this.wfsns, "wfs:Insert");
			c.appendChild(this.createFeatureXML(d));
			return c
		},
		update : function (j) {
			j.fid || OpenLayers.Console.userError(OpenLayers.i18n("noFID"));
			var i = this.createElementNS(this.wfsns, "wfs:Update");
			i.setAttribute("typeName", this.featurePrefix + ":" + this.featureName);
			i.setAttribute("xmlns:" + this.featurePrefix, this.featureNS);
			var h = this.createElementNS(this.wfsns, "wfs:Property"),
			g = this.createElementNS(this.wfsns, "wfs:Name"),
			l = this.createTextNode(this.geometryName);
			g.appendChild(l);
			h.appendChild(g);
			g = this.createElementNS(this.wfsns, "wfs:Value");
			l = this.buildGeometryNode(j.geometry);
			j.layer && l.setAttribute("srsName", j.layer.projection.getCode());
			g.appendChild(l);
			h.appendChild(g);
			i.appendChild(h);
			for (var k in j.attributes) {
				h = this.createElementNS(this.wfsns, "wfs:Property"),
				g = this.createElementNS(this.wfsns, "wfs:Name"),
				g.appendChild(this.createTextNode(k)),
				h.appendChild(g),
				g = this.createElementNS(this.wfsns, "wfs:Value"),
				g.appendChild(this.createTextNode(j.attributes[k])),
				h.appendChild(g),
				i.appendChild(h)
			}
			h = this.createElementNS(this.ogcns, "ogc:Filter");
			k = this.createElementNS(this.ogcns, "ogc:FeatureId");
			k.setAttribute("fid", j.fid);
			h.appendChild(k);
			i.appendChild(h);
			return i
		},
		remove : function (h) {
			if (!h.fid) {
				return OpenLayers.Console.userError(OpenLayers.i18n("noFID")),
				!1
			}
			var g = this.createElementNS(this.wfsns, "wfs:Delete");
			g.setAttribute("typeName", this.featurePrefix + ":" + this.featureName);
			g.setAttribute("xmlns:" + this.featurePrefix, this.featureNS);
			var f = this.createElementNS(this.ogcns, "ogc:Filter"),
			e = this.createElementNS(this.ogcns, "ogc:FeatureId");
			e.setAttribute("fid", h.fid);
			f.appendChild(e);
			g.appendChild(f);
			return g
		},
		destroy : function () {
			this.layer = null
		},
		CLASS_NAME : "OpenLayers.Format.WFS"
	});
OpenLayers.Format.SLD.v1_0_0_GeoServer = OpenLayers.Class(OpenLayers.Format.SLD.v1_0_0, {
		version : "1.0.0",
		profile : "GeoServer",
		readers : OpenLayers.Util.applyDefaults({
			sld : OpenLayers.Util.applyDefaults({
				Priority : function (d, f) {
					var e = this.readers.ogc._expression.call(this, d);
					e && (f.priority = e)
				},
				VendorOption : function (d, c) {
					c.vendorOptions || (c.vendorOptions = {});
					c.vendorOptions[d.getAttribute("name")] = this.getChildValue(d)
				}
			}, OpenLayers.Format.SLD.v1_0_0.prototype.readers.sld)
		}, OpenLayers.Format.SLD.v1_0_0.prototype.readers),
		writers : OpenLayers.Util.applyDefaults({
			sld : OpenLayers.Util.applyDefaults({
				Priority : function (b) {
					return this.writers.sld._OGCExpression.call(this, "sld:Priority", b)
				},
				VendorOption : function (b) {
					return this.createElementNSPlus("sld:VendorOption", {
						attributes : {
							name : b.name
						},
						value : b.value
					})
				},
				TextSymbolizer : function (d) {
					var c = OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.TextSymbolizer.apply(this, arguments);
					!1 !== d.graphic && (d.externalGraphic || d.graphicName) && this.writeNode("Graphic", d, c);
					"priority" in d && this.writeNode("Priority", d.priority, c);
					return this.addVendorOptions(c, d)
				},
				PointSymbolizer : function (d) {
					var c = OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.PointSymbolizer.apply(this, arguments);
					return this.addVendorOptions(c, d)
				},
				LineSymbolizer : function (d) {
					var c = OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.LineSymbolizer.apply(this, arguments);
					return this.addVendorOptions(c, d)
				},
				PolygonSymbolizer : function (d) {
					var c = OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.PolygonSymbolizer.apply(this, arguments);
					return this.addVendorOptions(c, d)
				}
			}, OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld)
		}, OpenLayers.Format.SLD.v1_0_0.prototype.writers),
		addVendorOptions : function (d, f) {
			if (f.vendorOptions) {
				for (var e in f.vendorOptions) {
					this.writeNode("VendorOption", {
						name : e,
						value : f.vendorOptions[e]
					}, d)
				}
			}
			return d
		},
		CLASS_NAME : "OpenLayers.Format.SLD.v1_0_0_GeoServer"
	});
OpenLayers.Layer.Boxes = OpenLayers.Class(OpenLayers.Layer.Markers, {
		drawMarker : function (d) {
			var f = this.map.getLayerPxFromLonLat({
					lon : d.bounds.left,
					lat : d.bounds.top
				}),
			e = this.map.getLayerPxFromLonLat({
					lon : d.bounds.right,
					lat : d.bounds.bottom
				});
			null == e || null == f ? d.display(!1) : (f = d.draw(f, {
						w : Math.max(1, e.x - f.x),
						h : Math.max(1, e.y - f.y)
					}), d.drawn || (this.div.appendChild(f), d.drawn = !0))
		},
		removeMarker : function (b) {
			OpenLayers.Util.removeItem(this.markers, b);
			null != b.div && b.div.parentNode == this.div && this.div.removeChild(b.div)
		},
		CLASS_NAME : "OpenLayers.Layer.Boxes"
	});
OpenLayers.Format.WFSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.WFSCapabilities.v1, {
		readers : {
			wfs : OpenLayers.Util.applyDefaults({
				Service : function (d, c) {
					c.service = {};
					this.readChildNodes(d, c.service)
				},
				Fees : function (d, f) {
					var e = this.getChildValue(d);
					e && "none" != e.toLowerCase() && (f.fees = e)
				},
				AccessConstraints : function (d, f) {
					var e = this.getChildValue(d);
					e && "none" != e.toLowerCase() && (f.accessConstraints = e)
				},
				OnlineResource : function (d, f) {
					var e = this.getChildValue(d);
					e && "none" != e.toLowerCase() && (f.onlineResource = e)
				},
				Keywords : function (d, f) {
					var e = this.getChildValue(d);
					e && "none" != e.toLowerCase() && (f.keywords = e.split(", "))
				},
				Capability : function (d, c) {
					c.capability = {};
					this.readChildNodes(d, c.capability)
				},
				Request : function (d, c) {
					c.request = {};
					this.readChildNodes(d, c.request)
				},
				GetFeature : function (d, c) {
					c.getfeature = {
						href : {},
						formats : []
					};
					this.readChildNodes(d, c.getfeature)
				},
				ResultFormat : function (i, h) {
					for (var g = i.childNodes, f, j = 0; j < g.length; j++) {
						f = g[j],
						1 == f.nodeType && h.formats.push(f.nodeName)
					}
				},
				DCPType : function (d, c) {
					this.readChildNodes(d, c)
				},
				HTTP : function (d, c) {
					this.readChildNodes(d, c.href)
				},
				Get : function (d, c) {
					c.get = d.getAttribute("onlineResource")
				},
				Post : function (d, c) {
					c.post = d.getAttribute("onlineResource")
				},
				SRS : function (d, f) {
					var e = this.getChildValue(d);
					e && (f.srs = e)
				}
			}, OpenLayers.Format.WFSCapabilities.v1.prototype.readers.wfs)
		},
		CLASS_NAME : "OpenLayers.Format.WFSCapabilities.v1_0_0"
	});
OpenLayers.Format.WMSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
		defaultVersion : "1.1.1",
		profile : null,
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities"
	});
OpenLayers.Format.WMSCapabilities.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			wms : "http://www.opengis.net/wms",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		defaultPrefix : "wms",
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			var f = d;
			d && 9 == d.nodeType && (d = d.documentElement);
			var e = {};
			this.readNode(d, e);
			void 0 === e.service && (d = new OpenLayers.Format.OGCExceptionReport, e.error = d.read(f));
			return e
		},
		readers : {
			wms : {
				Service : function (d, c) {
					c.service = {};
					this.readChildNodes(d, c.service)
				},
				Name : function (d, c) {
					c.name = this.getChildValue(d)
				},
				Title : function (d, c) {
					c.title = this.getChildValue(d)
				},
				Abstract : function (d, c) {
					c["abstract"] = this.getChildValue(d)
				},
				BoundingBox : function (d) {
					var c = {};
					c.bbox = [parseFloat(d.getAttribute("minx")), parseFloat(d.getAttribute("miny")), parseFloat(d.getAttribute("maxx")), parseFloat(d.getAttribute("maxy"))];
					d = {
						x : parseFloat(d.getAttribute("resx")),
						y : parseFloat(d.getAttribute("resy"))
					};
					if (!isNaN(d.x) || !isNaN(d.y)) {
						c.res = d
					}
					return c
				},
				OnlineResource : function (d, c) {
					c.href = this.getAttributeNS(d, this.namespaces.xlink, "href")
				},
				ContactInformation : function (d, c) {
					c.contactInformation = {};
					this.readChildNodes(d, c.contactInformation)
				},
				ContactPersonPrimary : function (d, c) {
					c.personPrimary = {};
					this.readChildNodes(d, c.personPrimary)
				},
				ContactPerson : function (d, c) {
					c.person = this.getChildValue(d)
				},
				ContactOrganization : function (d, c) {
					c.organization = this.getChildValue(d)
				},
				ContactPosition : function (d, c) {
					c.position = this.getChildValue(d)
				},
				ContactAddress : function (d, c) {
					c.contactAddress = {};
					this.readChildNodes(d, c.contactAddress)
				},
				AddressType : function (d, c) {
					c.type = this.getChildValue(d)
				},
				Address : function (d, c) {
					c.address = this.getChildValue(d)
				},
				City : function (d, c) {
					c.city = this.getChildValue(d)
				},
				StateOrProvince : function (d, c) {
					c.stateOrProvince = this.getChildValue(d)
				},
				PostCode : function (d, c) {
					c.postcode = this.getChildValue(d)
				},
				Country : function (d, c) {
					c.country = this.getChildValue(d)
				},
				ContactVoiceTelephone : function (d, c) {
					c.phone = this.getChildValue(d)
				},
				ContactFacsimileTelephone : function (d, c) {
					c.fax = this.getChildValue(d)
				},
				ContactElectronicMailAddress : function (d, c) {
					c.email = this.getChildValue(d)
				},
				Fees : function (d, f) {
					var e = this.getChildValue(d);
					e && "none" != e.toLowerCase() && (f.fees = e)
				},
				AccessConstraints : function (d, f) {
					var e = this.getChildValue(d);
					e && "none" != e.toLowerCase() && (f.accessConstraints = e)
				},
				Capability : function (d, c) {
					c.capability = {
						nestedLayers : [],
						layers : []
					};
					this.readChildNodes(d, c.capability)
				},
				Request : function (d, c) {
					c.request = {};
					this.readChildNodes(d, c.request)
				},
				GetCapabilities : function (d, c) {
					c.getcapabilities = {
						formats : []
					};
					this.readChildNodes(d, c.getcapabilities)
				},
				Format : function (d, c) {
					OpenLayers.Util.isArray(c.formats) ? c.formats.push(this.getChildValue(d)) : c.format = this.getChildValue(d)
				},
				DCPType : function (d, c) {
					this.readChildNodes(d, c)
				},
				HTTP : function (d, c) {
					this.readChildNodes(d, c)
				},
				Get : function (d, c) {
					c.get = {};
					this.readChildNodes(d, c.get);
					c.href || (c.href = c.get.href)
				},
				Post : function (d, c) {
					c.post = {};
					this.readChildNodes(d, c.post);
					c.href || (c.href = c.get.href)
				},
				GetMap : function (d, c) {
					c.getmap = {
						formats : []
					};
					this.readChildNodes(d, c.getmap)
				},
				GetFeatureInfo : function (d, c) {
					c.getfeatureinfo = {
						formats : []
					};
					this.readChildNodes(d, c.getfeatureinfo)
				},
				Exception : function (d, c) {
					c.exception = {
						formats : []
					};
					this.readChildNodes(d, c.exception)
				},
				Layer : function (r, q) {
					var p,
					o;
					q.capability ? (o = q.capability, p = q) : o = q;
					var n = r.getAttributeNode("queryable"),
					i = n && n.specified ? r.getAttribute("queryable") : null,
					x = (n = r.getAttributeNode("cascaded")) && n.specified ? r.getAttribute("cascaded") : null,
					n = (n = r.getAttributeNode("opaque")) && n.specified ? r.getAttribute("opaque") : null,
					w = r.getAttribute("noSubsets"),
					v = r.getAttribute("fixedWidth"),
					u = r.getAttribute("fixedHeight"),
					t = p || {},
					s = OpenLayers.Util.extend;
					p = {
						nestedLayers : [],
						styles : p ? [].concat(p.styles) : [],
						srs : p ? s({}, t.srs) : {},
						metadataURLs : [],
						bbox : p ? s({}, t.bbox) : {},
						llbbox : t.llbbox,
						dimensions : p ? s({}, t.dimensions) : {},
						authorityURLs : p ? s({}, t.authorityURLs) : {},
						identifiers : {},
						keywords : [],
						queryable : i && "" !== i ? "1" === i || "true" === i : t.queryable || !1,
						cascaded : null !== x ? parseInt(x) : t.cascaded || 0,
						opaque : n ? "1" === n || "true" === n : t.opaque || !1,
						noSubsets : null !== w ? "1" === w || "true" === w : t.noSubsets || !1,
						fixedWidth : null != v ? parseInt(v) : t.fixedWidth || 0,
						fixedHeight : null != u ? parseInt(u) : t.fixedHeight || 0,
						minScale : t.minScale,
						maxScale : t.maxScale,
						attribution : t.attribution
					};
					q.nestedLayers.push(p);
					p.capability = o;
					this.readChildNodes(r, p);
					delete p.capability;
					p.name && (i = p.name.split(":"), x = o.request, n = x.getfeatureinfo, 0 < i.length && (p.prefix = i[0]), o.layers.push(p), void 0 === p.formats && (p.formats = x.getmap.formats), void 0 === p.infoFormats && n && (p.infoFormats = n.formats))
				},
				Attribution : function (d, c) {
					c.attribution = {};
					this.readChildNodes(d, c.attribution)
				},
				LogoURL : function (d, c) {
					c.logo = {
						width : d.getAttribute("width"),
						height : d.getAttribute("height")
					};
					this.readChildNodes(d, c.logo)
				},
				Style : function (d, f) {
					var e = {};
					f.styles.push(e);
					this.readChildNodes(d, e)
				},
				LegendURL : function (d, f) {
					var e = {
						width : d.getAttribute("width"),
						height : d.getAttribute("height")
					};
					f.legend = e;
					this.readChildNodes(d, e)
				},
				MetadataURL : function (d, f) {
					var e = {
						type : d.getAttribute("type")
					};
					f.metadataURLs.push(e);
					this.readChildNodes(d, e)
				},
				DataURL : function (d, c) {
					c.dataURL = {};
					this.readChildNodes(d, c.dataURL)
				},
				FeatureListURL : function (d, c) {
					c.featureListURL = {};
					this.readChildNodes(d, c.featureListURL)
				},
				AuthorityURL : function (h, g) {
					var f = h.getAttribute("name"),
					e = {};
					this.readChildNodes(h, e);
					g.authorityURLs[f] = e.href
				},
				Identifier : function (d, f) {
					var e = d.getAttribute("authority");
					f.identifiers[e] = this.getChildValue(d)
				},
				KeywordList : function (d, c) {
					this.readChildNodes(d, c)
				},
				SRS : function (d, c) {
					c.srs[this.getChildValue(d)] = !0
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities.v1"
	});
OpenLayers.Format.WMSCapabilities.v1_3 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1, {
		readers : {
			wms : OpenLayers.Util.applyDefaults({
				WMS_Capabilities : function (d, c) {
					this.readChildNodes(d, c)
				},
				LayerLimit : function (d, c) {
					c.layerLimit = parseInt(this.getChildValue(d))
				},
				MaxWidth : function (d, c) {
					c.maxWidth = parseInt(this.getChildValue(d))
				},
				MaxHeight : function (d, c) {
					c.maxHeight = parseInt(this.getChildValue(d))
				},
				BoundingBox : function (d, f) {
					var e = OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms.BoundingBox.apply(this, [d, f]);
					e.srs = d.getAttribute("CRS");
					f.bbox[e.srs] = e
				},
				CRS : function (d, c) {
					this.readers.wms.SRS.apply(this, [d, c])
				},
				EX_GeographicBoundingBox : function (d, c) {
					c.llbbox = [];
					this.readChildNodes(d, c.llbbox)
				},
				westBoundLongitude : function (d, c) {
					c[0] = this.getChildValue(d)
				},
				eastBoundLongitude : function (d, c) {
					c[2] = this.getChildValue(d)
				},
				southBoundLatitude : function (d, c) {
					c[1] = this.getChildValue(d)
				},
				northBoundLatitude : function (d, c) {
					c[3] = this.getChildValue(d)
				},
				MinScaleDenominator : function (d, c) {
					c.maxScale = parseFloat(this.getChildValue(d)).toPrecision(16)
				},
				MaxScaleDenominator : function (d, c) {
					c.minScale = parseFloat(this.getChildValue(d)).toPrecision(16)
				},
				Dimension : function (d, f) {
					var e = {
						name : d.getAttribute("name").toLowerCase(),
						units : d.getAttribute("units"),
						unitsymbol : d.getAttribute("unitSymbol"),
						nearestVal : "1" === d.getAttribute("nearestValue"),
						multipleVal : "1" === d.getAttribute("multipleValues"),
						"default" : d.getAttribute("default") || "",
						current : "1" === d.getAttribute("current"),
						values : this.getChildValue(d).split(",")
					};
					f.dimensions[e.name] = e
				},
				Keyword : function (d, f) {
					var e = {
						value : this.getChildValue(d),
						vocabulary : d.getAttribute("vocabulary")
					};
					f.keywords && f.keywords.push(e)
				}
			}, OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms),
			sld : {
				UserDefinedSymbolization : function (d, c) {
					this.readers.wms.UserDefinedSymbolization.apply(this, [d, c]);
					c.userSymbols.inlineFeature = 1 == parseInt(d.getAttribute("InlineFeature"));
					c.userSymbols.remoteWCS = 1 == parseInt(d.getAttribute("RemoteWCS"))
				},
				DescribeLayer : function (d, c) {
					this.readers.wms.DescribeLayer.apply(this, [d, c])
				},
				GetLegendGraphic : function (d, c) {
					this.readers.wms.GetLegendGraphic.apply(this, [d, c])
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities.v1_3"
	});
OpenLayers.Layer.Zoomify = OpenLayers.Class(OpenLayers.Layer.Grid, {
		size : null,
		isBaseLayer : !0,
		standardTileSize : 256,
		tileOriginCorner : "tl",
		numberOfTiers : 0,
		tileCountUpToTier : null,
		tierSizeInTiles : null,
		tierImageSize : null,
		initialize : function (h, g, f, e) {
			this.initializeZoomify(f);
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, [h, g, f, {}, e])
		},
		initializeZoomify : function (d) {
			d = d.clone();
			var c = new OpenLayers.Size(Math.ceil(d.w / this.standardTileSize), Math.ceil(d.h / this.standardTileSize));
			this.tierSizeInTiles = [c];
			for (this.tierImageSize = [d]; d.w > this.standardTileSize || d.h > this.standardTileSize; ) {
				d = new OpenLayers.Size(Math.floor(d.w / 2), Math.floor(d.h / 2)),
				c = new OpenLayers.Size(Math.ceil(d.w / this.standardTileSize), Math.ceil(d.h / this.standardTileSize)),
				this.tierSizeInTiles.push(c),
				this.tierImageSize.push(d)
			}
			this.tierSizeInTiles.reverse();
			this.tierImageSize.reverse();
			this.numberOfTiers = this.tierSizeInTiles.length;
			this.tileCountUpToTier = [0];
			for (d = 1; d < this.numberOfTiers; d++) {
				this.tileCountUpToTier.push(this.tierSizeInTiles[d - 1].w * this.tierSizeInTiles[d - 1].h + this.tileCountUpToTier[d - 1])
			}
		},
		destroy : function () {
			OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
			this.tileCountUpToTier.length = 0;
			this.tierSizeInTiles.length = 0;
			this.tierImageSize.length = 0
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.Zoomify(this.name, this.url, this.size, this.options));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getURL : function (d) {
			d = this.adjustBounds(d);
			var f = this.map.getResolution(),
			e = Math.round((d.left - this.tileOrigin.lon) / (f * this.tileSize.w));
			d = Math.round((this.tileOrigin.lat - d.top) / (f * this.tileSize.h));
			f = this.map.getZoom();
			e = "TileGroup" + Math.floor((e + d * this.tierSizeInTiles[f].w + this.tileCountUpToTier[f]) / 256) + "/" + f + "-" + e + "-" + d + ".jpg";
			d = this.url;
			OpenLayers.Util.isArray(d) && (d = this.selectUrl(e, d));
			return d + e
		},
		getImageSize : function () {
			if (0 < arguments.length) {
				var i = this.adjustBounds(arguments[0]),
				h = this.map.getResolution(),
				g = Math.round((i.left - this.tileOrigin.lon) / (h * this.tileSize.w)),
				i = Math.round((this.tileOrigin.lat - i.top) / (h * this.tileSize.h)),
				h = this.map.getZoom(),
				f = this.standardTileSize,
				j = this.standardTileSize;
				g == this.tierSizeInTiles[h].w - 1 && (f = this.tierImageSize[h].w % this.standardTileSize);
				i == this.tierSizeInTiles[h].h - 1 && (j = this.tierImageSize[h].h % this.standardTileSize);
				return new OpenLayers.Size(f, j)
			}
			return this.tileSize
		},
		setMap : function (b) {
			OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
			this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left, this.map.maxExtent.top)
		},
		calculateGridLayout : function (l, k, j) {
			var i = j * this.tileSize.w;
			j *= this.tileSize.h;
			var h = l.left - k.lon,
			n = Math.floor(h / i) - this.buffer;
			l = k.lat - l.top + j;
			var m = Math.floor(l / j) - this.buffer;
			return {
				tilelon : i,
				tilelat : j,
				tileoffsetlon : k.lon + n * i,
				tileoffsetlat : k.lat - j * m,
				tileoffsetx :  - (h / i - n) * this.tileSize.w,
				tileoffsety : (m - l / j) * this.tileSize.h
			}
		},
		CLASS_NAME : "OpenLayers.Layer.Zoomify"
	});
OpenLayers.Layer.MapServer = OpenLayers.Class(OpenLayers.Layer.Grid, {
		DEFAULT_PARAMS : {
			mode : "map",
			map_imagetype : "png"
		},
		initialize : function (h, g, f, e) {
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, arguments);
			this.params = OpenLayers.Util.applyDefaults(this.params, this.DEFAULT_PARAMS);
			if (null == e || null == e.isBaseLayer) {
				this.isBaseLayer = "true" != this.params.transparent && !0 != this.params.transparent
			}
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.MapServer(this.name, this.url, this.params, this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getURL : function (d) {
			d = this.adjustBounds(d);
			d = [d.left, d.bottom, d.right, d.top];
			var c = this.getImageSize();
			return this.getFullRequestString({
				mapext : d,
				imgext : d,
				map_size : [c.w, c.h],
				imgx : c.w / 2,
				imgy : c.h / 2,
				imgxy : [c.w, c.h]
			})
		},
		getFullRequestString : function (j, i) {
			var h = null == i ? this.url : i,
			g = OpenLayers.Util.extend({}, this.params),
			g = OpenLayers.Util.extend(g, j),
			l = OpenLayers.Util.getParameterString(g);
			OpenLayers.Util.isArray(h) && (h = this.selectUrl(l, h));
			var l = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(h)),
			k;
			for (k in g) {
				k.toUpperCase()in l && delete g[k]
			}
			l = OpenLayers.Util.getParameterString(g);
			g = h;
			l = l.replace(/,/g, "+");
			"" != l && (k = h.charAt(h.length - 1), g = "&" == k || "?" == k ? g + l : -1 == h.indexOf("?") ? g + ("?" + l) : g + ("&" + l));
			return g
		},
		CLASS_NAME : "OpenLayers.Layer.MapServer"
	});
OpenLayers.Renderer.VML = OpenLayers.Class(OpenLayers.Renderer.Elements, {
		xmlns : "urn:schemas-microsoft-com:vml",
		symbolCache : {},
		offset : null,
		initialize : function (i) {
			if (this.supported()) {
				if (!document.namespaces.olv) {
					document.namespaces.add("olv", this.xmlns);
					for (var h = document.createStyleSheet(), g = "shape rect oval fill stroke imagedata group textbox".split(" "), f = 0, j = g.length; f < j; f++) {
						h.addRule("olv\\:" + g[f], "behavior: url(#default#VML); position: absolute; display: inline-block;")
					}
				}
				OpenLayers.Renderer.Elements.prototype.initialize.apply(this, arguments)
			}
		},
		supported : function () {
			return !!document.namespaces
		},
		setExtent : function (l, k) {
			var j = OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments),
			i = this.getResolution(),
			h = l.left / i | 0,
			i = l.top / i - this.size.h | 0;
			k || !this.offset ? (this.offset = {
					x : h,
					y : i
				}, i = h = 0) : (h -= this.offset.x, i -= this.offset.y);
			this.root.coordorigin = h - this.xOffset + " " + i;
			for (var h = [this.root, this.vectorRoot, this.textRoot], n = 0, m = h.length; n < m; ++n) {
				i = h[n],
				i.coordsize = this.size.w + " " + this.size.h
			}
			this.root.style.flip = "y";
			return j
		},
		setSize : function (l) {
			OpenLayers.Renderer.prototype.setSize.apply(this, arguments);
			for (var k = [this.rendererRoot, this.root, this.vectorRoot, this.textRoot], j = this.size.w + "px", i = this.size.h + "px", h, n = 0, m = k.length; n < m; ++n) {
				h = k[n],
				h.style.width = j,
				h.style.height = i
			}
		},
		getNodeType : function (d, f) {
			var e = null;
			switch (d.CLASS_NAME) {
			case "OpenLayers.Geometry.Point":
				e = f.externalGraphic ? "olv:rect" : this.isComplexSymbol(f.graphicName) ? "olv:shape" : "olv:oval";
				break;
			case "OpenLayers.Geometry.Rectangle":
				e = "olv:rect";
				break;
			case "OpenLayers.Geometry.LineString":
			case "OpenLayers.Geometry.LinearRing":
			case "OpenLayers.Geometry.Polygon":
			case "OpenLayers.Geometry.Curve":
				e = "olv:shape"
			}
			return e
		},
		setStyle : function (r, q, p, o) {
			q = q || r._style;
			p = p || r._options;
			var n = q.fillColor;
			if ("OpenLayers.Geometry.Point" === r._geometryClass) {
				if (q.externalGraphic) {
					p.isFilled = !0;
					q.graphicTitle && (r.title = q.graphicTitle);
					var n = q.graphicWidth || q.graphicHeight,
					m = q.graphicHeight || q.graphicWidth,
					n = n ? n : 2 * q.pointRadius,
					m = m ? m : 2 * q.pointRadius,
					l = this.getResolution(),
					k = void 0 != q.graphicXOffset ? q.graphicXOffset :  - (0.5 * n),
					i = void 0 != q.graphicYOffset ? q.graphicYOffset :  - (0.5 * m);
					r.style.left = ((o.x - this.featureDx) / l - this.offset.x + k | 0) + "px";
					r.style.top = (o.y / l - this.offset.y - (i + m) | 0) + "px";
					r.style.width = n + "px";
					r.style.height = m + "px";
					r.style.flip = "y";
					n = "none";
					p.isStroked = !1
				} else {
					this.isComplexSymbol(q.graphicName) ? (m = this.importSymbol(q.graphicName), r.path = m.path, r.coordorigin = m.left + "," + m.bottom, m = m.size, r.coordsize = m + "," + m, this.drawCircle(r, o, q.pointRadius), r.style.flip = "y") : this.drawCircle(r, o, q.pointRadius)
				}
			}
			p.isFilled ? r.fillcolor = n : r.filled = "false";
			o = r.getElementsByTagName("fill");
			o = 0 == o.length ? null : o[0];
			if (p.isFilled) {
				o || (o = this.createNode("olv:fill", r.id + "_fill"));
				o.opacity = q.fillOpacity;
				if ("OpenLayers.Geometry.Point" === r._geometryClass && q.externalGraphic && (q.graphicOpacity && (o.opacity = q.graphicOpacity), o.src = q.externalGraphic, o.type = "frame", !q.graphicWidth || !q.graphicHeight)) {
					o.aspect = "atmost"
				}
				o.parentNode != r && r.appendChild(o)
			} else {
				o && r.removeChild(o)
			}
			n = q.rotation;
			if (void 0 !== n || void 0 !== r._rotation) {
				r._rotation = n,
				q.externalGraphic ? (this.graphicRotate(r, k, i, q), o.opacity = 0) : "OpenLayers.Geometry.Point" === r._geometryClass && (r.style.rotation = n || 0)
			}
			k = r.getElementsByTagName("stroke");
			k = 0 == k.length ? null : k[0];
			p.isStroked ? (k || (k = this.createNode("olv:stroke", r.id + "_stroke"), r.appendChild(k)), k.on = !0, k.color = q.strokeColor, k.weight = q.strokeWidth + "px", k.opacity = q.strokeOpacity, k.endcap = "butt" == q.strokeLinecap ? "flat" : q.strokeLinecap || "round", q.strokeDashstyle && (k.dashstyle = this.dashStyle(q))) : (r.stroked = !1, k && (k.on = !1));
			"inherit" != q.cursor && null != q.cursor && (r.style.cursor = q.cursor);
			return r
		},
		graphicRotate : function (o, n, m, i) {
			i = i || o._style;
			var v = i.rotation || 0,
			u,
			t;
			if (!i.graphicWidth || !i.graphicHeight) {
				var s = new Image;
				s.onreadystatechange = OpenLayers.Function.bind(function () {
						if ("complete" == s.readyState || "interactive" == s.readyState) {
							u = s.width / s.height,
							t = Math.max(2 * i.pointRadius, i.graphicWidth || 0, i.graphicHeight || 0),
							n *= u,
							i.graphicWidth = t * u,
							i.graphicHeight = t,
							this.graphicRotate(o, n, m, i)
						}
					}, this);
				s.src = i.externalGraphic
			} else {
				t = Math.max(i.graphicWidth, i.graphicHeight);
				u = i.graphicWidth / i.graphicHeight;
				var r = Math.round(i.graphicWidth || t * u),
				q = Math.round(i.graphicHeight || t);
				o.style.width = r + "px";
				o.style.height = q + "px";
				var p = document.getElementById(o.id + "_image");
				p || (p = this.createNode("olv:imagedata", o.id + "_image"), o.appendChild(p));
				p.style.width = r + "px";
				p.style.height = q + "px";
				p.src = i.externalGraphic;
				p.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='', sizingMethod='scale')";
				p = v * Math.PI / 180;
				v = Math.sin(p);
				p = Math.cos(p);
				v = "progid:DXImageTransform.Microsoft.Matrix(M11=" + p + ",M12=" + -v + ",M21=" + v + ",M22=" + p + ",SizingMethod='auto expand')\n";
				(p = i.graphicOpacity || i.fillOpacity) && 1 != p && (v += "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + p + ")\n");
				o.style.filter = v;
				v = new OpenLayers.Geometry.Point(-n, -m);
				r = (new OpenLayers.Bounds(0, 0, r, q)).toGeometry();
				r.rotate(i.rotation, v);
				r = r.getBounds();
				o.style.left = Math.round(parseInt(o.style.left) + r.left) + "px";
				o.style.top = Math.round(parseInt(o.style.top) - r.bottom) + "px"
			}
		},
		postDraw : function (d) {
			d.style.visibility = "visible";
			var f = d._style.fillColor,
			e = d._style.strokeColor;
			"none" == f && d.fillcolor != f && (d.fillcolor = f);
			"none" == e && d.strokecolor != e && (d.strokecolor = e)
		},
		setNodeDimension : function (h, g) {
			var f = g.getBounds();
			if (f) {
				var e = this.getResolution(),
				f = new OpenLayers.Bounds((f.left - this.featureDx) / e - this.offset.x | 0, f.bottom / e - this.offset.y | 0, (f.right - this.featureDx) / e - this.offset.x | 0, f.top / e - this.offset.y | 0);
				h.style.left = f.left + "px";
				h.style.top = f.top + "px";
				h.style.width = f.getWidth() + "px";
				h.style.height = f.getHeight() + "px";
				h.coordorigin = f.left + " " + f.top;
				h.coordsize = f.getWidth() + " " + f.getHeight()
			}
		},
		dashStyle : function (b) {
			b = b.strokeDashstyle;
			switch (b) {
			case "solid":
			case "dot":
			case "dash":
			case "dashdot":
			case "longdash":
			case "longdashdot":
				return b;
			default:
				return b = b.split(/[ ,]/),
				2 == b.length ? 1 * b[0] >= 2 * b[1] ? "longdash" : 1 == b[0] || 1 == b[1] ? "dot" : "dash" : 4 == b.length ? 1 * b[0] >= 2 * b[1] ? "longdashdot" : "dashdot" : "solid"
			}
		},
		createNode : function (d, f) {
			var e = document.createElement(d);
			f && (e.id = f);
			e.unselectable = "on";
			e.onselectstart = OpenLayers.Function.False;
			return e
		},
		nodeTypeCompare : function (i, h) {
			var g = h,
			f = g.indexOf(":");
			-1 != f && (g = g.substr(f + 1));
			var j = i.nodeName,
			f = j.indexOf(":");
			-1 != f && (j = j.substr(f + 1));
			return g == j
		},
		createRenderRoot : function () {
			return this.nodeFactory(this.container.id + "_vmlRoot", "div")
		},
		createRoot : function (b) {
			return this.nodeFactory(this.container.id + b, "olv:group")
		},
		drawPoint : function (d, c) {
			return this.drawCircle(d, c, 1)
		},
		drawCircle : function (h, g, f) {
			if (!isNaN(g.x) && !isNaN(g.y)) {
				var e = this.getResolution();
				h.style.left = ((g.x - this.featureDx) / e - this.offset.x | 0) - f + "px";
				h.style.top = (g.y / e - this.offset.y | 0) - f + "px";
				g = 2 * f;
				h.style.width = g + "px";
				h.style.height = g + "px";
				return h
			}
			return !1
		},
		drawLineString : function (d, c) {
			return this.drawLine(d, c, !1)
		},
		drawLinearRing : function (d, c) {
			return this.drawLine(d, c, !0)
		},
		drawLine : function (r, q, p) {
			this.setNodeDimension(r, q);
			for (var o = this.getResolution(), n = q.components.length, m = Array(n), l, k, i = 0; i < n; i++) {
				l = q.components[i],
				k = (l.x - this.featureDx) / o - this.offset.x | 0,
				l = l.y / o - this.offset.y | 0,
				m[i] = " " + k + "," + l + " l "
			}
			r.path = "m" + m.join("") + (p ? " x e" : " e");
			return r
		},
		drawPolygon : function (z, x) {
			this.setNodeDimension(z, x);
			var v = this.getResolution(),
			u = [],
			t,
			s,
			r,
			q,
			o,
			i,
			B,
			A,
			y,
			w;
			t = 0;
			for (s = x.components.length; t < s; t++) {
				u.push("m");
				r = x.components[t].components;
				q = 0 === t;
				i = o = null;
				B = 0;
				for (A = r.length; B < A; B++) {
					y = r[B],
					w = (y.x - this.featureDx) / v - this.offset.x | 0,
					y = y.y / v - this.offset.y | 0,
					w = " " + w + "," + y,
					u.push(w),
					0 == B && u.push(" l"),
					q || (o ? o != w && (i ? i != w && (q = !0) : i = w) : o = w)
				}
				u.push(q ? " x " : " ")
			}
			u.push("e");
			z.path = u.join("");
			return z
		},
		drawRectangle : function (d, f) {
			var e = this.getResolution();
			d.style.left = ((f.x - this.featureDx) / e - this.offset.x | 0) + "px";
			d.style.top = (f.y / e - this.offset.y | 0) + "px";
			d.style.width = (f.width / e | 0) + "px";
			d.style.height = (f.height / e | 0) + "px";
			return d
		},
		drawText : function (j, i, h) {
			var g = this.nodeFactory(j + this.LABEL_ID_SUFFIX, "olv:rect"),
			l = this.nodeFactory(j + this.LABEL_ID_SUFFIX + "_textbox", "olv:textbox"),
			k = this.getResolution();
			g.style.left = ((h.x - this.featureDx) / k - this.offset.x | 0) + "px";
			g.style.top = (h.y / k - this.offset.y | 0) + "px";
			g.style.flip = "y";
			l.innerText = i.label;
			"inherit" != i.cursor && null != i.cursor && (l.style.cursor = i.cursor);
			i.fontColor && (l.style.color = i.fontColor);
			i.fontOpacity && (l.style.filter = "alpha(opacity=" + 100 * i.fontOpacity + ")");
			i.fontFamily && (l.style.fontFamily = i.fontFamily);
			i.fontSize && (l.style.fontSize = i.fontSize);
			i.fontWeight && (l.style.fontWeight = i.fontWeight);
			i.fontStyle && (l.style.fontStyle = i.fontStyle);
			!0 === i.labelSelect && (g._featureId = j, l._featureId = j, l._geometry = h, l._geometryClass = h.CLASS_NAME);
			l.style.whiteSpace = "nowrap";
			l.inset = "1px,0px,0px,0px";
			g.parentNode || (g.appendChild(l), this.textRoot.appendChild(g));
			i = i.labelAlign || "cm";
			1 == i.length && (i += "m");
			j = l.clientWidth * OpenLayers.Renderer.VML.LABEL_SHIFT[i.substr(0, 1)];
			l = l.clientHeight * OpenLayers.Renderer.VML.LABEL_SHIFT[i.substr(1, 1)];
			g.style.left = parseInt(g.style.left) - j - 1 + "px";
			g.style.top = parseInt(g.style.top) + l + "px"
		},
		moveRoot : function (d) {
			var c = this.map.getLayer(d.container.id);
			c instanceof OpenLayers.Layer.Vector.RootContainer && (c = this.map.getLayer(this.container.id));
			c && c.renderer.clear();
			OpenLayers.Renderer.Elements.prototype.moveRoot.apply(this, arguments);
			c && c.redraw()
		},
		importSymbol : function (l) {
			var k = this.container.id + "-" + l,
			j = this.symbolCache[k];
			if (j) {
				return j
			}
			j = OpenLayers.Renderer.symbol[l];
			if (!j) {
				throw Error(l + " is not a valid symbol name")
			}
			l = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
			for (var i = ["m"], h = 0; h < j.length; h += 2) {
				var n = j[h],
				m = j[h + 1];
				l.left = Math.min(l.left, n);
				l.bottom = Math.min(l.bottom, m);
				l.right = Math.max(l.right, n);
				l.top = Math.max(l.top, m);
				i.push(n);
				i.push(m);
				0 == h && i.push("l")
			}
			i.push("x e");
			j = i.join(" ");
			i = (l.getWidth() - l.getHeight()) / 2;
			0 < i ? (l.bottom -= i, l.top += i) : (l.left += i, l.right -= i);
			j = {
				path : j,
				size : l.getWidth(),
				left : l.left,
				bottom : l.bottom
			};
			return this.symbolCache[k] = j
		},
		CLASS_NAME : "OpenLayers.Renderer.VML"
	});
OpenLayers.Renderer.VML.LABEL_SHIFT = {
	l : 0,
	c : 0.5,
	r : 1,
	t : 0,
	m : 0.5,
	b : 1
};
OpenLayers.Control.CacheRead = OpenLayers.Class(OpenLayers.Control, {
		fetchEvent : "tileloadstart",
		layers : null,
		autoActivate : !0,
		setMap : function (d) {
			OpenLayers.Control.prototype.setMap.apply(this, arguments);
			var f,
			e = this.layers || d.layers;
			for (f = e.length - 1; 0 <= f; --f) {
				this.addLayer({
					layer : e[f]
				})
			}
			if (!this.layers) {
				d.events.on({
					addlayer : this.addLayer,
					removeLayer : this.removeLayer,
					scope : this
				})
			}
		},
		addLayer : function (b) {
			b.layer.events.register(this.fetchEvent, this, this.fetch)
		},
		removeLayer : function (b) {
			b.layer.events.unregister(this.fetchEvent, this, this.fetch)
		},
		fetch : function (d) {
			if (this.active && window.localStorage && d.tile instanceof OpenLayers.Tile.Image) {
				var f = d.tile,
				e = f.url;
				!f.layer.crossOriginKeyword && (OpenLayers.ProxyHost && 0 === e.indexOf(OpenLayers.ProxyHost)) && (e = OpenLayers.Control.CacheWrite.urlMap[e]);
				if (e = window.localStorage.getItem("olCache_" + e)) {
					f.url = e,
					"tileerror" === d.type && f.setImgSrc(e)
				}
			}
		},
		destroy : function () {
			if (this.layers || this.map) {
				var d,
				c = this.layers || this.map.layers;
				for (d = c.length - 1; 0 <= d; --d) {
					this.removeLayer({
						layer : c[d]
					})
				}
			}
			this.map && this.map.events.un({
				addlayer : this.addLayer,
				removeLayer : this.removeLayer,
				scope : this
			});
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		CLASS_NAME : "OpenLayers.Control.CacheRead"
	});
OpenLayers.Protocol.WFS.v1_0_0 = OpenLayers.Class(OpenLayers.Protocol.WFS.v1, {
		version : "1.0.0",
		CLASS_NAME : "OpenLayers.Protocol.WFS.v1_0_0"
	});
OpenLayers.Format.WMSGetFeatureInfo = OpenLayers.Class(OpenLayers.Format.XML, {
		layerIdentifier : "_layer",
		featureIdentifier : "_feature",
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		gmlFormat : null,
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			var f = d.documentElement;
			if (f) {
				var e = this["read_" + f.nodeName];
				d = e ? e.call(this, f) : (new OpenLayers.Format.GML(this.options ? this.options : {})).read(d)
			}
			return d
		},
		read_msGMLOutput : function (r) {
			var q = [];
			if (r = this.getSiblingNodesByTagCriteria(r, this.layerIdentifier)) {
				for (var p = 0, o = r.length; p < o; ++p) {
					var n = r[p],
					m = n.nodeName;
					n.prefix && (m = m.split(":")[1]);
					m = m.replace(this.layerIdentifier, "");
					if (n = this.getSiblingNodesByTagCriteria(n, this.featureIdentifier)) {
						for (var l = 0; l < n.length; l++) {
							var k = n[l],
							i = this.parseGeometry(k),
							k = this.parseAttributes(k),
							k = new OpenLayers.Feature.Vector(i.geometry, k, null);
							k.bounds = i.bounds;
							k.type = m;
							q.push(k)
						}
					}
				}
			}
			return q
		},
		read_FeatureInfoResponse : function (r) {
			var q = [];
			r = this.getElementsByTagNameNS(r, "*", "FIELDS");
			for (var p = 0, o = r.length; p < o; p++) {
				var n = r[p],
				m = {},
				l,
				k = n.attributes.length;
				if (0 < k) {
					for (l = 0; l < k; l++) {
						var i = n.attributes[l];
						m[i.nodeName] = i.nodeValue
					}
				} else {
					n = n.childNodes;
					l = 0;
					for (k = n.length; l < k; ++l) {
						i = n[l],
						3 != i.nodeType && (m[i.getAttribute("name")] = i.getAttribute("value"))
					}
				}
				q.push(new OpenLayers.Feature.Vector(null, m, null))
			}
			return q
		},
		getSiblingNodesByTagCriteria : function (o, n) {
			var m = [],
			l,
			k,
			j,
			i;
			if (o && o.hasChildNodes()) {
				l = o.childNodes;
				j = l.length;
				for (var p = 0; p < j; p++) {
					for (i = l[p]; i && 1 != i.nodeType; ) {
						i = i.nextSibling,
						p++
					}
					k = i ? i.nodeName : "";
					0 < k.length && -1 < k.indexOf(n) ? m.push(i) : (k = this.getSiblingNodesByTagCriteria(i, n), 0 < k.length && (0 == m.length ? m = k : m.push(k)))
				}
			}
			return m
		},
		parseAttributes : function (j) {
			var i = {};
			if (1 == j.nodeType) {
				j = j.childNodes;
				for (var h = j.length, g = 0; g < h; ++g) {
					var l = j[g];
					if (1 == l.nodeType) {
						var k = l.childNodes,
						l = l.prefix ? l.nodeName.split(":")[1] : l.nodeName;
						if (0 == k.length) {
							i[l] = null
						} else {
							if (1 == k.length && (k = k[0], 3 == k.nodeType || 4 == k.nodeType)) {
								k = k.nodeValue.replace(this.regExes.trimSpace, ""),
								i[l] = k
							}
						}
					}
				}
			}
			return i
		},
		parseGeometry : function (d) {
			this.gmlFormat || (this.gmlFormat = new OpenLayers.Format.GML);
			d = this.gmlFormat.parseFeature(d);
			var f,
			e = null;
			d && (f = d.geometry && d.geometry.clone(), e = d.bounds && d.bounds.clone(), d.destroy());
			return {
				geometry : f,
				bounds : e
			}
		},
		CLASS_NAME : "OpenLayers.Format.WMSGetFeatureInfo"
	});
OpenLayers.Control.WMTSGetFeatureInfo = OpenLayers.Class(OpenLayers.Control, {
		hover : !1,
		requestEncoding : "KVP",
		drillDown : !1,
		maxFeatures : 10,
		clickCallback : "click",
		layers : null,
		queryVisible : !0,
		infoFormat : "text/html",
		vendorParams : {},
		format : null,
		formatOptions : null,
		handlerOptions : null,
		handler : null,
		hoverRequest : null,
		pending : 0,
		initialize : function (b) {
			b = b || {};
			b.handlerOptions = b.handlerOptions || {};
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.format || (this.format = new OpenLayers.Format.WMSGetFeatureInfo(b.formatOptions));
			!0 === this.drillDown && (this.hover = !1);
			this.hover ? this.handler = new OpenLayers.Handler.Hover(this, {
					move : this.cancelHover,
					pause : this.getInfoForHover
				}, OpenLayers.Util.extend(this.handlerOptions.hover || {}, {
						delay : 250
					})) : (b = {}, b[this.clickCallback] = this.getInfoForClick, this.handler = new OpenLayers.Handler.Click(this, b, this.handlerOptions.click || {}))
		},
		getInfoForClick : function (b) {
			this.request(b.xy, {})
		},
		getInfoForHover : function (b) {
			this.request(b.xy, {
				hover : !0
			})
		},
		cancelHover : function () {
			this.hoverRequest && (--this.pending, 0 >= this.pending && (OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait"), this.pending = 0), this.hoverRequest.abort(), this.hoverRequest = null)
		},
		findLayers : function () {
			for (var h = this.layers || this.map.layers, g = [], f, e = h.length - 1; 0 <= e; --e) {
				if (f = h[e], f instanceof OpenLayers.Layer.WMTS && f.requestEncoding === this.requestEncoding && (!this.queryVisible || f.getVisibility())) {
					if (g.push(f), !this.drillDown || this.hover) {
						break
					}
				}
			}
			return g
		},
		buildRequestOptions : function (h, g) {
			var f = this.map.getLonLatFromPixel(g),
			e = h.getURL(new OpenLayers.Bounds(f.lon, f.lat, f.lon, f.lat)),
			e = OpenLayers.Util.getParameters(e),
			f = h.getTileInfo(f);
			OpenLayers.Util.extend(e, {
				service : "WMTS",
				version : h.version,
				request : "GetFeatureInfo",
				infoFormat : this.infoFormat,
				i : f.i,
				j : f.j
			});
			OpenLayers.Util.applyDefaults(e, this.vendorParams);
			return {
				url : OpenLayers.Util.isArray(h.url) ? h.url[0] : h.url,
				params : OpenLayers.Util.upperCaseObject(e),
				callback : function (a) {
					this.handleResponse(g, a, h)
				},
				scope : this
			}
		},
		request : function (l, k) {
			k = k || {};
			var j = this.findLayers();
			if (0 < j.length) {
				for (var i, h, n = 0, m = j.length; n < m; n++) {
					h = j[n],
					i = this.events.triggerEvent("beforegetfeatureinfo", {
							xy : l,
							layer : h
						}),
					!1 !== i && (++this.pending, i = this.buildRequestOptions(h, l), i = OpenLayers.Request.GET(i), !0 === k.hover && (this.hoverRequest = i))
				}
				0 < this.pending && OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait")
			}
		},
		handleResponse : function (l, k, j) {
			--this.pending;
			0 >= this.pending && (OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait"), this.pending = 0);
			if (k.status && (200 > k.status || 300 <= k.status)) {
				this.events.triggerEvent("exception", {
					xy : l,
					request : k,
					layer : j
				})
			} else {
				var i = k.responseXML;
				if (!i || !i.documentElement) {
					i = k.responseText
				}
				var h,
				n;
				try {
					h = this.format.read(i)
				} catch (m) {
					n = !0,
					this.events.triggerEvent("exception", {
						xy : l,
						request : k,
						error : m,
						layer : j
					})
				}
				n || this.events.triggerEvent("getfeatureinfo", {
					text : k.responseText,
					features : h,
					request : k,
					xy : l,
					layer : j
				})
			}
		},
		CLASS_NAME : "OpenLayers.Control.WMTSGetFeatureInfo"
	});
OpenLayers.Strategy.Paging = OpenLayers.Class(OpenLayers.Strategy, {
		features : null,
		length : 10,
		num : null,
		paging : !1,
		activate : function () {
			var b = OpenLayers.Strategy.prototype.activate.call(this);
			if (b) {
				this.layer.events.on({
					beforefeaturesadded : this.cacheFeatures,
					scope : this
				})
			}
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Strategy.prototype.deactivate.call(this);
			b && (this.clearCache(), this.layer.events.un({
					beforefeaturesadded : this.cacheFeatures,
					scope : this
				}));
			return b
		},
		cacheFeatures : function (b) {
			this.paging || (this.clearCache(), this.features = b.features, this.pageNext(b))
		},
		clearCache : function () {
			if (this.features) {
				for (var b = 0; b < this.features.length; ++b) {
					this.features[b].destroy()
				}
			}
			this.num = this.features = null
		},
		pageCount : function () {
			return Math.ceil((this.features ? this.features.length : 0) / this.length)
		},
		pageNum : function () {
			return this.num
		},
		pageLength : function (b) {
			b && 0 < b && (this.length = b);
			return this.length
		},
		pageNext : function (d) {
			var c = !1;
			this.features && (null === this.num && (this.num = -1), c = this.page((this.num + 1) * this.length, d));
			return c
		},
		pagePrevious : function () {
			var b = !1;
			this.features && (null === this.num && (this.num = this.pageCount()), b = this.page((this.num - 1) * this.length));
			return b
		},
		page : function (h, g) {
			var f = !1;
			if (this.features && 0 <= h && h < this.features.length) {
				var e = Math.floor(h / this.length);
				e != this.num && (this.paging = !0, f = this.features.slice(h, h + this.length), this.layer.removeFeatures(this.layer.features), this.num = e, g && g.features ? g.features = f : this.layer.addFeatures(f), this.paging = !1, f = !0)
			}
			return f
		},
		CLASS_NAME : "OpenLayers.Strategy.Paging"
	});
OpenLayers.Protocol.CSW.v2_0_2 = OpenLayers.Class(OpenLayers.Protocol, {
		formatOptions : null,
		initialize : function (b) {
			OpenLayers.Protocol.prototype.initialize.apply(this, [b]);
			b.format || (this.format = new OpenLayers.Format.CSWGetRecords.v2_0_2(OpenLayers.Util.extend({}, this.formatOptions)))
		},
		destroy : function () {
			this.options && !this.options.format && this.format.destroy();
			this.format = null;
			OpenLayers.Protocol.prototype.destroy.apply(this)
		},
		read : function (d) {
			d = OpenLayers.Util.extend({}, d);
			OpenLayers.Util.applyDefaults(d, this.options || {});
			var f = new OpenLayers.Protocol.Response({
					requestType : "read"
				}),
			e = this.format.write(d.params);
			f.priv = OpenLayers.Request.POST({
					url : d.url,
					callback : this.createCallback(this.handleRead, f, d),
					params : d.params,
					headers : d.headers,
					data : e
				});
			return f
		},
		handleRead : function (d, f) {
			if (f.callback) {
				var e = d.priv;
				200 <= e.status && 300 > e.status ? (d.data = this.parseData(e), d.code = OpenLayers.Protocol.Response.SUCCESS) : d.code = OpenLayers.Protocol.Response.FAILURE;
				f.callback.call(f.scope, d)
			}
		},
		parseData : function (d) {
			var c = d.responseXML;
			if (!c || !c.documentElement) {
				c = d.responseText
			}
			return !c || 0 >= c.length ? null : this.format.read(c)
		},
		CLASS_NAME : "OpenLayers.Protocol.CSW.v2_0_2"
	});
OpenLayers.Format.WMSCapabilities.v1_1 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1, {
		readers : {
			wms : OpenLayers.Util.applyDefaults({
				WMT_MS_Capabilities : function (d, c) {
					this.readChildNodes(d, c)
				},
				Keyword : function (d, c) {
					c.keywords && c.keywords.push(this.getChildValue(d))
				},
				DescribeLayer : function (d, c) {
					c.describelayer = {
						formats : []
					};
					this.readChildNodes(d, c.describelayer)
				},
				GetLegendGraphic : function (d, c) {
					c.getlegendgraphic = {
						formats : []
					};
					this.readChildNodes(d, c.getlegendgraphic)
				},
				GetStyles : function (d, c) {
					c.getstyles = {
						formats : []
					};
					this.readChildNodes(d, c.getstyles)
				},
				PutStyles : function (d, c) {
					c.putstyles = {
						formats : []
					};
					this.readChildNodes(d, c.putstyles)
				},
				UserDefinedSymbolization : function (d, f) {
					var e = {
						supportSLD : 1 == parseInt(d.getAttribute("SupportSLD")),
						userLayer : 1 == parseInt(d.getAttribute("UserLayer")),
						userStyle : 1 == parseInt(d.getAttribute("UserStyle")),
						remoteWFS : 1 == parseInt(d.getAttribute("RemoteWFS"))
					};
					f.userSymbols = e
				},
				LatLonBoundingBox : function (d, c) {
					c.llbbox = [parseFloat(d.getAttribute("minx")), parseFloat(d.getAttribute("miny")), parseFloat(d.getAttribute("maxx")), parseFloat(d.getAttribute("maxy"))]
				},
				BoundingBox : function (d, f) {
					var e = OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms.BoundingBox.apply(this, [d, f]);
					e.srs = d.getAttribute("SRS");
					f.bbox[e.srs] = e
				},
				ScaleHint : function (j, i) {
					var h = j.getAttribute("min"),
					g = j.getAttribute("max"),
					l = Math.pow(2, 0.5),
					k = OpenLayers.INCHES_PER_UNIT.m;
					i.maxScale = parseFloat((h / l * k * OpenLayers.DOTS_PER_INCH).toPrecision(13));
					i.minScale = parseFloat((g / l * k * OpenLayers.DOTS_PER_INCH).toPrecision(13))
				},
				Dimension : function (d, f) {
					var e = {
						name : d.getAttribute("name").toLowerCase(),
						units : d.getAttribute("units"),
						unitsymbol : d.getAttribute("unitSymbol")
					};
					f.dimensions[e.name] = e
				},
				Extent : function (h, g) {
					var f = h.getAttribute("name").toLowerCase();
					if (f in g.dimensions) {
						f = g.dimensions[f];
						f.nearestVal = "1" === h.getAttribute("nearestValue");
						f.multipleVal = "1" === h.getAttribute("multipleValues");
						f.current = "1" === h.getAttribute("current");
						f["default"] = h.getAttribute("default") || "";
						var e = this.getChildValue(h);
						f.values = e.split(",")
					}
				}
			}, OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms)
		},
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities.v1_1"
	});
OpenLayers.Control.Graticule = OpenLayers.Class(OpenLayers.Control, {
		autoActivate : !0,
		intervals : [45, 30, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01, 0.005, 0.002, 0.001],
		displayInLayerSwitcher : !0,
		visible : !0,
		numPoints : 50,
		targetSize : 200,
		layerName : null,
		labelled : !0,
		labelFormat : "dm",
		lineSymbolizer : {
			strokeColor : "#333",
			strokeWidth : 1,
			strokeOpacity : 0.5
		},
		labelSymbolizer : {},
		gratLayer : null,
		initialize : function (b) {
			b = b || {};
			b.layerName = b.layerName || OpenLayers.i18n("Graticule");
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.labelSymbolizer.stroke = !1;
			this.labelSymbolizer.fill = !1;
			this.labelSymbolizer.label = "${label}";
			this.labelSymbolizer.labelAlign = "${labelAlign}";
			this.labelSymbolizer.labelXOffset = "${xOffset}";
			this.labelSymbolizer.labelYOffset = "${yOffset}"
		},
		destroy : function () {
			this.deactivate();
			OpenLayers.Control.prototype.destroy.apply(this, arguments);
			this.gratLayer && (this.gratLayer.destroy(), this.gratLayer = null)
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this, arguments);
			if (!this.gratLayer) {
				var b = new OpenLayers.Style({}, {
						rules : [new OpenLayers.Rule({
								symbolizer : {
									Point : this.labelSymbolizer,
									Line : this.lineSymbolizer
								}
							})]
					});
				this.gratLayer = new OpenLayers.Layer.Vector(this.layerName, {
						styleMap : new OpenLayers.StyleMap({
							"default" : b
						}),
						visibility : this.visible,
						displayInLayerSwitcher : this.displayInLayerSwitcher
					})
			}
			return this.div
		},
		activate : function () {
			return OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.map.addLayer(this.gratLayer), this.map.events.register("moveend", this, this.update), this.update(), !0) : !1
		},
		deactivate : function () {
			return OpenLayers.Control.prototype.deactivate.apply(this, arguments) ? (this.map.events.unregister("moveend", this, this.update), this.map.removeLayer(this.gratLayer), !0) : !1
		},
		update : function () {
			var z = this.map.getExtent();
			if (z) {
				this.gratLayer.destroyFeatures();
				var x = new OpenLayers.Projection("EPSG:4326"),
				v = this.map.getProjectionObject(),
				u = this.map.getResolution();
				v.proj && "longlat" == v.proj.projName && (this.numPoints = 1);
				var t = this.map.getCenter(),
				s = new OpenLayers.Pixel(t.lon, t.lat);
				OpenLayers.Projection.transform(s, v, x);
				for (var t = this.targetSize * u, t = t * t, r, u = 0; u < this.intervals.length; ++u) {
					r = this.intervals[u];
					var q = r / 2,
					o = s.offset({
							x : -q,
							y : -q
						}),
					q = s.offset({
							x : q,
							y : q
						});
					OpenLayers.Projection.transform(o, x, v);
					OpenLayers.Projection.transform(q, x, v);
					if ((o.x - q.x) * (o.x - q.x) + (o.y - q.y) * (o.y - q.y) <= t) {
						break
					}
				}
				s.x = Math.floor(s.x / r) * r;
				s.y = Math.floor(s.y / r) * r;
				var u = 0,
				t = [s.clone()],
				q = s.clone(),
				i;
				do {
					q = q.offset({
							x : 0,
							y : r
						}),
					i = OpenLayers.Projection.transform(q.clone(), x, v),
					t.unshift(q)
				} while (z.containsPixel(i) && 1000 > ++u);
				q = s.clone();
				do {
					q = q.offset({
							x : 0,
							y : -r
						}),
					i = OpenLayers.Projection.transform(q.clone(), x, v),
					t.push(q)
				} while (z.containsPixel(i) && 1000 > ++u);
				u = 0;
				o = [s.clone()];
				q = s.clone();
				do {
					q = q.offset({
							x : -r,
							y : 0
						}),
					i = OpenLayers.Projection.transform(q.clone(), x, v),
					o.unshift(q)
				} while (z.containsPixel(i) && 1000 > ++u);
				q = s.clone();
				do {
					q = q.offset({
							x : r,
							y : 0
						}),
					i = OpenLayers.Projection.transform(q.clone(), x, v),
					o.push(q)
				} while (z.containsPixel(i) && 1000 > ++u);
				r = [];
				for (u = 0; u < o.length; ++u) {
					i = o[u].x;
					for (var s = [], B = null, A = Math.min(t[0].y, 90), q = Math.max(t[t.length - 1].y, -90), y = (A - q) / this.numPoints, A = q, q = 0; q <= this.numPoints; ++q) {
						var w = new OpenLayers.Geometry.Point(i, A);
						w.transform(x, v);
						s.push(w);
						A += y;
						w.y >= z.bottom && !B && (B = w)
					}
					this.labelled && (B = new OpenLayers.Geometry.Point(B.x, z.bottom), i = {
							value : i,
							label : this.labelled ? OpenLayers.Util.getFormattedLonLat(i, "lon", this.labelFormat) : "",
							labelAlign : "cb",
							xOffset : 0,
							yOffset : 2
						}, this.gratLayer.addFeatures(new OpenLayers.Feature.Vector(B, i)));
					s = new OpenLayers.Geometry.LineString(s);
					r.push(new OpenLayers.Feature.Vector(s))
				}
				for (q = 0; q < t.length; ++q) {
					if (A = t[q].y, !(-90 > A || 90 < A)) {
						s = [];
						u = o[0].x;
						y = (o[o.length - 1].x - u) / this.numPoints;
						i = u;
						B = null;
						for (u = 0; u <= this.numPoints; ++u) {
							w = new OpenLayers.Geometry.Point(i, A),
							w.transform(x, v),
							s.push(w),
							i += y,
							w.x < z.right && (B = w)
						}
						this.labelled && (B = new OpenLayers.Geometry.Point(z.right, B.y), i = {
								value : A,
								label : this.labelled ? OpenLayers.Util.getFormattedLonLat(A, "lat", this.labelFormat) : "",
								labelAlign : "rb",
								xOffset : -2,
								yOffset : 2
							}, this.gratLayer.addFeatures(new OpenLayers.Feature.Vector(B, i)));
						s = new OpenLayers.Geometry.LineString(s);
						r.push(new OpenLayers.Feature.Vector(s))
					}
				}
				this.gratLayer.addFeatures(r)
			}
		},
		CLASS_NAME : "OpenLayers.Control.Graticule"
	});
OpenLayers.Layer.UTFGrid = OpenLayers.Class(OpenLayers.Layer.XYZ, {
		isBaseLayer : !1,
		projection : new OpenLayers.Projection("EPSG:900913"),
		useJSONP : !1,
		tileClass : OpenLayers.Tile.UTFGrid,
		initialize : function (b) {
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, [b.name, b.url, {}, b]);
			this.tileOptions = OpenLayers.Util.extend({
					utfgridResolution : this.utfgridResolution
				}, this.tileOptions)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.UTFGrid(this.getOptions()));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getFeatureInfo : function (d) {
			var c = null;
			d = this.getTileData(d);
			d.tile && (c = d.tile.getFeatureInfo(d.i, d.j));
			return c
		},
		getFeatureId : function (d) {
			var c = null;
			d = this.getTileData(d);
			d.tile && (c = d.tile.getFeatureId(d.i, d.j));
			return c
		},
		CLASS_NAME : "OpenLayers.Layer.UTFGrid"
	});
OpenLayers.Layer.ArcGISCache = OpenLayers.Class(OpenLayers.Layer.XYZ, {
		url : null,
		tileOrigin : null,
		tileSize : new OpenLayers.Size(256, 256),
		useArcGISServer : !0,
		type : "png",
		useScales : !1,
		overrideDPI : !1,
		initialize : function (r, q, p) {
			OpenLayers.Layer.XYZ.prototype.initialize.apply(this, arguments);
			this.resolutions && (this.serverResolutions = this.resolutions, this.maxExtent = this.getMaxExtentForResolution(this.resolutions[0]));
			if (this.layerInfo) {
				var o = this.layerInfo,
				n = new OpenLayers.Bounds(o.fullExtent.xmin, o.fullExtent.ymin, o.fullExtent.xmax, o.fullExtent.ymax);
				this.projection = "EPSG:" + o.spatialReference.wkid;
				this.sphericalMercator = 102100 == o.spatialReference.wkid;
				this.units = "esriFeet" == o.units ? "ft" : "m";
				if (o.tileInfo) {
					this.tileSize = new OpenLayers.Size(o.tileInfo.width || o.tileInfo.cols, o.tileInfo.height || o.tileInfo.rows);
					this.tileOrigin = new OpenLayers.LonLat(o.tileInfo.origin.x, o.tileInfo.origin.y);
					var m = new OpenLayers.Geometry.Point(n.left, n.top),
					n = new OpenLayers.Geometry.Point(n.right, n.bottom);
					this.useScales ? this.scales = [] : this.resolutions = [];
					this.lods = [];
					for (var l in o.tileInfo.lods) {
						if (o.tileInfo.lods.hasOwnProperty(l)) {
							var k = o.tileInfo.lods[l];
							this.useScales ? this.scales.push(k.scale) : this.resolutions.push(k.resolution);
							var i = this.getContainingTileCoords(m, k.resolution);
							k.startTileCol = i.x;
							k.startTileRow = i.y;
							i = this.getContainingTileCoords(n, k.resolution);
							k.endTileCol = i.x;
							k.endTileRow = i.y;
							this.lods.push(k)
						}
					}
					this.maxExtent = this.calculateMaxExtentWithLOD(this.lods[0]);
					this.serverResolutions = this.resolutions;
					this.overrideDPI && o.tileInfo.dpi && (OpenLayers.DOTS_PER_INCH = o.tileInfo.dpi)
				}
			}
		},
		getContainingTileCoords : function (d, c) {
			return new OpenLayers.Pixel(Math.max(Math.floor((d.x - this.tileOrigin.lon) / (this.tileSize.w * c)), 0), Math.max(Math.floor((this.tileOrigin.lat - d.y) / (this.tileSize.h * c)), 0))
		},
		calculateMaxExtentWithLOD : function (d) {
			var f = this.tileOrigin.lon + d.startTileCol * this.tileSize.w * d.resolution,
			e = this.tileOrigin.lat - d.startTileRow * this.tileSize.h * d.resolution;
			return new OpenLayers.Bounds(f, e - (d.endTileRow - d.startTileRow + 1) * this.tileSize.h * d.resolution, f + (d.endTileCol - d.startTileCol + 1) * this.tileSize.w * d.resolution, e)
		},
		calculateMaxExtentWithExtent : function (h, g) {
			var f = new OpenLayers.Geometry.Point(h.left, h.top),
			e = new OpenLayers.Geometry.Point(h.right, h.bottom),
			f = this.getContainingTileCoords(f, g),
			e = this.getContainingTileCoords(e, g);
			return this.calculateMaxExtentWithLOD({
				resolution : g,
				startTileCol : f.x,
				startTileRow : f.y,
				endTileCol : e.x,
				endTileRow : e.y
			})
		},
		getUpperLeftTileCoord : function (d) {
			var c = new OpenLayers.Geometry.Point(this.maxExtent.left, this.maxExtent.top);
			return this.getContainingTileCoords(c, d)
		},
		getLowerRightTileCoord : function (d) {
			var c = new OpenLayers.Geometry.Point(this.maxExtent.right, this.maxExtent.bottom);
			return this.getContainingTileCoords(c, d)
		},
		getMaxExtentForResolution : function (i) {
			var h = this.getUpperLeftTileCoord(i),
			g = this.getLowerRightTileCoord(i),
			f = this.tileOrigin.lon + h.x * this.tileSize.w * i,
			j = this.tileOrigin.lat - h.y * this.tileSize.h * i;
			return new OpenLayers.Bounds(f, j - (g.y - h.y + 1) * this.tileSize.h * i, f + (g.x - h.x + 1) * this.tileSize.w * i, j)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.ArcGISCache(this.name, this.url, this.options));
			return OpenLayers.Layer.XYZ.prototype.clone.apply(this, [b])
		},
		getMaxExtent : function () {
			var b = this.map.getResolution();
			return this.maxExtent = this.getMaxExtentForResolution(b)
		},
		getTileOrigin : function () {
			var b = this.getMaxExtent();
			return new OpenLayers.LonLat(b.left, b.bottom)
		},
		getURL : function (i) {
			var h = this.getResolution(),
			g = this.tileOrigin.lon + h * this.tileSize.w / 2,
			f = this.tileOrigin.lat - h * this.tileSize.h / 2;
			i = i.getCenterLonLat();
			g = Math.round(Math.abs((i.lon - g) / (h * this.tileSize.w)));
			f = Math.round(Math.abs((f - i.lat) / (h * this.tileSize.h)));
			i = this.map.getZoom();
			if (this.lods) {
				if (h = this.lods[this.map.getZoom()], g < h.startTileCol || g > h.endTileCol || f < h.startTileRow || f > h.endTileRow) {
					return null
				}
			} else {
				var j = this.getUpperLeftTileCoord(h),
				h = this.getLowerRightTileCoord(h);
				if (g < j.x || g >= h.x || f < j.y || f >= h.y) {
					return null
				}
			}
			h = this.url;
			j = "" + g + f + i;
			OpenLayers.Util.isArray(h) && (h = this.selectUrl(j, h));
			this.useArcGISServer ? h += "/tile/${z}/${y}/${x}" : (g = "C" + this.zeroPad(g, 8, 16), f = "R" + this.zeroPad(f, 8, 16), i = "L" + this.zeroPad(i, 2, 16), h = h + "/${z}/${y}/${x}." + this.type);
			h = OpenLayers.String.format(h, {
					x : g,
					y : f,
					z : i
				});
			return OpenLayers.Util.urlAppend(h, OpenLayers.Util.getParameterString(this.params))
		},
		zeroPad : function (d, f, e) {
			for (d = d.toString(e || 10); d.length < f; ) {
				d = "0" + d
			}
			return d
		},
		CLASS_NAME : "OpenLayers.Layer.ArcGISCache"
	});
OpenLayers.Control.WMSGetFeatureInfo = OpenLayers.Class(OpenLayers.Control, {
		hover : !1,
		drillDown : !1,
		maxFeatures : 10,
		clickCallback : "click",
		output : "features",
		layers : null,
		queryVisible : !1,
		url : null,
		layerUrls : null,
		infoFormat : "text/html",
		vendorParams : {},
		format : null,
		formatOptions : null,
		handlerOptions : null,
		handler : null,
		hoverRequest : null,
		initialize : function (b) {
			b = b || {};
			b.handlerOptions = b.handlerOptions || {};
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.format || (this.format = new OpenLayers.Format.WMSGetFeatureInfo(b.formatOptions));
			!0 === this.drillDown && (this.hover = !1);
			this.hover ? this.handler = new OpenLayers.Handler.Hover(this, {
					move : this.cancelHover,
					pause : this.getInfoForHover
				}, OpenLayers.Util.extend(this.handlerOptions.hover || {}, {
						delay : 250
					})) : (b = {}, b[this.clickCallback] = this.getInfoForClick, this.handler = new OpenLayers.Handler.Click(this, b, this.handlerOptions.click || {}))
		},
		getInfoForClick : function (b) {
			this.events.triggerEvent("beforegetfeatureinfo", {
				xy : b.xy
			});
			OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
			this.request(b.xy, {})
		},
		getInfoForHover : function (b) {
			this.events.triggerEvent("beforegetfeatureinfo", {
				xy : b.xy
			});
			this.request(b.xy, {
				hover : !0
			})
		},
		cancelHover : function () {
			this.hoverRequest && (this.hoverRequest.abort(), this.hoverRequest = null)
		},
		findLayers : function () {
			for (var i = this.layers || this.map.layers, h = [], g, f, j = i.length - 1; 0 <= j; --j) {
				if (g = i[j], g instanceof OpenLayers.Layer.WMS && (!this.queryVisible || g.getVisibility())) {
					f = OpenLayers.Util.isArray(g.url) ? g.url[0] : g.url,
					!1 === this.drillDown && !this.url && (this.url = f),
					(!0 === this.drillDown || this.urlMatches(f)) && h.push(g)
				}
			}
			return h
		},
		urlMatches : function (h) {
			var g = OpenLayers.Util.isEquivalentUrl(this.url, h);
			if (!g && this.layerUrls) {
				for (var f = 0, e = this.layerUrls.length; f < e; ++f) {
					if (OpenLayers.Util.isEquivalentUrl(this.layerUrls[f], h)) {
						g = !0;
						break
					}
				}
			}
			return g
		},
		buildWMSOptions : function (o, n, m, l) {
			for (var k = [], j = [], i = 0, p = n.length; i < p; i++) {
				null != n[i].params.LAYERS && (k = k.concat(n[i].params.LAYERS), j = j.concat(this.getStyleNames(n[i])))
			}
			n = n[0];
			i = this.map.getProjection();
			(p = n.projection) && p.equals(this.map.getProjectionObject()) && (i = p.getCode());
			l = OpenLayers.Util.extend({
					service : "WMS",
					version : n.params.VERSION,
					request : "GetFeatureInfo",
					exceptions : n.params.EXCEPTIONS,
					bbox : this.map.getExtent().toBBOX(null, n.reverseAxisOrder()),
					feature_count : this.maxFeatures,
					height : this.map.getSize().h,
					width : this.map.getSize().w,
					format : l,
					info_format : n.params.INFO_FORMAT || this.infoFormat
				}, 1.3 <= parseFloat(n.params.VERSION) ? {
					crs : i,
					i : parseInt(m.x),
					j : parseInt(m.y)
				}
					 : {
					srs : i,
					x : parseInt(m.x),
					y : parseInt(m.y)
				});
			0 != k.length && (l = OpenLayers.Util.extend({
						layers : k,
						query_layers : k,
						styles : j
					}, l));
			OpenLayers.Util.applyDefaults(l, this.vendorParams);
			return {
				url : o,
				params : OpenLayers.Util.upperCaseObject(l),
				callback : function (a) {
					this.handleResponse(m, a, o)
				},
				scope : this
			}
		},
		getStyleNames : function (b) {
			return b.params.STYLES ? b.params.STYLES : OpenLayers.Util.isArray(b.params.LAYERS) ? Array(b.params.LAYERS.length) : b.params.LAYERS.replace(/[^,]/g, "")
		},
		request : function (o, n) {
			var m = this.findLayers();
			if (0 == m.length) {
				this.events.triggerEvent("nogetfeatureinfo"),
				OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait")
			} else {
				if (n = n || {}, !1 === this.drillDown) {
					var m = this.buildWMSOptions(this.url, m, o, m[0].params.FORMAT),
					l = OpenLayers.Request.GET(m);
					!0 === n.hover && (this.hoverRequest = l)
				} else {
					this._numRequests = this._requestCount = 0;
					this.features = [];
					for (var l = {}, k, j = 0, i = m.length; j < i; j++) {
						var p = m[j];
						k = OpenLayers.Util.isArray(p.url) ? p.url[0] : p.url;
						k in l ? l[k].push(p) : (this._numRequests++, l[k] = [p])
					}
					for (k in l) {
						m = l[k],
						m = this.buildWMSOptions(k, m, o, m[0].params.FORMAT),
						OpenLayers.Request.GET(m)
					}
				}
			}
		},
		triggerGetFeatureInfo : function (d, f, e) {
			this.events.triggerEvent("getfeatureinfo", {
				text : d.responseText,
				features : e,
				request : d,
				xy : f
			});
			OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait")
		},
		handleResponse : function (h, g, f) {
			var e = g.responseXML;
			if (!e || !e.documentElement) {
				e = g.responseText
			}
			e = this.format.read(e);
			!1 === this.drillDown ? this.triggerGetFeatureInfo(g, h, e) : (this._requestCount++, this._features = "object" === this.output ? (this._features || []).concat({
						url : f,
						features : e
					}) : (this._features || []).concat(e), this._requestCount === this._numRequests && (this.triggerGetFeatureInfo(g, h, this._features.concat()), delete this._features, delete this._requestCount, delete this._numRequests))
		},
		CLASS_NAME : "OpenLayers.Control.WMSGetFeatureInfo"
	});
OpenLayers.Format.WMSCapabilities.v1_3_0 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_3, {
		version : "1.3.0",
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities.v1_3_0"
	});
OpenLayers.Format.SOSGetFeatureOfInterest = OpenLayers.Class(OpenLayers.Format.XML, {
		VERSION : "1.0.0",
		namespaces : {
			sos : "http://www.opengis.net/sos/1.0",
			gml : "http://www.opengis.net/gml",
			sa : "http://www.opengis.net/sampling/1.0",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		schemaLocation : "http://www.opengis.net/sos/1.0 http://schemas.opengis.net/sos/1.0.0/sosAll.xsd",
		defaultPrefix : "sos",
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		read : function (i) {
			"string" == typeof i && (i = OpenLayers.Format.XML.prototype.read.apply(this, [i]));
			i && 9 == i.nodeType && (i = i.documentElement);
			var h = {
				features : []
			};
			this.readNode(i, h);
			i = [];
			for (var g = 0, f = h.features.length; g < f; g++) {
				var j = h.features[g];
				this.internalProjection && (this.externalProjection && j.components[0]) && j.components[0].transform(this.externalProjection, this.internalProjection);
				j = new OpenLayers.Feature.Vector(j.components[0], j.attributes);
				i.push(j)
			}
			return i
		},
		readers : {
			sa : {
				SamplingPoint : function (d, f) {
					if (!f.attributes) {
						var e = {
							attributes : {}

						};
						f.features.push(e);
						f = e
					}
					f.attributes.id = this.getAttributeNS(d, this.namespaces.gml, "id");
					this.readChildNodes(d, f)
				},
				position : function (d, c) {
					this.readChildNodes(d, c)
				}
			},
			gml : OpenLayers.Util.applyDefaults({
				FeatureCollection : function (d, c) {
					this.readChildNodes(d, c)
				},
				featureMember : function (d, f) {
					var e = {
						attributes : {}

					};
					f.features.push(e);
					this.readChildNodes(d, e)
				},
				name : function (d, c) {
					c.attributes.name = this.getChildValue(d)
				},
				pos : function (d, c) {
					this.externalProjection || (this.externalProjection = new OpenLayers.Projection(d.getAttribute("srsName")));
					OpenLayers.Format.GML.v3.prototype.readers.gml.pos.apply(this, [d, c])
				}
			}, OpenLayers.Format.GML.v3.prototype.readers.gml)
		},
		writers : {
			sos : {
				GetFeatureOfInterest : function (h) {
					for (var g = this.createElementNSPlus("GetFeatureOfInterest", {
								attributes : {
									version : this.VERSION,
									service : "SOS",
									"xsi:schemaLocation" : this.schemaLocation
								}
							}), f = 0, e = h.fois.length; f < e; f++) {
						this.writeNode("FeatureOfInterestId", {
							foi : h.fois[f]
						}, g)
					}
					return g
				},
				FeatureOfInterestId : function (b) {
					return this.createElementNSPlus("FeatureOfInterestId", {
						value : b.foi
					})
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.SOSGetFeatureOfInterest"
	});
OpenLayers.Format.SOSGetObservation = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			ows : "http://www.opengis.net/ows",
			gml : "http://www.opengis.net/gml",
			sos : "http://www.opengis.net/sos/1.0",
			ogc : "http://www.opengis.net/ogc",
			om : "http://www.opengis.net/om/1.0",
			sa : "http://www.opengis.net/sampling/1.0",
			xlink : "http://www.w3.org/1999/xlink",
			xsi : "http://www.w3.org/2001/XMLSchema-instance"
		},
		regExes : {
			trimSpace : /^\s*|\s*$/g,
			removeSpace : /\s*/g,
			splitSpace : /\s+/,
			trimComma : /\s*,\s*/g
		},
		VERSION : "1.0.0",
		schemaLocation : "http://www.opengis.net/sos/1.0 http://schemas.opengis.net/sos/1.0.0/sosGetObservation.xsd",
		defaultPrefix : "sos",
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {
				measurements : [],
				observations : []
			};
			this.readNode(d, c);
			return c
		},
		write : function (b) {
			b = this.writeNode("sos:GetObservation", b);
			b.setAttribute("xmlns:om", this.namespaces.om);
			b.setAttribute("xmlns:ogc", this.namespaces.ogc);
			this.setAttributeNS(b, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
			return OpenLayers.Format.XML.prototype.write.apply(this, [b])
		},
		readers : {
			om : {
				ObservationCollection : function (d, c) {
					c.id = this.getAttributeNS(d, this.namespaces.gml, "id");
					this.readChildNodes(d, c)
				},
				member : function (d, c) {
					this.readChildNodes(d, c)
				},
				Measurement : function (d, f) {
					var e = {};
					f.measurements.push(e);
					this.readChildNodes(d, e)
				},
				Observation : function (d, f) {
					var e = {};
					f.observations.push(e);
					this.readChildNodes(d, e)
				},
				samplingTime : function (d, f) {
					var e = {};
					f.samplingTime = e;
					this.readChildNodes(d, e)
				},
				observedProperty : function (d, c) {
					c.observedProperty = this.getAttributeNS(d, this.namespaces.xlink, "href");
					this.readChildNodes(d, c)
				},
				procedure : function (d, c) {
					c.procedure = this.getAttributeNS(d, this.namespaces.xlink, "href");
					this.readChildNodes(d, c)
				},
				featureOfInterest : function (l, k) {
					var j = {
						features : []
					};
					k.fois = [];
					k.fois.push(j);
					this.readChildNodes(l, j);
					for (var i = [], h = 0, n = j.features.length; h < n; h++) {
						var m = j.features[h];
						i.push(new OpenLayers.Feature.Vector(m.components[0], m.attributes))
					}
					j.features = i
				},
				result : function (d, f) {
					var e = {};
					f.result = e;
					"" !== this.getChildValue(d) ? (e.value = this.getChildValue(d), e.uom = d.getAttribute("uom")) : this.readChildNodes(d, e)
				}
			},
			sa : OpenLayers.Format.SOSGetFeatureOfInterest.prototype.readers.sa,
			gml : OpenLayers.Util.applyDefaults({
				TimeInstant : function (d, f) {
					var e = {};
					f.timeInstant = e;
					this.readChildNodes(d, e)
				},
				timePosition : function (d, c) {
					c.timePosition = this.getChildValue(d)
				}
			}, OpenLayers.Format.SOSGetFeatureOfInterest.prototype.readers.gml)
		},
		writers : {
			sos : {
				GetObservation : function (h) {
					var g = this.createElementNSPlus("GetObservation", {
							attributes : {
								version : this.VERSION,
								service : "SOS"
							}
						});
					this.writeNode("offering", h, g);
					h.eventTime && this.writeNode("eventTime", h, g);
					for (var f in h.procedures) {
						this.writeNode("procedure", h.procedures[f], g)
					}
					for (var e in h.observedProperties) {
						this.writeNode("observedProperty", h.observedProperties[e], g)
					}
					h.foi && this.writeNode("featureOfInterest", h.foi, g);
					this.writeNode("responseFormat", h, g);
					h.resultModel && this.writeNode("resultModel", h, g);
					h.responseMode && this.writeNode("responseMode", h, g);
					return g
				},
				featureOfInterest : function (d) {
					var c = this.createElementNSPlus("featureOfInterest");
					this.writeNode("ObjectID", d.objectId, c);
					return c
				},
				ObjectID : function (b) {
					return this.createElementNSPlus("ObjectID", {
						value : b
					})
				},
				responseFormat : function (b) {
					return this.createElementNSPlus("responseFormat", {
						value : b.responseFormat
					})
				},
				procedure : function (b) {
					return this.createElementNSPlus("procedure", {
						value : b
					})
				},
				offering : function (b) {
					return this.createElementNSPlus("offering", {
						value : b.offering
					})
				},
				observedProperty : function (b) {
					return this.createElementNSPlus("observedProperty", {
						value : b
					})
				},
				eventTime : function (d) {
					var c = this.createElementNSPlus("eventTime");
					"latest" === d.eventTime && this.writeNode("ogc:TM_Equals", d, c);
					return c
				},
				resultModel : function (b) {
					return this.createElementNSPlus("resultModel", {
						value : b.resultModel
					})
				},
				responseMode : function (b) {
					return this.createElementNSPlus("responseMode", {
						value : b.responseMode
					})
				}
			},
			ogc : {
				TM_Equals : function (d) {
					var c = this.createElementNSPlus("ogc:TM_Equals");
					this.writeNode("ogc:PropertyName", {
						property : "urn:ogc:data:time:iso8601"
					}, c);
					"latest" === d.eventTime && this.writeNode("gml:TimeInstant", {
						value : "latest"
					}, c);
					return c
				},
				PropertyName : function (b) {
					return this.createElementNSPlus("ogc:PropertyName", {
						value : b.property
					})
				}
			},
			gml : {
				TimeInstant : function (d) {
					var c = this.createElementNSPlus("gml:TimeInstant");
					this.writeNode("gml:timePosition", d, c);
					return c
				},
				timePosition : function (b) {
					return this.createElementNSPlus("gml:timePosition", {
						value : b.value
					})
				}
			}
		},
		CLASS_NAME : "OpenLayers.Format.SOSGetObservation"
	});
OpenLayers.Control.UTFGrid = OpenLayers.Class(OpenLayers.Control, {
		autoActivate : !0,
		layers : null,
		defaultHandlerOptions : {
			delay : 300,
			pixelTolerance : 4,
			stopMove : !1,
			single : !0,
			"double" : !1,
			stopSingle : !1,
			stopDouble : !1
		},
		handlerMode : "click",
		setHandler : function (b) {
			this.handlerMode = b;
			this.resetHandler()
		},
		resetHandler : function () {
			this.handler && (this.handler.deactivate(), this.handler.destroy(), this.handler = null);
			"hover" == this.handlerMode ? this.handler = new OpenLayers.Handler.Hover(this, {
					pause : this.handleEvent,
					move : this.reset
				}, this.handlerOptions) : "click" == this.handlerMode ? this.handler = new OpenLayers.Handler.Click(this, {
					click : this.handleEvent
				}, this.handlerOptions) : "move" == this.handlerMode && (this.handler = new OpenLayers.Handler.Hover(this, {
							pause : this.handleEvent,
							move : this.handleEvent
						}, this.handlerOptions));
			return this.handler ? !0 : !1
		},
		initialize : function (b) {
			b = b || {};
			b.handlerOptions = b.handlerOptions || this.defaultHandlerOptions;
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.resetHandler()
		},
		handleEvent : function (o) {
			if (null == o) {
				this.reset()
			} else {
				var n = this.map.getLonLatFromPixel(o.xy);
				if (n) {
					var m = this.findLayers();
					if (0 < m.length) {
						for (var l = {}, k, j, i = 0, p = m.length; i < p; i++) {
							k = m[i],
							j = OpenLayers.Util.indexOf(this.map.layers, k),
							l[j] = k.getFeatureInfo(n)
						}
						this.callback(l, n, o.xy)
					}
				}
			}
		},
		callback : function () {},
		reset : function () {
			this.callback(null)
		},
		findLayers : function () {
			for (var h = this.layers || this.map.layers, g = [], f, e = h.length - 1; 0 <= e; --e) {
				f = h[e],
				f instanceof OpenLayers.Layer.UTFGrid && g.push(f)
			}
			return g
		},
		CLASS_NAME : "OpenLayers.Control.UTFGrid"
	});
OpenLayers.Format.CQL = function () {
	var o = {
		PROPERTY : /^[_a-zA-Z]\w*/,
		COMPARISON : /^(=|<>|<=|<|>=|>|LIKE)/i,
		COMMA : /^,/,
		LOGICAL : /^(AND|OR)/i,
		VALUE : /^('\w+'|\d+(\.\d*)?|\.\d+)/,
		LPAREN : /^\(/,
		RPAREN : /^\)/,
		SPATIAL : /^(BBOX|INTERSECTS|DWITHIN|WITHIN|CONTAINS)/i,
		NOT : /^NOT/i,
		BETWEEN : /^BETWEEN/i,
		GEOMETRY : function (b) {
			var a = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)/.exec(b);
			if (a) {
				var d = b.length,
				a = b.indexOf("(", a[0].length);
				if (-1 < a) {
					for (var c = 1; a < d && 0 < c; ) {
						switch (a++, b.charAt(a)) {
						case "(":
							c++;
							break;
						case ")":
							c--
						}
					}
				}
				return [b.substr(0, a + 1)]
			}
		},
		END : /^$/
	},
	n = {
		LPAREN : ["GEOMETRY", "SPATIAL", "PROPERTY", "VALUE", "LPAREN"],
		RPAREN : ["NOT", "LOGICAL", "END", "RPAREN"],
		PROPERTY : ["COMPARISON", "BETWEEN", "COMMA"],
		BETWEEN : ["VALUE"],
		COMPARISON : ["VALUE"],
		COMMA : ["GEOMETRY", "VALUE", "PROPERTY"],
		VALUE : ["LOGICAL", "COMMA", "RPAREN", "END"],
		SPATIAL : ["LPAREN"],
		LOGICAL : ["NOT", "VALUE", "SPATIAL", "PROPERTY", "LPAREN"],
		NOT : ["PROPERTY", "LPAREN"],
		GEOMETRY : ["COMMA", "RPAREN"]
	},
	m = {
		"=" : OpenLayers.Filter.Comparison.EQUAL_TO,
		"<>" : OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
		"<" : OpenLayers.Filter.Comparison.LESS_THAN,
		"<=" : OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
		">" : OpenLayers.Filter.Comparison.GREATER_THAN,
		">=" : OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
		LIKE : OpenLayers.Filter.Comparison.LIKE,
		BETWEEN : OpenLayers.Filter.Comparison.BETWEEN
	},
	l = {},
	k = {
		AND : OpenLayers.Filter.Logical.AND,
		OR : OpenLayers.Filter.Logical.OR
	},
	j = {},
	i = {
		RPAREN : 3,
		LOGICAL : 2,
		COMPARISON : 1
	},
	p;
	for (p in m) {
		m.hasOwnProperty(p) && (l[m[p]] = p)
	}
	for (p in k) {
		k.hasOwnProperty(p) && (j[k[p]] = p)
	}
	return OpenLayers.Class(OpenLayers.Format, {
		read : function (c) {
			var b = c;
			c = [];
			var a,
			r = ["NOT", "GEOMETRY", "SPATIAL", "PROPERTY", "LPAREN"];
			do {
				o : {
					a = r;
					for (var h = void 0, r = void 0, g = a.length, h = 0; h < g; h++) {
						var r = a[h],
						f = o[r]instanceof RegExp ? o[r].exec(b) : (0, o[r])(b);
						if (f) {
							a = f[0];
							b = b.substr(a.length).replace(/^\s*/, "");
							a = {
								type : r,
								text : a,
								remainder : b
							};
							break o
						}
					}
					c = "ERROR: In parsing: [" + b + "], expected one of: ";
					for (h = 0; h < g; h++) {
						r = a[h],
						c += "\n    " + r + ": " + o[r]
					}
					throw Error(c)
				}
				b = a.remainder;
				r = n[a.type];
				if ("END" != a.type && !r) {
					throw Error("No follows list for " + a.type)
				}
				c.push(a)
			} while ("END" != a.type);
			for (var e = function () {
				var A = d.pop();
				switch (A.type) {
				case "LOGICAL":
					var s = e(),
					z = e();
					return new OpenLayers.Filter.Logical({
						filters : [z, s],
						type : k[A.text.toUpperCase()]
					});
				case "NOT":
					return s = e(),
					new OpenLayers.Filter.Logical({
						filters : [s],
						type : OpenLayers.Filter.Logical.NOT
					});
				case "BETWEEN":
					return d.pop(),
					z = e(),
					A = e(),
					s = e(),
					new OpenLayers.Filter.Comparison({
						property : s,
						lowerBoundary : A,
						upperBoundary : z,
						type : OpenLayers.Filter.Comparison.BETWEEN
					});
				case "COMPARISON":
					return z = e(),
					s = e(),
					new OpenLayers.Filter.Comparison({
						property : s,
						value : z,
						type : m[A.text.toUpperCase()]
					});
				case "VALUE":
					return /^'.*'$/.test(A.text) ? A.text.substr(1, A.text.length - 2) : Number(A.text);
				case "SPATIAL":
					switch (A.text.toUpperCase()) {
					case "BBOX":
						var s = e(),
						A = e(),
						z = e(),
						x = e(),
						q = e();
						return new OpenLayers.Filter.Spatial({
							type : OpenLayers.Filter.Spatial.BBOX,
							property : q,
							value : OpenLayers.Bounds.fromArray([x, z, A, s])
						});
					case "INTERSECTS":
						return z = e(),
						s = e(),
						new OpenLayers.Filter.Spatial({
							type : OpenLayers.Filter.Spatial.INTERSECTS,
							property : s,
							value : z
						});
					case "WITHIN":
						return z = e(),
						s = e(),
						new OpenLayers.Filter.Spatial({
							type : OpenLayers.Filter.Spatial.WITHIN,
							property : s,
							value : z
						});
					case "CONTAINS":
						return z = e(),
						s = e(),
						new OpenLayers.Filter.Spatial({
							type : OpenLayers.Filter.Spatial.CONTAINS,
							property : s,
							value : z
						});
					case "DWITHIN":
						return A = e(),
						z = e(),
						s = e(),
						new OpenLayers.Filter.Spatial({
							type : OpenLayers.Filter.Spatial.DWITHIN,
							value : z,
							property : s,
							distance : Number(A)
						})
					}
				case "GEOMETRY":
					return OpenLayers.Geometry.fromWKT(A.text);
				default:
					return A.text
				}
			}, r = [], d = []; c.length; ) {
				switch (b = c.shift(), b.type) {
				case "PROPERTY":
				case "GEOMETRY":
				case "VALUE":
					d.push(b);
					break;
				case "COMPARISON":
				case "BETWEEN":
				case "LOGICAL":
					for (a = i[b.type]; 0 < r.length && i[r[r.length - 1].type] <= a; ) {
						d.push(r.pop())
					}
					r.push(b);
					break;
				case "SPATIAL":
				case "NOT":
				case "LPAREN":
					r.push(b);
					break;
				case "RPAREN":
					for (; 0 < r.length && "LPAREN" != r[r.length - 1].type; ) {
						d.push(r.pop())
					}
					r.pop();
					0 < r.length && "SPATIAL" == r[r.length - 1].type && d.push(r.pop());
				case "COMMA":
				case "END":
					break;
				default:
					throw Error("Unknown token type " + b.type)
				}
			}
			for (; 0 < r.length; ) {
				d.push(r.pop())
			}
			c = e();
			if (0 < d.length) {
				c = "Remaining tokens after building AST: \n";
				for (r = d.length - 1; 0 <= r; r--) {
					c += d[r].type + ": " + d[r].text + "\n"
				}
				throw Error(c)
			}
			this.keepData && (this.data = c);
			return c
		},
		write : function (b) {
			if (b instanceof OpenLayers.Geometry) {
				return b.toString()
			}
			switch (b.CLASS_NAME) {
			case "OpenLayers.Filter.Spatial":
				switch (b.type) {
				case OpenLayers.Filter.Spatial.BBOX:
					return "BBOX(" + b.property + "," + b.value.toBBOX() + ")";
				case OpenLayers.Filter.Spatial.DWITHIN:
					return "DWITHIN(" + b.property + ", " + this.write(b.value) + ", " + b.distance + ")";
				case OpenLayers.Filter.Spatial.WITHIN:
					return "WITHIN(" + b.property + ", " + this.write(b.value) + ")";
				case OpenLayers.Filter.Spatial.INTERSECTS:
					return "INTERSECTS(" + b.property + ", " + this.write(b.value) + ")";
				case OpenLayers.Filter.Spatial.CONTAINS:
					return "CONTAINS(" + b.property + ", " + this.write(b.value) + ")";
				default:
					throw Error("Unknown spatial filter type: " + b.type)
				}
			case "OpenLayers.Filter.Logical":
				if (b.type == OpenLayers.Filter.Logical.NOT) {
					return "NOT (" + this.write(b.filters[0]) + ")"
				}
				for (var a = "(", d = !0, c = 0; c < b.filters.length; c++) {
					d ? d = !1 : a += ") " + j[b.type] + " (",
					a += this.write(b.filters[c])
				}
				return a + ")";
			case "OpenLayers.Filter.Comparison":
				return b.type == OpenLayers.Filter.Comparison.BETWEEN ? b.property + " BETWEEN " + this.write(b.lowerBoundary) + " AND " + this.write(b.upperBoundary) : b.property + " " + l[b.type] + " " + this.write(b.value);
			case void 0:
				if ("string" === typeof b) {
					return "'" + b + "'"
				}
				if ("number" === typeof b) {
					return String(b)
				}
			default:
				throw Error("Can't encode: " + b.CLASS_NAME + " " + b)
			}
		},
		CLASS_NAME : "OpenLayers.Format.CQL"
	})
}
();
OpenLayers.Control.Split = OpenLayers.Class(OpenLayers.Control, {
		layer : null,
		source : null,
		sourceOptions : null,
		tolerance : null,
		edge : !0,
		deferDelete : !1,
		mutual : !0,
		targetFilter : null,
		sourceFilter : null,
		handler : null,
		initialize : function (b) {
			OpenLayers.Control.prototype.initialize.apply(this, [b]);
			this.options = b || {};
			this.options.source && this.setSource(this.options.source)
		},
		setSource : function (b) {
			this.active ? (this.deactivate(), this.handler && (this.handler.destroy(), delete this.handler), this.source = b, this.activate()) : this.source = b
		},
		activate : function () {
			var b = OpenLayers.Control.prototype.activate.call(this);
			if (b) {
				if (this.source) {
					if (this.source.events) {
						this.source.events.on({
							sketchcomplete : this.onSketchComplete,
							afterfeaturemodified : this.afterFeatureModified,
							scope : this
						})
					}
				} else {
					this.handler || (this.handler = new OpenLayers.Handler.Path(this, {
								done : function (a) {
									this.onSketchComplete({
										feature : new OpenLayers.Feature.Vector(a)
									})
								}
							}, {
								layerOptions : this.sourceOptions
							})),
					this.handler.activate()
				}
			}
			return b
		},
		deactivate : function () {
			var b = OpenLayers.Control.prototype.deactivate.call(this);
			b && this.source && this.source.events && this.layer.events.un({
				sketchcomplete : this.onSketchComplete,
				afterfeaturemodified : this.afterFeatureModified,
				scope : this
			});
			return b
		},
		onSketchComplete : function (b) {
			this.feature = null;
			return !this.considerSplit(b.feature)
		},
		afterFeatureModified : function (b) {
			b.modified && "function" === typeof b.feature.geometry.split && (this.feature = b.feature, this.considerSplit(b.feature))
		},
		removeByGeometry : function (h, g) {
			for (var f = 0, e = h.length; f < e; ++f) {
				if (h[f].geometry === g) {
					h.splice(f, 1);
					break
				}
			}
		},
		isEligible : function (b) {
			return b.geometry ? b.state !== OpenLayers.State.DELETE && "function" === typeof b.geometry.split && this.feature !== b && (!this.targetFilter || this.targetFilter.evaluate(b.attributes)) : !1
		},
		considerSplit : function (I) {
			var G = !1,
			E = !1;
			if (!this.sourceFilter || this.sourceFilter.evaluate(I.attributes)) {
				for (var C = this.layer && this.layer.features || [], A, y, x = [], w = [], v = this.layer === this.source && this.mutual, u = {
						edge : this.edge,
						tolerance : this.tolerance,
						mutual : v
					}, J = [I.geometry], H, F, D, B = 0, z = C.length; B < z; ++B) {
					if (H = C[B], this.isEligible(H)) {
						F = [H.geometry];
						for (var o = 0; o < J.length; ++o) {
							D = J[o];
							for (var i = 0; i < F.length; ++i) {
								if (A = F[i], D.getBounds().intersectsBounds(A.getBounds()) && (A = D.split(A, u))) {
									y = this.events.triggerEvent("beforesplit", {
											source : I,
											target : H
										}),
									!1 !== y && (v && (y = A[0], 1 < y.length && (y.unshift(o, 1), Array.prototype.splice.apply(J, y), o += y.length - 3), A = A[1]), 1 < A.length && (A.unshift(i, 1), Array.prototype.splice.apply(F, A), i += A.length - 3))
								}
							}
						}
						F && 1 < F.length && (this.geomsToFeatures(H, F), this.events.triggerEvent("split", {
								original : H,
								features : F
							}), Array.prototype.push.apply(x, F), w.push(H), E = !0)
					}
				}
				J && 1 < J.length && (this.geomsToFeatures(I, J), this.events.triggerEvent("split", {
						original : I,
						features : J
					}), Array.prototype.push.apply(x, J), w.push(I), G = !0);
				if (G || E) {
					if (this.deferDelete) {
						C = [];
						B = 0;
						for (z = w.length; B < z; ++B) {
							E = w[B],
							E.state === OpenLayers.State.INSERT ? C.push(E) : (E.state = OpenLayers.State.DELETE, this.layer.drawFeature(E))
						}
						this.layer.destroyFeatures(C, {
							silent : !0
						});
						B = 0;
						for (z = x.length; B < z; ++B) {
							x[B].state = OpenLayers.State.INSERT
						}
					} else {
						this.layer.destroyFeatures(w, {
							silent : !0
						})
					}
					this.layer.addFeatures(x, {
						silent : !0
					});
					this.events.triggerEvent("aftersplit", {
						source : I,
						features : x
					})
				}
			}
			return G
		},
		geomsToFeatures : function (j, i) {
			var h = j.clone();
			delete h.geometry;
			for (var g, l = 0, k = i.length; l < k; ++l) {
				g = h.clone(),
				g.geometry = i[l],
				g.state = OpenLayers.State.INSERT,
				i[l] = g
			}
		},
		destroy : function () {
			this.active && this.deactivate();
			OpenLayers.Control.prototype.destroy.call(this)
		},
		CLASS_NAME : "OpenLayers.Control.Split"
	});
OpenLayers.Layer.WMTS = OpenLayers.Class(OpenLayers.Layer.Grid, {
		isBaseLayer : !0,
		version : "1.0.0",
		requestEncoding : "KVP",
		url : null,
		layer : null,
		matrixSet : null,
		style : null,
		format : "image/jpeg",
		tileOrigin : null,
		tileFullExtent : null,
		formatSuffix : null,
		matrixIds : null,
		dimensions : null,
		params : null,
		zoomOffset : 0,
		serverResolutions : null,
		formatSuffixMap : {
			"image/png" : "png",
			"image/png8" : "png",
			"image/png24" : "png",
			"image/png32" : "png",
			png : "png",
			"image/jpeg" : "jpg",
			"image/jpg" : "jpg",
			jpeg : "jpg",
			jpg : "jpg"
		},
		matrix : null,
		initialize : function (d) {
			var f = {
				url : !0,
				layer : !0,
				style : !0,
				matrixSet : !0
			},
			e;
			for (e in f) {
				if (!(e in d)) {
					throw Error("Missing property '" + e + "' in layer configuration.")
				}
			}
			d.params = OpenLayers.Util.upperCaseObject(d.params);
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, [d.name, d.url, d.params, d]);
			this.formatSuffix || (this.formatSuffix = this.formatSuffixMap[this.format] || this.format.split("/").pop());
			if (this.matrixIds && (d = this.matrixIds.length) && "string" === typeof this.matrixIds[0]) {
				f = this.matrixIds;
				this.matrixIds = Array(d);
				for (e = 0; e < d; ++e) {
					this.matrixIds[e] = {
						identifier : f[e]
					}
				}
			}
		},
		setMap : function () {
			OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
			this.updateMatrixProperties()
		},
		updateMatrixProperties : function () {
			if (this.matrix = this.getMatrix()) {
				this.matrix.topLeftCorner && (this.tileOrigin = this.matrix.topLeftCorner),
				this.matrix.tileWidth && this.matrix.tileHeight && (this.tileSize = new OpenLayers.Size(this.matrix.tileWidth, this.matrix.tileHeight)),
				this.tileOrigin || (this.tileOrigin = new OpenLayers.LonLat(this.maxExtent.left, this.maxExtent.top)),
				this.tileFullExtent || (this.tileFullExtent = this.maxExtent)
			}
		},
		moveTo : function (d, f, e) {
			(f || !this.matrix) && this.updateMatrixProperties();
			return OpenLayers.Layer.Grid.prototype.moveTo.apply(this, arguments)
		},
		clone : function (b) {
			null == b && (b = new OpenLayers.Layer.WMTS(this.options));
			return b = OpenLayers.Layer.Grid.prototype.clone.apply(this, [b])
		},
		getIdentifier : function () {
			return this.getServerZoom()
		},
		getMatrix : function () {
			var j;
			if (!this.matrixIds || 0 === this.matrixIds.length) {
				j = {
					identifier : this.getIdentifier()
				}
			} else {
				if ("scaleDenominator" in this.matrixIds[0]) {
					for (var i = OpenLayers.METERS_PER_INCH * OpenLayers.INCHES_PER_UNIT[this.units] * this.getServerResolution() / 0.00028, h = Number.POSITIVE_INFINITY, g, l = 0, k = this.matrixIds.length; l < k; ++l) {
						g = Math.abs(1 - this.matrixIds[l].scaleDenominator / i),
						g < h && (h = g, j = this.matrixIds[l])
					}
				} else {
					j = this.matrixIds[this.getIdentifier()]
				}
			}
			return j
		},
		getTileInfo : function (h) {
			var g = this.getServerResolution(),
			f = (h.lon - this.tileOrigin.lon) / (g * this.tileSize.w);
			h = (this.tileOrigin.lat - h.lat) / (g * this.tileSize.h);
			var g = Math.floor(f),
			e = Math.floor(h);
			return {
				col : g,
				row : e,
				i : Math.floor((f - g) * this.tileSize.w),
				j : Math.floor((h - e) * this.tileSize.h)
			}
		},
		getURL : function (j) {
			j = this.adjustBounds(j);
			var i = "";
			if (!this.tileFullExtent || this.tileFullExtent.intersectsBounds(j)) {
				j = j.getCenterLonLat();
				var h = this.getTileInfo(j);
				j = this.dimensions;
				if ("REST" === this.requestEncoding.toUpperCase()) {
					if (i = this.params, "string" === typeof this.url && -1 !== this.url.indexOf("{")) {
						var g = this.url.replace(/\{/g, "${"),
						h = {
							style : this.style,
							Style : this.style,
							TileMatrixSet : this.matrixSet,
							TileMatrix : this.matrix.identifier,
							TileRow : h.row,
							TileCol : h.col
						};
						if (j) {
							var l,
							k;
							for (k = j.length - 1; 0 <= k; --k) {
								l = j[k],
								h[l] = i[l.toUpperCase()]
							}
						}
						i = OpenLayers.String.format(g, h)
					} else {
						g = this.version + "/" + this.layer + "/" + this.style + "/";
						if (j) {
							for (k = 0; k < j.length; k++) {
								i[j[k]] && (g = g + i[j[k]] + "/")
							}
						}
						g = g + this.matrixSet + "/" + this.matrix.identifier + "/" + h.row + "/" + h.col + "." + this.formatSuffix;
						i = OpenLayers.Util.isArray(this.url) ? this.selectUrl(g, this.url) : this.url;
						i.match(/\/$/) || (i += "/");
						i += g
					}
				} else {
					"KVP" === this.requestEncoding.toUpperCase() && (i = {
							SERVICE : "WMTS",
							REQUEST : "GetTile",
							VERSION : this.version,
							LAYER : this.layer,
							STYLE : this.style,
							TILEMATRIXSET : this.matrixSet,
							TILEMATRIX : this.matrix.identifier,
							TILEROW : h.row,
							TILECOL : h.col,
							FORMAT : this.format
						}, i = OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, [i]))
				}
			}
			return i
		},
		mergeNewParams : function (b) {
			if ("KVP" === this.requestEncoding.toUpperCase()) {
				return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, [OpenLayers.Util.upperCaseObject(b)])
			}
		},
		CLASS_NAME : "OpenLayers.Layer.WMTS"
	});
OpenLayers.Protocol.SOS.v1_0_0 = OpenLayers.Class(OpenLayers.Protocol, {
		fois : null,
		formatOptions : null,
		initialize : function (b) {
			OpenLayers.Protocol.prototype.initialize.apply(this, [b]);
			b.format || (this.format = new OpenLayers.Format.SOSGetFeatureOfInterest(this.formatOptions))
		},
		destroy : function () {
			this.options && !this.options.format && this.format.destroy();
			this.format = null;
			OpenLayers.Protocol.prototype.destroy.apply(this)
		},
		read : function (d) {
			d = OpenLayers.Util.extend({}, d);
			OpenLayers.Util.applyDefaults(d, this.options || {});
			var f = new OpenLayers.Protocol.Response({
					requestType : "read"
				}),
			e = this.format,
			e = OpenLayers.Format.XML.prototype.write.apply(e, [e.writeNode("sos:GetFeatureOfInterest", {
							fois : this.fois
						})]);
			f.priv = OpenLayers.Request.POST({
					url : d.url,
					callback : this.createCallback(this.handleRead, f, d),
					data : e
				});
			return f
		},
		handleRead : function (d, f) {
			if (f.callback) {
				var e = d.priv;
				200 <= e.status && 300 > e.status ? (d.features = this.parseFeatures(e), d.code = OpenLayers.Protocol.Response.SUCCESS) : d.code = OpenLayers.Protocol.Response.FAILURE;
				f.callback.call(f.scope, d)
			}
		},
		parseFeatures : function (d) {
			var c = d.responseXML;
			if (!c || !c.documentElement) {
				c = d.responseText
			}
			return !c || 0 >= c.length ? null : this.format.read(c)
		},
		CLASS_NAME : "OpenLayers.Protocol.SOS.v1_0_0"
	});
OpenLayers.Layer.KaMapCache = OpenLayers.Class(OpenLayers.Layer.KaMap, {
		IMAGE_EXTENSIONS : {
			jpeg : "jpg",
			gif : "gif",
			png : "png",
			png8 : "png",
			png24 : "png",
			dithered : "png"
		},
		DEFAULT_FORMAT : "jpeg",
		initialize : function (h, g, f, e) {
			OpenLayers.Layer.KaMap.prototype.initialize.apply(this, arguments);
			this.extension = this.IMAGE_EXTENSIONS[this.params.i.toLowerCase() || this.DEFAULT_FORMAT]
		},
		getURL : function (i) {
			i = this.adjustBounds(i);
			var h = this.map.getResolution(),
			g = Math.round(10000 * this.map.getScale()) / 10000,
			f = Math.round(i.left / h);
			i = -Math.round(i.top / h);
			var h = Math.floor(f / this.tileSize.w / this.params.metaTileSize.w) * this.tileSize.w * this.params.metaTileSize.w,
			j = Math.floor(i / this.tileSize.h / this.params.metaTileSize.h) * this.tileSize.h * this.params.metaTileSize.h,
			g = ["/", this.params.map, "/", g, "/", this.params.g.replace(/\s/g, "_"), "/def/t", j, "/l", h, "/t", i, "l", f, ".", this.extension],
			f = this.url;
			OpenLayers.Util.isArray(f) && (f = this.selectUrl(g.join(""), f));
			return f + g.join("")
		},
		CLASS_NAME : "OpenLayers.Layer.KaMapCache"
	});
OpenLayers.Protocol.WFS.v1_1_0 = OpenLayers.Class(OpenLayers.Protocol.WFS.v1, {
		version : "1.1.0",
		initialize : function (b) {
			OpenLayers.Protocol.WFS.v1.prototype.initialize.apply(this, arguments);
			this.outputFormat && !this.readFormat && ("gml2" == this.outputFormat.toLowerCase() ? this.readFormat = new OpenLayers.Format.GML.v2({
						featureType : this.featureType,
						featureNS : this.featureNS,
						geometryName : this.geometryName
					}) : "json" == this.outputFormat.toLowerCase() && (this.readFormat = new OpenLayers.Format.GeoJSON))
		},
		CLASS_NAME : "OpenLayers.Protocol.WFS.v1_1_0"
	});
OpenLayers.Format.WMSCapabilities.v1_1_1 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_1, {
		version : "1.1.1",
		readers : {
			wms : OpenLayers.Util.applyDefaults({
				SRS : function (d, c) {
					c.srs[this.getChildValue(d)] = !0
				}
			}, OpenLayers.Format.WMSCapabilities.v1_1.prototype.readers.wms)
		},
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities.v1_1_1"
	});
OpenLayers.Format.WMSCapabilities.v1_1_1_WMSC = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_1_1, {
		version : "1.1.1",
		profile : "WMSC",
		readers : {
			wms : OpenLayers.Util.applyDefaults({
				VendorSpecificCapabilities : function (d, c) {
					c.vendorSpecific = {
						tileSets : []
					};
					this.readChildNodes(d, c.vendorSpecific)
				},
				TileSet : function (d, f) {
					var e = {
						srs : {},
						bbox : {},
						resolutions : []
					};
					this.readChildNodes(d, e);
					f.tileSets.push(e)
				},
				Resolutions : function (i, h) {
					for (var g = this.getChildValue(i).split(" "), f = 0, j = g.length; f < j; f++) {
						"" != g[f] && h.resolutions.push(parseFloat(g[f]))
					}
				},
				Width : function (d, c) {
					c.width = parseInt(this.getChildValue(d))
				},
				Height : function (d, c) {
					c.height = parseInt(this.getChildValue(d))
				},
				Layers : function (d, c) {
					c.layers = this.getChildValue(d)
				},
				Styles : function (d, c) {
					c.styles = this.getChildValue(d)
				}
			}, OpenLayers.Format.WMSCapabilities.v1_1_1.prototype.readers.wms)
		},
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities.v1_1_1_WMSC"
	});
OpenLayers.Format.WMSCapabilities.v1_1_0 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_1, {
		version : "1.1.0",
		readers : {
			wms : OpenLayers.Util.applyDefaults({
				SRS : function (i, h) {
					for (var g = this.getChildValue(i).split(/ +/), f = 0, j = g.length; f < j; f++) {
						h.srs[g[f]] = !0
					}
				}
			}, OpenLayers.Format.WMSCapabilities.v1_1.prototype.readers.wms)
		},
		CLASS_NAME : "OpenLayers.Format.WMSCapabilities.v1_1_0"
	});
OpenLayers.Control.LayerSwitcher = OpenLayers.Class(OpenLayers.Control, {
		roundedCorner : !1,
		roundedCornerColor : "darkblue",
		layerStates : null,
		layersDiv : null,
		baseLayersDiv : null,
		baseLayers : null,
		dataLbl : null,
		dataLayersDiv : null,
		dataLayers : null,
		minimizeDiv : null,
		maximizeDiv : null,
		ascending : !0,
		initialize : function (b) {
			OpenLayers.Control.prototype.initialize.apply(this, arguments);
			this.layerStates = [];
			this.roundedCorner && OpenLayers.Console.warn("roundedCorner option is deprecated")
		},
		destroy : function () {
			this.clearLayersArray("base");
			this.clearLayersArray("data");
			this.map.events.un({
				buttonclick : this.onButtonClick,
				addlayer : this.redraw,
				changelayer : this.redraw,
				removelayer : this.redraw,
				changebaselayer : this.redraw,
				scope : this
			});
			this.events.unregister("buttonclick", this, this.onButtonClick);
			OpenLayers.Control.prototype.destroy.apply(this, arguments)
		},
		setMap : function (b) {
			OpenLayers.Control.prototype.setMap.apply(this, arguments);
			this.map.events.on({
				addlayer : this.redraw,
				changelayer : this.redraw,
				removelayer : this.redraw,
				changebaselayer : this.redraw,
				scope : this
			});
			this.outsideViewport ? (this.events.attachToElement(this.div), this.events.register("buttonclick", this, this.onButtonClick)) : this.map.events.register("buttonclick", this, this.onButtonClick)
		},
		draw : function () {
			OpenLayers.Control.prototype.draw.apply(this);
			this.loadContents();
			this.outsideViewport || this.minimizeControl();
			this.redraw();
			return this.div
		},
		onButtonClick : function (b) {
			b = b.buttonElement;
			b === this.minimizeDiv ? this.minimizeControl() : b === this.maximizeDiv ? this.maximizeControl() : b._layerSwitcher === this.id && (b["for"] && (b = document.getElementById(b["for"])), b.disabled || ("radio" == b.type ? (b.checked = !0, this.map.setBaseLayer(this.map.getLayer(b._layer))) : (b.checked = !b.checked, this.updateMap())))
		},
		clearLayersArray : function (b) {
			this[b + "LayersDiv"].innerHTML = "";
			this[b + "Layers"] = []
		},
		checkRedraw : function () {
			var i = !1;
			if (!this.layerStates.length || this.map.layers.length != this.layerStates.length) {
				i = !0
			} else {
				for (var h = 0, g = this.layerStates.length; h < g; h++) {
					var f = this.layerStates[h],
					j = this.map.layers[h];
					if (f.name != j.name || f.inRange != j.inRange || f.id != j.id || f.visibility != j.visibility) {
						i = !0;
						break
					}
				}
			}
			return i
		},
		redraw : function () {
			if (!this.checkRedraw()) {
				return this.div
			}
			this.clearLayersArray("base");
			this.clearLayersArray("data");
			var l = !1,
			i = !1,
			t = this.map.layers.length;
			this.layerStates = Array(t);
			for (var s = 0; s < t; s++) {
				var r = this.map.layers[s];
				this.layerStates[s] = {
					name : r.name,
					visibility : r.visibility,
					inRange : r.inRange,
					id : r.id
				}
			}
			var q = this.map.layers.slice();
			this.ascending || q.reverse();
			s = 0;
			for (t = q.length; s < t; s++) {
				var r = q[s],
				p = r.isBaseLayer;
				if (r.displayInLayerSwitcher) {
					p ? i = !0 : l = !0;
					var o = p ? r == this.map.baseLayer : r.getVisibility(),
					n = document.createElement("input");
					n.id = this.id + "_input_" + r.name;
					n.name = p ? this.id + "_baseLayers" : r.name;
					n.type = p ? "radio" : "checkbox";
					n.value = r.name;
					n.checked = o;
					n.defaultChecked = o;
					n.className = "olButton";
					n._layer = r.id;
					n._layerSwitcher = this.id;
					!p && !r.inRange && (n.disabled = !0);
					o = document.createElement("label");
					o["for"] = n.id;
					OpenLayers.Element.addClass(o, "labelSpan olButton");
					o._layer = r.id;
					o._layerSwitcher = this.id;
					!p && !r.inRange && (o.style.color = "gray");
					o.innerHTML = r.name;
					o.style.verticalAlign = p ? "bottom" : "baseline";
					var m = document.createElement("br");
					(p ? this.baseLayers : this.dataLayers).push({
						layer : r,
						inputElem : n,
						labelSpan : o
					});
					r = p ? this.baseLayersDiv : this.dataLayersDiv;
					r.appendChild(n);
					r.appendChild(o);
					r.appendChild(m)
				}
			}
			this.dataLbl.style.display = l ? "" : "none";
			this.baseLbl.style.display = i ? "" : "none";
			return this.div
		},
		updateMap : function () {
			for (var d = 0, f = this.baseLayers.length; d < f; d++) {
				var e = this.baseLayers[d];
				e.inputElem.checked && this.map.setBaseLayer(e.layer, !1)
			}
			d = 0;
			for (f = this.dataLayers.length; d < f; d++) {
				e = this.dataLayers[d],
				e.layer.setVisibility(e.inputElem.checked)
			}
		},
		maximizeControl : function (b) {
			this.div.style.width = "";
			this.div.style.height = "";
			this.showControls(!1);
			null != b && OpenLayers.Event.stop(b)
		},
		minimizeControl : function (b) {
			this.div.style.width = "0px";
			this.div.style.height = "0px";
			this.showControls(!0);
			null != b && OpenLayers.Event.stop(b)
		},
		showControls : function (b) {
			this.maximizeDiv.style.display = b ? "" : "none";
			this.minimizeDiv.style.display = b ? "none" : "";
			this.layersDiv.style.display = b ? "none" : ""
		},
		loadContents : function () {
			this.layersDiv = document.createElement("div");
			this.layersDiv.id = this.id + "_layersDiv";
			OpenLayers.Element.addClass(this.layersDiv, "layersDiv");
			this.baseLbl = document.createElement("div");
			this.baseLbl.innerHTML = OpenLayers.i18n("Base Layer");
			OpenLayers.Element.addClass(this.baseLbl, "baseLbl");
			this.baseLayersDiv = document.createElement("div");
			OpenLayers.Element.addClass(this.baseLayersDiv, "baseLayersDiv");
			this.dataLbl = document.createElement("div");
			this.dataLbl.innerHTML = OpenLayers.i18n("Overlays");
			OpenLayers.Element.addClass(this.dataLbl, "dataLbl");
			this.dataLayersDiv = document.createElement("div");
			OpenLayers.Element.addClass(this.dataLayersDiv, "dataLayersDiv");
			this.ascending ? (this.layersDiv.appendChild(this.baseLbl), this.layersDiv.appendChild(this.baseLayersDiv), this.layersDiv.appendChild(this.dataLbl), this.layersDiv.appendChild(this.dataLayersDiv)) : (this.layersDiv.appendChild(this.dataLbl), this.layersDiv.appendChild(this.dataLayersDiv), this.layersDiv.appendChild(this.baseLbl), this.layersDiv.appendChild(this.baseLayersDiv));
			this.div.appendChild(this.layersDiv);
			this.roundedCorner && (OpenLayers.Rico.Corner.round(this.div, {
					corners : "tl bl",
					bgColor : "transparent",
					color : this.roundedCornerColor,
					blend : !1
				}), OpenLayers.Rico.Corner.changeOpacity(this.layersDiv, 0.75));
			var b = OpenLayers.Util.getImageLocation("layer-switcher-maximize.png");
			this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MaximizeDiv", null, null, b, "absolute");
			OpenLayers.Element.addClass(this.maximizeDiv, "maximizeDiv olButton");
			this.maximizeDiv.style.display = "none";
			this.div.appendChild(this.maximizeDiv);
			b = OpenLayers.Util.getImageLocation("layer-switcher-minimize.png");
			this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MinimizeDiv", null, null, b, "absolute");
			OpenLayers.Element.addClass(this.minimizeDiv, "minimizeDiv olButton");
			this.minimizeDiv.style.display = "none";
			this.div.appendChild(this.minimizeDiv)
		},
		CLASS_NAME : "OpenLayers.Control.LayerSwitcher"
	});
OpenLayers.Format.Atom = OpenLayers.Class(OpenLayers.Format.XML, {
		namespaces : {
			atom : "http://www.w3.org/2005/Atom",
			georss : "http://www.georss.org/georss"
		},
		feedTitle : "untitled",
		defaultEntryTitle : "untitled",
		gmlParser : null,
		xy : !1,
		read : function (b) {
			"string" == typeof b && (b = OpenLayers.Format.XML.prototype.read.apply(this, [b]));
			return this.parseFeatures(b)
		},
		write : function (h) {
			var g;
			if (OpenLayers.Util.isArray(h)) {
				g = this.createElementNSPlus("atom:feed");
				g.appendChild(this.createElementNSPlus("atom:title", {
						value : this.feedTitle
					}));
				for (var f = 0, e = h.length; f < e; f++) {
					g.appendChild(this.buildEntryNode(h[f]))
				}
			} else {
				g = this.buildEntryNode(h)
			}
			return OpenLayers.Format.XML.prototype.write.apply(this, [g])
		},
		buildContentNode : function (d) {
			var c = this.createElementNSPlus("atom:content", {
					attributes : {
						type : d.type || null
					}
				});
			if (d.src) {
				c.setAttribute("src", d.src)
			} else {
				if ("text" == d.type || null == d.type) {
					c.appendChild(this.createTextNode(d.value))
				} else {
					if ("html" == d.type) {
						if ("string" != typeof d.value) {
							throw "HTML content must be in form of an escaped string"
						}
						c.appendChild(this.createTextNode(d.value))
					} else {
						"xhtml" == d.type ? c.appendChild(d.value) : "xhtml" == d.type || d.type.match(/(\+|\/)xml$/) ? c.appendChild(d.value) : c.appendChild(this.createTextNode(d.value))
					}
				}
			}
			return c
		},
		buildEntryNode : function (o) {
			var n = o.attributes,
			m = n.atom || {},
			l = this.createElementNSPlus("atom:entry");
			if (m.authors) {
				for (var k = OpenLayers.Util.isArray(m.authors) ? m.authors : [m.authors], j = 0, i = k.length; j < i; j++) {
					l.appendChild(this.buildPersonConstructNode("author", k[j]))
				}
			}
			if (m.categories) {
				for (var k = OpenLayers.Util.isArray(m.categories) ? m.categories : [m.categories], p, j = 0, i = k.length; j < i; j++) {
					p = k[j],
					l.appendChild(this.createElementNSPlus("atom:category", {
							attributes : {
								term : p.term,
								scheme : p.scheme || null,
								label : p.label || null
							}
						}))
				}
			}
			m.content && l.appendChild(this.buildContentNode(m.content));
			if (m.contributors) {
				k = OpenLayers.Util.isArray(m.contributors) ? m.contributors : [m.contributors];
				j = 0;
				for (i = k.length; j < i; j++) {
					l.appendChild(this.buildPersonConstructNode("contributor", k[j]))
				}
			}
			o.fid && l.appendChild(this.createElementNSPlus("atom:id", {
					value : o.fid
				}));
			if (m.links) {
				k = OpenLayers.Util.isArray(m.links) ? m.links : [m.links];
				j = 0;
				for (i = k.length; j < i; j++) {
					p = k[j],
					l.appendChild(this.createElementNSPlus("atom:link", {
							attributes : {
								href : p.href,
								rel : p.rel || null,
								type : p.type || null,
								hreflang : p.hreflang || null,
								title : p.title || null,
								length : p.length || null
							}
						}))
				}
			}
			m.published && l.appendChild(this.createElementNSPlus("atom:published", {
					value : m.published
				}));
			m.rights && l.appendChild(this.createElementNSPlus("atom:rights", {
					value : m.rights
				}));
			if (m.summary || n.description) {
				l.appendChild(this.createElementNSPlus("atom:summary", {
						value : m.summary || n.description
					}))
			}
			l.appendChild(this.createElementNSPlus("atom:title", {
					value : m.title || n.title || this.defaultEntryTitle
				}));
			m.updated && l.appendChild(this.createElementNSPlus("atom:updated", {
					value : m.updated
				}));
			o.geometry && (n = this.createElementNSPlus("georss:where"), n.appendChild(this.buildGeometryNode(o.geometry)), l.appendChild(n));
			return l
		},
		initGmlParser : function () {
			this.gmlParser = new OpenLayers.Format.GML.v3({
					xy : this.xy,
					featureNS : "http://example.com#feature",
					internalProjection : this.internalProjection,
					externalProjection : this.externalProjection
				})
		},
		buildGeometryNode : function (b) {
			this.gmlParser || this.initGmlParser();
			return this.gmlParser.writeNode("feature:_geometry", b).firstChild
		},
		buildPersonConstructNode : function (j, i) {
			var h = ["uri", "email"],
			g = this.createElementNSPlus("atom:" + j);
			g.appendChild(this.createElementNSPlus("atom:name", {
					value : i.name
				}));
			for (var l = 0, k = h.length; l < k; l++) {
				i[h[l]] && g.appendChild(this.createElementNSPlus("atom:" + h[l], {
						value : i[h[l]]
					}))
			}
			return g
		},
		getFirstChildValue : function (h, g, f, e) {
			return (h = this.getElementsByTagNameNS(h, g, f)) && 0 < h.length ? this.getChildValue(h[0], e) : e
		},
		parseFeature : function (o) {
			var n = {},
			m = null,
			i = null,
			v = null,
			u = this.namespaces.atom;
			this.parsePersonConstructs(o, "author", n);
			i = this.getElementsByTagNameNS(o, u, "category");
			0 < i.length && (n.categories = []);
			for (var t = 0, s = i.length; t < s; t++) {
				m = {};
				m.term = i[t].getAttribute("term");
				if (v = i[t].getAttribute("scheme")) {
					m.scheme = v
				}
				if (v = i[t].getAttribute("label")) {
					m.label = v
				}
				n.categories.push(m)
			}
			i = this.getElementsByTagNameNS(o, u, "content");
			if (0 < i.length) {
				m = {};
				if (v = i[0].getAttribute("type")) {
					m.type = v
				}
				(v = i[0].getAttribute("src")) ? m.src = v : (m.value = "text" == m.type || "html" == m.type || null == m.type ? this.getFirstChildValue(o, u, "content", null) : "xhtml" == m.type || m.type.match(/(\+|\/)xml$/) ? this.getChildEl(i[0]) : this.getFirstChildValue(o, u, "content", null), n.content = m)
			}
			this.parsePersonConstructs(o, "contributor", n);
			n.id = this.getFirstChildValue(o, u, "id", null);
			i = this.getElementsByTagNameNS(o, u, "link");
			0 < i.length && (n.links = Array(i.length));
			for (var r = ["rel", "type", "hreflang", "title", "length"], t = 0, s = i.length; t < s; t++) {
				m = {};
				m.href = i[t].getAttribute("href");
				for (var q = 0, p = r.length; q < p; q++) {
					(v = i[t].getAttribute(r[q])) && (m[r[q]] = v)
				}
				n.links[t] = m
			}
			if (m = this.getFirstChildValue(o, u, "published", null)) {
				n.published = m
			}
			if (m = this.getFirstChildValue(o, u, "rights", null)) {
				n.rights = m
			}
			if (m = this.getFirstChildValue(o, u, "summary", null)) {
				n.summary = m
			}
			n.title = this.getFirstChildValue(o, u, "title", null);
			n.updated = this.getFirstChildValue(o, u, "updated", null);
			m = {
				title : n.title,
				description : n.summary,
				atom : n
			};
			o = this.parseLocations(o)[0];
			o = new OpenLayers.Feature.Vector(o, m);
			o.fid = n.id;
			return o
		},
		parseFeatures : function (h) {
			var g = [],
			f = this.getElementsByTagNameNS(h, this.namespaces.atom, "entry");
			0 == f.length && (f = [h]);
			h = 0;
			for (var e = f.length; h < e; h++) {
				g.push(this.parseFeature(f[h]))
			}
			return g
		},
		parseLocations : function (o) {
			var n = this.namespaces.georss,
			m = {
				components : []
			},
			i = this.getElementsByTagNameNS(o, n, "where");
			if (i && 0 < i.length) {
				this.gmlParser || this.initGmlParser();
				for (var v = 0, u = i.length; v < u; v++) {
					this.gmlParser.readChildNodes(i[v], m)
				}
			}
			m = m.components;
			if ((i = this.getElementsByTagNameNS(o, n, "point")) && 0 < i.length) {
				v = 0;
				for (u = i.length; v < u; v++) {
					var t = OpenLayers.String.trim(i[v].firstChild.nodeValue).split(/\s+/);
					2 != t.length && (t = OpenLayers.String.trim(i[v].firstChild.nodeValue).split(/\s*,\s*/));
					m.push(new OpenLayers.Geometry.Point(t[1], t[0]))
				}
			}
			var s = this.getElementsByTagNameNS(o, n, "line");
			if (s && 0 < s.length) {
				for (var r, v = 0, u = s.length; v < u; v++) {
					i = OpenLayers.String.trim(s[v].firstChild.nodeValue).split(/\s+/);
					r = [];
					for (var q = 0, p = i.length; q < p; q += 2) {
						t = new OpenLayers.Geometry.Point(i[q + 1], i[q]),
						r.push(t)
					}
					m.push(new OpenLayers.Geometry.LineString(r))
				}
			}
			if ((o = this.getElementsByTagNameNS(o, n, "polygon")) && 0 < o.length) {
				v = 0;
				for (u = o.length; v < u; v++) {
					i = OpenLayers.String.trim(o[v].firstChild.nodeValue).split(/\s+/);
					r = [];
					q = 0;
					for (p = i.length; q < p; q += 2) {
						t = new OpenLayers.Geometry.Point(i[q + 1], i[q]),
						r.push(t)
					}
					m.push(new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(m)]))
				}
			}
			if (this.internalProjection && this.externalProjection) {
				v = 0;
				for (u = m.length; v < u; v++) {
					m[v] && m[v].transform(this.externalProjection, this.internalProjection)
				}
			}
			return m
		},
		parsePersonConstructs : function (r, q, p) {
			var o = [],
			n = this.namespaces.atom;
			r = this.getElementsByTagNameNS(r, n, q);
			for (var i = ["uri", "email"], x = 0, w = r.length; x < w; x++) {
				var v = {};
				v.name = this.getFirstChildValue(r[x], n, "name", null);
				for (var u = 0, t = i.length; u < t; u++) {
					var s = this.getFirstChildValue(r[x], n, i[u], null);
					s && (v[i[u]] = s)
				}
				o.push(v)
			}
			0 < o.length && (p[q + "s"] = o)
		},
		CLASS_NAME : "OpenLayers.Format.Atom"
	});
OpenLayers.Control.KeyboardDefaults = OpenLayers.Class(OpenLayers.Control, {
		autoActivate : !0,
		slideFactor : 75,
		observeElement : null,
		draw : function () {
			this.handler = new OpenLayers.Handler.Keyboard(this, {
					keydown : this.defaultKeyPress
				}, {
					observeElement : this.observeElement || document
				})
		},
		defaultKeyPress : function (d) {
			var f,
			e = !0;
			switch (d.keyCode) {
			case OpenLayers.Event.KEY_LEFT:
				this.map.pan(-this.slideFactor, 0);
				break;
			case OpenLayers.Event.KEY_RIGHT:
				this.map.pan(this.slideFactor, 0);
				break;
			case OpenLayers.Event.KEY_UP:
				this.map.pan(0, -this.slideFactor);
				break;
			case OpenLayers.Event.KEY_DOWN:
				this.map.pan(0, this.slideFactor);
				break;
			case 33:
				f = this.map.getSize();
				this.map.pan(0, -0.75 * f.h);
				break;
			case 34:
				f = this.map.getSize();
				this.map.pan(0, 0.75 * f.h);
				break;
			case 35:
				f = this.map.getSize();
				this.map.pan(0.75 * f.w, 0);
				break;
			case 36:
				f = this.map.getSize();
				this.map.pan(-0.75 * f.w, 0);
				break;
			case 43:
			case 61:
			case 187:
			case 107:
				this.map.zoomIn();
				break;
			case 45:
			case 109:
			case 189:
			case 95:
				this.map.zoomOut();
				break;
			default:
				e = !1
			}
			e && OpenLayers.Event.stop(d)
		},
		CLASS_NAME : "OpenLayers.Control.KeyboardDefaults"
	});
OpenLayers.Format.WMTSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.OWSCommon.v1_1_0, {
		version : "1.0.0",
		namespaces : {
			ows : "http://www.opengis.net/ows/1.1",
			wmts : "http://www.opengis.net/wmts/1.0",
			xlink : "http://www.w3.org/1999/xlink"
		},
		yx : null,
		defaultPrefix : "wmts",
		initialize : function (b) {
			OpenLayers.Format.XML.prototype.initialize.apply(this, [b]);
			this.options = b;
			b = OpenLayers.Util.extend({}, OpenLayers.Format.WMTSCapabilities.prototype.yx);
			this.yx = OpenLayers.Util.extend(b, this.yx)
		},
		read : function (d) {
			"string" == typeof d && (d = OpenLayers.Format.XML.prototype.read.apply(this, [d]));
			d && 9 == d.nodeType && (d = d.documentElement);
			var c = {};
			this.readNode(d, c);
			c.version = this.version;
			return c
		},
		readers : {
			wmts : {
				Capabilities : function (d, c) {
					this.readChildNodes(d, c)
				},
				Contents : function (d, c) {
					c.contents = {};
					c.contents.layers = [];
					c.contents.tileMatrixSets = {};
					this.readChildNodes(d, c.contents)
				},
				Layer : function (d, f) {
					var e = {
						styles : [],
						formats : [],
						dimensions : [],
						tileMatrixSetLinks : [],
						layers : []
					};
					this.readChildNodes(d, e);
					f.layers.push(e)
				},
				Style : function (d, f) {
					var e = {};
					e.isDefault = "true" === d.getAttribute("isDefault");
					this.readChildNodes(d, e);
					f.styles.push(e)
				},
				Format : function (d, c) {
					c.formats.push(this.getChildValue(d))
				},
				TileMatrixSetLink : function (d, f) {
					var e = {};
					this.readChildNodes(d, e);
					f.tileMatrixSetLinks.push(e)
				},
				TileMatrixSet : function (d, f) {
					if (f.layers) {
						var e = {
							matrixIds : []
						};
						this.readChildNodes(d, e);
						f.tileMatrixSets[e.identifier] = e
					} else {
						f.tileMatrixSet = this.getChildValue(d)
					}
				},
				TileMatrix : function (d, f) {
					var e = {
						supportedCRS : f.supportedCRS
					};
					this.readChildNodes(d, e);
					f.matrixIds.push(e)
				},
				ScaleDenominator : function (d, c) {
					c.scaleDenominator = parseFloat(this.getChildValue(d))
				},
				TopLeftCorner : function (h, g) {
					var f = this.getChildValue(h).split(" "),
					e;
					g.supportedCRS && (e = g.supportedCRS.replace(/urn:ogc:def:crs:(\w+):.+:(\w+)$/, "urn:ogc:def:crs:$1::$2"), e = !!this.yx[e]);
					g.topLeftCorner = e ? new OpenLayers.LonLat(f[1], f[0]) : new OpenLayers.LonLat(f[0], f[1])
				},
				TileWidth : function (d, c) {
					c.tileWidth = parseInt(this.getChildValue(d))
				},
				TileHeight : function (d, c) {
					c.tileHeight = parseInt(this.getChildValue(d))
				},
				MatrixWidth : function (d, c) {
					c.matrixWidth = parseInt(this.getChildValue(d))
				},
				MatrixHeight : function (d, c) {
					c.matrixHeight = parseInt(this.getChildValue(d))
				},
				ResourceURL : function (d, c) {
					c.resourceUrl = c.resourceUrl || {};
					c.resourceUrl[d.getAttribute("resourceType")] = {
						format : d.getAttribute("format"),
						template : d.getAttribute("template")
					}
				},
				WSDL : function (d, c) {
					c.wsdl = {};
					c.wsdl.href = d.getAttribute("xlink:href")
				},
				ServiceMetadataURL : function (d, c) {
					c.serviceMetadataUrl = {};
					c.serviceMetadataUrl.href = d.getAttribute("xlink:href")
				},
				LegendURL : function (d, c) {
					c.legend = {};
					c.legend.href = d.getAttribute("xlink:href");
					c.legend.format = d.getAttribute("format")
				},
				Dimension : function (d, f) {
					var e = {
						values : []
					};
					this.readChildNodes(d, e);
					f.dimensions.push(e)
				},
				Default : function (d, c) {
					c["default"] = this.getChildValue(d)
				},
				Value : function (d, c) {
					c.values.push(this.getChildValue(d))
				}
			},
			ows : OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
		},
		CLASS_NAME : "OpenLayers.Format.WMTSCapabilities.v1_0_0"
	});