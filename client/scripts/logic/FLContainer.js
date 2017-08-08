//GLOBAL DATA
let countVariables = 0;

let currentVariable = -1;

// let variables;
// variables = new Array(0);

let outputVar;

let variables = {
    outputVariables:  new Array(0),
    inputVariables: new Array(0),
    intermediateVariables: new Array(0)
};


let baseOfRules;
let knowledgeMatrix;

//LOCAL DATA
let currentTerm = 0;

let series;
series = new Array(0);

let terms;
terms = new Array(0);

//WORKSPACE

let workspaceDiagram;

let dataWorkspaceNodes;
dataWorkspaceNodes = new Array(0);

let dataWorkspaceLinks;
dataWorkspaceLinks = new Array(0);

//METHODS

function addTerm(term) {
    terms.push(term);
    repaintChart();
}

function addVariable(variable) {
    variable.sortListTermContent();
    hidePopup();
    addNodeToWorkspaceDiagramWithVariable(variable);

    if (VariableType.OUTPUT == variable.getType()) {
        variables.outputVariables.push(variable);
    } else if (VariableType.INPUT == variable.getType()) {
        variables.inputVariables.push(variable);
    } else if (VariableType.INTERMEDIATE == variable.getType()) {
        variables.intermediateVariables.push(variable);
    }

    // if (variable.getType() == 1) {
    //     variables.push(variable);
    //     // countVariables++;
    // } else if (variable.getType() == 0) {}

    // if (variable.getType() == 1) {
    //     variables.push(variable);
    //     countVariables++;
    //     createVariableUIElementWithIndex(countVariables-1);
    // } else if (variable.getType() == 0){
    //     outputVar = variable;
    //     createOutputVariableUIElement();
    // }
}

function addNodeToWorkspaceDiagramWithVariable(variable) {
    var keyValue = getIndexByVariable(variable);
    variable.setID(keyValue);
    variable.setGlobalID(dataWorkspaceNodes.length);
    var object = {
        key: variable.getTitle(),
        type: variable.getType(),
        index: keyValue,
        data: variable
    };

    workspaceDiagram.model.addNodeData(object);
}

function editTermByID(id) {
    let editableTerm = fetchTriangleDataForm();
    terms = insertObjectToListAtID(editableTerm, terms, id);
    repaintChart();
}

function editVariableWithID(id) {
    let editableVariable = fetchVariableDataForm();
    let updateListVariables = insertObjectToListAtID(editableVariable, variables, id);
    if (id != "R") {
        variables = updateListVariables;
    }
}

function editVariable(variable) {
    var node = workspaceDiagram.findNodeForKey(variable.getTitle());
    let editableVariable = fetchVariableDataForm();

    if (!editableVariable.isLinksEmpty()) {
        let links = parseLinksAtVariable(editableVariable);
        createLinkWithNode(links, node, variable);
    }

    workspaceDiagram.model.setDataProperty(node.data, "key", editableVariable.getTitle());

    if (VariableType.INPUT == variable.getType()) {
        variables.inputVariables = insertObjectToListAtID(editableVariable, variables.inputVariables, variable.getID());
    } else if (VariableType.OUTPUT == variable.getType()) {
        variables.outputVariables = insertObjectToListAtID(editableVariable, variables.outputVariables, variable.getID());
    } else if (VariableType.INTERMEDIATE == variable.getType()) {
        variables.intermediateVariables = insertObjectToListAtID(editableVariable, variables.intermediateVariables, variable.getID());
    }
}

function getIndexByTag(index, tag) {
    return index.replace(tag,"");
}

function loadDataVariableByIndex(index) {
    let variableIndex = getIndexByTag(index, "workspace-var-");
    formWillAppearWithVariableByIndex(variableIndex);
    showPopup();
}

function loadDataTermByIndex(index) {
    let term = terms[index];
    if (term) {
        let triangleNumber = term.getTriangleNumber();
        document.getElementById("a0").valueOf().value = triangleNumber.getLeftRange();
        document.getElementById("a1").valueOf().value = triangleNumber.getMiddleRange();
        document.getElementById("a2").valueOf().value = triangleNumber.getRightRange();
        document.getElementById("name").valueOf().value = term.getName();
        document.getElementById("shortName").valueOf().value = term.getShortName();
    }
}

function insertObjectToListAtID(object, list, id) {
    let editableList = new Array(0);
    object.sortListTermContent();

    if (id == "R") {
        outputVar = object;
    } else {
        for (let i = 0; i < list.length; i++) {
            if (i == id) {
                editableList.push(object);
            } else {
                editableList.push(list[i]);
            }
        }
    }

    return editableList.slice();
}

function getIndexByVariable(variable) {
    if (VariableType.OUTPUT == variable.getType()) {
        return variables.outputVariables.length;
    } else if (VariableType.INPUT == variable.getType()) {
        return variables.inputVariables.length;
    } else if (VariableType.INTERMEDIATE == variable.getType()) {
        return variables.intermediateVariables.length;
    }
}

function parseLinksAtVariable(variable) {
    return variable.getLinks().split(';');
}

function createLinkWithNode(links, node, variable) {
    var oldLinks = parseLinksAtVariable(variable);
    for (var i = 0; i < oldLinks.length; i++) {
        var linkData = {from: oldLinks[i], to: node.data.key};
        if (isExistLinkData(linkData)) {
            workspaceDiagram.model.removeLinkData(getLinkByData(linkData));
        }
    }

    for (var i = 0; i < links.length; i++) {
        workspaceDiagram.model.addLinkData({ from: links[i], to: node.data.key});
    }
}

function getLinkByData(linkData) {
    for (var i = 0; i < dataWorkspaceLinks.length; i++) {
        if (isEqualLinkData(linkData, dataWorkspaceLinks[i])) {
            return dataWorkspaceLinks[i];
        }
    }

    return null;
}

function isExistLinkData(linkObject) {
    for (var i = 0; i < dataWorkspaceLinks.length; i++) {
        if (isEqualLinkData(linkObject, dataWorkspaceLinks[i])) {
            return true;
        }
    }

    return false;
}

function isEqualLinkData(linkObj1, linkObj2) {
    if (linkObj1.to == linkObj2.to && linkObj1.from == linkObj2.from) {
        return true;
    }
    return false;
}