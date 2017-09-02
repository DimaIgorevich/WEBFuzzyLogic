//WINDOW ACTIVITY
$(document).ready(function() {
    $(".popup_bg").click(function(){
        hidePopup();
        selectedNode = null;
    });
});

function popupRulesWithNodeData(data) {
    let popup = document.createElement('div');
    popup.className = 'popup_dss';

    let popup_bg = document.createElement('div');
    popup_bg.className = 'popup_bg_dss';
    popup_bg.onclick = function () {
        hidePopupDss();
    };

    let form = document.createElement('form');

    form.className = 'form';
    form.id = 'rule-form';

    addTableRulesToFormWithNodeData(form, data);
    addAcceptButtonToParentWithNodeData(form, data);

    popup.appendChild(popup_bg);
    popup.appendChild(form);

    let body = document.body;
    body.appendChild(popup);
}

function buildRules() {
    for (var i = 0; i < dataWorkspaceNodes.length; i++) {
        var node = dataWorkspaceNodes[i];
        if (hasNodeInputs(node)) {
            var ruleDB = new RuleBase(getChildVariables(node));
            rules.put(node.key, ruleDB);
        }
    }
}

function addAcceptButtonToParentWithNodeData(parent, data) {
    var inputTag = document.createElement('div');
    inputTag.innerHTML = "<input type = 'button' value = 'Accept' onclick = 'btnAcceptRulesWithNodeData(selectedNode);'>";
    parent.appendChild(inputTag);
}

