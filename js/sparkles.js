"use strict";

var colour = "white";
var sparkles = 50;
var x = 0;
var y = 0;
var ox = 0;
var oy = 0;
var swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
var sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
var tiny = [];
var star = [];
var starv = [];
var starx = [];
var stary = [];
var tinyx = [];
var tinyy = [];
var tinyv = [];

window.onload = function() {
    if (document.getElementById) {
        initializeSparkles();
        sparkle();
    }
};

function initializeSparkles() {
    var i;
    for (i = 0; i < sparkles; i++) {
        var tinyDiv = createDiv(3, 3);
        tinyDiv.style.visibility = "hidden";
        tinyDiv.style.zIndex = "999";
        document.body.appendChild(tinyDiv);
        tiny[i] = tinyDiv;
        tinyv[i] = 0;

        var starDiv = createDiv(5, 5);
        starDiv.style.backgroundColor = "transparent";
        starDiv.style.visibility = "hidden";
        starDiv.style.zIndex = "999";
        var rlef = createDiv(1, 5);
        var rdow = createDiv(5, 1);
        starDiv.appendChild(rlef);
        starDiv.appendChild(rdow);
        rlef.style.top = "2px";
        rlef.style.left = "0px";
        rdow.style.top = "0px";
        rdow.style.left = "2px";
        document.body.appendChild(starDiv);
        star[i] = starDiv;
        starv[i] = 0;
    }
    set_width();
}

function sparkle() {
    var c;
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                star[c].style.left = (starx[c] = x) + "px";
                star[c].style.top = (stary[c] = y + 1) + "px";
                star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = (colour === "random") ? newColour() : colour;
                star[c].style.visibility = "visible";
                starv[c] = 50;
                break;
            }
        }
    }
    for (c = 0; c < sparkles; c++) {
        if (starv[c]) {
            update_star(c);
        }
        if (tinyv[c]) {
            update_tiny(c);
        }
    }
    setTimeout(sparkle, 40);
}

function update_star(i) {
    if (--starv[i] === 25) {
        star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    }
    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh + sdown) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
            return;
        }
    } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
    }
}

function update_tiny(i) {
    if (--tinyv[i] === 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
            return;
        }
    } else {
        tiny[i].style.visibility = "hidden";
    }
}

document.onmousemove = function(e) {
    e = e || window.event;
    x = e.clientX;
    y = e.clientY;
};

function createDiv(height, width) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    return div;
}

function newColour() {
    var c = [];
    c[0] = 255;
    c[1] = Math.floor(Math.random() * 256);
    c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
    c.sort(function() {
        return (0.5 - Math.random());
    });
    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
}

function set_width() {
    swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

window.onresize = function() {
    set_width();
};

window.onscroll = function() {
    sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
};
