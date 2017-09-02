function addNodeToWorkspaceDiagramWithVariable(variable) {
    var object = {
        key: variable.getTitle(),
        type: variable.getType(),
        variable: variable
    };

    workspaceDiagram.model.addNodeData(object);
}

function hasNodeInputs(node) {
    if (node.type == VariableType.OUTPUT || node.type == VariableType.INTERMEDIATE) {
        return true;
    }
    return false;
}

function isNodeOutputType(node) {
    if (node.type == VariableType.OUTPUT) {
        return true;
    }
    return false;
}

function isKeyNodeAlready(keyNode) {

}

function getChildVariables(node) {
    var childs = new Array(0);
    var links = parseLinksAtVariable(node.variable);
    for (var i = 0; i < links.length; i++) {
        var childNode = workspaceDiagram.findNodeForKey(links[i]);
        childs.push(childNode.data.variable);
    }
    return childs.slice();
}

function getOutputNode() {
    for (var i = 0; i < dataWorkspaceNodes.length; i++) {
        var node = dataWorkspaceNodes[i];   
        if (isNodeOutputType(node)) {
            return node;
        }
    }
    return null;
}