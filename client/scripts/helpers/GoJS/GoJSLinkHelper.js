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