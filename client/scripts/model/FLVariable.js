var VariableType = {
    OUTPUT: 0,
    INPUT: 1,
    INTERMEDIATE: 2,
    properties: {
        0: {name: "output", value: 0, code: "OUT"},
        1: {name: "input", value: 1, code: "IN"},
        2: {name: "intermediate", value: 2, code: "IMT"}
    }
};

//Class Variable Prototype
var Variable = function (title, type, countTerm, listTerm, signalValue, links) {
    this.signalValue = signalValue;
    this.name = title;
    this.type = type;
    this.count = countTerm;
    this.list = listTerm.slice();
    this.links = links;
};

Variable.prototype.setGlobalID = function (id) {
    this.globalID = id;
}

Variable.prototype.setID = function (id) {
    this.id = id;
}

Variable.prototype.getGlobalID = function () {
    return this.globalID;
}

Variable.prototype.getID = function () {
    return this.id;
}

Variable.prototype.getType = function () {
    return this.type;
};

Variable.prototype.getTitle = function () {
    return this.name;
};

Variable.prototype.getCountTerm = function () {
    return this.count;
};

Variable.prototype.getSignalValue = function () {
    return this.signalValue;
};

Variable.prototype.getListTerm = function () {
    var listTerm = this.list.slice();
    return listTerm;
};

Variable.prototype.getLinks = function () {
    return this.links;
}

Variable.prototype.isLinksEmpty = function () {
    return (!this.links || 0 === this.links.length);
}

Variable.prototype.sortListTermContent = function () {
    this.list.sort(function (object1, object2) {
        if (object1.triangleNumber.getDiscreteValue() < object2.triangleNumber.getDiscreteValue()) {
            return -1;
        } else if (object1.triangleNumber.getDiscreteValue() > object2.triangleNumber.getDiscreteValue()) {
            return 1;
        }

        return 0;
    });
};

function getVariableByData(data) {
    if (VariableType.OUTPUT == data.type) {
        return getOutputVariableByIndex(data.index);
    } else if (VariableType.INPUT == data.type) {
        return getInputVariableByIndex(data.index);
    } else if (VariableType.INTERMEDIATE == data.type) {
        return getIntermediateVariableByIndex(data.index);
    }
}

function getIntermediateVariableByIndex(index) {
    return variables.intermediateVariables[index];
}

function getInputVariableByIndex(index) {
    return variables.inputVariables[index];
}

function getOutputVariableByIndex(index) {
    return variables.outputVariables[index];
}