function addTableRulesToFormWithNodeData(form, data) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    var titleRow = document.createElement('tr');

    var childVariables = getChildVariables(data);

    for (var i = 0; i < childVariables.length; i++) {
        var cell = document.createElement('th');
        var cellText = document.createTextNode(childVariables[i].getTitle());
        cell.appendChild(cellText);
        titleRow.appendChild(cell);
    }

    var cell = document.createElement('th');
    var cellText = document.createTextNode(data.variable.getTitle());
    cell.appendChild(cellText);
    titleRow.appendChild(cell);
    tableBody.appendChild(titleRow);

    var ruleDB = rules.get(data.key);

    for (var j = 0; j < ruleDB.getListRule().length; j++) {
        var row = document.createElement('tr');
        for (var i = 0; i <= ruleDB.getListRule()[j].length; i++) {
            var cell = document.createElement('td');
            if (i == ruleDB.getListRule()[j].length) {
                var select = document.createElement('select');
                var array = new Array(0);
                for (var index = 0; index < data.variable.getListTerm().length; index++) {
                    array.push(data.variable.getListTerm()[index].getShortName());
                }
                for (var i = 0; i < array.length; i++) {
                    var option = document.createElement("option");
                    option.value = array[i];
                    option.text = array[i];
                    select.id = 'select-' + j;

                    select.appendChild(option);
                }
                if (ruleDB.getListCharacteristicModel()[j] == -1) {
                    select.selectedIndex = -1;
                } else {
                    select.selectedIndex = ruleDB.getListCharacteristicModel()[j];
                }

                cell.appendChild(select);
            } else {
                var cellText = document.createTextNode(ruleDB.getListRule()[j][i].getShortName());
                cell.appendChild(cellText);
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    
    table.appendChild(tableBody);
    table.setAttribute("border", "1");
    form.appendChild(table);
}

function showRules() {
    let debugString = "";
    var arrayWithRules = baseOfRules.getListRule();

    for (var row = 0; row < arrayWithRules.length; row++) {
        for (var column = 0; column < arrayWithRules[row].length; column++) {
            debugString += arrayWithRules[row][column].getShortName() + " ";
        }
        debugString += "\n";
    }

    alert ("debug: " + debugString);
}

function indexAtMaximalElementInArray(array) {
    let indexMax = 0;
    let max = array[0];
    for (var index = 1; index < array.length; index++) {
        if (array[index] > max) {
            max = array[index];
            indexMax = index;
        }
    }
    return indexMax;
}

function getResultGroup(vectorFuziification, outputVariable) {
    let group = outputVariable.getListTerm()[indexAtMaximalElementInArray(vectorFuziification)];
    return group;
}

function run() {
    var outputNode = getOutputNode();
    let outputVector = fuzzificationVectorByNode(outputNode);

    alert("vector: " + outputVector.join());


    // let vector;
    // for (var i = 0; i < knowledges.getKeys().length; i++) {
    //     vector = fuzzificationVectorByKnowledge(knowledges.getKeys()[i]);
    // }

    // let resultGroup;
    // for (var i = 0; i < knowledges.getKeys().length; i++) {
    //     var node = workspaceDiagram.findNodeForKey(knowledges.getKeys()[i]);
    //     resultGroup = getResultGroup(vector, node.data.variable);
    // }
    // alert("result Group: " + resultGroup.getName());
}

function hidePopup() {
    $(".popup").fadeOut(400);
    resetFormData();
}

function showPopup() {
    $(".popup").fadeIn(400);

    var select = document.getElementById('typeVar');

    if (select.selectedIndex == VariableType.INPUT) {
        showSignalTable();
        hideInputLinksTable();
    } else if (select.selectedIndex == VariableType.OUTPUT) {
        hideSignalTable();
        showInputLinksTable();
    } else if (select.selectedIndex == VariableType.INTERMEDIATE) {
        hideSignalTable();
        showInputLinksTable();
    }

    chart.update();
}

function showInputLinksTable() {
    var inputLinksTable = document.getElementById('linkTable');
    inputLinksTable.style.display = 'table';
    inputLinksTable.style.visibility = 'visible';
}

function hideInputLinksTable() {
    var inputLinksTable = document.getElementById('linkTable');
    inputLinksTable.style.display = 'none';
    inputLinksTable.style.visibility = 'hidden';
}

function showSignalTable() {
    var signalInputTable = document.getElementById('signalTable');
    signalInputTable.style.display = 'table';
    signalInputTable.style.visibility = 'visible';
}
function hideSignalTable() {
    var signalInputTable = document.getElementById('signalTable');
    signalInputTable.style.display = 'none';
    signalInputTable.style.visibility = 'hidden';
}

function hidePopupDss() {
    $(".popup_bg_dss").remove();
    $(".popup_dss").remove();
    selectedNode = null;
}

function showPopupDss() {
    $(".popup_dss").fadeIn(400);
}

function changeSelectTypeVariable() {
    var select = document.getElementById('typeVar');

    if (VariableType.INPUT == select.selectedIndex) {
        hideInputLinksTable();
        showSignalTable();
    } else if (VariableType.INTERMEDIATE == select.selectedIndex) {
        hideSignalTable();
        showInputLinksTable();
    } else if (VariableType.OUTPUT == select.selectedIndex) {
        hideSignalTable();
        showInputLinksTable();
    }
}

function changeCountTerms() {
    let countTerm = document.getElementById("countTerm").valueOf().value;

    if (countTerm > 0) {
        showTriangleDataForm();
    } else if (countTerm == 0) {
        hideTriangleDataForm();
    }

    document.getElementById("termPages").innerHTML = (currentTerm+1) + " of " +countTerm;
}

//HANDLERS
function btnNext() {
    if (((currentTerm + 1) + 1) <= document.getElementById("countTerm").valueOf().value) {
        currentTerm++;
        if (currentTerm < terms.length){
            loadDataTermByIndex(currentTerm);
        } else {
            FormDataHelper.resetTermData();
        }
        document.getElementById("termPages").innerHTML = (currentTerm+1) + " of " + document.getElementById("countTerm").valueOf().value;
    } else {
        alert("LAST ITEM TERM LIST");
    }
}

function btnPreview() {
    if (((currentTerm + 1) - 1) > 0) {
        currentTerm--;
        if (currentTerm < terms.length) {
            loadDataTermByIndex(currentTerm);
        }
        document.getElementById("termPages").innerHTML = (currentTerm+1) + " of " + document.getElementById("countTerm").valueOf().value;
    } else {
        alert("FIRST ITEM TERM LIST");
    }
}

function btnAccept() {
    if (currentTerm >= terms.length) {
        addTerm(createTerm());
    } else {
        editTermByID(currentTerm);
    }
}

function btnDone() {
    if (!FormDataHelper.isEmptyFormMainFields() && FormDataHelper.isReadyAllTerms(terms)){
        
        if (currentVariable) {
            editVariable(currentVariable);
            hidePopup();
        } else {
            addVariable(createVariable());
        }
    } else {
        alert("Please, input data for variable");
    }
}

function btnAcceptRulesWithNodeData(data) {
    fetchRulesDataFormToRuleDataBase(rules.get(data.key));
    knowledges.put(data.key, new KnowledgeMatrix(data.variable, rules.get(data.key)));
    hidePopupDss();
}