var app = {};
app.views = {};
app.util = {};
app.types = {};
app.react = {};
app.groupNames = [];
app.searchCriteria = '';
app.route_handlers = {};
Object.defineProperty(Object.prototype, 'extend', {
    value: function (obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                this[i] = obj[i];
            }
        }
        return this;
    },
    enumerable: false
});
window.onload = function () {

    window.addEventListener("dragover", function (e) {
        e = e || event;
        if (e.target.classList[0] != "dropzone") { // check wich element is our target
            e.preventDefault();
        }
    }, false);

    window.addEventListener("drop", function (e) {
        e = e || event;
        if (e.target.classList[0] != "dropzone") {  // check wich element is our target
            e.preventDefault();
        }
    }, false);

    window.addEventListener("hashchange", function(e) {
        var route = "/";
        var hash = window.location.hash;
        if (hash.length > 0) {
            route = hash.split('#').pop();
        }
        var parseHash = function() {
            crossroads.parse(route);
        };
        hasher.initialized.add(parseHash); // parse initial hash  
        hasher.changed.add(parseHash); // parse hash changes  
        hasher.init(); // start listening for history changes 
    });

    window.dispatchEvent(new CustomEvent("hashchange"));
};






