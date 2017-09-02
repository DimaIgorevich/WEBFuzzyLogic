var Map = function() {
    this.keys = new Array();
    this.data = new Object();
}

Map.prototype.getKeys = function () {
    return this.keys;
}

Map.prototype.getData = function() {
    return this.data;
}

Map.prototype.put = function (key, value) {
    if (this.data[key] == null) {
        this.keys.push(key);
    }
    this.data[key] = value;
};

Map.prototype.get = function (key) {
    return this.data[key];
};

Map.prototype.remove = function (key) {
    this.keys.remove(key);
    this.data[key] = null;
};

Map.prototype.each = function (fn) {
    if (typeof fn != 'function') {
        return;
    }
    var len = this.keys.length;
    for (var i = 0; i < len; i++) {
        var k = this.keys[i];
        fn(k, this.data[k], i);
    }
};

Map.prototype.entrys = function () {
    var len = this.keys.length;
    var entrys = new Array(len);
    for (var i = 0; i < len; i++) {
        entrys[i] = {
        key: this.keys[i],
        value: this.data[i]
        };
    }
    return entrys;
};

Map.prototype.isEmpty = function () {
    return this.keys.length == 0;
};

Map.prototype.size = function () {
    return this.keys.length;
};

Map.prototype.isExist = function(key) {
    if (this.data[key] == null) {
        return false;
    }
    return true;
};